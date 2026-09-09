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
export type RovaDocument = { id:string; name:string; type:string; size:number; uploadedAt:string; extractedText:string; storagePath?:string }
export type RovaResume = { id:string; name:string; content:string; targetRole:string; atsScore:number; updatedAt:string }
export type RovaSavedRole = { id:string; savedAt:string }
export type RovaAutomationRecord = { id:string; company:string; role:string; source:string; applicationUrl:string; state:string; attempts:number; maxAttempts:number; createdAt:string; updatedAt:string; handoff?:string; lastError?:string }
const PROFILE_KEY='rova.profile', DOCUMENTS_KEY='rova.documents', RESUMES_KEY='rova.resumes', SAVED_ROLES_KEY='rova.savedRoles', PREP_JOB_KEY='rova.prepJob', AUTOMATION_KEY='rova.automationQueue'
export const defaultProfile:RovaProfile={name:'Kumar Aman',headline:'',location:'Patna, India',email:'',phone:'',yearsExperience:'',targetSalary:'',targetRoles:[],skills:[],linkedin:'',portfolio:''}
export function loadProfile():RovaProfile{if(typeof window==='undefined')return defaultProfile;try{return{...defaultProfile,...JSON.parse(localStorage.getItem(PROFILE_KEY)||'{}')}}catch{return defaultProfile}}
export function saveProfile(profile:RovaProfile){localStorage.setItem(PROFILE_KEY,JSON.stringify(profile))}
export function loadDocuments():RovaDocument[]{if(typeof window==='undefined')return[];try{return JSON.parse(localStorage.getItem(DOCUMENTS_KEY)||'[]')}catch{return[]}}
export function saveDocuments(documents:RovaDocument[]){localStorage.setItem(DOCUMENTS_KEY,JSON.stringify(documents))}
export function loadResumes():RovaResume[]{if(typeof window==='undefined')return[];try{return JSON.parse(localStorage.getItem(RESUMES_KEY)||'[]')}catch{return[]}}
export function saveResumes(resumes:RovaResume[]){localStorage.setItem(RESUMES_KEY,JSON.stringify(resumes))}
export function loadSavedRoles():RovaSavedRole[]{if(typeof window==='undefined')return[];try{return JSON.parse(localStorage.getItem(SAVED_ROLES_KEY)||'[]')}catch{return[]}}
export function saveSavedRoles(roles:RovaSavedRole[]){localStorage.setItem(SAVED_ROLES_KEY,JSON.stringify(roles))}
export function savePreparationJob(job:unknown){localStorage.setItem(PREP_JOB_KEY,JSON.stringify(job))}
export function loadPreparationJob<T=unknown>():T|null{if(typeof window==='undefined')return null;try{return JSON.parse(localStorage.getItem(PREP_JOB_KEY)||'null')}catch{return null}}
export function loadAutomationQueue():RovaAutomationRecord[]{if(typeof window==='undefined')return[];try{return JSON.parse(localStorage.getItem(AUTOMATION_KEY)||'[]')}catch{return[]}}
export function saveAutomationQueue(queue:RovaAutomationRecord[]){localStorage.setItem(AUTOMATION_KEY,JSON.stringify(queue))}
export function uid(prefix='rova'){return`${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}
