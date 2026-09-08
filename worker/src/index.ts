import { readFile } from 'node:fs/promises'
import { executeTask } from './executor.js'
import type { AutomationTask } from './types.js'

const input = process.argv[2]
if (!input) {
  console.error('Usage: npm run dev -- ./task.json')
  process.exit(1)
}

const task = JSON.parse(await readFile(input, 'utf8')) as AutomationTask
const result = await executeTask(task)
console.log(JSON.stringify(result, null, 2))
