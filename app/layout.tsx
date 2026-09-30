import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { getSiteContent } from "@/sanity/lib/content";
import { SITE_URL, DEFAULT_SHARE_IMAGE } from "@/lib/seo";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const { siteName, tagline, description, ogImageUrl } = content.translations.fr.meta;
  const shareImage = ogImageUrl || DEFAULT_SHARE_IMAGE;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${siteName} | ${tagline}`,
      template: `%s | ${siteName}`,
    },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title: siteName,
      description,
      locale: "fr_MA",
      type: "website",
      url: SITE_URL,
      images: [{ url: shareImage }],
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const content = await getSiteContent();
  const { siteName, description, ogImageUrl } = content.translations.fr.meta;
  const links = content.links;
  const image = ogImageUrl || DEFAULT_SHARE_IMAGE;

  const address = {
    "@type": "PostalAddress",
    streetAddress: "Crystal Office 1, Immeuble B, Bureau 20 (RDC), Résidence Andalous 5",
    addressLocality: "Bouskoura",
    addressRegion: "Casablanca-Settat",
    addressCountry: "MA",
  };

  // Real coordinates of the practice, per its Google Business Profile listing.
  const geo = {
    "@type": "GeoCoordinates",
    latitude: 33.4654826,
    longitude: -7.6454193,
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "Cabinet Dr Kenza Benboubker",
    url: SITE_URL,
    logo: image,
    image,
    telephone: links.phoneHref?.replace("tel:", ""),
    address,
    geo,
  };

  const physicianJsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/#physician`,
    name: siteName,
    description,
    medicalSpecialty: [
      "https://schema.org/PrimaryCare",
      "https://schema.org/Endocrine",
      "https://schema.org/Dermatology",
    ],
    image,
    url: SITE_URL,
    identifier: {
      "@type": "PropertyValue",
      name: "Ordre National des Médecins du Maroc",
      value: "31262",
    },
    telephone: links.phoneHref?.replace("tel:", ""),
    address,
    geo,
    areaServed: ["Bouskoura", "Casablanca"],
    sameAs: [links.instagram].filter(Boolean),
    worksFor: { "@id": `${SITE_URL}/#organization` },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "13:00",
      },
    ],
  };

  return (
    <html lang="fr" className={`${dmSans.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
