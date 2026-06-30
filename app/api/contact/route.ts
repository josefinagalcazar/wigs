import { NextRequest, NextResponse } from 'next/server';
import { ContactFormSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!rateLimit(`contact:${ip}`, 3, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
  }

  const body = await request.json();
  const parsed = ContactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Please fill in all required fields correctly.' }, { status: 400 });
  }

  // TODO: Send email via SendGrid/Resend when configured
  console.log('Contact form submission:', { name: parsed.data.name, email: parsed.data.email });

  return NextResponse.json({ ok: true });
}
