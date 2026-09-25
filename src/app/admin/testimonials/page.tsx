import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getTestimonials } from '@/lib/dataService';
import AdminTestimonialsClient from './AdminTestimonialsClient';

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const testimonials = await getTestimonials();

  return <AdminTestimonialsClient initialTestimonials={testimonials} />;
}
