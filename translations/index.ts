import { en } from "./en";
import { fr } from "./fr";
import type { Locale, Translations } from "./types";

/**
 * Seed / schema shape only. The live site loads all copy from Sanity
 * via `getSiteContent()` — these files are not rendered on the website.
 */
export const translations: Record<Locale, Translations> = {
  en,
  fr,
};

export const defaultLocale: Locale = "fr";

export type { Locale, Translations, NavKey } from "./types";
