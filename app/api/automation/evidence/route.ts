import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const expected = process.env.ROVA_WORKER_CALLBACK_TOKEN || ''
  if (!expected || req.headers.get('authorization') !== `Bearer ${expected}`) return NextResponse.json({ error:'Unauthorized.' }, { status:401 })
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
