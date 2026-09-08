import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ROVA — Career automation, with judgment',
  description: 'A focused command center for discovering, preparing and tracking job applications.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}