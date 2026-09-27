/**
 * Central place for SEO-related constants.
 *
 * SITE_URL should become the real custom domain once it is connected
 * (set NEXT_PUBLIC_SITE_URL in the Vercel project settings). Until then
 * it falls back to Vercel's stable production alias
 * (VERCEL_PROJECT_PRODUCTION_URL, e.g. dr-kenza-site.vercel.app) rather
 * than VERCEL_URL, which is a unique, random URL per deployment — using
 * it here would make the sitemap/robots.txt/canonical point at a
 * one-off preview link instead of the real production domain.
 */
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || vercelProductionUrl || "http://localhost:3000";

/** Real photo of Dr Kenza Benboubker, used as the default social share / JSON-LD image. */
export const DEFAULT_SHARE_IMAGE =
  "https://cdn.sanity.io/images/jhkz86m4/production/ab6639c2b3301722e07dfe67481d0d61266ff3f3-1122x1402.png";
