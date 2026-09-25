import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getGallery } from '@/lib/dataService';
import AdminGalleryClient from './AdminGalleryClient';

export const revalidate = 0;

export default async function AdminGalleryPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const gallery = await getGallery();

  return <AdminGalleryClient initialGallery={gallery} />;
}
