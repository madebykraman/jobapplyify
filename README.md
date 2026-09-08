# KINDLEAP

**Make the next move count.**

KINDLEAP is a career intelligence and application execution workspace built around one idea: make the next career move clearer, then remove repetitive work without removing the candidate from the loop.

> Internal product name. Public/domain/brand clearance is not yet complete.

## Product loop

`Find → Understand → Prepare → Apply → Interview → Grow`

Operating loop:

`Discover → Qualify → Prepare → Review → Apply → Verify → Track → Learn`

## What it is building

- Resume ingestion, structured resume building and versioning.
- ATS/readiness analysis and role-specific resume intelligence.
- Resume and career audits.
- Resume → best-fit role recommendations.
- Explainable job-fit scoring and transferable-skills mapping.
- Job-post URL scanning and normalized job intelligence.
- Salary, seniority, work-mode and career-relevance analysis.
- Career paths, pivots, skill gaps and target-salary planning.
- India-specific CTC, notice-period and expected-CTC intelligence.
- Role-specific resumes, cover letters and application answers.
- Evidence-backed generation with an AI truth lock.
- Application tracking and durable automation orchestration.
- Controlled browser automation with human handoff.
- Interview Lab, follow-up intelligence and outcome learning.
- Company, referral, salary and community intelligence with provenance.

## Automation

Automation has three operating levels:

- **Dry Run — Free:** inspect and prepare the flow without submission.
- **Review — Default:** prepare and fill verified information, then stop before submission.
- **Full Auto — Pro:** submit supported applications automatically when all safety conditions pass.

Full Auto is the chosen primary automation direction. It is not blind mass applying. CAPTCHA, unknown forms, sensitive questions, unsupported flows and other safety boundaries return control to the user.

No silent submission. No verified state without independent evidence.

## Product principles

**Clarity over noise.** Surface the next useful decision instead of another dashboard.

**Evidence over invention.** Candidate claims must trace to confirmed information.

**Progress over volume.** Optimise for quality and outcomes, not application counts.

**Automation with control.** Deterministic fields first; ambiguous or sensitive decisions go to human review.

**Career decisions with context.** Explain why a role, skill, company or path matters.

## Architecture

The Next.js web application is the product/control plane. It owns profile data, documents, resumes, jobs, applications, permissions, review queues and analytics.

A separate Playwright browser worker owns long-running browser sessions and site execution. Platform-specific adapters remain a quality gate and are not described as live until tested with representative fixtures.

Supabase provides production persistence, authentication, RLS and private document/evidence storage. Local-first storage remains available for development.

AI is a semantic layer, not the source of truth. Deterministic extraction, validation and safety rules run before model-assisted interpretation.

## UI direction

KINDLEAP is moving away from the generic dashboard pattern toward a career operating system: editorial hierarchy, decision surfaces, evidence-first layouts, contextual navigation and automation represented as a control instrument rather than a settings page.

The visual system is intentionally structured around `evidence → fit → action → outcome`. Responsive and reduced-motion behaviour are required parts of the system.

## Access and monetisation

The current beta model is freemium:

- Basic tools remain usable without an account where implemented.
- Pro routes require account-level Pro access.
- Beta invite code: `WAYO-BETA`.
- During beta, an accepted invite unlocks the complete Pro workspace.
- India Pro positioning: **₹499/month**.
- International pricing is intended to use purchasing-power-adjusted equivalents.
- Credits are reserved as a later entitlement layer rather than gating the beta core.

Billing and production entitlement enforcement remain later build gates.

## Build roadmap

1. Foundation + brand system
2. Account, onboarding, career profile + secure documents
3. Resume Studio
4. Career Lab
5. Market Intelligence
6. Application Studio
7. Automation Engine
8. Durable Control Center + Analytics
9. **Interview Lab + Outcome Intelligence — current**
10. Growth + Community
11. Monetisation + Entitlements
12. Full QA, Security + Launch

Every build is audited against the previous build before advancing. A feature is not complete merely because its UI exists; completion requires the relevant data model, persistence, validation, security, integration, failure handling and verification gates.

## Current status

**Active development — Build 09.**

Build 08 core control-plane work is complete and audited: durable queue state, worker recovery/reclaim, persistent pause/cancel/retry, signed resume transfer, private automation evidence storage, callback state handling, follow-ups and analytics are implemented.

Build 09 adds the Interview Lab and Outcome Intelligence product surface, including application/reply/interview/offer signal modelling, next-best-action concepts, interview preparation and evidence-aware outcome analysis.

Explicit quality gates still open: real platform-specific browser fixtures/adapters, independent submission verification, evidence viewer/redaction hardening, outbound notifications, production billing/entitlements, broader integrations and full E2E/security/performance/mobile QA.

## Development

Copy `.env.example` and configure the environment-specific Supabase and worker variables. Never expose service-role, worker or callback secrets to the client.

Primary deployment target: Vercel.

Browser execution: separate worker/runtime.

See [`docs/BUILD_LOG.md`](docs/BUILD_LOG.md) for the audited implementation history and roadmap log.
