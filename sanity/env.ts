export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "jhkz86m4";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2026-02-01";

export const isSanityConfigured = projectId.length > 0;

export const netlifySite = {
  title: process.env.NEXT_PUBLIC_NETLIFY_SITE_TITLE || "Medican",
  name: process.env.NEXT_PUBLIC_NETLIFY_SITE_NAME || "medican-site",
  apiId: process.env.NEXT_PUBLIC_NETLIFY_SITE_API_ID || "8f87e2a2-bfed-4b8e-bea0-3edd67eeb8b2",
  buildHookId: process.env.NEXT_PUBLIC_NETLIFY_BUILD_HOOK_ID || "6ab8f664b245cd7a2f6dc473",
  url: process.env.NEXT_PUBLIC_NETLIFY_SITE_URL || "",
};

export const isNetlifyDeployConfigured =
  Boolean(netlifySite.apiId) && Boolean(netlifySite.buildHookId) && Boolean(netlifySite.name);
