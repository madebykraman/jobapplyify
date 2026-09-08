'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export default function AuthPage(){
 const [mode,setMode]=useState<'sign-in'|'sign-up'>('sign-in')
 const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [message,setMessage]=useState(''); const [busy,setBusy]=useState(false)
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setMessage('')
  try{
   if(!supabase){localStorage.setItem('rova.demo.email',email);setMessage('Demo account ready. Add Supabase keys when you want persistent authentication.');return}
   const result=mode==='sign-in'?await supabase.auth.signInWithPassword({email,password}):await supabase.auth.signUp({email,password})
   if(result.error) throw result.error
   setMessage(mode==='sign-in'?'Signed in. Return to Command.':'Account created. Check your email if confirmation is enabled.')
  }catch(err){setMessage(err instanceof Error?err.message:'Authentication failed.')}finally{setBusy(false)}
 }
 return <main className="main standalone auth"><Link className="back" href="/">← Command</Link><div className="mono eyebrow">ROVA / ACCOUNT</div><h1 className="title">Your career workspace.</h1><p className="lead">Sign in to keep profile, documents and application state together.</p><section className="formcard"><div className="tabs"><button className={mode==='sign-in'?'selected':''} onClick={()=>setMode('sign-in')}>Sign in</button><button className={mode==='sign-up'?'selected':''} onClick={()=>setMode('sign-up')}>Create account</button></div><form onSubmit={submit}><label className="field"><span>Email</span><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label><label className="field"><span>Password</span><input type="password" required minLength={8} value={password} onChange={e=>setPassword(e.target.value)} placeholder="8+ characters"/></label><button className="primary" type="submit" disabled={busy}>{busy?'Working…':mode==='sign-in'?'Sign in':'Create account'} →</button></form>{message&&<div className="notice">{message}</div>}<p className="small">{isSupabaseConfigured?'Supabase authentication is active.':'Demo mode is active until Supabase project keys are configured.'}</p></section></main>}
