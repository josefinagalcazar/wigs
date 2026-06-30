export const dynamic = 'force-dynamic';
import { getServiceClient } from '@/lib/supabase/service';
import Link from 'next/link';

export default async function GalleryPage() {
  const db = getServiceClient();
  const { data: items } = await db.from('gallery_items').select('*').order('created_at', { ascending: false });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Before & After Gallery</h1>
        <span className="text-sm text-[#8a8078]">{(items ?? []).length} items</span>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
        📸 Gallery management coming soon. You'll be able to upload before & after photos directly from this page.
      </div>

      {(items ?? []).length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e8e0d5] p-12 text-center shadow-sm">
          <div className="text-5xl mb-4">🖼️</div>
          <p className="font-semibold text-[#1a1a1a] mb-2">No gallery items yet</p>
          <p className="text-sm text-[#8a8078]">Before & after photos will appear here once uploaded.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(items ?? []).map((item: Record<string, string | boolean | null>) => (
            <div key={item.id as string} className="bg-white rounded-2xl border border-[#e8e0d5] shadow-sm overflow-hidden">
              <div className="grid grid-cols-2 h-40">
                {[item.before_image_url, item.after_image_url].map((url, i) => (
                  <div key={i} className="relative bg-[#f5f0eb] flex items-center justify-center">
                    {url ? <img src={url as string} alt={i === 0 ? 'Before' : 'After'} className="w-full h-full object-cover" /> : <span className="text-xs text-[#8a8078]">{i === 0 ? 'Before' : 'After'}</span>}
                    <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">{i === 0 ? 'Before' : 'After'}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  {item.title && <p className="text-sm font-medium text-[#1a1a1a]">{item.title as string}</p>}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${item.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {item.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
