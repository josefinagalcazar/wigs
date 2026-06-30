import Link from 'next/link';
import Image from 'next/image';
import { Scissors, Sparkles, Camera, MessageCircle, Package, Check } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: Scissors,
    title: 'Choose Repair or New Wig',
    desc: 'Tell us what you need. No experience with wigs required. Just pick the option that fits and we guide you from there.',
    photo: '/photos/wig_website_photo_09_elegant_portrait_in_soft_lighting.png',
  },
  {
    num: '02',
    icon: Camera,
    title: 'Upload Photos',
    desc: 'Take photos with your phone camera or upload from your gallery. Front, back, and the damaged area if it\'s a repair. More photos = better quote.',
    photo: '/photos/wig_website_photo_05_elegant_beauty_in_soft_light.png',
  },
  {
    num: '03',
    icon: MessageCircle,
    title: 'Get a Quote',
    desc: 'Our team reviews your photos and sends you a price estimate within 1–2 business days. No surprises, no hidden fees.',
    photo: '/photos/wig_website_photo_04_elegant_beauty_in_satin_drape.png',
  },
  {
    num: '04',
    icon: Check,
    title: 'Approve & Send',
    desc: 'Approve your quote, then mail your wig to us or start your new wig order. We\'ll provide a mailing address and instructions.',
    photo: '/photos/wig_website_photo_14_luxe_elegance_with_timeless_beauty.png',
  },
  {
    num: '05',
    icon: Package,
    title: 'Receive Your Wig',
    desc: 'We repair or make your wig and ship it back to you. You\'ll receive a tracking number when it ships.',
    photo: '/photos/wig_website_photo_01_confidence_in_luxury_haircare.png',
  },
];

const FAQS = [
  { q: 'Do I need to create an account?', a: 'No. Just submit your request and save your order number. Use it to track your order anytime.' },
  { q: 'How long does a repair take?', a: 'Most repairs take 1–3 weeks depending on the amount of work needed. We\'ll let you know an estimate with your quote.' },
  { q: 'Do you work on all wig types?', a: 'Yes. We work on synthetic wigs, human hair wigs, lace fronts, full lace, and men\'s hair systems.' },
  { q: 'What if the price changes?', a: 'Photo quotes are estimates. If something changes after we inspect your wig in person, we will always contact you before doing additional work.' },
  { q: 'How do I mail my wig?', a: 'After you approve your quote, we send you our mailing address and packing instructions. Most customers use USPS Priority Mail.' },
  { q: 'Do you offer local drop-off?', a: 'Contact us to ask about local drop-off availability in your area.' },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-[#faf9f7] min-h-screen">

      {/* Page header */}
      <div className="border-b border-[#e8e0d5] bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-4">Simple Process</p>
            <h1 className="font-serif text-6xl md:text-7xl font-light text-[#1a1a1a] leading-tight">How It Works</h1>
          </div>
          <p className="text-[#8a8078] leading-relaxed max-w-md">
            From first click to your door — five simple steps.
          </p>
        </div>
      </div>

      {/* Steps — alternating layout */}
      <div className="max-w-7xl mx-auto">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isEven = i % 2 === 0;
          return (
            <div key={s.num}
              className={`grid grid-cols-1 lg:grid-cols-2 border-b border-[#e8e0d5] ${i === 0 ? 'border-t border-[#e8e0d5]' : ''}`}>
              {/* Photo */}
              <div className={`relative h-64 lg:h-[420px] overflow-hidden ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
                <Image
                  src={s.photo}
                  alt={s.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Step number overlay */}
                <div className="absolute top-6 left-6">
                  <span className="font-serif text-6xl font-light text-white/30">{s.num}</span>
                </div>
              </div>

              {/* Copy */}
              <div className={`flex flex-col justify-center px-10 md:px-16 py-14 bg-white border-[#e8e0d5] ${isEven ? 'order-2 lg:order-2 lg:border-l' : 'order-2 lg:order-1 lg:border-r'}`}>
                <div className="w-8 h-8 bg-[#c9a84c]/10 flex items-center justify-center mb-5">
                  <Icon className="w-4 h-4 text-[#c9a84c]" />
                </div>
                <p className="text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium mb-2">Step {s.num}</p>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-[#1a1a1a] mb-5 leading-snug">{s.title}</h2>
                <p className="text-[#8a8078] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-24">
        <div className="mb-12 border-b border-[#e8e0d5] pb-8">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-3">FAQ</p>
          <h2 className="font-serif text-5xl font-light text-[#1a1a1a]">Common Questions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#e8e0d5]">
          {FAQS.map((f, i) => (
            <div key={f.q}
              className={`p-8 bg-white hover:bg-[#faf9f7] transition-colors ${
                i % 2 === 0 && i < FAQS.length - 1 ? 'border-r border-[#e8e0d5]' : ''
              } ${i < FAQS.length - 2 ? 'border-b border-[#e8e0d5]' : ''}`}>
              <p className="font-medium text-[#1a1a1a] mb-3 text-sm">{f.q}</p>
              <p className="text-sm text-[#8a8078] leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-[#e8e0d5] bg-white py-20 px-8 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1a1a1a] mb-2">Ready to start?</h2>
            <p className="text-[#8a8078]">Choose your service and get a free quote today.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link href="/repair"
              className="inline-flex items-center justify-center gap-2 py-4 px-8 bg-[#1a1a1a] text-white text-xs tracking-[0.1em] uppercase font-medium hover:bg-black transition-colors">
              <Scissors className="w-3.5 h-3.5" /> Repair My Wig
            </Link>
            <Link href="/new-wig"
              className="inline-flex items-center justify-center gap-2 py-4 px-8 border border-[#c9a84c] text-[#c9a84c] text-xs tracking-[0.1em] uppercase font-medium hover:bg-[#c9a84c] hover:text-white transition-colors">
              <Sparkles className="w-3.5 h-3.5" /> New Wig
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
