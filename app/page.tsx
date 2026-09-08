'use client'

import Link from 'next/link'
import { ArrowUpRight, Bot, FileText, Gauge, MoveUpRight, Search, Sparkles, Target } from 'lucide-react'
import { BRAND } from '@/lib/brand'
import './workspace/workspace.css'

const signals = [
  ['01', 'Find the right opening', 'Search roles, inspect fit, compare signal.', '/opportunities', Search],
  ['02', 'Strengthen your evidence', 'Resume, profile, projects and proof.', '/resume', FileText],
  ['03', 'Make the move', 'Prepare, apply, automate, learn from outcomes.', '/applications', MoveUpRight],
] as const

export default function Home() {
  return <main className="wayohome">
    <header className="wayonav">
      <Link href="/" className="wayomark"><span>W</span><b>WAYO</b></Link>
      <div className="wayonav-center"><span>Career operating system</span><i>2026 / BETA</i></div>
      <nav><Link href="/opportunities">Explore</Link><Link href="/pricing">Pro</Link><Link href="/auth">Sign in</Link></nav>
    </header>

    <section className="wayohero">
      <div className="hero-index">CAREER / 001</div>
      <div className="hero-copy">
        <p className="eyebrow">{BRAND.descriptor}</p>
        <h1>Your next move<br /><em>should make sense.</em></h1>
        <p className="hero-deck">WAYO connects the evidence in your career to the opportunities in front of you, then helps you act without turning your job search into a numbers game.</p>
        <div className="hero-actions"><Link href="/opportunities" className="wayo-button">Find your next move <ArrowUpRight size={16} /></Link><Link href="/resume" className="wayo-textlink">Audit a resume <span>Free</span></Link></div>
      </div>
      <div className="hero-orbit" aria-hidden="true"><div className="orbit-ring r1"/><div className="orbit-ring r2"/><div className="orbit-dot d1"/><div className="orbit-dot d2"/><div className="orbit-core"><Gauge size={25}/><small>signal</small></div></div>
      <div className="hero-foot"><span>01 / EVIDENCE</span><span>02 / FIT</span><span>03 / ACTION</span><span>04 / OUTCOME</span></div>
    </section>

    <section className="wayo-thesis"><div className="section-number">A / 01</div><div><p className="eyebrow">The premise</p><h2>Stop treating a career<br /><em>like a queue.</em></h2></div><p className="thesis-copy">The best application is not the fastest one. WAYO helps you understand the role, expose the gap, build the evidence and choose the right level of automation.</p></section>

    <section className="wayo-signals">{signals.map(([n,title,desc,href,Icon])=><Link href={href} className="signal-row" key={n}><span className="signal-no">{n}</span><Icon size={20}/><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight size={18} className="signal-arrow"/></Link>)}</section>

    <section className="wayo-command"><div className="section-number">B / 02</div><div className="command-copy"><p className="eyebrow">The control surface</p><h2>Automation,<br /><em>on your terms.</em></h2><p>Start safely in Review. Dry Run is free. When your Pro access is active, switch to Full Auto for supported applications. Ambiguous forms, CAPTCHAs and sensitive questions still return control to you.</p><Link href="/automation" className="wayo-button dark">Open automation <Bot size={16}/></Link></div><div className="mode-instrument"><div className="instrument-head"><span>EXECUTION MODE</span><b>REVIEW</b></div><div className="meter"><i className="meter-low"/><i className="meter-mid active"/><i className="meter-high"/></div><div className="meter-labels"><span>DRY RUN<br /><small>FREE</small></span><span>REVIEW<br /><small>RECOMMENDED</small></span><span>FULL AUTO<br /><small>PRO</small></span></div><div className="instrument-note">Human control remains the boundary.</div></div></section>

    <section className="wayo-beta"><div><p className="eyebrow">Beta access</p><h2>Everything is open.<br /><em>Bring your judgment.</em></h2></div><div><p>Basic tools require no account. Create a free account and use an invite code for full Pro access during beta. Without an invite, Pro starts at ₹499/month in India.</p><Link href="/auth?mode=sign-up" className="wayo-button">Enter invite code <ArrowUpRight size={16}/></Link></div></section>

    <footer className="wayofooter"><span>{BRAND.name} — {BRAND.tagline}</span><span>Evidence over invention · Automation with control</span></footer>
  </main>
}
