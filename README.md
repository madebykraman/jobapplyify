# NAUKRI LABS

**Your job assistant.**

**Give it the job. Let it handle the work.**

NAUKRI LABS is a job assistant, not a job board. The user brings a job, application, recruiter message, document or career problem. NAUKRI LABS helps understand it, assess the user's position, create useful application material and handle repetitive application work with human control.

## Product

The core loop is:

`Give context → Understand → Assess → Improve → Create → Review → Act`

The product does not compete with LinkedIn, Naukri or other platforms on job discovery. Job URLs and job descriptions are inputs to the assistant, not a marketplace to browse.

### What you can use it for

- **Understand a job** — turn a supplied job link or description into clear responsibilities, requirements, constraints and application needs.
- **Check your chances** — compare the opportunity with your career information and surface strengths, gaps and unknowns. Fit is guidance, not an invented certainty score.
- **Improve your position** — identify useful skills, certifications, courses, projects, portfolio evidence or positioning changes using candidate context and clearly labelled public/community signals.
- **Build applications** — create role-specific resumes, CVs, cover letters, introductions, application answers and supporting material from reusable candidate information.
- **Convert existing information** — use a LinkedIn PDF, resume and career documents as reusable source material. One basic resume template is always free; additional template selection/customisation is a Pro boundary.
- **Do repetitive work** — prepare and execute supported browser application flows instead of making the user manually repeat the same steps.
- **Keep control** — Dry Run, Review, Hybrid and eligible Full Auto modes, with human handoff for CAPTCHA, sensitive information, ambiguity and unsupported flows.
- **Know what happened** — preserve useful application history and redacted execution evidence without forcing the product into a heavyweight ATS.

## Product surfaces

- **Assistant** — the primary front door for jobs, applications, documents and career problems.
- **Career workspace** — reusable profile, experience, skills, projects, preferences, goals and evidence.
- **Resume / Documents** — LinkedIn PDF conversion, resume creation and reusable career material.
- **Applications** — job-specific application packages and review.
- **Automation** — controlled browser execution for supported ATS flows.
- **Review** — human approval and handoff for consequential actions.
- **History** — lightweight record of what NAUKRI LABS prepared and actually did.

There is no job marketplace in the product strategy. Existing supported ATS ingestion is retained only so the assistant can understand a user-provided opportunity.

## Truth rules

Candidate claims must be grounded in information the candidate provides. Public and community information may be used for directional guidance, but approximate signals are never presented as certainty. Automation is visible, controllable and interruptible. CAPTCHA, sensitive questions, unknown forms and unsupported flows require human control. An application is not considered verified without evidence.

## Current implementation

The repository already contains substantial reusable infrastructure: authentication, cloud profile/document/resume persistence, durable applications, application preparation, supported public ATS ingestion, automation queue/worker execution, Greenhouse/Lever/Ashby representative adapters, human safety handoffs, lease/heartbeat/recovery logic, independent submission verification and redacted user-scoped evidence.

The current pivot adds the assistant-first product surface and changes the public product language away from job discovery. Existing infrastructure is being retained where it supports the assistant and demoted or removed where it exists only to make NAUKRI LABS look like a job marketplace.

## Monetisation direction

Free should remain genuinely useful. The baseline LinkedIn PDF → resume workflow and one usable resume template remain free forever. Pro is intended for meaningful convenience and customisation, including additional resume template selection/customisation and higher-value automation capabilities where actually implemented. Payment lifecycle remains a later integration step.

## Architecture

Next.js / React / TypeScript. Supabase is intended for authentication, persistence, RLS and private storage. A separate Playwright worker handles long-running browser execution.

## Verification status

The pivot code has been committed to `main`, including the assistant-first homepage, `/assistant` intake surface and revised product roadmap. Final CI must be run on the settled pivot head before the pivot is considered implementation-complete.

Supabase deployment setup remains intentionally paused until the new product architecture is stable. Do not apply NAUKRI LABS migrations to the unrelated `minimical-drop` Supabase project.

## Documentation

- [`docs/ROADMAP.md`](docs/ROADMAP.md) — current Job Assistant roadmap.
- [`docs/BUILD_LOG.md`](docs/BUILD_LOG.md) — chronological build and audit record.
- [`docs/MASTER_AUDIT.md`](docs/MASTER_AUDIT.md) — historical product audit.
- [`docs/RECONCILIATION_2026-09-09.md`](docs/RECONCILIATION_2026-09-09.md) — previous rebrand/reset reconciliation.

## Build discipline

Before every build, audit the previous roadmap item, repair incomplete work, update README and `docs/BUILD_LOG.md`, run verification, then advance. Functionality outranks aesthetics. Never mark an external dependency or safety validation complete without actually verifying it.
