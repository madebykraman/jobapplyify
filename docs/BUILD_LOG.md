# WAYO Build Log

## Product-wide audit + market expansion — 2026-09-09
ROVA is abandoned as the product brand. The new provisional working brand is **WAYO** — “Your career, in motion.” Brand clearance remains a later legal/domain task.

WAYO is designed around evidence-backed career intelligence, truthful generation, outcome-aware decisions and controlled automation rather than application volume.

## Required product capability matrix
- Freemium monetisation: Free + Pro, usage/automation credits, later add-ons and team/coach plans.
- One-click structured resume builder.
- ATS checker and role-specific ATS readiness.
- LinkedIn/PDF/resume ingestion and analysis.
- Resume upload → evidence extraction → best-fit roles.
- Cover letter generation and role-specific resume generation.
- AI role recommendations + compensation intelligence.
- Any-job-post scanner and intelligence layer.
- Career paths, pivots, transferable skills, salary progression and action plans.
- Salary-target feasibility engine.
- Resume audit / career audit.
- Community-driven data signals with provenance and confidence.
- Profile import from supported sources where technically and legally permitted.
- Exclusive community: coming soon, not represented as live.

## Build 08 — CORE CONTROL CENTER AUDITED — 2026-09-09
Completed at the control-plane layer and re-audited before the visual rebuild.

Completed:
- Durable queue state in Supabase with worker leases, expiry and race-safe claims.
- Worker recovery loop and reclaimable jobs.
- Server-side pause/resume state.
- Persistent cancel/retry transactions with ownership enforced by RLS.
- Worker cancellation check before submission.
- Retry scheduling with bounded backoff and max-attempt enforcement.
- Signed resume URL generation during durable worker claim.
- Private automation evidence object storage and upload lifecycle.
- Callback closes leases and persists worker state, errors, handoffs and evidence references.
- Durable follow-up scheduling and in-app event trail.
- Automation analytics API.
- Responsive automation control surface.

Still deliberately open:
- Real platform-specific browser fixtures/adapters and independent submission verification.
- Evidence viewer/redaction hardening.
- Outbound email/push notifications.
- Full E2E, security, performance and mobile QA.

## Automation access policy — locked direction
- **Dry Run = Free.** User can inspect/prepare the automation flow without submission.
- **Review = Default.** This is the initial operating meter and stops before submission.
- **Full Auto = Pro.** User can switch to Full Auto only with Pro access. It may submit supported applications when safety rules pass.
- CAPTCHAs, unknown forms, sensitive questions and other handoff conditions return control to the user regardless of mode.
- No silent submission. No verified state without independent evidence.

## UI rebuild — 2026-09-09
The previous dark/acid “neo dashboard” implementation was rejected and removed as the primary visual language. WAYO now uses an editorial instrument model rather than dashboard/card repetition.

Current direction:
- Warm paper/ink foundation with a single signal colour and restrained blue signal.
- Strong typographic hierarchy, hard grid lines and asymmetric editorial composition.
- Home is a career command surface: evidence → fit → action → outcome.
- Automation is presented as a control instrument, with Review visibly selected by default and Full Auto clearly marked Pro.
- Motion is used for interaction/state, not decoration; reduced-motion support retained.
- Mobile collapses the editorial grid into a readable linear flow.

The reference principle is product structure first, visual novelty second: the interface should make the career decision visible, not merely decorate a dashboard.

## Access model
- Basic discovery/tools remain usable without account where implemented.
- Pro routes require account-level Pro access.
- Beta invite code `WAYO-BETA` unlocks full Pro access at no charge during beta.
- Test account path exists for product review.
- Pro pricing is positioned at ₹499/month in India with purchasing-power-adjusted international pricing language.
- Credits are reserved as a future layer rather than gating the core beta experience.

## 12-build roadmap
1. Build 01 — Foundation + WAYO brand system.
2. Build 02 — Account, onboarding, persistent career profile and secure documents.
3. Build 03 — Resume Studio.
4. Build 04 — Career Lab.
5. Build 05 — Market Intelligence.
6. Build 06 — Application Studio.
7. Build 07 — Automation Engine.
8. **Build 08 — Control Center: complete at core control-plane layer.**
9. Build 09 — Interview Lab + Outcome Intelligence.
10. Build 10 — Growth + Community.
11. Build 11 — Monetisation + Entitlements.
12. Build 12 — Full QA, Security + Launch.

## Quality rules
A UI is not a completed feature. Completion requires data model, persistence, validation, security boundary, integration, failure handling and verification. No platform is described as live until an actual adapter and representative fixture is tested. No application is described as submitted merely because a form was navigated. No application is verified without independent evidence. AI output must distinguish confirmed evidence, inference and uncertainty. Candidate facts are never silently invented.
