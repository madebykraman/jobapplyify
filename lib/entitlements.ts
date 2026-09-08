export const INVITE_CODE = 'WAYO-BETA'
export const PRO_STORAGE_KEY = 'wayo.proAccess'

export function hasProAccess() {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(PRO_STORAGE_KEY) === 'true'
}

export function redeemInviteCode(code: string) {
  const valid = code.trim().toUpperCase() === INVITE_CODE
  if (valid && typeof window !== 'undefined') localStorage.setItem(PRO_STORAGE_KEY, 'true')
  return valid
}
