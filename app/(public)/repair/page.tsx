'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import OptionCard from '@/components/OptionCard';
import PhotoUpload from '@/components/PhotoUpload';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const ISSUES = [
  { label: 'Lace is damaged', icon: '🔧' },
  { label: 'Wig is missing hair', icon: '💇' },
  { label: 'Cap is damaged', icon: '🧢' },
  { label: 'Clips or combs are broken', icon: '📌' },
  { label: 'Wig is too loose or too tight', icon: '📏' },
  { label: 'Wig needs reshaping', icon: '✨' },
  { label: "I'm not sure", icon: '🤔' },
];

const PHOTO_SLOTS = [
  { key: 'front', label: 'Front of wig', required: true },
  { key: 'back', label: 'Back of wig', required: true },
  { key: 'inside', label: 'Inside cap', required: false },
  { key: 'damaged', label: 'Damaged area', required: false },
  { key: 'hairline', label: 'Hairline / top area', required: false },
];

const STEP_LABELS = ['Issue', 'Photos', 'Your Info'];

const inputClass = 'w-full border border-[#e8e0d5] bg-[#faf9f7] px-4 py-3.5 text-sm text-[#1a1a1a] placeholder:text-[#c0b8b0] focus:outline-none focus:border-[#c9a84c] focus:bg-white transition-colors';

export default function RepairPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [issueType, setIssueType] = useState('');
  const [photos, setPhotos] = useState<Record<string, File | null>>({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cityState, setCityState] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function validateStep3() {
    const e: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) e.name = 'Enter your full name';
    if (!phone.trim() || phone.trim().length < 10) e.phone = 'Enter a valid phone number';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep3()) return;
    setLoading(true);
    setSubmitError('');

    try {
      const uploadedPhotos: Array<{ photo_type: string; file_url: string; storage_path: string }> = [];
      for (const slot of PHOTO_SLOTS) {
        const file = photos[slot.key];
        if (!file) continue;
        const fd = new FormData();
        fd.append('file', file);
        fd.append('photo_type', slot.label);
        const res = await fetch('/api/requests/upload', { method: 'POST', body: fd });
        if (res.ok) {
          const data = await res.json();
          uploadedPhotos.push({ photo_type: slot.label, file_url: data.url, storage_path: data.path });
        }
      }

      const res = await fetch('/api/requests/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_type: 'repair',
          issue_type: issueType,
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
            <h1 className="font-serif text-5xl md:text-6xl font-light text-[#1a1a1a]">Repair My Wig</h1>
          </div>

          {/* Progress bar */}
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

        {/* Left — photo accent */}
        <div className="relative hidden lg:block">
          <Image
            src="/photos/wig_website_photo_22_thoughtful_portrait_in_soft_light.png"
            alt="Wig repair"
            fill
            className="object-cover object-top"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#faf9f7]/20" />
          <div className="absolute bottom-10 left-10 right-10">
            <div className="bg-white/90 backdrop-blur-sm border border-[#e8e0d5] p-6">
              <p className="font-serif text-2xl font-light text-[#1a1a1a] mb-1">Free quote,</p>
              <p className="font-serif text-2xl font-light text-[#c9a84c]">no commitment.</p>
              <p className="text-xs text-[#8a8078] mt-3 leading-relaxed">Upload photos and we'll send your price within 1–2 business days.</p>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="px-8 md:px-16 py-14 border-l border-[#e8e0d5] bg-white">

          {step === 1 && (
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium mb-3">Step 1 of 3</p>
              <h2 className="font-serif text-3xl font-light text-[#1a1a1a] mb-2">What needs to be fixed?</h2>
              <p className="text-sm text-[#8a8078] mb-8">Choose the best description. You can add details later.</p>
              <div className="flex flex-col gap-0 border border-[#e8e0d5]">
                {ISSUES.map((issue) => (
                  <div key={issue.label} className="border-b border-[#e8e0d5] last:border-b-0">
                    <OptionCard
                      label={issue.label}
                      icon={issue.icon}
                      selected={issueType === issue.label}
                      onClick={() => setIssueType(issue.label)}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => { if (issueType) setStep(2); }}
                disabled={!issueType}
                className="mt-8 w-full py-4 bg-[#1a1a1a] text-white text-xs tracking-[0.15em] uppercase font-medium disabled:opacity-30 hover:bg-black transition-colors flex items-center justify-center gap-2 group"
              >
                Next: Upload Photos
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium mb-3">Step 2 of 3</p>
              <h2 className="font-serif text-3xl font-light text-[#1a1a1a] mb-2">Upload photos of your wig</h2>
              <p className="text-sm text-[#8a8078] mb-8">More photos = more accurate quote. Front and back are required.</p>
              <div className="grid grid-cols-2 gap-4">
                {PHOTO_SLOTS.map((slot) => (
                  <PhotoUpload
                    key={slot.key}
                    label={slot.label}
                    required={slot.required}
                    file={photos[slot.key] ?? null}
                    onChange={(f) => setPhotos((p) => ({ ...p, [slot.key]: f }))}
                  />
                ))}
              </div>
              <p className="text-[10px] text-[#8a8078] mt-4">You can skip photos and add them later by email</p>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(1)}
                  className="flex-1 py-4 border border-[#e8e0d5] text-[#1a1a1a] text-xs tracking-[0.12em] uppercase font-medium hover:bg-[#faf9f7] transition-colors flex items-center justify-center gap-2">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button onClick={() => setStep(3)}
                  className="flex-1 py-4 bg-[#1a1a1a] text-white text-xs tracking-[0.12em] uppercase font-medium hover:bg-black transition-colors flex items-center justify-center gap-2 group">
                  Next: Your Info <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium mb-3">Step 3 of 3</p>
              <h2 className="font-serif text-3xl font-light text-[#1a1a1a] mb-2">Your contact info</h2>
              <p className="text-sm text-[#8a8078] mb-8">We&apos;ll use this to send your quote and keep you updated.</p>

              {submitError && (
                <div className="border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3 mb-6">{submitError}</div>
              )}

              <div className="flex flex-col gap-0 border border-[#e8e0d5]">
                <div className="border-b border-[#e8e0d5]">
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium px-4 pt-3 pb-1">
                    Full Name <span className="text-[#c9a84c]">*</span>
                  </label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" className={inputClass} />
                  {errors.name && <p className="text-red-500 text-xs px-4 pb-2">{errors.name}</p>}
                </div>
                <div className="border-b border-[#e8e0d5]">
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium px-4 pt-3 pb-1">
                    Phone Number <span className="text-[#c9a84c]">*</span>
                  </label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="(555) 123-4567" type="tel" className={inputClass} />
                  {errors.phone && <p className="text-red-500 text-xs px-4 pb-2">{errors.phone}</p>}
                </div>
                <div className="border-b border-[#e8e0d5]">
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium px-4 pt-3 pb-1">
                    Email Address <span className="text-[#c9a84c]">*</span>
                  </label>
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" type="email" className={inputClass} />
                  {errors.email && <p className="text-red-500 text-xs px-4 pb-2">{errors.email}</p>}
                </div>
                <div className="border-b border-[#e8e0d5]">
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium px-4 pt-3 pb-1">City &amp; State</label>
                  <input value={cityState} onChange={e => setCityState(e.target.value)} placeholder="Atlanta, GA" className={inputClass} />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-[#8a8078] font-medium px-4 pt-3 pb-1">Additional Notes</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)}
                    placeholder="Any other details about your wig or what you need..." rows={3} maxLength={1000}
                    className={`${inputClass} resize-none`} />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button type="button" onClick={() => setStep(2)}
                  className="flex-1 py-4 border border-[#e8e0d5] text-[#1a1a1a] text-xs tracking-[0.12em] uppercase font-medium hover:bg-[#faf9f7] transition-colors flex items-center justify-center gap-2">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 py-4 bg-[#c9a84c] text-white text-xs tracking-[0.12em] uppercase font-medium hover:bg-[#b8943e] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading && <span className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" />}
                  {loading ? 'Submitting…' : 'Get My Repair Quote'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
