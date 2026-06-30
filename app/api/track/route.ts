import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase/service';
import { TrackOrderSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!rateLimit(`track:${ip}`, 10, 60 * 1000)) {
    return NextResponse.json({ error: 'Too many attempts. Please wait a moment.' }, { status: 429 });
  }

  const body = await request.json();
  const parsed = TrackOrderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input. Check your order number and contact info.' }, { status: 400 });
  }

  const { order_number, contact } = parsed.data;
  const db = getServiceClient();

  const { data, error } = await db.rpc('track_order', {
    p_order_number: order_number.toUpperCase().trim(),
    p_contact: contact.trim(),
  });

  if (error || !data || data.length === 0) {
    // Don't reveal whether the order exists — return same message either way
    return NextResponse.json(
      { error: 'Order not found. Check your order number and the phone or email you used when submitting.' },
      { status: 404 }
    );
  }

  // Only return the safe fields from the RPC result — never admin_notes
  const order = data[0];
  return NextResponse.json({
    order_number: order.order_number,
    service_type: order.service_type,
    customer_name: order.customer_name,
    status: order.status,
    quote_amount: order.quote_amount,
    payment_status: order.payment_status,
    shipping_tracking_in: order.shipping_tracking_in,
    shipping_tracking_out: order.shipping_tracking_out,
    customer_visible_notes: order.customer_visible_notes,
    created_at: order.created_at,
  });
}
