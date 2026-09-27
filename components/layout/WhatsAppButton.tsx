"use client";

import { IconBrandWhatsapp } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
export function whatsappLink(base: string, prefill: string) {
  const text = encodeURIComponent(prefill);
  const join = base.includes("?") ? "&" : "?";
  return `${base}${join}text=${text}`;
}

export function WhatsAppButton() {
  const { t, links } = useLanguage();

  return (
    <a
      href={whatsappLink(links.whatsappHref, t.contact.whatsappPrefill)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.common.whatsappChat}
      className="group fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6"
    >
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-green px-3.5 py-2 text-sm font-medium text-cream opacity-0 shadow-md transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
        {t.common.whatsappChat}
      </span>
      <span className="whatsapp-fab flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 group-hover:scale-105">
        <IconBrandWhatsapp className="h-7 w-7" stroke={1.6} />
      </span>
    </a>
  );
}
