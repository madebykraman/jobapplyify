# ROVA Build Log

## v0.1
- Brand and product foundation established.
- Product shell, navigation, control model and visual direction established.

## v0.2 audit
- Dashboard interaction shell existed and was retained.
- Navigation, search, automation pause/resume, pipeline and review gate were present.
- Production runtime verification remained pending because the build environment could not reach GitHub dependencies.
- Account, persistence and document functionality were not implemented; this was carried forward as a gap rather than treated as complete.

## v0.3
- Repaired the `@/*` TypeScript path alias that caused the Vercel module-resolution failure.
- Added Supabase-ready authentication, profile, database and private-storage foundation with RLS schema.
- Added local-first profile and document persistence so the product remains usable before external credentials are configured.
- Added account sign-in/create-account surface with explicit demo-mode boundary.
- Added onboarding and editable candidate profile.
- Added private Supabase document upload when configured.
- Added resume import for PDF, DOCX, TXT and Markdown.
- Added deterministic resume parsing/normalisation and ATS/fit analysis.
- Added target-role comparison, matched/missing terms, section detection and structural warnings.
- Added persisted resume versions and an editable resume builder with live preview and browser PDF printing.
- Connected dashboard navigation to opportunities, applications, review queue, documents and insights routes.
- Added responsive styling for all new surfaces.

### v0.3 verification boundary
- Repository imports, dependency declarations and route structure were audited after implementation.
- Final cloud-build confirmation remains dependent on the user's separate Vercel project.
- GitHub CI is configured to run `npm install` and `npm run build` on pushes and pull requests.

## v0.4 — Career Intelligence
- Audited v0.3 before advancing. No code-level blocker was identified; Supabase activation remains an external setup dependency and does not block the deterministic career-intelligence layer.
- Added a deterministic career assessment engine using verified profile/resume signals.
- Added role-fit ranking across product design, UX, design systems, brand/visual, creative technology, research and product tracks.
- Added visible matched skills and next-skill gaps for each recommended role.
- Added salary-target assessment with within-range, stretch and rebuild outcomes.
- Added target salary input and actionable gap plan.
- Added three career-path strategies covering depth, design+technology and adjacent-function pivots.
- Added a dedicated Career Intelligence workspace and dashboard navigation entry.
- Kept salary bands explicitly labelled as product planning heuristics until a live market-data connector is introduced.
- Added responsive styling for the new career workspace.

### v0.4 verification boundary
- TypeScript/build verification is delegated to GitHub CI and the user's Vercel deployment because this environment cannot install repository dependencies directly.
- No external API key is required for the v0.4 deterministic engine.

## v0.5 — Job Intelligence
- Audited v0.4 before advancing: career engine and workspace are present, deterministic, and isolated from external AI dependencies.
- Added normalized job schema and deterministic job-fit analysis.
- Added public ATS source adapters for Greenhouse, Lever and Ashby.
- Added server-side public-feed loader with source allowlisting and HTTPS enforcement.
- Added job search/filtering across loaded roles.
- Added fit score, matched evidence, missing signal, seniority, compensation and work-mode analysis.
- Added source provenance and direct application/source links.
- Added saved-role interaction and role intelligence detail panel.
- Added dashboard navigation for Job Intelligence.
- Added responsive styling for the job intelligence workspace.
- Core job discovery works without paid aggregators or employer credentials for supported public ATS feeds.

### v0.5 audit before v0.6
- Found four gaps against the approved Job Intelligence roadmap: individual job URL scanning was incomplete, saved roles were ephemeral, duplicate detection was only advisory, and career/company/project relevance was under-specified.
- These gaps were remediated before treating the job-intelligence stage as complete.

## v0.6 — Application Preparation
- Added public individual-job URL scanning for Greenhouse and Lever, plus Ashby board resolution and individual-job matching where exposed by the public feed.
- Kept server-side source allowlisting and HTTPS enforcement; the scanner is not an arbitrary URL fetcher.
- Added persistent local saved-role state with timestamps.
- Added canonical duplicate keys using ATS source IDs, canonical URLs or normalized role identity.
- Added duplicate-source detection in the opportunity UI.
- Strengthened company/team context without inventing unavailable facts.
- Added project-signal extraction from the supplied job description.
- Added explicit career relevance against declared target roles.
- Improved ATS normalization fallbacks for company, workplace type, employment and publication timestamps.
- Added richer job-intelligence detail sections and source-provenance guardrails.
- Added a deterministic application-preparation engine driven by the selected job, stored profile and latest resume.
- Added role-specific resume variant metadata and ATS readiness scoring.
- Added role-specific cover-letter drafting.
- Added common application-answer drafting for motivation, fit and compensation.
- Added missing-evidence warnings and an explicit no-invention guardrail.
- Connected Job Intelligence directly to the Application Preparation workspace.
- Added copy controls for generated application material.
- Bumped product version to 0.6.0.

### v0.6 debugging and verification
- Initial CI exposed a TypeScript regression in onboarding because `targetRoles` and `skills` are string arrays while the generic updater accepted only strings.
- Fixed the onboarding updater by separating scalar fields from list fields.
- CI then exposed a `pdfjs-dist` typing incompatibility for the browser PDF parser's `disableWorker` option; preserved the intended browser behavior with a narrowly scoped compatibility cast.
- Review also found a latent typing defect in `canonicalJobKey`, where `source` was referenced but omitted from its declared input type; fixed before final verification.
- Review found compensation text could produce malformed output such as `₹₹12 LPA`; normalized the target salary before drafting.
- The CSS autoprefixer `align-items:end` message is a warning only and does not block production compilation.
- GitHub Actions `npm install` and `npm run build` passed on commit `6dd91f9a02ab2ca184db75198c27eb18437af112` after the code fixes.
- The final documentation commits triggered another CI pass; production Vercel deployment was completed by the user from a separate Vercel account at `https://jobapplyify.vercel.app/`.
- `npm install` currently reports 3 dependency vulnerabilities (1 moderate, 2 high); this remains tracked for dependency hardening and is not a build failure.

## v0.7 — Automation Engine
- Audited v0.6 before advancing: application preparation is deterministic, evidence-bound and connected to Job Intelligence; the remaining roadmap gap was the execution/control plane rather than preparation.
- Added explicit automation states: queued, preparing, ready, running, paused, human-review, submitted, verified, failed and cancelled.
- Added execution policy modes: dry-run, review and full-auto.
- Added hard permission boundaries for CAPTCHA, unknown forms, sensitive questions and submission verification.
- Added adapter contracts for Greenhouse, Lever, Ashby, LinkedIn, Indeed, Naukri, Internshala and Instahyre.
- Added adapter capability declarations for login, resume upload, form filling, answers, submission and verification.
- Added retry limits and explicit state transitions instead of implicit sleeps or navigation assumptions.
- Added persistent local automation queue records and timestamps.
- Added Automation Engine control-center UI with queue pause/resume, retry, cancellation and human-handoff controls.
- Added direct handoff from the selected application package into the automation queue.
- Added automation navigation to the main Command workspace.
- Kept browser execution, credentials and persistent sessions outside the Vercel request lifecycle; the control plane does not falsely claim that a browser submission occurred.
- Bumped product version to 0.7.0.

### v0.7 verification boundary
- GitHub CI must pass `npm install` and `npm run build` for the new automation layer before this build is treated as verified.
- The separate browser worker/runtime is intentionally the next execution integration boundary; no fake browser submission is represented in the product.

### Rule
Before each subsequent build, audit the previous build against the approved roadmap, remediate gaps first, then advance.
