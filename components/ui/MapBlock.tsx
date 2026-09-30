"use client";

import { useLanguage } from "@/context/LanguageContext";

/** Real coordinates of the practice, per its Google Business Profile listing. */
const CABINET_LAT = 33.4654826;
const CABINET_LNG = -7.6454193;

export function MapBlock({ className = "" }: { className?: string }) {
  const { t, links } = useLanguage();

  return (
    <div className={`relative overflow-hidden map-grid ${className}`}>
      <iframe
        title={t.contactInfo.mapLabel}
        src={`https://www.google.com/maps?q=${CABINET_LAT},${CABINET_LNG}&z=15&output=embed`}
        className="absolute inset-0 h-full w-full grayscale-[15%]"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <div className="absolute bottom-4 left-4 right-4 z-10 rounded-2xl border border-border bg-white/95 p-4 shadow-md backdrop-blur-sm sm:right-auto sm:max-w-xs">
        <p className="font-serif text-base text-green">{t.contactInfo.mapLabel}</p>
        <p className="mt-1 text-xs text-text-muted">{t.contactInfo.address}</p>
        <a
          href={links.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex text-xs font-medium text-gold hover:text-gold-dark"
        >
          {t.common.seeDirections} →
        </a>
      </div>
    </div>
  );
}
