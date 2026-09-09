# KINDLEAP

**Make the next move count.**

KINDLEAP is a career intelligence and application execution workspace built around one idea: make the next career move clearer, then remove repetitive work without removing the candidate from the loop.

> KINDLEAP is the approved internal product identity. Public/domain clearance remains a separate release gate.

## Product loop

`Find → Understand → Prepare → Apply → Interview → Grow`

Operating loop:

`Discover → Qualify → Prepare → Review → Apply → Verify → Track → Learn`

## Product scope

The planned product covers resume/evidence intelligence, explainable job matching, transferable skills, company/referral intelligence, career planning, India-specific compensation context, application preparation, controlled browser automation, interview/outcome intelligence, growth planning, anonymous community intelligence, monetisation and integrations.

The detailed feature audit and implementation status live in [`docs/MASTER_AUDIT.md`](docs/MASTER_AUDIT.md). The human-readable current truth table is [`docs/FEATURE_TRUTH.md`](docs/FEATURE_TRUTH.md). The forward release plan lives in [`docs/ROADMAP.md`](docs/ROADMAP.md).

## Automation

Automation has three operating levels in the current control plane:

- **Dry Run — Free:** inspect and prepare without submission.
- **Review — Default:** prepare and fill verified information, then stop before submission.
- **Full Auto — Pro:** submit supported applications automatically when all safety conditions pass.

Full Auto is not blind mass applying. CAPTCHA, unknown forms, sensitive questions, unsupported flows and other safety boundaries return control to the user. No silent submission. No verified state without independent evidence.

## Product principles

**Clarity over noise.** Surface the next useful decision instead of another dashboard.

**Evidence over invention.** Candidate claims must trace to confirmed information.

**Progress over volume.** Optimise for quality and outcomes, not application counts.

**Automation with control.** Deterministic fields first; ambiguous or sensitive decisions go to human review.

**Career decisions with context.** Explain why a role, skill, company or path matters.

**Privacy with control.** Community intelligence is aggregated, sourced and confidence-labelled; individual identity is not the product.

## Architecture

The Next.js web application is the product/control plane. It owns profile data, documents, resumes, jobs, applications, permissions, review queues and analytics.

A separate Playwright browser worker owns long-running browser sessions and site execution. Platform-specific adapters are not described as live until representative fixtures pass.

Supabase provides production persistence, authentication, RLS and private document/evidence storage. Authentication now uses cookie-backed SSR sessions so server routes and middleware can use the same authoritative identity as the browser.

AI is a semantic layer, not the source of truth. Deterministic extraction, validation and safety rules run before model-assisted interpretation.

## UI system

KINDLEAP is being rebuilt as one dark, spatial career instrument rather than a collection of dashboard themes. The system uses near-black surfaces, warm off-white typography, restrained rules, one signal accent, asymmetric/editorial hierarchy, compact machine-readable metadata and motion only when it communicates state.

The shared workspace shell is now mounted across product routes, with a persistent desktop rail, sticky command bar, active-route state and an iPhone-first bottom navigation pattern. Authentication, onboarding and the public landing remain outside the workspace shell. The shell is a structural foundation; individual route redesigns are still in progress.

Authentication, onboarding, profile, documents, resume, career, opportunities, applications, automation, review, insights, growth, community and pricing must share the same primitives. No legacy light-card theme remains part of the target system. Mobile is a first-class linear flow with accessible controls and reduced-motion support.

## Access and monetisation

The intended beta model is freemium: basic tools where implemented, Pro account access, beta invite unlock and ₹499/month India positioning. International pricing is intended to use purchasing-power-adjusted equivalents. Credits are reserved for a later entitlement layer.

Supabase entitlement infrastructure and authenticated invite activation exist. Build 12A now uses cookie-backed Supabase SSR sessions and server-side entitlement checks for protected routes. Payment processor/webhook lifecycle, billing/tax handling and full server-side enforcement of every feature API remain release gates.

## Build history

Build 01–05 — foundation, job intelligence and career intelligence.

Build 06 — resume ingestion/parsing, persistent saves and job-source hardening.

Build 07 — automation control center and execution modes.

Build 08 — browser-worker foundation, adapter registry and worker CI/safety boundary.

Build 09 — async worker, secure dispatch/callback, durable queue lifecycle, signed resume transfer and host allowlisting.

Build 10 — Interview/Outcome Intelligence, Growth and Community.

Build 11 — monetisation and Supabase entitlements.

Build 12 — product reconciliation, defect audit, security/QA reset and UI-system reset.

## Current status

**Build 12B — active UI system rebuild.**

Build 12A remediation is substantially complete but remains open until dependency/security, RLS/deletion, fixtures, browser/device QA and route/API truth sweep are evidenced.

Completed in the current 12B UI pass: dark-first KINDLEAP foundation and a shared workspace shell with responsive desktop navigation, mobile navigation, active-route states, sticky command surface and consistent workspace framing. This does not yet mean every route has been redesigned.

The latest UI commits are under GitHub Actions verification. The last previously verified green baseline remains recorded in `docs/BUILD_LOG.md`; do not treat the current UI commits as green until their runs finish.

CI still reports 3 dependency vulnerabilities (1 moderate, 2 high); these remain tracked for dependency/security remediation.

Immediate work is Build 12B complete route rebuild → P0/P1 defect sweep → dependency/security → fixtures → RLS/deletion verification → fresh CI → Build 13 Account + Career Memory.

## Quality rule

A UI is not a completed feature. Completion requires the relevant data model, persistence, validation, security boundary, integration, failure handling, audit trail, mobile/accessibility QA and regression coverage. No platform is live until its adapter and representative fixture pass. No application is submitted merely because a form was navigated. No application is verified without independent evidence. Candidate facts are never silently invented.

## Development

Copy `.env.example` and configure environment-specific Supabase and worker variables. Never expose service-role, worker or callback secrets to the client.

Primary deployment target: Vercel.

Browser execution: separate worker/runtime.

See [`docs/BUILD_LOG.md`](docs/BUILD_LOG.md), [`docs/MASTER_AUDIT.md`](docs/MASTER_AUDIT.md), [`docs/FEATURE_TRUTH.md`](docs/FEATURE_TRUTH.md) and [`docs/ROADMAP.md`](docs/ROADMAP.md).
