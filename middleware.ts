import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const proPaths = ['/resume', '/career', '/applications', '/automation', '/insights', '/profile', '/review', '/growth', '/community']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const needsPro = proPaths.some(path => pathname === path || pathname.startsWith(`${path}/`))
  if (!needsPro) return NextResponse.next()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return NextResponse.next()

  let response = NextResponse.next({ request })
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() { return request.cookies.getAll() },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value)
          response.cookies.set(name, value, options)
        })
      },
    },
  })

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    const redirect = request.nextUrl.clone()
    redirect.pathname = '/auth'
    redirect.searchParams.set('mode', 'sign-in')
    redirect.searchParams.set('next', pathname)
    return NextResponse.redirect(redirect)
  }

  const { data: entitlement } = await supabase
    .from('entitlements')
    .select('plan,status,period_end')
    .eq('user_id', user.id)
    .maybeSingle()

  const active = entitlement?.plan === 'pro' && entitlement?.status === 'active' &&
    (!entitlement?.period_end || new Date(entitlement.period_end).getTime() > Date.now())

  if (!active) {
    const redirect = request.nextUrl.clone()
    redirect.pathname = '/pricing'
    redirect.searchParams.set('next', pathname)
    return NextResponse.redirect(redirect)
  }

  return response
}

export const config = { matcher: ['/resume/:path*', '/career/:path*', '/applications/:path*', '/automation/:path*', '/insights/:path*', '/profile/:path*', '/review/:path*', '/growth/:path*', '/community/:path*'] }
