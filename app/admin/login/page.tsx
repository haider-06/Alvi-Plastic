'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await supabase.auth.signInWithPassword({ email, password });
    if (res.error || !res.data.session) {
      setError(res.error?.message || 'Login failed');
      setLoading(false);
      return;
    }
    // Send token to server to set httpOnly cookie for middleware
    await fetch('/api/auth/set-cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ access_token: res.data.session.access_token })
    });
    setLoading(false);
    // Refresh to sync auth cookie with Server Components and Middleware
    router.refresh();
    router.push('/admin/dashboard');
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleLogin} className="space-y-3">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border rounded px-3 py-2" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full border rounded px-3 py-2" />
        {error && <div className="text-red-600">{error}</div>}
        <button type="submit" disabled={loading} className="w-full bg-emerald text-white px-3 py-2 rounded">{loading ? 'Signing in...' : 'Sign in'}</button>
      </form>
    </div>
  );
}
