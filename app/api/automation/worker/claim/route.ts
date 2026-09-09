import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const expected = process.env.ROVA_WORKER_TOKEN || ''
  if (!expected || req.headers.get('authorization') !== `Bearer ${expected}`) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  const admin = supabaseAdmin(); if (!admin) return NextResponse.json({ error:'Server persistence is not configured.' }, { status:503 })
  try {
    const body = await req.json().catch(() => ({})); const workerId = String(body?.workerId || '')
    if (!/^[A-Za-z0-9_-]{1,128}$/.test(workerId)) return NextResponse.json({ error:'Valid workerId is required.' }, { status:400 })
    const { data: jobs, error } = await admin.rpc('claim_automation_job', { p_worker_id: workerId, p_lease_seconds: 120 })
    if (error) return NextResponse.json({ error:error.message }, { status:500 })
    const job = Array.isArray(jobs) ? jobs[0] : jobs
    if (!job) return NextResponse.json({ job:null })
    const [{ data: profile }, { data: resume }] = await Promise.all([
      admin.from('profiles').select('name,email,phone,location,headline,linkedin,portfolio').eq('id',job.user_id).single(),
      admin.from('resumes').select('id,source_document_id').eq('user_id',job.user_id).order('updated_at',{ascending:false}).limit(1).maybeSingle(),
    ])
    if (!profile?.name || !profile?.email) return NextResponse.json({ error:'Candidate profile is incomplete.', jobId:job.id }, { status:422 })
    let resumeUrl: string | undefined
    if (resume?.source_document_id) {
      const { data: doc } = await admin.from('documents').select('storage_path').eq('id',resume.source_document_id).eq('user_id',job.user_id).maybeSingle()
      if (doc?.storage_path) { const signed = await admin.storage.from('documents').createSignedUrl(doc.storage_path,300); resumeUrl = signed.data?.signedUrl }
    }
    await admin.from('automation_events').insert({ user_id:job.user_id, automation_job_id:job.id, event_type:'claimed', state:'running', message:'Worker claimed the durable automation job.', metadata:{workerId,workerTaskId:job.worker_task_id} })
    return NextResponse.json({ job:{ id:job.worker_task_id, taskId:job.worker_task_id, jobId:job.id, company:job.company, role:job.role, applicationUrl:job.application_url, mode:job.mode, accountKey:`${job.user_id}`, candidate:{...profile,resumeUrl} } })
  } catch (error) { return NextResponse.json({ error:error instanceof Error ? error.message : 'Claim failed.' }, { status:500 }) }
}
