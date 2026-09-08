import { createServer } from 'node:http'
import { executeTask } from './executor.js'
import type { AutomationTask, WorkerResult, WorkerMode } from './types.js'

const port = Number(process.env.ROVA_WORKER_PORT || 8787)
const token = process.env.ROVA_WORKER_TOKEN || ''
const maxBody = 256 * 1024
const modes = new Set<WorkerMode>(['dry-run', 'review', 'full-auto'])
const activeAccounts = new Set<string>()
const jobs = new Map<string, WorkerResult | { state: 'queued' | 'running'; taskId: string }>()

async function readBody(req: import('node:http').IncomingMessage) {
  let body = ''
  for await (const chunk of req) {
    body += chunk.toString()
    if (Buffer.byteLength(body, 'utf8') > maxBody) throw new Error('Request body too large.')
  }
  return body
}

function validUrl(value: unknown) {
  try {
    const url = new URL(String(value))
    return url.protocol === 'https:'
  } catch {
    return false
  }
}

function json(res: import('node:http').ServerResponse, status: number, data: unknown) {
  res.statusCode = status
  res.end(JSON.stringify(data))
}

const server = createServer(async (req, res) => {
  res.setHeader('content-type', 'application/json')
  if (req.method === 'GET' && req.url === '/health') {
    json(res, 200, { ok: true, service: 'rova-browser-worker', jobs: jobs.size })
    return
  }

  const taskMatch = req.url?.match(/^\/tasks\/([^/]+)$/)
  if (req.method === 'GET' && taskMatch) {
    if (!token || req.headers.authorization !== `Bearer ${token}`) return json(res, 401, { error: 'Unauthorized.' })
    const job = jobs.get(taskMatch[1])
    return job ? json(res, 200, job) : json(res, 404, { error: 'Task not found.' })
  }

  if (req.method !== 'POST' || req.url !== '/tasks') return json(res, 404, { error: 'Not found.' })
  if (!token || req.headers.authorization !== `Bearer ${token}`) return json(res, 401, { error: 'Unauthorized.' })

  let task: AutomationTask
  try {
    task = JSON.parse(await readBody(req)) as AutomationTask
    if (!task?.id || !task.applicationUrl || !modes.has(task.mode) || !validUrl(task.applicationUrl)) throw new Error('Invalid automation task.')
    if (!task.candidate?.name || !task.candidate?.email) throw new Error('Candidate name and email are required.')
    if (task.id.length > 128 || task.company.length > 200 || task.role.length > 200) throw new Error('Task metadata is too long.')
    if (task.accountKey && !/^[a-zA-Z0-9_-]{1,128}$/.test(task.accountKey)) throw new Error('Invalid account key.')
    if (jobs.has(task.id)) return json(res, 409, { error: 'Task already exists.', task: jobs.get(task.id) })
  } catch (error) {
    return json(res, 400, { error: error instanceof Error ? error.message : 'Invalid task.' })
  }

  const account = `${task.accountKey || 'unscoped'}:${new URL(task.applicationUrl).origin}`
  if (activeAccounts.has(account)) return json(res, 409, { error: 'A browser task is already running for this account and origin.' })

  jobs.set(task.id, { state: 'queued', taskId: task.id })
  activeAccounts.add(account)
  void executeTask(task).then(result => jobs.set(task.id, result)).catch(error => jobs.set(task.id, {
    taskId: task.id,
    state: 'failed',
    url: task.applicationUrl,
    adapter: 'unknown',
    message: error instanceof Error ? error.message : 'Worker execution failed.',
  })).finally(() => activeAccounts.delete(account))

  return json(res, 202, { taskId: task.id, state: 'queued', statusPath: `/tasks/${encodeURIComponent(task.id)}` })
})

server.listen(port, () => console.log(`ROVA browser worker listening on :${port}`))
