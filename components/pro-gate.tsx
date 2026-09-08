'use client'

import Link from 'next/link'
import { Lock, Sparkles } from 'lucide-react'
import { hasProAccess } from '@/lib/entitlements'
import { useEffect, useState } from 'react'

export default function ProGate({ children, feature = 'this Pro feature' }: { children: React.ReactNode; feature?: string }) {
  const [allowed, setAllowed] = useState<boolean | null>(null)
  useEffect(() => setAllowed(hasProAccess()), [])
  if (allowed === null) return null
  if (allowed) return <>{children}</>
  return <main className="proGate"><div className="proGateIcon"><Lock size={19}/></div><div className="mono">WAYO / PRO ACCESS</div><h1>{feature} needs an account.</h1><p>Create a free WAYO account and enter the beta invite code. During beta, an invite unlocks the complete Pro workspace at no charge.</p><div className="proGateActions"><Link className="primary" href="/auth?mode=sign-up"><Sparkles size={15}/> Create free account</Link><Link className="ghost" href="/pricing">View Pro options</Link></div></main>
}
