# Product Build Log

## Phase 12R — NAUKRI LABS rebrand + functional reset — 2026-09-09

The product direction was pivoted away from the UI-first overhaul. NAUKRI LABS is now canonical. The interface is intentionally simple, minimal, light and functional.

### Completed
- Canonical NAUKRI LABS identity and package name.
- Public homepage rebuilt around the product rather than a standalone marketing hero.
- Minimal shared UI foundation.
- Authentication UI simplified; legacy demo Pro bypass removed.
- Pricing and outcome surfaces no longer imply unavailable infrastructure is live.
- Automation UI uses authenticated server entitlement checks and durable queue controls.
- README and roadmap reset to functional-first delivery.

## Phase 13 — Repository-wide functional audit — COMPLETE FOR CORE FLOWS

### Completed
- Audited route/API/component/data paths in the repository.
- Corrected misleading seeded/live claims.
- Reviewed server authorization and existing RLS boundaries.
- Confirmed core profile, documents, resume, opportunities, applications, review, career and automation surfaces have real implementations or explicit limits.
- Removed obsolete dark root styling.
- Reconciled historical audit findings against the current branch. The previously reported Lever API path bug is not present in the current route implementation.

## Phase 14 — Core product completion — HARD GATE / IN PROGRESS — 2026-09-09

### Completed in code
- Durable saved roles and per-user RLS.
- Durable applications with immutable job/package snapshots and controlled status transitions. Duplicate saves now return the existing immutable record instead of replacing snapshots.
- Authenticated saved-role and application APIs.
- Personal outcome counts from durable application records.
- Independent post-submission verification. A click alone cannot produce verified state.
- Added direct worker tests for positive and negative verification signals.
- Removed non-functional manual Verify control.
- Added representative Greenhouse, Lever and Ashby browser fixtures and worker test coverage.
- Added candidate-data redaction before browser evidence is persisted/uploaded and direct redaction tests.
- Added authenticated user-scoped signed evidence viewing.
- Added durable expired-lease recovery migration for abandoned running jobs.
- Added worker lease heartbeat so long-running browser tasks renew their ownership.
- Bound durable claims to unique worker task identities and clear those identities when a lease is reclaimed, preventing stale-worker callback races.
- Fixed worker control-plane authentication: job-state and heartbeat requests use the worker token, while callback/evidence requests use the callback token.
- Repaired candidate sourcing for automation: authenticated profile data is read from Supabase rather than relying on stale local profile state.
- Repaired profile, document and resume cloud loading so authenticated sessions can restore current records after refresh/new sessions.
- Exposed only implemented ATS adapters in the automation UI; unsupported platforms are no longer presented as ready.
- Corrected the automation submission-policy helper so post-submission verification is treated as a verification gate rather than incorrectly disabling Full Auto submission.
- Removed remaining user-visible legacy service/user-agent branding discovered during audit.
- Reframed and polished the NAUKRI LABS homepage with problem framing, capability overview, product modules, connected workflow, trust rules and final conversion path.

### Verification and discovered defects
- A persistence hardening pass initially introduced TypeScript syntax errors in documents/resume pages. GitHub Actions caught them; both were corrected.
- The subsequent control-plane CI run for the corrected persistence pass passed typecheck and production build.
- A fresh final-gate CI run is still required after the last audit commits settle.
- Browser Worker CI includes Chromium installation, worker build and fixture tests; direct independent-verification and evidence-redaction tests are now part of the worker test suite.
- Supabase security advisors were inspected on the only currently connected project. That project is `minimical-drop` and is unrelated to the NAUKRI LABS application schema; its findings concern its own project/file-delivery tables and were not modified.

### Phase 14 hard blockers
1. The correct deployment Supabase project is not currently available through the connected Supabase integration. The connected `minimical-drop` project does not contain the NAUKRI LABS application tables. Do not apply `build13_recovery.sql` there.
2. Deployment-level crash/recovery tests therefore cannot yet be truthfully run.
3. Live Greenhouse/Lever/Ashby validation against the actual deployed environment still requires the deployment and provider/network path.
4. Browser persistence testing across real refresh/sign-out/sign-in/second-session and authenticated migration of legacy local records still needs to be performed against the deployed app.
5. Automation cancellation/retry/heartbeat/handoff/evidence/stale-worker behavior needs deployed control-plane testing.

### Explicit scope boundary
Billing, inbox/interview, community contribution, browser extension, broader ATS coverage, provenance/Answer Library, accessibility, performance, rate limiting, privacy/deletion, observability and dependency remediation are not being pulled into Phase 14 merely to make the checklist look complete. They remain later-phase/release work unless testing reveals a core Phase 14 correctness or safety defect.

### Phase 15 status
**LOCKED.** No Phase 15 work starts until every Phase 14 hard gate in `docs/ROADMAP.md` is verified green.

### Build discipline
Before every next build, audit the previous roadmap item, repair incomplete work, update README and `docs/BUILD_LOG.md`, run verification, then advance. Functionality outranks aesthetics until release readiness.
