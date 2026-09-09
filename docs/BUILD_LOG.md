# Product Build Log

## Build 12 — PRODUCT RECONCILIATION + QA RESET — 2026-09-09

Build 12 is no longer treated as a final-launch claim. It is the audit/reset boundary that reconciles the full product history, feature requests, pivots, implementation state, UI direction and release gates. The complete forward roadmap is maintained in `docs/ROADMAP.md`; the detailed audit is in `docs/MASTER_AUDIT.md`.

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

### Build 12 audit findings
- Current CI was green on the latest pre-audit commit; the audit changes below require a new green run before this commit is marked verified.
- The current product is a strong prototype/control-plane foundation, not a production-complete career operating system.
- The supplied mobile screenshots correctly expose the largest UI problem: authentication and product surfaces still drift into separate visual systems. The fix is a shared design system and page rebuild, not another global override.
- Current job intelligence is heuristic rather than calibrated market intelligence.
- Current outcome, community and growth surfaces contain seeded/static data and cannot be presented as live intelligence.
- Durable automation infrastructure exists, but real platform adapters, independent submission verification, evidence viewer/redaction and browser handoff are not complete.
- Client-cookie Pro gating remains a security and product-boundary defect until replaced everywhere by authoritative server entitlement checks.
- Document deletion/orphan handling required correction and is now addressed at the client/storage-path layer; final RLS/data-deletion testing remains open.
- Application generation contained unsupported fallback claims; generation is now stricter and explicitly evidence-bound.
- The Lever public API URL parser contained a path-indexing defect; the parser is now corrected and requires representative fixture tests.

### Code remediation completed in this audit pass
- Corrected Lever `api.lever.co` path parsing.
- Restored the Ashby API hostname while fixing the Lever parser.
- Changed the job-source user-agent to KINDLEAP.
- Added remote storage-path tracking and safe remote document deletion/cleanup.
- Removed legacy ROVA branding from Documents, Opportunities, Applications, Career and Review surfaces touched in this pass.
- Tightened application-generation fallbacks so missing evidence cannot silently become candidate experience claims.
- Added master product audit and replacement release roadmap.

### Immediate remediation sequence
1. Product reconciliation and P0/P1 defect sweep — in progress.
2. Full shared KINDLEAP UI rebuild across every route.
3. Durable account/profile/evidence model.
4. Evidence-bound resume/application intelligence.
5. Real market intelligence integrations and calibrated scoring.
6. Durable application studio and review queue.
7. Production browser adapters and independent verification.
8. Real outcome/interview intelligence.
9. Growth/community integrations.
10. Payment and authoritative entitlement enforcement.
11. Extension/integrations.
12. Full QA/security/performance and controlled beta.

## CI verification boundary
The CI definition requires `npm run typecheck` and `npm run build`. Latest confirmed green run before the current audit fixes: GitHub Actions run `34316133299`, commit `c56e40d8b189586a5971e80008bc4d74608c1542`. The audit remediation commits require a fresh green run.

## Documentation rule
README, BUILD_LOG and ROADMAP are updated as part of every build. A build is not marked complete solely because its UI exists. Completion requires the relevant data model, persistence, validation, security boundary, integration, failure handling, evidence and regression coverage.
