'use client'

import Link from 'next/link'
import { ArrowRight, Check, FileText, ShieldCheck, Sparkles, Upload, Workflow } from 'lucide-react'
import { BRAND } from '@/lib/brand'
import './minimal-home.css'

const actions = [
  { icon: Sparkles, title: 'Understand a job', text: 'Paste a job link or description and turn it into clear requirements, responsibilities and constraints.', href: '/assistant' },
  { icon: Check, title: 'Check your chances', text: 'Compare the role with your profile and see strengths, gaps and unknowns without pretending the answer is exact.', href: '/career' },
  { icon: FileText, title: 'Build the application', text: 'Create resumes, cover letters and application answers from the information you give us.', href: '/applications' },
  { icon: Workflow, title: 'Do the repetitive work', text: 'Prepare and fill supported application flows, with human handoff whenever the system cannot safely continue.', href: '/automation' },
  { icon: Upload, title: 'Turn existing information into useful documents', text: 'Bring your LinkedIn PDF, resume and career documents into one reusable workspace.', href: '/resume' },
  { icon: ShieldCheck, title: 'Keep control', text: 'Review consequential actions, see what was prepared and preserve evidence when an application is submitted.', href: '/review' },
]

const workspace = [
  ['Career workspace', 'Your profile, experience, skills, projects, documents and goals become reusable context.', '/workspace'],
  ['Application workspace', 'Keep prepared applications and their job-specific context together.', '/applications'],
  ['Automation', 'Let NAUKRI LABS handle supported browser work instead of doing every repetitive step yourself.', '/automation'],
]

export default function Home() {
  return <main className="nl-home">
    <header className="nl-nav">
      <Link href="/" className="nl-logo">NAUKRI <span>LABS</span></Link>
      <nav><Link href="/assistant">Assistant</Link><Link href="/workspace">Workspace</Link><Link href="/resume">Resume</Link><Link href="/pricing">Pricing</Link><Link href="/auth">Sign in</Link></nav>
    </header>

    <section className="nl-hero">
      <p className="nl-kicker">{BRAND.descriptor}</p>
      <h1>Give it the job.<br />Let it handle<br />the work.</h1>
      <p className="nl-lead">NAUKRI LABS is a job assistant for the work that comes after you find an opportunity: understanding it, judging your fit, building the application and handling the repetitive parts.</p>
      <div className="nl-actions"><Link href="/assistant" className="nl-primary">Open the assistant <ArrowRight size={16} /></Link><Link href="/auth?mode=sign-up" className="nl-secondary">Create free account</Link></div>
    </section>

    <section className="nl-proof"><span><Check size={15}/> No job board</span><span><Check size={15}/> Evidence before invention</span><span><Check size={15}/> Human control over automation</span><span><Check size={15}/> Bring your own opportunity</span></section>

    <section className="nl-intent">
      <p className="nl-kicker">The problem</p>
      <h2>You already found the job.<br />Now comes the annoying part.</h2>
      <p>Understanding a long description, figuring out whether you are a fit, rewriting your resume, answering the same questions, filling forms and keeping everything consistent takes time. NAUKRI LABS is built for that work.</p>
    </section>

    <section className="nl-overview">
      <div className="nl-section-intro"><p className="nl-kicker">What the assistant does</p><h2>Bring the problem.<br />Get useful work back.</h2></div>
      <div className="nl-capabilities">{actions.map(({ icon: Icon, title, text, href }) => <Link href={href} className="nl-capability" key={title}><Icon size={18}/><div><h3>{title}</h3><p>{text}</p></div><ArrowRight size={15}/></Link>)}</div>
    </section>

    <section className="nl-modules">
      <div className="nl-section-intro"><p className="nl-kicker">Your workspace</p><h2>One source of truth.<br />Many jobs.</h2></div>
      <div className="nl-module-grid">{workspace.map(([title, text, href]) => <Link href={href} className="nl-module" key={title}><div><h3>{title}</h3><p>{text}</p></div><ArrowRight size={15}/></Link>)}</div>
    </section>

    <section className="nl-flow">
      <div><p className="nl-kicker">How it works</p><h2>You bring context.<br />We do the work.</h2><p>Give NAUKRI LABS a job or career problem. It turns the information into useful next actions, documents or controlled execution.</p></div>
      <div className="nl-flow-list">{['Give context', 'Understand', 'Assess', 'Create', 'Review', 'Act', 'Improve'].map((item, i, all) => <div key={item}><span>0{i + 1}</span><b>{item}</b>{i < all.length - 1 && <ArrowRight size={14}/>}</div>)}</div>
    </section>

    <section className="nl-truth">
      <div className="nl-truth-mark"><ShieldCheck size={20}/></div>
      <div><p className="nl-kicker">How the assistant behaves</p><h2>Helpful, not fictional.</h2><p>Candidate claims are grounded in information you provide. Public and community signals are presented as approximate guidance, not certainty. Automation stops when a flow is ambiguous, sensitive or unsafe.</p></div>
    </section>

    <section className="nl-bottom"><div><p className="nl-kicker">Start anywhere</p><h2>One job.<br />One problem.</h2><p>Bring it to NAUKRI LABS and start from there.</p></div><Link href="/assistant" className="nl-primary">Open assistant <ArrowRight size={16}/></Link></section>

    <footer className="nl-footer"><span>© 2026 {BRAND.name}</span><span>{BRAND.tagline}</span></footer>
  </main>
}
