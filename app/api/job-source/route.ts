import { NextResponse } from 'next/server'
import { normalizeAshby, normalizeGreenhouse, normalizeLever } from '@/lib/job-engine'

function allowed(url: URL) {
  const h = url.hostname.toLowerCase()
  return h === 'boards-api.greenhouse.io' || h === 'api.lever.co' || h === 'api.ashbyhq.com' || h === 'jobs.lever.co' || h === 'boards.greenhouse.io' || h === 'jobs.ashbyhq.com'
}

function sourceFrom(url: URL) {
  const h = url.hostname.toLowerCase()
  if (h.includes('greenhouse')) return 'greenhouse'
  if (h.includes('lever')) return 'lever'
  if (h.includes('ashby')) return 'ashby'
  return null
}

export async function POST(req: Request) {
  try {
    const { url: raw } = await req.json()
    const url = new URL(String(raw || ''))
    if (url.protocol !== 'https:' || !allowed(url)) return NextResponse.json({ error: 'Only supported public ATS job-board URLs are allowed.' }, { status: 400 })
    const source = sourceFrom(url)
    if (!source) return NextResponse.json({ error: 'Unsupported source.' }, { status: 400 })
    let endpoint = url.toString()
    if (source === 'greenhouse' && !url.hostname.startsWith('boards-api.')) {
      const slug = url.pathname.split('/').filter(Boolean)[0]
      if (!slug) throw new Error('Greenhouse board token is missing.')
      endpoint = `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(slug)}/jobs?content=true`
    }
    if (source === 'lever' && !url.hostname.startsWith('api.')) {
      const slug = url.pathname.split('/').filter(Boolean)[0]
      if (!slug) throw new Error('Lever site slug is missing.')
      endpoint = `https://api.lever.co/v0/postings/${encodeURIComponent(slug)}?mode=json`
    }
    if (source === 'ashby' && !url.hostname.startsWith('api.')) {
      const slug = url.pathname.split('/').filter(Boolean)[0]
      if (!slug) throw new Error('Ashby job-board name is missing.')
      endpoint = `https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(slug)}?includeCompensation=true`
    }
    const response = await fetch(endpoint, { headers: { accept: 'application/json', 'user-agent': 'ROVA Job Intelligence/0.5' }, cache: 'no-store' })
    if (!response.ok) return NextResponse.json({ error: `Source returned HTTP ${response.status}.` }, { status: 502 })
    const data = await response.json()
    const jobs = source === 'greenhouse' ? normalizeGreenhouse(data, endpoint) : source === 'lever' ? normalizeLever(data, endpoint) : normalizeAshby(data, endpoint)
    return NextResponse.json({ source, count: jobs.length, jobs })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to read job source.' }, { status: 400 })
  }
}
