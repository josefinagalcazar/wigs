'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import OptionCard from '@/components/OptionCard';
import PhotoUpload from '@/components/PhotoUpload';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const WIG_FOR = [
  { label: 'Woman', icon: '👩' },
  { label: 'Man', icon: '👨' },
  { label: 'Child', icon: '👧' },
  { label: 'Medical hair loss', icon: '💛' },
  { label: 'Everyday wear', icon: '🌟' },
  { label: 'Fashion / style', icon: '💅' },
  { label: "I'm not sure", icon: '🤔' },
];

const STYLES = [
  { label: 'Short', icon: '✂️' },
  { label: 'Medium', icon: '💇' },
  { label: 'Long', icon: '👱' },
  { label: 'Straight', icon: '➡️' },
  { label: 'Wavy', icon: '〰️' },
  { label: 'Curly', icon: '🌀' },
  { label: 'Natural look', icon: '🌿' },
  { label: 'Custom color', icon: '🎨' },
  { label: 'I want help choosing', icon: '💬' },
];

const BUDGETS = [
  'Under $250', '$250–$500', '$500–$1,000', '$1,000–$1,500', '$1,500+', "I'm not sure",
];

const STEP_LABELS = ['Who', 'Style', 'Photos', 'Your Info'];

const SIDE_PHOTOS = [
  '/photos/wig_website_photo_14_luxe_elegance_with_timeless_beauty.png',
  '/photos/wig_website_photo_08_elegant_glamour_with_soft_waves.png',
  '/photos/wig_website_photo_19_sleek_beauty_portrait_with_glossy_hair.png',
  '/photos/wig_website_photo_15_luxury_hair_system_ad_portrait.png',
];

const inputClass = 'w-full border border-[#e8e0d5] bg-[#faf9f7] px-4 py-3.5 text-sm text-[#1a1a1a] placeholder:text-[#c0b8b0] focus:outline-none focus:border-[#c9a84c] focus:bg-white transition-colors';

export default function NewWigPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [wigFor, setWigFor] = useState('');
  const [style, setStyle] = useState('');
  const [inspirationPhotos, setInspirationPhotos] = useState<(File | null)[]>([null, null, null]);
  const [currentWigPhoto, setCurrentWigPhoto] = useState<File | null>(null);
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cityState, setCityState] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function validateStep4() {
    const e: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) e.name = 'Enter your full name';
    if (!phone.trim() || phone.trim().length < 10) e.phone = 'Enter a valid phone number';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!budget) e.budget = 'Please select a budget range';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep4()) return;
    setLoading(true);
    setSubmitError('');

    try {
      const uploadedPhotos: Array<{ photo_type: string; file_url: string; storage_path: string }> = [];

      for (let i = 0; i < inspirationPhotos.length; i++) {
        const file = inspirationPhotos[i];
        if (!file) continue;
        const fd = new FormData();
        fd.append('file', file);
        fd.append('photo_type', `Inspiration photo ${i + 1}`);
        const res = await fetch('/api/requests/upload', { method: 'POST', body: fd });
        if (res.ok) {
          const data = await res.json();
          uploadedPhotos.push({ photo_type: `Inspiration photo ${i + 1}`, file_url: data.url, storage_path: data.path });
        }
      }

      if (currentWigPhoto) {
        const fd = new FormData();
        fd.append('file', currentWigPhoto);
        fd.append('photo_type', 'Current wig');
        const res = await fetch('/api/requests/upload', { method: 'POST', body: fd });
        if (res.ok) {
          const data = await res.json();
          uploadedPhotos.push({ photo_type: 'Current wig', file_url: data.url, storage_path: data.path });
        }
      }

      const res = await fetch('/api/requests/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_type: 'new_wig',
          wig_for: wigFor,
          style_requested: style,
          budget_range: budget,
          customer_name: name.trim(),
          customer_phone: phone.trim(),
          customer_email: email.trim(),
          customer_city_state: cityState.trim() || undefined,
          customer_notes: notes.trim() || undefined,
          photos: uploadedPhotos,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
        return;
      }
      router.push(`/confirmation/${data.order_number}`);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#faf9f7] min-h-screen">
      {/* Page header */}
      <div className="border-b border-[#e8e0d5] bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#c9a84c] font-medium mb-3">Free Quote</p>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-[#1a1a1a]">Order a New Wig</h1>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-0">
            {STEP_LABELS.map((label, i) => {
              const s = i + 1;
              const done = s < step;
              const active = s === step;
              return (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={`w-7 h-7 flex items-center justify-center text-xs font-medium transition-colors ${
                      done ? 'bg-[#c9a84c] text-white' : active ? 'bg-[#1a1a1a] text-white' : 'bg-[#e8e0d5] text-[#8a8078]'
                    }`}>
                      {done ? '✓' : s}
                    </div>
                    <span className={`text-[9px] tracking-widest uppercase font-medium ${active ? 'text-[#1a1a1a]' : 'text-[#8a8078]'}`}>{label}</span>
                  </div>
                  {s < STEP_LABELS.length && (
                    <div className={`flex-1 h-px mx-2 mb-4 ${done ? 'bg-[#c9a84c]' : 'bg-[#e8e0d5]'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form area */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-180px)]">

        {/* Left — photo accent (changes per step) */}
        <div className="relative hidden lg:block">
          <Image
            src={SIDE_PHOTOS[step - 1]}
            alt="New wig"
            fill
            className="object-cover object-top transition-opacity duration-500"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#faf9f7]/10" />
          <div className="absolute bottom-10 left-10 right-10">
            <div className="bg-white/90 backdrop-blur-sm border border-[#e8e0d5] p-6">
              <p className="font-serif text-2xl font-light text-[#1a1a1a] mb-1">Made just for</p>
              <p className="font-serif text-2xl font-light text-[#c9a84c]">you.</p>
              <p className="text-xs text-[#8a8078] mt-3 leading-relaxed">Send inspiration photos and we'll craft a custom quote.</p>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="px-8 md:px-16 py-14 border-l border-[#e8e0d5] bg-white">

          {step === 1 && (
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium mb-3">Step 1 of 4</p>
              <h2 className="font-serif text-3xl font-light text-[#1a1a1a] mb-2">Who is the wig for?</h2>
              <p className="text-sm text-[#8a8078] mb-8">This helps us make the right recommendation.</p>
              <div className="flex flex-col gap-0 border border-[#e8e0d5]">
                {WIG_FOR.map((o) => (
                  <div key={o.label} className="border-b border-[#e8e0d5] last:border-b-0">
                    <OptionCard label={o.label} icon={o.icon} selected={wigFor === o.label} onClick={() => setWigFor(o.label)} />
                  </div>
                ))}
              </div>
              <button onClick={() => { if (wigFor) setStep(2); }} disabled={!wigFor}
                className="mt-8 w-full py-4 bg-[#1a1a1a] text-white text-xs tracking-[0.15em] uppercase font-medium disabled:opacity-30 hover:bg-black transition-colors flex items-center justify-center gap-2 group">
                Next: Choose Style <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium mb-3">Step 2 of 4</p>
              <h2 className="font-serif text-3xl font-light text-[#1a1a1a] mb-2">What style do you want?</h2>
              <p className="text-sm text-[#8a8078] mb-8">Pick the closest match. You can describe more in your notes.</p>
              <div className="flex flex-col gap-0 border border-[#e8e0d5]">
                {STYLES.map((o) => (
                  <div key={o.label} className="border-b border-[#e8e0d5] last:border-b-0">
                    <OptionCard label={o.label} icon={o.icon} selected={style === o.label} onClick={() => setStyle(o.label)} />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(1)}
                  className="flex-1 py-4 border border-[#e8e0d5] text-[#1a1a1a] text-xs tracking-[0.12em] uppercase font-medium hover:bg-[#faf9f7] transition-colors flex items-center justify-center gap-2">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button onClick={() => { if (style) setStep(3); }} disabled={!style}
                  className="flex-1 py-4 bg-[#1a1a1a] text-white text-xs tracking-[0.12em] uppercase font-medium disabled:opacity-30 hover:bg-black transition-colors flex items-center justify-center gap-2 group">
                  Next: Photos <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium mb-3">Step 3 of 4</p>
              <h2 className="font-serif text-3xl font-light text-[#1a1a1a] mb-2">Upload inspiration photos</h2>
              <p className="text-sm text-[#8a8078] mb-8">Show us what you love. Screenshots, photos, anything works.</p>
              <div className="grid grid-cols-2 gap-4">
                {[0, 1, 2].map((i) => (
                  <PhotoUpload key={i} label={`Inspiration photo ${i + 1}`}
                    file={inspirationPhotos[i]}
                    onChange={(f) => setInspirationPhotos(prev => { const n = [...prev]; n[i] = f; return n; })} />
                ))}
                <PhotoUpload label="Your current wig (if replacing)" file={currentWigPhoto} onChange={setCurrentWigPhoto} />
              </div>
              <p className="text-[10px] text-[#8a8078] mt-4">Photos are optional — you can skip and describe in notes</p>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(2)}
                  className="flex-1 py-4 border border-[#e8e0d5] text-[#1a1a1a] text-xs tracking-[0.12em] uppercase font-medium hover:bg-[#faf9f7] transition-colors flex items-center justify-center gap-2">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button onClick={() => setStep(4)}
                  className="flex-1 py-4 bg-[#1a1a1a] text-white text-xs tracking-[0.12em] uppercase font-medium hover:bg-black transition-colors flex items-center justify-center gap-2 group">
                  Next: Your Info <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handleSubmit}>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium mb-3">Step 4 of 4</p>
              <h2 className="font-serif text-3xl font-light text-[#1a1a1a] mb-2">Your contact info &amp; budget</h2>
              <p className="text-sm text-[#8a8078] mb-8">We&apos;ll use this to send your custom quote.</p>

              {submitError && (
                <div className="border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3 mb-6">{submitError}</div>
              )}

              <div className="flex flex-col gap-0 border border-[#e8e0d5] mb-6">
                <div className="border-b border-[#e8e0d5]">
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium px-4 pt-3 pb-1">Full Name <span className="text-[#c9a84c]">*</span></label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" className={inputClass} />
                  {errors.name && <p className="text-red-500 text-xs px-4 pb-2">{errors.name}</p>}
                </div>
                <div className="border-b border-[#e8e0d5]">
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium px-4 pt-3 pb-1">Phone Number <span className="text-[#c9a84c]">*</span></label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="(555) 123-4567" type="tel" className={inputClass} />
                  {errors.phone && <p className="text-red-500 text-xs px-4 pb-2">{errors.phone}</p>}
                </div>
                <div className="border-b border-[#e8e0d5]">
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium px-4 pt-3 pb-1">Email Address <span className="text-[#c9a84c]">*</span></label>
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" type="email" className={inputClass} />
                  {errors.email && <p className="text-red-500 text-xs px-4 pb-2">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium px-4 pt-3 pb-1">City &amp; State</label>
                  <input value={cityState} onChange={e => setCityState(e.target.value)} placeholder="Atlanta, GA" className={inputClass} />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium mb-3">
                  Budget Range <span className="text-[#c9a84c]">*</span>
                </label>
                <div className="flex flex-col gap-0 border border-[#e8e0d5]">
                  {BUDGETS.map((b) => (
                    <div key={b} className="border-b border-[#e8e0d5] last:border-b-0">
                      <OptionCard label={b} selected={budget === b} onClick={() => setBudget(b)} />
                    </div>
                  ))}
                </div>
                {errors.budget && <p className="text-red-500 text-xs mt-2">{errors.budget}</p>}
              </div>

              <div className="border border-[#e8e0d5] mb-8">
                <label className="block text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium px-4 pt-3 pb-1">Additional Notes</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)}
                  placeholder="Describe the look you want, any specific requests..." rows={3} maxLength={1000}
                  className={`${inputClass} resize-none`} />
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(3)}
                  className="flex-1 py-4 border border-[#e8e0d5] text-[#1a1a1a] text-xs tracking-[0.12em] uppercase font-medium hover:bg-[#faf9f7] transition-colors flex items-center justify-center gap-2">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 py-4 bg-[#c9a84c] text-white text-xs tracking-[0.12em] uppercase font-medium hover:bg-[#b8943e] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading && <span className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" />}
                  {loading ? 'Submitting…' : 'Get My New Wig Quote'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
