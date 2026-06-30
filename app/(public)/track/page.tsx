'use client';
import { useState } from 'react';
import Image from 'next/image';
import StatusBadge from '@/components/StatusBadge';
import { formatMoney } from '@/lib/money';
import { ArrowRight, Package, Truck } from 'lucide-react';

interface OrderResult {
  order_number: string;
  service_type: string;
  customer_name: string;
  status: string;
  quote_amount: number | null;
  payment_status: string;
  shipping_tracking_in: string | null;
  shipping_tracking_out: string | null;
  customer_visible_notes: string | null;
  created_at: string;
}

const PAYMENT_LABELS: Record<string, string> = {
  unpaid: 'No payment yet',
  deposit_paid: 'Deposit paid',
  paid_in_full: 'Paid in full',
  refunded: 'Refunded',
};

const inputClass = 'w-full border border-[#e8e0d5] bg-[#faf9f7] px-4 py-3.5 text-sm text-[#1a1a1a] placeholder:text-[#c0b8b0] focus:outline-none focus:border-[#c9a84c] focus:bg-white transition-colors';

export default function TrackPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [contact, setContact] = useState('');
  const [result, setResult] = useState<OrderResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_number: orderNumber.trim().toUpperCase(), contact: contact.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Order not found. Please check your order number and contact info.');
      } else {
        setResult(data);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div className="bg-[#faf9f7] min-h-screen">

      {/* Page header */}
      <div className="border-b border-[#e8e0d5] bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-4">Order Status</p>
            <h1 className="font-serif text-6xl md:text-7xl font-light text-[#1a1a1a] leading-tight">Track My Order</h1>
          </div>
          <p className="text-[#8a8078] leading-relaxed max-w-md">
            Enter your order number and the phone or email you used when you submitted.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">

        {/* Left — photo */}
        <div className="relative hidden lg:block border-r border-[#e8e0d5]">
          <Image
            src="/photos/wig_website_photo_18_professional_portrait_in_warm_neutrals.png"
            alt="Track order"
            fill
            className="object-cover object-top"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/30 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10">
            <div className="bg-white/90 backdrop-blur-sm border border-[#e8e0d5] p-6">
              <p className="font-serif text-xl font-light text-[#1a1a1a] mb-1">We&apos;ll keep you updated</p>
              <p className="text-xs text-[#8a8078] leading-relaxed mt-2">Every step from receipt to shipment is tracked here.</p>
            </div>
          </div>
        </div>

        {/* Right — form + result */}
        <div className="px-8 md:px-16 py-14 bg-white">

          {/* Search form */}
          <form onSubmit={handleTrack} className="mb-8">
            <p className="text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium mb-6">Look Up Your Order</p>
            <div className="flex flex-col gap-0 border border-[#e8e0d5] mb-6">
              <div className="border-b border-[#e8e0d5]">
                <label className="block text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium px-4 pt-3 pb-1">Order Number</label>
                <input
                  value={orderNumber}
                  onChange={e => setOrderNumber(e.target.value)}
                  placeholder="WR-XXXXX-XXX"
                  className={`${inputClass} font-mono`}
                  required
                />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium px-4 pt-3 pb-1">Phone Number or Email</label>
                <input
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                  placeholder="(555) 123-4567 or you@example.com"
                  className={inputClass}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#1a1a1a] text-white text-xs tracking-[0.15em] uppercase font-medium hover:bg-black transition-colors disabled:opacity-60 flex items-center justify-center gap-2 group"
            >
              {loading && <span className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" />}
              {loading ? 'Looking up…' : (
                <>Track Order <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></>
              )}
            </button>
          </form>

          {error && (
            <div className="border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          {result && (
            <div className="border border-[#e8e0d5]">
              {/* Order header */}
              <div className="bg-[#faf9f7] border-b border-[#e8e0d5] px-6 py-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium mb-1">Order Number</p>
                  <p className="font-mono font-bold text-[#c9a84c] text-xl tracking-wider">{result.order_number}</p>
                </div>
                <span className="text-[10px] tracking-widest uppercase text-[#8a8078] border border-[#e8e0d5] px-3 py-1.5 bg-white">
                  {result.service_type === 'repair' ? 'Repair' : 'New Wig'}
                </span>
              </div>

              {/* Order details */}
              <div className="divide-y divide-[#e8e0d5]">
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-[9px] tracking-widest uppercase text-[#8a8078] font-medium">Status</span>
                  <StatusBadge status={result.status} />
                </div>
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-[9px] tracking-widest uppercase text-[#8a8078] font-medium">Customer</span>
                  <span className="text-sm text-[#1a1a1a]">{result.customer_name}</span>
                </div>
                {result.quote_amount != null && (
                  <div className="flex items-center justify-between px-6 py-4">
                    <span className="text-[9px] tracking-widest uppercase text-[#8a8078] font-medium">Quote</span>
                    <span className="font-serif text-xl font-light text-[#1a1a1a]">{formatMoney(result.quote_amount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-[9px] tracking-widest uppercase text-[#8a8078] font-medium">Payment</span>
                  <span className="text-sm text-[#1a1a1a]">{PAYMENT_LABELS[result.payment_status] ?? result.payment_status}</span>
                </div>
                <div className="px-6 py-4">
                  <span className="text-[9px] tracking-widest uppercase text-[#8a8078] font-medium">Submitted</span>
                  <p className="text-sm text-[#1a1a1a] mt-1">
                    {new Date(result.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Tracking / notes */}
              {(result.shipping_tracking_in || result.shipping_tracking_out || result.customer_visible_notes) && (
                <div className="border-t border-[#e8e0d5] divide-y divide-[#e8e0d5]">
                  {result.shipping_tracking_in && (
                    <div className="px-6 py-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-3.5 h-3.5 text-[#c9a84c]" />
                        <p className="text-[9px] tracking-widest uppercase text-[#8a8078] font-medium">Inbound Tracking</p>
                      </div>
                      <p className="text-xs text-[#4a4a4a] font-mono break-all">{result.shipping_tracking_in}</p>
                    </div>
                  )}
                  {result.shipping_tracking_out && (
                    <div className="px-6 py-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="w-3.5 h-3.5 text-[#c9a84c]" />
                        <p className="text-[9px] tracking-widest uppercase text-[#8a8078] font-medium">Outbound Tracking</p>
                      </div>
                      <p className="text-xs text-[#4a4a4a] font-mono break-all">{result.shipping_tracking_out}</p>
                    </div>
                  )}
                  {result.customer_visible_notes && (
                    <div className="px-6 py-4 bg-[#fdf8ee]">
                      <p className="text-[9px] tracking-widest uppercase text-[#c9a84c] font-medium mb-2">Note from our team</p>
                      <p className="text-sm text-[#1a1a1a] leading-relaxed">{result.customer_visible_notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
