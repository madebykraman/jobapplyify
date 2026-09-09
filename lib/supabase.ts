import { createBrowserClient, type SupabaseClient } from '@supabase/ssr'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase: SupabaseClient | null = url && key ? createBrowserClient(url, key) : null
export const isSupabaseConfigured = Boolean(supabase)
