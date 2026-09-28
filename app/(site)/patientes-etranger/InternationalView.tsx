"use client";

import Link from "next/link";
import {
  IconArrowRight,
  IconBrandWhatsapp,
  IconLanguage,
  IconMessageCircle,
  IconPlaneTilt,
  IconRepeat,
  IconShieldCheck,
  IconStack2,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ } from "@/components/ui/FAQ";
import { CTA } from "@/components/ui/CTA";
import { LeafDecoration, LeafMark } from "@/components/ui/LeafDecoration";
import { RoundedImage } from "@/components/ui/RoundedImage";
import { DoctorBadge } from "@/components/ui/DoctorBadge";

const highlightIcons = [IconLanguage, IconMessageCircle, IconPlaneTilt];
const whyIcons = [IconStack2, IconLanguage, IconShieldCheck, IconRepeat];

export function InternationalView() {
  const { t, links } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="section-label mb-4">
                <LeafMark />
                {t.international.heroLabel}
              </span>
              <h1 className="font-serif text-4xl leading-[1.15] text-green sm:text-5xl lg:text-[3.25rem]">
                {t.international.heroTitle}{" "}
                <span className="accent-italic">{t.international.heroTitleAccent}</span>
              </h1>
              <p className="prose-body mt-5 max-w-lg">{t.international.heroText}</p>

              {t.international.highlights.length > 0 ? (
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {t.international.highlights.map((item, i) => {
                    const Icon = highlightIcons[i] ?? highlightIcons[0];
                    return (
                      <div key={item.title} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-beige-soft text-gold">
                          <Icon className="h-4 w-4" stroke={1.4} />
                        </span>
                        <span className="text-sm font-medium leading-snug text-green">
                          {item.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={links.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1ebe5d]"
                >
                  <IconBrandWhatsapp className="h-4 w-4" stroke={1.6} />
                  {t.contact.whatsappCta}
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <LeafDecoration className="absolute -right-8 -top-4 h-48 w-36" />
              <RoundedImage
                src={t.international.heroImage}
                alt={t.international.heroTitle}
                priority
                className="aspect-[4/5] w-full rounded-[2rem] md:rounded-[2.5rem]"
                badge={<DoctorBadge />}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Why choose us */}
      {t.international.why.length > 0 ? (
        <section className="pb-20 md:pb-28">
          <Container>
            <SectionHeading
              label={t.international.whyLabel}
              title={t.international.whyTitle}
              align="center"
              className="mb-12"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {t.international.why.map((item, i) => {
                const Icon = whyIcons[i] ?? whyIcons[0];
                return (
                  <article key={item.title} className="card-soft flex flex-col items-start px-6 py-7">
                    <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-beige-soft text-gold">
                      <Icon className="h-5 w-5" stroke={1.4} />
                    </span>
                    <h3 className="font-serif text-lg text-green">{item.title}</h3>
                    <p className="prose-body mt-2 text-sm">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Steps via WhatsApp */}
      {t.international.steps.length > 0 ? (
        <section className="pb-20 md:pb-28">
          <Container>
            <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[1.75rem] bg-green p-7 text-cream md:p-10">
              <LeafDecoration className="absolute -right-8 -top-6 h-48 w-36 text-gold" opacity={0.18} />
              <span className="section-label relative">
                <LeafMark className="text-gold" />
                {t.international.stepsLabel}
              </span>
              <h2 className="relative mt-3 font-serif text-3xl leading-tight md:text-4xl">
                {t.international.stepsTitle}
              </h2>

              <ol className="relative mt-8 space-y-4">
                {t.international.steps.map((step, index) => (
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

              <div className="relative mt-8">
                <a
                  href={links.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1ebe5d] sm:w-auto"
                >
                  <IconBrandWhatsapp className="h-5 w-5" stroke={1.6} />
                  {t.contact.whatsappCta}
                </a>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* FAQ + CTA */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <SectionHeading
                label={t.international.faqLabel}
                title={t.international.faqTitle}
                className="mb-6"
              />
              <FAQ items={t.international.faqs} />
              <Link
                href={links.seeAllQuestions}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green underline-offset-4 hover:underline"
              >
                {t.common.seeAllQuestions}
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <CTA
              variant="card"
              title={t.international.ctaTitle}
              text={t.international.ctaText}
              href={t.international.ctaHref || links.whatsappHref}
              showContactDetails
            />
          </div>
        </Container>
      </section>
    </>
  );
}
