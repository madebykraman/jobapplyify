import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
export const runtime='nodejs'

function authorized(req:Request){const expected=process.env.ROVA_WORKER_TOKEN||'';return Boolean(expected&&req.headers.get('authorization')===`Bearer ${expected}`)}

export async function GET(req:Request,{params}:{params:Promise<{id:string}>}){
  if(!authorized(req))return NextResponse.json({error:'Unauthorized.'},{status:401})
  const admin=supabaseAdmin();if(!admin)return NextResponse.json({error:'Server persistence is not configured.'},{status:503})
  const {id}=await params;const {data,error}=await admin.from('automation_jobs').select('id,state,mode,lease_owner,lease_expires_at').eq('id',id).single()
  if(error||!data)return NextResponse.json({error:'Job not found.'},{status:404});return NextResponse.json({job:data})
}

export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){
  if(!authorized(req))return NextResponse.json({error:'Unauthorized.'},{status:401})
  const admin=supabaseAdmin();if(!admin)return NextResponse.json({error:'Server persistence is not configured.'},{status:503})
  try{
    const {id}=await params;const body=await req.json().catch(()=>({}));const workerId=String(body?.workerId||'')
    if(!workerId||!/^[A-Za-z0-9_-]{1,128}$/.test(workerId))return NextResponse.json({error:'Valid workerId is required.'},{status:400})
    const leaseSeconds=Math.max(30,Math.min(Number(body?.leaseSeconds)||120,900))
    const {data,error}=await admin.from('automation_jobs').update({lease_expires_at:new Date(Date.now()+leaseSeconds*1000).toISOString(),updated_at:new Date().toISOString()}).eq('id',id).eq('state','running').eq('lease_owner',workerId).select('id,state,lease_owner,lease_expires_at').maybeSingle()
    if(error)return NextResponse.json({error:error.message},{status:500})
    if(!data)return NextResponse.json({error:'Lease is no longer owned by this worker.'},{status:409})
    return NextResponse.json({job:data})
  }catch(error){return NextResponse.json({error:error instanceof Error?error.message:'Heartbeat failed.'},{status:400})}
}
