# ROVA Browser Worker

Build 0.8 foundation for browser-side application execution. This package is intentionally separate from the Vercel control plane because persistent browser sessions and Playwright execution do not belong inside a Vercel request lifecycle.

## Local setup

```bash
cd worker
npm install
npx playwright install chromium
```

Create a task JSON outside the repository. Never commit credentials, cookies or session directories.

```json
{
  "id": "task_001",
  "company": "Example",
  "role": "Product Designer",
  "applicationUrl": "https://example.com/apply",
  "mode": "dry-run",
  "candidate": {
    "name": "Candidate Name",
    "email": "candidate@example.com",
    "phone": "+91...",
    "location": "Patna, India",
    "headline": "Product Designer",
    "resumePath": "/absolute/path/resume.pdf"
  }
}
```

Run:

```bash
npm run dev -- ./task.json
```

`dry-run` is the default development path. `review` prepares a form but never submits. `full-auto` may submit only after trusted form detection; CAPTCHA, sensitive questions, unknown forms and unsupported flows always hand off to a human. Successful navigation is never treated as proof of submission.

## Account/session boundary

The user supplies and controls their own platform accounts and any required secrets. The worker stores persistent browser sessions under `ROVA_SESSION_DIR` and must run with a private filesystem. Credentials must be injected through the runtime/session mechanism, never committed to GitHub or sent through chat.

## Current boundary

This is the execution foundation, not production-grade platform coverage. Adapter-specific selectors, queue/API integration, evidence capture, independent submission verification and production deployment are subsequent hardening work.
