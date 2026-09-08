import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | WAYO',
    default: 'WAYO — Your career, in motion.',
  },
  description: 'Career intelligence and application automation. Find the right move, prepare with evidence, and stay in control.',
  applicationName: 'WAYO',
  keywords: ['career intelligence', 'job search', 'resume', 'ATS', 'job applications', 'career automation'],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
