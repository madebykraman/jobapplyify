# NAUKRI LABS Product Roadmap — Job Assistant Pivot — 2026-09-24

## Product definition

**NAUKRI LABS is a job assistant.**

Working product line: **Naukri Copilot**.

Core promise: **Give it the job. Let it handle the work.**

The user brings the opportunity or career problem. NAUKRI LABS handles the work around it: understanding, assessment, improvement, creation, review and controlled execution.

NAUKRI LABS is **not** a job board and does not compete with LinkedIn, Naukri, Indeed or similar platforms on discovery.

## Product jobs

1. **Understand** — turn a job, application, recruiter message or career problem into useful structured context.
2. **Assess** — compare the opportunity with the candidate's actual evidence and explain strengths, gaps and unknowns.
3. **Improve** — identify practical skills, certifications, courses, projects, positioning or document improvements using candidate evidence plus clearly labelled public/community signals.
4. **Create** — produce resumes, CVs, cover letters, answers and application material from reusable candidate context.
5. **Review** — make consequential output visible before action.
6. **Act** — perform repetitive supported application work with human control and safe handoff.
7. **Learn** — retain lightweight history and useful outcome signals without becoming a heavyweight ATS.

## Non-negotiable principles

- No job marketplace or job-search-first experience.
- The assistant must perform useful work, not merely explain how the user could do it.
- Candidate claims are grounded in information the candidate provides.
- Public/community information is directional unless independently verified.
- Never turn approximate fit guidance into a false precise score.
- Automation is visible, controllable and interruptible.
- CAPTCHA, sensitive data, ambiguity and unsupported flows require human control.
- Never claim verified submission without evidence.
- Basic usefulness remains free; Pro monetises meaningful customisation, leverage and convenience.
- Design is part of the product. Simplicity must come from excellent information architecture and interaction design, not from removing useful capability.

## Research gate — COMPLETE / LIVING

Research baseline: `docs/PRODUCT_RESEARCH_2026-09-24.md`

Research inputs now include:
- Competitor/product teardowns.
- Open-source operating implementations.
- Community demand and failure reports.
- UX and conversion patterns.
- Privacy/local-first architecture patterns.
- Automation and ATS implementation patterns.

Key adopted lessons:
- Persistent candidate context should power every downstream action.
- Browser-context assistance is valuable because repetitive work happens inside application forms.
- Deterministic field filling should be used before AI interpretation.
- ATS-specific adapters should be separated from generic form handling.
- Unknown fields should be learned/reviewed rather than guessed.
- AI generation must be evidence-bound.
- Human review is a product feature, not an error state.
- First value should be useful work completed, not merely account creation.
- The product should optimise for work removed and quality, not application volume.
- Community stories and observed failures should feed product decisions.
- Competitor marketing claims remain claims until independently verified.

## Phase 1 — Product reset — COMPLETE

- Job Assistant positioning established.
- Job discovery removed from the product thesis.
- Assistant-first information architecture established.
- Existing auth/profile/document/resume/application/automation infrastructure retained where useful.
- Old job-search-first surfaces classified for migration.

## Phase 2 — Assistant-first experience — IN PROGRESS

Required first-session path:

**Land → understand promise → bring context → receive useful work → continue**

Accepted context:
- Job URL.
- Job description.
- Application questions.
- Recruiter/company message.
- Existing resume.
- LinkedIn PDF.
- Career problem/question.

The assistant must eventually produce real structured work rather than only route to other pages.

## Phase 3 — Career context

Reusable candidate source of truth:
- Identity/contact.
- Education.
- Experience.
- Skills.
- Projects.
- Achievements.
- Certifications.
- Links.
- Preferences.
- Goals.
- Documents.
- Writing samples.

New sessions must never receive fabricated candidate data.

## Phase 4 — Resume/document product

Free forever:
- LinkedIn PDF → one usable resume template.
- Basic editing and export.

Pro:
- Multiple templates.
- Template selection.
- Template customisation.
- Advanced formatting/customisation.

The career source data remains reusable across applications.

## Phase 5 — Application creation

For a user-provided opportunity:
- Parse the role.
- Select relevant candidate evidence.
- Create tailored resume/CV.
- Create cover letter.
- Create application answers.
- Create supporting statements.
- Preserve the job/application context.
- Show the evidence behind consequential claims.

## Phase 6 — Fit + improvement intelligence

Provide:
- Strengths.
- Gaps.
- Unknowns.
- Evidence.
- Requirements.
- Practical next steps.
- Public/community directional signals.

Do not expose a simplistic unexplained score as the primary answer.

## Phase 7 — Controlled execution

Existing queue/worker architecture remains.

Current representative adapters:
- Greenhouse.
- Lever.
- Ashby.

Required execution states:
- Dry Run.
- Review.
- Hybrid.
- Full Auto for eligible Pro usage.

Required controls:
- Queue.
- Start.
- Pause.
- Resume.
- Retry.
- Cancel.
- Human handoff.
- Lease/heartbeat/recovery.
- Stale-worker rejection.
- Independent verification.
- Redacted evidence.

## Phase 8 — Lightweight history

Keep only enough history to answer:
- What did I give NAUKRI LABS?
- What did it prepare?
- What did I approve?
- What did it do?
- What evidence exists?

Do not build a heavyweight ATS unless usage demonstrates that users need it.

## Phase 9 — Browser extension / external context

Later:
- Send a job to NAUKRI LABS from the browser.
- Detect application pages.
- Bring assistant context into the current browser page.
- Preserve the current page while the assistant works.
- Email/recruiter-message ingestion with explicit consent.

## Phase 10 — Intelligence hardening

- Structured parsing.
- Evidence provenance.
- Answer Library.
- Explainable matching.
- Salary/CTC interpretation.
- Notice/remote/sponsorship context.
- Exclusions/dealbreakers.
- Freshness/duplicate handling for supplied inputs.
- Application quality checks.
- Community intelligence with source/uncertainty labels.

## Phase 11 — Outcome loop

Only after the assistant core proves useful:
- Interview preparation.
- Interview/rejection learning.
- Offer comparison.
- Negotiation support.
- Outcome-based improvement.
- Optional lightweight follow-ups.

## Phase 12 — Monetisation

- Authoritative Pro entitlement.
- Payment provider.
- Checkout.
- Subscription lifecycle.
- Billing/invoices.
- India tax handling.
- International pricing.

## Phase 13 — Release quality

Before beta:
- Main CI.
- Worker CI.
- Browser E2E.
- Mobile/iPhone E2E.
- Auth/persistence.
- RLS/security.
- Automation recovery/safety.
- Evidence redaction.
- Accessibility.
- Performance.
- Rate limiting.
- Privacy/deletion.
- Observability.

## Phase 14 — Private beta

Primary question:

**Does NAUKRI LABS reliably remove meaningful work from a person's application process?**

Measure:
- Time saved.
- First-value completion.
- Task completion.
- Application quality.
- Handoff quality.
- Automation reliability.
- Trust.
- Repeat usage.
- Pro conversion from real leverage, not artificial restriction.

## Design quality gate

Every primary screen must satisfy:
- One clear purpose.
- Immediate comprehension.
- Minimal interaction cost.
- Strong hierarchy.
- Excellent empty/loading/error/success states.
- No decorative metrics without utility.
- No dashboard clutter.
- Mobile-first interaction integrity.
- Subtle motion only where it improves understanding.
- Premium visual detail without visual noise.

The target is **simple product + exceptional UX + top-tier visual execution**.

## Current status

Completed:
- Product definition reset.
- Assistant-first homepage.
- Assistant intake route.
- Job URL/pasted-description intake.
- Career/application/automation foundations retained.
- Research baseline added.
- Research-driven roadmap rewritten.

Still required:
- Complete repository-wide migration against this roadmap.
- Make assistant intake create durable application context rather than only route.
- Implement/verify actual structured understanding and assessment outputs.
- Complete LinkedIn PDF → free resume flow and Pro customisation boundary.
- Audit remaining job-search-first routes/copy and demote/remove them.
- Complete final CI and browser verification.
- Only then reconnect the deployment Supabase project and proceed toward beta.

## Build discipline

Before every build:
1. Audit the previous roadmap item.
2. Audit research/competitor/community findings relevant to that item.
3. Repair incomplete work.
4. Update README and BUILD_LOG.
5. Run verification.
6. Only then advance.

Never mark a feature complete because a route exists. Functionality, evidence and user value outrank implementation count.