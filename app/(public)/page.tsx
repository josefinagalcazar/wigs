import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight, Scissors, Sparkles, Camera, MessageCircle, Package, Shield, Lock } from 'lucide-react';

const STEPS = [
  { num: '01', icon: Scissors, title: 'Choose a Service', desc: 'Tell us if you need a repair or a new wig.' },
  { num: '02', icon: Camera, title: 'Upload Photos', desc: 'Take photos with your phone — more is better.' },
  { num: '03', icon: MessageCircle, title: 'Get a Quote', desc: 'We review and send pricing within 1–2 business days.' },
  { num: '04', icon: Check, title: 'Approve & Send', desc: 'Approve your quote, then mail in your wig.' },
  { num: '05', icon: Package, title: 'Receive Your Wig', desc: 'Your wig ships back beautifully restored.' },
];

const GALLERY = [
  '/photos/wig_website_photo_01_confidence_in_luxury_haircare.png',
  '/photos/wig_website_photo_04_elegant_beauty_in_satin_drape.png',
  '/photos/wig_website_photo_08_elegant_glamour_with_soft_waves.png',
  '/photos/wig_website_photo_09_elegant_portrait_in_soft_lighting.png',
  '/photos/wig_website_photo_14_luxe_elegance_with_timeless_beauty.png',
  '/photos/wig_website_photo_19_sleek_beauty_portrait_with_glossy_hair.png',
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative bg-[#faf9f7] min-h-[92vh] grid grid-cols-1 lg:grid-cols-2">
        {/* Left — copy */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-24 lg:py-0">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-6">
            Professional Wig Services
          </p>
          <h1 className="font-serif text-6xl md:text-7xl xl:text-8xl font-light text-[#1a1a1a] leading-[1.0] mb-8 tracking-tight">
            Repairs &amp; <br />
            <em className="not-italic text-[#c9a84c]">New Wigs,</em>
            <br />Perfected.
          </h1>
          <p className="text-[#8a8078] text-lg leading-relaxed max-w-md mb-10">
            Upload photos, get a free quote, mail in your wig — and receive it beautifully restored. Or order a brand new wig made just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Link href="/repair"
              className="inline-flex items-center justify-center gap-2.5 py-4 px-8 bg-[#1a1a1a] text-white text-sm font-medium tracking-wide hover:bg-black transition-colors group">
              <Scissors className="w-3.5 h-3.5" />
              Repair My Wig
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/new-wig"
              className="inline-flex items-center justify-center gap-2.5 py-4 px-8 border border-[#c9a84c] text-[#c9a84c] text-sm font-medium tracking-wide hover:bg-[#c9a84c] hover:text-white transition-colors group">
              <Sparkles className="w-3.5 h-3.5" />
              Order a New Wig
            </Link>
          </div>
          <div className="flex flex-wrap gap-5 text-xs text-[#8a8078] tracking-wide">
            {['Free quotes', 'No account needed', 'Ships nationwide', '500+ wigs restored'].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#c9a84c]" />
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Right — full-bleed photo */}
        <div className="relative h-[55vw] lg:h-auto min-h-[400px]">
          <Image
            src="/photos/wig_website_photo_07_elegant_glamour_in_a_chic_salon.png"
            alt="Elegant glamour"
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Subtle overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f7]/30 via-transparent to-transparent lg:hidden" />

          {/* Floating card */}
          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm border border-[#e8e0d5] p-5 max-w-[220px]">
            <p className="font-serif text-2xl font-light text-[#1a1a1a] leading-tight mb-1">500+</p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8078]">Wigs Restored</p>
          </div>
        </div>
      </section>

      {/* ── Photo strip ─────────────────────────────────────────── */}
      <section className="bg-[#1a1a1a] py-12 overflow-hidden">
        <div className="flex gap-4 px-8 overflow-x-auto scrollbar-hide">
          {GALLERY.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-44 h-56 overflow-hidden">
              <Image
                src={src}
                alt=""
                width={176}
                height={224}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
        <p className="text-center text-white/30 text-[10px] tracking-[0.3em] uppercase mt-8 font-medium">Our Work</p>
      </section>

      {/* ── Services ────────────────────────────────────────────── */}
      <section className="bg-[#faf9f7] py-28 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 border-b border-[#e8e0d5] pb-8 flex items-end justify-between">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-3">What We Do</p>
              <h2 className="font-serif text-5xl md:text-6xl font-light text-[#1a1a1a]">Our Services</h2>
            </div>
            <p className="hidden md:block text-[#8a8078] text-sm max-w-xs text-right leading-relaxed">
              We specialize in two things and we do them exceptionally well.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#e8e0d5]">
            {/* Repair */}
            <div className="group relative overflow-hidden border-r-0 lg:border-r border-[#e8e0d5]">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/photos/wig_website_photo_20_sophisticated_modern_portrait_in_luxury_setting.png"
                  alt="Wig repair"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 to-transparent" />
              </div>
              <div className="p-10 border-t border-[#e8e0d5]">
                <h3 className="font-serif text-4xl font-light text-[#1a1a1a] mb-4">Wig Repairs</h3>
                <ul className="space-y-2 mb-6">
                  {['Fix damaged lace', 'Add hair back', 'Repair the cap', 'Fix loose or tight fit', 'Reshape and restore'].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-[#8a8078]">
                      <span className="w-1 h-1 bg-[#c9a84c] rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-[#8a8078] mb-8">Starting at <span className="text-[#1a1a1a] font-medium">$75</span>. Quoted after photo review.</p>
                <Link href="/repair" className="inline-flex items-center gap-2 text-sm font-medium text-[#1a1a1a] border-b border-[#1a1a1a] pb-0.5 hover:text-[#c9a84c] hover:border-[#c9a84c] transition-colors group/link">
                  Get a Repair Quote
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* New Wig */}
            <div className="group relative overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/photos/wig_website_photo_15_luxury_hair_system_ad_portrait.png"
                  alt="New wig order"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 to-transparent" />
              </div>
              <div className="p-10 border-t border-[#e8e0d5]">
                <h3 className="font-serif text-4xl font-light text-[#1a1a1a] mb-4">New Wig Orders</h3>
                <ul className="space-y-2 mb-6">
                  {['Custom made for you', 'All hair types', 'Any length or style', 'Curly, wavy, straight, natural', 'Send inspiration photos'].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-[#8a8078]">
                      <span className="w-1 h-1 bg-[#c9a84c] rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-[#8a8078] mb-8">Starting at <span className="text-[#1a1a1a] font-medium">$250</span>. Custom quote with inspiration photos.</p>
                <Link href="/new-wig" className="inline-flex items-center gap-2 text-sm font-medium text-[#c9a84c] border-b border-[#c9a84c] pb-0.5 hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-colors group/link">
                  Order a New Wig
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────── */}
      <section className="bg-white py-28 px-8 md:px-16 border-t border-[#e8e0d5]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-3">Simple Process</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-[#1a1a1a]">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border-t border-[#e8e0d5]">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.num} className={`pt-8 pb-4 pr-8 ${i < STEPS.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-[#e8e0d5]' : ''}`}>
                  <p className="font-serif text-4xl font-light text-[#e8e0d5] mb-4">{s.num}</p>
                  <div className="mb-3">
                    <Icon className="w-4 h-4 text-[#c9a84c]" />
                  </div>
                  <h3 className="font-medium text-[#1a1a1a] text-sm mb-2">{s.title}</h3>
                  <p className="text-xs text-[#8a8078] leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Studio — editorial split ────────────────────────── */}
      <section className="bg-[#faf9f7] border-t border-[#e8e0d5]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          {/* Photo side */}
          <div className="relative h-[60vw] lg:h-auto min-h-[420px]">
            <Image
              src="/photos/wig_website_photo_10_elegant_portrait_of_a_confident_woman.png"
              alt="Confident woman"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Copy side */}
          <div className="flex flex-col justify-center px-10 md:px-16 py-20 border-l border-[#e8e0d5]">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-4">Why Us</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-[#1a1a1a] leading-tight mb-8">
              Why Choose<br /><em className="text-[#c9a84c]">Our Studio</em>
            </h2>
            <p className="text-[#8a8078] leading-relaxed mb-10">
              Expert craftsmanship, a simple process — beautiful results without the hassle.
            </p>
            <div className="space-y-5 mb-12">
              {[
                'Free, no-obligation quote with every request',
                'Photo-based — no in-person visit needed',
                'Clear pricing before any work begins',
                'Safe, insured shipping both ways',
                'Your photos and info are always private',
              ].map((item) => (
                <div key={item} className="flex items-start gap-4 text-sm text-[#4a4a4a] border-b border-[#f0ebe4] pb-5 last:border-0 last:pb-0">
                  <Check className="w-3.5 h-3.5 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 border-t border-[#e8e0d5] pt-8">
              {[{ num: '500+', label: 'Wigs Restored' }, { num: '$75', label: 'From' }, { num: '1–2d', label: 'Quote Time' }].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-serif text-3xl font-light text-[#c9a84c]">{s.num}</p>
                  <p className="text-[10px] tracking-widest uppercase text-[#8a8078] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust / Values ──────────────────────────────────────── */}
      <section className="bg-[#1a1a1a] py-20 px-8 md:px-16 border-t border-[#e8e0d5]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { icon: Camera, title: 'Photo Quotes', desc: 'Send photos from your phone. No need to visit in person.' },
            { icon: Shield, title: 'No Hidden Fees', desc: 'Your quote is locked in before any work begins.' },
            { icon: Lock, title: 'Safe & Private', desc: 'Your photos and information are always kept private.' },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.title} className="flex flex-col items-start px-0 md:px-12 py-10 md:py-0 first:pl-0 last:pr-0">
                <Icon className="w-5 h-5 text-[#c9a84c] mb-6" />
                <h3 className="font-serif text-2xl font-light text-white mb-3">{t.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{t.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#faf9f7] border-t border-[#e8e0d5]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Copy */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-24 order-2 lg:order-1">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-4">Get Started</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-[#1a1a1a] leading-tight mb-6">
              Ready to<br /><em className="text-[#c9a84c]">transform</em><br />your wig?
            </h2>
            <p className="text-[#8a8078] leading-relaxed mb-10 max-w-sm">
              Choose your service, upload photos, and get a free quote. No account needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/repair"
                className="inline-flex items-center justify-center gap-2 py-4 px-8 bg-[#1a1a1a] text-white text-sm font-medium tracking-wide hover:bg-black transition-colors">
                <Scissors className="w-3.5 h-3.5" /> Repair My Wig
              </Link>
              <Link href="/new-wig"
                className="inline-flex items-center justify-center gap-2 py-4 px-8 border border-[#c9a84c] text-[#c9a84c] text-sm font-medium tracking-wide hover:bg-[#c9a84c] hover:text-white transition-colors">
                <Sparkles className="w-3.5 h-3.5" /> Order a New Wig
              </Link>
            </div>
          </div>

          {/* Photo */}
          <div className="relative h-[55vw] lg:h-auto min-h-[400px] order-1 lg:order-2">
            <Image
              src="/photos/wig_website_photo_11_elegant_studio_portrait_of_confident_woman.png"
              alt="Studio portrait"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
