# Product Build Log

## Phase 12R — NAUKRI LABS rebrand + functional reset — 2026-09-09

The product direction was pivoted away from the UI-first overhaul. NAUKRI LABS is now canonical. The interface is intentionally simple, minimal, light and functional.

### Completed
- Canonical NAUKRI LABS identity and package name.
- Public homepage rebuilt around Find → Prepare → Apply.
- Minimal shared UI foundation.
- Authentication UI simplified; legacy demo Pro bypass removed.
- Pricing and outcome surfaces no longer imply unavailable infrastructure is live.
- Automation UI uses authenticated server entitlement checks and durable queue controls.
- README and roadmap reset to functional-first delivery.

## Phase 13 — Repository-wide functional audit — 2026-09-09

### Completed for core flows
- Audited route/API/component/data paths in the repository.
- Corrected misleading seeded/live claims.
- Reviewed server authorization and existing RLS boundaries.
- Confirmed core profile, documents, resume, opportunities, applications, review, career and automation surfaces have real implementations or explicit limits.
- Removed obsolete dark root styling.

## Phase 14 — Core product completion — ACTIVE — 2026-09-09

### Completed this build
- Added `saved_roles` with per-user RLS and durable job snapshots.
- Added `applications` with per-user RLS, durable job snapshots, package snapshots and status lifecycle.
- Added authenticated `/api/saved-roles` CRUD flow.
- Added authenticated `/api/applications` read/create/status-update flow.
- Updated Opportunities to persist saved roles across authenticated sessions while retaining local fallback.
- Updated Application Studio to persist generated packages and track status.
- Updated Insights to calculate personal outcome counts from durable application records instead of placeholder intelligence.
- Updated feature truth and documentation to distinguish live, partial and unavailable capabilities.
- Example job records are explicitly labelled non-live.

### Remaining functional completion blockers
- Live validation/fixtures for Greenhouse, Lever and Ashby browser adapters.
- Independent post-submission verification; a click must never be treated as proof of submission.
- Evidence redaction/viewer hardening and worker recovery tests.
- Profile/document/resume persistence edge cases and migration cleanup.
- External billing, inbox/interview, community and browser-extension integrations require provider setup and consent flows.

### Verification
CI is running against the current main commits. Do not mark this phase complete until the current code and worker workflows have green install/typecheck/build checks and the remaining safety blockers are explicitly resolved or bounded.

### Build discipline
Before every next build, audit the previous roadmap item, repair incomplete work, update README and BUILD_LOG, run verification, then advance. Functionality outranks aesthetics until release readiness.
