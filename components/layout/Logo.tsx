"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Logo({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();

  return (
    <Link href="/" className="group flex items-center gap-3">
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-green/20 bg-beige-soft">
        {t.meta.logoUrl ? (
          <Image
            src={t.meta.logoUrl}
            alt={t.meta.siteName}
            fill
            sizes="44px"
            className="object-contain p-1.5"
          />
        ) : (
          <svg
            viewBox="0 0 40 40"
            className="h-6 w-6 text-green"
            fill="none"
            aria-hidden
          >
            <path
              d="M20 32C20 32 10 24 10 16.5C10 11.5 20 6 20 6C20 6 30 11.5 30 16.5C30 24 20 32 20 32Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M20 8V28" stroke="currentColor" strokeWidth="1.3" />
            <path
              d="M20 14C16.5 16 14 19 13 22"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M20 18C23.5 20 26 23 27 26"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        )}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-lg text-green group-hover:opacity-90 sm:text-xl">
          {t.meta.siteName}
        </span>
        {!compact ? (
          <span className="text-[0.65rem] font-medium tracking-[0.14em] text-text-soft">
            {t.meta.tagline}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
