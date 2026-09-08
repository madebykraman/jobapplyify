import { NextResponse } from 'next/server'
import { supabaseForAccessToken } from '@/lib/supabase-server'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const bearer = req.headers.get('authorization') || ''
  const token = bearer.startsWith('Bearer ') ? bearer.slice(7) : ''
  const client = supabaseForAccessToken(token)
  if (!client) return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 })
  const { data: { user }, error: userError } = await client.auth.getUser()
  if (userError || !user) return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 })
  try {
    const body = await req.json()
    const path = String(body?.storagePath || '')
    if (!path || !path.startsWith(`${user.id}/`)) return NextResponse.json({ error: 'Invalid document reference.' }, { status: 400 })
    const { data, error } = await client.storage.from('documents').createSignedUrl(path, 300)
    if (error || !data?.signedUrl) return NextResponse.json({ error: error?.message || 'Could not create signed URL.' }, { status: 404 })
    return NextResponse.json({ url: data.signedUrl, expiresIn: 300 })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid request.' }, { status: 400 })
  }
}
