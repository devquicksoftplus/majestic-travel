import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getSiteSettings } from '@/lib/dataService';
import AdminSettingsClient from './AdminSettingsClient';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const settings = await getSiteSettings();

  return <AdminSettingsClient initialSettings={settings} />;
}
