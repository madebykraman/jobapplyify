# KINDLEAP Release Roadmap — 2026-09-09

This roadmap is reconciled against the full project history, current repository state, the 30-feature list, and the supplied competitor/UI reference set. See `docs/MASTER_AUDIT.md` for code/product findings and `docs/COMPETITIVE_UI_AUDIT.md` for the external reference audit.

## Historical builds
Builds 01–11 remain the historical implementation timeline. Build 12 is the QA/security/UI hardening boundary; it is not a launch claim.

## Product thesis
KINDLEAP is not a volume auto-apply clone. The product thesis is: **evidence-backed career decisions + controlled automation + outcome learning**.

Core loop: `Find → Understand → Prepare → Apply → Interview → Grow`

Execution loop: `Discover → Qualify → Prepare → Review → Apply → Verify → Track → Learn`

## Build 12A — Product reconciliation + defect sweep
- Reconcile all historical feature requests, modifications and pivots.
- Remove user-visible ROVA/WAYO copy.
- Fix source parsing and representative fixtures.
- Remove unsafe generated-content fallbacks.
- Fix document deletion/orphan handling.
- Replace client-cookie entitlement checks with server entitlement reads.
- Establish shared UI tokens/primitives.
- Add route/feature status instrumentation.
- Establish a feature truth table: live / partial / mock / unavailable.

Exit: no known P0/P1 static defects; CI green; documentation reconciled.

## Build 12B — Complete UI system rebuild
The supplied UI references are now treated as design-system inputs, not page-decoration inspiration.

Influences:
- OpenSource UI: cohesive reusable primitives without flattening every component into the same visual shape.
- Exalt: clarify product structure and critical workflows before styling; atomic/component system; progressive disclosure; complex data made legible.
- Swiped: visual pattern exploration where accessible; no unverified implementation claims.
- Recent: editorial curation and visual rhythm.
- Grainient: engineered visual atmosphere for brand moments, not dense decision surfaces.

Rebuild:
- Shared navigation/command shell.
- Shared page header/index/section/action/input/list/drawer/empty-state primitives.
- Shared evidence, score, status and automation-state primitives.
- Home, Auth, Onboarding, Profile, Documents, Resume, Career, Opportunities, Applications, Automation, Review, Insights, Growth, Community and Pricing.
- Mobile/iPhone-first layouts and accessibility.
- Remove the legacy light editorial CSS architecture rather than layering overrides indefinitely.

Exit: visual regression pass shows no page-level theme drift and all core flows use shared primitives.

## Build 13 — Account + Career Memory
- Durable profile model.
- Career memory/evidence model.
- Work authorization, visa/sponsorship, notice period, preferred work mode, locations and compensation.
- Durable resumes/documents/jobs/application records.
- Private signed document access.
- Explicit user-approved memory, not silent AI memory.
- Durable Answer Library for recurring application questions.

Exit: account survives browser/device changes with correct RLS and deletion semantics.

## Build 14 — Resume + Evidence Intelligence
- Structured resume parser.
- Evidence vault.
- Claim → evidence provenance.
- Resume variants/versioning.
- Evidence-bound generation / truth lock.
- Application quality score.
- Portfolio/project audit.
- LinkedIn audit + rewrite.
- Optional portfolio/video evidence.
- Multilingual resume output as an internationalisation feature.

Exit: every generated candidate claim is traceable to evidence or explicitly labelled inference.

## Build 15 — Market Intelligence
- Explainable match score with calibrated weighting.
- Transferable-skills mapper.
- Company intelligence: product/team/funding/news/hiring velocity/context/risk.
- Freshness decay, duplicate/repost detection.
- Salary and India-specific CTC intelligence.
- Notice-period intelligence.
- Remote/work-mode intelligence.
- Visa/sponsorship intelligence.
- Referral intelligence.
- Company exclusion lists.
- Hard deal-breakers.
- Source/date/confidence metadata.

Exit: representative real-world sources produce normalized, sourced records with confidence and freshness.

## Build 16 — Application Studio
- Durable application records.
- Tailored resume/cover letter/answer variants.
- Application quality gate.
- Immutable application-package snapshot.
- Application timeline.
- Application Review tab showing the exact artifacts intended/submitted.
- Follow-up scheduling and delivery hooks.
- Dynamic outreach/email drafts tied to the application.
- Human review queue.
- Interview-round records.
- Response analytics by source, role family and evidence quality.

Exit: a role can move from discovery to prepared application without losing provenance or state.

## Build 17 — Automation Production
- Production Greenhouse/Lever/Ashby adapters first.
- Representative fixtures.
- Deterministic form filling.
- Answer Library integration.
- Immutable application package snapshot.
- Dry Run.
- Review.
- Hybrid mode: high-fit roles auto-submit, lower-fit roles require approval.
- Full Auto only when policy permits.
- CAPTCHA/sensitive/unknown-flow handoff.
- Browser session bootstrap and human handoff.
- Evidence capture.
- Independent submission verification.
- Retry/cancellation/lease recovery tests.
- Campaign abstraction: role + geography + salary + exclusions + automation policy + follow-up policy.

Exit: no platform is called live without fixture and end-to-end evidence.

## Build 18 — Interview + Outcome Intelligence
- Real Interview Lab.
- Interview question generation from role + evidence.
- Interview practice/session persistence.
- Inbox/reply ingestion.
- Outcome classifier.
- Rejection learning loop.
- Search health from real data.
- Salary negotiation intelligence.
- Offer comparison.
- Recruiter engagement signals where consented and technically available.

Exit: application → response → interview → offer/rejection creates a durable learning loop.

## Build 19 — Growth + Community
- Durable goal planner.
- Skills-to-project planner.
- Learning roadmap.
- Career pivot simulator.
- Career health dashboard from real outcomes.
- Anonymous community contribution.
- Aggregate salary/job timing intelligence with source/date/confidence.
- Explicit privacy/aggregation thresholds.

Exit: no community claim without privacy and aggregation tests.

## Build 20 — Monetisation + Entitlements
- Final server-side Pro enforcement.
- Payment provider.
- Checkout.
- Webhooks.
- Subscription state transitions.
- Cancellation/reactivation.
- Billing history.
- India tax/invoice handling.
- Purchasing-power-adjusted international pricing.
- Credit entitlement layer only if the economics and verified-application model require it.

Exit: entitlement state is authoritative, auditable and independent of client cookies.

## Build 21 — Extension + Integrations
- Chrome/browser extension.
- Contextual job-page sidebar.
- Supported job-board integrations beyond initial ATS sources.
- Calendar/email integrations where explicitly consented.
- Secure OAuth/token lifecycle.
- Recruiter/referral workflows.

Exit: integration permissions, revocation and data boundaries tested.

## Build 22 — Full release QA
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
- Feature truth audit: no seeded demo data presented as live intelligence.
- Production observability.

Exit: zero open P0/P1 defects and all release gates evidenced.

## Build 23 — Private beta launch
- Production deployment.
- Controlled invite cohort.
- Real support/feedback loop.
- Error monitoring.
- Feature flags.
- Rollback procedure.
- Weekly outcome review.
- Explicit automation safety monitoring.

Exit: stable beta with no critical safety/data defects.

## Build 24 — Public launch
Only after Build 23 demonstrates reliability, retention, evidence quality and safe automation behaviour.

## Testing phases

Phase 1 — Static/code audit: TypeScript, lint-equivalent checks, dependency review, route inventory, dead code, unsafe fallbacks, legacy branding and security boundary inspection.

Phase 2 — Component/interaction QA: every input, button, drawer, modal, tab, upload, navigation path, loading state, empty state and error state.

Phase 3 — Data QA: persistence, reload, logout/login, device change, RLS, deletion, duplicate records, failed uploads and recovery.

Phase 4 — Integration QA: ATS sources, Supabase, worker, signed URLs, callbacks, queue claims, cancellation, retries and evidence capture.

Phase 5 — Automation safety QA: Dry Run, Review, Hybrid and Full Auto, entitlement boundaries, unsupported forms, CAPTCHA, sensitive questions, session expiry, cancellation races and verification failures.

Phase 6 — Visual/mobile QA: iPhone Safari/Chrome, desktop Safari/Chrome/Firefox, responsive breakpoints, keyboard/focus, contrast, reduced motion and touch targets.

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
6. Durable Answer Library.
7. Real ATS adapters with fixtures.
8. Immutable application package snapshots.
9. Independent submission verification.
10. Evidence viewer/redaction.
11. Real outcome ingestion.
12. Notifications/follow-ups.
13. Payment/webhook lifecycle.
14. Privacy/deletion guarantees.
15. No seeded data represented as live intelligence.
16. E2E + mobile + accessibility + performance coverage.
17. Monitoring and rollback procedure.
