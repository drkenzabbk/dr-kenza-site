"use client";

import { LeafMark } from "@/components/ui/LeafDecoration";
import { useLanguage } from "@/context/LanguageContext";

export function DoctorBadge({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <div
      className={`absolute bottom-4 right-4 z-10 flex max-w-[85%] items-center gap-2.5 rounded-2xl bg-green px-3.5 py-2.5 text-cream shadow-lg ${className}`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-muted">
        <LeafMark className="h-4 w-4 text-gold" />
      </span>
      <span className="leading-tight">
        <span className="block font-serif text-sm">{t.meta.siteName}</span>
        <span className="block text-[0.65rem] tracking-wide text-cream/75">
          {t.meta.tagline}
        </span>
      </span>
    </div>
  );
}
