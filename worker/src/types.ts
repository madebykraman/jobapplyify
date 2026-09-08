export type WorkerMode = 'dry-run' | 'review' | 'full-auto'
export type WorkerState = 'started' | 'navigating' | 'handoff' | 'ready' | 'submitted' | 'verified' | 'failed'

export type CandidateData = {
  name: string
  email: string
  phone: string
  location: string
  headline: string
  linkedin?: string
  portfolio?: string
  resumePath?: string
  answers?: Record<string, string>
}

export type AutomationTask = {
  id: string
  company: string
  role: string
  applicationUrl: string
  mode: WorkerMode
  candidate: CandidateData
}

export type WorkerResult = {
  taskId: string
  state: WorkerState
  url: string
  adapter: string
  handoffReason?: 'captcha' | 'unknown-form' | 'sensitive-question' | 'unsupported-flow' | 'session-expired' | 'verification-required'
  message: string
}
