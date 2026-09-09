'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BriefcaseBusiness, ChevronRight, FileText, Gauge, Home, Menu, Search, Settings2, Sparkles, Target, X, Zap } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { BRAND } from '@/lib/brand'
import { supabaseBrowser } from '@/lib/supabase'

const NAV = [
  { href: '/workspace', label: 'Command', icon: Home },
  { href: '/opportunities', label: 'Opportunities', icon: BriefcaseBusiness },
  { href: '/applications', label: 'Applications', icon: FileText },
  { href: '/resume', label: 'Resume', icon: FileText },
  { href: '/career', label: 'Career', icon: Target },
  { href: '/automation', label: 'Automation', icon: Zap },
  { href: '/insights', label: 'Insights', icon: Gauge },
  { href: '/growth', label: 'Growth', icon: Sparkles },
]

export function KindleapShell({ children }: { children: ReactNode }) {
  const pathname = usePathname(); const router = useRouter(); const [open, setOpen] = useState(false)
  const active = (href: string) => pathname === href || (href !== '/workspace' && pathname.startsWith(`${href}/`))
  async function signOut(){ await supabaseBrowser.auth.signOut(); router.push('/auth'); router.refresh() }
  return <div className="kl-shell">
    <aside className={`kl-sidebar${open ? ' is-open' : ''}`}>
      <Link href="/workspace" className="kl-brand" onClick={() => setOpen(false)}><span className="kl-mark">K</span><span><b>{BRAND.name}</b><small>{BRAND.tagline}</small></span></Link>
      <div className="kl-nav-label">Workspace</div>
      <nav className="kl-nav" aria-label="Workspace navigation">{NAV.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={active(href) ? 'active' : ''} aria-current={active(href) ? 'page' : undefined} onClick={() => setOpen(false)}><Icon size={16}/><span>{label}</span></Link>)}</nav>
      <div className="kl-sidebar-bottom"><Link href="/profile"><Settings2 size={15}/>Profile & settings</Link><button type="button" onClick={signOut}><X size={15}/>Sign out</button></div>
    </aside>
    {open && <button className="kl-scrim" aria-label="Close navigation" onClick={() => setOpen(false)}/>} 
    <div className="kl-main">
      <header className="kl-topbar"><button className="kl-menu" aria-label="Open navigation" onClick={() => setOpen(true)}><Menu size={19}/></button><Link href="/workspace" className="kl-mobile-brand">{BRAND.name}</Link><button className="kl-command" type="button" onClick={() => window.dispatchEvent(new Event('kindleap:command'))} aria-label="Open command search"><Search size={14}/><span>Search anything…</span><kbd>⌘ K</kbd></button><Link href="/profile" className="kl-avatar" aria-label="Profile">KA</Link></header>
      <main className="kl-content">{children}</main>
      <nav className="kl-mobile-nav" aria-label="Mobile navigation">{NAV.slice(0,4).map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={active(href) ? 'active' : ''} aria-current={active(href) ? 'page' : undefined}><Icon size={17}/><span>{label}</span></Link>)}</nav>
    </div>
  </div>
}

export function SectionHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: ReactNode; description?: string; action?: ReactNode }) {
  return <div className="kl-section-head"><div>{eyebrow && <div className="kl-eyebrow">{eyebrow}</div>}<h1>{title}</h1>{description && <p>{description}</p>}</div>{action && <div className="kl-head-action">{action}</div>}</div>
}
export function Surface({ children, className = '' }: { children: ReactNode; className?: string }) { return <section className={`kl-surface ${className}`}>{children}</section> }
export function Signal({ label, value, detail }: { label: string; value: ReactNode; detail?: string }) { return <div className="kl-signal"><span>{label}</span><strong>{value}</strong>{detail && <small>{detail}</small>}</div> }
export function Status({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'good' | 'warn' | 'accent' }) { return <span className={`kl-status kl-status-${tone}`}>{children}</span> }
export function Row({ children, href }: { children: ReactNode; href?: string }) { const body = <div className="kl-row-inner">{children}<ChevronRight size={15} className="kl-row-arrow"/></div>; return href ? <Link href={href} className="kl-row">{body}</Link> : <div className="kl-row">{body}</div> }
