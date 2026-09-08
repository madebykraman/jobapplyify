# ROVA

**Career automation, with judgment.**

ROVA is the working brand for `jobapplyify`: a career-automation workspace designed to move a job search from discovery to application without turning the candidate into a passenger.

## v0.1 product brief

ROVA should feel like a command center, not an ATS, spreadsheet, browser bot, or generic AI dashboard.

The product promise is simple: **find the right roles, prepare the right application, automate the repetitive work, and keep the candidate in control of consequential decisions.**

Core loop:

`Discover → Qualify → Prepare → Review → Apply → Verify → Track → Learn`

v0.1 is intentionally a high-fidelity product shell. The interface establishes the product language, information architecture, control model, application pipeline, review gate, and automation status before the browser execution layer is connected.

## Brand system

**Name:** ROVA

**Working meaning:** Role Orchestration + Virtual Assistant. The meaning is internal positioning, not a consumer-facing acronym.

**Descriptor:** Career automation, with judgment.

**Positioning:** The intelligent operating layer between a candidate and the modern job application stack.

**Personality:** precise, calm, capable, transparent, quietly technical.

**Avoid:** hype, robot language, fake certainty, "apply to 1,000 jobs" positioning, childish AI tropes, neon cyberpunk aesthetics, generic purple gradients, dashboard clutter.

**Voice:** short sentences, concrete verbs, evidence over adjectives. Say what happened, what is happening, what needs approval, and why.

**Naming rule:** ROVA is always written uppercase in the product brand lockup. Feature names use sentence case.

## Visual guidelines

Typography: Manrope for product/UI, DM Mono for metadata, statuses and system labels.

Palette:
- Ink `#171717`
- Dark `#1B1B19`
- Canvas `#F4F2ED`
- Panel `#FBFAF7`
- Line `#D8D5CD`
- Muted `#77746D`
- Signal `#D8FF52`
- Review `#DFE8FF`

The signal green is an operational state colour, not decoration. It means active, ready, or approved. Red should be reserved for real risk/failure states when the execution layer is implemented.

UI principles:
1. One primary action per surface.
2. Explain automation state instead of hiding it.
3. Every automated decision needs a reason or evidence trail.
4. Human review is a product feature, not an error state.
5. Dense information is acceptable when hierarchy is strong.
6. Motion should communicate state changes, not decorate the interface.
7. Every destructive or consequential action needs an explicit boundary.
8. Never fabricate confidence.

## v0.1 parameters

Target: responsive web SaaS.

Primary runtime: Next.js App Router.

Deployment target: Vercel for the product surface; browser execution remains a separate worker/runtime concern.

Current state: static high-fidelity shell with client-side demo interactions only.

No real authentication, database, AI calls, browser automation, external credentials, job scraping, or application submission are enabled in v0.1.

Primary navigation:
- Command
- Opportunities
- Applications
- Review queue
- Documents
- Insights

Primary dashboard questions:
- What is happening?
- What deserves attention?
- What needs my approval?
- What changed?
- What is the next best action?

Application states:
`Saved → Preparing → Review → Applied → Interview → Offer → Closed`

Automation modes planned:
- Review only
- Assisted
- Full automation where explicitly permitted

Hard product guardrails planned:
- Never invent candidate facts.
- Never answer high-risk screening questions from guesswork.
- Never treat navigation success as submission success.
- Never submit when verification confidence is insufficient.
- Persist application state across runs.
- Preserve an auditable event history.
- Pause for CAPTCHA, unknown forms, unsupported flows, and sensitive decisions.

## Implementation direction

The eventual system separates the product/control plane from browser execution. The web application owns profile, preferences, job records, application state, review queues, documents, permissions and analytics. A dedicated execution layer owns Playwright/browser sessions and site-specific adapters.

AI is a semantic layer, not the source of truth. Deterministic extraction and validation happen before model-assisted interpretation. Browser adapters are isolated per platform so site changes do not destabilize the entire engine.

This repository intentionally contains no copied implementation from third-party projects. Public projects informed the product requirements and architectural direction only.

## Status

**v0.1 — brand + product shell complete.**

Next build stage: connect the shell to persistent application data, authentication, profile/document ingestion, and a controlled execution queue without compromising the review and verification model.
