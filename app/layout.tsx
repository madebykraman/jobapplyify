import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WAYO — Your career, in motion.',
  description: 'Career intelligence and application automation for a better job search.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
