import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Scissors, Sparkles } from 'lucide-react';

const REPAIRS = [
  { name: 'Minor Wig Repair', price: '$75', desc: 'Small fixes, cleaning, minor adjustments' },
  { name: 'Lace Repair', price: '$150', desc: 'Fix or replace damaged lace areas' },
  { name: 'Cap Repair / Resize', price: '$125', desc: 'Adjust fit or repair the cap structure' },
  { name: 'Add Hair / Fill Thin Areas', price: '$200', desc: 'Fill in thinning spots or add density' },
  { name: 'Major Wig Restoration', price: '$350', desc: 'Full restoration for heavily damaged wigs' },
  { name: "Men's Hair System Repair", price: '$125', desc: 'Repair and maintenance for hair systems' },
];

const NEW_WIGS = [
  { name: 'New Synthetic Wig', price: '$250', desc: 'Custom synthetic wig in your chosen style' },
  { name: 'New Human Hair Wig', price: '$750', desc: 'Premium human hair, natural look and feel' },
  { name: 'New Custom Wig', price: '$1,500', desc: 'Fully custom made to your exact specifications' },
  { name: "New Men's Hair System", price: '$500', desc: 'Custom hair system for natural coverage' },
];

export default function PricingPage() {
  return (
    <div className="bg-[#faf9f7] min-h-screen">
      {/* Page header */}
      <div className="border-b border-[#e8e0d5] bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-4">Transparent Pricing</p>
            <h1 className="font-serif text-6xl md:text-7xl font-light text-[#1a1a1a] leading-tight">Pricing</h1>
          </div>
          <p className="text-[#8a8078] leading-relaxed max-w-md">
            All prices are starting points. Your final quote is based on photos and a thorough review of your wig — no surprises.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 py-20">

        {/* Repair Services */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10 border-b border-[#e8e0d5] pb-6">
            <div className="w-8 h-8 bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
              <Scissors className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-4xl font-light text-[#1a1a1a]">Repair Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#e8e0d5]">
            {REPAIRS.map((r, i) => (
              <div key={r.name}
                className={`flex items-start justify-between gap-6 p-7 bg-white hover:bg-[#faf9f7] transition-colors ${
                  i % 2 === 0 && i < REPAIRS.length - 1 ? 'border-r border-[#e8e0d5]' : ''
                } ${i < REPAIRS.length - 2 ? 'border-b border-[#e8e0d5]' : ''}`}>
                <div>
                  <h3 className="font-medium text-[#1a1a1a] mb-1.5">{r.name}</h3>
                  <p className="text-sm text-[#8a8078]">{r.desc}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[9px] tracking-widest uppercase text-[#8a8078] mb-0.5">From</p>
                  <p className="font-serif text-2xl font-light text-[#c9a84c]">{r.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Wig Orders */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10 border-b border-[#e8e0d5] pb-6">
            <div className="w-8 h-8 bg-[#c9a84c] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-4xl font-light text-[#1a1a1a]">New Wig Orders</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#e8e0d5]">
            {NEW_WIGS.map((w, i) => (
              <div key={w.name}
                className={`flex items-start justify-between gap-6 p-7 bg-white hover:bg-[#faf9f7] transition-colors ${
                  i % 2 === 0 && i < NEW_WIGS.length - 1 ? 'border-r border-[#e8e0d5]' : ''
                } ${i < NEW_WIGS.length - 2 ? 'border-b border-[#e8e0d5]' : ''}`}>
                <div>
                  <h3 className="font-medium text-[#1a1a1a] mb-1.5">{w.name}</h3>
                  <p className="text-sm text-[#8a8078]">{w.desc}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[9px] tracking-widest uppercase text-[#8a8078] mb-0.5">From</p>
                  <p className="font-serif text-2xl font-light text-[#c9a84c]">{w.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing note + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-t border-[#e8e0d5] pt-16">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#8a8078] font-medium mb-4">Important Note</p>
            <p className="text-[#4a4a4a] leading-relaxed text-sm">
              All repair and new wig prices are estimated after photo review. Final pricing may change after in-person inspection. Pricing depends on wig condition, hair type, lace condition, length, density, color, and amount of work needed. You will always receive a final quote before any work begins.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/repair"
              className="flex-1 inline-flex items-center justify-center gap-2 py-4 px-6 bg-[#1a1a1a] text-white text-xs tracking-[0.1em] uppercase font-medium hover:bg-black transition-colors group">
              <Scissors className="w-3.5 h-3.5" />
              Repair My Wig
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/new-wig"
              className="flex-1 inline-flex items-center justify-center gap-2 py-4 px-6 border border-[#c9a84c] text-[#c9a84c] text-xs tracking-[0.1em] uppercase font-medium hover:bg-[#c9a84c] hover:text-white transition-colors">
              <Sparkles className="w-3.5 h-3.5" />
              New Wig
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom photo band */}
      <div className="relative h-64 mt-8 overflow-hidden">
        <Image
          src="/photos/wig_website_photo_13_a_high_end_studio_lit_beauty_portrait_with_a_mini_1_bat.png"
          alt="Studio"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1a1a1a]/50" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <p className="font-serif text-3xl font-light text-white text-center">
            Every quote is free. Every price is locked before work begins.
          </p>
        </div>
      </div>
    </div>
  );
}
