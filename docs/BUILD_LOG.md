# Product Build Log

## Build 12 — PRODUCT RECONCILIATION + QA RESET — 2026-09-09

Build 12 is the audit/reset boundary that reconciles product history, implementation state, competitive research, UI direction and release gates.

### Build 12A
- Cookie-backed Supabase SSR authentication.
- Server entitlement checks replacing forgeable client gating.
- Removed local entitlement authority and client-side demo Pro bypass.
- Explicit feature-truth registry and human-readable truth table.
- Legacy user-visible branding sweep on touched surfaces.
- Lever parsing correction, Ashby hostname restoration, KINDLEAP source identity, remote document cleanup and evidence-bound application fallback hardening retained.
- Node 22 runtime/CI alignment.

12A remains open for dependency/security, RLS/deletion, fixtures, browser/device QA and route/API truth verification.

### Build 12B — UI SYSTEM REBUILD — ACTIVE
The UI audit found the previous product architecture too dependent on route-specific styling, legacy light-theme primitives and inconsistent interaction surfaces. The redesign is therefore a system replacement, not a cosmetic reskin.

Implemented in this pass:
- Canonical KINDLEAP design tokens and primitives.
- Shared responsive workspace shell.
- Desktop navigation rail with active-route state.
- Sticky command/search surface.
- Mobile navigation drawer and iPhone bottom navigation.
- Shared SectionHeader, Surface, Signal, Status and Row primitives.
- Workspace/Command page rebuilt against the shared system.
- Accessible focus states and reduced-motion handling.
- Dark-first near-black surfaces, warm typography, restrained rules and one signal accent.

The shell is intentionally separate from public landing/auth/onboarding. Product routes will be migrated to it systematically; no claim is made that every route is complete yet.

### UI audit rules now enforced
- No route-specific visual language where a shared primitive is appropriate.
- No decorative cards for information that should read as a list, table or state.
- Evidence, inference, status and automation state must remain visually distinguishable.
- One dominant action per decision context.
- Dense comparison surfaces for jobs/applications; drawers for deep inspection.
- Mobile is a first-class linear flow, not a desktop layout squeezed into a phone.
- Loading, empty, error, disabled and success states are explicit.
- Focus, keyboard access, reduced motion and touch targets are release requirements.

### Verification
Current UI commits have active GitHub Actions runs. They must finish green before this build is marked verified. The previous verified green baseline remains historical only.

CI has reported 3 dependency vulnerabilities (1 moderate, 2 high); these remain tracked security work.

### Next 12B sequence
1. Migrate every product route to the canonical shell.
2. Replace route-specific component styling with shared primitives where possible.
3. Audit every interaction state: loading, empty, error, success, disabled, destructive and confirmation.
4. Remove legacy light-theme dependencies from the target workspace system.
5. Perform mobile/iPhone and accessibility pass.
6. Run fresh CI and repair all regressions.
7. Re-audit route/API/data truth before Build 13.

## Documentation rule
README, BUILD_LOG and ROADMAP are updated as part of every build. A build is not complete merely because its UI exists; completion requires data, persistence, validation, security, integration, failure handling, evidence and regression coverage.
