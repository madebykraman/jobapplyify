'use client'
import { useMemo, useState } from 'react'
import { Activity, BriefcaseBusiness, ChevronRight, FileText, Gauge, LayoutDashboard, Pause, Play, Search, Settings2, Sparkles, Timer, X } from 'lucide-react'

const jobs=[
 {company:'Linear',role:'Product Designer',meta:'Remote · Full-time',score:96,tags:['Design systems','Figma','B2B SaaS'],time:'2h ago'},
 {company:'Vercel',role:'Senior Product Designer',meta:'Remote · Full-time',score:92,tags:['Design systems','Dev tools','React'],time:'4h ago'},
 {company:'Notion',role:'Product Designer, Growth',meta:'New York · Hybrid',score:88,tags:['Growth','Experimentation','Figma'],time:'6h ago'}
]
const nav=[['Command',LayoutDashboard],['Opportunities',BriefcaseBusiness],['Applications',Activity],['Review queue',Timer],['Documents',FileText],['Insights',Gauge]] as const
const pipeline=[['Saved',12,['Stripe · Product Designer','Figma · UX Designer']],['Preparing',4,['Vercel · Senior Designer']],['Applied',12,['Linear · Product Designer','Notion · Product Designer']],['Interview',3,['Arc · Product Lead']],['Offer',1,['Northstar · CS Lead']]] as const

export default function Home(){
 const [active,setActive]=useState('Command'),[running,setRunning]=useState(true),[search,setSearch]=useState(false),[q,setQ]=useState(''),[notice,setNotice]=useState('')
 const filtered=useMemo(()=>jobs.filter(j=>`${j.company} ${j.role} ${j.tags.join(' ')}`.toLowerCase().includes(q.toLowerCase())),[q])
 const notify=(s:string)=>{setNotice(s);setTimeout(()=>setNotice(''),2200)}
 return <div className="shell"><aside className="side">
  <div className="brand"><div className="mark">R</div><b>ROVA</b><span>v0.2</span></div>
  <nav className="nav">{nav.map(([name,Icon])=><button key={name} className={active===name?'active':''} onClick={()=>setActive(name)}><Icon size={16}/><span>{name}</span></button>)}</nav>
  <div className="sideTools"><button onClick={()=>setSearch(true)}><Search size={16}/><span>Search</span><kbd>⌘ K</kbd></button><button onClick={()=>notify('Settings will connect in Build 03.')}><Settings2 size={16}/><span>Settings</span></button></div>
  <div className="bottom"><div className="profile"><div className="avatar">KA</div><div><strong style={{fontSize:12}}>Kumar Aman</strong><div className="mono" style={{color:'#77746d',marginTop:3}}>Personal workspace</div></div></div></div>
 </aside><main className="main">
  <header className="top"><div><div className="mono eyebrow">{active} / Tuesday, 08 Sep</div><h1 className="title">Your search, under control.</h1></div><div className="topright"><button className="ghost" onClick={()=>setRunning(!running)}>{running?<><Pause size={14}/> Pause engine</>:<><Play size={14}/> Resume engine</>}</button><button className="primary" onClick={()=>notify('Role setup opened.')}>＋ Add role</button></div></header>
  {active==='Command'?<>
   <section className="grid"><div className="card hero"><div><div className="run"><span className="pulse"></span>{running?'AUTOMATION ACTIVE':'AUTOMATION PAUSED'}</div><h2>Less searching.<br/>More signal.</h2><p>ROVA finds relevant roles, evaluates fit against your profile, prepares the application and keeps every decision traceable.</p></div><div className="mono" style={{color:'#77746d'}}>Next scan <span style={{color:'#fff'}}>in 18 min</span></div></div>
   <Stat label="Qualified today" value="24" sub="roles worth your attention" trend="+7 this week"/><Stat label="Applications" value="18" sub="12 sent · 4 review · 2 blocked"/><Stat label="Interview signal" value="22%" sub="response rate across tracked roles"/><Stat label="Time recovered" value="6.4h" sub="estimated this week"/></section>
   <section className="section"><div className="sectionhead"><h3>Strong matches</h3><span className="mono">03 NEED YOUR ATTENTION</span></div><div className="feed">{filtered.map(j=><article className="job" key={j.company+j.role}><div className="jobtop"><div><div className="company">{j.company}</div><h4>{j.role}</h4><div className="small">{j.meta}</div></div><div className="score">{j.score}</div></div><div className="chips">{j.tags.map(t=><span className="chip" key={t}>{t}</span>)}</div><div className="jobfoot"><span className="small">Posted {j.time}</span><button className="link" onClick={()=>notify(`${j.company} · ${j.role} opened.`)}>Review <ChevronRight size={13}/></button></div></article>)}</div></section>
   <section className="section"><div className="sectionhead"><h3>Application pipeline</h3><span className="mono">LAST 30 DAYS</span></div><div className="pipeline">{pipeline.map(([name,count,items])=><div className="stage" key={name}><div className="stagehead"><span>{name}</span><strong>{count}</strong></div>{items.map(x=><div className="mini" key={x}><b>{x.split(' · ')[0]}</b>{x.split(' · ')[1]}</div>)}</div>)}</div></section>
   <section className="section card"><div className="review"><div className="reviewcopy"><div className="mono">Human review</div><h3>3 applications are ready to send.</h3><p>ROVA has prepared role-specific materials. Review changes and answers before anything leaves your account.</p></div><div><span className="badge">CONTROL GATE</span>&nbsp;&nbsp;<button className="primary" onClick={()=>setActive('Review queue')}>Open queue →</button></div></div></section>
  </>:<section className="emptyPanel"><div className="emptyIcon">{nav.find(([n])=>n===active)?.[1]&&(()=>{const I=nav.find(([n])=>n===active)![1];return <I size={25}/>})()}</div><div><div className="mono">ROVA / {active}</div><h2>{active}</h2><p>This product surface is reserved for the corresponding build. The navigation and interaction shell are now ready.</p><button className="primary" onClick={()=>notify(`${active} surface queued.`)}>Continue <ChevronRight size={14}/></button></div></section>}
  <div className="footer">ROVA <span>· Career automation with judgment.</span> &nbsp; Nothing is submitted without a configured permission boundary.</div>
 </main>
 {notice&&<div className="toast"><Sparkles size={15}/>{notice}</div>}{search&&<div className="overlay" onClick={()=>setSearch(false)}><div className="searchbox" onClick={e=>e.stopPropagation()}><div className="searchhead"><Search size={17}/><input autoFocus placeholder="Search opportunities" value={q} onChange={e=>setQ(e.target.value)}/><button onClick={()=>setSearch(false)}><X size={16}/></button></div><div className="searchresults">{filtered.map(j=><button key={j.role} onClick={()=>{setSearch(false);notify(`${j.company} opened.`)}}><span><b>{j.role}</b><small>{j.company}</small></span><ChevronRight size={14}/></button>)}{!filtered.length&&<div className="empty">No matching opportunities.</div>}</div></div></div>}
 </div>
}
function Stat({label,value,sub,trend}:{label:string,value:string,sub:string,trend?:string}){return <div className="card"><div className="mono">{label}</div><div className="metricline"><div><div className="metric">{value}</div><div className="sub">{sub}</div></div>{trend&&<div className="trend">{trend}</div>}</div></div>}
