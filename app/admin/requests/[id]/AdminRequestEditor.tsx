'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const STATUSES = [
  'Request Received', 'Quote Sent', 'Waiting for Wig', 'Wig Received',
  'In Repair', 'Ready for Payment', 'Shipped Back', 'Completed', 'Canceled',
];

const PAYMENT_STATUSES = [
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'deposit_paid', label: 'Deposit Paid' },
  { value: 'paid_in_full', label: 'Paid in Full' },
  { value: 'refunded', label: 'Refunded' },
];

interface Request {
  id: string;
  status: string;
  quote_amount: number | null;
  deposit_amount: number | null;
  final_balance: number | null;
  payment_status: string;
  shipping_tracking_in: string | null;
  shipping_tracking_out: string | null;
  admin_notes: string | null;
  customer_visible_notes: string | null;
}

export default function AdminRequestEditor({ request }: { request: Request }) {
  const router = useRouter();
  const [status, setStatus] = useState(request.status);
  const [quoteAmount, setQuoteAmount] = useState(request.quote_amount?.toString() ?? '');
  const [depositAmount, setDepositAmount] = useState(request.deposit_amount?.toString() ?? '');
  const [finalBalance, setFinalBalance] = useState(request.final_balance?.toString() ?? '');
  const [paymentStatus, setPaymentStatus] = useState(request.payment_status);
  const [trackingIn, setTrackingIn] = useState(request.shipping_tracking_in ?? '');
  const [trackingOut, setTrackingOut] = useState(request.shipping_tracking_out ?? '');
  const [adminNotes, setAdminNotes] = useState(request.admin_notes ?? '');
  const [customerNotes, setCustomerNotes] = useState(request.customer_visible_notes ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);

    const res = await fetch(`/api/admin/requests/${request.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        quote_amount: quoteAmount ? parseFloat(quoteAmount) : null,
        deposit_amount: depositAmount ? parseFloat(depositAmount) : null,
        final_balance: finalBalance ? parseFloat(finalBalance) : null,
        payment_status: paymentStatus,
        shipping_tracking_in: trackingIn || null,
        shipping_tracking_out: trackingOut || null,
        admin_notes: adminNotes || null,
        customer_visible_notes: customerNotes || null,
      }),
    });

    if (res.ok) {
      setSaved(true);
      router.refresh();
    } else {
      const d = await res.json();
      setError(d.error || 'Failed to save. Try again.');
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSave} className="bg-white rounded-2xl border border-[#e8e0d5] p-5 shadow-sm">
      <h2 className="font-bold text-[#1a1a1a] mb-5">Update Order</h2>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}
      {saved && <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-4">✅ Saved successfully!</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Order Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border border-[#e8e0d5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] bg-white">
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Payment Status</label>
          <select value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)} className="w-full border border-[#e8e0d5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] bg-white">
            {PAYMENT_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Quote Amount ($)</label>
          <input value={quoteAmount} onChange={e => setQuoteAmount(e.target.value)} type="number" min="0" step="0.01" placeholder="0.00" className="w-full border border-[#e8e0d5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Deposit Amount ($)</label>
          <input value={depositAmount} onChange={e => setDepositAmount(e.target.value)} type="number" min="0" step="0.01" placeholder="0.00" className="w-full border border-[#e8e0d5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Final Balance ($)</label>
          <input value={finalBalance} onChange={e => setFinalBalance(e.target.value)} type="number" min="0" step="0.01" placeholder="0.00" className="w-full border border-[#e8e0d5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Tracking In (Customer → Us)</label>
          <input value={trackingIn} onChange={e => setTrackingIn(e.target.value)} placeholder="Tracking number" className="w-full border border-[#e8e0d5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] font-mono" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Tracking Out (Us → Customer)</label>
          <input value={trackingOut} onChange={e => setTrackingOut(e.target.value)} placeholder="Return tracking number" className="w-full border border-[#e8e0d5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] font-mono" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
          Customer-Visible Notes
          <span className="ml-2 text-xs text-green-700 font-normal bg-green-50 px-2 py-0.5 rounded-full">Visible to customer</span>
        </label>
        <textarea value={customerNotes} onChange={e => setCustomerNotes(e.target.value)} rows={3} maxLength={2000} placeholder="These notes will be shown to the customer on the tracking page…" className="w-full border border-[#e8e0d5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] resize-none" />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
          Admin Notes (Private)
          <span className="ml-2 text-xs text-red-700 font-normal bg-red-50 px-2 py-0.5 rounded-full">Admin only — never shown to customer</span>
        </label>
        <textarea value={adminNotes} onChange={e => setAdminNotes(e.target.value)} rows={4} maxLength={5000} placeholder="Internal notes about this order. Never shown to the customer." className="w-full border border-[#e8e0d5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] resize-none bg-red-50/30" />
      </div>

      <button type="submit" disabled={saving} className="w-full py-3 bg-[#c9a84c] text-white rounded-xl font-bold hover:bg-[#a8892e] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
        {saving && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
        {saving ? 'Saving…' : 'Save Changes'}
      </button>
    </form>
  );
}
