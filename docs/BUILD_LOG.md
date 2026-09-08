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
- Added Supabase-ready account/profile/database foundation with RLS schema and private document bucket policy.
- Added local-first profile persistence so the product remains usable before external credentials are configured.
- Added account sign-in/create-account surface with explicit demo-mode boundary.
- Added resume import for PDF, DOCX, TXT and Markdown.
- Added deterministic resume parsing/normalisation and ATS/fit analysis.
- Added target-role comparison, matched/missing terms, section detection and structural warnings.
- Added responsive styling for account and resume intelligence surfaces.

### Outstanding external setup
- Supabase project URL and anon key are required to activate production authentication/database/storage.
- Dependency installation and production build verification must be performed in a network-enabled environment.

### Rule
Before each subsequent build, audit the previous build against the approved roadmap, remediate gaps first, then advance.
