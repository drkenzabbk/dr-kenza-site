"use client";

import Link from "next/link";
import {
  IconArrowRight,
  IconClipboardList,
  IconDroplet,
  IconEar,
  IconHeartHandshake,
  IconMessageCircle,
  IconSparkles,
  IconStethoscope,
  IconUserHeart,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ } from "@/components/ui/FAQ";
import { Timeline } from "@/components/ui/Timeline";
import { CTA } from "@/components/ui/CTA";
import { LeafDecoration, LeafMark } from "@/components/ui/LeafDecoration";
import { RoundedImage } from "@/components/ui/RoundedImage";
import { CmsImage } from "@/components/ui/CmsImage";

const domainIcons = [IconStethoscope, IconSparkles, IconDroplet, IconHeartHandshake];

export default function ServicesPage() {
  const { t, links } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative">
              <LeafDecoration className="absolute -left-10 top-8 h-40 w-28" opacity={0.15} />
              <span className="section-label mb-4">
                <LeafMark />
                {t.services.heroLabel}
              </span>
              <h1 className="font-serif text-4xl leading-[1.15] text-green sm:text-5xl lg:text-[3.25rem]">
                {t.services.heroTitle}{" "}
                <span className="accent-italic">{t.services.heroTitleAccent}</span>
              </h1>
              <p className="prose-body mt-5 max-w-lg">{t.services.heroText}</p>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <LeafDecoration className="absolute -right-8 top-0 h-48 w-36" />
              <RoundedImage
                src={t.services.heroImage}
                alt={t.services.heroTitle}
                priority
                className="aspect-[4/5] w-full rounded-[2rem] md:rounded-[2.5rem]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Domains grid */}
      <section className="pb-20 md:pb-28">
        <Container>
          <SectionHeading
            label={t.services.domainsLabel}
            title={t.services.domainsTitle}
            align="center"
            className="mb-12"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.domains.map((domain, i) => {
              const Icon = domainIcons[i] ?? domainIcons[0];
              return (
                <article key={domain.title} className="card-soft overflow-hidden">
                  <div className="relative aspect-[5/3.4]">
                    <CmsImage
                      src={domain.image}
                      alt={domain.title}
                      sizes="(max-width:768px) 100vw, 25vw"
                    />
                  </div>
                  <div className="relative px-5 pb-6 pt-8 text-center">
                    <span className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-beige-soft text-gold shadow-sm">
                      <Icon className="h-5 w-5" stroke={1.4} />
                    </span>
                    <h3 className="font-serif text-xl text-green">{domain.title}</h3>
                    <p className="prose-body mt-2 text-sm">{domain.description}</p>
                    <Button
                      href={domain.href || links.bookAppointment}
                      variant="outline"
                      className="mt-5 !rounded-full !px-5 !py-2 text-xs"
                    >
                      {t.common.discover}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Priority / Approach */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeading
                label={t.services.priorityLabel}
                title={t.services.priorityTitle}
                description={t.services.priorityText}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {t.services.priorityFeatures.map((f, i) => {
                  const Icon = [IconEar, IconUserHeart, IconHeartHandshake][i] ?? IconEar;
                  return (
                    <div key={f.title} className="flex flex-col items-start gap-2">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-beige-soft text-gold">
                        <Icon className="h-5 w-5" stroke={1.4} />
                      </span>
                      <span className="text-sm font-medium text-green">{f.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <RoundedImage
              src={t.services.priorityImage}
              alt={t.services.priorityTitle}
              className="aspect-[5/3.6] w-full rounded-[1.75rem] md:rounded-[2rem]"
            />
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="pb-20 md:pb-28">
        <Container>
          <SectionHeading
            label={t.services.processLabel}
            title={t.services.processTitle}
            align="center"
            className="mb-12"
          />
          <Timeline
            steps={t.services.processSteps.map((step, i) => ({
              ...step,
              icon: [
                <IconMessageCircle key="1" className="h-7 w-7" stroke={1.4} />,
                <IconClipboardList key="2" className="h-7 w-7" stroke={1.4} />,
                <IconHeartHandshake key="3" className="h-7 w-7" stroke={1.4} />,
              ][i],
            }))}
          />
        </Container>
      </section>

      {/* FAQ + side CTA */}
      <section className="pb-16 md:pb-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
            <div>
              <SectionHeading
                label={t.services.faqLabel}
                title={t.services.faqTitle}
                className="mb-6"
              />
              <FAQ items={t.services.faqs} />
              <Link
                href={links.seeAllQuestions}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green underline-offset-4 hover:underline"
              >
                {t.common.seeAllQuestions}
                <IconArrowRight className="h-4 w-4" stroke={1.5} />
              </Link>
            </div>
            <div className="overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-sm">
              <div className="relative aspect-[5/3.2]">
                <CmsImage src={t.services.faqImage} alt="" sizes="400px" />
              </div>
              <div className="bg-beige-soft p-6">
                <p className="font-serif text-xl text-green">
                  {t.services.specificQuestion}
                </p>
                <Link
                  href={t.services.specificHref || links.seeAllQuestions}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-dark"
                >
                  {t.services.specificLink}
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24 md:pb-32">
        <Container>
          <CTA
            variant="banner"
            title={t.services.ctaTitle}
            text={t.services.ctaText}
            href={t.services.ctaHref}
            showContactDetails={false}
            sideImage={
              <div className="relative aspect-[4/3] w-full">
                <CmsImage src={t.services.ctaImage} alt="" sizes="220px" />
              </div>
            }
          />
        </Container>
      </section>
    </>
  );
}
