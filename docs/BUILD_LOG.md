# Product Build Log

## 2026-09-10 — NAUKRI LABS Job Assistant Pivot

### Decision
The product direction was reset from a job-search-first workspace to a **Job Assistant / Naukri Copilot**. The user does not come to NAUKRI LABS to discover jobs. They bring a job, application, document, recruiter message or career problem, and NAUKRI LABS helps perform the work around it.

### Product definition
**NAUKRI LABS = job assistant.**

Core promise: **Give it the job. Let it handle the work.**

Core loop:
`Give context → Understand → Assess → Improve → Create → Review → Act`

### Explicitly removed from product strategy
- Job marketplace.
- Job-search-first homepage.
- Job discovery as a primary navigation item.
- Competition with LinkedIn/Naukri/Indeed on listing inventory.
- Heavy ATS-style tracking as a core reason to use the product.

Supported ATS ingestion remains only as an input mechanism for understanding a job supplied by the user.

### Preserved infrastructure
The existing authentication, career profile, document/resume storage, application preparation, automation queue/worker, ATS adapters, safety handoffs, evidence capture/redaction and persistence infrastructure remains valuable and is being repurposed around the assistant.

### Build completed in this pivot
- Rewrote `lib/brand.ts` around assistant positioning.
- Rebuilt the public homepage around the assistant rather than job discovery.
- Added `/assistant` as the primary product entry point.
- Added supported job-link ingestion and pasted job-description intake to the assistant surface.
- Added direct next actions from assistant context: fit assessment, application preparation and automation.
- Repositioned primary navigation around Assistant, Workspace, Resume, Applications and Pricing.
- Rewrote `docs/ROADMAP.md` around the Job Assistant product model.
- Rewrote README to document the new product, scope, monetisation direction and truth rules.

### Product boundaries established
- LinkedIn PDF → one usable resume template remains free forever.
- Additional resume template selection/customisation is a Pro boundary.
- Public/community signals may inform directional recommendations but are not presented as exact truth.
- Candidate claims remain evidence-grounded.
- Automation remains controllable and must hand off on CAPTCHA, sensitive information, ambiguity or unsupported flows.
- Submission verification requires evidence.

### Verification status
The new assistant route and homepage are code-complete for the current pivot surface. Final GitHub Actions verification on the settled pivot head is still required. Supabase/Vercel deployment work remains paused until the new product architecture is stable.

### Next audit/build gate
Before advancing, audit every existing route and component against `docs/ROADMAP.md` and classify it Keep, Adapt, Demote, Remove or Future. In particular, inspect remaining `/opportunities`, `/career`, `/insights`, tracking and legacy navigation/copy so no job-search-first experience survives unintentionally. Then run main CI and Worker CI.

## Previous history

Earlier entries remain represented by the repository history. The 2026-09-09 rebrand/reset and Phase 14 automation hardening were the technical foundation immediately preceding this product pivot.

## Build discipline
Before every build, audit the previous roadmap item, repair incomplete work, update README and `docs/BUILD_LOG.md`, run verification, then advance. Never mark external dependencies or safety validation complete without actually verifying them. Functionality outranks aesthetics.
