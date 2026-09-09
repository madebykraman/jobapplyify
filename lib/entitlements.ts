export const INVITE_CODE = process.env.KINDLEAP_BETA_INVITE || 'WAYO-BETA'
export const DEMO_EMAIL = 'test@kindleap.app'
export const DEMO_PASSWORD = 'KINDLEAPtest2026!'

export type Entitlement = {
  plan: 'free' | 'pro'
  status: 'active' | 'paused' | 'cancelled'
  source: string | null
  currentPeriodEnd: string | null
}

export function isActivePro(entitlement: Entitlement | null | undefined) {
  if (!entitlement || entitlement.plan !== 'pro' || entitlement.status !== 'active') return false
  return !entitlement.currentPeriodEnd || new Date(entitlement.currentPeriodEnd).getTime() > Date.now()
}
