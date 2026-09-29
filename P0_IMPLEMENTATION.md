# Veyra P0 implementation

## Implemented

- Structured resume domain model.
- Resume versions with explicit snapshots.
- Local persistence for resumes and applications.
- PDF/DOCX text extraction route.
- Structured section extraction from imported text.
- Persistent section editor.
- Version save workflow.
- Application tracker with lifecycle states.
- Supabase schema with ownership RLS for resumes, versions and applications.
- Supabase browser client foundation.

## Remaining environment step

The database schema is committed at `supabase/schema.sql`. The project still needs a dedicated Supabase project URL/publishable key wired through `.env.local`.

The current UI deliberately works without Supabase by using localStorage, so the product remains usable while the hosted persistence layer is provisioned.

## Data model

`resumes` → canonical resume metadata.

`resume_versions` → immutable/branchable document snapshots.

`applications` → application lifecycle records linked to an optional resume version.

The next backend step is replacing the local-store adapter with the Supabase adapter while retaining the same domain model.
