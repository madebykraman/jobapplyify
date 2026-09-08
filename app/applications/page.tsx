'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Clipboard, Copy, FileText, WandSparkles } from 'lucide-react'
import { buildApplicationPack, type ApplicationPack } from '@/lib/application-engine'
import { loadPreparationJob, loadProfile, loadResumes } from '@/lib/storage'
import type { JobRecord } from '@/lib/job-engine'

const stages=[['Preparing','1'],['Applied','12'],['Interview','3'],['Offer','1']]

export default function Applications(){
 const [job,setJob]=useState<JobRecord|null>(null); const [pack,setPack]=useState<ApplicationPack|null>(null); const [copied,setCopied]=useState('')
 useEffect(()=>{const selected=loadPreparationJob<JobRecord>();setJob(selected);if(selected)setPack(buildApplicationPack(selected,loadProfile(),loadResumes()[0]||null))},[])
 const keywords=useMemo(()=>pack?.matched.join(' · ')||'No matched keywords yet',[pack])
 function copy(label:string,text:string){navigator.clipboard?.writeText(text);setCopied(label);window.setTimeout(()=>setCopied(''),1200)}
 if(!job||!pack)return <main className="main standalone"><Link className="back" href="/">← Command</Link><div className="mono eyebrow">ROVA / APPLICATIONS</div><h1 className="title">Prepare an application.</h1><p className="lead">Select a role from Job Intelligence first. ROVA will build a role-specific preparation pack from your stored profile and latest resume.</p><Link className="primary" href="/opportunities"><WandSparkles size={14}/> Find a role</Link></main>
 return <main className="main standalone"><Link className="back" href="/opportunities">← Job Intelligence</Link><div className="mono eyebrow">ROVA / APPLICATION PREPARATION</div><div className="careerHead"><div><h1 className="title">{pack.targetRole}</h1><p className="lead">{job.company} · {job.location || 'Location unspecified'} · {job.workMode}</p></div><div className="targetBox"><FileText size={16}/><div><span>ATS readiness</span><strong>{pack.atsScore}/100</strong></div></div></div>
 <section className="section card"><div className="mono">RESUME VARIANT</div><h3>{pack.resumeVariant}</h3><p>{pack.summary}</p><div className="chips">{pack.matched.map(x=><span className="chip" key={x}>{x}</span>)}</div><div className="small">Matched role keywords: {keywords}</div>{pack.missing.length>0&&<div className="warning">Missing evidence: {pack.missing.join(', ')}. Do not add unsupported claims.</div>}</section>
 <section className="section"><div className="mono">COVER LETTER</div><div className="formcard"><pre className="description" style={{whiteSpace:'pre-wrap',fontFamily:'inherit'}}>{pack.coverLetter}</pre><button className="link" onClick={()=>copy('cover',pack.coverLetter)}><Copy size={14}/>{copied==='cover'?'Copied':'Copy letter'}</button></div></section>
 <section className="section"><div className="mono">APPLICATION ANSWERS</div>{pack.answers.map((x,i)=><div className="formcard" key={x.question}><b>{x.question}</b><p>{x.answer}</p><button className="link" onClick={()=>copy(`a${i}`,x.answer)}><Clipboard size={14}/>{copied===`a${i}`?'Copied':'Copy answer'}</button></div>)}</section>
 <section className="section"><div className="mono">ATS / SAFETY CHECK</div>{pack.warnings.map(x=><div className="warning" key={x}>{x}</div>)}<p className="small">This build drafts from available evidence. It does not invent qualifications, metrics or experience.</p></section>
 <div className="footer">Application submission automation remains a later execution stage. This workspace prepares and reviews the application package first.</div></main>
}
