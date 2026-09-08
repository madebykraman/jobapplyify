create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '', headline text not null default '', location text not null default '', email text not null default '', phone text not null default '', years_experience text not null default '', target_salary text not null default '', target_roles text[] not null default '{}', skills text[] not null default '{}', linkedin text not null default '', portfolio text not null default '', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, name text not null, storage_path text not null, mime_type text not null default '', size_bytes bigint not null default 0, extracted_text text not null default '', created_at timestamptz not null default now()
);

create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, name text not null, content text not null default '', source_document_id uuid references public.documents(id) on delete set null, target_role text not null default '', ats_score integer, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.target_roles (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, title text not null, description text not null default '', salary_target text not null default '', status text not null default 'active', created_at timestamptz not null default now()
);

create table if not exists public.automation_jobs (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, company text not null default '', role text not null default '', source text not null default '', application_url text not null, state text not null default 'queued', mode text not null default 'review', attempts integer not null default 0, max_attempts integer not null default 3, handoff text, last_error text, worker_task_id text unique, worker_state text, evidence jsonb not null default '{}'::jsonb, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.automation_events (
  id bigint generated always as identity primary key, user_id uuid not null references auth.users(id) on delete cascade, automation_job_id uuid not null references public.automation_jobs(id) on delete cascade, event_type text not null, state text, message text not null default '', metadata jsonb not null default '{}'::jsonb, created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.documents enable row level security;
alter table public.resumes enable row level security;
alter table public.target_roles enable row level security;
alter table public.automation_jobs enable row level security;
alter table public.automation_events enable row level security;

drop policy if exists "profiles own row" on public.profiles;
create policy "profiles own row" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
drop policy if exists "documents own rows" on public.documents;
create policy "documents own rows" on public.documents for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "resumes own rows" on public.resumes;
create policy "resumes own rows" on public.resumes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "target roles own rows" on public.target_roles;
create policy "target roles own rows" on public.target_roles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "automation jobs own rows" on public.automation_jobs;
create policy "automation jobs own rows" on public.automation_jobs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "automation events own rows" on public.automation_events;
create policy "automation events own rows" on public.automation_events for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public) values ('documents', 'documents', false) on conflict (id) do nothing;
drop policy if exists "documents storage own objects" on storage.objects;
create policy "documents storage own objects" on storage.objects for all using (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text) with check (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);
