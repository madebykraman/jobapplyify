import type { Page } from 'playwright'

const CAPTCHA = /captcha|hcaptcha|recaptcha|cloudflare challenge|verify you are human/i
const SENSITIVE = /social security|aadhaar|pan card|passport|bank account|credit card|salary history|medical condition|disability|race|ethnicity|religion|sexual orientation/i

export async function detectHandoff(page: Page) {
  const body = await page.locator('body').innerText({ timeout: 5000 }).catch(() => '')
  const html = await page.content().catch(() => '')
  if (CAPTCHA.test(body) || CAPTCHA.test(html)) return 'captcha' as const
  if (SENSITIVE.test(body)) return 'sensitive-question' as const
  return null
}

export async function formLooksUnknown(page: Page) {
  const controls = await page.locator('input, textarea, select, button').count().catch(() => 0)
  const submit = await page.getByRole('button', { name: /submit|apply|send application/i }).count().catch(() => 0)
  return controls === 0 || (controls > 0 && submit === 0)
}

export async function fillByLabel(page: Page, label: RegExp, value: string) {
  if (!value) return false
  const field = page.getByLabel(label).first()
  if (await field.count().catch(() => 0)) {
    await field.fill(value)
    return true
  }
  return false
}
