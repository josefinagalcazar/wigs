'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Scissors, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/before-after', label: 'Before & After' },
  { href: '/contact', label: 'Contact' },
  { href: '/track', label: 'Track My Order' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#faf9f7]/95 backdrop-blur-md shadow-sm' : 'bg-[#faf9f7]'} border-b border-[#e8e0d5]`}>
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-7 h-7 bg-[#1a1a1a] flex items-center justify-center">
            <Scissors className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <span className="font-serif text-lg font-light tracking-wide text-[#1a1a1a]">Wig Repair</span>
            <span className="text-[9px] ml-2 tracking-[0.2em] uppercase text-[#c9a84c] font-medium">Studio</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href}
              className="text-xs tracking-[0.08em] uppercase text-[#8a8078] hover:text-[#1a1a1a] transition-colors font-medium">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/repair"
            className="px-5 py-2.5 border border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.08em] uppercase font-medium hover:bg-[#1a1a1a] hover:text-white transition-colors">
            Repair
          </Link>
          <Link href="/new-wig"
            className="px-5 py-2.5 bg-[#c9a84c] text-white text-xs tracking-[0.08em] uppercase font-medium hover:bg-[#b8943e] transition-colors">
            New Wig
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-5 h-5 text-[#1a1a1a]" /> : <Menu className="w-5 h-5 text-[#1a1a1a]" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-[#e8e0d5] bg-[#faf9f7] px-8 pt-4 pb-8 flex flex-col gap-0">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href}
              className="text-xs tracking-[0.1em] uppercase text-[#1a1a1a] py-4 border-b border-[#e8e0d5] font-medium"
              onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/repair"
              className="w-full text-center py-3.5 border border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.1em] uppercase font-medium"
              onClick={() => setOpen(false)}>
              Repair My Wig
            </Link>
            <Link href="/new-wig"
              className="w-full text-center py-3.5 bg-[#c9a84c] text-white text-xs tracking-[0.1em] uppercase font-medium"
              onClick={() => setOpen(false)}>
              Order a New Wig
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
