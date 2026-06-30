import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getServiceClient } from '@/lib/supabase/service';
import { UpdateRequestSchema } from '@/lib/validations';
import { sendStatusUpdate } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // Verify admin session
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  // Reject non-UUID values before they touch the DB
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return NextResponse.json({ error: 'Invalid request ID' }, { status: 400 });
  }

  const body = await request.json();

  const parsed = UpdateRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().formErrors.join(', ') || 'Invalid input' }, { status: 400 });
  }

  const data = parsed.data;
  const db = getServiceClient();

  // Fetch current record for status comparison + customer details for email
  const { data: current } = await db
    .from('requests')
    .select('status, customer_email, customer_name, order_number')
    .eq('id', id)
    .single();

  const { error } = await db.from('requests').update({
    ...data,
    updated_at: new Date().toISOString(),
  }).eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'Failed to update request.' }, { status: 500 });
  }

  const statusChanged = data.status && current && data.status !== current.status;

  // Log status change in history
  if (statusChanged) {
    await db.from('status_history').insert({
      request_id: id,
      status: data.status,
      note: `Status updated to "${data.status}" by admin.`,
    });
  }

  // Send status update email (non-blocking)
  if (statusChanged && current?.customer_email) {
    sendStatusUpdate({
      to: current.customer_email,
      customerName: current.customer_name,
      orderNumber: current.order_number,
      status: data.status!,
      customerVisibleNotes: data.customer_visible_notes,
    }).catch(err => console.error('Status email failed:', err));
  }

  return NextResponse.json({ ok: true });
}
