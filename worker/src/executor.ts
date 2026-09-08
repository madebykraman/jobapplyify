import { mkdir, rm } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { chromium, type BrowserContext, type Page } from 'playwright'
import { adapterFor, trustedSubmit } from './adapters.js'
import { detectHandoff, fillByLabel, formLooksUnknown } from './guards.js'
import type { AutomationTask, WorkerEvidence, WorkerResult } from './types.js'

const NAV_TIMEOUT = Number(process.env.ROVA_NAV_TIMEOUT_MS || 30000)
const ACTION_TIMEOUT = Number(process.env.ROVA_ACTION_TIMEOUT_MS || 10000)

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

async function captureEvidence(page: Page, taskId: string, reason: string): Promise<WorkerEvidence> {
  const root = process.env.ROVA_EVIDENCE_DIR || './.evidence'
  const dir = `${root}/${taskId}`
  await mkdir(dir, { recursive: true })
  const safeReason = reason.replace(/[^a-z0-9_-]/gi, '_')
  const screenshotPath = `${dir}/${safeReason}.png`
  const htmlPath = `${dir}/${safeReason}.html`
  await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => undefined)
  const html = await page.content().catch(() => '')
  if (html) await import('node:fs/promises').then(fs => fs.writeFile(htmlPath, html, 'utf8')).catch(() => undefined)
  return { screenshotPath, htmlPath }
}

function sessionId(task: AutomationTask, adapterId: string) {
  const scope = task.accountKey || 'unscoped'
  return createHash('sha256').update(`${scope}:${adapterId}`).digest('hex').slice(0, 32)
}

async function downloadResume(url: string, taskId: string) {
  if (!url) return undefined
  const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(15000) })
  if (!response.ok) throw new Error(`Resume download failed (${response.status}).`)
  const contentType = response.headers.get('content-type') || ''
  if (contentType && !/pdf|word|officedocument|octet-stream/i.test(contentType)) throw new Error('Resume content type is not supported.')
  const data = Buffer.from(await response.arrayBuffer())
  if (data.byteLength > 10 * 1024 * 1024) throw new Error('Resume exceeds worker size limit.')
  const root = process.env.ROVA_TEMP_DIR || './.tmp'
  await mkdir(root, { recursive: true })
  const path = `${root}/resume-${taskId}`
  await import('node:fs/promises').then(fs => fs.writeFile(path, data))
  return path
}

async function callback(task: AutomationTask, result: WorkerResult) {
  const url = process.env.ROVA_CALLBACK_URL
  const token = process.env.ROVA_WORKER_CALLBACK_TOKEN
  if (!url || !token || !task.jobId) return
  await fetch(url, { method: 'POST', headers: { accept: 'application/json', 'content-type': 'application/json', authorization: `Bearer ${token}` }, body: JSON.stringify({ jobId: task.jobId, ...result }), signal: AbortSignal.timeout(10000) }).catch(() => undefined)
}

export async function executeTask(task: AutomationTask): Promise<WorkerResult> {
  const adapter = adapterFor(task.applicationUrl)
  if (!adapter) {
    const result: WorkerResult = { taskId: task.id, state: 'handoff', url: task.applicationUrl, adapter: 'unknown', handoffReason: 'unsupported-flow', message: 'No supported browser adapter for this URL.' }
    await callback(task, result); return result
  }

  const sessionRoot = process.env.ROVA_SESSION_DIR || './.sessions'
  let resumePath: string | undefined
  let context: BrowserContext | undefined
  try {
    resumePath = task.candidate.resumePath || await downloadResume(task.candidate.resumeUrl || '', task.id)
    context = await chromium.launchPersistentContext(`${sessionRoot}/${sessionId(task, adapter.id)}`, {
      headless: process.env.ROVA_HEADLESS !== 'false', viewport: { width: 1440, height: 1000 },
    })
    const page = context.pages()[0] || await context.newPage()
    page.setDefaultTimeout(ACTION_TIMEOUT)
    await page.goto(task.applicationUrl, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT })

    const handoff = await detectHandoff(page)
    if (handoff) return await finish(task, { taskId: task.id, state: 'handoff', url: page.url(), adapter: adapter.id, handoffReason: handoff, message: 'Safety guard triggered; human intervention is required.', evidence: await captureEvidence(page, task.id, handoff) })
    if (task.mode === 'dry-run') return await finish(task, { taskId: task.id, state: 'ready', url: page.url(), adapter: adapter.id, message: 'Dry run reached the application page without submission.' })

    await prepareForm(page, { ...task, candidate: { ...task.candidate, resumePath } })
    const secondHandoff = await detectHandoff(page)
    if (secondHandoff) return await finish(task, { taskId: task.id, state: 'handoff', url: page.url(), adapter: adapter.id, handoffReason: secondHandoff, message: 'Safety guard triggered after form preparation.', evidence: await captureEvidence(page, task.id, secondHandoff) })
    if (await formLooksUnknown(page)) return await finish(task, { taskId: task.id, state: 'handoff', url: page.url(), adapter: adapter.id, handoffReason: 'unknown-form', message: 'Application form could not be deterministically recognized.', evidence: await captureEvidence(page, task.id, 'unknown-form') })
    if (task.mode !== 'full-auto') return await finish(task, { taskId: task.id, state: 'ready', url: page.url(), adapter: adapter.id, message: 'Form prepared for explicit human review; no submission performed.' })

    const submit = trustedSubmit(page, adapter)
    if (!(await submit.count())) return await finish(task, { taskId: task.id, state: 'handoff', url: page.url(), adapter: adapter.id, handoffReason: 'unknown-form', message: 'No trusted submission control was detected.', evidence: await captureEvidence(page, task.id, 'missing-submit') })
    await submit.click()
    await page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => undefined)
    const postSubmitHandoff = await detectHandoff(page)
    if (postSubmitHandoff) return await finish(task, { taskId: task.id, state: 'handoff', url: page.url(), adapter: adapter.id, handoffReason: postSubmitHandoff, message: 'Post-submission safety guard triggered; verification required.', evidence: await captureEvidence(page, task.id, postSubmitHandoff) })
    return await finish(task, { taskId: task.id, state: 'submitted', url: page.url(), adapter: adapter.id, handoffReason: 'verification-required', message: 'Submission action completed; independent verification is still required.', evidence: await captureEvidence(page, task.id, 'submitted') })
  } catch (error) {
    const page = context?.pages()[0]
    const result: WorkerResult = { taskId: task.id, state: 'failed', url: page?.url() || task.applicationUrl, adapter: adapter.id, message: error instanceof Error ? error.message : 'Worker execution failed.', evidence: page ? await captureEvidence(page, task.id, 'failed') : undefined }
    return await finish(task, result)
  } finally {
    await context?.close().catch(() => undefined)
    if (resumePath && !task.candidate.resumePath) await rm(resumePath, { force: true }).catch(() => undefined)
  }
}

async function finish(task: AutomationTask, result: WorkerResult) {
  await callback(task, result)
  return result
}
