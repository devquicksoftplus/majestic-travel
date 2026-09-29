import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getPromotions } from '@/lib/dataService';
import AdminPromotionsClient from './AdminPromotionsClient';

export const revalidate = 0;

export default async function AdminPromotionsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const promotions = await getPromotions();

  return <AdminPromotionsClient initialPromotions={promotions} />;
}
