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

The core control plane, authentication, durable saved roles/applications, application preparation, public ATS ingestion, automation queue/worker foundation, evidence redaction and representative ATS fixtures are implemented. Worker leases have durable recovery and heartbeat support.

Local browser storage is treated as a compatibility fallback, not the source of truth for authenticated product records. New sessions no longer receive a fabricated default personal profile.

Production validation still depends on the actual deployed worker, external providers and browser/device QA. Provider-dependent features are not represented as live without those dependencies.

## Known release work

- Apply the recovery migration to the deployment's actual Supabase project and run deployment-level crash/recovery tests.
- Live Greenhouse/Lever/Ashby validation and broader ATS coverage.
- Profile/document/resume browser edge cases and authenticated migration of legacy local data where appropriate.
- Payment checkout and subscription lifecycle.
- Live inbox/interview integrations, community contribution pipeline and browser extension.
- Unified evidence viewer and stronger claim/provenance enforcement.
- Accessibility, performance, rate limiting, privacy/deletion hardening, observability and dependency remediation.

## Architecture

Next.js 15 / React 19 / TypeScript. Supabase provides authentication, persistence, RLS and private storage. A separate Playwright worker handles long-running browser execution.

## Verification

Latest control-plane CI: install, TypeScript typecheck and production build passed. Latest Browser Worker CI: Chromium installation, worker TypeScript build and browser fixture tests passed.

## Documentation

- [`docs/ROADMAP.md`](docs/ROADMAP.md) — delivery roadmap.
- [`docs/BUILD_LOG.md`](docs/BUILD_LOG.md) — chronological build record.
- [`docs/MASTER_AUDIT.md`](docs/MASTER_AUDIT.md) — historical product audit and findings.
- [`docs/RECONCILIATION_2026-09-09.md`](docs/RECONCILIATION_2026-09-09.md) — current reconciliation after the rebrand/reset.

## Build discipline

Before every next build, audit the previous roadmap item, repair incomplete work, update README and `docs/BUILD_LOG.md`, run verification, then advance. Functionality outranks aesthetics until release readiness.
