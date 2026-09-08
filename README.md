# WAYO

**Your career, in motion.**

WAYO is a career intelligence and application automation workspace built around one idea: make the next career move clearer, then remove the repetitive work without removing the candidate from the loop.

## Product loop

`Find → Understand → Prepare → Apply → Interview → Grow`

The deeper operating loop is:

`Discover → Qualify → Prepare → Review → Apply → Verify → Track → Learn`

## What WAYO is building

WAYO combines career intelligence, resume intelligence, job intelligence, application preparation and controlled automation in one system.

Core capabilities include:

- Resume ingestion, structured resume building and versioning.
- ATS/readiness analysis with role-specific evidence.
- Resume audit and career audit.
- Resume → best-fit role recommendations.
- Explainable job-fit scoring and transferable-skills mapping.
- Job-post URL scanning and normalized job intelligence.
- Salary, work-mode, seniority and career-relevance analysis.
- Career paths, pivots, skill gaps and target-salary planning.
- “Can I reach ₹X LPA?” feasibility analysis with an action plan.
- Role-specific resumes, cover letters and application answers.
- Evidence-backed generation with an AI truth lock: unsupported candidate claims are never silently invented.
- Application tracking and durable automation orchestration.
- Browser-worker architecture for controlled autofill and human handoff.
- Interview preparation, follow-up intelligence and outcome learning as the product expands.
- Company, referral, salary and community intelligence with source/date/confidence metadata.
- India-specific career workflows including CTC, notice period and expected-CTC context.

## Product principles

**Clarity over noise.** Surface the next useful decision instead of adding another dashboard.

**Evidence over invention.** Candidate claims must trace back to confirmed information.

**Progress over volume.** Optimise for application quality and outcomes, not meaningless application counts.

**Automation with control.** Deterministic fields first; ambiguous, sensitive or unsupported flows go to human review.

**Career decisions with context.** Recommendations should explain why a role, skill, company or path matters.

## Current architecture

The web application is the product/control plane. It owns profile data, documents, resumes, job records, application state, permissions, review queues and analytics.

A separate browser worker owns Playwright sessions and site-specific execution. This keeps long-running browser work outside Vercel request lifecycles and allows platform adapters to evolve independently.

Supabase provides the production persistence layer, authentication, RLS and private document storage. A local-first fallback remains available for development.

AI is a semantic layer, not the source of truth. Deterministic extraction, validation and safety rules run before model-assisted interpretation.

## UI system

WAYO now uses a unified product UI rather than page-by-page styling. The current visual system uses a warm neutral canvas, dark command navigation, high-contrast lime signal accents, restrained borders, rounded product surfaces and stronger information hierarchy. The dashboard, Career Lab, Job Intelligence and Application Studio share the same component language and responsive behaviour.

The interface is deliberately closer to a focused career operating system than a generic AI dashboard: fewer decorative elements, clearer decision surfaces, stronger primary actions and denser evidence presentation.

## Automation safety

- Never invent candidate facts.
- Never answer sensitive screening questions from guesswork.
- Never treat navigation success as submission success.
- Never claim verified submission without independent evidence.
- Never silently submit an unsupported or ambiguous form.
- Pause for CAPTCHA, unknown forms, sensitive decisions and unsupported flows.
- Preserve an auditable automation event history.
- Keep browser execution separated from the product control plane.

## Brand

**Name:** WAYO (provisional working brand)

**Tagline:** Your career, in motion.

**Descriptor:** Career intelligence and application automation.

The brand is intentionally calm, precise and useful. WAYO avoids hype, fake certainty, “apply to 1,000 jobs” positioning, generic AI tropes and dashboard clutter. Brand/legal/domain clearance is not treated as complete yet.

## Monetisation direction

The planned model is freemium:

- **Free:** core career profile, limited resume intelligence, job intelligence and tracked applications.
- **Pro:** deeper intelligence, higher usage limits, advanced preparation, automation credits and expanded career planning.
- **Later:** credit packs, add-ons, team/coach plans and premium integrations.

Pricing and entitlements are currently product UI only; billing enforcement is a later build gate.

## Deployment

Primary product target: Vercel.

Browser execution: separate worker/runtime.

Supabase: required for durable production persistence and authenticated automation control.

For local development, copy `.env.example` and configure the Supabase and worker variables appropriate to the environment. Never expose service-role or worker secrets to the client.

## Build roadmap

The project is being built in audited stages:

1. Foundation + WAYO brand system
2. Account, onboarding, persistent career profile and secure documents
3. Resume Studio
4. Career Lab
5. Job Market Intelligence
6. Application Studio
7. Automation Engine
8. Durable Control Center + Analytics
9. Interview Lab + Outcome Intelligence
10. Growth + Community
11. Monetisation + Entitlements
12. Full QA, Security + Launch

Each build is gated by the previous build’s audit. A feature is not marked complete merely because its UI exists; production claims require the corresponding persistence, security, integration and verification gates.

See [`docs/BUILD_LOG.md`](docs/BUILD_LOG.md) for the detailed implementation and audit record.

## Status

**Active development — Build 08 / durable automation remediation + product UI transformation.**

Recent work includes the WAYO brand transformation, unified UI system, durable automation job persistence, authenticated worker dispatch, callback control-plane integration, private resume transfer, safety gates and the dedicated browser-worker foundation.

Known downstream gates remain: real platform adapters, durable worker recovery, secure evidence storage/retention, independent submission verification, production billing/entitlements, broader market integrations and full QA/security hardening.
