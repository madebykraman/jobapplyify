create table if not exists public.entitlements (user_id uuid primary key references auth.users(id) on delete cascade, plan text not null default 'free' check(plan in('free','pro')), status text not null default 'active' check(status in('active','paused','cancelled')), source text not null default 'beta_invite' check(source in('beta_invite','subscription','admin')), current_period_end timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
alter table public.entitlements enable row level security;
drop policy if exists "entitlements own row" on public.entitlements;
create policy "entitlements own row" on public.entitlements for select using(auth.uid()=user_id);
create index if not exists entitlements_plan_idx on public.entitlements(plan,status);
create or replace function public.is_pro(p_user_id uuid) returns boolean language sql security definer set search_path=public stable as $$ select exists(select 1 from public.entitlements where user_id=p_user_id and plan='pro' and status='active' and (current_period_end is null or current_period_end>now())); $$;
revoke all on function public.is_pro(uuid) from public,anon,authenticated;
grant execute on function public.is_pro(uuid) to service_role;
