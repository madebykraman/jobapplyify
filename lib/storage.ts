export type RovaProfile = {
  name: string
  headline: string
  location: string
  email: string
  phone: string
  yearsExperience: string
  targetSalary: string
  targetRoles: string[]
  skills: string[]
  linkedin: string
  portfolio: string
}
export type RovaDocument = { id:string; name:string; type:string; size:number; uploadedAt:string; extractedText:string }
export type RovaResume = { id:string; name:string; content:string; targetRole:string; atsScore:number; updatedAt:string }
const PROFILE_KEY='rova.profile', DOCUMENTS_KEY='rova.documents', RESUMES_KEY='rova.resumes'
export const defaultProfile:RovaProfile={name:'Kumar Aman',headline:'',location:'Patna, India',email:'',phone:'',yearsExperience:'',targetSalary:'',targetRoles:[],skills:[],linkedin:'',portfolio:''}
export function loadProfile():RovaProfile{if(typeof window==='undefined')return defaultProfile;try{return{...defaultProfile,...JSON.parse(localStorage.getItem(PROFILE_KEY)||'{}')}}catch{return defaultProfile}}
export function saveProfile(profile:RovaProfile){localStorage.setItem(PROFILE_KEY,JSON.stringify(profile))}
export function loadDocuments():RovaDocument[]{if(typeof window==='undefined')return[];try{return JSON.parse(localStorage.getItem(DOCUMENTS_KEY)||'[]')}catch{return[]}}
export function saveDocuments(documents:RovaDocument[]){localStorage.setItem(DOCUMENTS_KEY,JSON.stringify(documents))}
export function loadResumes():RovaResume[]{if(typeof window==='undefined')return[];try{return JSON.parse(localStorage.getItem(RESUMES_KEY)||'[]')}catch{return[]}}
export function saveResumes(resumes:RovaResume[]){localStorage.setItem(RESUMES_KEY,JSON.stringify(resumes))}
export function uid(prefix='rova'){return`${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}
