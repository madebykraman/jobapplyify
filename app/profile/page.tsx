'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Save } from 'lucide-react'
import { defaultProfile, loadProfile, saveProfile, RovaProfile } from '@/lib/storage'

export default function ProfilePage(){
 const [profile,setProfile]=useState<RovaProfile>(defaultProfile); const [saved,setSaved]=useState(false)
 useEffect(()=>setProfile(loadProfile()),[])
 const set=(k:keyof RovaProfile,v:string)=>setProfile(p=>({...p,[k]:v}))
 return <main className="main standalone"><Link className="back" href="/">← Command</Link><div className="mono eyebrow">ROVA / ACCOUNT</div><h1 className="title">Your profile.</h1><p className="lead">Keep the candidate facts ROVA is allowed to use. Nothing is invented on your behalf.</p><section className="formcard"><Field label="Full name" value={profile.name} onChange={v=>set('name',v)}/><Field label="Headline" value={profile.headline} onChange={v=>set('headline',v)}/><div className="two"><Field label="Email" value={profile.email} onChange={v=>set('email',v)} type="email"/><Field label="Phone" value={profile.phone} onChange={v=>set('phone',v)}/></div><div className="two"><Field label="Location" value={profile.location} onChange={v=>set('location',v)}/><Field label="Years of experience" value={profile.yearsExperience} onChange={v=>set('yearsExperience',v)}/></div><div className="two"><Field label="Target salary" value={profile.targetSalary} onChange={v=>set('targetSalary',v)} placeholder="e.g. ₹12 LPA"/><Field label="Target roles" value={profile.targetRoles.join(', ')} onChange={v=>set('targetRoles',v.split(',').map(x=>x.trim()).filter(Boolean))}/></div><Field label="Skills" value={profile.skills.join(', ')} onChange={v=>set('skills',v.split(',').map(x=>x.trim()).filter(Boolean))}/><div className="two"><Field label="LinkedIn" value={profile.linkedin} onChange={v=>set('linkedin',v)}/><Field label="Portfolio" value={profile.portfolio} onChange={v=>set('portfolio',v)}/></div><button className="primary" onClick={()=>{saveProfile(profile);setSaved(true);setTimeout(()=>setSaved(false),1800)}}><Save size={15}/>{saved?'Saved':'Save profile'}</button></section></main>
}
function Field({label,value,onChange,type='text',placeholder='' }:{label:string,value:string,onChange:(v:string)=>void,type?:string,placeholder?:string}){return <label className="field"><span>{label}</span><input type={type} value={value} placeholder={placeholder} onChange={e=>onChange(e.target.value)}/></label>}
