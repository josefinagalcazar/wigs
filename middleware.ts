import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// In-memory brute force store (resets on cold start — good enough for edge protection)
const loginAttempts = new Map<string, { count: number; blockedUntil: number }>();

const MAX_LOGIN_ATTEMPTS = 5;
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (entry) {
    if (now < entry.blockedUntil) {
      return { allowed: false, retryAfterMs: entry.blockedUntil - now };
    }
    if (entry.count >= MAX_LOGIN_ATTEMPTS && now >= entry.blockedUntil) {
      loginAttempts.delete(ip);
    }
  }
  return { allowed: true };
}

export async function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const pathname = request.nextUrl.pathname;

  // Block brute-force login attempts before even hitting Supabase
  if (pathname === '/admin/login' && request.method === 'POST') {
    const check = checkLoginRateLimit(ip);
    if (!check.allowed) {
      const retryAfterSec = Math.ceil((check.retryAfterMs ?? BLOCK_DURATION_MS) / 1000);
      return new NextResponse(
        JSON.stringify({ error: `Too many login attempts. Try again in ${Math.ceil(retryAfterSec / 60)} minutes.` }),
        { status: 429, headers: { 'Retry-After': String(retryAfterSec), 'Content-Type': 'application/json' } }
      );
    }
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (pathname === '/admin/login' && user) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/admin/:path*'],
};
