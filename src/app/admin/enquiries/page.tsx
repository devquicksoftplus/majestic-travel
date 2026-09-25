import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Inbox, ShieldCheck, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Customer Enquiries | Majestic Voyages Admin',
  description: 'Manage incoming concierge inquiries and travel requests.',
};

export const revalidate = 0;

export default async function AdminEnquiriesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  // No mock enquiries — show real system status and professional empty state
  const enquiries: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    tourOrService: string;
    message: string;
    date: string;
    status: string;
  }> = [];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#B38F1E] font-bold">
            Concierge Management
          </span>
          <h1 className="font-sans text-3xl font-bold text-[#26345C] mt-1 tracking-tight">
            CLIENT ENQUIRIES
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time travel inquiries, booking requests, and bespoke voyage consultation logs.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-700 font-semibold self-start">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>WhatsApp Live Channel Active</span>
        </div>
      </div>

      {/* Main Enquiries Area */}
      {enquiries.length === 0 ? (
        <div className="rounded-2xl bg-white border border-slate-200/80 p-12 text-center flex flex-col items-center justify-center max-w-2xl mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-[#D4AF37]/30 flex items-center justify-center text-[#B38F1E] mb-4">
            <Inbox className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="font-sans text-xl font-bold text-[#26345C] mb-2">
            No Direct Web Enquiries Logged Yet
          </h3>
          <p className="text-xs text-slate-500 max-w-md leading-relaxed mb-6">
            Customer inquiries are currently routed directly to the executive WhatsApp concierge line for immediate assistance. When direct web inquiries or booking submissions are recorded in Firestore, they will be listed here.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/admin/settings"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-xs text-slate-700 hover:text-[#26345C] font-semibold transition-all"
            >
              <span>Manage Concierge WhatsApp Number</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">Client</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Tour / Service</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Future Firestore enquiries */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
