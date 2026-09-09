'use client'

import Link from 'next/link'
import { ArrowRight, Check, FileText, Search, Zap } from 'lucide-react'
import { BRAND } from '@/lib/brand'
import './minimal-home.css'

const steps = [
  { icon: Search, title: 'Find', text: 'Search and assess roles that fit.' },
  { icon: FileText, title: 'Prepare', text: 'Build applications from your real experience.' },
  { icon: Zap, title: 'Apply', text: 'Review, automate and keep control.' },
]

export default function Home() {
  return <main className="nl-home">
    <header className="nl-nav">
      <Link href="/" className="nl-logo">NAUKRI <span>LABS</span></Link>
      <nav><Link href="/opportunities">Jobs</Link><Link href="/resume">Resume</Link><Link href="/career">Career</Link><Link href="/auth">Sign in</Link></nav>
    </header>

    <section className="nl-hero">
      <p className="nl-kicker">{BRAND.descriptor}</p>
      <h1>Find work.<br />Apply better.</h1>
      <p className="nl-lead">A simple workspace for finding relevant jobs, preparing stronger applications and moving your career forward.</p>
      <div className="nl-actions"><Link href="/opportunities" className="nl-primary">Find jobs <ArrowRight size={16} /></Link><Link href="/auth?mode=sign-up" className="nl-secondary">Create free account</Link></div>
    </section>

    <section className="nl-proof"><span>Built around your actual experience.</span><span><Check size={15}/> No invented credentials</span><span><Check size={15}/> Human control</span><span><Check size={15}/> Clear application history</span></section>

    <section className="nl-steps">{steps.map(({ icon: Icon, title, text }, i) => <Link href={i === 0 ? '/opportunities' : i === 1 ? '/resume' : '/applications'} className="nl-step" key={title}><span className="nl-step-no">0{i + 1}</span><Icon size={19}/><div><h2>{title}</h2><p>{text}</p></div><ArrowRight size={16}/></Link>)}</section>

    <section className="nl-bottom"><div><p className="nl-kicker">NAUKRI LABS</p><h2>Less noise.<br />More progress.</h2></div><Link href="/workspace" className="nl-secondary">Open workspace <ArrowRight size={16}/></Link></section>

    <footer className="nl-footer"><span>© 2026 {BRAND.name}</span><span>{BRAND.tagline}</span></footer>
  </main>
}
