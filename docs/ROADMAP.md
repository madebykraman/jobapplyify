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
4. Public homepage rebuilt.
5. Auth, persistence, entitlement and automation foundations preserved.

## Phase 13 — Repository-wide functional audit — COMPLETE FOR CORE FLOWS
1. Route/API/component inventory completed.
2. Core visible features traced to implementation.
3. Misleading seeded/live claims corrected.
4. Core auth, profile, documents, resume, opportunities, applications, review, career and automation flows repaired or explicitly bounded.
5. Server authorization and RLS boundaries reviewed in existing schema and new durable application tables.

## Phase 14 — Core product completion — ACTIVE
Core loop: Find → inspect → assess fit → save → prepare → review → track.

Completed in current build:
- Public ATS source ingestion for Greenhouse, Lever and Ashby.
- Deterministic fit analysis and evidence-bound application generation.
- Durable saved-role API and per-user RLS.
- Durable application records with job/package snapshots and status lifecycle.
- Outcome reporting from durable application records.
- Automation queue, dispatch, worker control, safety handoffs and evidence foundation.

Remaining before Phase 14 exit:
- Validate the three ATS adapters against representative live/fixture pages.
- Add independent submission verification that never infers success from a click alone.
- Add durable automation evidence redaction/viewing and recovery tests.
- Finish profile/document/resume persistence edge-case audit.
- Remove remaining internal legacy storage/type identifiers where migration is safe.

## Phase 15 — Intelligence hardening
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
