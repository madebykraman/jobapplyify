export type FeatureStatus = 'live' | 'partial' | 'mock' | 'unavailable' | 'unsafe'
export type FeatureTruth = { status: FeatureStatus; note: string; sourceOfTruth?: string }
export const FEATURE_TRUTH = {
  auth: { status: 'live', note: 'Supabase authentication with cookie-backed SSR sessions.' },
  entitlement: { status: 'partial', note: 'Server-side Pro enforcement exists; billing lifecycle is not connected.' },
  resumeImport: { status: 'partial', note: 'TXT, Markdown, DOCX and PDF extraction exist; structured parsing remains heuristic.' },
  resumeIntelligence: { status: 'live', note: 'Deterministic evidence-bound structural and term analysis. It is not a market benchmark.' },
  jobSources: { status: 'partial', note: 'Greenhouse, Lever and Ashby public-source parsing exists; coverage depends on source availability.' },
  applications: { status: 'live', note: 'Application packages and job snapshots can be persisted per authenticated user with RLS.' },
  automation: { status: 'partial', note: 'Durable queue, worker control, safety handoffs and evidence exist; production browser verification still requires live adapter validation.' },
  interview: { status: 'unavailable', note: 'No live interview-session or inbox integration is connected.' },
  growth: { status: 'partial', note: 'Goal editing exists; outcome-derived recommendations are not yet connected.' },
  community: { status: 'unavailable', note: 'No live anonymous contribution and aggregation system is connected.' },
  payments: { status: 'unavailable', note: 'Checkout, webhooks, billing lifecycle and tax/invoice handling are not connected.' },
} satisfies Record<string, FeatureTruth>
export function featureStatus(key: keyof typeof FEATURE_TRUTH): FeatureTruth { return FEATURE_TRUTH[key] }
