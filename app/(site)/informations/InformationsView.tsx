"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  IconArrowRight,
  IconCalendar,
  IconClock,
  IconDroplet,
  IconHeart,
  IconLeaf,
  IconMail,
  IconSparkles,
  IconStethoscope,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ } from "@/components/ui/FAQ";
import { CTA } from "@/components/ui/CTA";
import { LeafDecoration, LeafMark } from "@/components/ui/LeafDecoration";
import { RoundedImage } from "@/components/ui/RoundedImage";
import { CmsImage } from "@/components/ui/CmsImage";

const categoryIcons = [IconLeaf, IconStethoscope, IconDroplet, IconSparkles, IconHeart];

function articleCategoryKey(category: string, categoryKey?: string) {
  if (categoryKey) return categoryKey;
  const value = category.toLowerCase();
  if (value.includes("diab")) return "diabetes";
  if (value.includes("esth") || value.includes("aesthet")) return "aesthetic";
  if (value.includes("bien") || value.includes("well")) return "wellness";
  return "general";
}

export function InformationsView() {
  const { t, links } = useLanguage();
  const [active, setActive] = useState(0);

  const filtered = useMemo(() => {
    if (active === 0) return t.informations.articles;
    const keys = ["all", "general", "diabetes", "aesthetic", "wellness"];
    const selected = keys[active] ?? "all";
    return t.informations.articles.filter(
      (article) => articleCategoryKey(article.category, article.categoryKey) === selected,
    );
  }, [active, t.informations.articles]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-14 pt-10 md:pb-20 md:pt-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="section-label mb-4">
                <LeafMark />
                {t.informations.heroLabel}
              </span>
              <h1 className="font-serif text-4xl leading-[1.15] text-green sm:text-5xl lg:text-[3.25rem]">
                {t.informations.heroTitle}{" "}
                <span className="accent-italic">{t.informations.heroTitleAccent}</span>
              </h1>
              <p className="prose-body mt-5 max-w-lg">{t.informations.heroText}</p>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <LeafDecoration className="absolute -right-8 top-0 h-48 w-36" />
              <RoundedImage
                src={t.informations.heroImage}
                alt=""
                priority
                className="aspect-[4/5] w-full rounded-[2rem] rounded-bl-md md:rounded-[2.5rem] md:rounded-bl-lg"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Category filters */}
      <section className="pb-10">
        <Container>
          <div className="flex flex-wrap gap-2.5">
            {t.informations.categories.map((cat, i) => {
              const isActive = active === i;
              const Icon = categoryIcons[i] ?? IconLeaf;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "border-green bg-green text-white"
                      : "border-border bg-white text-green hover:border-green/30"
                  }`}
                >
                  {i > 0 ? <Icon className="h-4 w-4" stroke={1.4} /> : null}
                  {cat}
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Featured */}
      <section className="pb-12 md:pb-16">
        <Container>
          <article className="card-soft grid overflow-hidden md:grid-cols-2">
            <div className="flex flex-col justify-center p-7 md:p-10">
              <p className="text-xs font-medium tracking-[0.14em] text-gold">
                {t.informations.featuredLabel} • {t.informations.featuredCategory}
              </p>
              <h2 className="mt-3 font-serif text-2xl text-green md:text-3xl">
                {t.informations.featuredTitle}
              </h2>
              <p className="prose-body mt-3 text-sm">{t.informations.featuredExcerpt}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-text-soft">
                <span className="inline-flex items-center gap-1.5">
                  <IconCalendar className="h-3.5 w-3.5" stroke={1.5} />
                  {t.informations.featuredDate}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <IconClock className="h-3.5 w-3.5" stroke={1.5} />
                  {t.informations.featuredReadTime}
                </span>
              </div>
              {t.informations.featuredHref ? (
                <Button href={t.informations.featuredHref} variant="outline" className="mt-6 w-fit">
                  {t.common.readArticle}
                </Button>
              ) : (
                <Button variant="outline" className="mt-6 w-fit">
                  {t.common.readArticle}
                </Button>
              )}
            </div>
            <div className="relative min-h-[240px]">
              <CmsImage
                src={t.informations.featuredImage}
                alt={t.informations.featuredTitle}
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
          </article>
        </Container>
      </section>

      {/* Articles grid */}
      <section className="pb-16 md:pb-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <article key={article.title} className="group">
                <div className="relative mb-4 aspect-[5/3.4] overflow-hidden rounded-[1.25rem]">
                  <CmsImage
                    src={article.image}
                    alt={article.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <p className="text-[0.7rem] font-medium tracking-[0.14em] text-gold">
                  {article.category}
                </p>
                {article.href ? (
                  <Link href={article.href} className="mt-2 block font-serif text-xl text-green">
                    {article.title}
                  </Link>
                ) : (
                  <h3 className="mt-2 font-serif text-xl text-green">{article.title}</h3>
                )}
                <p className="prose-body mt-2 text-sm">{article.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-text-soft">
                  <span className="inline-flex items-center gap-1.5">
                    <IconCalendar className="h-3.5 w-3.5" stroke={1.5} />
                    {article.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <IconClock className="h-3.5 w-3.5" stroke={1.5} />
                    {article.readTime}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="pb-16 md:pb-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-[1.5rem] bg-beige-soft px-6 py-8 md:flex-row md:items-center md:px-8">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-gold">
                <IconMail className="h-5 w-5" stroke={1.4} />
              </span>
              <div>
                <p className="font-serif text-xl text-green md:text-2xl">
                  {t.informations.newsletterTitle}
                </p>
                <p className="prose-body mt-1 text-sm">{t.informations.newsletterText}</p>
              </div>
            </div>
            <form
              className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder={t.common.emailPlaceholder}
                className="h-11 flex-1 rounded-xl border border-border bg-white px-4 text-sm outline-none ring-green/20 focus:ring-2"
              />
              <Button type="submit" className="!h-11 shrink-0">
                {t.common.subscribe}
              </Button>
            </form>
          </div>
        </Container>
      </section>

      {/* FAQ + CTA */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <SectionHeading
                label={t.informations.faqLabel}
                title={t.informations.faqTitle}
                className="mb-6"
              />
              <FAQ items={t.informations.faqs} />
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
              title={t.informations.ctaTitle}
              text={t.informations.ctaText}
              href={t.informations.ctaHref}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
