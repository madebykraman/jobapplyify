'use client'
import Link from 'next/link'
import { ArrowUpRight, BrainCircuit, CalendarClock, ChevronRight, Mail, MessageSquareText, Trophy } from 'lucide-react'
import { BRAND } from '@/lib/brand'
import '../workspace/workspace.css'

const stages = [
  ['Applications', '18', 'submitted', 'stable'],
  ['Replies', '5', 'positive or neutral', 'up'],
  ['Interviews', '2', 'scheduled', 'up'],
  ['Offers', '0', 'next signal', 'watch'],
] as const

const actions = [
  ['Prepare for your next interview', 'Build a role-specific briefing from the job description, your evidence and likely questions.', '/applications'],
  ['Review recruiter signals', 'Classify replies, requests, rejections and follow-ups without losing the original evidence.', '/review'],
  ['Set a follow-up', 'Keep promising applications moving without manually remembering every date.', '/applications'],
] as const

export default function Insights(){
 return <main className="insightPage">
  <header className="insightHeader"><Link href="/" className="insightLogo"><span>K</span>{BRAND.name}</Link><div><span>OUTCOME INTELLIGENCE</span><i>09 / 2026</i></div><nav><Link href="/opportunities">Explore</Link><Link href="/automation">Automation</Link><Link href="/auth">Sign in</Link></nav></header>
  <section className="insightHero"><div className="insightIndex">OUTCOME / 001</div><div><p className="insightEyebrow">The search is giving you signals.</p><h1>Learn what is<br/><em>actually working.</em></h1><p className="insightLead">Interview Lab and Outcome Intelligence turn applications, replies and interviews into the next decision. No vanity metrics. Only signals you can act on.</p></div><div className="insightSignal"><BrainCircuit size={20}/><b>SEARCH HEALTH</b><strong>Promising</strong><span>Interview conversion is the next lever.</span></div></section>
  <section className="outcomeStrip">{stages.map(([name,value,desc,state])=><div key={name}><small>{name}</small><b>{value}</b><span className={state}>{desc}</span></div>)}</section>
  <section className="interviewLab"><div className="sectionNumber">A / 01</div><div><p className="insightEyebrow">Interview Lab</p><h2>Prepare for the<br/><em>conversation.</em></h2><p>Build a briefing from the actual role, your verified career evidence and the questions most likely to expose gaps. Practice without inventing experience.</p><Link href="/applications" className="insightButton">Open interview prep <ArrowUpRight size={15}/></Link></div><div className="prepSheet"><div><span>UPCOMING</span><b>Product Designer</b><small>Tomorrow · 11:30</small></div><hr/><div className="prepRow"><MessageSquareText size={17}/><span>Likely question</span><b>Walk me through your strongest product decision.</b><ChevronRight size={15}/></div><div className="prepRow"><Trophy size={17}/><span>Evidence to use</span><b>Project outcome · 38% activation lift</b><ChevronRight size={15}/></div></div></section>
  <section className="outcomeActions"><div className="sectionNumber">B / 02</div><div><p className="insightEyebrow">Next best actions</p><h2>Don't just<br/><em>measure.</em> move.</h2></div><div className="actionList">{actions.map(([title,desc,href],i)=><Link href={href} className="actionItem" key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight size={17}/></Link>)}</div></section>
  <section className="signalSources"><div><p className="insightEyebrow">Evidence layer</p><h2>Every conclusion<br/>has a source.</h2></div><div className="sourceGrid"><div><Mail size={17}/><b>Inbox signals</b><span>Replies, recruiter requests and rejection reasons.</span></div><div><CalendarClock size={17}/><b>Timing signals</b><span>Follow-up windows and interview cadence.</span></div><div><BrainCircuit size={17}/><b>Learning signals</b><span>Patterns across roles, applications and outcomes.</span></div></div></section>
  <footer className="insightFooter"><span>{BRAND.name} · {BRAND.tagline}</span><span>Confirmed evidence / inference / uncertainty remain distinct.</span></footer>
 </main>
}
