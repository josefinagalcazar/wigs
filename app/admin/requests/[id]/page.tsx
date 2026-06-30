export const dynamic = 'force-dynamic';
import { getServiceClient } from '@/lib/supabase/service';
import { notFound } from 'next/navigation';
import StatusBadge from '@/components/StatusBadge';
import AdminRequestEditor from './AdminRequestEditor';
import { formatMoney } from '@/lib/money';

export default async function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getServiceClient();

  const { data: request } = await db.from('requests').select('*').eq('id', id).single();
  if (!request) notFound();

  const { data: photos } = await db.from('request_photos').select('*').eq('request_id', id).order('created_at');
  const { data: history } = await db.from('status_history').select('*').eq('request_id', id).order('created_at', { ascending: false });

  // Get signed URLs for photos
  const photosWithUrls = await Promise.all(
    (photos ?? []).map(async (p: { id: string; photo_type: string; storage_path: string; created_at: string }) => {
      const { data } = await db.storage.from('request-photos').createSignedUrl(p.storage_path, 60 * 60);
      return { ...p, signed_url: data?.signedUrl ?? null };
    })
  );

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <p className="text-xs text-[#8a8078] mb-1">Order Number</p>
          <h1 className="text-2xl font-bold font-mono text-[#c9a84c]">{request.order_number}</h1>
          <div className="flex items-center gap-2 mt-2">
            <StatusBadge status={request.status} />
            <span className="text-xs text-[#8a8078]">{request.service_type === 'repair' ? '✂️ Repair' : '✨ New Wig'}</span>
          </div>
        </div>
        <div className="text-right text-sm text-[#8a8078]">
          <p>Submitted</p>
          <p className="font-medium text-[#1a1a1a]">{new Date(request.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Customer Info */}
        <div className="bg-white rounded-2xl border border-[#e8e0d5] p-5 shadow-sm">
          <h2 className="font-bold text-[#1a1a1a] mb-4">Customer Information</h2>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between"><span className="text-[#8a8078]">Name</span><span className="font-medium">{request.customer_name}</span></div>
            <div className="flex justify-between"><span className="text-[#8a8078]">Phone</span><a href={`tel:${request.customer_phone}`} className="font-medium text-[#c9a84c]">{request.customer_phone}</a></div>
            <div className="flex justify-between"><span className="text-[#8a8078]">Email</span><a href={`mailto:${request.customer_email}`} className="font-medium text-[#c9a84c] truncate max-w-[180px]">{request.customer_email}</a></div>
            {request.customer_city_state && <div className="flex justify-between"><span className="text-[#8a8078]">Location</span><span className="font-medium">{request.customer_city_state}</span></div>}
          </div>
        </div>

        {/* Request Info */}
        <div className="bg-white rounded-2xl border border-[#e8e0d5] p-5 shadow-sm">
          <h2 className="font-bold text-[#1a1a1a] mb-4">Request Details</h2>
          <div className="flex flex-col gap-2 text-sm">
            {request.issue_type && <div className="flex justify-between"><span className="text-[#8a8078]">Issue</span><span className="font-medium">{request.issue_type}</span></div>}
            {request.wig_for && <div className="flex justify-between"><span className="text-[#8a8078]">Wig For</span><span className="font-medium">{request.wig_for}</span></div>}
            {request.style_requested && <div className="flex justify-between"><span className="text-[#8a8078]">Style</span><span className="font-medium">{request.style_requested}</span></div>}
            {request.budget_range && <div className="flex justify-between"><span className="text-[#8a8078]">Budget</span><span className="font-medium">{request.budget_range}</span></div>}
            {request.customer_notes && (
              <div className="mt-2 pt-2 border-t border-[#f5f0eb]">
                <p className="text-[#8a8078] mb-1">Customer Notes</p>
                <p className="text-[#1a1a1a] leading-relaxed">{request.customer_notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Financials */}
        <div className="bg-white rounded-2xl border border-[#e8e0d5] p-5 shadow-sm">
          <h2 className="font-bold text-[#1a1a1a] mb-4">Financials</h2>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between"><span className="text-[#8a8078]">Quote</span><span className="font-semibold text-[#c9a84c]">{formatMoney(request.quote_amount)}</span></div>
            <div className="flex justify-between"><span className="text-[#8a8078]">Deposit</span><span className="font-medium">{formatMoney(request.deposit_amount)}</span></div>
            <div className="flex justify-between"><span className="text-[#8a8078]">Final Balance</span><span className="font-medium">{formatMoney(request.final_balance)}</span></div>
            <div className="flex justify-between"><span className="text-[#8a8078]">Payment Status</span><span className="font-medium capitalize">{request.payment_status?.replace('_', ' ')}</span></div>
          </div>
        </div>

        {/* Shipping */}
        <div className="bg-white rounded-2xl border border-[#e8e0d5] p-5 shadow-sm">
          <h2 className="font-bold text-[#1a1a1a] mb-4">Shipping</h2>
          <div className="flex flex-col gap-2 text-sm">
            <div><p className="text-[#8a8078] mb-1">Tracking In (Customer → Us)</p><p className="font-mono text-xs">{request.shipping_tracking_in || '—'}</p></div>
            <div><p className="text-[#8a8078] mb-1">Tracking Out (Us → Customer)</p><p className="font-mono text-xs">{request.shipping_tracking_out || '—'}</p></div>
          </div>
        </div>
      </div>

      {/* Photos */}
      {photosWithUrls.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#e8e0d5] p-5 shadow-sm mb-6">
          <h2 className="font-bold text-[#1a1a1a] mb-4">Customer Photos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {photosWithUrls.map(p => (
              <div key={p.id} className="aspect-square rounded-xl overflow-hidden bg-[#f5f0eb] relative group">
                {p.signed_url ? (
                  <a href={p.signed_url} target="_blank" rel="noopener noreferrer">
                    <img src={p.signed_url} alt={p.photo_type} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                  </a>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#8a8078] text-xs text-center p-2">{p.photo_type}</div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-2 py-1 truncate">{p.photo_type}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor */}
      <AdminRequestEditor request={request} />

      {/* Status History */}
      {(history ?? []).length > 0 && (
        <div className="bg-white rounded-2xl border border-[#e8e0d5] p-5 shadow-sm mt-6">
          <h2 className="font-bold text-[#1a1a1a] mb-4">Status History</h2>
          <div className="flex flex-col gap-3">
            {(history ?? []).map((h: { id: string; status: string; note: string | null; created_at: string }) => (
              <div key={h.id} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-[#c9a84c] mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#1a1a1a]">{h.status}</p>
                  {h.note && <p className="text-xs text-[#8a8078]">{h.note}</p>}
                  <p className="text-xs text-[#8a8078]">{new Date(h.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
