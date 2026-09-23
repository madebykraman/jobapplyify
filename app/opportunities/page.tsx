'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Upload } from 'lucide-react'
import { BRAND } from '@/lib/brand'
import { KindleapShell, SectionHeader, Surface } from '@/components/kindleap-ui'

export default function Opportunities(){
 const [source,setSource]=useState('')
 const [loading,setLoading]=useState(false)
 const [error,setError]=useState('')
 const [result,setResult]=useState<any>(null)
 async function read(){
  setError(''); setResult(null)
  if(!source.trim()){setError('Paste the job link you want NAUKRI LABS to work on.');return}
  setLoading(true)
  try{
   const r=await fetch('/api/job-source',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({url:source.trim()})})
   const d=await r.json().catch(()=>({}))
   if(!r.ok) throw new Error(d.error||'This source could not be read.')
   setResult(d.jobs?.[0]||null)
  }catch(e){setError(e instanceof Error?e.message:'Unable to read this opportunity.')}
  finally{setLoading(false)}
 }
 return <KindleapShell><div className="kl-page">
  <SectionHeader eyebrow={BRAND.name+' / Provided opportunity'} title="Bring the opportunity. Don't search for it." description="This is an input utility, not a job board. Give NAUKRI LABS a public supported job URL and continue into the assistant workflow."/>
  <Surface>
   <div className="kl-eyebrow">JOB URL</div>
   <p>Supported public ATS sources currently include Greenhouse, Lever and Ashby.</p>
   <div className="kl-source-row"><input value={source} onChange={e=>setSource(e.target.value)} placeholder="Paste the job URL you already found"/><button className="kl-button kl-button-primary" onClick={read} disabled={loading}><Upload size={15}/>{loading?'Reading…':'Read job'}</button></div>
   {error&&<div className="kl-warning">{error}</div>}
  </Surface>
  {result&&<Surface>
   <div className="kl-row-head"><div><div className="kl-eyebrow">{result.company||'Company'} · {result.source||'Provided'}</div><h2>{result.title||'Job opportunity'}</h2><p>{result.location||'Location not specified'}</p></div></div>
   <p>{result.description||'The source did not provide a full description.'}</p>
   <div className="kl-job-actions"><Link className="kl-button kl-button-primary" href="/assistant">Continue in assistant <ArrowRight size={14}/></Link><a className="kl-button" href={result.applyUrl||result.url||source} target="_blank" rel="noreferrer">Open source <ExternalLink size={13}/></a></div>
  </Surface>}
  <Surface><h2>Already have the job?</h2><p>Go straight to the assistant. It is the main product surface for understanding, assessing, preparing and acting on an opportunity.</p><Link className="kl-button kl-button-primary" href="/assistant">Open assistant <ArrowRight size={14}/></Link></Surface>
  <footer className="kl-page-footer">NAUKRI LABS does not provide a job marketplace or live vacancy inventory.</footer>
 </div></KindleapShell>
}