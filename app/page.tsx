'use client'
import {useState} from 'react'

const jobs=[
 {company:'Linear',role:'Product Designer',meta:'Remote · Full-time',score:96,tags:['Design systems','Figma','B2B SaaS'],time:'Posted 2h ago'},
 {company:'Vercel',role:'Senior Product Designer',meta:'Remote · Full-time',score:92,tags:['Design systems','Dev tools','React'],time:'Posted 4h ago'},
 {company:'Notion',role:'Product Designer, Growth',meta:'New York · Hybrid',score:88,tags:['Growth','Experimentation','Figma'],time:'Posted 6h ago'},
]

export default function Home(){
 const [active,setActive]=useState('Command')
 const [running,setRunning]=useState(true)
 const nav=['Command','Opportunities','Applications','Review queue','Documents','Insights']
 return <div className="shell">
  <aside className="side">
   <div className="brand"><div className="mark">R</div><b>ROVA</b><span>v0.1</span></div>
   <nav className="nav">{nav.map((n,i)=><button key={n} className={active===n?'active':''} onClick={()=>setActive(n)}><span>{['⌂','◈','↗','◌','□','⌁'][i]}&nbsp;&nbsp;</span>{n}</button>)}</nav>
   <div className="bottom"><div className="profile"><div className="avatar">KA</div><div><strong style={{fontSize:12}}>Kumar Aman</strong><div className="mono" style={{color:'#77746d',marginTop:3}}>Personal workspace</div></div></div></div>
  </aside>
  <main className="main">
   <header className="top"><div><div className="mono eyebrow">{active} / Tuesday, 08 Sep</div><h1 className="title">Your search, under control.</h1></div><div className="topright"><button className="ghost" onClick={()=>setRunning(!running)}>{running?'Pause engine':'Resume engine'}</button><button className="primary">＋ Add role</button></div></header>
   <section className="grid">
    <div className="card hero"><div><div className="run"><span className="pulse"></span>{running?'AUTOMATION ACTIVE':'AUTOMATION PAUSED'}</div><h2 style={{marginTop:22}}>Less searching.<br/>More signal.</h2><p>ROVA finds relevant roles, evaluates fit against your profile, prepares the application and keeps every decision traceable.</p></div><div className="mono" style={{color:'#77746d'}}>Next scan <span style={{color:'#fff'}}>in 18 min</span></div></div>
    <div className="card"><div className="mono">Qualified today</div><div className="metricline"><div><div className="metric">24</div><div className="sub">roles worth your attention</div></div><div className="trend">+7 this week</div></div></div>
    <div className="card"><div className="mono">Applications</div><div className="metric">18</div><div className="sub">12 sent · 4 review · 2 blocked</div></div>
    <div className="card"><div className="mono">Interview signal</div><div className="metric">22%</div><div className="sub">response rate across tracked roles</div></div>
    <div className="card"><div className="mono">Time recovered</div><div className="metric">6.4h</div><div className="sub">estimated this week</div></div>
   </section>

   <section className="section"><div className="sectionhead"><h3>Strong matches</h3><span className="mono">03 NEED YOUR ATTENTION</span></div><div className="feed">{jobs.map(j=><article className="job" key={j.company+j.role}><div className="jobtop"><div><div className="company">{j.company}</div><h4>{j.role}</h4><div className="small">{j.meta}</div></div><div className="score">{j.score}</div></div><div className="chips">{j.tags.map(t=><span className="chip" key={t}>{t}</span>)}</div><div className="jobfoot"><span className="small">{j.time}</span><span className="link">Review →</span></div></article>)}</div></section>

   <section className="section"><div className="sectionhead"><h3>Application pipeline</h3><span className="mono">LAST 30 DAYS</span></div><div className="pipeline">{[['Saved','12',['Stripe · Product Designer','Figma · UX Designer']],['Preparing','4',['Vercel · Senior Designer']],['Applied','12',['Linear · Product Designer','Notion · Product Designer']],['Interview','3',['Arc · Product Lead']],['Offer','1',['Northstar · CS Lead']]].map(([name,count,items])=><div className="stage" key={name}><div className="stagehead"><span>{name}</span><strong>{count as number}</strong></div>{(items as string[]).map(x=><div className="mini" key={x}><b>{x.split(' · ')[0]}</b>{x.split(' · ')[1]}</div>)}</div>)}</div></section>

   <section className="section card"><div className="review"><div className="reviewcopy"><div className="mono">Human review</div><h3>3 applications are ready to send.</h3><p>ROVA has prepared role-specific materials. Review the changes and answers before anything leaves your account.</p></div><div><span className="badge">CONTROL GATE</span>&nbsp;&nbsp;<button className="primary">Open queue →</button></div></div></section>
   <div className="footer">ROVA <span>· Career automation with judgment.</span> &nbsp; Nothing is submitted without a configured permission boundary.</div>
  </main>
 </div>
}