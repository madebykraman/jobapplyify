'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, Check, ChevronRight, Target, TrendingUp } from 'lucide-react'
import { assessCareer } from '@/lib/career-engine'
import { defaultProfile, loadProfile, loadResumes, type RovaProfile } from '@/lib/storage'
import { KindleapShell, SectionHeader, Signal, Surface } from '@/components/kindleap-ui'

export default function CareerPage(){
 const [profile,setProfile]=useState<RovaProfile>(defaultProfile); const [resume,setResume]=useState(''); const [target,setTarget]=useState('')
 useEffect(()=>{setProfile(loadProfile());setResume(loadResumes()[0]?.content||'')},[])
 const effective={...profile,targetSalary:target||profile.targetSalary}; const assessment=useMemo(()=>assessCareer(effective,resume),[effective,resume])
 return <KindleapShell><div className="kl-page">
  <SectionHeader eyebrow="Career / Planning model" title="Know where the profile can go." description="Map visible evidence to adjacent roles, career paths and a salary target. This is decision support, not a promise of market compensation." action={<label className="kl-target"><span><Target size={14}/> Salary target</span><input value={target||profile.targetSalary} onChange={e=>setTarget(e.target.value)} placeholder="₹12 LPA"/></label>}/>
  <div className="kl-signal-grid"><Signal label="Profile signal" value={assessment.currentSignal} detail="Relative evidence strength"/><Signal label="Target assessment" value={assessment.target.verdict==='within-range'?'ON RANGE':assessment.target.verdict==='stretch'?'STRETCH':'REBUILD'} detail={assessment.target.headline}/><Signal label="Best fit" value={assessment.recommended[0]?.fit||0} detail={assessment.recommended[0]?.title||'Add profile evidence'}/></div>
  <div className="kl-section-label"><span>PROFILE → ROLE FIT</span><h2>Recommended roles</h2></div>
  <div className="kl-card-grid">{assessment.recommended.map(r=><Surface className="kl-role" key={r.title}><div className="kl-row-head"><div><div className="kl-eyebrow">{r.family}</div><h3>{r.title}</h3></div><strong className="kl-score">{r.fit}</strong></div><p>{r.rationale}</p><div className="kl-meta">Planning band · ₹{r.salaryBand[0]}–₹{r.salaryBand[1]} LPA</div><div className="kl-evidence"><b>Already visible</b><div>{r.matched.slice(0,6).map(x=><span key={x}>{x}</span>)}</div></div><div className="kl-evidence is-muted"><b>Build next</b><div>{r.gaps.slice(0,4).map(x=><span key={x}>{x}</span>)}</div></div></Surface>)}</div>
  <div className="kl-section-label"><span>DECISION SUPPORT</span><h2>Salary target analysis</h2></div>
  <Surface className="kl-target-panel"><div><div className="kl-eyebrow">{assessment.target.verdict.toUpperCase()}</div><h2>{assessment.target.headline}</h2><div className="kl-checks">{assessment.target.actions.map(x=><div key={x}><Check size={14}/>{x}</div>)}</div></div><div className="kl-target-number"><TrendingUp size={20}/><strong>{assessment.targetLpa?`₹${assessment.targetLpa} LPA`:'Set a target'}</strong><span>planning target</span></div></Surface>
  <div className="kl-section-label"><span>NEXT 12–24 MONTHS</span><h2>Career paths</h2></div>
  <div className="kl-card-grid">{assessment.paths.map(p=><Surface className="kl-path" key={p.title}><BriefcaseBusiness size={17}/><h3>{p.title}</h3><div className="kl-meta">{p.direction}</div><div className="kl-steps">{p.steps.map((s,i)=><div key={s}><span>{String(i+1).padStart(2,'0')}</span>{s}<ChevronRight size={13}/></div>)}</div></Surface>)}</div>
  <Surface className="kl-next"><div><div className="kl-eyebrow">NEXT STEP</div><h3>Turn the strongest path into applications.</h3><p>Use role fit and skill gaps to drive job search, resume tailoring and application preparation.</p></div><Link className="kl-button kl-button-primary" href="/resume">Open resume intelligence <ArrowRight size={14}/></Link></Surface>
  <footer className="kl-page-footer">Planning salary bands are deterministic product heuristics until a live market-data source is connected.</footer>
 </div></KindleapShell>
}
