# WAYO Build Log

## Product-wide audit + market expansion — 2026-09-09
ROVA is abandoned as the product brand. The new provisional working brand is **WAYO** — “Your career, in motion.” Brand clearance remains a later legal/domain task.

WAYO is designed around evidence-backed career intelligence, truthful generation, outcome-aware decisions and controlled automation rather than application volume. Market/design research was also reviewed against current product-design patterns: Opensource UI emphasises cohesive reusable components and readable production code; Exalt Studio emphasises diagnose → clarify/design → systemise → ship; Recent emphasises curated quality over quantity. citeturn0search0turn0search1turn0search9

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

## Build 08 — COMPLETED CORE CONTROL CENTER — 2026-09-09
The Build 08 completion pass shipped the durable control-plane foundation rather than leaving the browser worker as the source of truth.

Completed:
- Durable queue state in Supabase with worker leases, expiry and race-safe `FOR UPDATE SKIP LOCKED` claims.
- Worker recovery loop: a restarted worker polls the control plane and can reclaim eligible jobs instead of losing queue state in process memory.
- Server-side pause/resume state; paused accounts are excluded from worker claims.
- Persistent cancel/retry transactions with ownership enforced by Supabase RLS.
- Worker checks persisted cancellation before form submission.
- Retry scheduling with bounded backoff and max-attempt enforcement.
- Signed resume URL generation during durable worker claim from the user's latest stored resume source document.
- Private `automation-evidence` object storage and worker-to-control-plane evidence upload lifecycle.
- Callback closes leases and persists worker state, errors, handoff reasons and evidence references.
- Durable follow-up scheduling (48-hour default) and in-app event trail for queue actions.
- Automation analytics API for total jobs, state distribution, attempted/completed jobs, completion ratio and pending follow-ups.
- New WAYO automation control surface with permission modes, queue state, handoffs, recovery actions, adapter map, responsive layout and reduced-motion support.
- New WAYO editorial/neo visual language is now the primary product direction; the old dashboard is no longer the product entry point.

Build 08 is considered complete at the control-center layer. Platform-specific browser fixtures/adapters and independent submission verification remain explicit quality gates and are not falsely marked as complete here.

## Design direction — implemented in parallel
The visual redesign follows a deliberate product-system approach: clarify the information hierarchy, establish reusable interaction patterns, then ship them in code. WAYO uses an editorial SaaS language: oversized type, restrained mono metadata, hard grid lines, acid action colour, deliberate asymmetry, motion on hierarchy rather than decoration, responsive mobile layouts and `prefers-reduced-motion` handling. The new home replaces the old dashboard experience rather than maintaining two competing product shells.

## Access model + UI transformation
- Basic discovery remains usable without account.
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
8. **Build 08 — Control Center: complete.**
9. Build 09 — Interview Lab + Outcome Intelligence.
10. Build 10 — Growth + Community.
11. Build 11 — Monetisation + Entitlements.
12. Build 12 — Full QA, Security + Launch.

## Quality gates still deliberately open
- Real platform-specific adapters and representative fixtures must be implemented and tested before any platform is described as live.
- Independent submission verification must exist before any `verified` state can be claimed.
- Evidence retention/redaction policy and user-facing signed evidence viewer need final production hardening.
- Notifications can currently be represented through durable in-app events; outbound email/push delivery remains a later integration.
- Full E2E, security, performance and mobile QA remain Build 12 gates.

## Quality rules
A UI is not a completed feature. Completion requires data model, persistence, validation, security boundary, integration, failure handling and verification. No platform is described as live until an actual adapter and representative fixture is tested. No application is described as submitted merely because a form was navigated. No application is verified without independent evidence. AI output must distinguish confirmed evidence, inference and uncertainty. Candidate facts are never silently invented.
