import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const proPaths = ['/resume', '/career', '/applications', '/automation', '/insights', '/profile']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const needsPro = proPaths.some(path => pathname === path || pathname.startsWith(`${path}/`))
  if (!needsPro) return NextResponse.next()
  if (request.cookies.get('wayo_pro')?.value === '1') return NextResponse.next()
  const url = request.nextUrl.clone()
  url.pathname = '/auth'
  url.searchParams.set('mode', 'sign-up')
  url.searchParams.set('next', pathname)
  return NextResponse.redirect(url)
}

export const config = { matcher: ['/resume/:path*', '/career/:path*', '/applications/:path*', '/automation/:path*', '/insights/:path*', '/profile/:path*'] }
