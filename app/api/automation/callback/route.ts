import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const expected = process.env.ROVA_WORKER_CALLBACK_TOKEN || ''
  if (!expected || req.headers.get('authorization') !== `Bearer ${expected}`) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  const admin = supabaseAdmin()
  if (!admin) return NextResponse.json({ error: 'Server persistence is not configured.' }, { status: 503 })
  try {
    const body = await req.json()
    if (!body?.jobId || !body?.workerTaskId || !body?.state) return NextResponse.json({ error: 'Invalid worker result.' }, { status: 400 })
    const { data: job, error: jobError } = await admin.from('automation_jobs').select('id,user_id,attempts,max_attempts').eq('id', body.jobId).single()
    if (jobError || !job) return NextResponse.json({ error: 'Automation job not found.' }, { status: 404 })
    const stateMap: Record<string, string> = { started: 'running', navigating: 'running', handoff: 'human-review', ready: 'ready', submitted: 'submitted', verified: 'verified', failed: 'failed' }
    const nextState = stateMap[String(body.state)] || 'failed'
    const patch = { state: nextState, worker_task_id: body.workerTaskId, worker_state: body.state, handoff: body.handoffReason || null, last_error: nextState === 'failed' ? String(body.message || 'Worker execution failed.') : null, evidence: body.evidence || {}, updated_at: new Date().toISOString() }
    const { error: updateError } = await admin.from('automation_jobs').update(patch).eq('id', job.id)
    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 })
    await admin.from('automation_events').insert({ user_id: job.user_id, automation_job_id: job.id, event_type: `worker:${body.state}`, state: nextState, message: String(body.message || ''), metadata: { workerTaskId: body.workerTaskId, handoffReason: body.handoffReason || null, evidence: body.evidence || {} } })
    return NextResponse.json({ ok: true, state: nextState })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid callback.' }, { status: 400 })
  }
}
