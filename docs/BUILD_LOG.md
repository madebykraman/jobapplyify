# Product Build Log

## Build 12 — PRODUCT RECONCILIATION + QA RESET — 2026-09-09

Build 12 is no longer treated as a final-launch claim. It is the audit/reset boundary that reconciles the full product history, feature requests, pivots, implementation state, external competitive research, UI direction and release gates. The complete forward roadmap is maintained in `docs/ROADMAP.md`; the detailed product/code audit is in `docs/MASTER_AUDIT.md`; the external reference audit is in `docs/COMPETITIVE_UI_AUDIT.md`; the current implementation truth table is in `docs/FEATURE_TRUTH.md`.

### Historical pathway
Build 01–05 established the product foundation, job intelligence and career intelligence. Build 06 added resume ingestion, parsing, persistent saves and job-source hardening. Build 07 introduced the automation control center and three execution modes. Build 08 created the browser-worker foundation and adapter registry. Build 09 added asynchronous worker execution, secure dispatch/callback, durable queue lifecycle, signed resume transfer and host allowlisting. Build 10 added Interview/Outcome Intelligence plus Growth/Community. Build 11 added monetisation and Supabase entitlements. Build 12 began as final QA/security/launch hardening and is now expanded into the full reconciliation and release program.

### Product pivots recorded
- Basic job helper → full career operating system.
- Volume-first auto-apply concept → evidence-first controlled automation.
- Local-only prototype → local-first with Supabase durable infrastructure.
- Web-only execution → web control plane + separate Playwright worker.
- ROVA → WAYO → KINDLEAP.
- Generic SaaS/sidebar/cards → dark spatial career instrument.
- Static feature surfaces → outcome/evidence-driven product architecture.
- Simple paid concept → freemium + ₹499/month India Pro + beta invite entitlement.

### External competitive audit completed
The supplied references were re-audited against the current roadmap and feature list. NextRaise reinforces evidence-backed matching, JD tailoring, contextual autofill, referrals and tracking. LoopCV reinforces Kanban application tracking, follow-up reminders, interview-round records, answer automation and exclusions. AIApply reinforces durable Answer Library concepts, Auto/Hybrid/Review modes and a per-application review artifact. JobCopilot reinforces explicit user-edit learning and configurable filters. FastApply reinforces fast job triage, fit/salary/work-mode signals and automation state. Autojob reinforces campaign abstraction, deal-breakers, recruiter engagement, dynamic outreach, video evidence and interview assistance. AutoApply.in remains an India-market reference but is not treated as technically verified because the current crawler cannot reliably access its content.

### External UI audit completed
OpenSource UI reinforces a cohesive primitive library with consistent spacing/type/interaction without making every component identical. Exalt reinforces product-structure-first design, atomic/component systems, progressive disclosure and data-heavy AI workflows. Recent reinforces editorial curation and visual rhythm. Grainient reinforces an engineered visual engine for restrained atmospheric moments. Swiped remains a visual reference only because the current crawler is blocked by robots.txt.

### New roadmap additions from competitive audit
- Durable Answer Library with evidence provenance.
- Hard deal-breakers and company exclusion lists.
- Immutable application package snapshots.
- Application Review tab showing exact submitted artifacts.
- Hybrid automation mode.
- Campaign abstraction.
- Interview-round records.
- Recruiter engagement signals where consented.
- Dynamic outreach/email drafts tied to applications.
- Optional introduction-video/portfolio evidence.
- Explicit user-edit learning loop.
- Multilingual resume output.
- Job freshness decay.
- Response analytics by source, role family and evidence quality.

### Build 12 audit findings
- Current CI is now green on the audited implementation after fixing the errors exposed by the remediation pass; browser/device QA remains open.
- The current product is a strong prototype/control-plane foundation, not a production-complete career operating system.
- Authentication and product surfaces still require the shared dark system; the fix is a page-level design rebuild, not another global override.
- Current job intelligence is heuristic rather than calibrated market intelligence.
- Current outcome, community and growth surfaces contain seeded/static data and cannot be presented as live intelligence.
- Durable automation infrastructure exists, but real platform adapters, independent submission verification, evidence viewer/redaction and browser handoff are not complete.
- Client-set Pro authorization was a security/product-boundary defect. Build 12A replaces it with cookie-backed Supabase SSR sessions and server entitlement checks for protected routes.
- Document deletion/orphan handling required correction and is addressed at the client/storage-path layer; final RLS/data-deletion testing remains open.
- Application generation contained unsupported fallback claims; generation is now stricter and explicitly evidence-bound.
- The Lever public API URL parser contained a path-indexing defect; the parser is corrected and still requires representative fixture tests.

### Code remediation completed in this audit pass
- Added `@supabase/ssr` and moved browser authentication to cookie-backed sessions.
- Added a cookie-aware server Supabase client for Server Components/Route Handlers.
- Replaced the forgeable `wayo_pro` middleware cookie gate with authenticated server entitlement lookup.
- Removed localStorage as an entitlement authority from `lib/entitlements.ts`.
- Updated the Pro UI gate to read the authenticated entitlement API rather than a client flag.
- Removed the client-side demo credential/Pro bypass from authentication.
- Removed remaining user-visible WAYO/ROVA branding found in the workspace and resume surfaces touched in this pass.
- Added `lib/feature-status.ts` and `docs/FEATURE_TRUTH.md` as explicit live/partial/mock/unavailable/unsafe truth registries.
- Corrected application-engine optional-field type handling discovered by CI.
- Aligned the main CI runtime to Node 22 because the resolved Supabase dependency requires Node 22+.
- Previously completed: Lever parsing correction, Ashby hostname restoration, KINDLEAP source user-agent, remote document cleanup, and evidence-bound application fallback hardening.

### Verification
GitHub Actions run **34319655739** for commit `c189141f66f615e806f449ccdf666624bfc57dcb` is green: `npm run typecheck` and `npm run build` both pass.

The same CI install reports **3 dependency vulnerabilities (1 moderate, 2 high)**. These are now an explicit security remediation item; they are not being treated as invisible warnings. The project also requires Node 22 in CI and package metadata.

### Build 12A status
12A is active, not complete. The typecheck/build baseline is clean, but the product-wide defect sweep is not finished. The next reconciliation pass must continue through every route, API, database schema, worker path, data lifecycle and failure state.

### Immediate remediation sequence
1. Complete product-wide P0/P1 defect sweep.
2. Audit every route/API/database/worker boundary and record truth status.
3. Resolve the 3 dependency vulnerabilities or document a justified non-upgrade path.
4. Add representative source/automation fixtures and regression tests.
5. Complete data deletion/orphan/RLS verification.
6. Reconcile remaining legacy branding and stale claims.
7. Begin Build 12B shared KINDLEAP UI system and page rebuild.
8. Continue Builds 13–24 only after the previous build's exit criteria are actually evidenced.

## CI verification boundary
The CI definition requires `npm run typecheck` and `npm run build` on Node 22. Latest verified green run: **34319655739**, commit `c189141f66f615e806f449ccdf666624bfc57dcb`. The final documentation-only commits after that run do not change runtime code, but another green run will be recorded after the documentation state settles.

## Documentation rule
README, BUILD_LOG and ROADMAP are updated as part of every build. A build is not marked complete solely because its UI exists. Completion requires the relevant data model, persistence, validation, security boundary, integration, failure handling, evidence and regression coverage.
