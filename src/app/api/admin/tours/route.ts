import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getAdminSession, COOKIE_NAME } from '@/lib/auth';
import {
  getTours,
  createTour as dbCreateTour,
  updateTour as dbUpdateTour,
  deleteTour as dbDeleteTour,
  getTourById as dbGetTourById,
} from '@/lib/dataService';
import { syncTourToFirestore, deleteTourFromFirestore } from '@/lib/firebaseAdmin';
import { extractCloudinaryPublicId, deleteCloudinaryImage } from '@/lib/cloudinary';
import { Tour } from '@/types';

/**
 * GET /api/admin/tours
 * Retrieves current tours catalog.
 */
export async function GET() {
  try {
    const tours = await getTours();
    return NextResponse.json({ success: true, tours }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to retrieve tours';
    console.error('[API /api/admin/tours] GET error:', err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

/**
 * POST /api/admin/tours
 * Creates a new tour, persists it to Firestore and data storage, and invalidates page caches.
 * Returns HTTP 201 on success.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate admin session
    const session = await getAdminSession();
    if (!session) {
      console.warn('[API /api/admin/tours] POST unauthorized attempt');
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Valid Firebase admin session required.' },
        { status: 401 }
      );
    }

    // 2. Parse & validate request body
    const body = await request.json();
    const { title, destination, category, theme, imageUrl, cloudinaryPublicId, overview } = body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json(
        { success: false, error: 'Tour name / title is required.' },
        { status: 400 }
      );
    }

    if (!destination || typeof destination !== 'string' || !destination.trim()) {
      return NextResponse.json(
        { success: false, error: 'Destination name is required.' },
        { status: 400 }
      );
    }

    if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.trim()) {
      return NextResponse.json(
        { success: false, error: 'Tour image is required. Please upload an image before saving.' },
        { status: 400 }
      );
    }

    // 3. Derive Cloudinary publicId if not provided
    const finalPublicId =
      cloudinaryPublicId || extractCloudinaryPublicId(imageUrl) || null;

    // 4. Generate unique slug
    const cleanDestination = destination.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const slug = body.slug || `${cleanDestination}-${Date.now()}`;

    // 5. Build full Tour object
    const tourPayload: Omit<Tour, 'id'> = {
      slug,
      title: title.trim(),
      destination: destination.trim(),
      category: category?.trim() || null,
      theme: theme?.trim() || null,
      imageUrl: imageUrl.trim(),
      cloudinaryPublicId: finalPublicId,
      overview: overview?.trim() || '',
      currency: body.currency || 'USD',
      featured: body.featured ?? true,
      isActive: body.isActive ?? true,
      galleryImages: body.galleryImages || [imageUrl.trim()],
      highlights: body.highlights || ['Private Guided Tours', 'Curated Accommodations'],
      itinerary: body.itinerary || [
        {
          day: 1,
          title: 'Arrival & Welcome',
          description: 'Private transfer to luxury accommodation and welcome orientation.',
        },
      ],
      inclusions: body.inclusions || ['Premium Accommodations', 'Private Chauffeur Transfers'],
      exclusions: body.exclusions || ['Personal Expenses', 'Gratuities'],
      weatherInfo: body.weatherInfo || 'Pleasant year-round conditions.',
      bestTimeToVisit: body.bestTimeToVisit || 'All year round',
    };

    // 6. Create tour in runtime storage & Firestore
    const cookieStore = await cookies();
    const idToken = cookieStore.get(COOKIE_NAME)?.value;
    const newTour = await dbCreateTour(tourPayload, idToken);

    // 7. Revalidate site paths
    revalidatePath('/');
    revalidatePath('/tours');
    revalidatePath(`/tours/${newTour.slug}`);
    revalidatePath('/admin/tours');

    console.log(`[API /api/admin/tours] Tour created successfully: ${newTour.id} (${newTour.title})`);

    return NextResponse.json(
      {
        success: true,
        tour: newTour,
        message: `Tour "${newTour.title}" saved successfully.`,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected server error while saving tour.';
    console.error('[API /api/admin/tours] POST fatal error:', err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

/**
 * PUT /api/admin/tours
 * Updates an existing tour.
 * Returns HTTP 200 on success.
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Valid Firebase admin session required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, updates } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ success: false, error: 'Tour ID is required for update.' }, { status: 400 });
    }

    const existing = await dbGetTourById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Tour not found.' }, { status: 404 });
    }

    // Handle Cloudinary cleanup if replaced
    const oldPublicId = existing.cloudinaryPublicId || extractCloudinaryPublicId(existing.imageUrl);
    const newPublicId = updates?.cloudinaryPublicId || (updates?.imageUrl ? extractCloudinaryPublicId(updates.imageUrl) : undefined);
    if (oldPublicId && newPublicId && oldPublicId !== newPublicId) {
      try {
        await deleteCloudinaryImage(oldPublicId);
      } catch (e) {
        console.warn('[API /api/admin/tours] Cloudinary cleanup warning:', e);
      }
    }

    const cookieStore = await cookies();
    const idToken = cookieStore.get(COOKIE_NAME)?.value;

    const updatedTour = await dbUpdateTour(id, {
      ...updates,
      title: updates?.title !== undefined ? updates.title.trim() : existing.title,
      destination: updates?.destination !== undefined ? updates.destination.trim() : existing.destination,
      category: updates?.category !== undefined ? (updates.category?.trim() || null) : existing.category,
      theme: updates?.theme !== undefined ? (updates.theme?.trim() || null) : existing.theme,
      cloudinaryPublicId: newPublicId !== undefined ? newPublicId : existing.cloudinaryPublicId,
    }, idToken);

    if (!updatedTour) {
      return NextResponse.json({ success: false, error: 'Failed to apply updates to tour.' }, { status: 500 });
    }

    revalidatePath('/');
    revalidatePath('/tours');
    revalidatePath(`/tours/${updatedTour.slug}`);
    revalidatePath('/admin/tours');

    return NextResponse.json(
      {
        success: true,
        tour: updatedTour,
        message: `Tour "${updatedTour.title}" updated successfully.`,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected server error while updating tour.';
    console.error('[API /api/admin/tours] PUT fatal error:', err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/tours
 * Removes a tour and its Cloudinary assets.
 * Returns HTTP 200 on success.
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Valid Firebase admin session required.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Tour ID parameter is required.' }, { status: 400 });
    }

    const existing = await dbGetTourById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Tour not found.' }, { status: 404 });
    }

    // Delete Cloudinary image
    const publicId = existing.cloudinaryPublicId || extractCloudinaryPublicId(existing.imageUrl);
    if (publicId) {
      try {
        await deleteCloudinaryImage(publicId);
      } catch (e) {
        console.warn('[API /api/admin/tours] Cloudinary delete warning:', e);
      }
    }

    // Delete from Firestore & runtime storage
    const cookieStore = await cookies();
    const idToken = cookieStore.get(COOKIE_NAME)?.value;
    const success = await dbDeleteTour(id, idToken);

    revalidatePath('/');
    revalidatePath('/tours');
    revalidatePath('/admin/tours');

    return NextResponse.json({ success, message: 'Tour deleted successfully.' }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected server error while deleting tour.';
    console.error('[API /api/admin/tours] DELETE fatal error:', err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
