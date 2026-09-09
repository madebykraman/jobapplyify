# Current Functional Reconciliation — 2026-09-09

This document supersedes stale status statements in the historical master audit. The master audit remains useful as a record of earlier product decisions and findings.

## Verified in repository

- NAUKRI LABS is the canonical user-facing brand.
- Homepage is now a product overview, not only a hero: it explains the product loop, capabilities, evidence rules and available workspace areas.
- Core web CI currently passes on the latest completed control-plane run.
- Worker CI is configured to install Chromium, build the worker and run browser fixture tests.
- Saved roles and applications have durable database models and per-user RLS in the repository migration.
- Worker evidence is redacted before screenshot/HTML persistence.
- Worker submission verification uses an independent browser context and strong confirmation signals before returning `verified`.
- Worker control-plane authentication was corrected so worker job-state/heartbeat requests use the worker token rather than the callback token.
- Worker lease heartbeat was added for long browser tasks.
- A durable expired-lease recovery migration was added. It must be applied to the same Supabase project used by the deployment before it is considered operationally complete.
- The previously reported Lever API path indexing issue is not present in the current `app/api/job-source/route.ts`: `api.lever.co/v0/postings/{site}/{posting}` is parsed as `p[2]` and `p[3]`. It should not be treated as an outstanding bug.

## Still genuinely open

- The connected Supabase project available during this audit does not contain the application's `profiles`/`automation_jobs` tables, so database migration application could not be verified against that project. The repository migration is present and must be applied to the deployment's actual Supabase project.
- Live ATS validation remains environment-dependent.
- Platform-specific ATS selectors and account/session flows need broader production fixtures before Full Auto can be considered production-ready.
- Browser handoff UX/session bootstrap remains incomplete.
- Profile/document/resume edge-case validation and legacy local-storage migration need browser testing.
- Payment, inbox/interview, community aggregation and extension integrations remain provider-dependent.
- Accessibility, performance, rate limiting, privacy/deletion, observability and dependency QA remain release work.

## Important correction

Do not use the historical master audit's old branding or old visual-system recommendations as current requirements. The current product direction is NAUKRI LABS with a simple, minimal, functional interface. Technical legacy identifiers may remain in environment variable names until a safe migration removes them.
