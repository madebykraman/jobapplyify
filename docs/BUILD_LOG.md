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

## Phase 13 — Repository-wide functional audit — 2026-09-09

### Completed for core flows
- Audited route/API/component/data paths in the repository.
- Corrected misleading seeded/live claims.
- Reviewed server authorization and existing RLS boundaries.
- Confirmed core profile, documents, resume, opportunities, applications, review, career and automation surfaces have real implementations or explicit limits.
- Removed obsolete dark root styling.
- Reconciled historical audit findings against the current branch. The previously reported Lever API path bug is not present in the current route implementation.

## Phase 14 — Core product completion — IN PROGRESS — 2026-09-09

### Completed
- Durable saved roles and per-user RLS.
- Durable applications with immutable job/package snapshots and status lifecycle.
- Authenticated saved-role and application APIs.
- Personal outcome counts from durable application records.
- Independent post-submission verification. A click alone cannot produce verified state.
- Removed non-functional manual Verify control.
- Added representative Greenhouse, Lever and Ashby browser fixtures and worker test coverage.
- Added candidate-data redaction before browser evidence is persisted/uploaded.
- Added worker test command to the browser-worker package.
- Added durable expired-lease recovery migration for abandoned running jobs.
- Added worker lease heartbeat so long-running browser tasks renew their ownership.
- Fixed a worker control-plane authentication defect: job-state and heartbeat requests now use the worker token, while callback/evidence requests continue using the callback token.
- Reframed the homepage to explain the complete product loop and capability set.
- Corrected outcome UI copy so missing verification is not presented as a system outage.
- Hardened local-storage parsing and removed the fabricated default personal profile; authenticated product persistence remains the source of truth.
- Polished the public homepage into a fuller product landing page: problem framing, capability overview, product modules, connected workflow, trust rules and final conversion path.

### Verification
- Main CI for the latest worker/control-plane commit passed install, TypeScript typecheck and production build.
- Browser Worker CI passed Chromium installation, worker build and browser fixture tests.
- Homepage styling was updated with responsive mobile layouts and interaction polish; the page remains CSS-only apart from existing icon components.

### Current blockers / next work
- The recovery SQL must be applied to the deployment's actual Supabase project and deployment-level crash/recovery tests must be run.
- Real provider-backed ATS validation remains environment-dependent; fixtures cover deterministic adapter/form contracts.
- Broader platform-specific ATS selectors, account/session flows and human browser handoff need production fixtures.
- Profile/document/resume browser edge cases and authenticated migration of legacy local data need browser validation.
- External billing, inbox/interview, community and browser-extension integrations require provider setup and consent flows.
- Unified evidence viewer, stronger provenance enforcement, accessibility, performance, rate limiting, privacy/deletion, observability and dependency remediation remain release work.

### Build discipline
Before every next build, audit the previous roadmap item, repair incomplete work, update README and `docs/BUILD_LOG.md`, run verification, then advance. Functionality outranks aesthetics until release readiness.
