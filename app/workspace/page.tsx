'use client'

import Link from 'next/link'
import { ArrowUpRight, BriefcaseBusiness, FileText, Gauge, MessageSquareText, Sparkles, Target, Zap } from 'lucide-react'
import { BRAND } from '@/lib/brand'
import { KindleapShell, SectionHeader, Signal, Status, Surface } from '@/components/kindleap-ui'

const modules = [
  ['Resume Studio','Turn experience into structured, evidence-ready material.','/resume',FileText],
  ['Career Lab','Model where your profile can move and what closes the gap.','/career',Target],
  ['Opportunities','Inspect roles with fit, context and source provenance.','/opportunities',BriefcaseBusiness],
  ['Applications','Prepare one role with the exact evidence you intend to use.','/applications',Sparkles],
  ['Automation','Run repetitive work with explicit review and safety boundaries.','/automation',Zap],
  ['Interview Lab','Practice against the role, your evidence and the gaps.','/insights',MessageSquareText],
] as const

export default function WorkspacePage() {
  return <KindleapShell><div className="kl-page">
    <SectionHeader eyebrow="Command / Career intelligence" title={<>Make the next <em>move</em> count.</>} description="KINDLEAP turns your career evidence into clearer decisions, stronger applications and controlled execution." action={<Status tone="accent">BETA · CONTROLLED ACCESS</Status>} />

    <Surface className="kl-command-hero"><div><div className="kl-eyebrow">Your operating loop</div><h2>Find → Understand → Prepare → Apply → Learn.</h2><p>Every action should produce a useful signal. Every generated claim should have evidence behind it. Automation stops when judgment is required.</p><div className="kl-action-row"><Link href="/opportunities" className="kl-button kl-button-primary">Find opportunities <ArrowUpRight size={15}/></Link><Link href="/resume" className="kl-button">Audit resume</Link></div></div><div className="kl-command-grid"><Signal label="Evidence" value="Grounded" detail="Claims trace to known material"/><Signal label="Execution" value="Review" detail="Human boundary before submit"/><Signal label="Priority" value="Signal" detail="Quality over application volume"/></div></Surface>

    <div className="kl-module-grid">{modules.map(([title,desc,href,Icon]) => <Link href={href} className="kl-module" key={title}><div className="kl-module-top"><Icon size={18}/><ArrowUpRight size={15}/></div><h2>{title}</h2><p>{desc}</p><span>Open module</span></Link>)}</div>

    <div className="kl-dashboard-grid"><Surface><div className="kl-eyebrow">Today</div><h3>What needs attention?</h3><div className="kl-attention"><div><b>Profile evidence</b><span>Add missing proof before tailoring roles.</span></div><div><b>Opportunity signal</b><span>Review roles before committing application effort.</span></div><div><b>Application control</b><span>Nothing submits without the configured safety boundary.</span></div></div></Surface><Surface><div className="kl-eyebrow">System state</div><h3>Controlled by design.</h3><div className="kl-state"><span><i/> Source provenance</span><span><i/> Server-side access</span><span><i/> Human review boundary</span></div></Surface></div>

    <footer className="kl-page-footer"><span>{BRAND.name} · {BRAND.tagline}</span><span>{BRAND.principles[1]} · {BRAND.principles[3]}</span></footer>
  </div></KindleapShell>
}
