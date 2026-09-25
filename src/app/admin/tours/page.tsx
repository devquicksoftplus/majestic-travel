import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getTours } from '@/lib/dataService';
import AdminToursClient from './AdminToursClient';

export const revalidate = 0;

export default async function AdminToursPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const tours = await getTours();

  return <AdminToursClient initialTours={tours} />;
}
