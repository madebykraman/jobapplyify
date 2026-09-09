export type AutomationMode = 'dry-run' | 'review' | 'full-auto'
export type AutomationState = 'queued' | 'preparing' | 'ready' | 'running' | 'paused' | 'human-review' | 'submitted' | 'verified' | 'failed' | 'cancelled'
export type HandoffReason = 'captcha' | 'unknown-form' | 'sensitive-question' | 'unsupported-flow' | 'verification-required' | 'session-expired'

export type AutomationPolicy = {
  mode: AutomationMode
  allowExternalSubmission: boolean
  pauseOnSensitiveQuestions: boolean
  pauseOnUnknownForms: boolean
  pauseOnCaptcha: boolean
  requireSubmissionVerification: boolean
}

export type AutomationJob = {
  id: string
  company: string
  role: string
  source: string
  applicationUrl: string
  state: AutomationState
  attempts: number
  maxAttempts: number
  createdAt: string
  updatedAt: string
  handoff?: HandoffReason
  lastError?: string
}

export type AdapterCapability = 'login' | 'resume-upload' | 'form-fill' | 'answers' | 'submit' | 'verify'
export type PlatformAdapter = {
  id: string
  label: string
  kind: 'job-board' | 'ats'
  capabilities: AdapterCapability[]
  supports: (url: string) => boolean
}

export const DEFAULT_AUTOMATION_POLICY: AutomationPolicy = {
  mode: 'review',
  allowExternalSubmission: false,
  pauseOnSensitiveQuestions: true,
  pauseOnUnknownForms: true,
  pauseOnCaptcha: true,
  requireSubmissionVerification: true,
}

export const ADAPTERS: PlatformAdapter[] = [
  { id: 'greenhouse', label: 'Greenhouse', kind: 'ats', capabilities: ['resume-upload', 'form-fill', 'answers', 'submit', 'verify'], supports: u => /greenhouse\.io/i.test(u) },
  { id: 'lever', label: 'Lever', kind: 'ats', capabilities: ['resume-upload', 'form-fill', 'answers', 'submit', 'verify'], supports: u => /lever\.co/i.test(u) },
  { id: 'ashby', label: 'Ashby', kind: 'ats', capabilities: ['resume-upload', 'form-fill', 'answers', 'submit', 'verify'], supports: u => /ashbyhq\.com/i.test(u) },
]

export function adapterFor(url: string) { return ADAPTERS.find(a => a.supports(url)) || null }

export function nextState(state: AutomationState, event: 'prepare'|'start'|'pause'|'handoff'|'resume'|'submit'|'verify'|'fail'|'cancel'): AutomationState {
  if (event === 'prepare' && (state === 'queued' || state === 'failed')) return 'preparing'
  if (event === 'start' && (state === 'ready' || state === 'paused')) return 'running'
  if (event === 'pause' && (state === 'running' || state === 'ready')) return 'paused'
  if (event === 'handoff' && state === 'running') return 'human-review'
  if (event === 'resume' && state === 'human-review') return 'running'
  if (event === 'submit' && state === 'running') return 'submitted'
  if (event === 'verify' && state === 'submitted') return 'verified'
  if (event === 'fail' && !['verified','cancelled'].includes(state)) return 'failed'
  if (event === 'cancel' && !['verified','submitted'].includes(state)) return 'cancelled'
  return state
}

export function policyFor(mode: AutomationMode): AutomationPolicy {
  if (mode === 'dry-run') return { ...DEFAULT_AUTOMATION_POLICY, mode, allowExternalSubmission: false }
  if (mode === 'full-auto') return { ...DEFAULT_AUTOMATION_POLICY, mode, allowExternalSubmission: true }
  return { ...DEFAULT_AUTOMATION_POLICY, mode, allowExternalSubmission: false }
}

export function canSubmit(policy: AutomationPolicy, state: AutomationState) {
  return policy.allowExternalSubmission && policy.mode === 'full-auto' && state === 'running' && !policy.requireSubmissionVerification
}

export function handoffLabel(reason: HandoffReason) {
  return ({ captcha: 'CAPTCHA detected', 'unknown-form': 'Unknown form structure', 'sensitive-question': 'Sensitive question', 'unsupported-flow': 'Unsupported application flow', 'verification-required': 'Submission verification required', 'session-expired': 'Session expired' })[reason]
}
