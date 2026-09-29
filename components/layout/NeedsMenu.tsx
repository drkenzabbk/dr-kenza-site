"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { NEED_GROUPS, needHref } from "@/lib/needs";

export function NeedsMenu() {
  const { locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const label = locale === "fr" ? "Vos besoins" : "Your needs";

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex items-center gap-1 whitespace-nowrap text-[0.8125rem] transition-colors xl:text-sm ${
          open ? "text-green font-medium" : "text-text-muted hover:text-green"
        }`}
      >
        {label}
        <IconChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} stroke={1.8} />
      </button>

      {open ? (
        <div className="absolute left-1/2 top-full z-50 mt-3 w-[min(90vw,640px)] -translate-x-1/2 rounded-2xl border border-border bg-white p-5 shadow-lg">
          <div className="grid gap-5 sm:grid-cols-2">
            {NEED_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="mb-2 text-xs font-semibold tracking-[0.1em] text-gold">
                  {(locale === "fr" ? group.label : group.labelEn).toUpperCase()}
                </p>
                <ul className="space-y-1.5">
                  {group.needs.map((n) => (
                    <li key={n.label}>
                      <Link
                        href={needHref(n)}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-2 py-1.5 text-sm text-text-muted transition-colors hover:bg-beige-soft hover:text-green"
                      >
                        {locale === "fr" ? n.label : n.labelEn}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
