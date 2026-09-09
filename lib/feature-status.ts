export type FeatureStatus = 'live' | 'partial' | 'mock' | 'unavailable' | 'unsafe'

export type FeatureTruth = {
  status: FeatureStatus
  note: string
  sourceOfTruth?: string
}

export const FEATURE_TRUTH = {
  auth: { status: 'live', note: 'Supabase authentication with cookie-backed SSR sessions.' },
  entitlement: { status: 'partial', note: 'Server-side Pro route gating and entitlement API exist; billing lifecycle is not implemented.' },
  resumeImport: { status: 'partial', note: 'TXT, Markdown, DOCX and PDF browser extraction exist; durable structured parsing is not yet complete.' },
  resumeIntelligence: { status: 'partial', note: 'Heuristic structural/term analysis; calibrated market scoring is not live.' },
  jobSources: { status: 'partial', note: 'Lever and Ashby source parsing exist; representative fixture coverage is still required.' },
  applications: { status: 'partial', note: 'Application preparation exists; durable package snapshots and full provenance are planned.' },
  automation: { status: 'partial', note: 'Durable queue and worker control plane exist; production ATS adapters and independent submission verification are incomplete.' },
  interview: { status: 'mock', note: 'Interview/outcome surfaces are not yet backed by real interview sessions or inbox ingestion.' },
  growth: { status: 'mock', note: 'Current growth surface is not yet backed by durable outcome-derived intelligence.' },
  community: { status: 'mock', note: 'Current community surface is not a live anonymous contribution/aggregation system.' },
  payments: { status: 'unavailable', note: 'Checkout, webhooks, billing lifecycle and tax/invoice handling are not implemented.' },
} satisfies Record<string, FeatureTruth>

export function featureStatus(key: keyof typeof FEATURE_TRUTH): FeatureTruth {
  return FEATURE_TRUTH[key]
}
