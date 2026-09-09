# NAUKRI LABS

**A simpler way to find and apply for work.**

NAUKRI LABS is a practical job-search workspace for finding relevant roles, understanding your fit, preparing applications, applying with controlled automation and learning from outcomes.

## Product

The core loop is:

`Find → Understand → Prepare → Review → Apply → Track → Learn`

Instead of sending users between job boards, resume tools and spreadsheets, NAUKRI LABS connects the work into one place.

### What you can use it for

- **Find better roles** — search supported public job sources, inspect roles, compare fit and save opportunities.
- **Understand your fit** — compare a role with your experience, skills, preferences and career direction.
- **Manage evidence** — keep resumes and source documents together so generated application material can stay grounded in what you have actually provided.
- **Prepare applications** — create role-specific application packages, review them and preserve the job/package context.
- **Apply with control** — Dry Run, Review and Full Auto modes with safety handoffs for CAPTCHA, sensitive questions, ambiguity and unsupported forms.
- **Track applications** — maintain durable application records, status and outcome history instead of losing the trail after submission.
- **Plan the next move** — use career goals, growth planning and available outcome signals to improve the next application cycle.

## Truth rules

Advanced intelligence is never represented as live unless backed by real data. Candidate claims must be grounded in saved evidence. CAPTCHA, sensitive questions, unknown forms and unsupported flows require human control. An application is not considered verified without evidence.

## Current implementation status

The codebase now has the Phase 14 core foundations: authenticated persistence for profile/documents/resumes, durable saved roles and applications, immutable application snapshots with controlled status transitions, public Greenhouse/Lever/Ashby ingestion, deterministic application preparation, a durable automation queue and worker, unique leased worker tasks, heartbeat/recovery logic, independent submission verification, redacted private evidence and user-scoped evidence viewing.

The public landing page is the NAUKRI LABS product surface. Only implemented ATS adapters are presented as supported automation platforms. Legacy names remain only where technically required by environment/configuration compatibility; user-visible legacy branding has been removed.

## Phase 14 hard gate

Phase 15 is intentionally locked. Phase 14 cannot be declared complete until the application's actual deployment Supabase project is identified and verified against the application schema, the recovery migration is applied there, deployment-level crash/recovery tests pass, live Greenhouse/Lever/Ashby validation passes, authenticated browser persistence is verified across sessions, automation cancellation/retry/heartbeat/handoff/evidence/stale-worker behavior is verified, final CI is green, and the documentation matches the verified state.

The Supabase project currently available through the connected integration is `minimical-drop`. Its public schema contains unrelated project/file-delivery tables and does not contain the NAUKRI LABS `profiles`, `automation_jobs`, `applications`, `saved_roles` and related application schema. The recovery migration must therefore **not** be applied to that project. This is an environment identity blocker, not a reason to weaken the application schema or safety model.

## Known external validation

- Correct deployment Supabase project/schema mapping and migration application.
- Deployment-level automation crash/recovery tests.
- Live ATS provider validation beyond deterministic fixtures.
- Browser/mobile persistence and authenticated migration of legacy local data.
- Real payment, inbox/interview, community and browser-extension providers.

Release QA items such as accessibility, performance, rate limiting, privacy/deletion, observability and dependency remediation remain post-Phase-14 release work unless they expose a core correctness or safety defect.

## Architecture

Next.js 15 / React 19 / TypeScript. Supabase provides authentication, persistence, RLS and private storage. A separate Playwright worker handles long-running browser execution.

## Verification

Recent main CI failures caused by syntax errors in the persistence hardening pass were diagnosed from the GitHub Actions logs and fixed. The subsequent main CI run for the corrected resume and document changes passed typecheck and production build. A fresh CI run is required on the final Phase 14 gate commit after the remaining audit documentation/code changes settle. Browser Worker CI covers Chromium installation, worker build and browser fixture tests, with direct tests now covering independent verification and evidence redaction.

## Documentation

- [`docs/ROADMAP.md`](docs/ROADMAP.md) — delivery roadmap and Phase 14 hard gate.
- [`docs/BUILD_LOG.md`](docs/BUILD_LOG.md) — chronological build record and audit status.
- [`docs/MASTER_AUDIT.md`](docs/MASTER_AUDIT.md) — historical product audit and findings.
- [`docs/RECONCILIATION_2026-09-09.md`](docs/RECONCILIATION_2026-09-09.md) — current reconciliation after the rebrand/reset.

## Build discipline

Before every next build, audit the previous roadmap item, repair incomplete work, update README and `docs/BUILD_LOG.md`, run verification, then advance. Functionality outranks aesthetics until release readiness.
