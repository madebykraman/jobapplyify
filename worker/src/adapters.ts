import type { Page } from 'playwright'

export type WorkerAdapter = {
  id: string
  label: string
  matches: (url: string) => boolean
  submitLabel: RegExp
}

export const WORKER_ADAPTERS: WorkerAdapter[] = [
  { id: 'greenhouse', label: 'Greenhouse', matches: u => /greenhouse\.io/i.test(u), submitLabel: /submit application|submit/i },
  { id: 'lever', label: 'Lever', matches: u => /lever\.co/i.test(u), submitLabel: /submit application|submit/i },
  { id: 'ashby', label: 'Ashby', matches: u => /ashbyhq\.com/i.test(u), submitLabel: /submit application|submit/i },
  { id: 'linkedin', label: 'LinkedIn', matches: u => /linkedin\.com/i.test(u), submitLabel: /submit application|submit/i },
  { id: 'indeed', label: 'Indeed', matches: u => /indeed\.com/i.test(u), submitLabel: /submit application|apply now|apply/i },
  { id: 'naukri', label: 'Naukri', matches: u => /naukri\.com/i.test(u), submitLabel: /submit application|apply/i },
  { id: 'internshala', label: 'Internshala', matches: u => /internshala\.com/i.test(u), submitLabel: /submit application|apply/i },
  { id: 'instahyre', label: 'Instahyre', matches: u => /instahyre\.com/i.test(u), submitLabel: /submit application|apply/i },
]

export function adapterFor(url: string): WorkerAdapter | null {
  return WORKER_ADAPTERS.find(adapter => adapter.matches(url)) || null
}

export function trustedSubmit(page: Page, adapter: WorkerAdapter) {
  return page.getByRole('button', { name: adapter.submitLabel }).first()
}
