# KINDLEAP Release Roadmap — 2026-09-09

## Historical builds
Builds 01–11 remain the historical implementation timeline. Build 12 is retained as the QA/security/UI hardening effort, but its old label "final launch" is superseded by this reconciliation roadmap.

## New release sequence

### Build 12A — Product reconciliation + defect sweep
Goal: establish one source of truth and remove contradictions.
- Reconcile all feature requests and pivots.
- Remove user-visible ROVA/WAYO copy.
- Fix Lever source parsing.
- Remove unsafe generated-content fallbacks.
- Fix document deletion/orphan handling.
- Replace client-cookie entitlement checks with server entitlement reads.
- Establish shared UI tokens/primitives.
- Add route/feature status instrumentation.

Exit: no known P0/P1 defects from static audit; CI green.

### Build 12B — Complete UI system rebuild
Goal: one KINDLEAP product, not multiple themes.
- Shared navigation/command shell.
- Shared page header/index/section/action/input/list/drawer/empty-state primitives.
- Rebuild Home, Auth, Onboarding, Profile, Documents, Resume, Career, Opportunities, Applications, Automation, Review, Insights, Growth, Community and Pricing against the same system.
- Mobile/iPhone-first layouts and accessibility pass.
- Remove the legacy light editorial CSS architecture.

Exit: visual regression pass shows no page-level theme drift.

### Build 13 — Account + Career Memory
- Durable profile model.
- Career memory/evidence model.
- Work authorization, visa/sponsorship, notice period, preferred work mode, locations and compensation fields.
- Durable resumes/documents/jobs/application records.
- Private signed document access.

Exit: account survives browser/device changes with correct RLS.

### Build 14 — Resume + Evidence Intelligence
- Structured resume parser.
- Evidence vault.
- Claim → evidence provenance.
- Resume variants/versioning.
- Evidence-bound generation / truth lock.
- Application quality score.
- Portfolio and LinkedIn audit.

Exit: generated output is traceable to evidence or explicitly marked inference.

### Build 15 — Market Intelligence
- Explainable match score with calibrated weighting.
- Transferable-skills mapper.
- Company intelligence.
- Freshness/repost/duplicate detection.
- Salary and India-specific CTC intelligence.
- Remote/work-mode intelligence.
- Visa/sponsorship intelligence.
- Referral intelligence.

Exit: representative real-world sources produce normalized, sourced records with confidence.

### Build 16 — Application Studio
- Durable application records.
- Tailored resume/cover letter/answer variants.
- Application quality gate.
- Application timeline.
- Follow-up scheduling.
- Email/application intelligence hooks.
- Human review queue.

Exit: a role can move from discovery to prepared application without losing provenance or state.

### Build 17 — Automation Production
- Production Greenhouse/Lever/Ashby adapters first.
- Representative fixtures.
- Deterministic form filling.
- Immutable application package snapshot.
- CAPTCHA/sensitive/unknown-flow handoff.
- Browser session bootstrap and human handoff.
- Evidence capture.
- Independent submission verification.
- Retry/cancellation/lease recovery tests.

Exit: no platform is called live without fixture and end-to-end evidence.

### Build 18 — Interview + Outcome Intelligence
- Real Interview Lab.
- Interview question generation from role + evidence.
- Interview practice/session persistence.
- Inbox/reply ingestion.
- Outcome classifier.
- Rejection learning loop.
- Search health from real data.
- Salary negotiation and offer comparison.

Exit: application → response → interview → offer/rejection creates a durable learning loop.

### Build 19 — Growth + Community
- Durable goal planner.
- Skills-to-project planner.
- Learning roadmap.
- Career pivot simulator.
- Career health dashboard from real outcomes.
- Anonymous community contribution.
- Aggregate salary/job timing intelligence with source/date/confidence.

Exit: no community claim without privacy and aggregation tests.

### Build 20 — Monetisation + Entitlements
- Final server-side Pro enforcement.
- Payment provider.
- Checkout.
- Webhooks.
- Subscription state transitions.
- Cancellation/reactivation.
- Billing history.
- India tax/invoice handling.
- Purchasing-power-adjusted international pricing.
- Credit entitlement layer if still required.

Exit: entitlement state is authoritative, auditable and independent of client cookies.

### Build 21 — Extension + Integrations
- Chrome/browser extension.
- Supported job-board integrations beyond initial ATS sources.
- Calendar/email integrations where explicitly consented.
- Secure OAuth/token lifecycle.

Exit: integration permissions, revocation and data boundaries tested.

### Build 22 — Full release QA
- Unit tests.
- API integration tests.
- Browser E2E.
- Mobile/iPhone E2E.
- Accessibility audit.
- Performance/Web Vitals.
- Security/RLS/authorization audit.
- Rate-limit and abuse tests.
- Worker failure/recovery tests.
- Evidence redaction tests.
- Privacy/data deletion tests.
- Production observability.

Exit: zero open P0/P1 defects and all release gates evidenced.

### Build 23 — Private beta launch
- Production deployment.
- Controlled invite cohort.
- Real support/feedback loop.
- Error monitoring.
- Feature flags.
- Rollback procedure.
- Weekly outcome review.

Exit: stable beta with no critical safety/data defects.

### Build 24 — Public launch
Only after Build 23 has demonstrated reliability, retention and safe automation behaviour.

## Testing phases

Phase 1 — Static/code audit: TypeScript, lint-equivalent checks, dependency review, route inventory, dead code, unsafe fallbacks, legacy branding and security boundary inspection.

Phase 2 — Component/interaction QA: every input, button, drawer, modal, tab, upload, navigation path, loading state, empty state and error state.

Phase 3 — Data QA: persistence, reload, logout/login, device change, RLS, deletion, duplicate records, failed uploads and recovery.

Phase 4 — Integration QA: ATS sources, Supabase, worker, signed URLs, callbacks, queue claims, cancellation, retries and evidence capture.

Phase 5 — Automation safety QA: Dry Run, Review, Full Auto entitlement, unsupported forms, CAPTCHA, sensitive questions, session expiry, cancellation races and verification failures.

Phase 6 — Visual/mobile QA: iPhone Safari/Chrome, desktop Safari/Chrome/Firefox, responsive breakpoints, keyboard/focus, contrast and reduced motion.

Phase 7 — Security/privacy QA: auth bypass, forged cookies, RLS isolation, object access, callback authentication, request-size limits, SSRF/source allowlisting, secrets, deletion and audit trails.

Phase 8 — Performance/reliability: cold load, route transitions, large resume parsing, large job feeds, worker retries, concurrent jobs, rate limits and recovery.

Phase 9 — Release candidate: clean production environment, smoke suite, monitoring, rollback and beta cohort readiness.

## Launch gates
No launch until all of these are green:
1. Shared UI system across all routes.
2. No user-visible ROVA/WAYO legacy branding.
3. Authoritative server-side entitlements.
4. Durable profile/resume/application data.
5. Evidence-bound generation.
6. Real ATS adapters with fixtures.
7. Independent submission verification.
8. Evidence viewer/redaction.
9. Real outcome ingestion.
10. Notifications/follow-ups.
11. Payment/webhook lifecycle.
12. Privacy/deletion guarantees.
13. E2E + mobile + accessibility + performance coverage.
14. Monitoring and rollback procedure.
