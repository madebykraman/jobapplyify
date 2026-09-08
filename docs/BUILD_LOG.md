# WAYO Build Log

## Product-wide audit + market expansion — 2026-09-09
ROVA is abandoned as the product brand. The new provisional working brand is **WAYO** — “Your career, in motion.” Brand clearance is intentionally not treated as complete until later legal/domain research.

The product was re-audited against the original proposal plus current 2026 competitor/community patterns. Current market products increasingly combine job discovery, matching, tailored resumes, cover letters, application tracking, interview preparation, browser autofill/agents, referral intelligence and persistent career context. Community feedback repeatedly values accurate autofill, role-specific tailoring, useful tracking and truthful answers; it also flags fabricated application answers, bloated resumes and low-quality mass applying as major failure modes. WAYO therefore differentiates on evidence-backed career intelligence, truthful generation, outcome-aware decisions and controlled automation rather than application volume.

### Required product capability matrix

Core capabilities from the original brief:
- Freemium monetisation: Free + Pro, usage/automation credits, later add-ons and team/coach plans.
- One-click structured resume builder.
- ATS checker and role-specific ATS readiness.
- LinkedIn/PDF/resume ingestion and analysis.
- Resume upload → evidence extraction → best-fit roles.
- Cover letter generation.
- Role-specific resume generation.
- AI role recommendations + compensation intelligence.
- Any-job-post scanner and intelligence layer.
- Career paths, pivots, transferable skills, salary progression and action plans.
- Salary-target feasibility engine: “Can I reach ₹12 LPA?” → current fit, gaps, required work, timeline and next actions.
- Resume audit / career audit.
- Community-driven data signals from public internet/forums, with provenance and confidence.
- One-click profile import from LinkedIn and other supported sources where technically and legally permitted.
- Exclusive community: coming soon, not represented as live until built.

Market-demand additions now part of the roadmap:
1. Job match score with explainable evidence, not just keywords.
2. Transferable-skills mapper for career switching.
3. Company intelligence: team, product, funding/news, hiring velocity, role context and risk signals.
4. Referral intelligence: identify relevant connections/referral paths where lawful and data is public/consented.
5. Interview Lab: role-specific questions, answer coaching, mock interviews, readiness tracking.
6. Follow-up assistant: reminders and recruiter follow-up drafts based on application age/status.
7. Application email intelligence: classify interview/rejection/next-step signals and update pipeline with consented mailbox integration.
8. Job-post freshness/duplicate detection and repost detection.
9. Salary negotiation intelligence: target, floor, market range and negotiation preparation.
10. Offer comparison: compensation, location, growth, stability and career-option value.
11. Notice-period / CTC / expected-CTC intelligence for India-specific workflows.
12. Visa/sponsorship/work-authorization filters and evidence where applicable.
13. Remote/hybrid/on-site preference intelligence.
14. Skills-to-project planner: recommend projects that close specific target-role gaps.
15. Learning roadmap: courses/resources mapped to actual skill gaps, with cost/time tradeoffs.
16. Portfolio/project audit and portfolio-to-role fit.
17. LinkedIn/profile audit and rewrite.
18. Personal career memory: goals, evidence, applications, outcomes and decisions persist as a living career record.
19. Career health dashboard: search quality, application conversion, interview rate, skill progress and response trends.
20. Community intelligence: anonymized, aggregated market patterns; no private user data sold or exposed.
21. Chrome/browser extension: capture any job page and open the relevant WAYO workflow in context.
22. Application autofill agent with deterministic fields first and AI only for ambiguity.
23. Human review queue and permission gates for sensitive/unknown/CAPTCHA flows.
24. Evidence vault: preserve the exact resume/job/application version used for each action.
25. AI truth lock: generated claims must trace to confirmed user evidence; unsupported claims require explicit user confirmation.
26. Application quality score: prioritize fewer high-fit applications over blind volume.
27. Rejection learning loop: use outcomes to improve future recommendations without silently changing facts.
28. Community-sourced salary/job intelligence with source/date/confidence labels.
29. Career pivot simulator: compare “stay / upskill / switch / freelance / further study” paths.
30. Goal planner: target role + salary + deadline → weekly action plan and progress.

## Build audit before advancing

Previous work was rechecked before moving forward. The durable automation layer was not marked complete because the browser worker still has process-local execution state, real platform adapters are not yet implemented, evidence is not yet in durable object storage, and independent submission verification is not complete.

Build 08 therefore remains active. The latest remediation hardens the control-plane boundary rather than pretending those downstream gates are solved.

### Build 08 remediation shipped — 2026-09-09
- Automation dispatch now requires an authenticated user and a durable `jobId`.
- Dispatch verifies job ownership through Supabase RLS before contacting the worker.
- Dispatch rejects URL or mode mismatches between the durable job and worker task.
- Successful dispatch records the worker task ID and running state in the durable job record.
- A durable `automation_events` record is written for dispatch.
- Worker dispatch remains HTTPS-only in production.
- App metadata now uses WAYO as the canonical product-facing name.
- README rewritten around the WAYO product, architecture, roadmap, safety model and current implementation status.

### Still blocked before Build 08 completion
- Worker queue state must survive process restart.
- Retry/claim/lease semantics must be durable and race-safe.
- Resume signed URL must be wired end-to-end from the application UI into the worker task.
- Real platform-specific adapters and fixtures must be implemented and tested.
- Evidence must move from worker-local filesystem to secure object storage with retention/redaction.
- Independent submission verification must exist before any `verified` state can be claimed.
- Queue pause/cancel/retry controls must persist server-side.
- Notifications and automation analytics remain incomplete.

## Competitor/community audit synthesis
Current competitive patterns observed across Jobright, Simplify, Teal, Huntr, Jobscan, Careerflow, AIApply/AIApplyd, JobCopilot, LoopCV, Kairo/X-style products and community discussions:
- Jobright: broad matching, tailoring, cover letters, referrals and automation.
- Simplify: strong autofill/browser workflow and broad job-site compatibility.
- Teal/Huntr: strong tracking, resume workflows and organization.
- Jobscan: deep ATS/keyword checking.
- Careerflow: LinkedIn/profile and career workflow.
- AIApply/JobCopilot/LoopCV: application automation and volume.
- Newer products increasingly add interview preparation, email tracking, browser extensions, persistent career memory and agent permissions.
- India-native competitors emphasize Naukri, CTC, notice period, Indian portals and INR pricing.
- Community feedback highlights autofill accuracy, truthful answers, resume length control and actual fit analysis as important quality signals.
- Current market trend: the differentiator is shifting from “more applications” to “better decisions + connected workflow + controlled agents.”

## Brand transformation
WAYO replaces ROVA across product-facing UI. The design direction is intentionally cleaner and more consumer-grade:
- Name: WAYO (provisional).
- Tagline: Your career, in motion.
- Product descriptor: Career intelligence and application automation.
- Tone: direct, calm, intelligent, useful, never hype-heavy.
- Product model: one connected career system rather than a collection of tools.
- Primary mental model: Find → Understand → Prepare → Apply → Interview → Grow.
- Core promise: make the next career move clearer and the repetitive work lighter.

## 12-build roadmap

1. Build 01 — Foundation + WAYO brand system.
2. Build 02 — Account, onboarding, persistent career profile and secure documents.
3. Build 03 — Resume Studio: ingestion, builder, audit, ATS, versions, PDF/DOCX export.
4. Build 04 — Career Lab: fit, paths, pivots, salary targets, gaps, skill/project/learning plans.
5. Build 05 — Market: job search, job URL scanner, company intelligence, salary, community signals, deduplication.
6. Build 06 — Application Studio: tailored resume, cover letter, answers, truth lock, evidence packet.
7. Build 07 — Automation Engine: browser worker, adapters, permissions, human handoff.
8. Build 08 — Control Center: durable queue, application pipeline, evidence vault, analytics, notifications, follow-ups.
9. Build 09 — Interview Lab + Outcome Intelligence: interview prep, email classification, rejection learning, offer comparison, negotiation.
10. Build 10 — Growth + Community: LinkedIn/browser integrations, community intelligence, referral layer, learning/project marketplace signals.
11. Build 11 — Monetisation: Free/Pro entitlements, credits, billing, trials, add-ons, team/coach plans.
12. Build 12 — Full QA + Security + Launch: E2E, browser fixtures, adapter testing, privacy, security, performance, mobile, backups, monitoring, legal, onboarding, production launch.

## Quality rules

A UI is not a completed feature. Completion requires the corresponding data model, persistence, validation, security boundary, integration, failure handling and verification path.

No platform is described as “live” until an actual adapter and representative fixture have been tested.

No application is described as “submitted” merely because a form was navigated. No application is described as “verified” without independent evidence.

AI output must distinguish confirmed evidence, inference and uncertainty. Candidate facts are never silently invented.

The user remains the authority for consequential career decisions and sensitive application answers.
