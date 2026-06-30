'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes
const STORAGE_KEY = 'wrs_login_attempts';

interface AttemptRecord { count: number; lockedUntil: number }

function getAttempts(): AttemptRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AttemptRecord;
  } catch {}
  return { count: 0, lockedUntil: 0 };
}

function recordFailure(): AttemptRecord {
  const rec = getAttempts();
  const now = Date.now();
  const newCount = now >= rec.lockedUntil ? 1 : rec.count + 1;
  const lockedUntil = newCount >= MAX_ATTEMPTS ? now + LOCKOUT_MS : rec.lockedUntil;
  const next = { count: newCount, lockedUntil };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

function clearAttempts() {
  localStorage.removeItem(STORAGE_KEY);
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lockedUntil, setLockedUntil] = useState(0);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const rec = getAttempts();
    if (rec.lockedUntil > Date.now()) setLockedUntil(rec.lockedUntil);
  }, []);

  useEffect(() => {
    if (!lockedUntil) return;
    const interval = setInterval(() => {
      const remaining = lockedUntil - Date.now();
      if (remaining <= 0) {
        setLockedUntil(0);
        setCountdown('');
        clearInterval(interval);
      } else {
        const m = Math.floor(remaining / 60000);
        const s = Math.floor((remaining % 60000) / 1000);
        setCountdown(`${m}:${s.toString().padStart(2, '0')}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockedUntil]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (lockedUntil > Date.now()) return;

    setError('');
    setLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      const rec = recordFailure();
      if (rec.lockedUntil > Date.now()) {
        setLockedUntil(rec.lockedUntil);
        setError('Too many failed attempts. Account locked for 15 minutes.');
      } else {
        const remaining = MAX_ATTEMPTS - rec.count;
        setError(`Invalid email or password. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`);
      }
      setLoading(false);
      return;
    }

    clearAttempts();
    router.push('/admin');
    router.refresh();
  }

  const isLocked = lockedUntil > Date.now();

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">✂️</div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Admin Login</h1>
          <p className="text-[#8a8078] text-sm mt-1">Wig Repair Portal</p>
        </div>

        {isLocked && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5 text-center">
            <p className="font-semibold">Access temporarily locked</p>
            <p className="mt-1">Try again in <span className="font-mono font-bold">{countdown}</span></p>
          </div>
        )}

        {!isLocked && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required
              disabled={isLocked} placeholder="admin@example.com"
              className="w-full border border-[#e8e0d5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] disabled:opacity-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required
              disabled={isLocked} placeholder="••••••••"
              className="w-full border border-[#e8e0d5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] disabled:opacity-50" />
          </div>
          <button type="submit" disabled={loading || isLocked}
            className="w-full py-3 bg-[#c9a84c] text-white rounded-xl font-bold hover:bg-[#a8892e] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
            {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {isLocked ? `Locked — ${countdown}` : loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
