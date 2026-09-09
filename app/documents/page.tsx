'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, Trash2, Upload, ShieldCheck } from 'lucide-react'
import { loadDocuments, saveDocuments, uid, type RovaDocument } from '@/lib/storage'
import { supabase } from '@/lib/supabase'

export default function DocumentsPage(){
 const [docs,setDocs]=useState<RovaDocument[]>([]); const [busy,setBusy]=useState(false); const [status,setStatus]=useState('')
 useEffect(()=>setDocs(loadDocuments()),[])
 async function add(e:React.ChangeEvent<HTMLInputElement>){const files=Array.from(e.target.files||[]);if(!files.length)return;setBusy(true);setStatus('');const next=[...docs];for(const f of files){let text='';try{if(f.type==='text/plain'||f.name.endsWith('.md'))text=await f.text()}catch{}
   let storagePath:string|undefined
   if(supabase){const {data:{user}}=await supabase.auth.getUser();if(user){storagePath=`${user.id}/${uid('file')}_${f.name.replace(/[^a-zA-Z0-9._-]/g,'_')}`;const upload=await supabase.storage.from('documents').upload(storagePath,f,{upsert:false});if(upload.error){setStatus(upload.error.message);continue}const row=await supabase.from('documents').insert({user_id:user.id,name:f.name,storage_path:storagePath,mime_type:f.type||'',size_bytes:f.size,extracted_text:text});if(row.error){await supabase.storage.from('documents').remove([storagePath]);setStatus(row.error.message);continue}}}
   next.unshift({id:uid('doc'),name:f.name,type:f.type||'file',size:f.size,uploadedAt:new Date().toISOString(),extractedText:text,storagePath})
 }setDocs(next);saveDocuments(next);setBusy(false);if(!status)setStatus(supabase?'Stored in your private document bucket.':'Saved locally. Connect Supabase for private cloud storage.');e.target.value=''}
 async function remove(id:string){const doc=docs.find(d=>d.id===id);if(!doc)return;setBusy(true);setStatus('');if(supabase&&doc.storagePath){const {data:{user}}=await supabase.auth.getUser();if(user&&doc.storagePath.startsWith(`${user.id}/`)){const storage=await supabase.storage.from('documents').remove([doc.storagePath]);if(storage.error){setStatus(storage.error.message);setBusy(false);return}const row=await supabase.from('documents').delete().eq('user_id',user.id).eq('storage_path',doc.storagePath);if(row.error){setStatus(row.error.message);setBusy(false);return}}}const next=docs.filter(d=>d.id!==id);setDocs(next);saveDocuments(next);setBusy(false);setStatus('Document removed.');}
 return <main className="main standalone"><Link className="back" href="/">← Command</Link><div className="mono eyebrow">KINDLEAP / DOCUMENTS</div><h1 className="title">Your source documents.</h1><p className="lead">Keep resumes and career documents available to the intelligence layer. Private cloud storage is used when Supabase is configured.</p><section className="formcard"><div className="upload"><Upload size={22}/><div><b>{busy?'Working…':'Add documents'}</b><small>PDF, DOCX, TXT and Markdown</small></div><input type="file" multiple accept=".pdf,.docx,.txt,.md" onChange={add}/></div>{status&&<div className="notice"><ShieldCheck size={15}/>{status}</div>}{docs.length===0?<div className="empty">No documents yet. Add your current resume to begin.</div>:<div className="doclist">{docs.map(d=><div className="docrow" key={d.id}><FileText size={18}/><div><b>{d.name}</b><small>{Math.round(d.size/1024)} KB · {new Date(d.uploadedAt).toLocaleDateString()}</small></div><button className="link" onClick={()=>remove(d.id)} disabled={busy} aria-label={`Delete ${d.name}`}><Trash2 size={15}/></button></div>)}</div>}</section></main>
}
