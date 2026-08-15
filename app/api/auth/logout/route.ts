import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function POST(request: NextRequest) {
  let response = NextResponse.json({ ok: true })

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
        response = NextResponse.json({ ok: true })
        response.cookies.set(name, value, options)
      },
      remove(name: string, options: any) {
        request.cookies.delete(name)
        response = NextResponse.json({ ok: true })
        response.cookies.delete(name)
      },
    },
  })

  // Sign out which will clear auth cookies via SSR
  try {
    await supabase.auth.signOut()
  } catch (err) {
    // Continue with logout even if signOut fails
  }

  return response
}
