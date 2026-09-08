import { NextResponse } from 'next/server'
import { supabaseForAccessToken } from '@/lib/supabase-server'

export const runtime = 'nodejs'

function auth(req: Request) {
  const value = req.headers.get('authorization') || ''
  return value.startsWith('Bearer ') ? value.slice(7) : ''
}

export async function POST(req: Request) {
  const workerUrl = process.env.ROVA_WORKER_URL
  const workerToken = process.env.ROVA_WORKER_TOKEN
  const client = supabaseForAccessToken(auth(req))
  if (!client) return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 })
  if (!workerUrl || !workerToken) return NextResponse.json({ error: 'Browser worker is not securely configured.' }, { status: 503 })

  try {
    const { data: { user }, error: userError } = await client.auth.getUser()
    if (userError || !user) return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 })

    const task = await req.json()
    if (!task?.jobId || !task?.id || !task?.applicationUrl || !['dry-run', 'review', 'full-auto'].includes(task.mode) || !task.candidate?.name || !task.candidate?.email) {
      return NextResponse.json({ error: 'Invalid durable automation task.' }, { status: 400 })
    }

    const { data: job, error: jobError } = await client.from('automation_jobs').select('*').eq('id', task.jobId).single()
    if (jobError || !job) return NextResponse.json({ error: 'Automation job not found.' }, { status: 404 })
    if (job.state !== 'queued' && job.state !== 'failed') return NextResponse.json({ error: 'Automation job is not dispatchable in its current state.' }, { status: 409 })
    if (job.application_url !== task.applicationUrl) return NextResponse.json({ error: 'Task URL does not match the queued job.' }, { status: 409 })
    if (job.mode !== task.mode) return NextResponse.json({ error: 'Task mode does not match the queued job.' }, { status: 409 })

    const target = new URL('/tasks', workerUrl)
    if (target.protocol !== 'https:' && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Worker URL must use HTTPS in production.' }, { status: 503 })
    }

    const response = await fetch(target, {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json', authorization: `Bearer ${workerToken}` },
      body: JSON.stringify({ ...task, jobId: job.id }),
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    })
    const data = await response.json().catch(() => ({ error: 'Worker returned invalid JSON.' }))
    if (response.ok) {
      await client.from('automation_jobs').update({ worker_task_id: String(data.taskId || task.id), state: 'running', worker_state: 'started', updated_at: new Date().toISOString() }).eq('id', job.id)
      await client.from('automation_events').insert({ user_id: user.id, automation_job_id: job.id, event_type: 'dispatched', state: 'running', message: 'Automation job dispatched to the browser worker.', metadata: { workerTaskId: data.taskId || task.id } })
    }
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Worker dispatch failed.' }, { status: 502 })
  }
}
