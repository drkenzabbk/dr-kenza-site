"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IconX, IconZoomIn } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ResultsGallery({ items }: { items: { image: string; caption?: string }[] }) {
  const { t, locale } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const fallbackAlt = locale === "fr" ? "Résultat avant / après" : "Before / after result";

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  if (items.length === 0) return null;

  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <SectionHeading
          label={t.home.resultsLabel}
          title={t.home.resultsTitle}
          accent={t.home.resultsTitleAccent}
          align="center"
          className="mb-10 md:mb-12"
        />

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {items.map((item, index) => (
            <button
              key={item.image}
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-beige-soft shadow-sm"
            >
              <Image
                src={item.image}
                alt={item.caption || fallbackAlt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-green/40 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                {item.caption ? (
                  <span className="text-xs font-medium text-white">{item.caption}</span>
                ) : null}
                <IconZoomIn className="ml-auto h-4 w-4 text-white" stroke={1.8} />
              </span>
            </button>
          ))}
        </div>
      </Container>

      {openIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-green-deep/90 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label={locale === "fr" ? "Fermer" : "Close"}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <IconX className="h-5 w-5" stroke={1.8} />
          </button>
          <div className="relative aspect-[4/5] w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <Image
              src={items[openIndex].image}
              alt={items[openIndex].caption || fallbackAlt}
              fill
              sizes="90vw"
              className="rounded-xl object-contain"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
