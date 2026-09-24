'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, ChevronRight, Target, TrendingUp } from 'lucide-react'
import { assessCareer } from '@/lib/career-engine'
import { defaultProfile, loadProfile, loadResumes, type RovaProfile } from '@/lib/storage'
import { KindleapShell, SectionHeader, Surface } from '@/components/kindleap-ui'

export default function CareerPage(){
 const [profile,setProfile]=useState<RovaProfile>(defaultProfile);const[resume,setResume]=useState('');const[target,setTarget]=useState('')
 useEffect(()=>{setProfile(loadProfile());setResume(loadResumes()[0]?.content||'')},[])
 const effective={...profile,targetSalary:target||profile.targetSalary};const assessment=useMemo(()=>assessCareer(effective,resume),[effective,resume]);const lane=assessment.recommended[0]
 return <KindleapShell><div className="kl-page">
  <SectionHeader eyebrow="Career / Improvement" title="Strengthen the position you already have." description="Turn your profile and resume into a clearer evidence map: what is visible, what is missing and what to build next." action={<label className="kl-target"><span><Target size={14}/> Salary target</span><input value={target||profile.targetSalary} onChange={e=>setTarget(e.target.value)} placeholder="₹12 LPA"/></label>}/>
  <div className="kl-card-grid">
   <Surface><div className="kl-eyebrow">CURRENT EVIDENCE</div><h2>{lane?.title||'Add profile evidence'}</h2><p>{lane?.rationale||'Add skills, experience and measurable outcomes in Profile so the assistant has something reliable to work with.'}</p><div className="kl-evidence"><b>Already visible</b><div>{(lane?.matched||[]).slice(0,8).map(x=><span key={x}>{x}</span>)}</div></div></Surface>
   <Surface><div className="kl-eyebrow">BUILD NEXT</div><h2>Close the useful gaps.</h2><p>Prioritise evidence you can actually demonstrate through projects, outcomes, work samples or verified skills.</p><div className="kl-evidence is-muted"><b>Missing or unclear</b><div>{(lane?.gaps||[]).slice(0,6).map(x=><span key={x}>{x}</span>)}</div></div></Surface>
  </div>
  <div className="kl-section-label"><span>12–24 MONTH VIEW</span><h2>Possible paths</h2></div>
  <div className="kl-card-grid">{assessment.paths.map(p=><Surface className="kl-path" key={p.title}><div className="kl-eyebrow">{p.direction}</div><h3>{p.title}</h3><div className="kl-steps">{p.steps.map((s,i)=><div key={s}><span>{String(i+1).padStart(2,'0')}</span>{s}<ChevronRight size={13}/></div>)}</div></Surface>)}</div>
  <div className="kl-section-label"><span>COMPENSATION CONTEXT</span><h2>Salary target</h2></div>
  <Surface className="kl-target-panel"><div><div className="kl-eyebrow">{assessment.target.verdict.toUpperCase()}</div><h2>{assessment.target.headline}</h2><div className="kl-checks">{assessment.target.actions.map(x=><div key={x}><Check size={14}/>{x}</div>)}</div></div><div className="kl-target-number"><TrendingUp size={20}/><strong>{assessment.targetLpa?'₹'+assessment.targetLpa+' LPA':'Set a target'}</strong><span>planning target</span></div></Surface>
  <Surface className="kl-next"><div><div className="kl-eyebrow">NEXT STEP</div><h3>Turn stronger evidence into better applications.</h3><p>Update your profile or resume, then bring a specific opportunity to the assistant for role-specific preparation.</p></div><Link className="kl-button kl-button-primary" href="/assistant">Bring a job to the assistant <ArrowRight size={14}/></Link></Surface>
  <footer className="kl-page-footer">Salary bands are deterministic planning heuristics until a live market-data source is connected. They are not market guarantees.</footer>
 </div></KindleapShell>
}