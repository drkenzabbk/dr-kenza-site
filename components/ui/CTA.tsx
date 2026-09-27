"use client";

import {
  IconClock,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { LeafDecoration } from "@/components/ui/LeafDecoration";
import type { ReactNode } from "react";

type Props = {
  title?: string;
  text?: string;
  variant?: "banner" | "card" | "split";
  className?: string;
  showContactDetails?: boolean;
  sideImage?: ReactNode;
  href?: string;
};

export function CTA({
  title,
  text,
  variant = "banner",
  className = "",
  showContactDetails = true,
  sideImage,
  href,
}: Props) {
  const { t, links } = useLanguage();
  const buttonHref = href || links.bookAppointment;
  const heading = title ?? t.home.appointmentTitle;
  const body = text;

  if (variant === "card") {
    return (
      <div
        className={`relative overflow-hidden rounded-[1.75rem] bg-green p-7 text-cream md:p-8 ${className}`}
      >
        <LeafDecoration className="absolute -right-6 -top-4 h-44 w-32 text-gold" opacity={0.2} />
        <h3 className="font-serif text-2xl md:text-3xl">{heading}</h3>
        {body ? <p className="mt-3 text-sm text-cream/80">{body}</p> : null}
        {showContactDetails ? (
          <ul className="mt-6 space-y-3 text-sm text-cream/90">
            <li className="flex items-center gap-2.5">
              <IconPhone className="h-4 w-4 text-gold" stroke={1.5} />
              {t.contactInfo.phone}
            </li>
            <li className="flex items-start gap-2.5">
              <IconClock className="mt-0.5 h-4 w-4 text-gold" stroke={1.5} />
              <span>
                {t.contactInfo.hoursWeekday}
                <br />
                {t.contactInfo.hoursSaturday}
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <IconMapPin className="h-4 w-4 text-gold" stroke={1.5} />
              {t.contactInfo.addressShort}
            </li>
          </ul>
        ) : null}
        <Button href={buttonHref} variant="accent" showCalendar className="mt-7">
          {t.common.bookAppointment}
        </Button>
      </div>
    );
  }

  if (variant === "split") {
    return (
      <div
        className={`relative grid overflow-hidden rounded-[1.75rem] bg-green lg:grid-cols-[1.1fr_1fr] ${className}`}
      >
        <div className="relative p-8 md:p-10">
          <LeafDecoration className="absolute bottom-0 left-0 h-40 w-28 text-gold" opacity={0.15} />
          <h3 className="font-serif text-3xl text-cream md:text-4xl">{heading}</h3>
          {body ? <p className="mt-3 max-w-md text-sm text-cream/80">{body}</p> : null}
          {showContactDetails ? (
            <ul className="mt-8 space-y-3 text-sm text-cream/90">
              <li className="flex items-center gap-2.5">
                <IconPhone className="h-4 w-4 text-gold" stroke={1.5} />
                <a href={links.phoneHref}>{t.contactInfo.phone}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <IconClock className="mt-0.5 h-4 w-4 text-gold" stroke={1.5} />
                <span>
                  {t.contactInfo.hoursWeekday}
                  <br />
                  {t.contactInfo.hoursSaturday}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <IconMapPin className="h-4 w-4 text-gold" stroke={1.5} />
                {t.contactInfo.address}
              </li>
            </ul>
          ) : null}
          <Button href={buttonHref} variant="accent" showCalendar className="mt-8">
            {t.common.bookAppointment}
          </Button>
        </div>
        <div className="relative min-h-[220px] bg-beige/20 lg:min-h-full">
          {sideImage}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[1.75rem] bg-green px-8 py-10 md:flex-row md:items-center md:px-10 ${className}`}
    >
      <LeafDecoration className="absolute -left-4 top-2 h-36 w-28 text-gold" opacity={0.18} />
      <div className="relative z-10 max-w-lg">
        <h3 className="font-serif text-3xl text-cream md:text-4xl">{heading}</h3>
        {body ? <p className="mt-2 text-sm text-cream/80">{body}</p> : null}
      </div>
      <Button href={buttonHref} variant="accent" showCalendar className="relative z-10 shrink-0">
        {t.common.bookAppointment}
      </Button>
      {sideImage ? (
        <div className="relative z-10 hidden w-48 overflow-hidden rounded-2xl md:block lg:w-56">
          {sideImage}
        </div>
      ) : null}
    </div>
  );
}
