# KINDLEAP Master Product Audit — 2026-09-09

## Scope
This is the product-wide reconciliation of the conversation roadmap, the current Git history and the current `main` implementation. It replaces the assumption that Build 12 is already launch-ready. Build 12 is now treated as the audit/reset boundary; launch follows only after evidence-based completion.

## Historical pivots
1. Initial product direction: job application/career assistant built around resume, job discovery, matching, application preparation and automation.
2. Product expanded from a basic job application helper into a full career operating system: `Find → Understand → Prepare → Apply → Interview → Grow`.
3. The automation direction was deliberately changed from blind mass-apply thinking to controlled automation: Dry Run, Review and Full Auto, with human handoff for CAPTCHA, ambiguity, sensitive questions and unsupported flows.
4. Product intelligence was expanded beyond job matching into career paths, salary planning, company/referral intelligence, outcome learning, community intelligence and goal planning.
5. Storage evolved from local-first browser persistence toward Supabase authentication, RLS, private document storage and durable automation jobs.
6. Browser execution was split into a separate Playwright worker so the web app remains the control plane.
7. Branding moved ROVA → WAYO → KINDLEAP. KINDLEAP is now canonical; ROVA/WAYO remain technical legacy names only where removal would break compatibility.
8. UI direction pivoted from generic SaaS/sidebar/cards and then from light editorial styling to a single dark, spatial, cinematic, evidence-first product system. The supplied mobile screenshots demonstrate that this system is still inconsistent in production and requires a full page-level rebuild rather than more global overrides.
9. Monetisation moved to freemium: basic access where implemented, Pro at ₹499/month in India, invite-based beta unlock, with credits reserved for a later entitlement layer.

## Historical build timeline reconstructed from repository history
- Build 01–05: foundation, job intelligence, career intelligence and initial workspace progression.
- Build 06: resume ingestion, PDF/DOCX parsing, persistent saves, job-source parsing and job intelligence hardening.
- Build 07: automation engine, control center and navigation integration.
- Build 08: browser-worker foundation, adapter registry, CI isolation and worker safety boundaries.
- Build 09: async worker service, secure dispatch/callback, durable job lifecycle, signed resume transfer, result persistence and host allowlisting.
- Build 10: Interview Lab + Outcome Intelligence, followed by Growth + Community.
- Build 11: monetisation + Supabase entitlements and authenticated beta activation.
- Build 12: CI/typecheck, security hardening, dark visual system and authentication UI work. This audit resets the release boundary because several product surfaces remain partial or mock-backed.

## Feature matrix
Legend: DONE = implemented and internally coherent; PARTIAL = UI/logic exists but integration, persistence, verification or quality gate is missing; OPEN = planned/not materially implemented; BLOCKED = cannot ship until a dependency is completed.

| # | Feature | Status | Audit finding / required completion |
|---|---|---|---|
| 1 | Explainable job match score | PARTIAL | Current heuristic fit score exists, but it is substring/token based and needs evidence-weighted scoring, calibration and confidence. |
| 2 | Transferable-skills mapper | PARTIAL | Matching/gap extraction exists; no dedicated transferable-skill graph or explanation layer. |
| 3 | Company intelligence | PARTIAL | Company/team label exists. Funding, product, news, hiring velocity, role context and risk are absent. |
| 4 | Referral intelligence | OPEN | No live referral discovery or provenance workflow. |
| 5 | Interview Lab | PARTIAL | Editorial surface exists, but it is static and currently reuses application navigation instead of a real interview workflow. |
| 6 | Follow-up assistant | PARTIAL | Durable job API can schedule a follow-up timestamp, but no notification delivery or dedicated follow-up UX exists. |
| 7 | Application email intelligence | OPEN | No inbox connector/classifier/persistence. |
| 8 | Freshness/duplicate/repost detection | PARTIAL | Canonical source keys and duplicate-source display exist; freshness/repost detection is not implemented. |
| 9 | Salary negotiation intelligence | OPEN | Not implemented. |
| 10 | Offer comparison | OPEN | Not implemented. |
| 11 | India CTC/notice/expected-CTC intelligence | PARTIAL | Salary target exists; dedicated Indian compensation/notice-period intelligence is not implemented. |
| 12 | Visa/sponsorship/work authorization | OPEN | Not implemented. |
| 13 | Remote/hybrid/on-site intelligence | PARTIAL | Work mode normalization exists but relies on source text heuristics. |
| 14 | Skills-to-project planner | PARTIAL | Career gaps exist; no project-plan generation or tracking. |
| 15 | Learning roadmap | PARTIAL | Career paths exist; no learning provider/content integration or progress model. |
| 16 | Portfolio/project audit | OPEN | No dedicated portfolio ingestion/audit. |
| 17 | LinkedIn/profile audit + rewrite | OPEN | LinkedIn URL is stored only. |
| 18 | Personal career memory | OPEN | No durable career-memory model. |
| 19 | Career health dashboard | PARTIAL | Growth page has health/planning concepts; not backed by real outcome data. |
| 20 | Community intelligence | PARTIAL | Static anonymised signals exist; no live aggregation/contribution pipeline. |
| 21 | Chrome/browser extension | OPEN | Not started. |
| 22 | Application autofill agent | PARTIAL | Worker framework and generic deterministic filling exist; platform-specific production flows are not fixture-complete. |
| 23 | Human review queue / permission gates | PARTIAL | Modes, handoffs and review route exist; browser handoff/session bootstrap and evidence UX remain incomplete. |
| 24 | Evidence vault | PARTIAL | Private documents/evidence storage primitives exist; unified evidence model/viewer/redaction is missing. |
| 25 | AI truth lock | PARTIAL | Product rules and warning copy exist; there is no formal claim/evidence/provenance enforcement layer across all generated output. |
| 26 | Application quality score | PARTIAL | Current resume/job score exists but is a heuristic ATS-like score, not a full application-quality model. |
| 27 | Rejection learning loop | OPEN | No outcome ingestion/classification loop. |
| 28 | Community salary/job intelligence with source/date/confidence | PARTIAL | Static signals include provenance metadata; live source pipeline is absent. |
| 29 | Career pivot simulator | OPEN | Not implemented. |
| 30 | Goal planner | PARTIAL | Growth goal + weekly focus exists with local persistence; needs durable account persistence and linkage to real outcomes. |

## Cross-cutting requests

### Access
- Basic/no-account access: PARTIAL/CONFLICT. Current middleware protects `/resume`, `/career`, `/applications`, `/automation`, `/insights`, `/profile`, `/review`, `/growth`, `/community` using a client-set `wayo_pro` cookie. This is not a secure entitlement boundary and also conflicts with the intended no-account basic access model.
- Pro beta invite: PARTIAL. Supabase entitlement schema and authenticated activation API exist. Production payment/webhook lifecycle is absent.
- ₹499/month India positioning: UI/product decision exists; payment is not implemented.

### Persistence
- Local-first storage: DONE for prototype behaviour.
- Supabase profile sync: PARTIAL.
- Private documents: PARTIAL. Upload and DB row insertion exist, but deletion does not remove the remote storage object or DB row, and failed DB insertion can leave an orphaned storage object.
- Resumes/applications/jobs: largely local or transient; durable domain model is incomplete.

### Automation
- Three modes: DONE as control-plane concept.
- Durable queue: DONE as infrastructure layer.
- Async worker: DONE as infrastructure layer.
- Platform-specific adapters: PARTIAL and explicitly not production-live.
- Independent submission verification: OPEN.
- Evidence viewer/redaction: OPEN.
- Human browser handoff/session bootstrap: OPEN.

## Current page audit

### `/` Home
Conceptually strong but still too close to a marketing/editorial page. It should become the canonical product entry point with one clear action hierarchy. Current navigation exposes Explore/Growth/Community but omits the primary authenticated workspace/profile surfaces. UI needs the same shell used everywhere else.

### `/auth`
The supplied screenshot is inconsistent with the home page because authentication uses a large light card. The current source still contains a dedicated light-card visual model. Rebuild this page against the shared dark system. Demo credentials must never be presented as real production access; keep only behind explicit review/demo context.

### `/onboarding`
Functional prototype. It only captures a small profile subset and saves locally. It must become the first-run career profile intake with document import, target roles, compensation, work authorization, work mode, notice period, evidence consent and clear persistence state.

### `/documents`
Functional upload prototype. Major bug: remote deletion is not implemented. Major product gap: extracted text only supports TXT/MD in the browser despite advertising PDF/DOCX. Need server-side extraction, file validation, private signed access and evidence indexing.

### `/profile`
Functional local + Supabase upsert prototype. Needs validation, account identity separation, work authorization/notice period/preferences and canonical evidence controls. Uses legacy ROVA terminology in UI.

### `/resume`
Strongest functional prototype. PDF/DOCX/TXT import, heuristic analysis, save/versioning and builder exist. Problems: local-only resume persistence, simplistic extraction, ATS wording overstates certainty, builder preview is raw text rather than a production resume renderer, and generated content must be formally evidence-bound.

### `/career`
Functional deterministic planning prototype. Salary bands are explicitly heuristics. Needs live market source, confidence, regional context, notice period, work authorization, transferable skills and actual goal linkage.

### `/opportunities`
Functional prototype with Greenhouse/Lever/Ashby ingestion, search, save, duplicate-source detection and preparation handoff. Critical code bug found: the Lever API path parser uses the wrong path indexes for `api.lever.co` URLs, so board/job resolution can fail. This must be fixed and fixture-tested. Fit scoring also needs calibration.

### `/applications`
Functional draft generator, but not a true application tracker/studio. `stages` is declared but unused. Generated copy has unsupported fallbacks such as generic experience/skills language when profile evidence is absent. Needs evidence-bound generation, editable variants, answer provenance, application record persistence and submission state integration.

### `/automation`
Strong control-plane prototype. Durable queue and worker dispatch exist. Problems: UI reads Pro from a client cookie, local profile/preparation data are used to construct worker tasks, platform adapters are contracts rather than verified flows, and the Verify action is informational only. Need entitlement lookup, application package snapshotting, adapter fixtures, evidence inspection and verified-state proof.

### `/insights`
Good product narrative but mostly static data. The displayed application/reply/interview numbers and example interview evidence are hard-coded. It must become a real outcome dashboard fed by persisted application/outcome events.

### `/growth`
Goal planner is useful but currently local/static. Needs durable goals, real market/outcome signals and task completion tracking.

### `/community`
Correct privacy intent and provenance model, but the current signals are seeded/static. Contribution and aggregation are not implemented.

### `/pricing`
Correct beta pricing/access concept. Needs real entitlement state, payment provider, webhook lifecycle, cancellation, billing history, invoice/tax treatment and server-side route enforcement.

### `/review`
Conceptually part of the human-in-the-loop system, but must be audited against actual worker handoff artifacts, not treated as complete merely because the route exists.

## Line-level/static code findings
1. Legacy product names remain in storage types/keys and several UI strings. Technical compatibility is acceptable temporarily, but user-visible copy must be KINDLEAP everywhere.
2. `middleware.ts` trusts `wayo_pro=1`; this is spoofable and is not acceptable for production authorization.
3. `documents/page.tsx` deletes only local state, not the Supabase object/row.
4. `documents/page.tsx` can upload a storage object and then fail DB insertion, leaving an orphaned file.
5. `documents/page.tsx` claims PDF/DOCX career-document handling but browser extraction is only implemented for TXT/MD.
6. `opportunities/page.tsx` uses `RovaProfile` and displays `ROVA / JOB INTELLIGENCE` and `ROVA` footer copy.
7. `app/api/job-source/route.ts` has incorrect Lever API path indexing for `api.lever.co`.
8. `application-engine.ts` has fallback language that can imply candidate experience not present in evidence.
9. `applications/page.tsx` declares unused `stages` and contains legacy WAYO UI copy.
10. `automation/page.tsx` checks Pro using a browser cookie instead of server entitlement state.
11. `automation/page.tsx` sends profile/application answer data directly from local browser storage to the worker; the worker contract should consume a durable, immutable application package snapshot.
12. `insights/page.tsx` contains hard-coded funnel counts and a hard-coded interview evidence example; this is demo content, not outcome intelligence.
13. The current CSS architecture is layered: legacy page-specific light styles plus a global dark override. This creates exactly the inconsistency shown in the supplied screenshots. The correct fix is a shared design system and page-level refactor, not another override layer.
14. `package.json` now has typecheck + production build scripts, and CI has been expanded accordingly. Fresh CI on the current audited commit is green, but browser/device QA remains unproven.

## UI reset specification
KINDLEAP will use one system across every page:
- Near-black base, no white product cards.
- Warm off-white typography.
- One signal accent: orange/red for action/state; restrained lime may be reserved for brand mark only.
- DM Mono-style metadata, consistent scale and labels.
- No generic dashboard sidebar as the default.
- No independent page themes.
- Shared top command/navigation shell.
- Shared page header, section index, action, input, table/list, drawer and empty-state primitives.
- Dense information where decision quality benefits; generous whitespace for primary decisions.
- Mobile-first linear flow with sticky contextual actions where appropriate.
- Accessibility: keyboard navigation, visible focus, semantic controls, contrast, reduced motion, touch targets.

## Release status after audit
The product is NOT launch-ready.

The current codebase is a strong product prototype/control-plane foundation, not a complete production career operating system. The next work is not another feature sprint. It is reconciliation, UI unification, data integrity, real integrations, evidence verification and release testing.

## Definition of done for launch
A feature is launch-complete only when: UI + domain model + persistence + validation + authorization + error handling + telemetry/audit trail + mobile/accessibility QA + integration fixture + regression test + documentation are all present where applicable.
