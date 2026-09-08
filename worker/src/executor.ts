import { chromium, type BrowserContext, type Page } from 'playwright'
import { detectHandoff, fillByLabel, formLooksUnknown } from './guards.js'
import type { AutomationTask, WorkerResult } from './types.js'

function adapterFor(url: string) {
  if (/greenhouse\.io/i.test(url)) return 'greenhouse'
  if (/lever\.co/i.test(url)) return 'lever'
  if (/ashbyhq\.com/i.test(url)) return 'ashby'
  if (/linkedin\.com/i.test(url)) return 'linkedin'
  if (/indeed\.com/i.test(url)) return 'indeed'
  if (/naukri\.com/i.test(url)) return 'naukri'
  if (/internshala\.com/i.test(url)) return 'internshala'
  if (/instahyre\.com/i.test(url)) return 'instahyre'
  return null
}

async function prepareForm(page: Page, task: AutomationTask) {
  const candidate = task.candidate
  await fillByLabel(page, /full name|name/i, candidate.name)
  await fillByLabel(page, /email/i, candidate.email)
  await fillByLabel(page, /phone|mobile/i, candidate.phone)
  await fillByLabel(page, /location|city/i, candidate.location)
  await fillByLabel(page, /linkedin/i, candidate.linkedin || '')
  await fillByLabel(page, /portfolio|website|personal site/i, candidate.portfolio || '')

  if (candidate.resumePath) {
    const inputs = page.locator('input[type="file"]')
    const count = await inputs.count()
    if (count === 1) await inputs.first().setInputFiles(candidate.resumePath)
  }
}

export async function executeTask(task: AutomationTask): Promise<WorkerResult> {
  const adapter = adapterFor(task.applicationUrl)
  if (!adapter) return { taskId: task.id, state: 'handoff', url: task.applicationUrl, adapter: 'unknown', handoffReason: 'unsupported-flow', message: 'No supported browser adapter for this URL.' }

  const sessionRoot = process.env.ROVA_SESSION_DIR || './.sessions'
  const context: BrowserContext = await chromium.launchPersistentContext(`${sessionRoot}/${adapter}`, {
    headless: process.env.ROVA_HEADLESS !== 'false',
    viewport: { width: 1440, height: 1000 },
  })

  try {
    const page = context.pages()[0] || await context.newPage()
    await page.goto(task.applicationUrl, { waitUntil: 'domcontentloaded', timeout: 30000 })

    const handoff = await detectHandoff(page)
    if (handoff) return { taskId: task.id, state: 'handoff', url: page.url(), adapter, handoffReason: handoff, message: 'Safety guard triggered; human intervention is required.' }

    if (task.mode === 'dry-run') return { taskId: task.id, state: 'ready', url: page.url(), adapter, message: 'Dry run reached the application page without submission.' }

    await prepareForm(page, task)

    const secondHandoff = await detectHandoff(page)
    if (secondHandoff) return { taskId: task.id, state: 'handoff', url: page.url(), adapter, handoffReason: secondHandoff, message: 'Safety guard triggered after form preparation.' }
    if (await formLooksUnknown(page)) return { taskId: task.id, state: 'handoff', url: page.url(), adapter, handoffReason: 'unknown-form', message: 'Application form could not be deterministically recognized.' }

    if (task.mode !== 'full-auto') return { taskId: task.id, state: 'ready', url: page.url(), adapter, message: 'Form prepared for explicit human review; no submission performed.' }

    const submit = page.getByRole('button', { name: /submit|apply|send application/i }).first()
    if (!(await submit.count())) return { taskId: task.id, state: 'handoff', url: page.url(), adapter, handoffReason: 'unknown-form', message: 'No trusted submission control was detected.' }

    await submit.click()
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => undefined)
    const postSubmitHandoff = await detectHandoff(page)
    if (postSubmitHandoff) return { taskId: task.id, state: 'handoff', url: page.url(), adapter, handoffReason: postSubmitHandoff, message: 'Post-submission safety guard triggered; verification required.' }

    return { taskId: task.id, state: 'submitted', url: page.url(), adapter, handoffReason: 'verification-required', message: 'Submission action completed; independent verification is still required.' }
  } catch (error) {
    return { taskId: task.id, state: 'failed', url: task.applicationUrl, adapter, message: error instanceof Error ? error.message : 'Worker execution failed.' }
  } finally {
    await context.close()
  }
}
