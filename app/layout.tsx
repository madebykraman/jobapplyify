import './globals.css'
import './kindleap-dark.css'
import type { Metadata } from 'next'
import { BRAND } from '@/lib/brand'
import KindleapShell from '@/components/kindleap-shell'

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description: BRAND.descriptor,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><KindleapShell>{children}</KindleapShell></body></html>
}
