-- NAUKRI LABS Phase 14: durable saved roles and application snapshots.
-- Run after schema.sql and build11_entitlements.sql.
create table if not exists public.saved_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  job_key text not null,
  job_snapshot jsonb not null default '{}'::jsonb,
  saved_at timestamptz not null default now(),
  unique(user_id, job_key)
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  job_key text not null,
  job_snapshot jsonb not null default '{}'::jsonb,
  package_snapshot jsonb not null default '{}'::jsonb,
  status text not null default 'prepared' check(status in ('prepared','review','applied','verified','rejected','withdrawn')),
  applied_at timestamptz,
  verified_at timestamptz,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, job_key)
);
create index if not exists applications_user_updated_idx on public.applications(user_id,updated_at desc);

alter table public.saved_roles enable row level security;
alter table public.applications enable row level security;
drop policy if exists "saved roles own rows" on public.saved_roles;
create policy "saved roles own rows" on public.saved_roles for all using(auth.uid()=user_id) with check(auth.uid()=user_id);
drop policy if exists "applications own rows" on public.applications;
create policy "applications own rows" on public.applications for all using(auth.uid()=user_id) with check(auth.uid()=user_id);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$ begin new.updated_at=now(); return new; end; $$;
drop trigger if exists applications_touch_updated_at on public.applications;
create trigger applications_touch_updated_at before update on public.applications for each row execute function public.touch_updated_at();
