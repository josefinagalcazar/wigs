import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase/service';
import { RepairRequestSchema, NewWigRequestSchema } from '@/lib/validations';
import { generateOrderNumber } from '@/lib/orderNumber';
import { rateLimit } from '@/lib/rateLimit';
import { sendOrderConfirmation } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!rateLimit(`submit:${ip}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const body = await request.json();
  const { service_type } = body;

  if (!service_type || !['repair', 'new_wig'].includes(service_type)) {
    return NextResponse.json({ error: 'Invalid service type' }, { status: 400 });
  }

  const schema = service_type === 'repair' ? RepairRequestSchema : NewWigRequestSchema;
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    const errors = parsed.error.flatten().formErrors.join(", ") || Object.values(parsed.error.flatten().fieldErrors).flat().join(", ");
    return NextResponse.json({ error: errors }, { status: 400 });
  }

  const data = parsed.data;
  const db = getServiceClient();
  const order_number = generateOrderNumber();

  const { error: insertError } = await db.from('requests').insert({
    order_number,
    service_type,
    customer_name: data.customer_name,
    customer_phone: data.customer_phone,
    customer_email: data.customer_email,
    customer_city_state: data.customer_city_state ?? null,
    customer_notes: data.customer_notes ?? null,
    issue_type: 'issue_type' in data ? data.issue_type : null,
    wig_for: 'wig_for' in data ? (data as { wig_for: string }).wig_for : null,
    style_requested: 'style_requested' in data ? (data as { style_requested: string }).style_requested : null,
    budget_range: 'budget_range' in data ? (data as { budget_range: string }).budget_range : null,
    status: 'Request Received',
    payment_status: 'unpaid',
  });

  if (insertError) {
    console.error('Request insert error:', insertError);
    return NextResponse.json({ error: 'Failed to submit request. Please try again.' }, { status: 500 });
  }

  // Fetch the new request id
  const { data: newRequest } = await db.from('requests').select('id').eq('order_number', order_number).single();

  if (newRequest && data.photos && data.photos.length > 0) {
    await db.from('request_photos').insert(
      data.photos.map((p: { photo_type: string; file_url: string; storage_path: string }) => ({
        request_id: newRequest.id,
        photo_type: p.photo_type,
        file_url: p.file_url,
        storage_path: p.storage_path,
      }))
    );
  }

  if (newRequest) {
    await db.from('status_history').insert({
      request_id: newRequest.id,
      status: 'Request Received',
      note: 'Request submitted by customer.',
    });
  }

  // Send confirmation email (non-blocking — don't fail the request if email fails)
  sendOrderConfirmation({
    to: data.customer_email,
    customerName: data.customer_name,
    orderNumber: order_number,
    serviceType: service_type as 'repair' | 'new_wig',
  }).catch(err => console.error('Confirmation email failed:', err));

  return NextResponse.json({ ok: true, order_number });
}
