import { NextResponse } from 'next/server'
import { supabaseForAccessToken } from '@/lib/supabase-server'

export const runtime = 'nodejs'

function auth(req: Request) { const value = req.headers.get('authorization') || ''; return value.startsWith('Bearer ') ? value.slice(7) : '' }
function validHttps(value: unknown) { try { return new URL(String(value)).protocol === 'https:' } catch { return false } }

export async function GET(req: Request) {
  const client = supabaseForAccessToken(auth(req)); if (!client) return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 })
  const { data: { user }, error: userError } = await client.auth.getUser(); if (userError || !user) return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 })
  const [{ data: jobs, error }, { data: profile }] = await Promise.all([
    client.from('automation_jobs').select('*').order('created_at', { ascending: false }).limit(200),
    client.from('profiles').select('automation_paused').eq('id', user.id).maybeSingle(),
  ])
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ jobs: jobs || [], paused: Boolean(profile?.automation_paused) })
}

export async function POST(req: Request) {
  const client = supabaseForAccessToken(auth(req)); if (!client) return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 })
  const { data: { user }, error: userError } = await client.auth.getUser(); if (userError || !user) return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 })
  try {
    const body = await req.json()
    if (!body?.applicationUrl || !validHttps(body.applicationUrl)) return NextResponse.json({ error: 'A valid HTTPS application URL is required.' }, { status: 400 })
    if (!['dry-run', 'review', 'full-auto'].includes(body.mode)) return NextResponse.json({ error: 'Invalid automation mode.' }, { status: 400 })
    const { data: profile } = await client.from('profiles').select('automation_paused').eq('id', user.id).maybeSingle()
    if (profile?.automation_paused) return NextResponse.json({ error: 'Automation queue is paused.' }, { status: 409 })
    const { data, error } = await client.from('automation_jobs').insert({ user_id: user.id, company: String(body.company || '').slice(0, 200), role: String(body.role || '').slice(0, 200), source: String(body.source || '').slice(0, 100), application_url: body.applicationUrl, state: 'queued', mode: body.mode, max_attempts: 3, next_attempt_at: new Date().toISOString() }).select('*').single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    await client.from('automation_events').insert({ user_id: user.id, automation_job_id: data.id, event_type: 'queued', state: 'queued', message: 'Automation job queued.' })
    return NextResponse.json({ job: data }, { status: 201 })
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid request.' }, { status: 400 }) }
}

export async function PATCH(req: Request) {
  const client = supabaseForAccessToken(auth(req)); if (!client) return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 })
  const { data: { user }, error: userError } = await client.auth.getUser(); if (userError || !user) return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 })
  try {
    const body = await req.json(); const action = String(body?.action || ''); const jobId = String(body?.jobId || '')
    if (action === 'pause' || action === 'resume') {
      const paused = action === 'pause'; const { error } = await client.from('profiles').update({ automation_paused: paused, updated_at: new Date().toISOString() }).eq('id', user.id)
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ paused })
    }
    if (!jobId || !['cancel','retry'].includes(action)) return NextResponse.json({ error: 'Invalid queue action.' }, { status: 400 })
    const { data: job } = await client.from('automation_jobs').select('*').eq('id', jobId).single(); if (!job) return NextResponse.json({ error: 'Automation job not found.' }, { status: 404 })
    if (action === 'cancel') {
      if (['submitted','verified','cancelled'].includes(job.state)) return NextResponse.json({ error: 'Job cannot be cancelled in its current state.' }, { status: 409 })
      const { error } = await client.from('automation_jobs').update({ state:'cancelled', lease_owner:null, lease_expires_at:null, updated_at:new Date().toISOString() }).eq('id',jobId)
      if (error) return NextResponse.json({ error:error.message }, { status:500 })
      await client.from('automation_events').insert({ user_id:user.id, automation_job_id:jobId, event_type:'cancelled', state:'cancelled', message:'Automation job cancelled by the user.' })
      return NextResponse.json({ state:'cancelled' })
    }
    if (job.attempts >= job.max_attempts) return NextResponse.json({ error:'Maximum attempts reached.' }, { status:409 })
    const { error } = await client.from('automation_jobs').update({ state:'queued', handoff:null, last_error:null, worker_state:null, lease_owner:null, lease_expires_at:null, next_attempt_at:new Date().toISOString(), updated_at:new Date().toISOString() }).eq('id',jobId)
    if (error) return NextResponse.json({ error:error.message }, { status:500 })
    await client.from('automation_events').insert({ user_id:user.id, automation_job_id:jobId, event_type:'retry', state:'queued', message:'Automation job re-queued for another attempt.' })
    return NextResponse.json({ state:'queued' })
  } catch (error) { return NextResponse.json({ error:error instanceof Error ? error.message : 'Invalid queue action.' }, { status:400 }) }
}
