"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconChevronDown, IconMenu2, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { NAV_ITEMS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { NeedsMenu } from "./NeedsMenu";
import { NEED_GROUPS, needHref } from "@/lib/needs";

export function Header() {
  const pathname = usePathname();
  const { t, links, locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [needsOpen, setNeedsOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setNeedsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-3 px-5 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-4 xl:gap-6 lg:flex" aria-label="Main">
          {NAV_ITEMS.map((item) => {
            const href = links.nav[item.key] || item.href;
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={item.key}
                href={href}
                className={`relative whitespace-nowrap text-[0.8125rem] transition-colors xl:text-sm ${
                  active ? "text-green font-medium" : "text-text-muted hover:text-green"
                }`}
              >
                {t.nav[item.key]}
                {active ? (
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-green" />
                ) : null}
              </Link>
            );
          })}
          <NeedsMenu />
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <LanguageSwitcher />
          <Button href={links.bookAppointment} variant="primary" className="!rounded-xl !py-2.5 !px-4 !text-[0.8125rem]">
            {t.common.bookAppointment}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-green"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <IconX className="h-5 w-5" /> : <IconMenu2 className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-cream lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-6">
            {NAV_ITEMS.map((item) => {
              const href = links.nav[item.key] || item.href;
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={`rounded-xl px-3 py-3 text-base ${
                    active ? "bg-beige-soft text-green font-medium" : "text-text-muted"
                  }`}
                >
                  {t.nav[item.key]}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={() => setNeedsOpen((v) => !v)}
              aria-expanded={needsOpen}
              className="flex items-center justify-between rounded-xl px-3 py-3 text-base text-text-muted"
            >
              {locale === "fr" ? "Vos besoins" : "Your needs"}
              <IconChevronDown className={`h-4 w-4 transition-transform ${needsOpen ? "rotate-180" : ""}`} stroke={1.8} />
            </button>
            {needsOpen ? (
              <div className="flex flex-col gap-4 px-3 pb-2">
                {NEED_GROUPS.map((group) => (
                  <div key={group.label}>
                    <p className="mb-1.5 text-xs font-semibold tracking-[0.1em] text-gold">
                      {(locale === "fr" ? group.label : group.labelEn).toUpperCase()}
                    </p>
                    <ul className="space-y-1">
                      {group.needs.map((n) => (
                        <li key={n.label}>
                          <Link
                            href={needHref(n)}
                            className="block rounded-lg py-1.5 text-sm text-text-muted"
                          >
                            {locale === "fr" ? n.label : n.labelEn}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}

            <Button href={links.bookAppointment} className="mt-2 w-full">
              {t.common.bookAppointment}
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
