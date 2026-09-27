import { createImageUrlBuilder } from "@sanity/image-url";
import { cache } from "react";
import { NAV_ITEMS } from "@/lib/constants";
import { translations, type Locale, type NavKey, type Translations } from "@/translations";
import { client } from "./client";
import { isSanityConfigured } from "../env";

export type SiteLinks = {
  phoneHref: string;
  whatsappHref: string;
  emailHref: string;
  mapsUrl: string;
  instagram: string;
  facebook: string;
  bookAppointment: string;
  discoverServices: string;
  seeAllQuestions: string;
  nav: Record<NavKey, string>;
};

export type SiteContent = {
  translations: Record<Locale, Translations>;
  links: SiteLinks;
};

const routeNav = Object.fromEntries(NAV_ITEMS.map((item) => [item.key, item.href])) as Record<
  NavKey,
  string
>;

const emptyLinks: SiteLinks = {
  phoneHref: "",
  whatsappHref: "",
  emailHref: "",
  mapsUrl: "",
  instagram: "",
  facebook: "",
  bookAppointment: "/contact",
  discoverServices: "/services",
  seeAllQuestions: "/contact",
  nav: routeNav,
};

const CONTENT_QUERY = `{
  "settings": *[_id == "siteSettings"][0],
  "home": *[_id == "homePage"][0],
  "about": *[_id == "aboutPage"][0],
  "services": *[_id == "servicesPage"][0],
  "approach": *[_id == "approachPage"][0],
  "informations": *[_id == "informationsPage"][0],
  "contact": *[_id == "contactPage"][0]
}`;

type CmsPayload = {
  settings?: Record<string, unknown> | null;
  home?: Record<string, unknown> | null;
  about?: Record<string, unknown> | null;
  services?: Record<string, unknown> | null;
  approach?: Record<string, unknown> | null;
  informations?: Record<string, unknown> | null;
  contact?: Record<string, unknown> | null;
};

const builder = createImageUrlBuilder(client);

function imageUrl(value: {_type?: string; asset?: {_ref?: string}}) {
  try {
    return builder.image(value).auto("format").url();
  } catch {
    return "";
  }
}

function imageAlt(value: unknown): string | undefined {
  if (!isRecord(value)) return undefined;
  const alt = value.alt;
  return typeof alt === "string" && alt.trim() ? alt.trim() : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLocale(value: unknown): value is { en?: string; fr?: string } {
  if (!isRecord(value)) return false;
  const keys = Object.keys(value).filter((key) => !key.startsWith("_"));
  return keys.length > 0 && keys.every((key) => key === "en" || key === "fr");
}

function isImage(value: unknown): value is {_type?: string; asset?: {_ref?: string}} {
  return isRecord(value) && value._type === "image" && Boolean(value.asset);
}

/** Empty shape for live site — no static marketing copy. */
function blankTranslations(): Translations {
  return clearCopy(structuredClone(translations.en)) as Translations;
}

function clearCopy(value: unknown): unknown {
  if (typeof value === "string") return "";
  if (Array.isArray(value)) return [];
  if (!isRecord(value)) return value;
  const next: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    next[key] = clearCopy(child);
  }
  return next;
}

function pickLocale(value: { en?: string; fr?: string }, locale: Locale) {
  const primary = value[locale]?.trim();
  if (primary) return primary;
  const other = value[locale === "en" ? "fr" : "en"]?.trim();
  return other || "";
}

/** Map Sanity values into the page shape. Never falls back to static site copy. */
function fromCms(source: unknown, locale: Locale): unknown {
  if (source == null) return source;
  if (isImage(source)) return imageUrl(source);
  if (isLocale(source)) return pickLocale(source, locale);
  if (typeof source === "string") return source.trim();

  if (Array.isArray(source)) {
    return source.map((item) => fromCms(item, locale));
  }

  if (!isRecord(source)) return source;

  if (isLocale(source.label)) return pickLocale(source.label, locale);
  if (isLocale(source.text)) return pickLocale(source.text, locale);

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(source)) {
    if (key.startsWith("_")) continue;
    result[key] = fromCms(value, locale);
  }
  return result;
}

const SETTINGS_TO_COMMON: Record<string, keyof Translations["common"]> = {
  bookAppointment: "bookAppointment",
  discoverServices: "discoverServices",
  discover: "discover",
  readArticle: "readArticle",
  seeAllQuestions: "seeAllQuestions",
  seeDirections: "seeDirections",
  subscribe: "subscribe",
  emailPlaceholder: "emailPlaceholder",
  responseWithin: "responseWithin",
  confidentiality: "confidentiality",
  whatsappChat: "whatsappChat",
  byAppointment: "byAppointment",
  language: "language",
};

const SETTINGS_TO_CONTACT: Record<string, keyof Translations["contactInfo"]> = {
  phone: "phone",
  whatsapp: "whatsapp",
  email: "email",
  address: "address",
  addressShort: "addressShort",
  hoursWeekday: "hoursWeekday",
  hoursSaturday: "hoursSaturday",
  mapLabel: "mapLabel",
};

function applySettings(copy: Translations, settings: Record<string, unknown>, locale: Locale) {
  const siteName = fromCms(settings.siteName, locale);
  const tagline = fromCms(settings.tagline, locale);
  const description = fromCms(settings.description, locale);
  if (typeof siteName === "string") copy.meta.siteName = siteName;
  if (typeof tagline === "string") copy.meta.tagline = tagline;
  if (typeof description === "string") copy.meta.description = description;
  if (isImage(settings.logo)) copy.meta.logoUrl = imageUrl(settings.logo);
  if (isImage(settings.ogImage)) copy.meta.ogImageUrl = imageUrl(settings.ogImage);

  for (const [sourceKey, targetKey] of Object.entries(SETTINGS_TO_COMMON)) {
    const next = fromCms(settings[sourceKey], locale);
    if (typeof next === "string") copy.common[targetKey] = next;
  }

  const usefulLinks = fromCms(settings.usefulLinks, locale);
  const footerContact = fromCms(settings.footerContact, locale);
  const hours = fromCms(settings.hoursHeading, locale);
  const copyright = fromCms(settings.copyright, locale);
  if (typeof usefulLinks === "string") copy.footer.usefulLinks = usefulLinks;
  if (typeof footerContact === "string") copy.footer.contact = footerContact;
  if (typeof hours === "string") copy.footer.hours = hours;
  if (typeof copyright === "string") copy.footer.copyright = copyright;

  for (const [sourceKey, targetKey] of Object.entries(SETTINGS_TO_CONTACT)) {
    const next = fromCms(settings[sourceKey], locale);
    if (typeof next === "string") copy.contactInfo[targetKey] = next;
  }

  if (Array.isArray(settings.navigation)) {
    for (const item of settings.navigation) {
      if (!isRecord(item) || typeof item.key !== "string") continue;
      const key = item.key as NavKey;
      if (!(key in copy.nav)) continue;
      const label = fromCms(item.label, locale);
      if (typeof label === "string") copy.nav[key] = label;
    }
  }
}

function stringField(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function linksFromSettings(settings?: Record<string, unknown> | null): SiteLinks {
  if (!settings) return emptyLinks;
  const nav = { ...routeNav };
  if (Array.isArray(settings.navigation)) {
    for (const item of settings.navigation) {
      if (!isRecord(item) || typeof item.key !== "string" || typeof item.href !== "string") continue;
      if (item.key in nav && item.href.trim()) nav[item.key as NavKey] = item.href.trim();
    }
  }
  return {
    phoneHref: stringField(settings.phoneHref),
    whatsappHref: stringField(settings.whatsappHref),
    emailHref: stringField(settings.emailHref),
    mapsUrl: stringField(settings.mapsUrl),
    instagram: stringField(settings.instagram),
    facebook: stringField(settings.facebook),
    bookAppointment: stringField(settings.bookAppointmentHref, "/contact"),
    discoverServices: stringField(settings.discoverServicesHref, "/services"),
    seeAllQuestions: stringField(settings.seeAllQuestionsHref, "/contact"),
    nav,
  };
}

function applyPage<K extends "home" | "about" | "services" | "approach" | "informations" | "contact">(
  copy: Translations,
  page: K,
  source: Record<string, unknown>,
  locale: Locale,
) {
  const mapped = fromCms(source, locale);
  if (isRecord(mapped)) {
    copy[page] = { ...copy[page], ...mapped } as Translations[K];
  }
}

function buildLocale(data: CmsPayload, locale: Locale): Translations {
  const copy = blankTranslations();
  if (data.settings) applySettings(copy, data.settings, locale);

  const pages = ["home", "about", "services", "approach", "informations", "contact"] as const;
  for (const page of pages) {
    const source = data[page];
    if (!source) continue;
    applyPage(copy, page, source, locale);
  }
  return copy;
}

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!isSanityConfigured) {
    return { translations: { en: blankTranslations(), fr: blankTranslations() }, links: emptyLinks };
  }

  try {
    const data = await client.fetch<CmsPayload>(CONTENT_QUERY, {}, { next: { revalidate: 30 } });
    if (!data?.settings && !data?.home) {
      return { translations: { en: blankTranslations(), fr: blankTranslations() }, links: emptyLinks };
    }
    return {
      translations: {
        en: buildLocale(data, "en"),
        fr: buildLocale(data, "fr"),
      },
      links: linksFromSettings(data.settings),
    };
  } catch {
    return { translations: { en: blankTranslations(), fr: blankTranslations() }, links: emptyLinks };
  }
});

// ============================================================
// Service detail pages (/services/[slug])
// ============================================================

export type ServiceDetail = {
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  heroLabel: string;
  heroTitle: string;
  heroTitleAccent?: string;
  heroText: string;
  heroImage?: string;
  heroImageAlt?: string;
  stats: { title: string }[];
  introTitle?: string;
  introText?: string;
  treatmentsTitle?: string;
  treatments: { title: string; description: string; icon?: string }[];
  benefitsTitle?: string;
  benefits: { title: string; description: string }[];
  processLabel?: string;
  processTitle?: string;
  processSteps: { title: string; description: string }[];
  galleryImage1?: string;
  galleryImage1Alt?: string;
  galleryImage2?: string;
  galleryImage2Alt?: string;
  faqLabel?: string;
  faqTitle?: string;
  faqs: { question: string; answer: string }[];
  ctaTitle?: string;
  ctaText?: string;
  ctaHref?: string;
};

const SERVICE_SLUGS_QUERY = `*[_type == "serviceDetailPage" && defined(slug.current)].slug.current`;

const SERVICE_DETAIL_QUERY = `*[_type == "serviceDetailPage" && slug.current == $slug][0]`;

export const getServiceSlugs = cache(async (): Promise<string[]> => {
  if (!isSanityConfigured) return [];
  try {
    return await client.fetch<string[]>(SERVICE_SLUGS_QUERY, {}, { next: { revalidate: 30 } });
  } catch {
    return [];
  }
});

// ============================================================
// Blog posts (/informations/[slug])
// ============================================================

export type BlogPostSummary = {
  slug: string;
  categoryKey: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  publishedAt?: string;
  readTime: string;
  image?: string;
  imageAlt?: string;
  featured: boolean;
};

export type BlogPostDetail = BlogPostSummary & {
  metaTitle?: string;
  metaDescription?: string;
  sections: { heading: string; paragraphs: string[] }[];
  relatedServiceSlug?: string;
  faqLabel?: string;
  faqTitle?: string;
  faqs: { question: string; answer: string }[];
  ctaTitle?: string;
  ctaText?: string;
  ctaHref?: string;
};

const BLOG_LIST_QUERY = `*[_type == "blogPost"] | order(publishedAt desc)`;
const BLOG_DETAIL_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]`;

function mapBlogSummary(
  mapped: Record<string, unknown>,
  raw: Record<string, unknown>,
  slug: string,
): BlogPostSummary {
  return {
    slug,
    categoryKey: typeof mapped.categoryKey === "string" ? mapped.categoryKey : "general",
    category: typeof mapped.category === "string" ? mapped.category : "",
    title: typeof mapped.title === "string" ? mapped.title : "",
    excerpt: typeof mapped.excerpt === "string" ? mapped.excerpt : "",
    date: typeof mapped.date === "string" ? mapped.date : "",
    publishedAt: typeof raw.publishedAt === "string" ? raw.publishedAt : undefined,
    readTime: typeof mapped.readTime === "string" ? mapped.readTime : "",
    image: typeof mapped.heroImage === "string" ? mapped.heroImage : undefined,
    imageAlt: imageAlt(raw.heroImage),
    featured: Boolean(mapped.featured),
  };
}

export const getBlogPosts = cache(async (locale: Locale): Promise<BlogPostSummary[]> => {
  if (!isSanityConfigured) return [];
  try {
    const data = await client.fetch<Record<string, unknown>[]>(
      BLOG_LIST_QUERY,
      {},
      { next: { revalidate: 30 } },
    );
    return data
      .map((raw) => {
        const mapped = fromCms(raw, locale);
        if (!isRecord(mapped) || typeof raw.slug !== "object" || raw.slug === null) return null;
        const slugValue = (raw.slug as { current?: string }).current;
        if (!slugValue) return null;
        return mapBlogSummary(mapped, raw, slugValue);
      })
      .filter((v): v is BlogPostSummary => v !== null);
  } catch {
    return [];
  }
});

export const getBlogPost = cache(
  async (slug: string, locale: Locale): Promise<BlogPostDetail | null> => {
    if (!isSanityConfigured) return null;
    try {
      const data = await client.fetch<Record<string, unknown> | null>(
        BLOG_DETAIL_QUERY,
        { slug },
        { next: { revalidate: 30 } },
      );
      if (!data) return null;
      const mapped = fromCms(data, locale);
      if (!isRecord(mapped)) return null;
      const summary = mapBlogSummary(mapped, data, slug);
      const sections = Array.isArray(mapped.sections)
        ? (mapped.sections as Record<string, unknown>[]).map((s) => ({
            heading: typeof s.heading === "string" ? s.heading : "",
            paragraphs: Array.isArray(s.paragraphs)
              ? (s.paragraphs as unknown[]).filter((p): p is string => typeof p === "string")
              : [],
          }))
        : [];
      return {
        ...summary,
        metaTitle: typeof mapped.metaTitle === "string" ? mapped.metaTitle : undefined,
        metaDescription: typeof mapped.metaDescription === "string" ? mapped.metaDescription : undefined,
        sections,
        relatedServiceSlug: typeof data.relatedServiceSlug === "string" ? data.relatedServiceSlug : undefined,
        faqLabel: typeof mapped.faqLabel === "string" ? mapped.faqLabel : undefined,
        faqTitle: typeof mapped.faqTitle === "string" ? mapped.faqTitle : undefined,
        faqs: Array.isArray(mapped.faqs) ? (mapped.faqs as { question: string; answer: string }[]) : [],
        ctaTitle: typeof mapped.ctaTitle === "string" ? mapped.ctaTitle : undefined,
        ctaText: typeof mapped.ctaText === "string" ? mapped.ctaText : undefined,
        ctaHref: typeof mapped.ctaHref === "string" ? mapped.ctaHref : undefined,
      };
    } catch {
      return null;
    }
  },
);

export const getServiceDetail = cache(
  async (slug: string, locale: Locale): Promise<ServiceDetail | null> => {
    if (!isSanityConfigured) return null;
    try {
      const data = await client.fetch<Record<string, unknown> | null>(
        SERVICE_DETAIL_QUERY,
        { slug },
        { next: { revalidate: 30 } },
      );
      if (!data) return null;
      const mapped = fromCms(data, locale);
      if (!isRecord(mapped)) return null;
      return {
        slug,
        metaTitle: typeof mapped.metaTitle === "string" ? mapped.metaTitle : undefined,
        metaDescription: typeof mapped.metaDescription === "string" ? mapped.metaDescription : undefined,
        heroLabel: typeof mapped.heroLabel === "string" ? mapped.heroLabel : "",
        heroTitle: typeof mapped.heroTitle === "string" ? mapped.heroTitle : "",
        heroTitleAccent: typeof mapped.heroTitleAccent === "string" ? mapped.heroTitleAccent : undefined,
        heroText: typeof mapped.heroText === "string" ? mapped.heroText : "",
        heroImage: typeof mapped.heroImage === "string" ? mapped.heroImage : undefined,
        heroImageAlt: imageAlt(data.heroImage),
        stats: Array.isArray(mapped.stats) ? (mapped.stats as { title: string }[]) : [],
        introTitle: typeof mapped.introTitle === "string" ? mapped.introTitle : undefined,
        introText: typeof mapped.introText === "string" ? mapped.introText : undefined,
        treatmentsTitle: typeof mapped.treatmentsTitle === "string" ? mapped.treatmentsTitle : undefined,
        treatments: Array.isArray(mapped.treatments)
          ? (mapped.treatments as { title: string; description: string; icon?: string }[])
          : [],
        benefitsTitle: typeof mapped.benefitsTitle === "string" ? mapped.benefitsTitle : undefined,
        benefits: Array.isArray(mapped.benefits)
          ? (mapped.benefits as { title: string; description: string }[])
          : [],
        processLabel: typeof mapped.processLabel === "string" ? mapped.processLabel : undefined,
        processTitle: typeof mapped.processTitle === "string" ? mapped.processTitle : undefined,
        processSteps: Array.isArray(mapped.processSteps)
          ? (mapped.processSteps as { title: string; description: string }[])
          : [],
        galleryImage1: typeof mapped.galleryImage1 === "string" ? mapped.galleryImage1 : undefined,
        galleryImage1Alt: imageAlt(data.galleryImage1),
        galleryImage2: typeof mapped.galleryImage2 === "string" ? mapped.galleryImage2 : undefined,
        galleryImage2Alt: imageAlt(data.galleryImage2),
        faqLabel: typeof mapped.faqLabel === "string" ? mapped.faqLabel : undefined,
        faqTitle: typeof mapped.faqTitle === "string" ? mapped.faqTitle : undefined,
        faqs: Array.isArray(mapped.faqs) ? (mapped.faqs as { question: string; answer: string }[]) : [],
        ctaTitle: typeof mapped.ctaTitle === "string" ? mapped.ctaTitle : undefined,
        ctaText: typeof mapped.ctaText === "string" ? mapped.ctaText : undefined,
        ctaHref: typeof mapped.ctaHref === "string" ? mapped.ctaHref : undefined,
      };
    } catch {
      return null;
    }
  },
);
