'use client'

import Link from 'next/link'
import { Lock, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function ProGate({ children, feature = 'this Pro feature' }: { children: React.ReactNode; feature?: string }) {
  const [state, setState] = useState<'loading' | 'allowed' | 'denied'>('loading')

  useEffect(() => {
    let active = true
    async function check() {
      if (!supabase) { if (active) setState('denied'); return }
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { if (active) setState('denied'); return }
      const response = await fetch('/api/entitlements', {
        headers: { Authorization: `Bearer ${session.access_token}` },
        cache: 'no-store',
      }).catch(() => null)
      const data = response?.ok ? await response.json().catch(() => null) : null
      const allowed = data?.plan === 'pro' && data?.status === 'active' &&
        (!data?.currentPeriodEnd || new Date(data.currentPeriodEnd).getTime() > Date.now())
      if (active) setState(allowed ? 'allowed' : 'denied')
    }
    void check()
    return () => { active = false }
  }, [])

  if (state === 'loading') return <main className="proGate"><div className="mono">KINDLEAP / ACCESS</div><h1>Checking workspace access.</h1></main>
  if (state === 'allowed') return <>{children}</>

  return <main className="proGate"><div className="proGateIcon"><Lock size={19}/></div><div className="mono">KINDLEAP / PRO ACCESS</div><h1>{feature} needs an active Pro entitlement.</h1><p>Sign in or activate the beta entitlement to continue. Access is checked against the server, not a client-side flag.</p><div className="proGateActions"><Link className="primary" href="/auth?mode=sign-up"><Sparkles size={15}/> Create free account</Link><Link className="ghost" href="/pricing">View Pro options</Link></div></main>
}
