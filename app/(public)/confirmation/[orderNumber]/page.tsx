export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { getServiceClient } from '@/lib/supabase/service';

export default async function ConfirmationPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params;
  const db = getServiceClient();
  const { data: request } = await db
    .from('requests')
    .select('service_type, customer_email')
    .eq('order_number', orderNumber)
    .single();

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-6">✅</div>
      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-3">Request Received!</h1>
      <p className="text-[#8a8078] mb-8">We'll review your photos and send you a quote within 1–2 business days.</p>

      <div className="bg-[#fdf8ee] border-2 border-[#c9a84c] rounded-2xl p-6 mb-8">
        <p className="text-sm text-[#8a8078] mb-2">Your Order Number</p>
        <p className="text-3xl font-bold text-[#c9a84c] tracking-wide font-mono">{orderNumber}</p>
        {request && (
          <span className="mt-3 inline-block px-3 py-1 bg-white border border-[#e8e0d5] rounded-full text-xs font-medium text-[#8a8078]">
            {request.service_type === 'repair' ? '✂️ Wig Repair' : '✨ New Wig Order'}
          </span>
        )}
      </div>

      <div className="bg-white border border-[#e8e0d5] rounded-2xl p-5 mb-8 text-left">
        <h3 className="font-semibold text-[#1a1a1a] mb-3">What happens next?</h3>
        <div className="flex flex-col gap-3">
          {[
            { icon: '📧', text: `We'll email a confirmation${request?.customer_email ? ` to ${request.customer_email}` : ''}` },
            { icon: '📸', text: 'Our team reviews your photos carefully' },
            { icon: '💬', text: 'We send your quote within 1–2 business days' },
            { icon: '✅', text: 'You approve and we get started' },
          ].map((item) => (
            <div key={item.text} className="flex items-start gap-3">
              <span className="text-lg shrink-0">{item.icon}</span>
              <span className="text-sm text-[#8a8078]">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
        💾 Save your order number <strong>{orderNumber}</strong> to track your request anytime.
      </div>

      <div className="flex flex-col gap-3">
        <Link href="/track" className="w-full py-4 bg-[#1a1a1a] text-white rounded-2xl font-bold text-center hover:bg-black transition-colors">
          Track My Order
        </Link>
        <Link href="/" className="w-full py-4 border-2 border-[#e8e0d5] text-[#1a1a1a] rounded-2xl font-semibold text-center hover:bg-[#f5f0eb] transition-colors">
          Return Home
        </Link>
      </div>
    </div>
  );
}
