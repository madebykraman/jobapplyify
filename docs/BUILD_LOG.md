# ROVA Build Log

## v0.1
- Brand and product foundation established.
- Product shell, navigation, control model and visual direction established.

## v0.2 audit
- Dashboard interaction shell existed and was retained.
- Navigation, search, automation pause/resume, pipeline and review gate were present.
- Production runtime verification remained pending because the build environment could not reach GitHub dependencies.
- Account, persistence and document functionality were not implemented; this was carried forward as a gap rather than treated as complete.

## v0.3
- Repaired the `@/*` TypeScript path alias that caused the Vercel module-resolution failure.
- Added Supabase-ready authentication, profile, database and private-storage foundation with RLS schema.
- Added local-first profile and document persistence so the product remains usable before external credentials are configured.
- Added account sign-in/create-account surface with explicit demo-mode boundary.
- Added onboarding and editable candidate profile.
- Added private Supabase document upload when configured.
- Added resume import for PDF, DOCX, TXT and Markdown.
- Added deterministic resume parsing/normalisation and ATS/fit analysis.
- Added target-role comparison, matched/missing terms, section detection and structural warnings.
- Added persisted resume versions and an editable resume builder with live preview and browser PDF printing.
- Connected dashboard navigation to opportunities, applications, review queue, documents and insights routes.
- Added responsive styling for all new surfaces.

## v0.4 — Career Intelligence
- Audited v0.3 before advancing; no code-level blocker was identified.
- Added deterministic career assessment, role-fit ranking, matched/missing skills, salary-target assessment, gap plan and career-path strategies.
- Added dedicated Career Intelligence workspace.
- Salary bands remain planning heuristics until live market data is connected.

## v0.5 — Job Intelligence
- Audited v0.4 before advancing.
- Added normalized job schema, Greenhouse/Lever/Ashby public ATS adapters, server-side allowlisting, search/filtering, fit scoring, provenance, saved roles and job intelligence UI.
- Core discovery works without paid aggregators for supported public feeds.

## v0.6 — Application Preparation
- Audited v0.5 and remediated individual URL scanning, persistence, canonical duplicate keys and company/project/career relevance gaps before advancing.
- Added deterministic role-specific resume variants, ATS readiness, cover letters, application answers, missing-evidence warnings and no-invention guardrail.
- Connected Job Intelligence directly to Application Preparation.
- CI debugging fixed onboarding array typing, PDF parser typing, canonical job key typing and compensation formatting.
- GitHub CI passed on the final v0.6 implementation commit.

## v0.7 — Automation Engine
- Audited v0.6 before advancing.
- Added explicit automation state machine, dry-run/review/full-auto modes, safety handoffs, adapter contracts, retry limits, local queue and Automation Engine control center.
- Browser execution remains outside the Vercel request lifecycle.

## v0.8 — Browser Worker Foundation
- Audited v0.7 before advancing.
- Added isolated Node/Playwright worker, typed task/result contracts, persistent browser contexts, deterministic form primitives, CAPTCHA/sensitive/unknown-form guards, evidence capture and worker CI.
- Fixed root TypeScript isolation so worker sources compile only in worker CI.

## v0.9 — Worker Integration Boundary
- Audited v0.8 before advancing.
- Added authenticated worker HTTP boundary, `/health`, asynchronous `/tasks` dispatch, task status endpoint, request limits and Vercel dispatch bridge.
- Added account-scoped task/session contracts and execution locking by account + origin.
- Added explicit HTTPS and metadata validation.
- Control plane never receives or stores platform passwords.
- v0.9 CI verification is pending the latest post-hardening run.

## v0.9 audit → integration hardening
- Audited the v0.9 implementation before treating the worker boundary as complete.
- Confirmed the worker must not use a synchronous HTTP request for a long browser job; task submission now returns `202` and execution proceeds independently.
- Confirmed task status needs a queryable lifecycle rather than only a final response; the worker exposes task status while execution is in progress.
- Confirmed concurrent browser work must not reuse the same platform account/session; execution is serialized per account and application origin.
- Confirmed unauthenticated worker operation is unsafe; `/tasks` and task-status reads require the configured bearer token.
- Confirmed worker task input needs protocol, mode, metadata and account-key validation before execution.
- Added worker job lifecycle primitives as the foundation for the next durable queue implementation.

### Current boundary
- The worker queue is intentionally process-local and therefore not yet production-durable.
- Resume transfer from Vercel/object storage to the worker is not yet production-complete; local `resumePath` remains a worker-runtime concern.
- Platform-specific form adapters are still contracts plus generic primitives, not a claim of live support for every listed platform.
- Independent submission verification, durable event history and persistent analytics remain required before Build 08/production automation is considered complete.

### Rule
Before each subsequent build, audit the previous build against the approved roadmap, remediate gaps first, then advance.
