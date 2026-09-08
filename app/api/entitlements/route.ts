import { NextResponse } from 'next/server'
import { supabaseForAccessToken } from '@/lib/supabase-server'

const INVITE_CODE = process.env.KINDLEAP_BETA_INVITE || 'WAYO-BETA'

function client(request: Request){
  const auth = request.headers.get('authorization') || ''
  if(!auth.startsWith('Bearer ')) return null
  return supabaseForAccessToken(auth.slice(7))
}

export async function GET(request: Request){
  const supabase = client(request)
  if(!supabase) return NextResponse.json({error:'Authentication required'},{status:401})
  const {data:{user},error:userError}=await supabase.auth.getUser()
  if(userError||!user) return NextResponse.json({error:'Authentication required'},{status:401})
  const {data,error}=await supabase.from('entitlements').select('plan,status,source,period_end').eq('user_id',user.id).maybeSingle()
  if(error) return NextResponse.json({error:'Unable to read entitlement'},{status:500})
  return NextResponse.json({plan:data?.plan||'free',status:data?.status||'active',source:data?.source||null,currentPeriodEnd:data?.period_end||null})
}

export async function POST(request: Request){
  const supabase = client(request)
  if(!supabase) return NextResponse.json({error:'Authentication required'},{status:401})
  const {data:{user},error:userError}=await supabase.auth.getUser()
  if(userError||!user) return NextResponse.json({error:'Authentication required'},{status:401})
  const body=await request.json().catch(()=>({}))
  const code=typeof body.code==='string'?body.code.trim().toUpperCase():''
  if(!code || code!==INVITE_CODE.toUpperCase()) return NextResponse.json({error:'Invalid invite code'},{status:400})
  const {data,error}=await supabase.from('entitlements').upsert({user_id:user.id,plan:'pro',status:'active',source:'beta_invite',period_end:null,updated_at:new Date().toISOString()},{onConflict:'user_id'}).select('plan,status,source').single()
  if(error) return NextResponse.json({error:'Unable to activate Pro'},{status:500})
  return NextResponse.json({ok:true,entitlement:data})
}
