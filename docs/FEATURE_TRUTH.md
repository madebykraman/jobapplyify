# KINDLEAP Feature Truth — 2026-09-09

This is the release-facing truth table for the current implementation. `live` means implemented and internally coherent for its current scope. `partial` means usable prototype/infrastructure exists but production integration, persistence, verification or quality gates remain. `mock` means the current surface is illustrative/static. `unavailable` means the capability is not implemented. `unsafe` means it must not be exposed as production functionality until its safety boundary is fixed.

| Capability | Status | Current truth |
|---|---|---|
| Supabase authentication | live | Cookie-backed SSR session foundation is implemented. |
| Pro entitlement | partial | Protected routes now query server-side entitlements; payment lifecycle is not implemented. |
| Resume import | partial | TXT/MD/DOCX/PDF browser extraction exists; structured durable parsing is not complete. |
| Resume intelligence | partial | Current analysis is heuristic, not calibrated market intelligence. |
| Job sources | partial | Greenhouse/Lever/Ashby control-plane support exists; fixture coverage is still required. |
| Applications | partial | Preparation/generation exists; durable application packages and full provenance are still open. |
| Automation | partial | Queue/worker control plane exists; production ATS adapters and independent verification are incomplete. |
| Interview intelligence | mock | Current surface is not backed by real interview-session persistence and inbox ingestion. |
| Outcome intelligence | mock | Current metrics are not a live outcome pipeline. |
| Growth | mock | Current surface is not yet driven by durable outcome-derived intelligence. |
| Community | mock | Current signals are seeded/static; contribution and aggregation are not live. |
| Payments | unavailable | Checkout, webhooks, billing lifecycle and tax/invoice handling are not implemented. |

No mock/partial/unavailable capability is to be described as production-live in the UI or release notes.
