import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = body.access_token;
    if (!token) return NextResponse.json({ error: 'no token' }, { status: 400 });
    const res = NextResponse.json({ ok: true });
    // Set cookie for 7 days
    res.cookies.set('sb_access_token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (err) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }
}
