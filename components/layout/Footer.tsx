"use client";

import Link from "next/link";
import {
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { NAV_ITEMS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function Footer() {
  const { t, links } = useLanguage();

  return (
    <footer className="mt-auto border-t border-border bg-beige-soft/60">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-[0.16em] text-gold">
              {t.footer.usefulLinks}
            </h3>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={links.nav[item.key] || item.href}
                    className="text-sm text-text-muted transition-colors hover:text-green"
                  >
                    {t.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-[0.16em] text-gold">
              {t.footer.contact}
            </h3>
            <ul className="space-y-3 text-sm text-text-muted">
              <li className="flex items-start gap-2.5">
                <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-gold" stroke={1.5} />
                <a href={links.phoneHref} className="hover:text-green">
                  {t.contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-gold" stroke={1.5} />
                <a href={links.emailHref} className="hover:text-green">
                  {t.contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" stroke={1.5} />
                <span>{t.contactInfo.address}</span>
              </li>
            </ul>
            <div className="mt-5 flex gap-2.5">
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-green text-white transition-opacity hover:opacity-90"
                aria-label="Instagram"
              >
                <IconBrandInstagram className="h-4 w-4" stroke={1.5} />
              </a>
              <a
                href={links.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-green text-white transition-opacity hover:opacity-90"
                aria-label="WhatsApp"
              >
                <IconBrandWhatsapp className="h-4 w-4" stroke={1.5} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-[0.16em] text-gold">
              {t.footer.hours}
            </h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>{t.contactInfo.hoursWeekday}</li>
              <li>{t.contactInfo.hoursSaturday}</li>
              <li className="pt-1 text-green">{t.common.byAppointment}</li>
            </ul>
          </div>
        </div>
      </Container>
      <div className="border-t border-border/80 bg-beige/50 py-4 text-center text-xs text-text-soft">
        <p>{t.footer.copyright}</p>
        <p className="mt-1">N° d'inscription à l'Ordre National des Médecins du Maroc : 31262</p>
      </div>
    </footer>
  );
}
