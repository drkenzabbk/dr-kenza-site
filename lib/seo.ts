/**
 * Central place for SEO-related constants.
 *
 * SITE_URL should become the real custom domain once it is connected
 * (set NEXT_PUBLIC_SITE_URL in the Vercel project settings). Until then
 * it falls back to Vercel's own preview/production URL (VERCEL_URL, set
 * automatically by Vercel at build time) so canonical URLs, the sitemap,
 * robots.txt and JSON-LD never point at a domain that doesn't resolve.
 */
const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || vercelUrl || "http://localhost:3000";

/** Real photo of Dr Kenza Benboubker, used as the default social share / JSON-LD image. */
export const DEFAULT_SHARE_IMAGE =
  "https://cdn.sanity.io/images/jhkz86m4/production/ab6639c2b3301722e07dfe67481d0d61266ff3f3-1122x1402.png";
