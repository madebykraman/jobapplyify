'use client'

import Link from 'next/link'
import { ArrowRight, BarChart3, Check, FileText, Layers3, Search, ShieldCheck, Sparkles, Target, Workflow, BriefcaseBusiness, CircleUserRound } from 'lucide-react'
import { BRAND } from '@/lib/brand'
import './minimal-home.css'

const capabilities = [
  { icon: Search, title: 'Find roles', text: 'Search public job sources, inspect role details, compare fit and save opportunities worth pursuing.', href: '/opportunities' },
  { icon: Target, title: 'Check your fit', text: 'See strengths, gaps, work mode and career direction before spending time on an application.', href: '/career' },
  { icon: FileText, title: 'Build from evidence', text: 'Keep your resume and career documents in one source library, then prepare material from what is actually true.', href: '/documents' },
  { icon: Sparkles, title: 'Prepare applications', text: 'Create role-specific application packages and review the wording before anything is submitted.', href: '/applications' },
  { icon: Workflow, title: 'Apply with control', text: 'Use Dry Run, Review or Full Auto modes. CAPTCHA, sensitive and unknown flows stop for human control.', href: '/automation' },
  { icon: BarChart3, title: 'Track outcomes', text: 'Keep application status and outcomes connected so the job search becomes a system you can learn from.', href: '/insights' },
]

const modules = [
  { icon: BriefcaseBusiness, title: 'Job search', text: 'Find, inspect and save roles without losing the context around them.', href: '/opportunities' },
  { icon: CircleUserRound, title: 'Career workspace', text: 'Keep your profile, documents, resume and goals aligned in one place.', href: '/workspace' },
  { icon: Layers3, title: 'Application system', text: 'Prepare, review, apply and track each application as a durable record.', href: '/applications' },
]

const flow = ['Find', 'Understand', 'Prepare', 'Review', 'Apply', 'Track', 'Learn']

export default function Home() {
  return <main className="nl-home">
    <header className="nl-nav">
      <Link href="/" className="nl-logo">NAUKRI <span>LABS</span></Link>
      <nav><Link href="/opportunities">Jobs</Link><Link href="/resume">Resume</Link><Link href="/career">Career</Link><Link href="/pricing">Pricing</Link><Link href="/auth">Sign in</Link></nav>
    </header>

    <section className="nl-hero">
      <p className="nl-kicker">{BRAND.descriptor}</p>
      <h1>Stop managing<br />your job search.<br />Run it.</h1>
      <p className="nl-lead">NAUKRI LABS brings job discovery, career context, application preparation, controlled automation and progress tracking into one workspace.</p>
      <div className="nl-actions"><Link href="/opportunities" className="nl-primary">Explore jobs <ArrowRight size={16} /></Link><Link href="/auth?mode=sign-up" className="nl-secondary">Create free account</Link></div>
    </section>

    <section className="nl-proof"><span><Check size={15}/> Evidence before invention</span><span><Check size={15}/> Human control over automation</span><span><Check size={15}/> Your applications, your history</span><span><Check size={15}/> Built to reduce job-search noise</span></section>

    <section className="nl-intent">
      <p className="nl-kicker">The problem</p>
      <h2>The job search is not one task.<br />It is a chain of decisions.</h2>
      <p>Finding a role is only the beginning. You still need to understand the opportunity, judge the fit, prepare the right material, decide how to apply and keep track of what happened.</p>
    </section>

    <section className="nl-overview">
      <div className="nl-section-intro"><p className="nl-kicker">What you can do here</p><h2>Everything between<br />finding a role and getting better at the next one.</h2></div>
      <div className="nl-capabilities">{capabilities.map(({ icon: Icon, title, text, href }) => <Link href={href} className="nl-capability" key={title}><Icon size={18}/><div><h3>{title}</h3><p>{text}</p></div><ArrowRight size={15}/></Link>)}</div>
    </section>

    <section className="nl-modules">
      <div className="nl-section-intro"><p className="nl-kicker">The workspace</p><h2>Three places.<br />One system.</h2></div>
      <div className="nl-module-grid">{modules.map(({ icon: Icon, title, text, href }) => <Link href={href} className="nl-module" key={title}><Icon size={20}/><div><h3>{title}</h3><p>{text}</p></div><ArrowRight size={15}/></Link>)}</div>
    </section>

    <section className="nl-flow">
      <div><p className="nl-kicker">The product loop</p><h2>From opportunity<br />to outcome.</h2><p>Every stage keeps the context from the stage before it. That is the product.</p></div>
      <div className="nl-flow-list">{flow.map((item, i) => <div key={item}><span>0{i + 1}</span><b>{item}</b>{i < flow.length - 1 && <ArrowRight size={14}/>}</div>)}</div>
    </section>

    <section className="nl-truth">
      <div className="nl-truth-mark"><ShieldCheck size={20}/></div>
      <div><p className="nl-kicker">A different rule for AI</p><h2>Useful without making things up.</h2><p>Candidate claims should come from your evidence. Automation should remain visible and controllable. When a flow becomes ambiguous or unsafe, NAUKRI LABS hands control back to you.</p></div>
    </section>

    <section className="nl-bottom"><div><p className="nl-kicker">Ready when you are</p><h2>Find work.<br />Apply better.</h2><p>Start with one role. Build the system as you go.</p></div><Link href="/workspace" className="nl-primary">Open workspace <ArrowRight size={16}/></Link></section>

    <footer className="nl-footer"><span>© 2026 {BRAND.name}</span><span>{BRAND.tagline}</span></footer>
  </main>
}
