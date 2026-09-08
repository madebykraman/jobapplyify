import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const workerUrl = process.env.ROVA_WORKER_URL
  const workerToken = process.env.ROVA_WORKER_TOKEN
  if (!workerUrl || !workerToken) return NextResponse.json({ error: 'Browser worker is not securely configured.' }, { status: 503 })

  try {
    const task = await req.json()
    if (!task?.id || !task?.applicationUrl || !['dry-run', 'review', 'full-auto'].includes(task.mode) || !task.candidate?.name || !task.candidate?.email) {
      return NextResponse.json({ error: 'Invalid automation task.' }, { status: 400 })
    }
    const target = new URL('/tasks', workerUrl)
    if (target.protocol !== 'https:' && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Worker URL must use HTTPS in production.' }, { status: 503 })
    }
    const response = await fetch(target, {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json', authorization: `Bearer ${workerToken}` },
      body: JSON.stringify(task),
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    })
    const data = await response.json().catch(() => ({ error: 'Worker returned invalid JSON.' }))
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Worker dispatch failed.' }, { status: 502 })
  }
}
