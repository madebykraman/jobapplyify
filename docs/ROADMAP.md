# NAUKRI LABS Product Roadmap — 2026-09-09

This roadmap supersedes the previous UI-first overhaul. The immediate objective is a working, coherent product with a simple, minimal interface. Visual rebranding can be refined after functional validation.

## Brand direction

**NAUKRI LABS**

Tagline: **A simpler way to find and apply for work.**

Descriptor: **Job search, applications and career tools in one place.**

Brand principles: clarity over noise; evidence over invention; control over automation; progress over volume; useful by default.

Visual direction: clean, minimal, light-first, generous whitespace, restrained typography, simple controls, clear hierarchy and explicit functional states.

## Reset rule

The previous KINDLEAP dark/editorial UI overhaul is stopped. Existing functionality is retained and repaired. Do not spend build time inventing a new visual language. Prefer native/simple components and shared functional primitives.

## Phase 12R — Rebrand + functional reset — COMPLETE
1. Canonical NAUKRI LABS identity established.
2. Legacy user-facing branding removed from completed surfaces.
3. Minimal light functional UI foundation established.
4. Public homepage rebuilt and polished as a product landing page.
5. Auth, persistence, entitlement and automation foundations preserved.

## Phase 13 — Repository-wide functional audit — COMPLETE FOR CORE FLOWS
1. Route/API/component inventory completed.
2. Core visible features traced to implementation.
3. Misleading seeded/live claims corrected.
4. Core auth, profile, documents, resume, opportunities, applications, review, career and automation flows repaired or explicitly bounded.
5. Server authorization and RLS boundaries reviewed in existing schema and new durable application tables.

## Phase 14 — Core product completion — HARD GATE / ACTIVE
Core loop: Find → inspect → assess fit → save → prepare → review → track.

Completed in code:
- Public ATS source ingestion for Greenhouse, Lever and Ashby.
- Deterministic fit analysis and evidence-bound application generation.
- Durable saved-role API and per-user RLS.
- Durable application records with immutable job/package snapshots and controlled status transitions.
- Outcome reporting from durable application records.
- Automation queue, dispatch, worker control, safety handoffs and evidence foundation.
- Independent submission verification that requires strong confirmation signals rather than a click alone.
- Redacted browser evidence upload plus authenticated, user-scoped signed evidence viewing.
- Durable expired-lease recovery and worker lease heartbeat code.
- Unique worker task identities bound to durable claims to prevent stale-worker callback races.
- Profile, document and resume cloud loading so authenticated sessions do not depend on local browser state for the current source of truth.
- Representative ATS browser fixtures and direct tests for adapter behavior, independent verification and evidence redaction.
- Polished NAUKRI LABS public landing page.

Phase 14 exit gate — do not start Phase 15 until every item below is verified:
1. The application's actual deployed Supabase project is identified and contains schema.sql, build11_entitlements.sql, build12_functional_completion.sql and build13_recovery.sql, including RLS, private storage and recovery functions.
2. Deployment-level crash/recovery testing proves an expired running lease is reclaimed and a replacement worker can safely continue it.
3. Live Greenhouse, Lever and Ashby validation is completed against real public provider pages; fixtures remain regression coverage.
4. Profile, document and resume persistence is browser-tested across refresh, sign-out/sign-in and a second session, with safe handling of legacy local records.
5. Automation cancellation, retry, heartbeat, handoff, evidence upload/viewing and stale-worker rejection are browser-tested against the deployed control plane.
6. No remaining user-visible legacy branding or misleading live/verified claims remain.
7. Main CI and Browser Worker CI are green on the final Phase 14 commit.
8. README and BUILD_LOG accurately describe the verified state and remaining external prerequisites.

Current external blocker: the Supabase connection available to this build is project `minimical-drop`, whose public schema contains unrelated `projects`, `drive_accounts`, `folders`, `uploads` and `audit_events` tables and does not contain the NAUKRI LABS application tables. Therefore the recovery migration must not be applied to that project. The correct deployment Supabase project must be connected before Phase 14 can be declared complete.

## Phase 15 — Intelligence hardening — LOCKED
Do not begin until the Phase 14 exit gate is fully green.
- Structured resume parsing.
- Evidence provenance.
- Durable Answer Library.
- Explainable job matching.
- Freshness and duplicate detection.
- Salary/CTC, notice, remote and sponsorship context.
- Company exclusions and hard deal-breakers.
- Application quality scoring.

## Phase 16 — Application + automation production
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
Before every build: audit the previous roadmap item, repair incomplete work, update README and BUILD_LOG, run verification, then advance. Never mark a feature complete when its external dependency or safety validation is missing. Functionality outranks aesthetics.
