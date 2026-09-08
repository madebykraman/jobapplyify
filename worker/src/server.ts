import { createServer } from 'node:http'
import { executeTask } from './executor.js'
import type { AutomationTask, WorkerMode } from './types.js'

const port = Number(process.env.ROVA_WORKER_PORT || 8787)
const token = process.env.ROVA_WORKER_TOKEN || ''
const maxBody = 256 * 1024
const modes = new Set<WorkerMode>(['dry-run', 'review', 'full-auto'])
const activeAccounts = new Set<string>()

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

const server = createServer(async (req, res) => {
  res.setHeader('content-type', 'application/json')
  if (req.method === 'GET' && req.url === '/health') {
    res.end(JSON.stringify({ ok: true, service: 'rova-browser-worker' }))
    return
  }
  if (req.method !== 'POST' || req.url !== '/tasks') {
    res.statusCode = 404
    res.end(JSON.stringify({ error: 'Not found.' }))
    return
  }
  if (!token || req.headers.authorization !== `Bearer ${token}`) {
    res.statusCode = 401
    res.end(JSON.stringify({ error: 'Unauthorized.' }))
    return
  }

  let task: AutomationTask
  try {
    task = JSON.parse(await readBody(req)) as AutomationTask
    if (!task?.id || !task.applicationUrl || !modes.has(task.mode) || !validUrl(task.applicationUrl)) throw new Error('Invalid automation task.')
    if (!task.candidate?.name || !task.candidate?.email) throw new Error('Candidate name and email are required.')
    if (task.id.length > 128 || task.company.length > 200 || task.role.length > 200) throw new Error('Task metadata is too long.')
    if (task.accountKey && !/^[a-zA-Z0-9_-]{1,128}$/.test(task.accountKey)) throw new Error('Invalid account key.')
  } catch (error) {
    res.statusCode = 400
    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid task.' }))
    return
  }

  const account = `${task.accountKey || 'unscoped'}:${new URL(task.applicationUrl).origin}`
  if (activeAccounts.has(account)) {
    res.statusCode = 409
    res.end(JSON.stringify({ error: 'A browser task is already running for this account and origin.' }))
    return
  }
  activeAccounts.add(account)
  try {
    const result = await executeTask(task)
    res.statusCode = result.state === 'failed' ? 500 : 200
    res.end(JSON.stringify(result))
  } catch (error) {
    res.statusCode = 500
    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Worker execution failed.' }))
  } finally {
    activeAccounts.delete(account)
  }
})

server.listen(port, () => console.log(`ROVA browser worker listening on :${port}`))
