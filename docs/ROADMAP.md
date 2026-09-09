# NAUKRI LABS Product Roadmap — Job Assistant Pivot — 2026-09-10

## Product definition

**NAUKRI LABS is a job assistant.**

It is not a job board and does not compete with LinkedIn, Naukri or other platforms on job discovery. The user brings the opportunity or career problem. NAUKRI LABS handles the work around it: understanding the opportunity, assessing fit, creating application material, preparing or executing repetitive application tasks, and helping the user improve.

Working product line: **Naukri Copilot**.

Core promise: **Give it the job. Let it handle the work.**

Tagline: **Your job assistant.**

Descriptor: **Give it the job. Let it handle the work.**

## Product principles

- No job marketplace or job-search-first experience.
- Candidate claims are grounded in information the candidate provides.
- Public/community information can provide useful directional guidance, but approximate signals must never be presented as certainty.
- The assistant should perform work, not merely explain how the user could perform it.
- Automation remains visible, controllable and interruptible.
- CAPTCHA, sensitive information, ambiguity and unsupported flows require human control.
- Never claim a submission is verified without evidence.
- Free functionality should be genuinely useful; Pro should unlock meaningful convenience and customisation rather than basic dignity.

## Step 1 — Freeze and preserve

The old job-search-first implementation is frozen. Existing authentication, profile, document, resume, application, automation, worker, evidence and persistence infrastructure is retained where it supports the new assistant direction. Job discovery surfaces are no longer product-defining and must not receive new investment.

## Step 2 — Repository audit and migration

Audit every route, component, API, data path and copy surface against the new definition.

Classify each item as:
- Keep: directly supports the assistant.
- Adapt: useful infrastructure but wrong product framing.
- Demote: useful secondary tool, not core navigation.
- Remove: job-board/search-first or misleading functionality.
- Future: valuable but not required for the assistant core.

No feature is marked complete merely because a route exists.

## Step 3 — New information architecture

Primary product surfaces:

1. **Assistant** — the front door. User gives a job link, job description, recruiter message, document or career problem.
2. **Career workspace** — reusable candidate context: profile, experience, skills, projects, preferences, goals and evidence.
3. **Documents / Resume** — LinkedIn PDF to resume, source documents and reusable career material. One basic resume template remains free forever; template selection/customisation is Pro.
4. **Application workspace** — job-specific resumes, cover letters, answers and application packages.
5. **Automation** — controlled execution of supported application flows.
6. **Review** — human approval and handoff surface for consequential or uncertain actions.
7. **Lightweight history/outcomes** — useful records of work already done, without turning NAUKRI LABS into a heavyweight ATS.

Removed from primary product navigation:
- Job search
- Job marketplace
- Generic opportunities discovery

If a user provides a job from outside NAUKRI LABS, supported ingestion can still understand it. That is an input capability, not a discovery product.

## Step 4 — Assistant-first homepage

The homepage must communicate the assistant immediately.

Required message:
- User already found the job.
- NAUKRI LABS handles the difficult/repetitive work around it.
- The user can bring a job, application, document or career problem.
- No claim that NAUKRI LABS is a job marketplace.

Primary CTA: **Open the assistant**.

## Step 5 — Core assistant build

### A. Give context
Accept:
- Supported job URL.
- Pasted job description.
- Application questions.
- Recruiter/company message.
- Existing resume or LinkedIn PDF.
- Career problem or question.

### B. Understand
Produce structured, useful interpretation:
- Responsibilities.
- Required qualifications.
- Preferred qualifications.
- Skills.
- Experience expectations.
- Location/work mode.
- Salary/CTC when available.
- Notice/sponsorship constraints when available.
- Application requirements.

### C. Assess
Compare opportunity against candidate context:
- Strengths.
- Gaps.
- Unknowns.
- Relevant evidence.
- Approximate public/community signals where available.
- Practical next steps.

Never reduce fit to an unexplained score.

### D. Improve
When the candidate is underqualified or uncertain, suggest useful ways to strengthen their position:
- Skills.
- Certifications.
- Courses.
- Projects.
- Portfolio evidence.
- Positioning changes.
- Resume improvements.

Recommendations must distinguish candidate-specific evidence from public/community guidance.

### E. Create
Generate from reusable candidate context:
- Resume/CV.
- Cover letters.
- Short and long introductions.
- Application answers.
- Why this company/role answers.
- Skills/experience answers.
- Supporting statements.
- Other role-specific application material.

### F. Review
Show exactly what is prepared before consequential action.

### G. Act
For supported flows:
- Dry Run.
- Review.
- Hybrid.
- Full Auto for eligible Pro usage.

Automation must stop for CAPTCHA, sensitive data, unknown structures, unsupported flows or other unsafe ambiguity.

### H. Evidence
Persist appropriately redacted evidence for consequential automation and distinguish prepared, submitted, verified and handoff states.

## Step 6 — Career workspace

The profile becomes the reusable source of candidate context.

The user can maintain:
- Identity/contact information.
- Education.
- Experience.
- Skills.
- Projects.
- Achievements.
- Certifications.
- Links.
- Preferences.
- Goals.
- Source documents.

The system must not fabricate a candidate profile for new sessions.

## Step 7 — Resume/document tools

Always-free baseline:
- LinkedIn PDF to one usable resume template.
- Basic resume editing/output.

Pro:
- Multiple templates.
- Template customisation.
- Advanced formatting/customisation where implemented.

Source information remains reusable across jobs.

## Step 8 — Application workspace

An application is created around a user-provided opportunity, not discovered inside a marketplace.

Application packages can contain:
- Selected resume.
- Cover letter.
- Answers.
- Candidate information.
- Relevant experience/projects/skills.
- Supporting information.

Packages preserve job context and candidate evidence.

## Step 9 — Automation

Keep and harden the existing queue/worker architecture.

Supported representative ATS adapters currently include Greenhouse, Lever and Ashby. They remain execution integrations, not discovery products.

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

## Step 10 — Lightweight history

Do not build a complex ATS unless real usage proves it necessary.

Keep enough history to answer:
- What did I ask NAUKRI LABS to do?
- What did it prepare?
- What did I approve?
- What did it actually do?
- What evidence exists?

Outcome tracking is secondary and should remain lightweight until sustained product usage justifies expansion.

## Step 11 — Intelligence hardening

After the assistant core is stable:
- Structured parsing.
- Evidence provenance.
- Answer Library.
- Explainable matching.
- Freshness/duplicate detection for provided job inputs.
- Salary/CTC interpretation.
- Notice, remote and sponsorship context.
- Exclusions/dealbreakers.
- Application quality scoring.
- Public/community directional intelligence.

## Step 12 — Integrations and advanced execution

Later:
- Broader ATS coverage.
- Browser extension for “send this job to NAUKRI LABS”.
- Email/recruiter message ingestion with consent.
- Calendar/interview support with consent.
- Notifications.
- Follow-ups.
- More robust application campaigns.
- Payment and subscription lifecycle.

## Step 13 — Release QA

Before beta:
- Main CI.
- Worker CI.
- Browser E2E.
- Mobile/iPhone E2E.
- Auth/persistence.
- RLS/security.
- Automation safety/recovery.
- Evidence redaction.
- Accessibility.
- Performance.
- Rate limiting.
- Privacy/deletion.
- Observability.

## Step 14 — Beta

Private beta focused on one question:

**Does NAUKRI LABS reliably remove meaningful work from a person's job application process?**

Measure:
- Time saved.
- Task completion.
- Application quality.
- Human handoff quality.
- Automation reliability.
- User trust.
- Repeat usage.

## Current build state after pivot

Completed in this pivot:
- Product definition reset to Job Assistant.
- Homepage repositioned away from job discovery.
- Assistant-first route added with supported job-link ingestion and pasted-job intake.
- Primary navigation repositioned around Assistant, Workspace, Resume, Applications and Pricing.
- Brand descriptor/tagline reset to assistant positioning.
- Existing automation and career infrastructure preserved.

Still required before calling the pivot complete:
- Audit and demote/remove remaining job-search-first surfaces and copy.
- Connect assistant intake to durable application preparation rather than only routing to existing pages.
- Verify profile/document/resume flows under the new assistant information architecture.
- Verify Pro boundaries, especially resume customisation.
- Run main and worker CI on the pivot commit.
- Keep Supabase deployment work paused until the product architecture is stable.

## Build discipline

Before every build, audit the previous roadmap item, repair incomplete work, update README and BUILD_LOG, run verification, then advance. Never mark a feature complete when its external dependency or safety validation is missing. Functionality outranks aesthetics.
