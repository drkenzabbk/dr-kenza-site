"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconCalendar,
  IconClock,
  IconBrandWhatsapp,
  IconStethoscope,
  IconArrowRight,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { whatsappLink } from "@/components/layout/WhatsAppButton";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import { LeafDecoration, LeafMark } from "@/components/ui/LeafDecoration";
import { CmsImage } from "@/components/ui/CmsImage";
import type { BlogPostDetail } from "@/sanity/lib/content";

export function BlogPostView({
  post,
  galleryImage,
  galleryImageAlt,
}: {
  post: BlogPostDetail;
  galleryImage?: string;
  galleryImageAlt?: string;
}) {
  const { t, links, locale } = useLanguage();
  const whatsappHref = whatsappLink(links.whatsappHref, t.contact.whatsappPrefill);
  const backLabel = locale === "fr" ? "Tous les articles" : "All articles";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-12 pt-8 md:pb-16 md:pt-12">
        <Container className="max-w-3xl">
          <Link
            href="/informations"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-soft hover:text-green"
          >
            <IconArrowLeft className="h-4 w-4" stroke={1.6} />
            {backLabel}
          </Link>
          <span className="section-label mb-4">
            <LeafMark />
            {post.category}
          </span>
          <h1 className="font-serif text-3xl leading-[1.2] text-green sm:text-4xl lg:text-[2.75rem]">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-text-soft">
            <span className="inline-flex items-center gap-1.5">
              <IconCalendar className="h-4 w-4" stroke={1.5} />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconClock className="h-4 w-4" stroke={1.5} />
              {post.readTime}
            </span>
          </div>
        </Container>
      </section>

      {/* Hero image */}
      {post.image ? (
        <section className="pb-12 md:pb-16">
          <Container className="max-w-4xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] shadow-sm">
              <CmsImage src={post.image} alt={post.imageAlt || post.title} priority sizes="(max-width:1024px) 100vw, 900px" />
            </div>
          </Container>
        </section>
      ) : null}

      {/* Body */}
      <section className="pb-16 md:pb-20">
        <Container className="max-w-3xl">
          <div className="space-y-10">
            {post.sections.map((section, index) => (
              <div key={section.heading}>
                <h2 className="font-serif text-2xl text-green md:text-[1.75rem]">{section.heading}</h2>
                <div className="prose-body mt-3 space-y-4 text-[1.02rem]">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {index === 1 && galleryImage ? (
                  <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-[1.5rem]">
                    <CmsImage src={galleryImage} alt={galleryImageAlt || post.title} sizes="(max-width:1024px) 100vw, 900px" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {/* Related service card */}
          {post.relatedServiceSlug ? (
            <div className="relative mt-12 overflow-hidden rounded-[1.5rem] bg-beige-soft p-7 md:p-8">
              <LeafDecoration className="absolute -right-6 -top-4 h-36 w-28" opacity={0.18} />
              <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-gold">
                    <IconStethoscope className="h-5 w-5" stroke={1.4} />
                  </span>
                  <div>
                    <p className="font-serif text-lg text-green">
                      {locale === "fr" ? "Ce sujet vous concerne ?" : "Is this relevant to you?"}
                    </p>
                    <p className="mt-1 text-sm text-text-muted">
                      {locale === "fr"
                        ? "Découvrez ce service et prenez rendez-vous au cabinet."
                        : "Discover this service and book an appointment."}
                    </p>
                  </div>
                </div>
                <Button
                  href={`/services/${post.relatedServiceSlug}`}
                  variant="outline"
                  className="shrink-0 whitespace-nowrap"
                >
                  {locale === "fr" ? "Voir le service" : "See the service"}
                  <IconArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      {/* FAQ */}
      {post.faqs.length > 0 ? (
        <section className="pb-16 md:pb-20">
          <Container className="max-w-3xl">
            <h2 className="section-label mb-2">
              <LeafMark />
              {post.faqLabel ?? t.informations.faqLabel}
            </h2>
            <h3 className="mb-6 font-serif text-2xl text-green md:text-3xl">
              {post.faqTitle ?? (locale === "fr" ? "Questions fréquentes" : "Frequently asked questions")}
            </h3>
            <FAQ items={post.faqs} />
          </Container>
        </section>
      ) : null}

      {/* CTA: book appointment + WhatsApp */}
      <section className="pb-24 md:pb-32">
        <Container className="max-w-3xl">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-green px-7 py-9 text-cream md:px-10 md:py-12">
            <LeafDecoration className="absolute -left-6 top-0 h-40 w-32 text-gold" opacity={0.18} />
            <div className="relative z-10">
              <h3 className="font-serif text-2xl md:text-3xl">
                {post.ctaTitle ?? (locale === "fr" ? "Une question sur ce sujet ?" : "A question about this topic?")}
              </h3>
              <p className="mt-3 max-w-lg text-sm text-cream/85 md:text-base">
                {post.ctaText ??
                  (locale === "fr"
                    ? "Le Dr Kenza Benboubker vous reçoit à Bouskoura pour en discuter et vous accompagner."
                    : "Dr Kenza Benboubker welcomes you in Bouskoura to discuss it and support you.")}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={post.ctaHref || links.bookAppointment} variant="accent" showCalendar>
                  {t.common.bookAppointment}
                </Button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1ebe5d]"
                >
                  <IconBrandWhatsapp className="h-4 w-4" stroke={1.8} />
                  {t.common.whatsappChat}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
