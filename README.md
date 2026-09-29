# Veyra AI

A ground-up, independently reconstructed AI career workspace based on the publicly observable product model of Jobsuit AI.

This is a rebuild, not a continuation of the former Naukri Labs application.

## Product model

Create / import → choose template → target role → name resume → edit → AI agent → analyze → tailor → export → cover letter / job search / application workflow.

## Current application

- `/` — public acquisition site
- `/workspace` — first-run resume onboarding + editor
- `/workspace?view=analysis` — resume analysis
- `/workspace?view=tailor` — role-specific tailoring
- `/workspace?view=agent` — AI resume agent
- `/workspace?view=templates` — 34-template library
- `/workspace?view=cover` — cover letter workspace
- `/workspace?view=jobs` — AI job search
- `/pricing` — pricing

## Rebuild principles

The active application tree was replaced rather than layered over the previous product. The visual language, route model, editor shell, onboarding flow and feature surfaces are independently implemented.

Jobsuit private/proprietary source code, private APIs and proprietary assets are not copied. Publicly observable product behavior and information architecture are used as the reconstruction reference.

Veyra AI is an internal working brand and is not affiliated with Jobsuit AI.

## Next implementation layer

Wire the reconstructed UI to persistence, authentication, structured resume data, PDF rendering, AI providers, Supabase, job data, billing and production-grade application tracking.