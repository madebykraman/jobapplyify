import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
export const runtime='nodejs'
export async function GET(req:Request,{params}:{params:Promise<{id:string}>}){const expected=process.env.ROVA_WORKER_TOKEN||'';if(!expected||req.headers.get('authorization')!==`Bearer ${expected}`)return NextResponse.json({error:'Unauthorized.'},{status:401});const admin=supabaseAdmin();if(!admin)return NextResponse.json({error:'Server persistence is not configured.'},{status:503});const {id}=await params;const {data,error}=await admin.from('automation_jobs').select('id,state,mode,lease_owner,lease_expires_at').eq('id',id).single();if(error||!data)return NextResponse.json({error:'Job not found.'},{status:404});return NextResponse.json({job:data})}
