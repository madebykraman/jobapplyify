'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BriefcaseBusiness, FileText, Gauge, Goal, Inbox, LayoutDashboard, Menu, Search, Settings2, Sparkles, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { BRAND } from '@/lib/brand'

const primary = [
  { href: '/', label: 'Command', icon: LayoutDashboard },
  { href: '/opportunities', label: 'Opportunities', icon: Search },
  { href: '/applications', label: 'Applications', icon: BriefcaseBusiness },
  { href: '/automation', label: 'Automation', icon: Sparkles },
]
const workspace = [
  { href: '/resume', label: 'Resume', icon: FileText },
  { href: '/documents', label: 'Documents', icon: Inbox },
  { href: '/career', label: 'Career', icon: Goal },
  { href: '/insights', label: 'Insights', icon: Gauge },
  { href: '/growth', label: 'Growth', icon: Goal },
  { href: '/community', label: 'Community', icon: UserRound },
]

export default function KindleapShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  if (pathname === '/' || pathname === '/auth' || pathname === '/onboarding' || pathname.startsWith('/api/')) return <>{children}</>

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
  const close = () => setOpen(false)

  return <div className="kl-app-shell">
    <aside className={`kl-sidebar ${open ? 'is-open' : ''}`}>
      <div className="kl-brand"><span className="kl-brand-mark">K</span><div><b>{BRAND.name}</b><small>Career intelligence</small></div></div>
      <div className="kl-nav-label">Workspace</div>
      <nav className="kl-nav">{primary.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={close} className={isActive(href) ? 'active' : ''}><Icon size={17}/><span>{label}</span></Link>)}</nav>
      <div className="kl-nav-label">Build</div>
      <nav className="kl-nav">{workspace.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={close} className={isActive(href) ? 'active' : ''}><Icon size={17}/><span>{label}</span></Link>)}</nav>
      <div className="kl-sidebar-bottom"><Link href="/profile" onClick={close}><UserRound size={16}/>Profile</Link><Link href="/pricing" onClick={close}><Sparkles size={16}/>Pro access</Link><Link href="/auth" onClick={close}><Settings2 size={16}/>Account</Link></div>
    </aside>
    {open && <button className="kl-scrim" aria-label="Close navigation" onClick={close}/>} 
    <div className="kl-main">
      <header className="kl-topbar"><button className="kl-menu" aria-label="Open navigation" onClick={()=>setOpen(true)}>{open ? <X size={19}/> : <Menu size={19}/>}</button><Link href="/" className="kl-mobile-brand">{BRAND.name}</Link><div className="kl-command"><span>⌘</span><span>Search anything</span><kbd>⌘ K</kbd></div><Link href="/profile" className="kl-avatar" aria-label="Profile"><UserRound size={17}/></Link></header>
      <main className="kl-content">{children}</main>
    </div>
    <nav className="kl-mobile-nav">{primary.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={isActive(href) ? 'active' : ''}><Icon size={18}/><span>{label}</span></Link>)}</nav>
  </div>
}
