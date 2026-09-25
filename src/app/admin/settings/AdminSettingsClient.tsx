'use client';

import { useState } from 'react';
import { SiteSettings } from '@/types';
import { updateSiteSettingsAction } from '@/actions/adminActions';
import { Check, Settings, Phone, Mail, MapPin } from 'lucide-react';

interface Props {
  initialSettings: SiteSettings;
}

export default function AdminSettingsClient({ initialSettings }: Props) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [saved, setSaved] = useState(false);

  const [websiteName, setWebsiteName] = useState(settings.websiteName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [phone, setPhone] = useState(settings.phone);
  const [email, setEmail] = useState(settings.email);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [address, setAddress] = useState(settings.address);
  const [experienceYears, setExperienceYears] = useState(settings.experienceYears);
  const [happyTravelers, setHappyTravelers] = useState(settings.happyTravelers);
  const [destinationsCount, setDestinationsCount] = useState(settings.destinationsCount);
  const [satisfactionRate, setSatisfactionRate] = useState(settings.satisfactionRate);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateSiteSettingsAction({
      websiteName,
      tagline,
      phone,
      email,
      whatsappNumber,
      address,
      experienceYears,
      happyTravelers,
      destinationsCount,
      satisfactionRate,
    });

    if (res.settings) {
      setSettings(res.settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <span className="text-xs uppercase tracking-[0.25em] text-[#B38F1E] font-bold">
          Global Configuration
        </span>
        <h1 className="font-sans text-3xl font-bold text-[#26345C] mt-1 tracking-tight">
          SITE SETTINGS
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Updates made here immediately propagate to all public WhatsApp buttons, footers, and stats.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-700 font-semibold">
          <Check className="w-4 h-4" />
          <span>Site settings successfully updated and revalidated across all pages!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs bg-white border border-slate-200/80 p-8 rounded-3xl shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
              Website Brand Name
            </label>
            <input
              type="text"
              required
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>

          <div>
            <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
              Global WhatsApp Number (digits only, e.g. 919876543210)
            </label>
            <input
              type="text"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>
        </div>

        <div>
          <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
            Global Tagline
          </label>
          <input
            type="text"
            required
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
              Phone Numbers
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>

          <div>
            <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>
        </div>

        <div>
          <label className="text-slate-700 font-semibold uppercase tracking-wider block mb-1">
            Physical Office Address
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
          />
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h3 className="font-sans text-sm text-[#26345C] font-bold mb-4">
            Animated Statistics Counters
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-slate-600 font-medium text-xs block mb-1">Years Experience</label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-slate-600 font-medium text-xs block mb-1">Happy Travelers</label>
              <input
                type="number"
                value={happyTravelers}
                onChange={(e) => setHappyTravelers(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-slate-600 font-medium text-xs block mb-1">Destinations</label>
              <input
                type="number"
                value={destinationsCount}
                onChange={(e) => setDestinationsCount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-slate-600 font-medium text-xs block mb-1">Satisfaction %</label>
              <input
                type="number"
                value={satisfactionRate}
                onChange={(e) => setSatisfactionRate(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-[#26345C] hover:bg-[#1E2942] text-white font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
          >
            Save Global Settings
          </button>
        </div>
      </form>
    </div>
  );
}
