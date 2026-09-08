import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

export function supabaseForAccessToken(accessToken: string): SupabaseClient | null {
  if (!url || !anon || !accessToken) return null
  return createClient(url, anon, { global: { headers: { Authorization: `Bearer ${accessToken}` } } })
}

export function supabaseAdmin(): SupabaseClient | null {
  if (!url || !serviceRole) return null
  return createClient(url, serviceRole, { auth: { autoRefreshToken: false, persistSession: false } })
}
