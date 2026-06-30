export const dynamic = 'force-dynamic';
import Image from 'next/image';
import { getServiceClient } from '@/lib/supabase/service';

// Static showcase pairs using our photo library
const SHOWCASE = [
  {
    before: '/photos/wig_website_photo_03_contemplative_portrait_in_neutral_tones.png',
    after: '/photos/wig_website_photo_01_confidence_in_luxury_haircare.png',
    title: 'Full Lace Repair & Restyle',
    label: 'Repair',
  },
  {
    before: '/photos/wig_website_photo_22_thoughtful_portrait_in_soft_light.png',
    after: '/photos/wig_website_photo_08_elegant_glamour_with_soft_waves.png',
    title: 'Cap Repair & Volume Restore',
    label: 'Repair',
  },
  {
    before: '/photos/wig_website_photo_18_professional_portrait_in_warm_neutrals.png',
    after: '/photos/wig_website_photo_14_luxe_elegance_with_timeless_beauty.png',
    title: 'Custom New Wig — Sleek Style',
    label: 'New Wig',
  },
  {
    before: '/photos/wig_website_photo_16_mature_black_man_in_professional_portrait.png',
    after: '/photos/wig_website_photo_21_sophisticated_studio_portrait_of_man.png',
    title: 'Men\'s Hair System Restoration',
    label: 'Repair',
  },
  {
    before: '/photos/wig_website_photo_02_contemplative_executive_in_modern_office.png',
    after: '/photos/wig_website_photo_20_sophisticated_modern_portrait_in_luxury_setting.png',
    title: 'Natural Style New Wig',
    label: 'New Wig',
  },
  {
    before: '/photos/wig_website_photo_09_elegant_portrait_in_soft_lighting.png',
    after: '/photos/wig_website_photo_19_sleek_beauty_portrait_with_glossy_hair.png',
    title: 'Glossy Finish Restyle',
    label: 'Repair',
  },
];

export default async function BeforeAfterPage() {
  const db = getServiceClient();
  const { data: items } = await db.from('gallery_items').select('*').eq('is_published', true).order('created_at', { ascending: false });
  const gallery = items ?? [];

  return (
    <div className="bg-[#faf9f7] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-[#e8e0d5] py-16 px-4 text-center">
        <p className="text-[#c9a84c] text-xs font-semibold tracking-widest uppercase mb-3">Our Work</p>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">Before &amp; After</h1>
        <p className="text-[#8a8078] text-lg max-w-xl mx-auto">
          See the difference professional wig repair and craftsmanship makes.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {gallery.length > 0 ? (
          // DB gallery items
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item: Record<string, string | boolean | null>) => (
              <div key={item.id as string} className="bg-white border border-[#e8e0d5] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-2 h-56">
                  <div className="relative bg-[#f5f0eb] flex items-center justify-center">
                    {item.before_image_url ? (
                      <Image src={item.before_image_url as string} alt="Before" fill className="object-cover object-top" sizes="200px" />
                    ) : (
                      <span className="text-[#8a8078] text-xs">Before</span>
                    )}
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full font-medium">Before</span>
                  </div>
                  <div className="relative bg-[#f5f0eb] flex items-center justify-center">
                    {item.after_image_url ? (
                      <Image src={item.after_image_url as string} alt="After" fill className="object-cover object-top" sizes="200px" />
                    ) : (
                      <span className="text-[#8a8078] text-xs">After</span>
                    )}
                    <span className="absolute bottom-2 right-2 bg-[#c9a84c] text-white text-xs px-2 py-0.5 rounded-full font-medium">After</span>
                  </div>
                </div>
                <div className="p-5">
                  {item.title && <p className="font-semibold text-[#1a1a1a] text-sm mb-1">{item.title as string}</p>}
                  {item.description && <p className="text-xs text-[#8a8078]">{item.description as string}</p>}
                  {item.service_type && (
                    <span className="mt-2 inline-block px-2.5 py-1 bg-[#fdf8ee] border border-[#e8e0d5] text-xs text-[#c9a84c] rounded-full font-semibold">
                      {item.service_type === 'repair' ? '✂️ Repair' : '✨ New Wig'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Showcase with static photos
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHOWCASE.map((item, i) => (
              <div key={i} className="bg-white border border-[#e8e0d5] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="relative h-64">
                  <div className="grid grid-cols-2 h-full">
                    {/* Before */}
                    <div className="relative overflow-hidden">
                      <Image
                        src={item.before}
                        alt={`Before — ${item.title}`}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        sizes="200px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full font-medium">Before</span>
                    </div>
                    {/* After */}
                    <div className="relative overflow-hidden border-l-2 border-white">
                      <Image
                        src={item.after}
                        alt={`After — ${item.title}`}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        sizes="200px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#c9a84c]/30 to-transparent" />
                      <span className="absolute bottom-2 right-2 bg-[#c9a84c] text-white text-xs px-2 py-0.5 rounded-full font-medium">After</span>
                    </div>
                  </div>
                  {/* Center divider line */}
                  <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white z-10 -translate-x-1/2" />
                </div>
                <div className="p-5">
                  <p className="font-semibold text-[#1a1a1a] text-sm mb-2">{item.title}</p>
                  <span className={`inline-block px-2.5 py-1 text-xs rounded-full font-semibold ${
                    item.label === 'Repair'
                      ? 'bg-[#f5f0eb] text-[#8a8078] border border-[#e8e0d5]'
                      : 'bg-[#fdf8ee] text-[#c9a84c] border border-[#c9a84c]/20'
                  }`}>
                    {item.label === 'Repair' ? '✂️ Repair' : '✨ New Wig'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
