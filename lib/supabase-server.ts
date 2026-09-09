import { createServerClient } from '@supabase/ssr'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function supabaseServer(): Promise<SupabaseClient | null> {
  if (!url || !anon) return null
  const cookieStore = await cookies()
  return createServerClient(url, anon, {
    cookies: {
      getAll() { return cookieStore.getAll() },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Server Components cannot always mutate cookies. Middleware refreshes sessions.
        }
      },
    },
  })
}

export function supabaseForAccessToken(accessToken: string): SupabaseClient | null {
  if (!url || !anon || !accessToken) return null
  return createClient(url, anon, { global: { headers: { Authorization: `Bearer ${accessToken}` } } })
}

export function supabaseAdmin(): SupabaseClient | null {
  if (!url || !serviceRole) return null
  return createClient(url, serviceRole, { auth: { autoRefreshToken: false, persistSession: false } })
}
