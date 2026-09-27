"use client";

import {
  IconBook,
  IconEar,
  IconHeartHandshake,
  IconSchool,
  IconShieldCheck,
  IconSparkles,
  IconStethoscope,
  IconUserHeart,
  IconEye,
  IconHeart,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeafDecoration, LeafMark } from "@/components/ui/LeafDecoration";
import { RoundedImage } from "@/components/ui/RoundedImage";
import { DoctorBadge } from "@/components/ui/DoctorBadge";

const timelineIcons = [
  IconSchool,
  IconStethoscope,
  IconBook,
  IconHeart,
  IconUserHeart,
];

const commitmentIcons = [IconSparkles, IconShieldCheck, IconEye, IconHeartHandshake];

export function AboutView() {
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
                {t.about.heroLabel}
              </span>
              <h1 className="font-serif text-4xl leading-[1.15] text-green sm:text-5xl lg:text-[3.25rem]">
                {t.about.heroTitle}{" "}
                <span className="accent-italic">{t.about.heroTitleAccent}</span>
              </h1>
              <p className="prose-body mt-5 max-w-lg">{t.about.heroText}</p>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {t.about.features.map((f, i) => {
                  const Icon = [IconEar, IconSparkles, IconShieldCheck][i] ?? IconEar;
                  return (
                    <div key={f.title} className="flex items-start gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-beige-soft text-gold">
                        <Icon className="h-4 w-4" stroke={1.4} />
                      </span>
                      <span className="text-sm font-medium leading-snug text-green">
                        {f.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <LeafDecoration className="absolute -right-8 -top-4 h-48 w-36" />
              <RoundedImage
                src={t.about.heroImage}
                alt={t.meta.siteName}
                priority
                className="aspect-[4/5] w-full rounded-[2rem] md:rounded-[2.5rem]"
                badge={<DoctorBadge />}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="pb-20 md:pb-28">
        <Container>
          <SectionHeading
            label={t.about.timelineLabel}
            title={t.about.timelineTitle}
            align="center"
            className="mb-12"
          />
          <div className="relative">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-gold/40 md:block" />
            <div
              className="absolute right-0 top-[1.85rem] hidden h-0 w-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-gold/40 md:block"
              aria-hidden
            />
            <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {t.about.timeline.map((item, i) => {
                const Icon = timelineIcons[i] ?? timelineIcons[0];
                return (
                  <li key={item.title} className="relative flex flex-col items-center text-center">
                    <span className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-green/15 bg-beige-soft text-green">
                      <Icon className="h-6 w-6" stroke={1.4} />
                    </span>
                    <h3 className="font-serif text-lg text-green">{item.title}</h3>
                    <p className="prose-body mt-2 text-sm">{item.description}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </Container>
      </section>

      {/* Approach */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeading
                label={t.about.approachLabel}
                title={t.about.approachTitle}
              />
              <div className="mt-5 space-y-4">
                {t.about.approachText.map((p) => (
                  <p key={p} className="prose-body">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {t.about.approachCards.map((card, i) => {
                const Icon = [IconEar, IconHeartHandshake][i] ?? IconEar;
                const bg = i === 0 ? "bg-[#e8efea]" : "bg-beige-soft";
                return (
                  <article key={card.title} className={`rounded-[1.5rem] p-6 ${bg}`}>
                    <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-gold">
                      <Icon className="h-5 w-5" stroke={1.4} />
                    </span>
                    <h3 className="font-serif text-xl text-green">{card.title}</h3>
                    <p className="prose-body mt-2 text-sm">{card.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Commitments */}
      <section className="pb-20 md:pb-28">
        <Container>
          <SectionHeading
            label={t.about.commitmentsLabel}
            title={t.about.commitmentsTitle}
            align="center"
            className="mb-12"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.commitments.map((c, i) => {
              const Icon = commitmentIcons[i] ?? commitmentIcons[0];
              return (
                <article key={c.title} className="card-soft p-6 text-center">
                  <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-beige-soft text-gold">
                    <Icon className="h-5 w-5" stroke={1.4} />
                  </span>
                  <h3 className="font-serif text-xl text-green">{c.title}</h3>
                  <p className="prose-body mt-2 text-sm">{c.description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Cabinet */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <RoundedImage
              src={t.about.cabinetImage}
              alt={t.about.cabinetTitle}
              className="aspect-[5/3.4] w-full rounded-[1.75rem] md:rounded-[2rem]"
            />
            <div className="relative">
              <LeafDecoration className="absolute -right-6 top-0 h-40 w-28" opacity={0.2} />
              <span className="section-label mb-4">
                <LeafMark />
                {t.about.cabinetLabel}
              </span>
              <h2 className="font-serif text-3xl text-green md:text-4xl">
                {t.about.cabinetTitle}
              </h2>
              <p className="prose-body mt-4 max-w-md">{t.about.cabinetText}</p>
              <Button href={t.about.cabinetHref || links.bookAppointment} showCalendar className="mt-7">
                {t.common.bookAppointment}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
