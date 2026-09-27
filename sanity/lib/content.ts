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
