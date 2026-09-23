# NAUKRI LABS

**Your job assistant.**

**Give it the job. Let it handle the work.**

NAUKRI LABS is a job assistant, not a job board. The user brings a job, application, recruiter message, document or career problem. NAUKRI LABS helps understand it, assess the user's position, improve weak areas, create useful application material and handle repetitive application work with human control.

## Product

The core loop is:

Give context → Understand → Assess → Improve → Create → Review → Act

The product does not compete with LinkedIn, Naukri or other platforms on job discovery. Job URLs and job descriptions are inputs to the assistant, not a marketplace to browse.

### What you can use it for

- Understand a job — turn a supplied job link or description into clear responsibilities, requirements, constraints and application needs.
- Check your chances — compare the opportunity with your career information and surface strengths, gaps and unknowns. Fit is guidance, not an invented certainty score.
- Improve your position — identify useful skills, certifications, courses, projects, portfolio evidence or positioning changes using candidate context and clearly labelled public/community signals.
- Build applications — create role-specific resumes, CVs, cover letters, introductions, application answers and supporting material from reusable candidate information.
- Convert existing information — use a LinkedIn PDF, resume and career documents as reusable source material. One basic resume template is always free; additional template selection/customisation is a Pro boundary.
- Do repetitive work — prepare and execute supported browser application flows instead of making the user manually repeat the same steps.
- Keep control — Dry Run, Review, Hybrid and eligible Full Auto modes, with human handoff for CAPTCHA, sensitive information, ambiguity and unsupported flows.
- Know what happened — preserve useful application history and redacted execution evidence without forcing the product into a heavyweight ATS.

## Research foundation

The product direction is informed by direct competitor teardown, open-source operating repositories, community demand/failure reports and UX/conversion research.

See docs/PRODUCT_RESEARCH_2026-09-24.md for the living research baseline.

Key lessons: persistent candidate context should power downstream work; browser-context assistance matters; deterministic autofill should precede AI interpretation where possible; ATS-specific adapters should be separated from generic form handling; AI generation must be evidence-bound; human review is a product feature; first value should be useful work completed; optimise for work removed and quality rather than application volume; community failures should feed product decisions; competitor marketing claims are not automatically facts.

## Product surfaces

- Assistant — primary front door for jobs, applications, documents and career problems.
- Career workspace — reusable profile, experience, skills, projects, preferences, goals and evidence.
- Resume / Documents — LinkedIn PDF conversion, resume creation and reusable career material.
- Applications — job-specific application packages and review.
- Automation — controlled browser execution for supported ATS flows.
- Review — human approval and handoff for consequential actions.
- History — lightweight record of what NAUKRI LABS prepared and actually did.

There is no job marketplace in the product strategy. Existing supported ATS ingestion is retained only so the assistant can understand a user-provided opportunity.

## Design standard

Design is part of the product. NAUKRI LABS aims for a simple product with unusually strong UX and premium execution: immediate comprehension, low interaction cost, strong typography and spacing, restrained visual language, excellent empty/loading/error/success states, visible system status, no decorative dashboards or meaningless metrics, no unnecessary form-heavy onboarding, strong mobile behaviour, subtle motion only when it improves understanding, and premium detail without visual noise.

The primary conversion is first useful work completed, not merely account creation.

## Truth rules

Candidate claims must be grounded in information the candidate provides. Public and community information may be used for directional guidance, but approximate signals are never presented as certainty. Automation is visible, controllable and interruptible. CAPTCHA, sensitive questions, unknown forms and unsupported flows require human control. An application is not considered verified without evidence.

## Monetisation direction

Free should remain genuinely useful. The baseline LinkedIn PDF → resume workflow and one usable resume template remain free forever. Pro is intended for meaningful customisation and leverage, including additional resume template selection/customisation and higher-value automation capabilities where actually implemented. Payment lifecycle remains a later integration step.

## Current implementation

The repository contains reusable authentication, cloud profile/document/resume persistence, durable applications, application preparation, supported public ATS ingestion, automation queue/worker execution, Greenhouse/Lever/Ashby representative adapters, human safety handoffs, lease/heartbeat/recovery logic, independent submission verification and redacted user-scoped evidence.

The current pivot adds the assistant-first surface, removes job discovery from the product positioning, demotes the old opportunities page to a provided-input utility, and gives the assistant an immediate structured heuristic assessment for supplied jobs. Existing infrastructure is retained where it supports the assistant and demoted or removed where it only makes NAUKRI LABS look like a job marketplace.

## Architecture

Next.js / React / TypeScript. Supabase is intended for authentication, persistence, RLS and private storage. A separate Playwright worker handles long-running browser execution.

## Verification status

The assistant-first homepage, /assistant intake surface, product roadmap and research baseline are committed to main. Final repository migration, assistant-to-durable-application wiring and final CI/browser verification remain open.

Supabase deployment setup remains intentionally paused until the product architecture is stable. Do not apply NAUKRI LABS migrations to the unrelated minimical-drop Supabase project.

## Documentation

- docs/ROADMAP.md — current Job Assistant roadmap.
- docs/PRODUCT_RESEARCH_2026-09-24.md — competitor, open-source, community, UX and conversion intelligence.
- docs/BUILD_LOG.md — chronological build and audit record.
- docs/MASTER_AUDIT.md — historical product audit.
- docs/RECONCILIATION_2026-09-09.md — previous rebrand/reset reconciliation.

## Build discipline

Before every build, audit the previous roadmap item and relevant research, repair incomplete work, update README and docs/BUILD_LOG.md, run verification, then advance. Functionality, evidence, user value and UX quality outrank implementation count.
