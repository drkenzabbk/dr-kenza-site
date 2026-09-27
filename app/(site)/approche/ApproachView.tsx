"use client";

import Link from "next/link";
import {
  IconArrowRight,
  IconClipboardList,
  IconEar,
  IconHeart,
  IconHeartHandshake,
  IconLock,
  IconMessageCircle,
  IconShieldCheck,
  IconSparkles,
  IconSun,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ } from "@/components/ui/FAQ";
import { Timeline } from "@/components/ui/Timeline";
import { CTA } from "@/components/ui/CTA";
import { LeafDecoration, LeafMark } from "@/components/ui/LeafDecoration";
import { RoundedImage } from "@/components/ui/RoundedImage";
import { DoctorBadge } from "@/components/ui/DoctorBadge";

const valueIcons = [IconEar, IconSun, IconHeartHandshake];
const engagementIcons = [IconLock, IconShieldCheck, IconHeart, IconSparkles];

export function ApproachView() {
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
                {t.approach.heroLabel}
              </span>
              <h1 className="font-serif text-4xl leading-[1.15] text-green sm:text-5xl lg:text-[3.25rem]">
                {t.approach.heroTitle}{" "}
                <span className="accent-italic">{t.approach.heroTitleAccent}</span>
              </h1>
              <p className="prose-body mt-5 max-w-lg">{t.approach.heroText}</p>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <LeafDecoration className="absolute -right-8 -top-4 h-48 w-36" />
              <RoundedImage
                src={t.approach.heroImage}
                alt={t.approach.heroTitle}
                priority
                className="aspect-[4/5] w-full rounded-[2rem] md:rounded-[2.5rem]"
                badge={<DoctorBadge />}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid items-center gap-8 overflow-hidden rounded-[1.75rem] bg-beige-soft p-6 md:grid-cols-2 md:gap-10 md:p-10">
            <div>
              <span className="section-label mb-3">{t.approach.philosophyLabel}</span>
              <h2 className="font-serif text-3xl text-green md:text-4xl">
                {t.approach.philosophyTitle}
              </h2>
              <div className="mt-5 space-y-4">
                {t.approach.philosophyText.map((p) => (
                  <p key={p} className="prose-body">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <RoundedImage
              src={t.approach.philosophyImage}
              alt=""
              className="aspect-[4/5] w-full rounded-[1.5rem]"
            />
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="pb-20 md:pb-28">
        <Container>
          <p className="section-label mb-8 justify-center text-center">
            {t.approach.valuesLabel}
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {t.approach.values.map((v, i) => {
              const Icon = valueIcons[i] ?? valueIcons[0];
              return (
                <article key={v.title} className="card-soft px-6 py-8 text-center">
                  <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-beige-soft text-gold">
                    <Icon className="h-6 w-6" stroke={1.4} />
                  </span>
                  <h3 className="font-serif text-xl text-green">{v.title}</h3>
                  <p className="prose-body mt-3 text-sm">{v.description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="pb-20 md:pb-28">
        <Container>
          <SectionHeading
            label={t.approach.processLabel}
            title={t.approach.processTitle}
            align="center"
            className="mb-12"
          />
          <Timeline
            steps={t.approach.processSteps.map((step, i) => ({
              ...step,
              icon: [
                <IconMessageCircle key="a" className="h-7 w-7" stroke={1.4} />,
                <IconClipboardList key="b" className="h-7 w-7" stroke={1.4} />,
                <IconHeart key="c" className="h-7 w-7" stroke={1.4} />,
              ][i],
            }))}
          />
        </Container>
      </section>

      {/* Engagement */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid items-center gap-8 overflow-hidden rounded-[1.75rem] bg-beige-soft p-6 md:grid-cols-2 md:gap-10 md:p-10">
            <div>
              <span className="section-label mb-3">{t.approach.engagementLabel}</span>
              <h2 className="font-serif text-3xl text-green md:text-4xl">
                {t.approach.engagementTitle}
              </h2>
              <div className="mt-5 space-y-4">
                {t.approach.engagementText.map((p) => (
                  <p key={p} className="prose-body">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {t.approach.engagementIcons.map((item, i) => {
                  const Icon = engagementIcons[i] ?? engagementIcons[0];
                  return (
                    <div key={item.title} className="flex flex-col items-center gap-2 text-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gold">
                        <Icon className="h-5 w-5" stroke={1.4} />
                      </span>
                      <span className="text-xs font-medium text-green">{item.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <RoundedImage
              src={t.approach.engagementImage}
              alt={t.approach.engagementTitle}
              className="aspect-[5/4] w-full rounded-[1.5rem]"
            />
          </div>
        </Container>
      </section>

      {/* FAQ + CTA */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <SectionHeading
                label={t.approach.faqLabel}
                title={t.approach.faqTitle}
                className="mb-6"
              />
              <FAQ items={t.approach.faqs} />
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
              title={t.approach.ctaTitle}
              text={t.approach.ctaText}
              href={t.approach.ctaHref}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
