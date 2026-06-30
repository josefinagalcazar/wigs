export const dynamic = 'force-dynamic';
import { getServiceClient } from '@/lib/supabase/service';
import Link from 'next/link';

const STATUS_CARDS = [
  { label: 'New Requests', status: 'Request Received', color: 'bg-blue-500', icon: '🆕', filter: 'new' },
  { label: 'Quote Sent', status: 'Quote Sent', color: 'bg-purple-500', icon: '💬', filter: 'quote' },
  { label: 'Waiting for Wig', status: 'Waiting for Wig', color: 'bg-orange-500', icon: '📬', filter: 'waiting' },
  { label: 'In Repair', status: 'In Repair', color: 'bg-yellow-500', icon: '🔧', filter: 'in_repair' },
  { label: 'Ready for Payment', status: 'Ready for Payment', color: 'bg-red-500', icon: '💳', filter: 'payment' },
  { label: 'Shipped Back', status: 'Shipped Back', color: 'bg-indigo-500', icon: '🚚', filter: 'shipped' },
  { label: 'Completed', status: 'Completed', color: 'bg-green-500', icon: '✅', filter: 'completed' },
  { label: 'Total Repairs', type: 'repair', color: 'bg-[#c9a84c]', icon: '✂️', filter: 'repair' },
];

export default async function AdminDashboard() {
  const db = getServiceClient();
  const { data: requests } = await db.from('requests').select('id, order_number, service_type, customer_name, status, created_at').order('created_at', { ascending: false });
  const all = requests ?? [];

  const counts: Record<string, number> = {};
  for (const card of STATUS_CARDS) {
    if (card.status) counts[card.label] = all.filter(r => r.status === card.status).length;
    if (card.type) counts[card.label] = all.filter(r => r.service_type === card.type).length;
  }

  const recent = all.slice(0, 10);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Dashboard</h1>
        <p className="text-[#8a8078] text-sm">{all.length} total requests</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {STATUS_CARDS.map(card => (
          <Link key={card.label} href={`/admin/requests?filter=${card.filter}`}
            className="bg-white rounded-2xl p-4 border border-[#e8e0d5] shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center text-white text-lg mb-3`}>{card.icon}</div>
            <p className="text-2xl font-bold text-[#1a1a1a]">{counts[card.label] ?? 0}</p>
            <p className="text-xs text-[#8a8078] mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#e8e0d5] shadow-sm">
        <div className="px-6 py-4 border-b border-[#e8e0d5] flex items-center justify-between">
          <h2 className="font-bold text-[#1a1a1a]">Recent Requests</h2>
          <Link href="/admin/requests" className="text-sm text-[#c9a84c] font-medium hover:text-[#a8892e]">View all →</Link>
        </div>
        <div className="divide-y divide-[#f5f0eb]">
          {recent.length === 0 ? (
            <p className="px-6 py-8 text-center text-[#8a8078] text-sm">No requests yet.</p>
          ) : recent.map(r => (
            <Link key={r.id} href={`/admin/requests/${r.id}`} className="px-6 py-4 flex items-center justify-between hover:bg-[#faf9f7] transition-colors">
              <div>
                <p className="font-mono text-xs text-[#c9a84c] font-semibold">{r.order_number}</p>
                <p className="text-sm font-medium text-[#1a1a1a]">{r.customer_name}</p>
                <p className="text-xs text-[#8a8078]">{r.service_type === 'repair' ? '✂️ Repair' : '✨ New Wig'}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                  r.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  r.status === 'Request Received' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-600'
                }`}>{r.status}</span>
                <p className="text-xs text-[#8a8078] mt-1">{new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
