import { createServer } from 'node:http'
import { executeTask } from './executor.js'
import type { AutomationTask } from './types.js'

const port = Number(process.env.ROVA_WORKER_PORT || 8787)
const token = process.env.ROVA_WORKER_TOKEN || ''
const maxBody = 256 * 1024

async function readBody(req: import('node:http').IncomingMessage) {
  let body = ''
  for await (const chunk of req) {
    body += chunk.toString()
    if (Buffer.byteLength(body, 'utf8') > maxBody) throw new Error('Request body too large.')
  }
  return body
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
  if (token && req.headers.authorization !== `Bearer ${token}`) {
    res.statusCode = 401
    res.end(JSON.stringify({ error: 'Unauthorized.' }))
    return
  }
  try {
    const task = JSON.parse(await readBody(req)) as AutomationTask
    if (!task.id || !task.applicationUrl || !task.mode || !task.candidate?.name || !task.candidate?.email) throw new Error('Invalid automation task.')
    const result = await executeTask(task)
    res.statusCode = result.state === 'failed' ? 500 : 200
    res.end(JSON.stringify(result))
  } catch (error) {
    res.statusCode = 400
    res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Invalid task.' }))
  }
})

server.listen(port, () => console.log(`ROVA browser worker listening on :${port}`))
