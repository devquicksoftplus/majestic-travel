import { Tour, EventJourney, Promotion, GalleryItem, ServiceItem, Testimonial, SiteSettings } from '@/types';

export const initialSiteSettings: SiteSettings = {
  "websiteName": "Majestic Voyages",
  "tagline": "Your Journey, Your Way — Customized Travel Packages from Erode",
  "logoText": "MAJESTIC VOYAGES",
  "phone": "+91 9842801103",
  "email": "concierge@majesticvoyages.com",
  "whatsappNumber": "9842801103",
  "defaultWhatsappMessage": "Hello Majestic Voyages, I would like to plan a customized journey. Please help me with available packages and dates.",
  "address": "Erode, Tamil Nadu, India",
  "workingHours": "Mon - Sat: 9:00 AM - 7:00 PM | WhatsApp: Anytime",
  "socials": {
    "instagram": "https://instagram.com/majesticvoyages",
    "facebook": "https://facebook.com/majesticvoyages",
    "youtube": "https://youtube.com/majesticvoyages",
    "twitter": "https://twitter.com/majesticvoyages",
    "linkedin": "https://linkedin.com/company/majesticvoyages"
  },
  "experienceYears": 9,
  "happyTravelers": 5000,
  "destinationsCount": 9,
  "satisfactionRate": 99
};

export const initialPromotions: Promotion[] = [
  {
    "id": "promo-1",
    "destination": "Bali, Indonesia",
    "tagline": "Experience the Island of the Gods in Pure Opulence",
    "description": "Immerse yourself in secluded jungle pool villas in Ubud, private yacht cruises across Nusa Penida, sacred water blessings, and Michelin-tier cliffside dining in Uluwatu.",
    "travelDate": "September 30",
    "duration": "7 Days / 6 Nights",
    "price": 1899,
    "originalPrice": 2450,
    "imageUrl": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=85",
    "highlights": [
      "Private Floating Breakfast in Ayung River Valley Villa",
      "VIP Luxury Yacht Charter to Nusa Penida & Crystal Bay",
      "Helicopter Aerial Tour of Mount Batur Volcano",
      "Exclusive Sunset Access at Uluwatu Cliff Temple"
    ],
    "isActive": true,
    "slug": "bali-luxury-island-escape",
    "badge": "Featured Voyage of the Month"
  },
  {
    "id": "promo-2",
    "destination": "Kashmir Paradise Valley",
    "tagline": "Crown Jewel of the Himalayas & Floating Heritage",
    "description": "Drift through serene Dal Lake on a cedarwood heritage houseboat, walk blooming saffron fields, and ascend the snowcapped peaks of Gulmarg by private gondola.",
    "travelDate": "October 15",
    "duration": "6 Days / 5 Nights",
    "price": 1450,
    "originalPrice": 1950,
    "imageUrl": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1920&q=85",
    "highlights": [
      "Royal Shikara Ride & Private Sunset Tea in Dal Lake",
      "Luxury Cedarwood Heritage Houseboat Stay",
      "Gulmarg Gondola Phase-II Alpine Snow Experience",
      "Pahalgam Valley of Shepherds Horseback Trail"
    ],
    "isActive": false,
    "slug": "kashmir-crown-of-paradise",
    "badge": "Seasonal Winter Luxury"
  },
  {
    "id": "promo-3",
    "destination": "Vietnam Odyssey & Ha Long Bay",
    "tagline": "Emerald Karsts, Imperial Citadels & Golden Lanterns",
    "description": "Cruise emerald waters aboard a 5-star presidential junk boat, explore the glowing lantern streets of ancient Hoi An, and savor curated French-Indochine culinary masterclasses.",
    "travelDate": "November 10",
    "duration": "8 Days / 7 Nights",
    "price": 2150,
    "originalPrice": 2790,
    "imageUrl": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=85",
    "highlights": [
      "2-Night Luxury Cruise on Lan Ha & Ha Long Bay",
      "Private Street Food Tasting in Hanoi Old Quarter",
      "Hoi An UNESCO Heritage Walking Tour & Lantern Making",
      "Ba Na Hills Golden Bridge Early Morning VIP Access"
    ],
    "isActive": false,
    "slug": "vietnam-grand-indochine",
    "badge": "Culinary & Culture Special"
  }
];

export const initialTours: Tour[] = [
  {
    "id": "tour-kashmir",
    "slug": "kashmir-crown-of-paradise",
    "title": "Kashmir: Crown of Paradise & Alpine Glaciers",
    "destination": "Kashmir",
    "category": "Domestic",
    "theme": "Luxury",
    "duration": "6 Days / 5 Nights",
    "price": 1450,
    "originalPrice": 1850,
    "currency": "USD",
    "rating": 4.9,
    "reviewsCount": 124,
    "featured": true,
    "isActive": true,
    "imageUrl": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85"
    ],
    "travelDate": "Weekly Departures Available",
    "tagline": "Experience the heaven on earth with royal houseboats, snowy peaks, and saffron valleys.",
    "overview": "Kashmir is not just a destination; it is an unforgettable poetic experience. From gliding across mirror-like Dal Lake in a wooden Shikara adorned with velvet cushions to gazing at the colossal Himalayan peaks of Gulmarg and the roaring waters of Lidder River in Pahalgam, this curated journey brings you the pinnacle of luxury in the Northern Crown.",
    "highlights": [
      "Private 5-Star Cedar Houseboat stay on Nigeen Lake",
      "Priority VIP tickets for the Gulmarg Gondola Phase I & II",
      "Private gourmet Kashmiri Wazwan dinner experience",
      "Horseback exploration of Baisaran Valley (Mini Switzerland)",
      "Historic Mughal Gardens guided botanical tour"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Srinagar & Sunset Shikara on Dal Lake",
        "description": "VIP airport meet and greet with private chauffeur transfer to your heritage luxury houseboat. Evening Shikara ride to watch the floating lotus gardens and artisan bazaars as sunset tints the Zabarwan range gold.",
        "meals": "Dinner included",
        "hotel": "The Sukoon Heritage Houseboat"
      },
      {
        "day": 2,
        "title": "Srinagar to Gulmarg: Meadow of Flowers & Gondola Ride",
        "description": "Ascend through pine forests to Gulmarg. Take the world famous high-altitude Gondola up to Apharwat Peak for breathtaking views of Nanga Parbat and alpine skiing vistas.",
        "meals": "Breakfast & Dinner",
        "hotel": "The Khyber Himalayan Resort & Spa"
      },
      {
        "day": 3,
        "title": "Alpine Exploration & Transfer to Pahalgam",
        "description": "Journey along the Lidder River to the picturesque valley of Pahalgam. Walk along saffron fields in Pampore and visit the historic Martand ruins.",
        "meals": "Breakfast & Dinner",
        "hotel": "Pahalgam Luxury Pine Cottages"
      },
      {
        "day": 4,
        "title": "Betaab Valley, Aru Valley & Baisaran Excursion",
        "description": "Full day immersed in pristine Himalayan meadows. Explore Betaab Valley named after famous Bollywood shoots, followed by pine-scented horseback trail in Baisaran.",
        "meals": "Breakfast, Picnic Lunch & Dinner",
        "hotel": "Pahalgam Luxury Pine Cottages"
      },
      {
        "day": 5,
        "title": "Old Srinagar Heritage Trail & Mughal Splendor",
        "description": "Return to Srinagar. Explore Shalimar Bagh, Nishat Bagh, and the centuries-old copper artisans in the historic downtown alleyways.",
        "meals": "Breakfast & Royal Wazwan Dinner",
        "hotel": "Vivanta Dal View Srinagar"
      },
      {
        "day": 6,
        "title": "Souvenir Keepsakes & Departure",
        "description": "Savor a leisurely breakfast of Kashmiri Kahwa tea before private chauffeur transfer to Srinagar International Airport.",
        "meals": "Breakfast",
        "hotel": "N/A"
      }
    ],
    "inclusions": [
      "5 Nights in curated 5-star luxury hotels & heritage houseboats",
      "Private luxury SUV with dedicated chauffeur throughout",
      "All gourmet breakfasts and curated authentic dinners",
      "Gulmarg Gondola tickets (Phase 1 & Phase 2)",
      "Complimentary 2-hour Shikara cruise on Dal Lake",
      "Airport VIP meet, greet, and concierge assistance"
    ],
    "exclusions": [
      "International / Domestic airfare",
      "Personal adventure sports equipment rental",
      "Tips, gratuities, and laundry services",
      "Travel insurance (available upon request)"
    ],
    "weatherInfo": "Spring/Summer (Apr-Aug): 15°C - 28°C. Autumn (Sep-Nov): 8°C - 20°C with golden chinar trees. Winter (Dec-Mar): -4°C - 10°C with magical snow.",
    "bestTimeToVisit": "March to November for lush green meadows; December to February for powdery snow sports."
  },
  {
    "id": "tour-bali",
    "slug": "bali-luxury-island-escape",
    "title": "Bali: Tropical Sanctuary & Spiritual Luxury",
    "destination": "Bali",
    "category": "International",
    "theme": "Honeymoon",
    "duration": "7 Days / 6 Nights",
    "price": 1899,
    "originalPrice": 2450,
    "currency": "USD",
    "rating": 5,
    "reviewsCount": 198,
    "featured": true,
    "isActive": true,
    "imageUrl": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=85"
    ],
    "travelDate": "Year-round Private Departures",
    "tagline": "Private infinity pools over jungle ravines, sacred temples, and cliffside oceanfront dining.",
    "overview": "Escape to Indonesia’s crown jewel where ancient Hindu spirituality merges with world-class tropical luxury. From waking up to mist rising over lush Ubud rice terraces in your private pool villa to private catamaran sailing across azure waters to Nusa Penida, this itinerary guarantees timeless romance and deep rejuvenation.",
    "highlights": [
      "Private pool jungle villa in luxury Ubud resort",
      "Full-day private luxury yacht charter to Nusa Penida & Manta Bay",
      "Sunrise Mount Batur Jeep safari with mountain champagne breakfast",
      "Traditional Balinese spa ritual & sound bowl healing session",
      "VIP Sunset dinner perched on Uluwatu clifftop"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Denpasar & Ubud Rainforest Welcome",
        "description": "Chauffeur transfer to your private valley villa in Ubud. Unwind with a welcome Balinese flower bath and herbal herbal elixir.",
        "meals": "Dinner",
        "hotel": "Hanging Gardens of Bali / Mandapa Reserve"
      },
      {
        "day": 2,
        "title": "Tegallalang Rice Terraces & Holy Water Temple Blessing",
        "description": "Morning walk along early-morning sunlit rice cascades. Participate in a sacred Melukat purification ceremony at Tirta Empul temple with a Balinese priest.",
        "meals": "Breakfast & Lunch",
        "hotel": "Hanging Gardens of Bali"
      },
      {
        "day": 3,
        "title": "Mount Batur Sunrise 4x4 Jeep Safari & Hot Springs",
        "description": "Witness the sunrise over active volcanic peaks without exhausting hikes via custom open-top 4x4 cruiser. Relax in natural volcanic hot spring pools.",
        "meals": "Breakfast & Lunch",
        "hotel": "Hanging Gardens of Bali"
      },
      {
        "day": 4,
        "title": "Transfer to Seminyak / Uluwatu Coastal Haven",
        "description": "Scenic coastal transfer. Check into your luxury cliffside oceanfront villa. Afternoon leisure by the private infinity pool overlooking the Indian Ocean.",
        "meals": "Breakfast & Sunset Cocktail",
        "hotel": "Bulgari Resort Bali / Six Senses Uluwatu"
      },
      {
        "day": 5,
        "title": "Private Yacht Cruise to Nusa Penida & Snorkeling",
        "description": "Board your private catamaran to Kelingking T-Rex cliff and snorkel with graceful manta rays in crystal-clear emerald bays.",
        "meals": "Breakfast & Seafood BBQ on Board",
        "hotel": "Six Senses Uluwatu"
      },
      {
        "day": 6,
        "title": "Uluwatu Temple Sunset & Clifftop Fire Dance",
        "description": "Visit the majestic perched temple of Uluwatu. Experience the mesmerizing Kecak Fire Dance as the crimson sun drops beneath the sea.",
        "meals": "Breakfast & Farewell Dinner",
        "hotel": "Six Senses Uluwatu"
      },
      {
        "day": 7,
        "title": "Spa & Departure",
        "description": "Final morning massage before private airport transfer with VIP airport lounge access.",
        "meals": "Breakfast",
        "hotel": "N/A"
      }
    ],
    "inclusions": [
      "6 Nights in 5-star private pool villas (Ubud & Uluwatu)",
      "Dedicated private English-speaking tour butler and luxury vehicle",
      "All entrance fees, temple permits, and VIP tickets",
      "Full-day private yacht to Nusa Penida with equipment",
      "All gourmet meals as per itinerary"
    ],
    "exclusions": [
      "International flights to Bali (DPS)",
      "Indonesian Tourist Visa on Arrival ($35 USD)",
      "Personal alcoholic beverages beyond included wine pairings"
    ],
    "weatherInfo": "Dry season (April to October): sunny and breezy 26°C - 30°C. Tropical green season (Nov-Mar): warm with afternoon showers.",
    "bestTimeToVisit": "April to October for idyllic beach weather and calm seas."
  },
  {
    "id": "tour-andaman",
    "slug": "andaman-emerald-islands-luxury",
    "title": "Andaman: Turquoise Lagoons & Coral Atolls",
    "destination": "Andaman",
    "category": "Domestic",
    "theme": "Luxury",
    "duration": "6 Days / 5 Nights",
    "price": 1390,
    "originalPrice": 1750,
    "currency": "USD",
    "rating": 4.8,
    "reviewsCount": 89,
    "featured": true,
    "isActive": true,
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=85"
    ],
    "travelDate": "October to May Weekly",
    "tagline": "White silica sands of Radhanagar beach, bioluminescent night kayaking, and pristine coral reefs.",
    "overview": "Tucked away in the Bay of Bengal, the Andaman archipelago holds some of the world’s most pristine turquoise waters and lush tropical rain forests. Experience high-speed luxury catamaran sailings, private scuba diving in vibrant coral gardens, and sunset candlelight beach dinners.",
    "highlights": [
      "Private beachfront villa stay on Havelock Island (Swaraj Dweep)",
      "Bioluminescent night kayaking through tranquil mangrove forests",
      "Exclusive Scuba Diving session with certified PADI Master",
      "High-speed Makruzz Gold Class catamaran ferry transfers",
      "Romantic beach cabana dinner under the stars"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Port Blair & Historic Cellular Jail Light Show",
        "description": "Arrive at Veer Savarkar International Airport. Chauffeur transfer to luxury seaside resort. Evening visit to the iconic National Memorial Cellular Jail for an evocative light & sound show.",
        "meals": "Dinner",
        "hotel": "Welcomhotel by ITC Bay Island Port Blair"
      },
      {
        "day": 2,
        "title": "High-Speed Ferry to Havelock & Radhanagar Beach Sunset",
        "description": "Board the luxury Makruzz catamaran to Havelock Island. Check into your private beach villa and spend the evening on Radhanagar Beach (Asia’s top rated beach).",
        "meals": "Breakfast & Dinner",
        "hotel": "Taj Exotica Resort & Spa, Andamans"
      },
      {
        "day": 3,
        "title": "Elephant Beach Coral Snorkeling & Water Adventure",
        "description": "Private speed boat ride to Elephant Beach. Discover kaleidoscope coral reefs, sea turtles, and colorful marine life.",
        "meals": "Breakfast & Seafood Lunch",
        "hotel": "Taj Exotica Resort & Spa"
      },
      {
        "day": 4,
        "title": "Neil Island (Shaheed Dweep) Natural Rock Formations",
        "description": "Sail to tranquil Neil Island. Explore the natural bridge coral formation and sunset over Laxmanpur Beach.",
        "meals": "Breakfast & Dinner",
        "hotel": "Sea Shell Neil Island"
      },
      {
        "day": 5,
        "title": "Return to Port Blair & Chidiya Tapu Sunset Viewpoint",
        "description": "Catamaran cruise back to Port Blair. Afternoon trip to Chidiya Tapu bird sanctuary and dramatic panoramic sunset point.",
        "meals": "Breakfast & Farewell Dinner",
        "hotel": "Welcomhotel Port Blair"
      },
      {
        "day": 6,
        "title": "Departure with Tropical Memories",
        "description": "Leisurely breakfast overlooking the ocean before private transfer to Port Blair airport.",
        "meals": "Breakfast",
        "hotel": "N/A"
      }
    ],
    "inclusions": [
      "5 Nights in 5-star oceanfront luxury resorts & private villas",
      "Makruzz Gold Class luxury catamaran transfers",
      "All inter-island transfers and sightseeing in AC luxury vehicles",
      "Snorkeling session with certified instructor and gear",
      "Breakfast and 4-course dinners daily"
    ],
    "exclusions": [
      "Air tickets to Port Blair (IXZ)",
      "Personal scuba photo package upgrades",
      "Any camera or drone permit fees"
    ],
    "weatherInfo": "Tropical island climate: 24°C to 31°C year-round with gentle ocean breezes.",
    "bestTimeToVisit": "October to May for clear waters and great visibility for underwater diving."
  },
  {
    "id": "tour-assam",
    "slug": "assam-wildlife-tea-estates",
    "title": "Assam: Wild Brahmaputra & Colonial Tea Estates",
    "destination": "Assam",
    "category": "Domestic",
    "theme": "Nature",
    "duration": "5 Days / 4 Nights",
    "price": 1150,
    "originalPrice": 1450,
    "currency": "USD",
    "rating": 4.8,
    "reviewsCount": 76,
    "featured": false,
    "isActive": true,
    "imageUrl": "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=1600&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=85"
    ],
    "travelDate": "November to April Departures",
    "tagline": "One-horned rhinos of Kaziranga, heritage British planter bungalows, and Brahmaputra river sunsets.",
    "overview": "Discover the untamed wilderness and aristocratic charm of Northeast India. Stay inside century-old colonial heritage tea garden bungalows, embark on private 4x4 wildlife safaris in Kaziranga National Park to encounter the majestic Indian one-horned rhinoceros, and cruise along the mighty Brahmaputra river.",
    "highlights": [
      "Private 4x4 open jeep safaris in Kaziranga Central and Western ranges",
      "Stay in authentic heritage tea planter estate with private tea tasting",
      "Sunset Brahmaputra River luxury boat cruise with folk dance",
      "Visit to Majuli, the world’s largest river island & mask-making monastery"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Guwahati to Kaziranga National Park",
        "description": "Chauffeur pickup from Guwahati. Scenic drive along emerald paddy fields to Kaziranga. Evening Assamese cultural dance performance.",
        "meals": "Dinner",
        "hotel": "Diphlu River Lodge / Borgos Resort"
      },
      {
        "day": 2,
        "title": "Morning Elephant & Afternoon Jeep Safari in Kaziranga",
        "description": "Dawn exploration into the elephant grass to spot rhinos, wild water buffaloes, and tigers. Afternoon jeep safari in Western Bagori range.",
        "meals": "Breakfast, Lunch & Dinner",
        "hotel": "Diphlu River Lodge"
      },
      {
        "day": 3,
        "title": "Tea Estate Heritage Living & Sommelier Tasting",
        "description": "Transfer to a lush 19th-century tea estate in Jorhat. Walk with tea pluckers and learn the art of orthodox black & golden needle teas.",
        "meals": "Breakfast & Planters Dinner",
        "hotel": "Heritage Burra Sahib Bungalow"
      },
      {
        "day": 4,
        "title": "Majuli Island Cultural Odyssey",
        "description": "Ferry ride across the Brahmaputra to Majuli. Explore ancient Vaishnavite Satras and interact with traditional clay mask artists.",
        "meals": "Breakfast & Traditional Thali Lunch",
        "hotel": "Heritage Burra Sahib Bungalow"
      },
      {
        "day": 5,
        "title": "Kamakhya Temple & Departure from Guwahati",
        "description": "Morning drive to Guwahati with a VIP blessing visit to the ancient Kamakhya Devi temple atop Nilachal Hill before airport drop.",
        "meals": "Breakfast",
        "hotel": "N/A"
      }
    ],
    "inclusions": [
      "4 Nights in high-end safari lodges & heritage tea bungalows",
      "All Kaziranga National park safari permits, guide, and private 4x4 vehicles",
      "Brahmaputra boat crossing and island cultural tour",
      "All meals and tea estate tastings"
    ],
    "exclusions": [
      "Airfare",
      "Camera fees for Kaziranga",
      "Personal gratuities"
    ],
    "weatherInfo": "Pleasant winter days: 12°C - 24°C with misty mornings and crisp sunshine.",
    "bestTimeToVisit": "November to April when national parks are fully open."
  },
  {
    "id": "tour-sikkim",
    "slug": "sikkim-mystic-himalayan-kingdom",
    "title": "Sikkim: Mystic Monasteries & Kangchenjunga",
    "destination": "Sikkim",
    "category": "Domestic",
    "theme": "Adventure",
    "duration": "6 Days / 5 Nights",
    "price": 1280,
    "originalPrice": 1590,
    "currency": "USD",
    "rating": 4.9,
    "reviewsCount": 64,
    "featured": false,
    "isActive": true,
    "imageUrl": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85"
    ],
    "travelDate": "March to June & Sept to Dec",
    "tagline": "Glacial lakes at 12,000 feet, chanting Buddhist monks, and close-up views of Mount Kangchenjunga.",
    "overview": "Enter the enchanting Buddhist sanctuary of Sikkim. Wander through centuries-old prayer wheel corridors in Rumtek Monastery, ascend to the high alpine turquoise waters of Tsomgo Lake near Nathu La pass, and behold Mount Kangchenjunga glowing pink at sunrise in Pelling.",
    "highlights": [
      "Unobstructed sunrise views of Mt. Kangchenjunga from your private suite balcony",
      "Private access to Tsomgo Glacial Lake & Baba Mandir",
      "Exclusive monastery tour with Senior Lama meditation session",
      "Scenic helicopter joyride over Himalayan peaks (optional add-on)"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Bagdogra to Gangtok Valley",
        "description": "Chauffeur pickup through the Teesta river valley up to Gangtok. Check into your luxury hillside resort with views of snow peaks.",
        "meals": "Dinner",
        "hotel": "Mayfair Spa Resort & Casino Gangtok"
      },
      {
        "day": 2,
        "title": "Tsomgo Glacial Lake & Nathu La Pass (Indo-China Border)",
        "description": "Drive along thrilling mountain switchbacks to sacred Tsomgo Lake at 12,400 ft and the historic Silk Route pass of Nathu La.",
        "meals": "Breakfast & Hot Lunch",
        "hotel": "Mayfair Spa Resort Gangtok"
      },
      {
        "day": 3,
        "title": "Monasteries & Transfer to Pelling",
        "description": "Visit Rumtek Monastery and the Namgyal Institute of Tibetology. Scenic alpine drive across suspension bridges to Pelling.",
        "meals": "Breakfast & Dinner",
        "hotel": "The Chumbi Mountain Retreat & Spa Pelling"
      },
      {
        "day": 4,
        "title": "Skywalk, Rabdentse Ruins & Pemayangtse Monastery",
        "description": "Walk on the thrilling glass Skywalk overlooking the 137-ft Chenrezig statue. Explore ancient royal palace ruins engulfed in pine woods.",
        "meals": "Breakfast & Dinner",
        "hotel": "The Chumbi Mountain Retreat Pelling"
      },
      {
        "day": 5,
        "title": "Yuksom: The Ancient First Capital",
        "description": "Day excursion to historical Yuksom, starting point for Dzongri trek. Walk around sacred Khecheopalri Wish-Fulfilling Lake.",
        "meals": "Breakfast & Traditional Sikkimese Dinner",
        "hotel": "The Chumbi Mountain Retreat Pelling"
      },
      {
        "day": 6,
        "title": "Scenic Drive to Bagdogra / NJP & Departure",
        "description": "Descend through terraced cardamon valleys to Bagdogra Airport.",
        "meals": "Breakfast",
        "hotel": "N/A"
      }
    ],
    "inclusions": [
      "5 Nights in 5-star Himalayan luxury resorts",
      "Dedicated 4x4 Toyota Innova Crysta throughout",
      "All border permits, protected area passes, and monastery fees",
      "Daily gourmet breakfast and local farm-to-table dinners"
    ],
    "exclusions": [
      "Airfare to Bagdogra (IXB)",
      "Nathu La permit surcharge",
      "Personal tips"
    ],
    "weatherInfo": "Spring (Mar-May): 10°C - 20°C with rhododendron blooms. Autumn/Winter (Oct-Feb): 2°C - 15°C with crystal clear mountain visibility.",
    "bestTimeToVisit": "March to May & October to December."
  },
  {
    "id": "tour-darjeeling",
    "slug": "darjeeling-queen-of-hills",
    "title": "Darjeeling: Queen of the Hills & Toy Train Heritage",
    "destination": "Darjeeling",
    "category": "Domestic",
    "theme": "Luxury",
    "duration": "4 Days / 3 Nights",
    "price": 890,
    "originalPrice": 1100,
    "currency": "USD",
    "rating": 4.7,
    "reviewsCount": 52,
    "featured": false,
    "isActive": true,
    "imageUrl": "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1600&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=85"
    ],
    "travelDate": "Year-round Departures",
    "tagline": "Sunrise over Tiger Hill, vintage UNESCO steam train rides, and champagne tea garden high teas.",
    "overview": "Darjeeling remains the quintessential colonial hill retreat. Watch the sunrise ignite the snow peaks of Everest and Kangchenjunga from Tiger Hill, ride the century-old steam-puffing Himalayan Railway, and sip legendary Muscatel First Flush teas by cozy fireplaces.",
    "highlights": [
      "UNESCO World Heritage Steam Toy Train Joyride to Ghum",
      "Private sunrise viewing from exclusive Tiger Hill VIP pavilion",
      "Stay at the legendary colonial Windamere or Glenburn Tea Estate",
      "High Tea on the terrace overlooking rolling emerald tea slopes"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Darjeeling & Colonial Mall Road Walk",
        "description": "Chauffeur pickup from Bagdogra. Check into your heritage tea estate suite. Stroll along the pedestrian promenade of Chowrasta.",
        "meals": "High Tea & Dinner",
        "hotel": "Glenburn Tea Estate / The Elgin Darjeeling"
      },
      {
        "day": 2,
        "title": "Tiger Hill Sunrise & Himalayan Mountaineering Institute",
        "description": "4:00 AM private drive to Tiger Hill for dawn over Mount Everest and Kanchenjunga. Visit HMI museum and snow leopard breeding center.",
        "meals": "Breakfast & Dinner",
        "hotel": "Glenburn Tea Estate"
      },
      {
        "day": 3,
        "title": "Vintage Toy Train Joyride & Happy Valley Tea Factory",
        "description": "Board the historic steam locomotive to Ghum Monastery. In the afternoon, tour the oldest organic tea factory in Darjeeling.",
        "meals": "Breakfast & High Tea Dinner",
        "hotel": "Glenburn Tea Estate"
      },
      {
        "day": 4,
        "title": "Morning Breakfast & Departure",
        "description": "Final breakfast overlooking the Himalayas before airport drop at Bagdogra.",
        "meals": "Breakfast",
        "hotel": "N/A"
      }
    ],
    "inclusions": [
      "3 Nights in luxury heritage hotel / tea estate",
      "Toy train steam ride first-class tickets",
      "Private SUV with driver for all tours",
      "Breakfast, high tea, and three-course dinners"
    ],
    "exclusions": [
      "Airfare",
      "Personal beverages",
      "Camera fees"
    ],
    "weatherInfo": "Summer: 12°C - 20°C. Winter: 2°C - 10°C.",
    "bestTimeToVisit": "October to May."
  },
  {
    "id": "tour-vietnam",
    "slug": "vietnam-grand-indochine",
    "title": "Vietnam: Grand Indochine & Ha Long Bay Odyssey",
    "destination": "Vietnam",
    "category": "International",
    "theme": "Cultural",
    "duration": "8 Days / 7 Nights",
    "price": 2150,
    "originalPrice": 2790,
    "currency": "USD",
    "rating": 4.9,
    "reviewsCount": 142,
    "featured": true,
    "isActive": true,
    "imageUrl": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85"
    ],
    "travelDate": "Weekly Group & Private Departures",
    "tagline": "5-star cruise through limestone karsts, lantern-lit ancient towns, and French-Indochine culinary trails.",
    "overview": "From the bustling French colonial boulevards of Hanoi to the ethereal limestone towers rising out of emerald Ha Long Bay waters, and down to the timeless glowing silk lantern streets of Hoi An, Vietnam offers an intoxicating blend of heritage, cuisine, and dramatic nature.",
    "highlights": [
      "2 Nights aboard a 5-star luxury cruise ship in Ha Long & Lan Ha Bay",
      "Exclusive Hanoi Old Quarter street food safari with celebrity chef",
      "Private lantern boat floating on Hoai River in ancient Hoi An",
      "VIP access to the Golden Bridge held by colossal stone hands in Da Nang"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Hanoi: French Quarter Elegance",
        "description": "Chauffeur transfer to the historic Sofitel Legend Metropole Hanoi. Evening cyclo ride through the 36 ancient trade guild streets.",
        "meals": "Dinner",
        "hotel": "Sofitel Legend Metropole Hanoi"
      },
      {
        "day": 2,
        "title": "Hanoi to Ha Long Bay 5-Star Cruise Embarkation",
        "description": "Limousine transfer to the marina. Board your luxury private balcony suite cruise. Kayak through hidden sea grottos and watch sunset on the sundeck.",
        "meals": "Breakfast, Seafood Lunch & Dinner",
        "hotel": "Paradise Elegance / Orchid Cruise Ha Long"
      },
      {
        "day": 3,
        "title": "Lan Ha Bay Hidden Lagoons & Floating Villages",
        "description": "Morning Tai Chi on deck. Bamboo boat excursion into dark & bright sea caves with giant stalactites. Cooking demonstration with executive chef.",
        "meals": "Breakfast, Lunch & Dinner",
        "hotel": "Paradise Elegance Cruise"
      },
      {
        "day": 4,
        "title": "Fly to Da Nang & Transfer to Ancient Hoi An",
        "description": "Disembark cruise and transfer to airport for short domestic flight to Da Nang. Check into riverside luxury resort in UNESCO Hoi An.",
        "meals": "Breakfast & Dinner",
        "hotel": "Anantara Hoi An Resort"
      },
      {
        "day": 5,
        "title": "Hoi An Lanterns, Tailor Guilds & Sunset River Cruise",
        "description": "Walking tour of Japanese Covered Bridge and merchant houses. Evening private wooden sampan boat to float illuminated wishing candles on the water.",
        "meals": "Breakfast & Local Delicacy Lunch",
        "hotel": "Anantara Hoi An Resort"
      },
      {
        "day": 6,
        "title": "Ba Na Hills Golden Bridge & Cloud Sanctuary",
        "description": "Cable car ride above lush jungle to the iconic Golden Giant Hands Bridge before the crowds arrive. French village and alpine wine cellars.",
        "meals": "Breakfast & Lunch",
        "hotel": "Anantara Hoi An Resort"
      },
      {
        "day": 7,
        "title": "Ho Chi Minh City (Saigon) Rooftop & Riverfront",
        "description": "Fly to Saigon. Visit the historic War Remnants Museum, Notre-Dame Cathedral, and enjoy evening rooftop cocktails overlooking the skyline.",
        "meals": "Breakfast & Farewell Indochine Dinner",
        "hotel": "Park Hyatt Saigon"
      },
      {
        "day": 8,
        "title": "Saigon Departure",
        "description": "Private transfer to Tan Son Nhat International Airport for departure.",
        "meals": "Breakfast",
        "hotel": "N/A"
      }
    ],
    "inclusions": [
      "7 Nights in 5-star iconic heritage hotels and luxury cruises",
      "All domestic internal flights (Hanoi -> Da Nang -> Saigon)",
      "All luxury limousine transfers and private English speaking guides",
      "All entrance fees, cable car passes, and private boat charters",
      "Full board on Ha Long cruise and gourmet dining throughout"
    ],
    "exclusions": [
      "International flights to Vietnam",
      "Vietnam eVisa fee",
      "Personal expenses"
    ],
    "weatherInfo": "Pleasant and dry: 22°C - 29°C across central and northern regions.",
    "bestTimeToVisit": "September to April for idyllic cruising conditions."
  },
  {
    "id": "tour-bangkok",
    "slug": "bangkok-royal-metropolis-luxury",
    "title": "Bangkok: Royal Palaces & Chao Phraya High Life",
    "destination": "Bangkok",
    "category": "International",
    "theme": "Luxury",
    "duration": "5 Days / 4 Nights",
    "price": 1250,
    "originalPrice": 1550,
    "currency": "USD",
    "rating": 4.8,
    "reviewsCount": 91,
    "featured": false,
    "isActive": true,
    "imageUrl": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=85"
    ],
    "travelDate": "Year-round Departures",
    "tagline": "Golden Emerald Buddha, private teak boat river cruising, and Michelin star rooftop dining.",
    "overview": "Bangkok is a dazzling collision of majestic sacred Siamese temples and ultra-luxurious modern skyscraper lifestyle. Glide along the Chao Phraya river on a restored antique teak barge, enjoy VIP after-hours entrance to the Grand Palace, and shop luxury emporiums.",
    "highlights": [
      "Private Longtail Teak Boat along the historic canals of Thonburi",
      "VIP guided tour of the Grand Palace & Temple of the Reclining Buddha",
      "Michelin-starred Thai dining experience with wine pairing",
      "Chao Phraya luxury dinner cruise with live Siamese music"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Bangkok & Riverside Check-In",
        "description": "VIP airport fast-track immigration service and luxury limousine transfer to your riverfront suite at The Peninsula.",
        "meals": "Dinner",
        "hotel": "The Peninsula Bangkok / Mandarin Oriental"
      },
      {
        "day": 2,
        "title": "Grand Palace, Wat Pho & Private Canal Boat",
        "description": "Morning private exploration of the golden spires of the Royal Grand Palace. Step onto a private antique boat to explore the hidden waterways of old Bangkok.",
        "meals": "Breakfast & Royal Thai Lunch",
        "hotel": "The Peninsula Bangkok"
      },
      {
        "day": 3,
        "title": "Floating Market & High-End Luxury Malls",
        "description": "Visit the picturesque Damnoen Saduak floating market with private boat. Afternoon VIP shopping at ICONSIAM with personal stylist concierge.",
        "meals": "Breakfast & High Tea",
        "hotel": "The Peninsula Bangkok"
      },
      {
        "day": 4,
        "title": "Rooftop Skyline & Chao Phraya Dinner Cruise",
        "description": "Unwind at the world-renowned Peninsula Spa. In the evening, embark on a private 5-star dinner cruise under the illuminated Rama VIII bridge.",
        "meals": "Breakfast & Gala Dinner Cruise",
        "hotel": "The Peninsula Bangkok"
      },
      {
        "day": 5,
        "title": "Departure with VIP Airport Lounge",
        "description": "Private chauffeur transfer to Suvarnabhumi Airport with fast-track departure.",
        "meals": "Breakfast",
        "hotel": "N/A"
      }
    ],
    "inclusions": [
      "4 Nights in 5-star luxury riverfront suite",
      "VIP Fast-track airport immigration assistance",
      "Private chauffeur and luxury Mercedes transfer throughout",
      "Private antique boat canal charters and temple entrance passes",
      "Daily breakfast and curated gourmet dining experiences"
    ],
    "exclusions": [
      "International airfare",
      "Personal alcoholic drinks beyond pairings"
    ],
    "weatherInfo": "Tropical warm: 27°C - 33°C.",
    "bestTimeToVisit": "November to February for mild and pleasant weather."
  },
  {
    "id": "tour-pattaya",
    "slug": "pattaya-yacht-coastal-retreat",
    "title": "Pattaya: Private Catamarans & Coastal Serenity",
    "destination": "Pattaya",
    "category": "International",
    "theme": "Group",
    "duration": "4 Days / 3 Nights",
    "price": 950,
    "originalPrice": 1250,
    "currency": "USD",
    "rating": 4.7,
    "reviewsCount": 68,
    "featured": false,
    "isActive": true,
    "imageUrl": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=85",
    "galleryImages": [
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85"
    ],
    "travelDate": "Weekly Departures",
    "tagline": "Private catamaran charter to uninhabited coral islands, Sanctuary of Truth, and cliffside sunsets.",
    "overview": "Experience the upscale, serene side of the Gulf of Thailand. Charter a private catamaran to the pristine waters of Koh Pai and Koh Rin, marvel at the Sanctuary of Truth—the largest all-wood hand-carved temple in the world—and dine in open-air clifftop lounges.",
    "highlights": [
      "Full-day private luxury yacht sailing to Koh Pai & Koh Larn",
      "VIP architectural tour of the monumental hand-carved Sanctuary of Truth",
      "Nong Nooch Tropical Botanical Gardens VIP golf cart tour",
      "Oceanfront sunset dining at The Sky Gallery Pattaya"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Bangkok to Pattaya Luxury Transfer & Sanctuary of Truth",
        "description": "Chauffeur transfer from Bangkok to Pattaya. Check into luxury seaside resort. Afternoon tour of the magnificent Sanctuary of Truth.",
        "meals": "Dinner",
        "hotel": "InterContinental Pattaya Resort / Royal Cliff Grand"
      },
      {
        "day": 2,
        "title": "Full-Day Private Catamaran Yacht Island Hopping",
        "description": "Board your private luxury catamaran from Ocean Marina. Sail to secluded coral islands for snorkeling, jet skiing, and fresh onboard seafood BBQ.",
        "meals": "Breakfast, Seafood BBQ & Drinks",
        "hotel": "InterContinental Pattaya Resort"
      },
      {
        "day": 3,
        "title": "Nong Nooch Tropical Garden & Sunset Cliff Lounge",
        "description": "Explore the award-winning botanical gardens and French parterre gardens. Evening cocktails and dinner at a cliffside beach lounge.",
        "meals": "Breakfast & Clifftop Dinner",
        "hotel": "InterContinental Pattaya Resort"
      },
      {
        "day": 4,
        "title": "Leisure & Transfer to Bangkok Airport",
        "description": "Enjoy a morning beach stroll or infinity pool swim before private transfer to Bangkok airport.",
        "meals": "Breakfast",
        "hotel": "N/A"
      }
    ],
    "inclusions": [
      "3 Nights in 5-star beachfront ocean-view suites",
      "Full-day private yacht charter with crew and water sports equipment",
      "All private ground transfers in luxury van",
      "Daily breakfast and curated dinners"
    ],
    "exclusions": [
      "Airfare",
      "Personal tips and spa services"
    ],
    "weatherInfo": "Tropical coastal: 26°C - 32°C.",
    "bestTimeToVisit": "November to April."
  }
];

export const initialEvents: EventJourney[] = [
  {
    "id": "event-kashmir-autumn",
    "title": "Kashmir Autumn Gold & Saffron Harvest Expedition",
    "destination": "Kashmir, India",
    "eventDate": "2026-09-20",
    "endDate": "2026-09-26",
    "image": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85",
    "description": "Join an intimate 12-traveler expedition witnessing the legendary golden chinar tree foliage and the annual saffron bloom in Pampore valley.",
    "price": 1450,
    "duration": "7 Days",
    "seatsTotal": 12,
    "seatsRemaining": 4,
    "status": "active",
    "category": "Domestic",
    "highlights": [
      "Saffron farm harvest experience",
      "Dal Lake golden hour private houseboat",
      "Gulmarg gondola access"
    ]
  },
  {
    "id": "event-bali-retreat",
    "title": "Bali Equinox Holistic Luxury Wellness Retreat",
    "destination": "Bali, Indonesia",
    "eventDate": "2026-09-30",
    "endDate": "2026-10-07",
    "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
    "description": "A transformative spiritual sanctuary journey in Ubud rainforest villas with private sound baths, ocean yachting, and sacred temple blessings.",
    "price": 1899,
    "duration": "8 Days",
    "seatsTotal": 10,
    "seatsRemaining": 2,
    "status": "active",
    "category": "International",
    "highlights": [
      "Private villa pool in Ubud",
      "Nusa Penida yacht charter",
      "Tirta Empul water purification"
    ]
  },
  {
    "id": "event-vietnam-indochine",
    "title": "Vietnam Indochine Culinary & Lantern Festival Journey",
    "destination": "Vietnam (Hanoi to Hoi An)",
    "eventDate": "2026-10-15",
    "endDate": "2026-10-23",
    "image": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85",
    "description": "Celebrate the full moon lantern festival floating on the Hoai River in ancient Hoi An and cruise the limestone towers of Ha Long Bay.",
    "price": 2150,
    "duration": "9 Days",
    "seatsTotal": 14,
    "seatsRemaining": 5,
    "status": "active",
    "category": "International",
    "highlights": [
      "Hoi An Full Moon lantern celebration",
      "Lan Ha 5-star cruise",
      "Golden Bridge VIP access"
    ]
  },
  {
    "id": "event-andaman-coral",
    "title": "Andaman Deep Blue Coral Safari & Bioluminescent Night Kayaking",
    "destination": "Andaman Islands",
    "eventDate": "2026-11-05",
    "endDate": "2026-11-11",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    "description": "Exclusive scuba and marine expedition on Swaraj Dweep with night mangrove bioluminescence tours and private beach cabana living.",
    "price": 1390,
    "duration": "7 Days",
    "seatsTotal": 10,
    "seatsRemaining": 6,
    "status": "active",
    "category": "Domestic",
    "highlights": [
      "Bioluminescent night kayaking",
      "Private scuba diving instruction",
      "Radhanagar sunset champagne"
    ]
  },
  {
    "id": "event-vietnam-summer-past",
    "title": "Vietnam Summer Monsoon Cultural Trail (Past Expedition)",
    "destination": "Vietnam",
    "eventDate": "2026-08-25",
    "endDate": "2026-08-31",
    "image": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85",
    "description": "A completed summer expedition across central Vietnam ancient citadels.",
    "price": 1950,
    "duration": "7 Days",
    "seatsTotal": 12,
    "seatsRemaining": 0,
    "status": "active",
    "category": "International",
    "highlights": [
      "Hanoi street culinary",
      "Ha Long Bay sailing"
    ]
  }
];

export const initialGallery: GalleryItem[] = [
  {
    "id": "gal-1",
    "title": "Serene Shikaras on Dal Lake at Sunset",
    "location": "Srinagar, Kashmir",
    "category": "Domestic",
    "imageUrl": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85",
    "aspectRatio": "wide",
    "featured": true
  },
  {
    "id": "gal-2",
    "title": "Emerald Terraced Rice Pools of Ubud",
    "location": "Ubud, Bali",
    "category": "International",
    "imageUrl": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85",
    "aspectRatio": "tall",
    "featured": true
  },
  {
    "id": "gal-3",
    "title": "Limestone Karsts & Lan Ha Bay Catamaran",
    "location": "Ha Long Bay, Vietnam",
    "category": "International",
    "imageUrl": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=85",
    "aspectRatio": "wide",
    "featured": true
  },
  {
    "id": "gal-4",
    "title": "Crystal Clear Waters of Radhanagar Beach",
    "location": "Havelock, Andaman Islands",
    "category": "Domestic",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
    "aspectRatio": "square",
    "featured": false
  },
  {
    "id": "gal-5",
    "title": "Historic Himalayan Steam Locomotive",
    "location": "Darjeeling, India",
    "category": "Domestic",
    "imageUrl": "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1600&q=85",
    "aspectRatio": "wide",
    "featured": true
  },
  {
    "id": "gal-6",
    "title": "Golden Spired Temples of Bangkok Riverfront",
    "location": "Bangkok, Thailand",
    "category": "International",
    "imageUrl": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=85",
    "aspectRatio": "tall",
    "featured": false
  },
  {
    "id": "gal-7",
    "title": "Kangchenjunga Range Morning Alpenglow",
    "location": "Pelling, Sikkim",
    "category": "Aerials",
    "imageUrl": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=85",
    "aspectRatio": "wide",
    "featured": true
  },
  {
    "id": "gal-8",
    "title": "Private Yacht Anchor in Coral Lagoon",
    "location": "Pattaya Archipelago, Thailand",
    "category": "Group Expeditions",
    "imageUrl": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=85",
    "aspectRatio": "square",
    "featured": false
  },
  {
    "id": "gal-9",
    "title": "Wild Rhinoceros in the Kaziranga Meadows",
    "location": "Assam, India",
    "category": "Travel Moments",
    "imageUrl": "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=85",
    "aspectRatio": "tall",
    "featured": true
  },
  {
    "id": "gal-10",
    "title": "Tropical Sunset Reflection over Nusa Islands",
    "location": "Nusa Penida, Indonesia",
    "category": "Aerials",
    "imageUrl": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=85",
    "aspectRatio": "wide",
    "featured": false
  }
];

export const initialServices: ServiceItem[] = [
  {
    "id": "serv-domestic",
    "title": "Domestic Tours",
    "slug": "domestic-tours",
    "category": "Tours",
    "shortDesc": "Handcrafted customized holiday packages across India, including Assam, Andaman, Kashmir, Sikkim, and Darjeeling.",
    "fullDesc": "Experience the sublime diversity of India with our tailored domestic tours. From the serene houseboats and saffron valleys of Kashmir to the tropical coral reefs of Andaman, the misty tea hills of Darjeeling & Sikkim, and wildlife safaris in Assam, every journey is planned around your exact dates and pacing.",
    "iconName": "Compass",
    "imageUrl": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85",
    "features": [
      "Kashmir, Andaman, Assam, Sikkim & Darjeeling",
      "Customized dates and flexible duration",
      "Handpicked accommodations and resorts",
      "24/7 dedicated concierge assistance"
    ],
    "isActive": true,
    "tag": "Popular"
  },
  {
    "id": "serv-international",
    "title": "International Tours",
    "slug": "international-tours",
    "category": "Tours",
    "shortDesc": "Curated international holidays to Bangkok, Pattaya, Bali, and Vietnam designed for couples, families, and groups.",
    "fullDesc": "Embark on extraordinary international voyages designed around your schedule. Explore ancient Siamese temples and riverfronts in Bangkok, coastal serenity in Pattaya, sacred jungle sanctuaries in Bali, and emerald karst bays in Vietnam. We handle all logistics from start to finish.",
    "iconName": "Globe",
    "imageUrl": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
    "features": [
      "Bangkok, Pattaya, Bali & Vietnam",
      "Tailored itineraries with seamless coordination",
      "Premium stays and verified local guides",
      "End-to-end holiday support"
    ],
    "isActive": true,
    "tag": "Featured"
  },
  {
    "id": "serv-visa",
    "title": "Passport & Visa Assistance",
    "slug": "passport-visa-assistance",
    "category": "Travel Logistics",
    "shortDesc": "Hassle-free document verification, visa application guidance, and appointment scheduling for international travel.",
    "fullDesc": "Navigating international travel requirements is stress-free with our dedicated documentation team. We provide complete guidance for tourist visas, e-visas, passport renewals, application forms, documentation checks, and biometric appointment scheduling for all our international destinations.",
    "iconName": "ShieldCheck",
    "imageUrl": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85",
    "features": [
      "Tourist visa & e-visa assistance",
      "Document verification & checklist review",
      "Passport application & renewal guidance",
      "Biometrics & appointment coordination"
    ],
    "isActive": true,
    "tag": "Essential"
  },
  {
    "id": "serv-forex",
    "title": "Foreign Exchange",
    "slug": "foreign-exchange",
    "category": "Travel Logistics",
    "shortDesc": "Seamless foreign currency exchange, multi-currency travel forex cards, and competitive exchange rates for your international journeys.",
    "fullDesc": "Prepare for your international travels with complete financial peace of mind. We provide hassle-free foreign exchange solutions including genuine multi-currency forex travel cards, cash foreign currency notes in all major global denominations (USD, EUR, GBP, SGD, AED, THB, JPY, and more), zero-margin transparent rates, and doorstep delivery for effortless travel readiness.",
    "iconName": "Banknote",
    "imageUrl": "https://res.cloudinary.com/utdl8qrw/image/upload/v1790357832/services/foreign-exchange-1790357831767.jpg",
    "features": [
      "Multi-currency travel forex cards",
      "Major international foreign currencies available",
      "Competitive, transparent live exchange rates",
      "Swift processing & doorstep currency delivery"
    ],
    "isActive": true,
    "tag": "Forex"
  },
  {
    "id": "serv-flights",
    "title": "Flight Ticket Booking",
    "slug": "flight-ticket-booking",
    "category": "Travel Logistics",
    "shortDesc": "Domestic and international flight ticketing with optimal routings, seat selections, and competitive airfares.",
    "fullDesc": "We manage your domestic and international air travel with meticulous attention to connection times, baggage allowances, and flight comfort. Whether traveling solo, with family, or in large groups, our travel planners secure the best itineraries for your schedule.",
    "iconName": "Plane",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    "features": [
      "Domestic & international air tickets",
      "Optimal flight connections & schedules",
      "Group bookings & baggage support",
      "Instant confirmation & flight updates"
    ],
    "isActive": true,
    "tag": "Ticketing"
  },
  {
    "id": "serv-transit",
    "title": "Train & Bus Ticket Booking",
    "slug": "train-bus-ticket-booking",
    "category": "Travel Logistics",
    "shortDesc": "Confirmed train reservations, luxury sleeper bus tickets, and inter-city transit coordination for seamless journeys.",
    "fullDesc": "Experience hassle-free rail and bus reservations across India. From premium Vande Bharat and Rajdhani train bookings to AC sleeper bus reservations, we ensure comfortable land transit perfectly synchronized with your overall holiday itinerary.",
    "iconName": "Train",
    "imageUrl": "https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=1200&q=85",
    "features": [
      "Confirmed train ticket reservations",
      "AC sleeper & executive bus bookings",
      "Inter-city transit schedule alignment",
      "Station assistance & travel updates"
    ],
    "isActive": true,
    "tag": "Convenient"
  },
  {
    "id": "serv-hotels",
    "title": "Hotel Booking",
    "slug": "hotel-booking",
    "category": "Travel Logistics",
    "shortDesc": "Handpicked hotels, heritage stays, and luxury villas booked at verified partner rates suited to your preference.",
    "fullDesc": "Rest easy in carefully vetted accommodations that match your style and budget. From boutique tea estate bungalows in Darjeeling and Assam to heritage houseboats in Kashmir, private pool villas in Bali, and beachfront resorts in Andaman, Pattaya, and Vietnam, we secure the finest rooms.",
    "iconName": "Hotel",
    "imageUrl": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=85",
    "features": [
      "Heritage houseboats, tea bungalows & resorts",
      "Private villas & top-tier star hotels",
      "Room preferences & early check-in requests",
      "Breakfast and meal plan coordination"
    ],
    "isActive": true,
    "tag": "Hospitality"
  },
  {
    "id": "serv-school",
    "title": "School Group Tours",
    "slug": "school-group-tours",
    "category": "Special Travel",
    "shortDesc": "Safe, organized, and educational group tours for schools and colleges fostering learning and team spirit.",
    "fullDesc": "We design inspiring and secure educational journeys for schools, universities, and student institutions. Every tour prioritizes student safety, vetted accommodations, wholesome meals, certified tour guides, and structured educational and cultural itineraries.",
    "iconName": "GraduationCap",
    "imageUrl": "https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1?auto=format&fit=crop&w=1200&q=85",
    "features": [
      "Safety-first protocols & trusted supervision",
      "Educational, historical & science itineraries",
      "Dedicated group tour coordinators",
      "Customized student group packages"
    ],
    "isActive": true,
    "tag": "Education"
  },
  {
    "id": "serv-corporate",
    "title": "Corporate Group Travel",
    "slug": "corporate-group-travel",
    "category": "Special Travel",
    "shortDesc": "Comprehensive corporate offsites, executive retreats, team building tours, and MICE travel management.",
    "fullDesc": "Elevate your team retreats and corporate travel with our end-to-end planning. From annual offsites in Kashmir and Bali to corporate delegations in Bangkok and Vietnam, we orchestrate meeting spaces, team-building excursions, flights, accommodations, and banquets.",
    "iconName": "Briefcase",
    "imageUrl": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=85",
    "features": [
      "Corporate retreats & team-building events",
      "MICE travel & conference coordination",
      "Group flight & hotel reservations",
      "Dedicated account manager"
    ],
    "isActive": true,
    "tag": "Corporate"
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    "id": "test-1",
    "name": "Alexander & Victoria Sterling",
    "role": "Luxury Travelers from London",
    "destination": "Bali Luxury Island Escape",
    "rating": 5,
    "review": "Our honeymoon with Majestic Voyages was flawless in every sense. The private Ubud jungle villa was breathtaking, and the private catamaran to Nusa Penida was the highlight of our year. Truly world-class attention to detail.",
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    "tourDate": "August 2026",
    "verified": true
  },
  {
    "id": "test-2",
    "name": "Dr. Rajiv Malhotra & Family",
    "role": "Senior Consultant Surgeon",
    "destination": "Kashmir: Crown of Paradise",
    "rating": 5,
    "review": "The cedarwood houseboat on Nigeen Lake was peaceful and majestic. Having dedicated travel coordination and local guidance made traveling with elderly parents effortless. The Kashmiri Wazwan dinner was unforgettable.",
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    "tourDate": "July 2026",
    "verified": true
  },
  {
    "id": "test-3",
    "name": "Elena Rostova",
    "role": "Creative Director",
    "destination": "Vietnam: Grand Indochine Odyssey",
    "rating": 5,
    "review": "Ha Long Bay aboard the private balcony suite cruise exceeded all expectations. Floating through misty karst islands while sipping champagne felt like a movie scene. Everything was punctual and ultra-luxurious.",
    "avatarUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    "tourDate": "June 2026",
    "verified": true
  },
  {
    "id": "test-4",
    "name": "Marcus & Sophia Vance",
    "role": "Tech Entrepreneurs",
    "destination": "Andaman Turquoise Atolls",
    "rating": 5,
    "review": "Night kayaking through glowing bioluminescent mangroves in Havelock was pure magic. The Taj Exotica villa was heavenly, and the concierge arranged every single detail flawlessly via WhatsApp.",
    "avatarUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    "tourDate": "May 2026",
    "verified": true
  }
];
