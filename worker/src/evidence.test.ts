import test from 'node:test'
import assert from 'node:assert/strict'
import { chromium } from 'playwright'
import { redactCandidateData } from './evidence.js'

test('browser evidence redacts candidate fields and visible candidate data', async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  try {
    await page.setContent('<main>Jane Candidate · jane@example.com</main><input value="jane@example.com"><textarea>secret answer</textarea>')
    await redactCandidateData(page, ['Jane Candidate', 'jane@example.com'])
    assert.equal(await page.locator('input').inputValue(), '[REDACTED]')
    assert.equal(await page.locator('textarea').inputValue(), '[REDACTED]')
    assert.equal((await page.locator('body').innerText()).includes('jane@example.com'), false)
    assert.equal((await page.locator('body').innerText()).includes('Jane Candidate'), false)
  } finally {
    await page.close()
    await browser.close()
  }
})
