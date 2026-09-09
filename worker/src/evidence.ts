import type { Page } from 'playwright'

export async function redactCandidateData(page: Page, secrets: string[]) {
  const values = [...new Set(secrets.map(value => value.trim()).filter(value => value.length >= 2))]
  await page.evaluate((items) => {
    const replace = (value: string) => items.reduce((text, item) => text.split(item).join('[REDACTED]'), value)
    for (const element of Array.from(document.querySelectorAll('input, textarea'))) {
      const field = element as HTMLInputElement | HTMLTextAreaElement
      field.value = '[REDACTED]'
      field.setAttribute('value', '[REDACTED]')
    }
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    let node: Node | null
    while ((node = walker.nextNode())) nodes.push(node as Text)
    for (const text of nodes) text.nodeValue = replace(text.nodeValue || '')
  }, values).catch(() => undefined)
}
