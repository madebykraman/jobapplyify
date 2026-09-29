'use client'

import Link from 'next/link'
import { ArrowRight, Check, FileCheck2, FileText, MessageCircle, ScanSearch, Sparkles, Target } from 'lucide-react'
import { BRAND } from '@/lib/brand'
import './minimal-home.css'

const features = [
 {icon:ScanSearch,title:'Resume Analysis',text:'See what is working, what is missing, and what could stop a recruiter from understanding your value.'},
 {icon:Sparkles,title:'Resume Tailoring',text:'Adapt your resume to a specific job while keeping the underlying experience truthful and yours.'},
 {icon:MessageCircle,title:'Resume Agent',text:'Ask for focused edits, stronger bullets, clearer positioning, and section-by-section feedback.'},
 {icon:FileCheck2,title:'ATS-friendly Templates',text:'Start from clean layouts built around readable structure and recruiter scanning.'},
 {icon:FileText,title:'Cover Letter Generator',text:'Create a focused letter that connects your experience to the role without generic filler.'},
 {icon:Target,title:'Application Tracker',text:'Keep target roles, tailored documents, and application progress together.'},
]

const testimonials=[
 ['“It finally showed me which parts of my resume were actually relevant to the role.”','Product Designer'],
 ['“The feedback was specific enough to act on instead of another generic AI rewrite.”','Software Engineer'],
 ['“I could tailor a version for each role without rebuilding the whole resume.”','Marketing Manager'],
 ['“The section-by-section suggestions made the editing process much faster.”','Business Analyst'],
]

export default function Home(){
 return <main className="js-home">
  <header className="js-nav">
   <Link href="/" className="js-logo">JOBSUIT <span>AI</span></Link>
   <nav><Link href="/resume">Resume Builder</Link><Link href="/assistant">Resume Tailoring</Link><Link href="/career">Resume Analysis</Link><Link href="/pricing">Pricing</Link></nav>
   <div className="js-nav-actions"><Link href="/auth">Log in</Link><Link className="js-nav-cta" href="/resume">Get started free</Link></div>
  </header>

  <section className="js-hero">
   <div className="js-hero-copy">
    <span className="js-pill">AI-powered resume builder</span>
    <h1>Stop getting ignored.<br/><em>Start getting noticed.</em></h1>
    <p>Build a clearer resume, understand how it performs against a role, and tailor every application without rewriting your career from scratch.</p>
    <div className="js-actions"><Link href="/resume" className="js-primary">Build my resume <ArrowRight size={16}/></Link><Link href="/assistant" className="js-watch">See how it works <span>↗</span></Link></div>
    <div className="js-trust"><Check size={14}/> No credit card required <Check size={14}/> Free to start <Check size={14}/> ATS-ready layouts</div>
   </div>
   <div className="js-hero-product">
    <div className="js-window">
      <div className="js-window-top"><span>Resume analysis</span><span>•••</span></div>
      <div className="js-score-row"><div><small>RESUME SCORE</small><strong>78<span>/100</span></strong></div><div className="js-score-ring">78</div></div>
      <div className="js-mini-list"><div><b>Keyword alignment</b><span>Good</span></div><div><b>Impact & outcomes</b><span>Improve</span></div><div><b>Structure</b><span>Strong</span></div><div><b>Role relevance</b><span>Good</span></div></div>
      <div className="js-suggestion"><Sparkles size={15}/><div><b>Suggestion</b><p>Make the first experience bullet show the measurable outcome, not only the responsibility.</p></div></div>
    </div>
   </div>
  </section>

  <section className="js-guarantee"><div><b>50</b><span>tailorings</span></div><div><b>50</b><span>applications</span></div><div><b>0</b><span>interviews? eligible for refund*</span></div><p>*Guarantee mechanics can be configured when billing is connected.</p></section>

  <section className="js-social"><p>Built for people who are serious about their next application.</p><div>{['Product','Engineering','Marketing','Finance','Operations','Design'].map(x=><span key={x}>{x}</span>)}</div></section>

  <section className="js-problem"><div className="js-section-label">WHY RESUMES GET MISSED</div><h2>Most resumes are not bad.<br/><em>They are just too generic.</em></h2><p>A hiring team needs to understand your relevance quickly. Weak keyword alignment, vague bullets, missing outcomes and inconsistent structure can hide otherwise useful experience.</p><div className="js-problem-grid">{[['ATS mismatch','The language does not line up with the role.'],['Missing signals','Important skills or evidence are hard to find.'],['No impact','Responsibilities appear without measurable outcomes.'],['Too generic','One version is sent to every role.']].map(([t,x])=><article key={t}><span>01</span><h3>{t}</h3><p>{x}</p></article>)}</div></section>

  <section className="js-features"><div className="js-section-label">ONE WORKFLOW</div><h2>Everything you need to<br/><em>make a stronger application.</em></h2><div className="js-feature-grid">{features.map(({icon:Icon,title,text},i)=><article key={title}><span className="js-number">{String(i+1).padStart(2,'0')}</span><Icon size={21}/><h3>{title}</h3><p>{text}</p><Link href={i===0?'/career':'/resume'}>Explore <ArrowRight size={14}/></Link></article>)}</div></section>

  <section className="js-outcomes"><div className="js-section-label">SEE THE DIFFERENCE</div><h2>From “fine” to<br/><em>ready to apply.</em></h2><div className="js-before-after"><div><span>BEFORE</span><h3>Generic resume</h3><p>Broad responsibilities, weak role alignment, little evidence of impact.</p></div><div className="js-arrow">→</div><div><span>AFTER</span><h3>Role-specific resume</h3><p>Relevant experience is prioritized, language is clearer, and evidence is easier to scan.</p></div></div></section>

  <section className="js-how"><div><div className="js-section-label">HOW IT WORKS</div><h2>Build faster.<br/>Edit smarter.</h2><p>Start with what you already have. Improve it in focused passes instead of starting over every time.</p></div><div className="js-steps">{[['01','Create','Upload an existing resume or start with a blank canvas.'],['02','Analyze','Check structure, keywords, relevance and content gaps.'],['03','Tailor','Give the system a job description and build a targeted version.']].map(([n,t,x])=><article key={n}><span>{n}</span><div><h3>{t}</h3><p>{x}</p></div></article>)}</div></section>

  <section className="js-testimonials"><div className="js-section-label">WHAT USERS VALUE</div><div className="js-testimonial-grid">{testimonials.map(([quote,role])=><article key={role}><div>“</div><p>{quote}</p><b>{role}</b></article>)}</div></section>

  <section className="js-faq"><div><div className="js-section-label">FAQ</div><h2>Questions,<br/><em>answered.</em></h2></div><div>{[['What is JOBSUIT AI?','A resume-focused workspace for building, analyzing and tailoring career documents.'],['Can I start with an existing resume?','Yes. Upload a PDF, DOCX or text file and continue from the extracted content.'],['Does tailoring invent experience?','It should not. Suggestions are intended to improve relevance without fabricating qualifications, employers, metrics or credentials.'],['Can I download my resume?','The current builder supports browser print/save-to-PDF. A dedicated export pipeline can be added next.'],['Do I need a job description?','No for basic building and analysis. A target description makes tailoring and relevance checks more useful.']].map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>

  <section className="js-final"><span className="js-pill">Ready when you are</span><h2>Build the resume<br/><em>you actually want to send.</em></h2><Link href="/resume" className="js-primary">Get started free <ArrowRight size={16}/></Link></section>
  <footer className="js-footer"><div><b>JOBSUIT AI</b><p>{BRAND.tagline}</p></div><div><Link href="/resume">Resume Builder</Link><Link href="/assistant">Tailoring</Link><Link href="/career">Analysis</Link><Link href="/pricing">Pricing</Link></div><div><Link href="/auth">Log in</Link><Link href="/auth?mode=sign-up">Sign up</Link></div><small>Independent recreation / prototype. Not affiliated with Jobsuit AI.</small></footer>
 </main>
}
