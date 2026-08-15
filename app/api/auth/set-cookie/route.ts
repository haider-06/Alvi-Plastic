import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const accessToken = body.access_token
    const refreshToken = body.refresh_token

    if (!accessToken) {
      return NextResponse.json({ error: 'Missing access_token' }, { status: 400 })
    }

    let response = NextResponse.json({ ok: true })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
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

    // Set session which will trigger cookie updates via the cookie handler
    const expiresAt = Math.floor(Date.now() / 1000) + 3600 * 24 * 7 // 7 days
    
    // Store tokens using Supabase auth's setSession method if available
    // Otherwise, manually set cookies
    const session = {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: expiresAt,
      expires_in: 3600 * 24 * 7,
      token_type: 'bearer',
      type: 'session',
      user: {} as any,
    }

    // Try using setSession, fall back to manual cookie setting
    try {
      await supabase.auth.setSession(session as any)
    } catch {
      // If setSession is not available, manually set the cookies
      const cookieName = 'sb-' + supabaseUrl!.split('/').pop() + '-auth-token'
      response.cookies.set(cookieName, JSON.stringify({ session }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 3600 * 24 * 7,
      })
    }

    return response
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Invalid request' },
      { status: 400 }
    )
  }
}
