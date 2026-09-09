# NAUKRI LABS

**A simpler way to find and apply for work.**

NAUKRI LABS is a practical job-search workspace for finding relevant roles, preparing applications, tracking progress and using automation without losing control.

## Current direction

The previous KINDLEAP dark/editorial UI overhaul has been stopped. The product is now being rebuilt functional-first with a simple, minimal interface: clean typography, generous whitespace, restrained controls and clear states.

Brand: **NAUKRI LABS**

Descriptor: **Job search, applications and career tools in one place.**

The current brand is intentionally simple and may receive one final identity pass after functional beta testing.

## Product loop

`Find → Prepare → Apply → Track → Learn`

## Functional priorities

1. Working job discovery and source parsing.
2. Profile, documents and resume workflows.
3. Application preparation and review.
4. Controlled automation with explicit safety boundaries.
5. Durable application tracking and outcomes.
6. Career planning and supporting tools.
7. Real data before decorative intelligence.

## Automation

- **Dry Run:** prepare and inspect without submission.
- **Review:** fill verified information and stop for human approval.
- **Hybrid:** automate only within explicit policy boundaries; otherwise request approval.
- **Full Auto:** reserved for supported flows when all safety and entitlement conditions pass.

CAPTCHA, sensitive questions, unknown forms, unsupported flows, verification failures and session problems return control to the user. No silent submission. No verified state without evidence.

## Architecture

Next.js 15 / React 19 / TypeScript powers the web application. Supabase provides authentication, persistence, RLS and private storage. A separate Playwright worker handles long-running browser execution.

AI is not the source of truth. Candidate claims must be grounded in known evidence or explicitly labelled inference.

## Roadmap

The active roadmap is in [`docs/ROADMAP.md`](docs/ROADMAP.md).

Current phase: **Phase 12R — Rebrand + functional reset.**

Next: **Phase 13 — repository-wide functional audit**, followed by core product completion, intelligence hardening, production automation, outcomes, monetisation/integrations and release QA.

## Status

The repository contains substantial implemented infrastructure, including authenticated sessions, server-side entitlement checks, document persistence, job-source parsing, application preparation and a browser-worker foundation. Several advanced areas remain partial or mocked and must not be presented as live until verified.

Known release work includes real ATS fixtures/adapters, independent submission verification, outcome ingestion, payment lifecycle, privacy/deletion QA, dependency/security remediation, E2E/mobile/accessibility/performance testing and removal of remaining legacy UI architecture.

## Build discipline

Every build begins by auditing the previous roadmap item. Incomplete work is repaired before advancing. README and `docs/BUILD_LOG.md` are updated continuously. Code, data, security, integration and failure handling take priority over visual polish.

Primary deployment target: Vercel. Browser execution uses the separate worker/runtime.

See [`docs/BUILD_LOG.md`](docs/BUILD_LOG.md), [`docs/MASTER_AUDIT.md`](docs/MASTER_AUDIT.md), [`docs/FEATURE_TRUTH.md`](docs/FEATURE_TRUTH.md) and [`docs/ROADMAP.md`](docs/ROADMAP.md).
