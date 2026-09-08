import { NextResponse } from 'next/server'
import { supabaseForAccessToken } from '@/lib/supabase-server'

export const runtime = 'nodejs'

function auth(req: Request) {
  const value = req.headers.get('authorization') || ''
  return value.startsWith('Bearer ') ? value.slice(7) : ''
}

function validHttps(value: unknown) {
  try { return new URL(String(value)).protocol === 'https:' } catch { return false }
}

export async function GET(req: Request) {
  const client = supabaseForAccessToken(auth(req))
  if (!client) return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 })
  const { data: { user }, error: userError } = await client.auth.getUser()
  if (userError || !user) return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 })
  const { data, error } = await client.from('automation_jobs').select('*').order('created_at', { ascending: false }).limit(200)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ jobs: data || [] })
}

export async function POST(req: Request) {
  const client = supabaseForAccessToken(auth(req))
  if (!client) return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 })
  const { data: { user }, error: userError } = await client.auth.getUser()
  if (userError || !user) return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 })
  try {
    const body = await req.json()
    if (!body?.applicationUrl || !validHttps(body.applicationUrl)) return NextResponse.json({ error: 'A valid HTTPS application URL is required.' }, { status: 400 })
    if (!['dry-run', 'review', 'full-auto'].includes(body.mode)) return NextResponse.json({ error: 'Invalid automation mode.' }, { status: 400 })
    const { data, error } = await client.from('automation_jobs').insert({
      user_id: user.id,
      company: String(body.company || '').slice(0, 200),
      role: String(body.role || '').slice(0, 200),
      source: String(body.source || '').slice(0, 100),
      application_url: body.applicationUrl,
      state: 'queued',
      mode: body.mode,
      max_attempts: 3,
    }).select('*').single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    await client.from('automation_events').insert({ user_id: user.id, automation_job_id: data.id, event_type: 'queued', state: 'queued', message: 'Automation job queued.' })
    return NextResponse.json({ job: data }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid request.' }, { status: 400 })
  }
}
