'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { href: '/admin/requests', label: 'All Requests', icon: '📋' },
  { href: '/admin/requests?filter=repair', label: 'Repairs', icon: '✂️' },
  { href: '/admin/requests?filter=new_wig', label: 'New Wigs', icon: '✨' },
  { href: '/admin/requests?filter=waiting', label: 'Waiting for Wig', icon: '📦' },
  { href: '/admin/requests?filter=in_repair', label: 'In Repair', icon: '🔧' },
  { href: '/admin/requests?filter=payment', label: 'Ready for Payment', icon: '💳' },
  { href: '/admin/requests?filter=completed', label: 'Completed', icon: '✅' },
  { href: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-[#1a1a1a] min-h-screen fixed left-0 top-0 z-40">
        <div className="px-5 py-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xl">✂️</span>
            <div>
              <p className="text-white font-bold text-sm">Admin Portal</p>
              <p className="text-gray-500 text-xs">Wig Repair</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {NAV.map(item => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href.split('?')[0]);
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  active ? 'bg-[#c9a84c] text-white font-semibold' : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <span>🚪</span><span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-white/10 flex z-40">
        {[
          { href: '/admin', icon: '📊', label: 'Home', exact: true },
          { href: '/admin/requests', icon: '📋', label: 'Requests' },
          { href: '/admin/gallery', icon: '🖼️', label: 'Gallery' },
          { href: '/admin/settings', icon: '⚙️', label: 'Settings' },
        ].map(item => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={`flex-1 flex flex-col items-center py-2 text-xs gap-1 transition-colors ${active ? 'text-[#c9a84c]' : 'text-gray-500'}`}>
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
