import type { RovaProfile } from './storage'

export type JobRecord = {
  id: string
  company: string
  title: string
  location: string
  workMode: string
  employment: string
  source: string
  url: string
  applyUrl: string
  description: string
  salary: string
  postedAt?: string
  department?: string
  sourceId?: string
}

export type JobAnalysis = {
  fit: number
  matched: string[]
  gaps: string[]
  seniority: string
  salary: string
  workMode: string
  applicationRoute: string
  duplicateKey: string
  careerRelevance: string
  companyContext: string
  projectSignals: string[]
  summary: string
  signals: { label: string; value: string }[]
}

const STOP = new Set('the and for with from that this your you are have has was were will can our their about into over under using use used role job work team years year to of in on a an as at is be by or it'.split(' '))

export function terms(text: string) {
  return [...new Set((text.toLowerCase().match(/[a-z][a-z+#.-]{2,}/g) || []).filter(x => !STOP.has(x)))]
}

function profileText(p: RovaProfile) { return `${p.headline} ${p.skills.join(' ')} ${p.targetRoles.join(' ')}`.toLowerCase() }
function cleanKey(value: string) { return value.toLowerCase().replace(/https?:\/\/|www\./g, '').replace(/[^a-z0-9]+/g, ' ').trim() }

export function canonicalJobKey(job: Pick<JobRecord,'company'|'title'|'location'|'url'|'sourceId'>) {
  if (job.sourceId) return `${job.source}:${job.sourceId}`.toLowerCase()
  if (job.url) return `url:${cleanKey(job.url)}`
  return `role:${cleanKey(`${job.company}|${job.title}|${job.location}`)}`
}

export function analyseJob(job: JobRecord, profile: RovaProfile): JobAnalysis {
  const text = `${job.title} ${job.description} ${job.department || ''}`.toLowerCase()
  const p = profileText(profile)
  const candidateTerms = terms(p)
  const matched = candidateTerms.filter(t => t.length > 3 && text.includes(t)).slice(0, 14)
  const important = terms(job.description).filter(t => t.length > 4).slice(0, 20)
  const gaps = important.filter(t => !p.includes(t)).slice(0, 10)
  const targetBoost = profile.targetRoles.some(r => job.title.toLowerCase().includes(r.toLowerCase())) ? 15 : 0
  const fit = Math.max(0, Math.min(99, Math.round((matched.length / Math.max(8, Math.min(candidateTerms.length, 20))) * 70 + targetBoost + (job.description.length > 500 ? 8 : 0))))
  const seniority = /principal|staff|lead|director|vp|head/i.test(job.title) ? 'Senior / leadership' : /senior|sr\.?/i.test(job.title) ? 'Senior' : /junior|entry|intern|graduate/i.test(job.title) ? 'Early career' : 'Mid-level / unspecified'
  const salary = job.salary || 'Not disclosed'
  const applicationRoute = job.applyUrl ? 'Direct application link available' : 'Source page'
  const duplicateKey = canonicalJobKey(job)
  const targetRole = profile.targetRoles.find(r => job.title.toLowerCase().includes(r.toLowerCase()))
  const careerRelevance = targetRole ? `Directly aligned with target role: ${targetRole}.` : profile.targetRoles.length ? 'Adjacent to the declared target roles; review the career path before applying.' : 'Set target roles in Profile to calculate career relevance.'
  const projectSignals = terms(`${job.title} ${job.description}`).filter(t => /product|design|system|brand|research|frontend|react|prototype|strategy|growth|platform|analytics|motion|creative/i.test(t)).slice(0, 6)
  const companyContext = job.company && job.company !== 'Unknown company' ? `${job.company} · ${job.department || 'Team not disclosed'}` : 'Company context not supplied by the source.'
  return {
    fit, matched, gaps, seniority, salary, workMode: job.workMode || 'Unspecified', applicationRoute, duplicateKey, careerRelevance, companyContext, projectSignals,
    summary: fit >= 80 ? 'Strong profile alignment. Review the evidence gaps before applying.' : fit >= 60 ? 'Plausible match. Tailoring should focus on the missing signals.' : 'Weak current alignment. Consider this only if it supports the intended career path.',
    signals: [
      { label: 'Fit', value: `${fit}/100` },
      { label: 'Career relevance', value: targetRole ? 'Direct' : profile.targetRoles.length ? 'Adjacent' : 'Unrated' },
      { label: 'Seniority', value: seniority },
      { label: 'Compensation', value: salary },
      { label: 'Work mode', value: job.workMode || 'Unspecified' },
    ]
  }
}

export function normalizeText(value: unknown) { return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '' }
export function humanizeSlug(value: string) { return value.split(/[-_]+/).filter(Boolean).map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(' ') }

export function normalizeGreenhouse(data: any, sourceUrl: string): JobRecord[] {
  const fallbackCompany = humanizeSlug(new URL(sourceUrl).pathname.split('/').filter(Boolean)[2] || new URL(sourceUrl).pathname.split('/').filter(Boolean)[0] || 'Unknown company')
  return (data?.jobs || []).map((j: any) => ({ id: `gh_${j.id}`, company: normalizeText(data?.name || fallbackCompany), title: normalizeText(j.title), location: normalizeText(j.location?.name || j.location || ''), workMode: /remote/i.test(`${j.title} ${j.location?.name || ''} ${j.content || ''}`) ? 'Remote' : 'On-site / hybrid', employment: normalizeText(j.metadata?.find((m:any)=>/employment/i.test(m.name))?.value || ''), source: 'Greenhouse', url: normalizeText(j.absolute_url || sourceUrl), applyUrl: normalizeText(j.absolute_url || sourceUrl), description: normalizeText(j.content), salary: '', postedAt: j.updated_at, department: normalizeText(j.departments?.map((x:any)=>x.name).join(', ')), sourceId: String(j.id) }))
}

export function normalizeLever(data: any[], sourceUrl: string): JobRecord[] {
  const company = humanizeSlug(new URL(sourceUrl).pathname.split('/').filter(Boolean).pop() || 'Unknown company')
  return (Array.isArray(data) ? data : []).map((j: any) => ({ id: `lever_${j.id}`, company, title: normalizeText(j.text), location: normalizeText(j.categories?.location || ''), workMode: /remote/i.test(`${j.text} ${j.categories?.location || ''}`) ? 'Remote' : 'On-site / hybrid', employment: normalizeText(j.categories?.commitment || ''), source: 'Lever', url: normalizeText(j.hostedUrl || sourceUrl), applyUrl: normalizeText(j.applyUrl || j.hostedUrl || sourceUrl), description: normalizeText(j.descriptionPlain || j.description || ''), salary: normalizeText(j.salaryRange || ''), postedAt: j.createdAt ? new Date(j.createdAt).toISOString() : undefined, department: normalizeText(j.categories?.department || j.categories?.team || ''), sourceId: String(j.id) }))
}

export function normalizeAshby(data: any, sourceUrl: string): JobRecord[] {
  const company = humanizeSlug(new URL(sourceUrl).pathname.split('/').filter(Boolean).pop() || 'Unknown company')
  return (data?.jobs || []).filter((j:any)=>j.isListed !== false).map((j: any) => ({ id: `ashby_${j.jobUrl || j.title}`, company: normalizeText(data?.jobBoardName || company), title: normalizeText(j.title), location: normalizeText(j.location), workMode: normalizeText(j.workplaceType) || (/remote/i.test(`${j.title} ${j.location || ''}`) ? 'Remote' : 'On-site / hybrid'), employment: normalizeText(j.employmentType || ''), source: 'Ashby', url: normalizeText(j.jobUrl || sourceUrl), applyUrl: normalizeText(j.applyUrl || j.jobUrl || sourceUrl), description: normalizeText(j.descriptionPlain || j.description || ''), salary: normalizeText(j.compensation?.scrapeableCompensationSalarySummary || ''), postedAt: j.publishedAt, department: normalizeText(j.department || j.team || ''), sourceId: normalizeText(j.jobUrl || j.title) }))
}
