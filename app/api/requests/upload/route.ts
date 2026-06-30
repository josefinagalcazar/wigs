import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase/service';
import { rateLimit } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!rateLimit(`upload:${ip}`, 20, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many uploads. Please try again later.' }, { status: 429 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const photoType = formData.get('photo_type') as string | null;

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  // Validate file type server-side (not just extension)
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Only JPEG, PNG, and WebP images are allowed.' }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 });
  }

  const ext = file.type.split('/')[1].replace('jpeg', 'jpg');
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 7);
  const safeName = (photoType ?? 'photo').toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 40);
  const path = `uploads/${timestamp}-${random}/${safeName}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const db = getServiceClient();
  const { error: uploadError } = await db.storage
    .from('request-photos')
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 });
  }

  // Return signed URL (1 hour) — not a public URL
  const { data: signed } = await db.storage
    .from('request-photos')
    .createSignedUrl(path, 60 * 60);

  return NextResponse.json({ url: signed?.signedUrl ?? '', path });
}
