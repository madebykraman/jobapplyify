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
- Resume preparation and evidence-bound application package generation.
- Public Greenhouse, Lever and Ashby source parsing.
- Durable saved-role records with per-user RLS.
- Durable application records with immutable job/package snapshots and status tracking.
- Outcome reporting from the user's durable application records.
- Durable automation queue, dispatch, callbacks, evidence and recovery foundation.
- Dry Run / Review / Full Auto policy model with safety handoffs.
- Minimal NAUKRI LABS homepage and shared authenticated UI.

## Truth rules

Advanced intelligence is never represented as live unless backed by real data. Candidate claims must be grounded in saved evidence. CAPTCHA, sensitive questions, unknown forms and unsupported flows require human control. An application is not considered verified without evidence.

## Current release blockers

Production browser submission verification still requires live validation of each ATS adapter and representative fixtures. Payment checkout/lifecycle, live inbox/interview integrations, anonymous community aggregation and browser extension integrations require their external providers and consent flows. Accessibility, mobile E2E, performance, rate limiting, privacy/deletion hardening and dependency remediation remain release QA work.

## Roadmap

The active roadmap is [`docs/ROADMAP.md`](docs/ROADMAP.md).

Current phase: **Phase 14 — Core product completion / functional hardening**.

The current build sequence is durable job saving → durable application snapshots/status → outcome reporting → automation verification → release QA. No new visual overhaul is planned before functional validation.

## Architecture

Next.js 15 / React 19 / TypeScript. Supabase provides authentication, persistence, RLS and private storage. A separate Playwright worker handles long-running browser execution.

## Verification

GitHub Actions runs install, TypeScript typecheck and production build on pushes. Verification is recorded in `docs/BUILD_LOG.md`; a green run is required before advancing a build.

## Build discipline

Before every next build, audit the previous roadmap item, repair incomplete work, update README and `docs/BUILD_LOG.md`, run verification, then advance. Functionality outranks aesthetics until release readiness.

See [`docs/BUILD_LOG.md`](docs/BUILD_LOG.md), [`docs/MASTER_AUDIT.md`](docs/MASTER_AUDIT.md), [`docs/FEATURE_TRUTH.md`](docs/FEATURE_TRUTH.md) and [`docs/ROADMAP.md`](docs/ROADMAP.md).
