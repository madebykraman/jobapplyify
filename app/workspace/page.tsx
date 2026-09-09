'use client'

import Link from 'next/link'
import { ArrowUpRight, BriefcaseBusiness, FileText, Gauge, MessageSquareText, Sparkles, Target, Zap } from 'lucide-react'
import { BRAND } from '@/lib/brand'
import './workspace.css'

const modules = [
  ['Resume Studio','Turn your experience into a structured, role-ready resume.','/resume',FileText],
  ['Career Lab','See where your profile can move and what closes the gap.','/career',Target],
  ['Find work','Search opportunities with fit, context and source evidence.','/opportunities',BriefcaseBusiness],
  ['Application Studio','Build the resume, letter and answers for one role.','/applications',Sparkles],
  ['Automation','Run repetitive application work with explicit controls.','/automation',Zap],
  ['Interview Lab','Prepare against the actual role, not generic questions.','/insights',MessageSquareText],
]

export default function WorkspacePage() {
  return <main className="neo">
    <header className="neoHeader"><Link href="/" className="neoLogo"><span>K</span> {BRAND.name}</Link><div className="neoHeaderRight"><span className="neoStatus"><i/> Pro beta open</span><Link href="/profile" className="neoAvatar">KA</Link></div></header>
    <section className="neoHero"><div className="neoKicker">CAREER INTELLIGENCE / 01</div><h1>Make the next<br/><em>move.</em></h1><p>One workspace for the decisions behind a better job search, and the repetitive work after them.</p><div className="neoActions"><Link href="/opportunities" className="neoPrimary">Find roles <ArrowUpRight size={17}/></Link><Link href="/resume" className="neoSecondary">Audit my resume</Link></div></section>
    <section className="neoSignal"><div><span>CAREER SIGNAL</span><strong>Everything is open.</strong><p>During the beta, accounts with an active Pro entitlement can use the complete workspace. Access is verified server-side.</p></div><div className="neoMeter"><Gauge size={19}/><b>PRO / BETA</b><small>Entitlement controlled</small></div></section>
    <section className="neoGrid">{modules.map(([title,desc,href,Icon])=>{const I=Icon as typeof FileText;return <Link href={href as string} className="neoModule" key={title as string}><div className="neoModuleTop"><I size={19}/><ArrowUpRight size={16}/></div><h2>{title as string}</h2><p>{desc as string}</p><span>Open module</span></Link>})}</section>
    <section className="neoBottom"><div><span className="neoKicker">THE KINDLEAP LOOP</span><h2>Find. Understand. Prepare. Apply. Grow.</h2></div><Link href="/" className="neoSecondary">Command home</Link></section>
    <footer>{BRAND.name} · {BRAND.tagline} <span>Pro features require an active server entitlement.</span></footer>
  </main>
}
