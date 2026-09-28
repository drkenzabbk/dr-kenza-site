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

/** The custom domain's apex redirects to www (Vercel domain config), so the
 * canonical/sitemap/OG URLs must use www too — otherwise they'd point at a
 * URL that immediately redirects elsewhere. Normalize regardless of what
 * NEXT_PUBLIC_SITE_URL happens to be set to in the Vercel project settings. */
function withWww(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "drkenzabenboubker.ma") {
      parsed.hostname = "www.drkenzabenboubker.ma";
    }
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return url;
  }
}

export const SITE_URL = withWww(
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || vercelProductionUrl || "http://localhost:3000",
);

/** Real photo of Dr Kenza Benboubker, used as the default social share / JSON-LD image. */
export const DEFAULT_SHARE_IMAGE =
  "https://cdn.sanity.io/images/jhkz86m4/production/ab6639c2b3301722e07dfe67481d0d61266ff3f3-1122x1402.png";

/** Real photos of the practice (portrait, facade, waiting room, consultation room),
 * used to break up long-form content (blog articles) with authentic imagery. */
export const CABINET_PHOTOS = [
  "https://cdn.sanity.io/images/jhkz86m4/production/d323913855b4f97d1744f7f4e2e0dc599c01c61c-1122x1402.png",
  "https://cdn.sanity.io/images/jhkz86m4/production/6e7a8faaeb5c6539e9ae9ce295a2f890136d4845-1086x1448.png",
  "https://cdn.sanity.io/images/jhkz86m4/production/224462a4713f7836b4a69fd64d87ab239e30cc74-1086x1448.png",
  "https://cdn.sanity.io/images/jhkz86m4/production/c71bab2beeec4f11ebde56355bf230daec048fc9-1086x1448.png",
];

/** Descriptive alt text for each CABINET_PHOTOS entry, in the same order. */
export const CABINET_PHOTOS_ALT = [
  "Dr Kenza Benboubker, médecin généraliste et esthétique à Bouskoura, dans son cabinet",
  "Façade et entrée du cabinet médical du Dr Kenza Benboubker à Bouskoura",
  "Salle d'attente confortable du cabinet du Dr Kenza Benboubker",
  "Salle de consultation équipée du cabinet médical à Bouskoura",
];
