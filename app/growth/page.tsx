'use client'

import Link from 'next/link'
import { ArrowUpRight, Check, Compass, Target, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BRAND } from '@/lib/brand'
import { DEFAULT_GOAL, Goal, loadGoal, saveGoal } from '@/lib/growth'
import './growth.css'

export default function GrowthPage() {
  const [goal, setGoal] = useState<Goal>(DEFAULT_GOAL)
  const [saved, setSaved] = useState(false)
  useEffect(() => setGoal(loadGoal()), [])
  function update(key: 'role' | 'salary' | 'deadline', value: string) { setGoal(g => ({ ...g, [key]: value })); setSaved(false) }
  function commit() { saveGoal(goal); setSaved(true) }
  return <main className="growthPage">
    <header className="growthHeader"><Link href="/" className="growthLogo"><span>K</span>{BRAND.name}</Link><div><b>GROWTH / 10</b><i>CAREER PLAN</i></div><nav><Link href="/opportunities">Explore</Link><Link href="/insights">Outcomes</Link><Link href="/community">Community</Link></nav></header>
    <section className="growthHero"><span className="growthIndex">GROWTH / 001</span><div><p>GOAL PLANNER</p><h1>Turn ambition<br/><em>into a week.</em></h1><span className="growthLead">Set the role, compensation and horizon. KINDLEAP turns the target into a focused operating plan instead of another productivity dashboard.</span></div><div className="goalStamp"><Target size={20}/><b>ACTIVE TARGET</b><strong>{goal.role}</strong><span>{goal.salary} · {goal.deadline}</span></div></section>
    <section className="goalEditor"><div className="growthIndex">A / 01</div><div><p>THE TARGET</p><h2>What would make<br/><em>the next 90 days count?</em></h2></div><div className="goalFields"><label>Target role<input value={goal.role} onChange={e => update('role', e.target.value)}/></label><label>Target CTC<input value={goal.salary} onChange={e => update('salary', e.target.value)}/></label><label>Time horizon<input value={goal.deadline} onChange={e => update('deadline', e.target.value)}/></label><button onClick={commit}>{saved ? <><Check size={15}/> Saved</> : <>Set target <ArrowUpRight size={15}/></>}</button></div></section>
    <section className="weeklyPlan"><div className="growthIndex">B / 02</div><div><p>THIS WEEK</p><h2>Three moves.<br/><em>No busywork.</em></h2><span>Generated from the current target. Replace any action with evidence-backed work that moves the search forward.</span></div><div className="focusList">{goal.weeklyFocus.map((item, i) => <div key={item}><span>0{i + 1}</span><b>{item}</b><Check size={16}/></div>)}</div></section>
    <section className="growthSignals"><div className="growthIndex">C / 03</div><div><p>CAREER HEALTH</p><h2>Progress is a<br/><em>signal, not a score.</em></h2></div><div className="healthGrid"><div><TrendingUp/><b>Fit quality</b><strong>Rising</strong><span>More applications are aligned to your target.</span></div><div><Compass/><b>Skill gap</b><strong>Focused</strong><span>One portfolio proof area is limiting conversion.</span></div></div></section>
    <footer><span>{BRAND.name} · {BRAND.tagline}</span><Link href="/community">See community intelligence <ArrowUpRight size={13}/></Link></footer>
  </main>
}
