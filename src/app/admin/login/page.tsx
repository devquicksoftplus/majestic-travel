import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Executive Admin Login | Majestic Voyages',
  description: 'Secure administrator access for Majestic Voyages CMS portal.',
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-[#06090E] relative flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Ambient background luxury lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-sky-950/20 rounded-full blur-[100px] pointer-events-none" />

      {/* White Luxury Card */}
      <div className="w-full max-w-[440px] p-8 sm:p-10 rounded-[28px] bg-white border border-[#D4AF37]/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}
