export type ResumeAnalysis = {
  score: number
  matchedSkills: string[]
  missingSkills: string[]
  keywords: string[]
  sections: string[]
  warnings: string[]
  summary: string
}

const STOP = new Set('the and for with from that this your you are have has was were will can our their about into over under using use used role job work team years year to of in on a an as at is be by or it'.split(' '))

export function tokenize(text: string) {
  return [...new Set((text.toLowerCase().match(/[a-z][a-z+#.-]{2,}/g) || []).filter(x => !STOP.has(x)))]
}

export function analyzeResume(resumeText: string, targetText = ''): ResumeAnalysis {
  const text = resumeText.trim()
  const lower = text.toLowerCase()
  const sections = ['experience','education','skills','projects','summary','certifications'].filter(s => lower.includes(s))
  const keywords = tokenize(targetText).filter(x => x.length >= 4).slice(0, 30)
  const matchedSkills = keywords.filter(k => lower.includes(k))
  const missingSkills = keywords.filter(k => !lower.includes(k)).slice(0, 12)
  const formattingWarnings = [
    !text ? 'Add resume content before running the check.' : '',
    text.length > 12000 ? 'Resume is unusually long. Review for unnecessary detail.' : '',
    !/experience/i.test(text) ? 'Experience section was not detected.' : '',
    !/education/i.test(text) ? 'Education section was not detected.' : '',
    !/skills/i.test(text) ? 'Skills section was not detected.' : '',
  ].filter(Boolean)
  const keywordScore = keywords.length ? Math.round((matchedSkills.length / keywords.length) * 60) : 35
  const sectionScore = Math.min(sections.length * 6, 30)
  const penalty = Math.min(formattingWarnings.length * 4, 16)
  const score = Math.max(0, Math.min(100, keywordScore + sectionScore + 10 - penalty))
  return {
    score, matchedSkills, missingSkills, keywords, sections,
    warnings: formattingWarnings,
    summary: keywords.length ? `${matchedSkills.length} of ${keywords.length} target terms appear in the resume.` : 'Add a target job description to get a role-specific match score.'
  }
}

export function extractResumeText(raw: string) {
  return raw.replace(/\r/g, '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim()
}
