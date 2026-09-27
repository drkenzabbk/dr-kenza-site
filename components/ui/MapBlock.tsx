"use client";

import { IconMapPin } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

export function MapBlock({ className = "" }: { className?: string }) {
  const { t, links } = useLanguage();

  return (
    <div className={`relative overflow-hidden map-grid ${className}`}>
      {/* Stylized map roads */}
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 400 320"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0 80 H400" strokeWidth="8" className="stroke-green/15" />
        <path d="M0 180 H400" strokeWidth="6" className="stroke-green/15" />
        <path d="M120 0 V320" strokeWidth="7" className="stroke-green/15" />
        <path d="M260 0 V320" strokeWidth="5" className="stroke-green/15" />
        <path
          d="M0 240 Q200 200 400 260"
          strokeWidth="4"
          className="stroke-green/15"
          fill="none"
        />
      </svg>

      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green text-cream shadow-lg ring-4 ring-green/20">
          <IconMapPin className="h-5 w-5" stroke={1.6} />
        </span>
      </div>

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
