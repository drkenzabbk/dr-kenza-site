"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-border bg-white/70 p-0.5 text-xs font-medium ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === "en" ? "bg-green text-white" : "text-text-muted hover:text-green"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("fr")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === "fr" ? "bg-green text-white" : "text-text-muted hover:text-green"
        }`}
        aria-pressed={locale === "fr"}
      >
        FR
      </button>
    </div>
  );
}
