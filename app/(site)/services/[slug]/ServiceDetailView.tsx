"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconArrowRight,
  IconMessageCircle,
  IconClipboardList,
  IconHeartHandshake,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ } from "@/components/ui/FAQ";
import { CTA } from "@/components/ui/CTA";
import { Timeline } from "@/components/ui/Timeline";
import { LeafDecoration, LeafMark } from "@/components/ui/LeafDecoration";
import { RoundedImage } from "@/components/ui/RoundedImage";
import { CmsImage } from "@/components/ui/CmsImage";
import { getTreatmentIcon } from "@/lib/serviceIcons";
import { slugify } from "@/lib/slugify";
import type { BlogPostSummary, ServiceDetail } from "@/sanity/lib/content";

export function ServiceDetailView({
  service,
  relatedArticles = [],
}: {
  service: ServiceDetail;
  relatedArticles?: BlogPostSummary[];
}) {
  const { t, links, locale } = useLanguage();
  const allServicesLabel = locale === "fr" ? "Tous les services" : "All services";

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [service.slug]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-8 md:pb-24 md:pt-12">
        <Container>
          <Link
            href="/services"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-soft hover:text-green"
          >
            <IconArrowLeft className="h-4 w-4" stroke={1.6} />
            {allServicesLabel}
          </Link>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative">
              <LeafDecoration className="absolute -left-10 top-4 h-40 w-28" opacity={0.15} />
              {service.heroLabel ? (
                <span className="section-label mb-4">
                  <LeafMark />
                  {service.heroLabel}
                </span>
              ) : null}
              <h1 className="font-serif text-4xl leading-[1.15] text-green sm:text-5xl lg:text-[3.25rem]">
                {service.heroTitle}{" "}
                {service.heroTitleAccent ? (
                  <span className="accent-italic">{service.heroTitleAccent}</span>
                ) : null}
              </h1>
              <p className="prose-body mt-5 max-w-lg">{service.heroText}</p>

              {service.stats.length > 0 ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {service.stats.map((s) => (
                    <span
                      key={s.title}
                      className="rounded-full border border-gold/40 bg-beige-soft px-4 py-2 text-xs font-semibold tracking-wide text-green"
                    >
                      {s.title}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={links.bookAppointment} showCalendar>
                  {t.common.bookAppointment}
                </Button>
                <Button href="/services" variant="outline">
                  {allServicesLabel}
                </Button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <LeafDecoration className="absolute -right-8 -top-4 h-48 w-36" />
              <RoundedImage
                src={service.heroImage}
                alt={service.heroImageAlt || service.heroTitle}
                priority
                className="aspect-[4/5] w-full rounded-[2rem] shadow-sm md:rounded-[2.5rem]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Intro */}
      {service.introTitle || service.introText ? (
        <section className="pb-16 md:pb-20">
          <Container className="max-w-3xl">
            <SectionHeading title={service.introTitle ?? ""} align="center" className="mb-4" />
            {service.introText ? (
              <p className="prose-body text-center text-base">{service.introText}</p>
            ) : null}
          </Container>
        </section>
      ) : null}

      {/* Treatments */}
      {service.treatments.length > 0 ? (
        <section className="pb-20 md:pb-28">
          <Container>
            <SectionHeading
              label={t.services.domainsLabel}
              title={service.treatmentsTitle ?? t.services.domainsTitle}
              align="center"
              className="mb-12"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {service.treatments.map((item) => {
                const Icon = getTreatmentIcon(item.icon);
                return (
                  <article
                    key={item.title}
                    id={slugify(item.title)}
                    className="card-soft scroll-mt-24 flex flex-col items-start px-6 py-7"
                  >
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

      {/* Benefits */}
      {service.benefits.length > 0 ? (
        <section className="pb-20 md:pb-28">
          <Container>
            <div className="grid items-stretch overflow-hidden rounded-[1.75rem] bg-beige-soft md:grid-cols-[1fr_1.4fr]">
              <div className="flex items-center p-8 md:p-10">
                <h2 className="font-serif text-3xl leading-snug text-green md:text-[2.1rem]">
                  {service.benefitsTitle ?? t.home.expertiseTitle}
                </h2>
              </div>
              <div className="grid divide-y divide-border/80 border-t border-border/80 md:grid-cols-2 md:divide-x md:divide-y-0 md:border-l md:border-t-0">
                {service.benefits.map((item) => (
                  <div key={item.title} className="flex flex-col gap-3 p-7 md:p-6">
                    <span className="text-gold">
                      <IconHeartHandshake className="h-6 w-6" stroke={1.4} />
                    </span>
                    <h3 className="font-serif text-lg leading-snug text-green">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-text-muted">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Process */}
      {service.processSteps.length > 0 ? (
        <section className="pb-20 md:pb-28">
          <Container>
            <SectionHeading
              label={service.processLabel}
              title={service.processTitle ?? ""}
              align="center"
              className="mb-12"
            />
            <Timeline
              steps={service.processSteps.map((step, i) => ({
                ...step,
                icon: [
                  <IconMessageCircle key="1" className="h-7 w-7" stroke={1.4} />,
                  <IconClipboardList key="2" className="h-7 w-7" stroke={1.4} />,
                  <IconHeartHandshake key="3" className="h-7 w-7" stroke={1.4} />,
                ][i] ?? <IconMessageCircle key="d" className="h-7 w-7" stroke={1.4} />,
              }))}
            />
          </Container>
        </section>
      ) : null}

      {/* Gallery */}
      {service.galleryImage1 || service.galleryImage2 ? (
        <section className="pb-20 md:pb-28">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2">
              {service.galleryImage1 ? (
                <div className="relative aspect-[5/3.6] overflow-hidden rounded-[1.5rem]">
                  <CmsImage src={service.galleryImage1} alt={service.galleryImage1Alt || service.heroTitle} sizes="(max-width:768px) 100vw, 50vw" />
                </div>
              ) : null}
              {service.galleryImage2 ? (
                <div className="relative aspect-[5/3.6] overflow-hidden rounded-[1.5rem]">
                  <CmsImage src={service.galleryImage2} alt={service.galleryImage2Alt || service.heroTitle} sizes="(max-width:768px) 100vw, 50vw" />
                </div>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Related articles */}
      {relatedArticles.length > 0 ? (
        <section className="pb-20 md:pb-28">
          <Container>
            <SectionHeading
              title={locale === "fr" ? "Pour aller plus loin" : "Learn more"}
              align="center"
              className="mb-10"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((post) => (
                <Link
                  key={post.slug}
                  href={`/informations/${post.slug}`}
                  className="card-soft group flex flex-col px-6 py-6"
                >
                  <p className="text-[0.7rem] font-medium tracking-[0.14em] text-gold">
                    {post.category}
                  </p>
                  <h3 className="mt-2 font-serif text-lg text-green">{post.title}</h3>
                  <p className="prose-body mt-2 flex-1 text-sm">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-green">
                    {locale === "fr" ? "Lire l'article" : "Read the article"}
                    <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* FAQ */}
      {service.faqs.length > 0 ? (
        <section className="pb-16 md:pb-20">
          <Container className="max-w-3xl">
            <SectionHeading
              label={service.faqLabel}
              title={service.faqTitle ?? t.services.faqTitle}
              align="center"
              className="mb-8"
            />
            <FAQ items={service.faqs} />
          </Container>
        </section>
      ) : null}

      {/* CTA */}
      <section className="pb-24 md:pb-32">
        <Container>
          <CTA
            variant="banner"
            title={service.ctaTitle ?? t.home.appointmentTitle}
            text={service.ctaText}
            href={service.ctaHref || links.bookAppointment}
            showContactDetails
          />
        </Container>
      </section>
    </>
  );
}
