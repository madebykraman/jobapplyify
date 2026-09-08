# ROVA

**Career automation, with judgment.**

ROVA is the working brand for `jobapplyify`: a career-automation workspace designed to move a job search from discovery to application without turning the candidate into a passenger.

## Product promise

**Find the right roles, prepare the right application, automate the repetitive work, and keep the candidate in control of consequential decisions.**

Core loop:

`Discover → Qualify → Prepare → Review → Apply → Verify → Track → Learn`

## v0.3 — current build

The current build adds the foundation required for resume intelligence:

- Supabase-ready authentication, profile, database and private storage with RLS.
- Local-first fallback so the product remains usable before external setup.
- Candidate onboarding and editable profile.
- PDF, DOCX, TXT and Markdown resume ingestion.
- Deterministic resume normalisation and ATS/fit analysis.
- Target-role comparison, matched/missing terms, section detection and structural checks.
- Persisted resume versions.
- Editable resume builder with live preview and browser print/save-to-PDF.
- Connected product routes for opportunities, applications, review queue, documents and insights.
- Responsive product styling.

## Brand system

**Working brand:** ROVA

**Descriptor:** Career automation, with judgment.

**Positioning:** The intelligent operating layer between a candidate and the modern job application stack.

**Personality:** precise, calm, capable, transparent, quietly technical.

**Avoid:** hype, robot language, fake certainty, "apply to 1,000 jobs" positioning, childish AI tropes, neon cyberpunk aesthetics, generic purple gradients, dashboard clutter.

Typography: Manrope for product/UI, DM Mono for metadata and system labels.

Palette: Ink `#171717`, Dark `#1B1B19`, Canvas `#F4F2ED`, Panel `#FBFAF7`, Line `#D8D5CD`, Muted `#77746D`, Signal `#D8FF52`, Review `#DFE8FF`.

## Architecture direction

The product/control plane remains separate from browser execution. The web application owns profile, preferences, job records, application state, review queues, documents, permissions and analytics. A dedicated execution layer will own Playwright/browser sessions and site-specific adapters.

AI is a semantic layer, not the source of truth. Deterministic extraction and validation happen before model-assisted interpretation. Platform adapters remain isolated so site changes do not destabilise the entire engine.

The repository contains no copied implementation from third-party projects. Public projects informed requirements and architectural direction only.

## Deployment

Primary product target: Vercel. Browser execution will use a separate worker/runtime rather than long-running Vercel request lifecycles.

Supabase is optional until production persistence is activated. Copy `.env.example`, create a Supabase project, run `supabase/schema.sql`, then add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the deployment environment.

## Guardrails

- Never invent candidate facts.
- Never answer high-risk screening questions from guesswork.
- Never treat navigation success as submission success.
- Never submit when verification confidence is insufficient.
- Persist application state across runs.
- Preserve an auditable event history.
- Pause for CAPTCHA, unknown forms, unsupported flows and sensitive decisions.

## Status

**v0.3 — implementation complete; cloud build verification pending Vercel project connection.**

Next approved stage: **v0.4 — Career Intelligence.**

See `docs/BUILD_LOG.md` for the build-by-build audit record.
