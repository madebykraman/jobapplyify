# JOBSUIT AI — Independent Recreation

A Jobsuit-style AI resume product focused on three jobs: build a resume, understand how it performs, and tailor it to a specific role.

Reference studied: https://jobsuit.ai/

This repository is an independent recreation/prototype. It does not use Jobsuit's private source code, proprietary assets, or claim affiliation.

## Product

Core loop:
Create → Analyze → Tailor → Refine → Apply

Primary surfaces:
- Resume Builder — import or create a resume, edit the source, save versions and print/save PDF.
- Resume Tailoring — compare a resume with a supplied job description and expose matched/missing signals.
- Resume Analysis / Career — inspect structure, keywords, evidence and improvement areas.
- Pricing — Free / Pro / Elite product structure inspired by the reference.
- Existing application/auth/persistence infrastructure remains available for later expansion.

## Reference-derived product structure

The public Jobsuit site presents resume analysis, job-specific tailoring, an AI resume agent, ATS-oriented templates, cover letters and application tracking as the core workflow. Its public pricing page currently exposes Free, Pro and Elite tiers.

The recreation follows that observable information architecture while using original implementation, copy and UI assets.

## Design direction

The build now intentionally moves away from the previous NAUKRI LABS assistant-first visual language.

Target:
- Clean SaaS landing page.
- Large editorial hero.
- Soft neutral/lavender product surfaces.
- Dark high-contrast primary actions.
- Resume/product UI shown directly in the marketing page.
- Feature grid.
- Before/after proof section.
- Three-step workflow.
- Testimonials.
- FAQ.
- Strong final CTA.
- Mobile-responsive builder workspace.

## Current implementation

- Jobsuit-style landing page rebuilt.
- Brand metadata changed to JOBSUIT AI prototype.
- Resume Builder rebuilt into a dedicated builder workspace.
- PDF/DOCX/TXT/Markdown resume import retained.
- Resume analysis remains deterministic and evidence-bound.
- Pricing rebuilt around Free / Pro / Elite.
- Existing authentication, Supabase persistence and application infrastructure remain in the repository for future product work.

## Important

Do not use the unrelated minimical-drop Supabase project for this product.

Billing remains prototype-only. No payment is taken from the pricing page.

## Verification

The latest changes are pushed directly to main, as requested. Final GitHub Actions status still needs direct verification from the repository's push-triggered workflow; the connected workflow-run integration does not expose those push runs reliably.

## Documentation

- docs/ROADMAP.md
- docs/BUILD_LOG.md
- docs/PRODUCT_RESEARCH_2026-09-24.md

## Build discipline

Before every build: audit the previous roadmap, inspect the live reference when relevant, repair incomplete work, update README and BUILD_LOG, then verify before advancing.