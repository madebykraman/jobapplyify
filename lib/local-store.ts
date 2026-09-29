import type {Application,ResumeDocument} from "./resume-model";
const RESUMES="veyra:resumes:v1";const APPLICATIONS="veyra:applications:v1";
export function loadResumes():ResumeDocument[]{if(typeof window==="undefined")return[];try{return JSON.parse(localStorage.getItem(RESUMES)||"[]")}catch{return[]}}
export function saveResumes(items:ResumeDocument[]){if(typeof window!=="undefined")localStorage.setItem(RESUMES,JSON.stringify(items))}
export function loadApplications():Application[]{if(typeof window==="undefined")return[];try{return JSON.parse(localStorage.getItem(APPLICATIONS)||"[]")}catch{return[]}}
export function saveApplications(items:Application[]){if(typeof window!=="undefined")localStorage.setItem(APPLICATIONS,JSON.stringify(items))}
