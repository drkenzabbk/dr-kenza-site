"use client";

import {
  IconBrandWhatsapp,
  IconCar,
  IconClock,
  IconLock,
  IconMapPin,
  IconParking,
  IconPhone,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { whatsappLink } from "@/components/layout/WhatsAppButton";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ } from "@/components/ui/FAQ";
import { CTA } from "@/components/ui/CTA";
import { LeafDecoration, LeafMark } from "@/components/ui/LeafDecoration";
import { RoundedImage } from "@/components/ui/RoundedImage";
import { MapBlock } from "@/components/ui/MapBlock";

export function ContactView() {
  const { t, links } = useLanguage();
  const whatsappHref = whatsappLink(links.whatsappHref, t.contact.whatsappPrefill);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-14 pt-10 md:pb-20 md:pt-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="section-label mb-4">
                <LeafMark />
                {t.contact.heroLabel}
              </span>
              <h1 className="font-serif text-4xl leading-[1.15] text-green sm:text-5xl lg:text-[3.25rem]">
                {t.contact.heroTitle}{" "}
                <span className="accent-italic">{t.contact.heroTitleAccent}</span>
              </h1>
              <p className="prose-body mt-5 max-w-lg">{t.contact.heroText}</p>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <LeafDecoration className="absolute -right-8 -top-4 h-48 w-36" />
              <RoundedImage
                src={t.contact.heroImage}
                alt={t.meta.siteName}
                priority
                className="aspect-[4/5] w-full rounded-[2rem] md:rounded-[2.5rem]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* WhatsApp booking + contact info */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="relative flex flex-col overflow-hidden rounded-[1.75rem] bg-green p-7 text-cream md:p-9">
              <LeafDecoration
                className="absolute -right-8 -top-6 h-48 w-36 text-gold"
                opacity={0.18}
              />
              <span className="section-label relative">
                <LeafMark className="text-gold" />
                {t.contact.whatsappLabel}
              </span>
              <h2 className="relative mt-3 font-serif text-3xl leading-tight md:text-4xl">
                {t.contact.whatsappTitle}
              </h2>
              <p className="relative mt-4 max-w-md text-sm leading-relaxed text-cream/80 md:text-base">
                {t.contact.whatsappText}
              </p>

              <ol className="relative mt-8 space-y-4">
                {t.contact.whatsappSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-3.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 font-serif text-base text-gold">
                      {index + 1}
                    </span>
                    <span>
                      <span className="block font-medium text-cream">{step.title}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-cream/70">
                        {step.text}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="relative mt-auto pt-8">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1ebe5d]"
                >
                  <IconBrandWhatsapp className="h-5 w-5" stroke={1.6} />
                  {t.contact.whatsappCta}
                </a>
                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-cream/60">
                  <IconLock className="h-3.5 w-3.5" stroke={1.5} />
                  {t.common.confidentiality}
                </p>
              </div>
            </div>

            {/* Contact details + map */}
            <div className="flex flex-col gap-6">
              <div className="card-soft divide-y divide-border p-2">
                <a
                  href={links.phoneHref}
                  className="flex items-start gap-4 px-4 py-4 transition-colors hover:bg-beige-soft/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-beige-soft text-gold">
                    <IconPhone className="h-5 w-5" stroke={1.4} />
                  </span>
                  <span>
                    <span className="block text-xs font-medium tracking-wide text-gold">
                      {t.contact.phoneLabel}
                    </span>
                    <span className="mt-0.5 block text-sm text-green">
                      {t.contactInfo.phone}
                    </span>
                  </span>
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 px-4 py-4 transition-colors hover:bg-beige-soft/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-beige-soft text-gold">
                    <IconBrandWhatsapp className="h-5 w-5" stroke={1.4} />
                  </span>
                  <span>
                    <span className="block text-xs font-medium tracking-wide text-gold">
                      {t.contact.whatsappLabel}
                    </span>
                    <span className="mt-0.5 block text-sm text-green">
                      {t.contactInfo.whatsapp}
                    </span>
                  </span>
                </a>
                <div className="flex items-start gap-4 px-4 py-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-beige-soft text-gold">
                    <IconClock className="h-5 w-5" stroke={1.4} />
                  </span>
                  <span>
                    <span className="block text-xs font-medium tracking-wide text-gold">
                      {t.contact.hoursLabel}
                    </span>
                    <span className="mt-0.5 block text-sm text-green">
                      {t.contactInfo.hoursWeekday}
                      <br />
                      {t.contactInfo.hoursSaturday}
                    </span>
                  </span>
                </div>
                <div className="flex items-start gap-4 px-4 py-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-beige-soft text-gold">
                    <IconMapPin className="h-5 w-5" stroke={1.4} />
                  </span>
                  <span>
                    <span className="block text-xs font-medium tracking-wide text-gold">
                      {t.contact.addressLabel}
                    </span>
                    <span className="mt-0.5 block text-sm text-green">
                      {t.contactInfo.address}
                    </span>
                    <a
                      href={links.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-xs font-medium text-gold hover:text-gold-dark"
                    >
                      {t.common.seeDirections} →
                    </a>
                  </span>
                </div>
              </div>

              <MapBlock className="min-h-[260px] flex-1 rounded-[1.75rem]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Access & parking */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="relative grid items-center gap-8 overflow-hidden rounded-[1.75rem] bg-beige-soft p-6 md:grid-cols-2 md:gap-10 md:p-8">
            <RoundedImage
              src={t.contact.accessImage}
              alt={t.contact.accessTitle}
              className="aspect-[5/3.5] w-full rounded-[1.25rem]"
            />
            <div className="relative">
              <LeafDecoration className="absolute -right-4 top-0 h-36 w-28" opacity={0.2} />
              <h2 className="font-serif text-3xl text-green md:text-4xl">
                {t.contact.accessTitle}
              </h2>
              <div className="mt-6 space-y-5">
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-gold">
                    <IconCar className="h-5 w-5" stroke={1.4} />
                  </span>
                  <div>
                    <h3 className="font-medium text-green">{t.contact.accessSimpleTitle}</h3>
                    <p className="prose-body mt-1 text-sm">{t.contact.accessSimpleText}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-gold">
                    <IconParking className="h-5 w-5" stroke={1.4} />
                  </span>
                  <div>
                    <h3 className="font-medium text-green">{t.contact.parkingTitle}</h3>
                    <p className="prose-body mt-1 text-sm">{t.contact.parkingText}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="pb-16 md:pb-20">
        <Container className="max-w-3xl">
          <SectionHeading
            label={t.contact.faqLabel}
            title={t.contact.faqTitle}
            align="center"
            className="mb-8"
          />
          <FAQ items={t.contact.faqs} />
        </Container>
      </section>

      {/* CTA banner */}
      <section className="pb-24 md:pb-32">
        <Container>
          <CTA
            variant="banner"
            title={t.contact.ctaTitle}
            text={t.contact.ctaText}
            href={t.contact.ctaHref}
            showContactDetails={false}
          />
        </Container>
      </section>
    </>
  );
}
