import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getUpcomingEvents, getExpiredEvents } from '@/lib/dataService';
import AdminEventsClient from './AdminEventsClient';

export const revalidate = 0;

export default async function AdminEventsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const [upcoming, expired] = await Promise.all([
    getUpcomingEvents(),
    getExpiredEvents(),
  ]);

  return <AdminEventsClient initialUpcoming={upcoming} initialExpired={expired} />;
}
