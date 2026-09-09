-- NAUKRI LABS Phase 14: reclaim abandoned worker leases before claiming new work.
create or replace function public.recover_automation_jobs() returns integer
language plpgsql security definer set search_path=public as $$
declare recovered integer;
begin
  with stale as (
    select id, user_id, attempts, max_attempts
    from public.automation_jobs
    where state='running' and lease_expires_at is not null and lease_expires_at < now()
    for update skip locked
  ), changed as (
    update public.automation_jobs j
    set state=case when s.attempts < s.max_attempts then 'queued' else 'failed' end,
        lease_owner=null,
        lease_expires_at=null,
        last_error=case when s.attempts < s.max_attempts then 'Worker lease expired; job returned to queue.' else 'Worker lease expired; maximum attempts reached.' end,
        next_attempt_at=case when s.attempts < s.max_attempts then now() else j.next_attempt_at end,
        updated_at=now()
    from stale s
    where j.id=s.id
    returning j.id,j.user_id,j.state,j.last_error
  )
  insert into public.automation_events(user_id,automation_job_id,event_type,state,message,metadata)
  select user_id,id,'lease-recovered',state,last_error,jsonb_build_object('reason','expired-lease') from changed;
  get diagnostics recovered = row_count;
  return recovered;
end;
$$;
revoke all on function public.recover_automation_jobs() from public,anon,authenticated;
grant execute on function public.recover_automation_jobs() to service_role;

create or replace function public.claim_automation_job(p_worker_id text,p_lease_seconds integer default 120) returns setof public.automation_jobs language plpgsql security definer set search_path=public as $$
declare claimed public.automation_jobs;
begin
  if p_worker_id is null or p_worker_id !~ '^[A-Za-z0-9_-]{1,128}$' then raise exception 'Invalid worker id'; end if;
  perform public.recover_automation_jobs();
  update public.automation_jobs j set state='running',lease_owner=p_worker_id,lease_expires_at=now()+make_interval(secs=>greatest(30,least(p_lease_seconds,900))),attempts=j.attempts+1,updated_at=now()
  where j.id=(select q.id from public.automation_jobs q join public.profiles p on p.id=q.user_id where q.state in('queued','failed') and q.attempts<q.max_attempts and q.next_attempt_at<=now() and(q.lease_expires_at is null or q.lease_expires_at<now()) and p.automation_paused=false order by q.created_at for update of q skip locked limit 1)
  returning * into claimed;
  if claimed.id is not null then return next claimed; end if;
  return;
end;
$$;
revoke all on function public.claim_automation_job(text,integer) from public,anon,authenticated;
grant execute on function public.claim_automation_job(text,integer) to service_role;
