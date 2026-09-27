import type { Metadata } from "next";
import { getSiteContent } from "@/sanity/lib/content";
import { InformationsView } from "./InformationsView";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const { informations, meta } = content.translations.fr;
  return {
    title: informations.metaTitle || meta.siteName,
    description: informations.metaDescription || meta.description,
    alternates: { canonical: "/informations" },
  };
}

export default async function Page() {
  const content = await getSiteContent();
  const { faqs } = content.translations.fr.informations;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      {faqs.length > 0 ? (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <InformationsView />
    </>
  );
}
