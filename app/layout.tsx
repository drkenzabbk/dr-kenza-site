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

  const physicianJsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: siteName,
    description,
    medicalSpecialty: [
      "https://schema.org/PrimaryCare",
      "https://schema.org/Endocrine",
      "https://schema.org/Dermatology",
    ],
    image: ogImageUrl || DEFAULT_SHARE_IMAGE,
    url: SITE_URL,
    identifier: {
      "@type": "PropertyValue",
      name: "Ordre National des Médecins du Maroc",
      value: "31262",
    },
    telephone: links.phoneHref?.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Crystal Office 1, Immeuble B, Bureau 20 (RDC), Résidence Andalous 5",
      addressLocality: "Bouskoura",
      addressRegion: "Casablanca-Settat",
      addressCountry: "MA",
    },
    areaServed: ["Bouskoura", "Casablanca"],
    sameAs: [links.instagram].filter(Boolean),
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
