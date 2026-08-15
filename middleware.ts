import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return response
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        request.cookies.set(name, value)
        response = NextResponse.next({ request })
        response.cookies.set(name, value, options)
      },
      remove(name: string, options: any) {
        request.cookies.delete(name)
        response = NextResponse.next({ request })
        response.cookies.delete(name)
      },
    },
  })

  const { data: { session } } = await supabase.auth.getSession()
  const pathname = request.nextUrl.pathname

  // 1. Allow login route
  if (pathname === '/admin/login') {
    if (session) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
    return response
  }

  // 2. Protect all other admin routes
  if (pathname.startsWith('/admin') && !session) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
