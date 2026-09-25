import fs from 'fs';
import path from 'path';
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

function ensureDataFile(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      tours: initialTours,
      events: initialEvents,
      promotions: initialPromotions,
      gallery: initialGallery,
      services: initialServices,
      testimonials: initialTestimonials,
      siteSettings: initialSiteSettings,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw) as DatabaseSchema;
  } catch (err) {
    console.error('Error reading database file, re-initializing:', err);
    const initialData: DatabaseSchema = {
      tours: initialTours,
      events: initialEvents,
      promotions: initialPromotions,
      gallery: initialGallery,
      services: initialServices,
      testimonials: initialTestimonials,
      siteSettings: initialSiteSettings,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

function writeData(data: DatabaseSchema): void {
  ensureDataFile();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// ----------------- TOURS -----------------
export async function getTours(): Promise<Tour[]> {
  const db = ensureDataFile();
  return db.tours || [];
}

export async function getActiveTours(): Promise<Tour[]> {
  const db = ensureDataFile();
  return (db.tours || []).filter((t) => t.isActive);
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const db = ensureDataFile();
  return (db.tours || []).find((t) => t.slug === slug) || null;
}

export async function getTourById(id: string): Promise<Tour | null> {
  const db = ensureDataFile();
  return (db.tours || []).find((t) => t.id === id) || null;
}

export async function createTour(tourData: Omit<Tour, 'id'>): Promise<Tour> {
  const db = ensureDataFile();
  const id = `tour-${Date.now()}`;
  const newTour: Tour = { ...tourData, id };
  db.tours.unshift(newTour);
  writeData(db);
  return newTour;
}

export async function updateTour(id: string, updates: Partial<Tour>): Promise<Tour | null> {
  const db = ensureDataFile();
  const idx = db.tours.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  db.tours[idx] = { ...db.tours[idx], ...updates };
  writeData(db);
  return db.tours[idx];
}

export async function deleteTour(id: string): Promise<boolean> {
  const db = ensureDataFile();
  const initialLength = db.tours.length;
  db.tours = db.tours.filter((t) => t.id !== id);
  if (db.tours.length !== initialLength) {
    writeData(db);
    return true;
  }
  return false;
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
