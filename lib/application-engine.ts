import type { JobRecord } from './job-engine'
import { analyzeResume, tokenize } from './resume-engine'
import type { RovaProfile, RovaResume } from './storage'

export type ApplicationPack = {
  atsScore: number
  targetRole: string
  resumeVariant: string
  summary: string
  coverLetter: string
  answers: { question: string; answer: string }[]
  matched: string[]
  missing: string[]
  warnings: string[]
}

function firstName(name:string){return name.trim().split(/\s+/)[0] || 'Candidate'}
function sentence(text:string){return text.replace(/\s+/g,' ').trim()}
function roleFor(job:JobRecord, profile:RovaProfile){return job.title || profile.targetRoles[0] || 'the role'}
function formatSalaryTarget(value:string){const clean=value.trim().replace(/^₹\s*/,'').replace(/\s*LPA$/i,'');return clean ? `₹${clean} LPA` : ''}
function evidenceOr(value:string,fallback:string){return value.trim() || fallback}

export function buildApplicationPack(job:JobRecord, profile:RovaProfile, resume:RovaResume|null):ApplicationPack {
  const resumeText=resume?.content || `${profile.headline}\nSkills: ${profile.skills.join(', ')}\nTarget roles: ${profile.targetRoles.join(', ')}`
  const analysis=analyzeResume(resumeText,`${job.title} ${job.description}`)
  const targetRole=roleFor(job,profile)
  const matched=analysis.matchedSkills.slice(0,12)
  const missing=analysis.missingSkills.slice(0,8)
  const verifiedSkills=profile.skills.slice(0,5).join(', ')
  const matchedEvidence=matched.slice(0,5).join(', ')
  const roleFocus=evidenceOr(job.department ?? '','the responsibilities described in the posting')
  const evidenceFocus=evidenceOr(matchedEvidence,evidenceOr(verifiedSkills,'the evidence represented in my application materials'))
  const summary=sentence(profile.headline || (verifiedSkills ? `${targetRole} with experience in ${verifiedSkills}.` : `Application preparation for ${targetRole}, based only on the evidence currently available.`))
  const coverLetter=`Dear Hiring Team,\n\nI am applying for the ${targetRole} opportunity at ${job.company}. The role's focus on ${roleFocus} is relevant to the evidence currently represented in my application.\n\nThe strongest directly matched signals are ${evidenceFocus}. I would welcome the opportunity to discuss the work and the evidence behind my application with ${job.company}.\n\nRegards,\n${firstName(profile.name)}`
  const compensation=formatSalaryTarget(profile.targetSalary)
  const answers=[
    {question:'Why are you interested in this role?',answer:`I am interested in the ${targetRole} opportunity because its focus on ${roleFocus} overlaps with the strongest evidence currently available in my application: ${evidenceOr(matched.slice(0,4).join(', '),evidenceOr(verifiedSkills,'the experience represented in my materials'))}.`},
    {question:'Why should we consider you?',answer:(verifiedSkills || matched.length > 0)?`The strongest evidence currently available is ${evidenceFocus}. I would prefer to discuss the specific work and outcomes represented in that evidence rather than make unsupported claims.`:'My application currently contains limited verified evidence for this question. I would rather provide the missing evidence than invent qualifications or experience.'},
    {question:'What is your expected compensation?',answer:compensation ? `My current target is around ${compensation}, with flexibility depending on the scope, location and total compensation of the role.` : 'I am open to discussing compensation based on the scope of the role and the overall package.'},
  ]
  const warnings=[...analysis.warnings]
  if(missing.length) warnings.push(`Do not claim missing skills without evidence: ${missing.slice(0,5).join(', ')}.`)
  if(!resume?.content && !verifiedSkills && !profile.headline) warnings.push('Evidence is limited. Complete Profile or import a verified resume before using generated application copy.')
  return {atsScore:analysis.score,targetRole,resumeVariant:`${targetRole} · ${job.company}`,summary,coverLetter,answers,matched,missing,warnings}
}

export function extractJobKeywords(job:JobRecord){return tokenize(`${job.title} ${job.description}`).slice(0,30)}
