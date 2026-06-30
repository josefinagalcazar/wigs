import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase/service';
import { rateLimit } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

// Validate actual file bytes — can't be spoofed by the client
function isValidImageBytes(bytes: Uint8Array): boolean {
  const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const png = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  const webp = bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46
    && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;
  return jpeg || png || webp;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!rateLimit(`upload:${ip}`, 20, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many uploads. Please try again later.' }, { status: 429 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const photoType = formData.get('photo_type') as string | null;

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  // Check declared MIME type first (fast)
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Only JPEG, PNG, and WebP images are allowed.' }, { status: 400 });
  }

  // Check size before reading into memory
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  // Validate actual file magic bytes — prevents disguised executables
  if (!isValidImageBytes(buffer)) {
    return NextResponse.json({ error: 'Invalid image file.' }, { status: 400 });
  }

  const ext = file.type.split('/')[1].replace('jpeg', 'jpg');
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 7);
  const safeName = (photoType ?? 'photo').toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 40);
  const path = `uploads/${timestamp}-${random}/${safeName}.${ext}`;

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
