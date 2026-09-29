import fs from 'fs';
import path from 'path';
import os from 'os';
import { Tour, EventJourney, Promotion, GalleryItem, ServiceItem, Testimonial, SiteSettings } from '@/types';
import {
  initialTours,
  initialEvents,
  initialPromotions,
  initialGallery,
  initialServices,
  initialTestimonials,
  initialSiteSettings,
} from '@/data/mockData';
import {
  getToursFromFirestore,
  getTourByIdFromFirestore,
  syncTourToFirestore,
  deleteTourFromFirestore,
} from './firebaseAdmin';

interface DatabaseSchema {
  tours: Tour[];
  events: EventJourney[];
  promotions: Promotion[];
  gallery: GalleryItem[];
  services: ServiceItem[];
  testimonials: Testimonial[];
  siteSettings: SiteSettings;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const TMP_DB_FILE = path.join(os.tmpdir(), 'majestic_db.json');

// In-memory cache for fast read/writes and resilience across serverless warm invocations
let memoryDb: DatabaseSchema | null = null;

function ensureDataFile(): DatabaseSchema {
  if (memoryDb) {
    return memoryDb;
  }

  // 1. Try reading from tmp directory (if previously written during runtime)
  try {
    if (fs.existsSync(TMP_DB_FILE)) {
      const rawTmp = fs.readFileSync(TMP_DB_FILE, 'utf-8');
      const parsedTmp = JSON.parse(rawTmp);
      if (parsedTmp && parsedTmp.tours) {
        memoryDb = parsedTmp as DatabaseSchema;
        return memoryDb;
      }
    }
  } catch (tmpErr) {
    console.warn('[dataService] Failed to read TMP_DB_FILE, falling back to bundled file:', tmpErr);
  }

  // 2. Try reading from bundled static data/db.json
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (!parsed.promotions || !Array.isArray(parsed.promotions) || parsed.promotions.length === 0) {
        parsed.promotions = initialPromotions;
      }
      memoryDb = parsed as DatabaseSchema;
      // Best-effort cache to tmp
      try {
        fs.writeFileSync(TMP_DB_FILE, JSON.stringify(memoryDb, null, 2), 'utf-8');
      } catch {
        // Ignore tmp write errors
      }
      return memoryDb;
    }
  } catch (err) {
    console.warn('[dataService] Error reading bundled database file:', err);
  }

  // 3. Fallback to initial seed mock data
  const initialData: DatabaseSchema = {
    tours: initialTours,
    events: initialEvents,
    promotions: initialPromotions,
    gallery: initialGallery,
    services: initialServices,
    testimonials: initialTestimonials,
    siteSettings: initialSiteSettings,
  };
  memoryDb = initialData;

  try {
    fs.writeFileSync(TMP_DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  } catch {
    // Ignore tmp write errors
  }

  return memoryDb;
}

function writeData(data: DatabaseSchema): void {
  // Always update memory cache immediately
  memoryDb = data;

  // Write to writable /tmp directory
  try {
    fs.writeFileSync(TMP_DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (tmpErr) {
    console.warn('[dataService] Failed to write to TMP_DB_FILE:', tmpErr);
  }

  // Best-effort write to local project directory (succeeds locally, silently ignored on Vercel read-only filesystem)
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch {
    // Expected on Vercel serverless where process.cwd() is read-only (EROFS)
  }
}

// ----------------- TOURS -----------------
/**
 * Retrieves tours with Cloud Firestore as the single source of truth.
 * Falls back to local development cache only if Firestore is unreachable or empty.
 */
export async function getTours(): Promise<Tour[]> {
  // 1. Read from Cloud Firestore first
  try {
    const firestoreTours = await getToursFromFirestore();
    if (firestoreTours && firestoreTours.length > 0) {
      if (memoryDb) {
        memoryDb.tours = firestoreTours;
      }
      return firestoreTours;
    }
  } catch (err) {
    console.warn('[dataService] Firestore read failed, using local development fallback:', err);
  }

  // 2. Local development fallback (used if Firestore is empty or in local offline dev)
  const db = ensureDataFile();
  return db.tours || [];
}

export async function getActiveTours(): Promise<Tour[]> {
  const tours = await getTours();
  return tours.filter((t) => t.isActive);
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const tours = await getTours();
  return tours.find((t) => t.slug === slug) || null;
}

export async function getTourById(id: string): Promise<Tour | null> {
  // 1. Try direct single-document fetch from Firestore first
  try {
    const fsTour = await getTourByIdFromFirestore(id);
    if (fsTour) return fsTour;
  } catch (err) {
    console.warn(`[dataService] getTourById Firestore read failed for ${id}:`, err);
  }

  // 2. Fall back to current catalog
  const tours = await getTours();
  return tours.find((t) => t.id === id) || null;
}

/**
 * Creates a tour directly in Cloud Firestore, then syncs local runtime state.
 */
export async function createTour(tourData: Omit<Tour, 'id'>, idToken?: string): Promise<Tour> {
  const id = `tour-${Date.now()}`;
  const newTour: Tour = { ...tourData, id };

  // 1. Direct write to Cloud Firestore as single source of truth
  try {
    await syncTourToFirestore(newTour, idToken);
  } catch (err) {
    console.error('[dataService] Failed to write tour to Cloud Firestore:', err);
  }

  // 2. Update local runtime cache / development fallback
  const db = ensureDataFile();
  db.tours.unshift(newTour);
  writeData(db);

  return newTour;
}

/**
 * Updates a tour directly in Cloud Firestore, then syncs local runtime state.
 */
export async function updateTour(id: string, updates: Partial<Tour>, idToken?: string): Promise<Tour | null> {
  const existing = await getTourById(id);
  const updatedTour: Tour = {
    ...(existing || ({} as Tour)),
    ...updates,
    id,
  };

  // 1. Direct write to Cloud Firestore as single source of truth
  try {
    await syncTourToFirestore(updatedTour, idToken);
  } catch (err) {
    console.error(`[dataService] Failed to update tour ${id} in Cloud Firestore:`, err);
  }

  // 2. Update local runtime cache / development fallback
  const db = ensureDataFile();
  const idx = db.tours.findIndex((t) => t.id === id);
  if (idx !== -1) {
    db.tours[idx] = updatedTour;
  } else {
    db.tours.unshift(updatedTour);
  }
  writeData(db);

  return updatedTour;
}

/**
 * Deletes a tour directly from Cloud Firestore, then syncs local runtime state.
 */
export async function deleteTour(id: string, idToken?: string): Promise<boolean> {
  // 1. Direct delete from Cloud Firestore as single source of truth
  try {
    await deleteTourFromFirestore(id, idToken);
  } catch (err) {
    console.error(`[dataService] Failed to delete tour ${id} from Cloud Firestore:`, err);
  }

  // 2. Update local runtime cache / development fallback
  const db = ensureDataFile();
  db.tours = db.tours.filter((t) => t.id !== id);
  writeData(db);

  return true;
}

// ----------------- EVENTS -----------------
// Helper to format today's date in YYYY-MM-DD
export function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function getAllEvents(): Promise<EventJourney[]> {
  const db = ensureDataFile();
  return db.events || [];
}

export async function getEventById(id: string): Promise<EventJourney | null> {
  const db = ensureDataFile();
  return (db.events || []).find((e) => e.id === id) || null;
}


export async function getUpcomingEvents(): Promise<EventJourney[]> {
  const db = ensureDataFile();
  const today = getTodayString();
  return (db.events || []).filter((e) => e.eventDate >= today && e.status === 'active');
}

export async function getExpiredEvents(): Promise<EventJourney[]> {
  const db = ensureDataFile();
  const today = getTodayString();
  return (db.events || []).filter((e) => e.eventDate < today);
}

export async function createEvent(eventData: Omit<EventJourney, 'id'>): Promise<EventJourney> {
  const db = ensureDataFile();
  const id = `event-${Date.now()}`;
  const newEvent: EventJourney = { ...eventData, id };
  db.events.unshift(newEvent);
  writeData(db);
  return newEvent;
}

export async function updateEvent(id: string, updates: Partial<EventJourney>): Promise<EventJourney | null> {
  const db = ensureDataFile();
  const idx = db.events.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  db.events[idx] = { ...db.events[idx], ...updates };
  writeData(db);
  return db.events[idx];
}

export async function deleteEvent(id: string): Promise<boolean> {
  const db = ensureDataFile();
  const initialLen = db.events.length;
  db.events = db.events.filter((e) => e.id !== id);
  if (db.events.length !== initialLen) {
    writeData(db);
    return true;
  }
  return false;
}

// ----------------- PROMOTIONS -----------------
export async function getPromotions(): Promise<Promotion[]> {
  const db = ensureDataFile();
  return db.promotions || [];
}

export async function getActivePromotion(): Promise<Promotion | null> {
  const db = ensureDataFile();
  const active = (db.promotions || []).find((p) => p.isActive);
  if (active) return active;
  return db.promotions[0] || null;
}

export async function setActivePromotion(id: string): Promise<Promotion | null> {
  const db = ensureDataFile();
  let updatedPromo: Promotion | null = null;
  db.promotions = db.promotions.map((p) => {
    if (p.id === id) {
      updatedPromo = { ...p, isActive: true };
      return updatedPromo;
    }
    return { ...p, isActive: false };
  });
  writeData(db);
  return updatedPromo;
}

export async function createPromotion(promoData: Omit<Promotion, 'id'>): Promise<Promotion> {
  const db = ensureDataFile();
  const id = `promo-${Date.now()}`;
  if (promoData.isActive) {
    db.promotions = db.promotions.map((p) => ({ ...p, isActive: false }));
  }
  const newPromo: Promotion = { ...promoData, id };
  db.promotions.unshift(newPromo);
  writeData(db);
  return newPromo;
}

export async function updatePromotion(id: string, updates: Partial<Promotion>): Promise<Promotion | null> {
  const db = ensureDataFile();
  if (updates.isActive) {
    db.promotions = db.promotions.map((p) => ({ ...p, isActive: false }));
  }
  const idx = db.promotions.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  db.promotions[idx] = { ...db.promotions[idx], ...updates };
  writeData(db);
  return db.promotions[idx];
}

export async function deletePromotion(id: string): Promise<boolean> {
  const db = ensureDataFile();
  const len = db.promotions.length;
  db.promotions = db.promotions.filter((p) => p.id !== id);
  if (db.promotions.length !== len) {
    // If the deleted one was active, activate the first remaining one
    if (!db.promotions.some((p) => p.isActive) && db.promotions.length > 0) {
      db.promotions[0].isActive = true;
    }
    writeData(db);
    return true;
  }
  return false;
}

// ----------------- GALLERY -----------------
export async function getGallery(): Promise<GalleryItem[]> {
  const db = ensureDataFile();
  return db.gallery || [];
}

export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  const db = ensureDataFile();
  return (db.gallery || []).find((g) => g.id === id) || null;
}


export async function createGalleryItem(itemData: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
  const db = ensureDataFile();
  const id = `gal-${Date.now()}`;
  const newItem: GalleryItem = { ...itemData, id };
  db.gallery.unshift(newItem);
  writeData(db);
  return newItem;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const db = ensureDataFile();
  const len = db.gallery.length;
  db.gallery = db.gallery.filter((g) => g.id !== id);
  if (db.gallery.length !== len) {
    writeData(db);
    return true;
  }
  return false;
}

// ----------------- SERVICES -----------------
export async function getServices(): Promise<ServiceItem[]> {
  const db = ensureDataFile();
  return db.services || [];
}

export async function getActiveServices(): Promise<ServiceItem[]> {
  const db = ensureDataFile();
  return (db.services || []).filter((s) => s.isActive);
}

export async function updateService(id: string, updates: Partial<ServiceItem>): Promise<ServiceItem | null> {
  const db = ensureDataFile();
  const idx = db.services.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  db.services[idx] = { ...db.services[idx], ...updates };
  writeData(db);
  return db.services[idx];
}

export async function createService(serviceData: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
  const db = ensureDataFile();
  const id = `serv-${Date.now()}`;
  const newService: ServiceItem = { ...serviceData, id };
  if (!db.services) db.services = [];
  db.services.push(newService);
  writeData(db);
  return newService;
}

export async function deleteService(id: string): Promise<boolean> {
  const db = ensureDataFile();
  if (!db.services) return false;
  const initialLen = db.services.length;
  db.services = db.services.filter((s) => s.id !== id);
  if (db.services.length !== initialLen) {
    writeData(db);
    return true;
  }
  return false;
}

export async function getServiceById(id: string): Promise<ServiceItem | null> {
  const db = ensureDataFile();
  return (db.services || []).find((s) => s.id === id) || null;
}

// ----------------- TESTIMONIALS -----------------
export async function getTestimonials(): Promise<Testimonial[]> {
  const db = ensureDataFile();
  return db.testimonials || [];
}

export async function createTestimonial(tData: Omit<Testimonial, 'id'>): Promise<Testimonial> {
  const db = ensureDataFile();
  const id = `test-${Date.now()}`;
  const newTestimonial: Testimonial = { ...tData, id };
  db.testimonials.unshift(newTestimonial);
  writeData(db);
  return newTestimonial;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const db = ensureDataFile();
  const len = db.testimonials.length;
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  if (db.testimonials.length !== len) {
    writeData(db);
    return true;
  }
  return false;
}

// ----------------- SITE SETTINGS -----------------
export async function getSiteSettings(): Promise<SiteSettings> {
  const db = ensureDataFile();
  return db.siteSettings || initialSiteSettings;
}

export async function updateSiteSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  const db = ensureDataFile();
  db.siteSettings = { ...db.siteSettings, ...updates };
  writeData(db);
  return db.siteSettings;
}
