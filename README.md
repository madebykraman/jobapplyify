# NAUKRI LABS

**A simpler way to find and apply for work.**

NAUKRI LABS is a practical job-search workspace for finding relevant roles, preparing applications, tracking progress and using automation without losing control.

## Direction

The previous UI overhaul is stopped. The product is being built functional-first with a simple, minimal, light interface: clean typography, whitespace, restrained controls and explicit states.

## Product loop

`Find → Prepare → Apply → Track → Learn`

## What is implemented

- Authenticated Supabase sessions.
- Server-side entitlement reads and Pro gating.
- Profile persistence with local fallback.
- Private document upload/delete flow.
- Resume preparation and application package generation.
- Job-source parsing for supported sources.
- Application records and review workflow.
- Durable automation queue, dispatch, callbacks, evidence and recovery foundation.
- Dry Run / Review / Hybrid / Full Auto policy model.
- Minimal NAUKRI LABS homepage and shared authenticated UI.

## Truth rules

Advanced intelligence is never represented as live unless backed by real data. Candidate claims must be grounded in saved evidence. CAPTCHA, sensitive questions, unknown forms and unsupported flows require human control. An application is not considered verified without evidence.

## Current limitations

Production ATS adapters and fixtures, independent submission verification, real outcome/inbox ingestion, payment lifecycle, browser extension, full community aggregation, privacy/deletion hardening and complete browser/mobile/accessibility/performance coverage remain open release work. Dependency vulnerabilities also require remediation.

## Roadmap

The active roadmap is [`docs/ROADMAP.md`](docs/ROADMAP.md).

Current phase: **Phase 13 — Functional completion**.

The immediate sequence is repository-wide route/API audit, legacy cleanup, integration of existing functions, durable data verification, automation hardening, seeded-data removal, then release QA. Another branding pass happens only after functional validation.

## Architecture

Next.js 15 / React 19 / TypeScript. Supabase provides authentication, persistence, RLS and private storage. A separate Playwright worker handles long-running browser execution.

## Verification

GitHub Actions runs install, TypeScript typecheck and production build on pushes. The latest verified run before documentation-only changes passed all three stages.

## Build discipline

Before every next build, audit the previous roadmap item, repair incomplete work, update README and `docs/BUILD_LOG.md`, run verification, then advance. Functionality outranks aesthetics until release readiness.

See [`docs/BUILD_LOG.md`](docs/BUILD_LOG.md), [`docs/MASTER_AUDIT.md`](docs/MASTER_AUDIT.md), [`docs/FEATURE_TRUTH.md`](docs/FEATURE_TRUTH.md) and [`docs/ROADMAP.md`](docs/ROADMAP.md).
