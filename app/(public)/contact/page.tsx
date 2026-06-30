'use client';
import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Mail, Clock, Package, ArrowRight } from 'lucide-react';

const INFO = [
  {
    icon: MapPin,
    title: 'Mail-In Service',
    body: 'We accept wigs by mail nationwide. Submit your request first to receive our mailing address and packing instructions.',
  },
  {
    icon: Mail,
    title: 'Email',
    body: 'info@wigrepairportal.com',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    body: 'Monday – Friday: 9am – 5pm\nSaturday: By appointment\nSunday: Closed',
  },
  {
    icon: Package,
    title: 'Local Drop-Off',
    body: 'Local drop-off may be available. Contact us to ask about options in your area.',
  },
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (res.ok) { setSubmitted(true); }
      else { const d = await res.json(); setError(d.error || 'Failed to send. Please try again.'); }
    } catch { setError('Something went wrong. Please try again.'); }
    setLoading(false);
  }

  const inputClass = 'w-full border border-[#e8e0d5] bg-[#faf9f7] px-4 py-3.5 text-sm text-[#1a1a1a] placeholder:text-[#c0b8b0] focus:outline-none focus:border-[#c9a84c] focus:bg-white transition-colors';

  return (
    <div className="bg-[#faf9f7] min-h-screen">

      {/* Page header */}
      <div className="border-b border-[#e8e0d5] bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-4">Get In Touch</p>
            <h1 className="font-serif text-6xl md:text-7xl font-light text-[#1a1a1a] leading-tight">Contact Us</h1>
          </div>
          <p className="text-[#8a8078] leading-relaxed max-w-md">
            Have a question? We&apos;re here to help. Send us a message and we&apos;ll respond within 1–2 business days.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left — info + photo */}
        <div className="flex flex-col gap-0">
          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-[#e8e0d5] mb-10">
            {INFO.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.title}
                  className={`p-7 bg-white ${
                    i % 2 === 0 ? 'border-r border-[#e8e0d5]' : ''
                  } ${i < 2 ? 'border-b border-[#e8e0d5]' : ''}`}>
                  <Icon className="w-4 h-4 text-[#c9a84c] mb-4" strokeWidth={1.5} />
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium mb-2">{item.title}</p>
                  <p className="text-sm text-[#4a4a4a] leading-relaxed whitespace-pre-line">{item.body}</p>
                </div>
              );
            })}
          </div>

          {/* Photo */}
          <div className="relative h-72 overflow-hidden border border-[#e8e0d5]">
            <Image
              src="/photos/wig_website_photo_06_elegant_beauty_portrait_with_soft_lighting.png"
              alt="Contact"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-serif text-2xl font-light text-white">We&apos;d love to help.</p>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#8a8078] font-medium mb-8">Send a Message</p>

          {submitted ? (
            <div className="border border-[#e8e0d5] bg-white p-12 text-center">
              <div className="w-12 h-12 bg-[#c9a84c]/10 flex items-center justify-center mx-auto mb-6">
                <ArrowRight className="w-5 h-5 text-[#c9a84c]" />
              </div>
              <h3 className="font-serif text-3xl font-light text-[#1a1a1a] mb-3">Message Sent</h3>
              <p className="text-[#8a8078] text-sm">We&apos;ll get back to you within 1–2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-0 border border-[#e8e0d5]">
              {error && (
                <div className="bg-red-50 border-b border-red-200 text-red-700 text-sm px-5 py-3">
                  {error}
                </div>
              )}

              <div className="border-b border-[#e8e0d5]">
                <label className="block text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium px-5 pt-4 pb-1">
                  Name <span className="text-[#c9a84c]">*</span>
                </label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Jane Smith"
                  className={inputClass}
                />
              </div>

              <div className="border-b border-[#e8e0d5]">
                <label className="block text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium px-5 pt-4 pb-1">
                  Email <span className="text-[#c9a84c]">*</span>
                </label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <div className="border-b border-[#e8e0d5]">
                <label className="block text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium px-5 pt-4 pb-1">
                  Phone
                </label>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  type="tel"
                  placeholder="(555) 123-4567"
                  className={inputClass}
                />
              </div>

              <div className="border-b border-[#e8e0d5]">
                <label className="block text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium px-5 pt-4 pb-1">
                  Message <span className="text-[#c9a84c]">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  rows={6}
                  maxLength={2000}
                  placeholder="What can we help you with?"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-[#1a1a1a] text-white text-xs tracking-[0.15em] uppercase font-medium hover:bg-black transition-colors disabled:opacity-60 flex items-center justify-center gap-2 group">
                {loading ? 'Sending…' : (
                  <>
                    Send Message
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
