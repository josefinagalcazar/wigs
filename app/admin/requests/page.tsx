export const dynamic = 'force-dynamic';
import { getServiceClient } from '@/lib/supabase/service';
import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';

const FILTER_MAP: Record<string, { field: string; value: string }> = {
  repair: { field: 'service_type', value: 'repair' },
  new_wig: { field: 'service_type', value: 'new_wig' },
  new: { field: 'status', value: 'Request Received' },
  quote: { field: 'status', value: 'Quote Sent' },
  waiting: { field: 'status', value: 'Waiting for Wig' },
  in_repair: { field: 'status', value: 'In Repair' },
  payment: { field: 'status', value: 'Ready for Payment' },
  shipped: { field: 'status', value: 'Shipped Back' },
  completed: { field: 'status', value: 'Completed' },
};

export default async function RequestsPage({ searchParams }: { searchParams: Promise<{ filter?: string; q?: string }> }) {
  const { filter, q } = await searchParams;
  const db = getServiceClient();

  let query = db.from('requests').select('id, order_number, service_type, customer_name, customer_email, status, created_at, quote_amount').order('created_at', { ascending: false });

  if (filter && FILTER_MAP[filter]) {
    const { field, value } = FILTER_MAP[filter];
    query = query.eq(field as 'service_type' | 'status', value);
  }

  if (q) {
    query = query.or(`customer_name.ilike.%${q}%,customer_email.ilike.%${q}%,order_number.ilike.%${q}%`);
  }

  const { data: requests } = await query;
  const all = requests ?? [];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Requests</h1>
          <p className="text-[#8a8078] text-sm">{all.length} {filter ? `${filter.replace('_', ' ')}` : 'total'}</p>
        </div>
      </div>

      <form method="GET" className="mb-6">
        <input name="q" defaultValue={q} placeholder="Search by name, email, or order number…"
          className="w-full bg-white border border-[#e8e0d5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
        {filter && <input type="hidden" name="filter" value={filter} />}
      </form>

      <div className="bg-white rounded-2xl border border-[#e8e0d5] shadow-sm overflow-hidden">
        {all.length === 0 ? (
          <p className="px-6 py-12 text-center text-[#8a8078]">No requests found.</p>
        ) : (
          <div className="divide-y divide-[#f5f0eb]">
            {all.map(r => (
              <Link key={r.id} href={`/admin/requests/${r.id}`}
                className="px-5 py-4 flex items-center gap-4 hover:bg-[#faf9f7] transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-[#c9a84c] font-semibold">{r.order_number}</span>
                    <span className="text-xs text-[#8a8078]">{r.service_type === 'repair' ? '✂️' : '✨'}</span>
                  </div>
                  <p className="text-sm font-medium text-[#1a1a1a] truncate">{r.customer_name}</p>
                  <p className="text-xs text-[#8a8078] truncate">{r.customer_email}</p>
                </div>
                <div className="shrink-0 text-right">
                  <StatusBadge status={r.status} />
                  <p className="text-xs text-[#8a8078] mt-1">{new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  {r.quote_amount != null && <p className="text-xs font-semibold text-[#c9a84c]">${r.quote_amount}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
