import type { AutomationTask, WorkerResult } from './types.js'

type StoredJob = { task: AutomationTask; state: 'queued' | 'running' | 'completed'; result?: WorkerResult; createdAt: string; updatedAt: string }

const jobs = new Map<string, StoredJob>()
const locks = new Set<string>()

export function enqueue(task: AutomationTask) {
  const now = new Date().toISOString()
  const job = { task, state: 'queued' as const, createdAt: now, updatedAt: now }
  jobs.set(task.id, job)
  return job
}

export function getJob(id: string) { return jobs.get(id) }

export function claim(id: string) {
  const job = jobs.get(id)
  if (!job || job.state !== 'queued') return false
  const key = job.task.accountKey || 'default'
  if (locks.has(key)) return false
  locks.add(key)
  job.state = 'running'
  job.updatedAt = new Date().toISOString()
  return true
}

export function complete(id: string, result: WorkerResult) {
  const job = jobs.get(id)
  if (!job) return
  job.state = 'completed'
  job.result = result
  job.updatedAt = new Date().toISOString()
  locks.delete(job.task.accountKey || 'default')
}

export function listJobs() { return [...jobs.values()] }
