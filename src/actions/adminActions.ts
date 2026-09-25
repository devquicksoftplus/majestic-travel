'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createTour as dbCreateTour,
  updateTour as dbUpdateTour,
  deleteTour as dbDeleteTour,
  getTourById as dbGetTourById,
  createEvent as dbCreateEvent,
  updateEvent as dbUpdateEvent,
  deleteEvent as dbDeleteEvent,
  getEventById as dbGetEventById,
  getPromotions as dbGetPromotions,
  createPromotion as dbCreatePromotion,
  updatePromotion as dbUpdatePromotion,
  deletePromotion as dbDeletePromotion,
  setActivePromotion as dbSetActivePromotion,
  createGalleryItem as dbCreateGalleryItem,
  deleteGalleryItem as dbDeleteGalleryItem,
  getGalleryItemById as dbGetGalleryItemById,
  updateService as dbUpdateService,
  createService as dbCreateService,
  deleteService as dbDeleteService,
  createTestimonial as dbCreateTestimonial,
  deleteTestimonial as dbDeleteTestimonial,
  updateSiteSettings as dbUpdateSiteSettings,
} from '@/lib/dataService';
import { createAdminSession, clearAdminSession, getAdminSession } from '@/lib/auth';
import { deleteCloudinaryImage, extractCloudinaryPublicId } from '@/lib/cloudinary';
import { Tour, EventJourney, Promotion, GalleryItem, ServiceItem, Testimonial, SiteSettings } from '@/types';

// ------------ AUTH ACTIONS ------------
/**
 * Verifies a real Firebase ID token on the server using Firebase Admin SDK
 * and establishes a secure HTTP-only session cookie.
 */
export async function verifyAndCreateSessionAction(idToken: string) {
  try {
    const session = await createAdminSession(idToken);
    return { success: true, email: session.email };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server authorization failed.';
    return { success: false, error: message };
  }
}

/**
 * Clears the server-side admin session and redirects to /admin/login.
 */
export async function logoutAdminAction() {
  await clearAdminSession();
  redirect('/admin/login');
}

/**
 * Server-side guard verifying the authenticated Firebase Admin session
 * before any sensitive CMS write operation.
 */
async function verifyAuth() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error('Unauthorized: Valid Firebase admin session required.');
  }
  return session;
}

// ------------ TOURS ACTIONS ------------
export async function addTourAction(tourData: Omit<Tour, 'id'>) {
  await verifyAuth();

  // Validate required fields
  if (!tourData.title?.trim()) {
    return { success: false, error: 'Tour name / title is required.' };
  }
  if (!tourData.destination?.trim()) {
    return { success: false, error: 'Destination name is required.' };
  }

  // Derive Cloudinary publicId if not explicitly provided but imageUrl is Cloudinary
  const cloudinaryPublicId =
    tourData.cloudinaryPublicId || extractCloudinaryPublicId(tourData.imageUrl);

  const res = await dbCreateTour({
    ...tourData,
    title: tourData.title.trim(),
    destination: tourData.destination.trim(),
    category: tourData.category?.trim() || null,
    theme: tourData.theme?.trim() || null,
    cloudinaryPublicId,
  });

  revalidatePath('/');
  revalidatePath('/tours');
  revalidatePath(`/tours/${res.slug}`);
  revalidatePath('/admin/tours');
  return { success: true, tour: res };
}

export async function updateTourAction(id: string, updates: Partial<Tour>) {
  await verifyAuth();

  const existingTour = await dbGetTourById(id);
  if (!existingTour) {
    return { success: false, error: 'Tour not found.' };
  }

  // If tour name is being updated, ensure it is not empty
  if (updates.title !== undefined && !updates.title.trim()) {
    return { success: false, error: 'Tour name / title cannot be empty.' };
  }

  // Handle Cloudinary image cleanup if image is being replaced
  const oldPublicId =
    existingTour.cloudinaryPublicId || extractCloudinaryPublicId(existingTour.imageUrl);
  const newPublicId =
    updates.cloudinaryPublicId ||
    (updates.imageUrl ? extractCloudinaryPublicId(updates.imageUrl) : undefined);

  // If replaced by a different Cloudinary image, remove old asset
  if (oldPublicId && newPublicId && oldPublicId !== newPublicId) {
    try {
      await deleteCloudinaryImage(oldPublicId);
    } catch (e) {
      console.warn('[updateTourAction] Failed to cleanup replaced Cloudinary asset:', e);
    }
  }

  const res = await dbUpdateTour(id, {
    ...updates,
    title: updates.title !== undefined ? updates.title.trim() : existingTour.title,
    destination: updates.destination !== undefined ? updates.destination.trim() : existingTour.destination,
    category: updates.category !== undefined ? (updates.category?.trim() || null) : existingTour.category,
    theme: updates.theme !== undefined ? (updates.theme?.trim() || null) : existingTour.theme,
    cloudinaryPublicId: newPublicId !== undefined ? newPublicId : existingTour.cloudinaryPublicId,
  });

  revalidatePath('/');
  revalidatePath('/tours');
  if (res?.slug) revalidatePath(`/tours/${res.slug}`);
  revalidatePath('/admin/tours');
  return { success: true, tour: res };
}

export async function deleteTourAction(id: string) {
  await verifyAuth();

  // 1. Load the tour from database
  const tour = await dbGetTourById(id);
  if (!tour) {
    return { success: false, error: 'Tour not found in database.' };
  }

  // 2. Identify Cloudinary asset to delete
  const publicId = tour.cloudinaryPublicId || extractCloudinaryPublicId(tour.imageUrl);

  // 3. Delete image from Cloudinary Media Library FIRST
  if (publicId) {
    const cloudRes = await deleteCloudinaryImage(publicId);
    if (!cloudRes.success) {
      console.error('[deleteTourAction] Cloudinary error:', cloudRes.error);
      return {
        success: false,
        error: `Cloudinary deletion failed: ${cloudRes.error}`,
      };
    }
  }

  // 4. Delete the tour from the database
  const deleted = await dbDeleteTour(id);
  if (!deleted) {
    return { success: false, error: 'Failed to delete tour from database.' };
  }

  // 5. Revalidate cache so Home page, Tours page, and Admin immediately update
  revalidatePath('/');
  revalidatePath('/tours');
  revalidatePath('/admin/tours');
  return { success: true };
}

// ------------ EVENTS ACTIONS ------------
export async function addEventAction(eventData: Omit<EventJourney, 'id'>) {
  await verifyAuth();

  // Derive cloudinaryPublicId from image URL if not explicitly supplied
  const cloudinaryPublicId =
    eventData.cloudinaryPublicId || extractCloudinaryPublicId(eventData.image);

  const res = await dbCreateEvent({ ...eventData, cloudinaryPublicId });
  revalidatePath('/');
  revalidatePath('/events');
  revalidatePath('/admin/events');
  return { success: true, event: res };
}

export async function updateEventAction(id: string, updates: Partial<EventJourney>) {
  await verifyAuth();

  const existingEvent = await dbGetEventById(id);
  if (!existingEvent) {
    return { success: false, error: 'Event not found.' };
  }

  // If the image is being replaced, clean up the old Cloudinary asset
  const oldPublicId =
    existingEvent.cloudinaryPublicId || extractCloudinaryPublicId(existingEvent.image);
  const newPublicId =
    updates.cloudinaryPublicId ||
    (updates.image ? extractCloudinaryPublicId(updates.image) : undefined);

  if (oldPublicId && newPublicId && oldPublicId !== newPublicId) {
    try {
      await deleteCloudinaryImage(oldPublicId);
    } catch (e) {
      console.warn('[updateEventAction] Failed to cleanup replaced Cloudinary asset:', e);
    }
  }

  const finalPublicId = newPublicId !== undefined ? newPublicId : existingEvent.cloudinaryPublicId;
  const res = await dbUpdateEvent(id, { ...updates, cloudinaryPublicId: finalPublicId });
  revalidatePath('/');
  revalidatePath('/events');
  revalidatePath('/admin/events');
  return { success: true, event: res };
}

export async function deleteEventAction(id: string) {
  await verifyAuth();

  // 1. Read record first
  const event = await dbGetEventById(id);
  if (!event) {
    return { success: false, error: 'Event not found in database.' };
  }

  // 2. Delete from Cloudinary
  const publicId = event.cloudinaryPublicId || extractCloudinaryPublicId(event.image);
  if (publicId) {
    const cloudRes = await deleteCloudinaryImage(publicId);
    if (!cloudRes.success) {
      console.error('[deleteEventAction] Cloudinary error:', cloudRes.error);
      // Non-blocking: log but continue with DB deletion
    }
  }

  // 3. Delete from database
  await dbDeleteEvent(id);
  revalidatePath('/');
  revalidatePath('/events');
  revalidatePath('/admin/events');
  return { success: true };
}

// ------------ PROMOTION ACTIONS ------------
export async function addPromotionAction(promoData: Omit<Promotion, 'id'>) {
  await verifyAuth();

  // Derive cloudinaryPublicId from imageUrl if not explicitly supplied
  const cloudinaryPublicId =
    promoData.cloudinaryPublicId || extractCloudinaryPublicId(promoData.imageUrl);

  const res = await dbCreatePromotion({ ...promoData, cloudinaryPublicId });
  revalidatePath('/');
  revalidatePath('/admin/promotions');
  return { success: true, promo: res };
}

export async function updatePromotionAction(id: string, updates: Partial<Promotion>) {
  await verifyAuth();
  const res = await dbUpdatePromotion(id, updates);
  revalidatePath('/');
  revalidatePath('/admin/promotions');
  return { success: true, promo: res };
}

export async function activatePromotionAction(id: string) {
  await verifyAuth();
  const res = await dbSetActivePromotion(id);
  revalidatePath('/');
  revalidatePath('/admin/promotions');
  return { success: true, promo: res };
}

export async function deletePromotionAction(id: string) {
  await verifyAuth();

  // 1. Read the promotion so we can get its Cloudinary asset
  const promos = await dbGetPromotions();
  const promo = promos.find((p) => p.id === id);

  // 2. Delete Cloudinary asset first (non-blocking on failure)
  if (promo) {
    const publicId = promo.cloudinaryPublicId || extractCloudinaryPublicId(promo.imageUrl);
    if (publicId) {
      const cloudRes = await deleteCloudinaryImage(publicId);
      if (!cloudRes.success) {
        console.warn('[deletePromotionAction] Cloudinary deletion failed (continuing):', cloudRes.error);
      }
    }
  }

  // 3. Delete from database
  await dbDeletePromotion(id);
  revalidatePath('/');
  revalidatePath('/admin/promotions');
  return { success: true };
}

// ------------ GALLERY ACTIONS ------------
export async function addGalleryItemAction(itemData: Omit<GalleryItem, 'id'>) {
  await verifyAuth();

  // Derive cloudinaryPublicId from imageUrl if not supplied
  const cloudinaryPublicId =
    itemData.cloudinaryPublicId || extractCloudinaryPublicId(itemData.imageUrl);

  const res = await dbCreateGalleryItem({ ...itemData, cloudinaryPublicId });
  revalidatePath('/');
  revalidatePath('/gallery');
  revalidatePath('/admin/gallery');
  return { success: true, item: res };
}

export async function deleteGalleryItemAction(id: string) {
  await verifyAuth();

  // 1. Read record first
  const item = await dbGetGalleryItemById(id);
  if (!item) {
    return { success: false, error: 'Gallery item not found in database.' };
  }

  // 2. Delete from Cloudinary
  const publicId = item.cloudinaryPublicId || extractCloudinaryPublicId(item.imageUrl);
  if (publicId) {
    const cloudRes = await deleteCloudinaryImage(publicId);
    if (!cloudRes.success) {
      console.error('[deleteGalleryItemAction] Cloudinary error:', cloudRes.error);
      // Non-blocking: log but continue with DB deletion
    }
  }

  // 3. Delete from database
  await dbDeleteGalleryItem(id);
  revalidatePath('/');
  revalidatePath('/gallery');
  revalidatePath('/admin/gallery');
  return { success: true };
}

// ------------ SERVICE ACTIONS ------------
export async function addServiceAction(serviceData: Omit<ServiceItem, 'id'>) {
  await verifyAuth();
  if (!serviceData.title?.trim()) {
    return { success: false, error: 'Service title is required.' };
  }
  const slug =
    serviceData.slug?.trim() ||
    serviceData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

  const res = await dbCreateService({
    ...serviceData,
    slug,
    title: serviceData.title.trim(),
    category: serviceData.category || 'Travel Logistics',
    shortDesc: serviceData.shortDesc?.trim() || '',
    fullDesc: serviceData.fullDesc?.trim() || '',
    iconName: serviceData.iconName || 'Compass',
    imageUrl: serviceData.imageUrl || '',
    features: serviceData.features || [],
    isActive: serviceData.isActive !== false,
    tag: serviceData.tag?.trim() || 'Service',
  });

  revalidatePath('/');
  revalidatePath('/services');
  revalidatePath('/admin/services');
  return { success: true, service: res };
}

export async function updateServiceAction(id: string, updates: Partial<ServiceItem>) {
  await verifyAuth();
  const res = await dbUpdateService(id, updates);
  revalidatePath('/');
  revalidatePath('/services');
  revalidatePath('/admin/services');
  return { success: true, service: res };
}

export async function deleteServiceAction(id: string) {
  await verifyAuth();
  const success = await dbDeleteService(id);
  revalidatePath('/');
  revalidatePath('/services');
  revalidatePath('/admin/services');
  return { success };
}

// ------------ TESTIMONIAL ACTIONS ------------
export async function addTestimonialAction(tData: Omit<Testimonial, 'id'>) {
  await verifyAuth();
  const res = await dbCreateTestimonial(tData);
  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/admin/testimonials');
  return { success: true, testimonial: res };
}

export async function deleteTestimonialAction(id: string) {
  await verifyAuth();
  await dbDeleteTestimonial(id);
  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/admin/testimonials');
  return { success: true };
}

// ------------ SITE SETTINGS ACTIONS ------------
export async function updateSiteSettingsAction(updates: Partial<SiteSettings>) {
  await verifyAuth();
  const res = await dbUpdateSiteSettings(updates);
  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/services');
  revalidatePath('/tours');
  revalidatePath('/events');
  revalidatePath('/admin/settings');
  return { success: true, settings: res };
}
