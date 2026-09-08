export const INVITE_CODE = process.env.NEXT_PUBLIC_BETA_INVITE || 'WAYO-BETA'
export const PRO_STORAGE_KEY = 'kindleap.proAccess'
export const DEMO_EMAIL = 'test@kindleap.app'
export const DEMO_PASSWORD = 'KINDLEAPtest2026!'

export function hasProAccess() {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(PRO_STORAGE_KEY) === 'true'
}

export function redeemInviteCode(code: string) {
  const valid = code.trim().toUpperCase() === INVITE_CODE.toUpperCase()
  if (valid && typeof window !== 'undefined') localStorage.setItem(PRO_STORAGE_KEY, 'true')
  return valid
}

export function activatePaidPro() {
  if (typeof window !== 'undefined') localStorage.setItem(PRO_STORAGE_KEY, 'true')
}

export function clearProAccess() {
  if (typeof window !== 'undefined') localStorage.removeItem(PRO_STORAGE_KEY)
}
