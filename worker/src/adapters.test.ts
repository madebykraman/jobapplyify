import test from 'node:test'
import assert from 'node:assert/strict'
import { adapterFor, WORKER_ADAPTERS } from './adapters.js'
import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { formLooksUnknown, fillByLabel } from './guards.js'

const fixture = (name: string) => join(dirname(fileURLToPath(import.meta.url)), 'fixtures', name)

test('all production adapters match canonical hosts', () => {
  for (const adapter of WORKER_ADAPTERS.slice(0, 3)) {
    const host = adapter.id === 'greenhouse' ? 'https://example.greenhouse.io/jobs/1' : adapter.id === 'lever' ? 'https://jobs.lever.co/example/1' : 'https://jobs.ashbyhq.com/example/1'
    assert.equal(adapterFor(host)?.id, adapter.id)
  }
})

test('representative ATS forms expose deterministic controls', async () => {
  const browser = await chromium.launch({ headless: true })
  try {
    for (const name of ['greenhouse.html', 'lever.html', 'ashby.html']) {
      const page = await browser.newPage()
      await page.goto(`file://${fixture(name)}`)
      assert.equal(await formLooksUnknown(page), false)
      assert.equal(await fillByLabel(page, /email/i, 'candidate@example.com'), true)
      assert.equal(await page.getByLabel(/email/i).inputValue(), 'candidate@example.com')
      await page.close()
    }
  } finally { await browser.close() }
})
