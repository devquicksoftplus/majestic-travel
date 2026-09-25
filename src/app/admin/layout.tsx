import { getAdminSession } from '@/lib/auth';
import Link from 'next/link';
import NextImage from 'next/image';
import { ExternalLink, Shield } from 'lucide-react';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';
import AdminSidebarNav from '@/components/admin/AdminSidebarNav';
import { AuthProvider } from '@/context/AuthContext';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If unauthenticated or accessing /admin/login, render children cleanly without the admin sidebar
  if (!session) {
    return <>{children}</>;
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#F7F8FA] text-[#303D68] flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 shadow-xs">
          <div>
            {/* Logo & Admin Status */}
            <div className="p-6 border-b border-slate-100">
              <Link href="/admin" className="flex flex-col gap-2 group">
                <NextImage
                  src="/logo.png"
                  alt="Majestic Travels"
                  width={160}
                  height={48}
                  className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
                <span className="font-sans text-[11px] font-bold tracking-widest text-[#B38F1E] uppercase">
                  ADMIN PORTAL
                </span>
              </Link>

              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60">
                <Shield className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span className="truncate font-mono font-medium">{session.email}</span>
              </div>
            </div>

            {/* Nav Links with active route state */}
            <AdminSidebarNav />
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/50">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200/80 text-xs font-semibold text-slate-600 hover:text-[#26345C] hover:border-[#D4AF37] shadow-2xs transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <AdminLogoutButton />
          </div>
        </aside>

        {/* Main Admin Content Area */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
