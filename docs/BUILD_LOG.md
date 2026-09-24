# Product Build Log

## 2026-09-24 — Research-backed NAUKRI LABS Job Assistant reset

### Decision

The product is a Job Assistant / Naukri Copilot, not a job-search platform.

Core promise: Give it the job. Let it handle the work.

Core loop: Give context → Understand → Assess → Improve → Create → Review → Act

The user brings the opportunity, application, recruiter message, document or career problem.

### Research completed

Added docs/PRODUCT_RESEARCH_2026-09-24.md covering competitor teardown, open-source operating implementations, community demand and failure reports, UX/conversion principles, privacy/local-first patterns and automation/ATS implementation patterns.

Research references include Jobright, Simplify, Teal, Huntr/Jobscan, ApplyAI, JobAutoFillAI, AutoApply, JobSync, CareerDesk, CareerOps and additional open-source repositories identified for continued audit.

### Research conclusions

1. The strongest opportunity is not another job marketplace.
2. Persistent candidate context is a major product primitive.
3. Autofill and browser-context execution solve real repetitive work.
4. Deterministic form handling should precede AI interpretation where possible.
5. AI must not invent candidate facts.
6. Users repeatedly complain about generic AI rewriting, manual tailoring time and unreliable autofill.
7. Application volume should not be the core success metric.
8. The first conversion should be useful work completed.
9. Human review and clear automation states are trust features.
10. Design quality is part of product value and conversion, not a later visual pass.

### Product/design requirements

The product must be simple, fast to understand, low-friction, visually restrained but premium, excellent in state design, strong on mobile and explicit about what the system is doing. It should be designed around first useful work rather than account creation.

### Monetisation boundary

- LinkedIn PDF → one usable resume template: free forever.
- Basic resume creation/editing/export: free baseline.
- Additional template selection/customisation: Pro.
- Higher-value automation/convenience: Pro where actually implemented.
- Do not paywall basic candidate dignity.

### Repository changes completed

- Added research baseline.
- Rewrote roadmap around the research-backed Job Assistant model.
- Updated README with research, design and conversion requirements.
- Preserved existing automation/application infrastructure.
- Existing assistant-first homepage and /assistant intake remain the product front door. The assistant now produces an immediate structured heuristic assessment for supplied jobs, with explicit fit/gap uncertainty language and direct next actions.
- Demoted /opportunities from a discovery surface to a provided-opportunity input utility.
- Removed job-discovery language from pricing and changed the Free/Pro boundary to match the product direction.

### Route audit status

KEEP:
- Assistant.
- Workspace.
- Profile.
- Documents.
- Resume.
- Applications.
- Automation.
- Review.

ADAPT:
- Career → career improvement/intelligence.
- Opportunities → provided-input utility only.
- Insights → lightweight history.
- Growth → secondary planning.

DEMOTE:
- Community.
- Growth.
- Insights/history.

REMOVE FROM PRIMARY POSITIONING:
- Job search.
- Job marketplace.
- Live vacancy inventory.
- Application-volume optimisation.

### 2026-09-24 — Assistant context handoff + career reset\n\nAudited Phase 2 against the roadmap and research baseline. The assistant already accepted job URLs/descriptions and produced a first assessment, but the application action previously lost that context when navigating away. The build now saves the supplied job to the existing preparation handoff, builds the application pack immediately, and persists the application context through the authenticated applications API when a session exists. The application studio remains available for unauthenticated local continuation.\n\nThe Career surface was also audited against the assistant-first thesis. Role-discovery and score-led presentation were removed from the primary surface; it now focuses on visible evidence, useful gaps, possible development paths and clearly labelled salary planning heuristics.\n\n### 2026-09-24 — Repository copy/UX audit\n\nRemoved remaining primary application-studio dependency on Opportunities and changed the empty state to return users to the assistant. Added the missing action styling for the assistant-to-application handoff and preserved the mobile layout. This keeps the first-session path aligned with Land → understand → bring context → receive useful work → continue.\n\nVerification note: GitHub Actions is configured for push to main, but the connected workflow-run wrapper exposes pull-request-triggered runs only; the latest push therefore cannot be marked CI-green from that wrapper. The latest commit status is Vercel pending. No deployment was claimed or modified.\n\n### 2026-09-24 — Structured job understanding\n\nAdvanced Phase 2/5 from a fit-only intake to explicit job understanding. The assistant now extracts and displays requirements, responsibilities, constraints and evidence needs from the supplied opportunity, while retaining the existing heuristic fit signal as secondary guidance. This keeps the product centered on useful work rather than a score.\n\nThe structured extraction is deterministic and source-bound: it does not invent requirements or candidate qualifications. Sparse postings fall back to clearly labelled keyword/work signals rather than fabricated detail.\n\n### 2026-09-24 — Evidence-first application review\n\nAdvanced Phase 5/6. Application Studio now re-runs the structured job understanding for the supplied opportunity and exposes requirements, responsibilities and evidence needs alongside the generated package. The previous ATS-style numeric readiness display was removed from the primary header in favour of a qualitative evidence state. This better matches the roadmap rule that unexplained scores must not become the primary answer.\n\nThe assistant remains the first entry point; the user can move from supplied opportunity → structured understanding → evidence review → application package without returning to job discovery.\n\n### 2026-09-24 — Structured parsing hardening\n\nAudited the structured-understanding implementation and found a source-quality weakness: Greenhouse/ATS descriptions can arrive as HTML, while the previous normalizer collapsed the entire description into one line. That made section-aware extraction unreliable. The parser now preserves meaningful block boundaries from common HTML elements, strips tags/entities, and classifies sentence/block signals into requirements and responsibilities before falling back to clearly labelled signals. This keeps job understanding source-bound without introducing an LLM dependency or inventing requirements.\n\nCurrent verification: the latest GitHub commit has a Vercel status of pending. The available workflow-run integration does not expose push-triggered CI runs, so CI is not marked green without evidence.\n\n### Remaining implementation gate

Still required:
- Make assistant intake create durable application context rather than only route. The first structured assessment is now implemented; remaining work is durable context wiring and deeper intelligence.
- Implement structured job understanding and assessment output.
- Verify LinkedIn PDF → free resume and Pro customisation boundary.
- Complete route/copy audit for any remaining job-search-first language.
- Verify assistant UX on mobile.
- Run main and worker CI on the settled head.
- Keep Supabase/Vercel deployment setup paused until the product architecture is stable.

## Build discipline

Before every build, audit the previous roadmap item and relevant research, repair incomplete work, update README and docs/BUILD_LOG.md, run verification, then advance. Never mark external dependencies or safety validation complete without actually verifying them.
