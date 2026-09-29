export interface Tour {
  id: string;
  slug: string;
  title: string;
  destination: string;
  category?: 'Domestic' | 'International' | string | null;
  theme?: 'Adventure' | 'Luxury' | 'Honeymoon' | 'Group' | 'Cultural' | 'Nature' | string | null;
  imageUrl: string;
  cloudinaryPublicId?: string | null;
  overview: string;
  duration?: string;
  price?: number;
  originalPrice?: number;
  currency?: string;
  rating?: number;
  reviewsCount?: number;
  featured?: boolean;
  isActive?: boolean;
  galleryImages?: string[];
  travelDate?: string;
  tagline?: string;
  highlights?: string[];
  itinerary?: {
    day: number;
    title: string;
    description: string;
    meals?: string;
    hotel?: string;
  }[];
  inclusions?: string[];
  exclusions?: string[];
  weatherInfo?: string;
  bestTimeToVisit?: string;
}

export interface EventJourney {
  id: string;
  title: string;
  destination: string;
  eventDate: string; // YYYY-MM-DD
  endDate?: string;
  image: string;
  imageUrl?: string;
  cloudinaryPublicId?: string | null;
  description: string;
  price: number;
  duration: string;
  seatsTotal: number;
  seatsRemaining: number;
  status: 'active' | 'draft' | 'cancelled';
  category: 'Domestic' | 'International';
  highlights?: string[];
}

export interface Promotion {
  id: string;
  destination: string;
  tagline: string;
  description: string;
  travelDate: string; // e.g., "September 30" or "2026-09-30"
  duration: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  cloudinaryPublicId?: string | null;
  highlights: string[];
  isActive: boolean;
  slug: string;
  badge?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: 'Domestic' | 'International' | 'Group Expeditions' | 'Aerials' | 'Travel Moments';
  imageUrl: string;
  cloudinaryPublicId?: string | null;
  aspectRatio?: 'tall' | 'wide' | 'square';
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: 'Tours' | 'Travel Logistics' | 'Special Travel';
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  imageUrl: string;
  features: string[];
  isActive: boolean;
  tag: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  destination: string;
  rating: number;
  review: string;
  avatarUrl: string;
  tourDate: string;
  verified: boolean;
}

export interface SiteSettings {
  websiteName: string;
  tagline: string;
  logoText: string;
  phone: string;
  email: string;
  whatsappNumber: string; // international format without plus e.g., "919876543210"
  defaultWhatsappMessage: string;
  address: string;
  workingHours: string;
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
    twitter: string;
    linkedin: string;
  };
  experienceYears: number;
  happyTravelers: number;
  destinationsCount: number;
  satisfactionRate: number;
}
