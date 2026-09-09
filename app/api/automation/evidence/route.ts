import { NextResponse } from 'next/server'
import { supabaseForAccessToken, supabaseAdmin } from '@/lib/supabase-server'

export const runtime = 'nodejs'

function bearer(req: Request) { const value = req.headers.get('authorization') || ''; return value.startsWith('Bearer ') ? value.slice(7) : '' }

export async function GET(req: Request) {
  const client = supabaseForAccessToken(bearer(req))
  if (!client) return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 })
  const { data: { user } } = await client.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 })
  const jobId = new URL(req.url).searchParams.get('jobId') || ''
  if (!jobId) return NextResponse.json({ error: 'jobId is required.' }, { status: 400 })
  const { data: job, error } = await client.from('automation_jobs').select('id,evidence').eq('id', jobId).maybeSingle()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!job) return NextResponse.json({ error: 'Automation job not found.' }, { status: 404 })
  const evidence = job.evidence && typeof job.evidence === 'object' ? job.evidence as Record<string, unknown> : {}
  const admin = supabaseAdmin()
  if (!admin) return NextResponse.json({ error: 'Server persistence is not configured.' }, { status: 503 })
  const result: Record<string, unknown> = {}
  for (const key of ['screenshotPath', 'htmlPath']) {
    const path = typeof evidence[key] === 'string' ? evidence[key] as string : ''
    if (!path || !path.startsWith(`${user.id}/${jobId}/`)) continue
    const signed = await admin.storage.from('automation-evidence').createSignedUrl(path, 300)
    if (!signed.error && signed.data?.signedUrl) result[key] = signed.data.signedUrl
  }
  return NextResponse.json({ evidence: result })
}

export async function POST(req: Request) {
  const expected = process.env.ROVA_WORKER_CALLBACK_TOKEN || ''
  if (!expected || req.headers.get('authorization') !== `Bearer ${expected}`) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  const admin = supabaseAdmin(); if (!admin) return NextResponse.json({ error:'Server persistence is not configured.' }, { status:503 })
  try {
    const form = await req.formData(); const jobId=String(form.get('jobId')||''); const taskId=String(form.get('taskId')||''); const file=form.get('file')
    if (!jobId || !taskId || !(file instanceof File)) return NextResponse.json({ error:'jobId, taskId and file are required.' }, { status:400 })
    if (file.size > 5*1024*1024) return NextResponse.json({ error:'Evidence file exceeds 5 MB.' }, { status:413 })
    const { data: job } = await admin.from('automation_jobs').select('user_id,worker_task_id').eq('id',jobId).single(); if (!job) return NextResponse.json({ error:'Automation job not found.' }, { status:404 })
    if (job.worker_task_id && job.worker_task_id !== taskId) return NextResponse.json({ error:'Worker task does not match job.' }, { status:409 })
    const safeName = String(file.name||'evidence.bin').replace(/[^a-z0-9._-]/gi,'_').slice(-120)
    const path = `${job.user_id}/${jobId}/${Date.now()}-${safeName}`
    const bytes = new Uint8Array(await file.arrayBuffer())
    const { error } = await admin.storage.from('automation-evidence').upload(path, bytes, { contentType:file.type||'application/octet-stream', upsert:false })
    if (error) return NextResponse.json({ error:error.message }, { status:500 })
    return NextResponse.json({ path, size:file.size, type:file.type })
  } catch (error) { return NextResponse.json({ error:error instanceof Error ? error.message : 'Evidence upload failed.' }, { status:500 }) }
}
