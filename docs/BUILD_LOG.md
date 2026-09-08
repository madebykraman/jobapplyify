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

### v0.5 verification boundary
- Live source availability depends on the employer's public ATS board and can change independently of ROVA.
- GitHub CI/Vercel must perform the final dependency and production build verification.
- Broader sources such as LinkedIn, Indeed, Naukri, Internshala, Workday and other platforms remain planned adapter work; they are intentionally not represented as supported live feeds yet.

### Rule
Before each subsequent build, audit the previous build against the approved roadmap, remediate gaps first, then advance.
