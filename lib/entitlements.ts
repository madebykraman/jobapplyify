export const INVITE_CODE = 'WAYO-BETA'
export const PRO_STORAGE_KEY = 'wayo.proAccess'
export const DEMO_EMAIL = 'test@wayo.app'
export const DEMO_PASSWORD = 'WAYOtest2026!'

export function hasProAccess() {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(PRO_STORAGE_KEY) === 'true'
}

export function redeemInviteCode(code: string) {
  const valid = code.trim().toUpperCase() === INVITE_CODE
  if (valid && typeof window !== 'undefined') localStorage.setItem(PRO_STORAGE_KEY, 'true')
  return valid
}

export function activatePaidPro() {
  if (typeof window !== 'undefined') localStorage.setItem(PRO_STORAGE_KEY, 'true')
}

export function clearProAccess() {
  if (typeof window !== 'undefined') localStorage.removeItem(PRO_STORAGE_KEY)
}
