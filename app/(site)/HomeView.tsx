"use client";

import {
  IconClock,
  IconMapPin,
  IconPhone,
  IconAward,
  IconHeartHandshake,
  IconSchool,
  IconStethoscope,
  IconSparkles,
  IconDroplet,
  IconShieldCheck,
  IconEar,
  IconStarFilled,
  IconBrandGoogle,
  IconQuote,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ } from "@/components/ui/FAQ";
import { LeafDecoration, LeafMark } from "@/components/ui/LeafDecoration";
import { RoundedImage } from "@/components/ui/RoundedImage";
import { MapBlock } from "@/components/ui/MapBlock";
import { DoctorBadge } from "@/components/ui/DoctorBadge";
import { InstagramFeed } from "@/components/ui/InstagramFeed";
import { ResultsGallery } from "@/components/ui/ResultsGallery";

const serviceIcons = [
  IconStethoscope,
  IconSparkles,
  IconDroplet,
  IconHeartHandshake,
];

const expertiseIcons = [IconSchool, IconAward, IconHeartHandshake];

export function HomeView() {
  const { t, links } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative z-10 animate-fade-up">
              <span className="section-label mb-4">
                <LeafMark />
                {t.home.heroLabel}
              </span>
              <h1 className="font-serif text-4xl leading-[1.15] text-green sm:text-5xl lg:text-[3.4rem]">
                {t.home.heroTitle}{" "}
                <span className="accent-italic">{t.home.heroTitleAccent}</span>
              </h1>
              <p className="prose-body mt-5 max-w-lg">{t.home.heroText}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={links.bookAppointment} showCalendar>
                  {t.common.bookAppointment}
                </Button>
                <Button href={links.discoverServices} variant="ghost-gold">
                  {t.common.discoverServices}
                </Button>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {t.home.features.map((f, i) => {
                  const Icon = [IconEar, IconSparkles, IconShieldCheck][i] ?? IconEar;
                  return (
                    <div key={f.title} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-beige-soft text-gold">
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

            <div className="relative mx-auto w-full max-w-md animate-fade-up-delay lg:max-w-none">
              <LeafDecoration className="animate-float absolute -right-8 -top-6 h-48 w-36 md:h-56 md:w-40" />
              <RoundedImage
                src={t.home.heroImage}
                alt={t.meta.siteName}
                priority
                className="aspect-[4/5] w-full rounded-[2rem] shadow-sm md:rounded-[2.5rem]"
                badge={<DoctorBadge />}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="pb-20 md:pb-28">
        <Container>
          <SectionHeading
            label={t.home.servicesLabel}
            title={t.home.servicesTitle}
            align="center"
            className="mb-12"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.services.map((service, i) => {
              const Icon = serviceIcons[i] ?? serviceIcons[0];
              return (
                <article
                  key={service.title}
                  className="card-soft flex flex-col items-center px-6 py-8 text-center transition-shadow hover:shadow-md"
                >
                  <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-beige-soft text-gold">
                    <Icon className="h-6 w-6" stroke={1.4} />
                  </span>
                  <h3 className="font-serif text-xl text-green">{service.title}</h3>
                  <p className="prose-body mt-3 text-sm">{service.description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Expertise banner */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid items-stretch overflow-hidden rounded-[1.75rem] bg-beige-soft md:grid-cols-[1fr_1.4fr]">
            <div className="flex items-center p-8 md:p-10">
              <h2 className="font-serif text-3xl leading-snug text-green md:text-[2.1rem]">
                {t.home.expertiseTitle}
              </h2>
            </div>
            <div className="grid divide-y divide-border/80 border-t border-border/80 md:grid-cols-3 md:divide-x md:divide-y-0 md:border-l md:border-t-0">
              {t.home.expertiseItems.map((item, i) => {
                const Icon = expertiseIcons[i] ?? expertiseIcons[0];
                return (
                  <div key={item.title} className="flex flex-col gap-3 p-7 md:p-6">
                    <span className="text-gold">
                      <Icon className="h-6 w-6" stroke={1.4} />
                    </span>
                    <h3 className="font-serif text-lg leading-snug text-green">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-muted">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      {t.home.testimonials.length > 0 ? (
        <section className="pb-20 md:pb-28">
          <Container>
            <div className="mb-10 flex flex-col items-center gap-4 text-center md:mb-12">
              <SectionHeading
                label={t.home.testimonialsLabel}
                title={t.home.testimonialsTitle}
                align="center"
              />
              <a
                href="https://maps.app.goo.gl/nX8bfN4Revy7c7Ej8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-green shadow-sm transition-colors hover:border-gold/50"
              >
                <IconBrandGoogle className="h-4 w-4 text-gold" stroke={1.8} />
                <span className="flex items-center gap-1">
                  5,0
                  <span className="flex items-center gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <IconStarFilled key={i} className="h-3.5 w-3.5" />
                    ))}
                  </span>
                </span>
                <span className="text-text-muted">· Avis Google</span>
              </a>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {t.home.testimonials.map((review) => (
                <article
                  key={review.author}
                  className="card-soft relative flex flex-col p-7"
                >
                  <IconQuote
                    className="absolute right-6 top-6 h-8 w-8 text-beige-soft"
                    stroke={1.5}
                  />
                  <span className="flex items-center gap-0.5 text-gold">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <IconStarFilled key={i} className="h-4 w-4" />
                    ))}
                  </span>
                  <p className="prose-body relative z-10 mt-4 flex-1 text-sm leading-relaxed">
                    {review.quote}
                  </p>
                  <div className="mt-6 border-t border-border/70 pt-4">
                    <p className="font-serif text-base text-green">{review.author}</p>
                    {review.role ? (
                      <p className="text-xs text-text-muted">{review.role}</p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Results (before / after) */}
      <ResultsGallery items={t.home.results} />

      {/* Instagram */}
      <InstagramFeed posts={t.home.instagramPosts} />

      {/* Appointment + Map */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid overflow-hidden rounded-[1.75rem] lg:grid-cols-2">
            <div className="relative bg-green p-8 text-cream md:p-10">
              <LeafDecoration
                className="absolute -bottom-4 -right-2 h-48 w-36 text-gold"
                opacity={0.15}
              />
              <h2 className="relative z-10 font-serif text-3xl md:text-4xl">
                {t.home.appointmentTitle}
              </h2>
              <ul className="relative z-10 mt-8 space-y-4 text-sm text-cream/90">
                <li className="flex items-center gap-3">
                  <IconPhone className="h-4 w-4 text-gold" stroke={1.5} />
                  <a href={links.phoneHref}>{t.contactInfo.phone}</a>
                </li>
                <li className="flex items-start gap-3">
                  <IconClock className="mt-0.5 h-4 w-4 text-gold" stroke={1.5} />
                  <span>
                    {t.contactInfo.hoursWeekday}
                    <br />
                    {t.contactInfo.hoursSaturday}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <IconMapPin className="mt-0.5 h-4 w-4 text-gold" stroke={1.5} />
                  <span>{t.contactInfo.address}</span>
                </li>
              </ul>
              <Button href={t.home.appointmentHref || links.bookAppointment} variant="accent" showCalendar className="relative z-10 mt-8">
                {t.home.appointmentCta}
              </Button>
            </div>
            <MapBlock className="min-h-[280px] lg:min-h-full" />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="pb-24 md:pb-32">
        <Container className="max-w-3xl">
          <SectionHeading
            label={t.home.faqLabel}
            title={t.home.faqTitle}
            align="center"
            className="mb-8"
          />
          <FAQ items={t.home.faqs} />
        </Container>
      </section>
    </>
  );
}
