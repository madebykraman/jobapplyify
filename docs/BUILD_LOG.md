# WAYO Build Log

## Product-wide audit + market expansion — 2026-09-09
ROVA is abandoned as the product brand. The new provisional working brand is **WAYO** — “Your career, in motion.” Brand clearance is intentionally not treated as complete until later legal/domain research.

The product was re-audited against the original proposal plus current 2026 competitor/community patterns. WAYO is designed around evidence-backed career intelligence, truthful generation, outcome-aware decisions and controlled automation rather than application volume.

### Required product capability matrix
- Freemium monetisation: Free + Pro, usage/automation credits, later add-ons and team/coach plans.
- One-click structured resume builder.
- ATS checker and role-specific ATS readiness.
- LinkedIn/PDF/resume ingestion and analysis.
- Resume upload → evidence extraction → best-fit roles.
- Cover letter generation and role-specific resume generation.
- AI role recommendations + compensation intelligence.
- Any-job-post scanner and intelligence layer.
- Career paths, pivots, transferable skills, salary progression and action plans.
- Salary-target feasibility engine: “Can I reach ₹12 LPA?” → fit, gaps, work, timeline and next actions.
- Resume audit / career audit.
- Community-driven data signals with provenance and confidence.
- Profile import from supported sources where technically and legally permitted.
- Exclusive community: coming soon, not represented as live.

### Market-demand additions
1. Explainable job match. 2. Transferable-skills mapper. 3. Company intelligence. 4. Referral intelligence. 5. Interview Lab. 6. Follow-up assistant. 7. Application email intelligence. 8. Freshness/duplicate/repost detection. 9. Salary negotiation intelligence. 10. Offer comparison. 11. India notice-period/CTC/expected-CTC intelligence. 12. Visa/sponsorship/work authorization. 13. Remote/hybrid/on-site intelligence. 14. Skills-to-project planner. 15. Learning roadmap. 16. Portfolio/project audit. 17. LinkedIn/profile audit. 18. Personal career memory. 19. Career health dashboard. 20. Community intelligence. 21. Browser extension. 22. Application autofill agent. 23. Human review queue. 24. Evidence vault. 25. AI truth lock. 26. Application quality score. 27. Rejection learning loop. 28. Community salary/job intelligence. 29. Career pivot simulator. 30. Goal planner.

## Build audit before advancing
Previous work was rechecked before continuing. The durable automation layer remains incomplete because worker execution state is process-local, platform adapters are not fully live, evidence storage is not durable, and independent submission verification is absent. Build 08 remains active.

### Access model + UI transformation shipped — 2026-09-09
- Basic discovery remains usable without account.
- Pro routes now require account-level Pro access.
- Beta invite code `WAYO-BETA` unlocks full Pro access at no charge during beta.
- A dedicated test account path is available for product review.
- Pro pricing is positioned at ₹499/month in India with a purchasing-power-adjusted international reference price in the UI.
- Future AI, automation, interview and data credits are explicitly reserved as an add-on layer rather than gating the core product.
- New account experience is a separate WAYO visual system while the classic dashboard remains available.
- Review Queue is now explicitly treated as a Pro control gate.
- WAYO app metadata and icon have been refreshed.

### Still blocked before Build 08 completion
- Worker queue state must survive process restart.
- Retry/claim/lease semantics must be durable and race-safe.
- Resume signed URL must be wired end-to-end from application UI into worker task.
- Real platform-specific adapters and fixtures must be implemented and tested.
- Evidence must move from worker-local filesystem to secure object storage with retention/redaction.
- Independent submission verification must exist before any `verified` state can be claimed.
- Queue pause/cancel/retry controls must persist server-side.
- Notifications and automation analytics remain incomplete.

## Brand transformation
WAYO replaces ROVA across product-facing UI. The product keeps two intentional visual modes during development: the classic command dashboard and the new editorial/neo workspace. They are both retained so the product can be reviewed side-by-side before a final design language is selected.

## 12-build roadmap
1. Build 01 — Foundation + WAYO brand system.
2. Build 02 — Account, onboarding, persistent career profile and secure documents.
3. Build 03 — Resume Studio.
4. Build 04 — Career Lab.
5. Build 05 — Market Intelligence.
6. Build 06 — Application Studio.
7. Build 07 — Automation Engine.
8. Build 08 — Control Center: durable queue, review, evidence, analytics, notifications and follow-ups.
9. Build 09 — Interview Lab + Outcome Intelligence.
10. Build 10 — Growth + Community.
11. Build 11 — Monetisation + Entitlements.
12. Build 12 — Full QA, Security + Launch.

## Quality rules
A UI is not a completed feature. Completion requires data model, persistence, validation, security boundary, integration, failure handling and verification. No platform is described as live until an actual adapter and representative fixture are tested. No application is described as submitted merely because a form was navigated. No application is verified without independent evidence. AI output must distinguish confirmed evidence, inference and uncertainty. Candidate facts are never silently invented.
