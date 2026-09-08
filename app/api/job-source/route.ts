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
function parts(url: URL) { return url.pathname.split('/').filter(Boolean) }

export async function POST(req: Request) {
  try {
    const { url: raw } = await req.json()
    const url = new URL(String(raw || ''))
    if (url.protocol !== 'https:' || !allowed(url)) return NextResponse.json({ error: 'Only supported public ATS URLs are allowed.' }, { status: 400 })
    const source = sourceFrom(url)
    if (!source) return NextResponse.json({ error: 'Unsupported source.' }, { status: 400 })
    const p = parts(url)
    let endpoint = url.toString()
    let jobId: string | null = null
    let boardSlug: string | null = null
    let single = false

    if (source === 'greenhouse') {
      if (url.hostname === 'boards-api.greenhouse.io') {
        boardSlug = p[2] || null
        jobId = p[4] || null
        single = Boolean(jobId && p[3] === 'jobs')
      } else {
        boardSlug = p[1] || p[0] || null
        jobId = p[3] || null
        single = Boolean(p[2] === 'jobs' && jobId)
      }
      if (!boardSlug) throw new Error('Greenhouse board token is missing.')
      endpoint = single ? `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(boardSlug)}/jobs/${encodeURIComponent(jobId!)}` : `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(boardSlug)}/jobs?content=true`
    }

    if (source === 'lever') {
      if (url.hostname === 'api.lever.co') {
        boardSlug = p[3] || null
        jobId = p[4] || null
        single = Boolean(jobId)
      } else {
        boardSlug = p[0] || null
        jobId = p[1] || null
        single = Boolean(jobId)
      }
      if (!boardSlug) throw new Error('Lever site slug is missing.')
      endpoint = single ? `https://api.lever.co/v0/postings/${encodeURIComponent(boardSlug)}/${encodeURIComponent(jobId!)}?mode=json` : `https://api.lever.co/v0/postings/${encodeURIComponent(boardSlug)}?mode=json`
    }

    if (source === 'ashby') {
      boardSlug = p[p.length - 1] || null
      if (!boardSlug) throw new Error('Ashby job-board name is missing.')
      endpoint = `https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(boardSlug)}?includeCompensation=true`
      single = url.hostname === 'jobs.ashbyhq.com' && p.length > 1
    }

    const response = await fetch(endpoint, { headers: { accept: 'application/json', 'user-agent': 'ROVA Job Intelligence/0.6' }, cache: 'no-store' })
    if (!response.ok) return NextResponse.json({ error: `Source returned HTTP ${response.status}.` }, { status: 502 })
    const data = await response.json()
    let jobs = source === 'greenhouse' ? normalizeGreenhouse(single ? { jobs: [data] } : data, endpoint) : source === 'lever' ? normalizeLever(single ? [data] : data, endpoint) : normalizeAshby(data, endpoint)

    if (source === 'ashby' && single) {
      const requested = url.toString().replace(/\/$/, '')
      jobs = jobs.filter(j => j.url.replace(/\/$/, '') === requested || j.applyUrl.replace(/\/$/, '') === requested)
      if (!jobs.length) return NextResponse.json({ error: 'The Ashby job was not found in the public board feed.' }, { status: 404 })
    }
    if (!jobs.length) return NextResponse.json({ error: 'No public jobs were found at this URL.' }, { status: 404 })
    return NextResponse.json({ source, count: jobs.length, single, jobs })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to read job source.' }, { status: 400 })
  }
}
