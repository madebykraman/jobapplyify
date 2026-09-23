'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, FileText, Loader2, ShieldCheck, Sparkles, Upload } from 'lucide-react'
import { BRAND } from '@/lib/brand'
import { analyseJob, type JobRecord } from '@/lib/job-engine'
import { defaultProfile, loadProfile } from '@/lib/storage'
import './assistant.css'

type Job = JobRecord
const tasks = [
 ['Understand this job','Turn a posting into requirements, responsibilities and constraints.'],
 ['Check my fit','Compare the opportunity with the career information you have stored.'],
 ['Build my application','Prepare a resume, cover letter and answers for this specific role.'],
 ['Do the repetitive work','Prepare or execute supported application steps with human handoff when needed.'],
]

function pastedJob(value:string):Job{
 const lines=value.split(/\\n+/).map(x=>x.trim()).filter(Boolean)
 const title=lines[0]?.slice(0,140)||'Provided opportunity'
 return {id:'assistant_input',company:'Provided information',title,location:'Not supplied',workMode:'Not supplied',employment:'Not supplied',source:'Pasted by user',url:'',applyUrl:'',description:value,salary:''}
}

export default function AssistantPage() {
 const [input,setInput]=useState('')
 const [job,setJob]=useState<Job|null>(null)
 const [error,setError]=useState('')
 const [loading,setLoading]=useState(false)
 const [profile]=useState(()=>loadProfile()||defaultProfile)
 const analysis=useMemo(()=>job?analyseJob(job,profile):null,[job,profile])

 async function handleSubmit(e:FormEvent){
  e.preventDefault(); setError('')
  const value=input.trim()
  if(!value)return setError('Paste a job link or job description first.')
  const isUrl=value.startsWith('https://')
  if(!isUrl){setJob(pastedJob(value));return}
  setLoading(true)
  try{
   const response=await fetch('/api/job-source',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({url:value})})
   const data=await response.json().catch(()=>({}))
   if(!response.ok)throw new Error(data.error||'This job link could not be read.')
   const first=data.jobs?.[0]
   if(!first)throw new Error('No job information was returned.')
   setJob(first)
  }catch(err){setError(err instanceof Error?err.message:'Unable to read this job link.')}
  finally{setLoading(false)}
 }

 return <main className="na-assistant">
  <header className="na-assistant-nav">
   <Link href="/" className="na-assistant-logo">NAUKRI <span>LABS</span></Link>
   <nav><Link href="/workspace">Workspace</Link><Link href="/resume">Resume</Link><Link href="/applications">Applications</Link><Link href="/pricing">Pricing</Link></nav>
  </header>

  <section className="na-assistant-hero">
   <p className="na-kicker">JOB ASSISTANT</p>
   <h1>Give me the job.<br/><em>I’ll handle the rest.</em></h1>
   <p>Paste a job link or description. NAUKRI LABS immediately turns the supplied context into useful next work. Nothing is submitted automatically.</p>
   <form onSubmit={handleSubmit} className="na-intake">
    <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Paste a job link or the job description…" rows={5}/>
    <div className="na-intake-foot"><span>Bring a job, application question, recruiter message or career problem.</span><button type="submit" disabled={loading}>{loading?<><Loader2 size={15} className="spin"/> Reading</>:<>Work on this <ArrowRight size={15}/></>}</button></div>
   </form>
   {error&&<div className="na-error">{error}</div>}
  </section>

  {job&&analysis&&<section className="na-result">
   <div className="na-result-head"><div><p className="na-kicker">UNDERSTOOD</p><h2>{job.title||'Job opportunity'}</h2><p>{job.company||'Company not specified'}{job.location?' · '+job.location:''}</p></div><span className="na-source">{job.source||'provided'}</span></div>
   <div className="na-analysis-grid">
    <article><span>FIT SIGNAL</span><strong>{analysis.fit}/100</strong><p>Heuristic guidance from the information currently available. It is not a hiring probability.</p></article>
    <article><span>STRENGTHS</span><strong>{analysis.matched.length}</strong><p>{analysis.matched.length?analysis.matched.slice(0,5).join(' · '):'No matching evidence found yet.'}</p></article>
    <article><span>GAPS / UNKNOWN</span><strong>{analysis.gaps.length}</strong><p>{analysis.gaps.length?analysis.gaps.slice(0,5).join(' · '):'No obvious gaps detected by this heuristic.'}</p></article>
   </div>
   <div className="na-result-actions"><Link href="/career">Improve my position <ArrowRight size={15}/></Link><Link href="/applications">Build application <ArrowRight size={15}/></Link><Link href="/automation">Do repetitive work <ArrowRight size={15}/></Link></div>
   <div className="na-result-note"><ShieldCheck size={15}/> Candidate claims stay grounded in your saved information. Ambiguous or unsupported automation remains a human handoff.</div>
  </section>}

  <section className="na-tasks">
   <div><p className="na-kicker">ASK THE ASSISTANT TO</p><h2>Do the work that<br/>usually takes time.</h2></div>
   <div className="na-task-grid">{tasks.map(([title,text],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
  </section>

  <section className="na-tools">
   <div><Upload size={20}/><h3>Bring your existing information</h3><p>Profile, LinkedIn PDF, resume and career documents can become reusable context.</p><Link href="/resume">Open resume tools <ArrowRight size={14}/></Link></div>
   <div><FileText size={20}/><h3>Build once, reuse everywhere</h3><p>Keep your career information in one place and create role-specific material when you need it.</p><Link href="/workspace">Open workspace <ArrowRight size={14}/></Link></div>
   <div><Sparkles size={20}/><h3>Get help when you do not know what to do</h3><p>Use your profile and available public signals to identify gaps, useful next steps and better positioning.</p><Link href="/career">Open career tools <ArrowRight size={14}/></Link></div>
  </section>

  <footer><span>© 2026 {BRAND.name}</span><span>{BRAND.tagline}</span></footer>
 </main>
}
