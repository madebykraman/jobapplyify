# Veyra AI — Jobsuit Observable Parity Matrix

> Benchmark: reproduce observable product behavior and workflow architecture independently. This records public/observable behavior and architectural inference only; it does not assert access to Jobsuit private source, private APIs, credentials, or proprietary implementation.

## Benchmark definition
Target: ~90%+ parity across observable information architecture, primary workflows, interaction states, screen hierarchy, responsive behavior, and feature coverage.

| Dimension | Target |
|---|---:|
| Information architecture | 95%+ |
| Primary workflows | 95%+ |
| Interaction/state behavior | 90%+ |
| Screen hierarchy/layout | 90%+ |
| Responsive behavior | 90%+ |
| Feature coverage | 90%+ |
| Data/model behavior | 85–90%+ |
| AI workflow behavior | 85–90%+ |
| Visual language | 90%+ |

## Surface matrix

| Surface | Observable behavior | Veyra status | Priority |
|---|---|---|---|
| Public acquisition | Explain analyze/tailor/build value; CTA into product | Implemented | P1 |
| Create/import | Start blank or upload existing resume | UI implemented; parsing pending | P0 |
| Template selection | Choose ATS-oriented template before editing | Implemented; 34+ options | P0 |
| Target role | Capture target position during setup | Implemented | P0 |
| Resume naming | Name/version resume | UI implemented | P1 |
| Resume editor | Section navigation, live document, template switching, export | Prototype implemented | P0 |
| AI Agent | Context-aware section feedback and conversational refinement | Prototype implemented | P0 |
| Resume analysis | Overall score + ATS, keywords, impact, readability, relevance + fixes | Prototype; needs six-step parity | P0 |
| Smart suggestions | Review, apply, dismiss changes | Partially implemented | P0 |
| Tailoring | Paste JD, extract requirements, keyword gaps, rewrite bullets, section-level review | Prototype implemented | P0 |
| Tailoring review | Accept/reject proposed edits before applying | Partially implemented | P0 |
| Cover letter | Name → target job → resume → AI improve → format/export | Prototype; needs setup state | P1 |
| Job search | Resume + preferences → search → matched jobs → reasons | Prototype implemented | P0 |
| Job tracker | Track target roles, tailored docs, application progress | Needs richer state model | P0 |
| Pricing/entitlements | Free/Pro/Elite-style quotas and upgrade path | Public pricing shell implemented | P1 |
| PDF export | Download/save resume as PDF | Browser print prototype | P1 |
| Persistence | Resume versions, edits, tailored copies, applications | Not implemented | P0 |
| Auth/account boundary | Public marketing → authenticated workspace | Not implemented | P1 |
| Backend AI pipeline | Analyze/tailor/agent as async operations | Mocked locally | P0 |
| Job ingestion/search backend | Search/index/filter jobs | Mocked locally | P1 |

## Observable setup sequence

1. Create or import resume.
2. Choose template.
3. Enter target job title.
4. Name resume.
5. Open editor.
6. Edit sections with guided/AI assistance.
7. Analyze resume.
8. Review and apply/reject suggestions.
9. Add a job description.
10. Analyze role fit and tailor section-by-section.
11. Review proposed edits.
12. Export the tailored resume.
13. Generate a role-specific cover letter.
14. Discover matching jobs and track application progress.

Public evidence: Jobsuit describes create/import, template choice, target role, naming, editor/agent and download as its builder flow; its analysis page describes score, keyword, ATS, strengths/gaps, structure and improvement feedback; tailoring describes JD analysis, keyword-gap detection, bullet rewriting, natural keyword integration and section-by-section review; job search describes resume upload, preferences, multi-source search and match explanations; cover letters describe name, target job, resume, AI improvement and formatting.

## Inferred architecture for Veyra

- Resume is the canonical document entity.
- ResumeVersion stores immutable or branchable snapshots for tailored variants.
- ResumeSection stores structured content rather than editor HTML.
- Template is presentation-only and should not own resume content.
- Job stores normalized role metadata and source URL/description.
- TailoringRun links one resume version to one job and stores extracted signals plus proposed edits.
- AnalysisRun stores score dimensions and actionable findings.
- Suggestion stores proposed before/after edits with review status.
- CoverLetter links a resume version to a target job.
- Application links a job, resume version and optional cover letter with lifecycle status.
- AI operations should be explicit runs/jobs so the UI can expose loading, success, partial, retry and failure states.
- UI should consume domain state rather than hard-code generated copy.

## Current gap priorities

P0 = persistence + real review/apply state + six-part analysis + tailoring review + job tracker state + real import parsing.

P1 = auth boundary, real PDF generation, cover-letter setup state, entitlement counters, responsive QA.

P2 = deeper job ingestion, richer templates, collaboration/analytics.

## Parity rule

When a protected implementation detail cannot be observed, reproduce the behavior with an independent implementation. Similarity is measured against observable outcomes, not copied source, private endpoints, trademarks, or proprietary assets.