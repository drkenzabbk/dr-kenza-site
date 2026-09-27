/**
 * Central place for SEO-related constants.
 *
 * SITE_URL should become the real custom domain once it is connected
 * (see NEXT_PUBLIC_SITE_URL). Until then it falls back to the live
 * Netlify URL so canonical URLs, the sitemap, robots.txt and JSON-LD
 * never point at a domain that doesn't resolve.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://medican-site.netlify.app";

/** Real photo of Dr Kenza Benboubker, used as the default social share / JSON-LD image. */
export const DEFAULT_SHARE_IMAGE =
  "https://cdn.sanity.io/images/jhkz86m4/production/ab6639c2b3301722e07dfe67481d0d61266ff3f3-1122x1402.png";
