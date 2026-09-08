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

export function buildApplicationPack(job:JobRecord, profile:RovaProfile, resume:RovaResume|null):ApplicationPack {
  const resumeText=resume?.content || `${profile.headline}\nSkills: ${profile.skills.join(', ')}\nTarget roles: ${profile.targetRoles.join(', ')}`
  const analysis=analyzeResume(resumeText,`${job.title} ${job.description}`)
  const targetRole=roleFor(job,profile)
  const matched=analysis.matchedSkills.slice(0,12)
  const missing=analysis.missingSkills.slice(0,8)
  const summary=sentence(profile.headline || `${targetRole} with ${profile.yearsExperience || 'relevant'} experience in ${profile.skills.slice(0,4).join(', ') || 'design and product work'}.`)
  const coverLetter=`Dear Hiring Team,\n\nI am applying for the ${targetRole} opportunity at ${job.company}. The role's focus on ${job.department || 'the work described in the posting'} aligns with my background in ${profile.skills.slice(0,4).join(', ') || 'design and product problem solving'}.\n\nMy strongest relevant evidence includes ${matched.slice(0,5).join(', ') || 'the experience represented in my resume'}. I would bring a practical, outcome-focused approach to the team and would welcome the opportunity to discuss how my experience can contribute to ${job.company}.\n\nRegards,\n${firstName(profile.name)}`
  const compensation=formatSalaryTarget(profile.targetSalary)
  const answers=[
    {question:'Why are you interested in this role?',answer:`The role combines ${job.department || 'the responsibilities described in the posting'} with the areas where I have the strongest evidence: ${matched.slice(0,4).join(', ') || profile.skills.slice(0,4).join(', ') || 'product and design work'}. I am specifically interested in applying that experience at ${job.company}.`},
    {question:'Why should we consider you?',answer:`I bring demonstrated experience across ${profile.skills.slice(0,5).join(', ') || 'relevant product and design skills'}, with the closest evidence to this role reflected in ${matched.slice(0,5).join(', ') || 'my resume experience'}. I can contribute quickly while continuing to deepen the gaps identified in the role analysis.`},
    {question:'What is your expected compensation?',answer:compensation ? `My current target is around ${compensation}, with flexibility depending on the scope, location and total compensation of the role.` : 'I am open to discussing compensation based on the scope of the role and the overall package.'},
  ]
  const warnings=[...analysis.warnings]
  if(missing.length) warnings.push(`Do not claim missing skills without evidence: ${missing.slice(0,5).join(', ')}.`)
  return {atsScore:analysis.score,targetRole,resumeVariant:`${targetRole} · ${job.company}`,summary,coverLetter,answers,matched,missing,warnings}
}

export function extractJobKeywords(job:JobRecord){return tokenize(`${job.title} ${job.description}`).slice(0,30)}
