# Product Build Log

## Build 12 — PRODUCT RECONCILIATION + QA RESET — 2026-09-09

Build 12 is the audit/reset boundary that reconciles the full product history, feature requests, pivots, implementation state, competitive research, UI direction and release gates.

### Product pivots
- Basic job helper → full career operating system.
- Volume-first auto-apply → evidence-first controlled automation.
- Local-only → local-first + Supabase.
- Web-only → web control plane + Playwright worker.
- ROVA → WAYO → KINDLEAP.
- Generic SaaS/cards → dark spatial career instrument.
- Static surfaces → evidence/outcome-driven architecture.
- Simple paid → freemium + ₹499/month India Pro + beta invite.

### Competitive/UI additions
The supplied competitor and UI references were re-audited. Roadmap additions include durable Answer Library with provenance, deal-breakers/exclusions, immutable application snapshots, exact Review artifacts, Hybrid automation, campaigns, interview-round records, consented recruiter signals, application-linked outreach, optional video/portfolio evidence, user-edit learning, multilingual output, freshness decay and response analytics.

### Build 12A remediation completed
- Cookie-backed Supabase SSR authentication.
- Server entitlement checks replacing forgeable `wayo_pro` client gating.
- Removed local entitlement authority and client-side demo Pro bypass.
- Explicit `lib/feature-status.ts` and `docs/FEATURE_TRUTH.md` truth registries.
- Legacy user-visible WAYO/ROVA sweep on touched surfaces; repository searches currently return no matches for either term.
- Lever parsing correction, Ashby hostname restoration, KINDLEAP source identity, remote document cleanup and evidence-bound application fallback hardening retained.
- Corrected application-engine optional-field typing.
- Node 22 runtime/CI alignment.

### Build 12B started
The shared visual foundation is now being reset around the approved KINDLEAP direction: dark-first, spatial, restrained, high-contrast, evidence-oriented, mobile-first and accessible. The existing dark stylesheet has been replaced with a tighter KINDLEAP token/override layer covering the common dashboard, form, job, resume, career, opportunity, automation, insight, growth and community surfaces. This is a foundation pass, not a claim that every page has been fully redesigned yet.

### Verification
GitHub Actions run **34319780171** for commit `ce5ff4a896816405cdcbfd22dd6e2bc6bce2245f` is green: typecheck and production build pass. A subsequent UI commit requires another CI run before Build 12B is considered verified.

The install reports **3 dependency vulnerabilities (1 moderate, 2 high)**. They remain explicit security work.

### Current status
**Build 12B — active.** 12A exit criteria are substantially remediated but not closed until dependency/security, RLS/deletion, fixtures, browser/device QA and route/API truth sweep are evidenced. Build 12B proceeds at the UI foundation level; production feature builds remain gated.

### Next sequence
1. Complete shared UI primitives and shell.
2. Rebuild all product routes against the shared system.
3. Finish P0/P1 route/API/data/worker audit.
4. Resolve dependency vulnerabilities.
5. Add source/automation fixtures and regression coverage.
6. Complete RLS/deletion verification.
7. Fresh CI after the current changes.
8. Then Build 13 Account + Career Memory.

## Documentation rule
README, BUILD_LOG and ROADMAP are updated as part of every build. A build is not complete merely because its UI exists; completion requires data, persistence, validation, security, integration, failure handling, evidence and regression coverage.
