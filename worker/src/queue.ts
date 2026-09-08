import { randomUUID } from 'node:crypto'
import type { AutomationTask, WorkerResult } from './types.js'

type Job = { task: AutomationTask; status: 'queued' | 'running' | 'completed'; result?: WorkerResult; createdAt: string; updatedAt: string }

const jobs = new Map<string, Job>()
const runningAccounts = new Set<string>()

export function enqueueTask(task: AutomationTask) {
  const id = task.id || randomUUID()
  const now = new Date().toISOString()
  jobs.set(id, { task: { ...task, id }, status: 'queued', createdAt: now, updatedAt: now })
  return jobs.get(id)!
}

export function getTask(id: string) { return jobs.get(id) }

export function claimTask(id: string) {
  const job = jobs.get(id)
  if (!job || job.status !== 'queued') return false
  const account = job.task.accountKey || 'default'
  if (runningAccounts.has(account)) return false
  runningAccounts.add(account)
  job.status = 'running'
  job.updatedAt = new Date().toISOString()
  return true
}

export function finishTask(id: string, result: WorkerResult) {
  const job = jobs.get(id)
  if (!job) return
  job.status = 'completed'
  job.result = result
  job.updatedAt = new Date().toISOString()
  runningAccounts.delete(job.task.accountKey || 'default')
}

export function queueSnapshot() { return [...jobs.values()].map(({ task, status, result, createdAt, updatedAt }) => ({ taskId: task.id, status, result, createdAt, updatedAt })) }
