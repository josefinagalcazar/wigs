import Header from '@/components/Header';
import Link from 'next/link';
import { Scissors } from 'lucide-react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>

      <footer className="bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-white/10 pb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-7 h-7 bg-white/10 flex items-center justify-center">
                  <Scissors className="w-3.5 h-3.5 text-[#c9a84c]" strokeWidth={1.5} />
                </div>
                <span className="font-serif text-lg font-light tracking-wide">Wig Repair <span className="text-[9px] ml-1 tracking-[0.2em] uppercase text-[#c9a84c] font-medium align-middle">Studio</span></span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Professional wig repairs and new wig orders. Upload photos, get a quote, receive your wig.
              </p>
            </div>

            {/* Services */}
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#c9a84c] font-medium mb-5">Services</p>
              <div className="flex flex-col gap-3">
                {[
                  { href: '/repair', label: 'Repair My Wig' },
                  { href: '/new-wig', label: 'Order a New Wig' },
                  { href: '/pricing', label: 'Pricing' },
                ].map(l => (
                  <Link key={l.href} href={l.href} className="text-white/50 text-sm hover:text-white transition-colors">{l.label}</Link>
                ))}
              </div>
            </div>

            {/* Help */}
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#c9a84c] font-medium mb-5">Help</p>
              <div className="flex flex-col gap-3">
                {[
                  { href: '/how-it-works', label: 'How It Works' },
                  { href: '/before-after', label: 'Before & After' },
                  { href: '/track', label: 'Track My Order' },
                  { href: '/contact', label: 'Contact' },
                ].map(l => (
                  <Link key={l.href} href={l.href} className="text-white/50 text-sm hover:text-white transition-colors">{l.label}</Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-xs tracking-wide">
            <p>© {new Date().getFullYear()} Wig Repair Studio. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
              <Link href="/admin/login" className="hover:text-white/60 transition-colors">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
