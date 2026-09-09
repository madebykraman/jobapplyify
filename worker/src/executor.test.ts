import test from 'node:test'
import assert from 'node:assert/strict'
import { chromium } from 'playwright'
import { independentlyVerify } from './executor.js'

test('independent verification accepts strong confirmation language', async () => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  try {
    const url = 'data:text/html,<main>Application%20received%20successfully.</main>'
    assert.equal(await independentlyVerify(context, url), true)
  } finally {
    await context.close()
    await browser.close()
  }
})

test('independent verification rejects generic post-click pages', async () => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  try {
    const url = 'data:text/html,<main>Welcome%20back%20to%20the%20job%20portal.</main>'
    assert.equal(await independentlyVerify(context, url), false)
  } finally {
    await context.close()
    await browser.close()
  }
})
