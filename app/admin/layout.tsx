import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <AdminSidebar />
      <div className="md:ml-56 pb-20 md:pb-0">
        {children}
      </div>
    </div>
  );
}
