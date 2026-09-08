import type { RovaProfile } from './storage'

export type CareerRole = {
  title: string
  family: string
  fit: number
  salaryBand: [number, number]
  matched: string[]
  gaps: string[]
  rationale: string
}

export type CareerAssessment = {
  targetLpa: number | null
  currentSignal: number
  recommended: CareerRole[]
  paths: { title: string; direction: string; steps: string[] }[]
  target: { verdict: 'within-range' | 'stretch' | 'rebuild'; headline: string; gaps: string[]; actions: string[] }
}

const ROLES = [
  { title:'Product Designer', family:'Product design', band:[7,18], skills:['figma','product design','design systems','prototyping','ux research','interaction design','accessibility','experimentation'] },
  { title:'Senior Product Designer', family:'Product design', band:[12,28], skills:['figma','product design','design systems','prototyping','ux research','interaction design','stakeholder','strategy','leadership'] },
  { title:'UX Designer', family:'UX', band:[5,14], skills:['figma','ux','user research','wireframing','prototyping','interaction design','usability','accessibility'] },
  { title:'Design Systems Designer', family:'Design systems', band:[9,22], skills:['figma','design systems','components','tokens','documentation','accessibility','prototyping','frontend'] },
  { title:'Brand / Visual Designer', family:'Brand', band:[5,16], skills:['branding','brand','visual design','art direction','typography','figma','adobe','illustration'] },
  { title:'Creative Technologist', family:'Design + technology', band:[7,20], skills:['figma','html','css','javascript','react','prototyping','motion','creative technology'] },
  { title:'UX Researcher', family:'Research', band:[6,17], skills:['user research','qualitative research','usability','interviews','research','analytics','experimentation'] },
  { title:'Product Manager', family:'Product', band:[9,24], skills:['product strategy','roadmaps','analytics','stakeholder','experimentation','user research','prioritization','leadership'] },
]

const STOP = new Set('the and for with from that this your you are have has was were will can our their about into over under using use used role job work team years year to of in on a an as at is be by or it'.split(' '))
function terms(text:string){return [...new Set((text.toLowerCase().match(/[a-z][a-z+#.-]{2,}/g)||[]).filter(x=>!STOP.has(x)))]}
function profileText(p:RovaProfile,resume:string){return `${p.headline} ${p.skills.join(' ')} ${p.targetRoles.join(' ')} ${resume}`.toLowerCase()}
function parseLpa(value:string){const m=value.replace(/,/g,'').match(/(\d+(?:\.\d+)?)\s*(?:lpa|lakh|lakhs)?/i);return m?Number(m[1]):null}

export function assessCareer(profile:RovaProfile,resume:string):CareerAssessment{
  const text=profileText(profile,resume), tokens=new Set(terms(text))
  const recommended=ROLES.map(r=>{
    const matched=r.skills.filter(s=>tokens.has(s)||text.includes(s))
    const gaps=r.skills.filter(s=>!tokens.has(s)&&!text.includes(s)).slice(0,5)
    const raw=Math.round((matched.length/r.skills.length)*100)
    const fit=Math.max(18,Math.min(98,raw+((profile.targetRoles.some(x=>r.title.toLowerCase().includes(x.toLowerCase()))?12:0))))
    return {title:r.title,family:r.family,fit,salaryBand:r.band as [number,number],matched,gaps,rationale:matched.length?`${matched.length} relevant signals are already visible in the profile.`:'The role is plausible, but the current profile does not show enough direct evidence yet.'}
  }).sort((a,b)=>b.fit-a.fit).slice(0,5)

  const currentSignal=Math.round(Math.max(0,Math.min(100,(recommended[0]?.fit||0)*0.72+(Math.min(Number(profile.yearsExperience)||0,8)*3))))
  const targetLpa=parseLpa(profile.targetSalary)
  const bestBand=recommended[0]?.salaryBand||[0,0]
  let verdict:'within-range'|'stretch'|'rebuild'='within-range'
  if(targetLpa){ if(targetLpa>bestBand[1]*1.15) verdict='rebuild'; else if(targetLpa>bestBand[1]) verdict='stretch' }
  const targetGaps=targetLpa?recommended[0].gaps.slice(0,4):[]
  const actions=targetLpa?[
    `Build evidence for ${targetGaps.slice(0,2).join(' and ') || 'scope, outcomes and ownership'}.`,
    'Quantify outcomes in recent projects and work history.',
    `Target roles whose compensation band overlaps ₹${targetLpa} LPA rather than applying broadly.`,
  ]:['Set a target salary in Profile.','Add verified skills and measurable outcomes to improve the assessment.']

  const paths=[
    {title:'Deepen the strongest lane',direction:`${recommended[0]?.title||'Product design'} → senior scope → lead/principal track`,steps:['Own larger product problems','Show measurable business/user outcomes','Add mentorship and cross-functional leadership evidence']},
    {title:'Compound design + technology',direction:'Product design → design systems / creative technology',steps:['Strengthen systems thinking','Ship interactive prototypes','Add enough HTML/CSS/React evidence to demonstrate technical fluency']},
    {title:'Pivot through adjacent skills',direction:'Design → product / research / strategy',steps:['Close the highest-value adjacent skill gaps','Run projects that demonstrate the new function','Apply first to hybrid roles where existing design evidence transfers']},
  ]
  return {targetLpa,currentSignal,recommended,paths,target:{verdict,headline:verdict==='within-range'?'Your target sits inside the current planning range.':verdict==='stretch'?'Your target is plausible but requires stronger evidence and scope.':'Your target is above the current planning range; a staged role or skill rebuild is more realistic.',gaps:targetGaps,actions}}
}
