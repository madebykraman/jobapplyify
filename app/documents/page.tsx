'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, Trash2, Upload } from 'lucide-react'
import { loadDocuments, saveDocuments, uid, type RovaDocument } from '@/lib/storage'

export default function DocumentsPage(){
 const [docs,setDocs]=useState<RovaDocument[]>([]); const [busy,setBusy]=useState(false)
 useEffect(()=>setDocs(loadDocuments()),[])
 async function add(e:React.ChangeEvent<HTMLInputElement>){const files=Array.from(e.target.files||[]);if(!files.length)return;setBusy(true);const next=[...docs];for(const f of files){let text='';try{if(f.type==='text/plain'||f.name.endsWith('.md'))text=await f.text()}catch{}next.unshift({id:uid('doc'),name:f.name,type:f.type||'file',size:f.size,uploadedAt:new Date().toISOString(),extractedText:text})}setDocs(next);saveDocuments(next);setBusy(false);e.target.value=''}
 function remove(id:string){const next=docs.filter(d=>d.id!==id);setDocs(next);saveDocuments(next)}
 return <main className="main standalone"><Link className="back" href="/">← Command</Link><div className="mono eyebrow">ROVA / DOCUMENTS</div><h1 className="title">Your source documents.</h1><p className="lead">Keep resumes and career documents available to the intelligence layer. Local demo storage is used until a private Supabase bucket is configured.</p><section className="formcard"><div className="upload"><Upload size={22}/><div><b>{busy?'Adding…':'Add documents'}</b><small>PDF, DOCX, TXT and other career files</small></div><input type="file" multiple accept=".pdf,.docx,.txt,.md" onChange={add}/></div>{docs.length===0?<div className="empty">No documents yet. Add your current resume to begin.</div>:<div className="doclist">{docs.map(d=><div className="docrow" key={d.id}><FileText size={18}/><div><b>{d.name}</b><small>{Math.round(d.size/1024)} KB · {new Date(d.uploadedAt).toLocaleDateString()}</small></div><button className="link" onClick={()=>remove(d.id)} aria-label={`Delete ${d.name}`}><Trash2 size={15}/></button></div>)}</div>}</section></main>
}
