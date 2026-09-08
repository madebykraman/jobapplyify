export type Goal = { role: string; salary: string; deadline: string; weeklyFocus: string[] }

export const DEFAULT_GOAL: Goal = {
  role: 'Senior Product Designer',
  salary: '₹18L CTC',
  deadline: '90 days',
  weeklyFocus: ['Strengthen portfolio evidence', 'Target 8 high-fit roles', 'Run 2 interview drills'],
}

export const COMMUNITY_SIGNALS = [
  { topic: 'Product design', signal: 'Portfolio evidence is outperforming title breadth', confidence: 'High', source: 'Aggregated member outcomes', date: 'Sep 2026' },
  { topic: 'India / Bengaluru', signal: 'Hybrid roles are showing shorter reply cycles', confidence: 'Medium', source: 'Anonymised community timing signals', date: 'Sep 2026' },
  { topic: '₹15–20L CTC', signal: 'Strong shipped-product evidence is a recurring interview trigger', confidence: 'Medium', source: 'Anonymised interview notes', date: 'Sep 2026' },
]

export function loadGoal(): Goal {
  if (typeof window === 'undefined') return DEFAULT_GOAL
  try { return JSON.parse(localStorage.getItem('kindleap_goal') || '') || DEFAULT_GOAL } catch { return DEFAULT_GOAL }
}

export function saveGoal(goal: Goal) {
  localStorage.setItem('kindleap_goal', JSON.stringify(goal))
}
