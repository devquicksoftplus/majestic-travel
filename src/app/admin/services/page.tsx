import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getServices } from '@/lib/dataService';
import AdminServicesClient from './AdminServicesClient';

export const revalidate = 0;

export default async function AdminServicesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const services = await getServices();

  return <AdminServicesClient initialServices={services} />;
}
