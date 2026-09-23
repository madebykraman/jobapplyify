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

### Repository work completed

- Added research baseline.
- Rewrote roadmap around the research-backed Job Assistant model.
- Updated README with research, design and conversion requirements.
- Preserved existing automation/application infrastructure.
- Existing assistant-first homepage and /assistant intake remain the product front door.

### Remaining implementation gate

The next build must audit every route/component/copy surface against the new roadmap and research. Specifically: remove/demote job-search-first navigation and pages; make assistant intake create durable application context; implement structured job understanding and assessment output; verify LinkedIn PDF → free resume and Pro customisation boundary; verify assistant UX on mobile; run main and worker CI on the settled head; keep Supabase/Vercel deployment setup paused until the product architecture is stable.

## Build discipline

Before every build, audit the previous roadmap item and relevant research, repair incomplete work, update README and docs/BUILD_LOG.md, run verification, then advance. Never mark external dependencies or safety validation complete without actually verifying them.
