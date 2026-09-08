'use client'

import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, Lock, MessageCircle, ShieldCheck } from 'lucide-react'
import { BRAND } from '@/lib/brand'
import { COMMUNITY_SIGNALS } from '@/lib/growth'
import './community.css'

export default function CommunityPage(){return <main className="communityPage">
<header className="communityHeader"><Link href="/" className="communityLogo"><span>K</span>{BRAND.name}</Link><div><b>COMMUNITY / 10</b><i>ANONYMISED SIGNALS</i></div><nav><Link href="/growth">Growth</Link><Link href="/insights">Outcomes</Link><Link href="/auth">Sign in</Link></nav></header>
<section className="communityHero"><span className="communityIndex">COMMUNITY / 001</span><div><p>COMMUNITY INTELLIGENCE</p><h1>What the market<br/><em>is teaching.</em></h1><span>Learn from aggregated patterns across roles, compensation, interviews and search behaviour without exposing another candidate's identity.</span></div><div className="privacyStamp"><ShieldCheck size={20}/><b>PRIVACY BY DESIGN</b><strong>No profiles. No names.</strong><span>Signals are aggregated before they become useful.</span></div></section>
<section className="communitySignals"><div className="communityIndex">A / 01</div><div><p>FIELD NOTES</p><h2>Useful signals,<br/><em>with provenance.</em></h2><span>Every community insight carries a source, date and confidence level. Treat it as directional intelligence, not universal truth.</span></div><div className="signalList">{COMMUNITY_SIGNALS.map((item,i)=><article key={item.topic}><header><span>0{i+1} · {item.topic}</span><b>{item.confidence}</b></header><h3>{item.signal}</h3><p>{item.source} · {item.date}</p></article>)}</div></section>
<section className="communityRules"><div className="communityIndex">B / 02</div><div><p>THE BOUNDARY</p><h2>Community<br/><em>without surveillance.</em></h2></div><div className="rules"><div><Lock/><b>Anonymous by default</b><span>Individual profiles and identifiable application histories never become public community content.</span></div><div><CheckCircle2/><b>Aggregate before insight</b><span>Signals are useful only after they are separated from individual identity.</span></div><div><MessageCircle/><b>Evidence stays attached</b><span>Community claims retain source and confidence so uncertainty remains visible.</span></div></div></section>
<section className="communityCta"><div><p>CONTRIBUTE A SIGNAL</p><h2>Help the next<br/><em>candidate decide.</em></h2></div><div><span>Share salary ranges, interview patterns or role intelligence in a future community flow. Contribution controls will be explicit and reversible.</span><button disabled>Community contribution · coming next <ArrowUpRight size={14}/></button></div></section>
<footer><span>{BRAND.name} · {BRAND.tagline}</span><span>Evidence over invention · Privacy with control</span></footer>
</main>}
