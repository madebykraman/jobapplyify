# NAUKRI LABS Product Roadmap — 2026-09-09

This roadmap supersedes the previous UI-first overhaul. The immediate objective is a working, coherent product with a simple, minimal interface. Visual rebranding can be refined after functional validation.

## Brand direction

**NAUKRI LABS**

Tagline: **A simpler way to find and apply for work.**

Descriptor: **Job search, applications and career tools in one place.**

Brand principles: clarity over noise; evidence over invention; control over automation; progress over volume; useful by default.

Visual direction for this phase: clean, minimal, light-first, generous whitespace, restrained typography, simple controls, clear hierarchy, functional states. No elaborate editorial system, gradients, decorative instrumentation or visual experimentation until the product works end to end.

## Reset rule

The previous KINDLEAP dark/editorial UI overhaul is stopped. Existing functionality is retained and repaired. Do not spend build time inventing a new visual language. Prefer native/simple components and shared functional primitives.

## Phase 12R — Rebrand + functional reset
1. Rebrand all user-visible product surfaces to NAUKRI LABS.
2. Remove ROVA/KINDLEAP/WAYO legacy user-facing copy while retaining only technically required compatibility identifiers until safely migrated.
3. Replace the previous dark/editorial UI direction with a simple minimal functional system.
4. Establish one lightweight global UI foundation for typography, spacing, buttons, forms, lists, panels, status and responsive behaviour.
5. Keep public homepage simple and conversion-focused.
6. Preserve existing authentication, persistence, entitlement and automation logic.

## Phase 13 — Repository-wide functional audit
1. Inventory every route, API route, component, utility, worker and data path.
2. Trace each visible feature to its actual implementation.
3. Classify every feature as working, partial, mock/seeded or unavailable.
4. Remove dead UI and fake controls.
5. Repair broken TypeScript, imports, state transitions and API contracts.
6. Verify loading, empty, error, success and destructive states.
7. Verify persistence across refresh and authentication boundaries.
8. Verify server-side authorization and RLS boundaries.

Exit: no known broken core route or misleading completed-looking control.

## Phase 14 — Core product completion
Prioritise working product flows over visual polish:

Find jobs → inspect job → assess fit → save role → prepare application → review artifacts → track application.

Profile → documents → resume → evidence → tailored application.

Automation → mode selection → queue → worker execution → evidence → verification → cancellation/recovery.

Career → goals/planning → actionable next steps.

Interview/review/insights/growth/community should either work from durable data or clearly identify unavailable functionality; seeded data must never masquerade as live intelligence.

## Phase 15 — Intelligence hardening
- Structured resume parsing.
- Evidence provenance.
- Evidence-bound generation.
- Durable Answer Library.
- Explainable job matching.
- Freshness and duplicate detection.
- Salary/CTC, notice, remote and sponsorship context.
- Company exclusions and hard deal-breakers.
- Application quality scoring.

## Phase 16 — Application + automation production
- Durable application records.
- Immutable application package snapshots.
- Exact submitted-artifact review.
- Greenhouse/Lever/Ashby adapters with representative fixtures.
- Deterministic form filling.
- Dry Run / Review / Hybrid / Full Auto.
- Human handoff for CAPTCHA, sensitive or unknown flows.
- Independent submission verification.
- Retry/cancel/lease recovery.
- Follow-ups and notification hooks.
- Campaign abstraction.

## Phase 17 — Outcomes + career loop
- Real interview sessions.
- Inbox/reply ingestion where consented.
- Outcome classification.
- Rejection learning.
- Offer comparison and negotiation support.
- Durable goals and growth planning.
- Real outcome-based career health.
- Privacy-safe community intelligence.

## Phase 18 — Monetisation + integrations
- Authoritative Pro enforcement.
- Payment provider and checkout.
- Webhooks and subscription lifecycle.
- Billing/invoices and India tax handling.
- International pricing.
- Browser extension.
- Email/calendar integrations with explicit consent.
- Secure OAuth/token lifecycle.

## Phase 19 — Release QA
- Unit/API tests.
- Browser E2E.
- Mobile/iPhone E2E.
- Accessibility.
- Performance/Web Vitals.
- Security/RLS/authorization.
- Rate limiting and abuse controls.
- Worker recovery.
- Evidence redaction.
- Privacy/deletion.
- Observability and rollback.

## Phase 20 — Beta → launch
Private beta first. Measure reliability, task completion, application quality, automation safety and user outcomes. Only then decide whether the current NAUKRI LABS identity is final or requires another branding pass.

## Build discipline
Before every next build: audit the previous roadmap item, repair incomplete work, update README and BUILD_LOG, run verification, then advance. Functionality outranks aesthetics until release readiness.
