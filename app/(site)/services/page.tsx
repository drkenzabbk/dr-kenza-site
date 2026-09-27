import type { Metadata } from "next";
import { getSiteContent } from "@/sanity/lib/content";
import { ServicesView } from "./ServicesView";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const { services, meta } = content.translations.fr;
  return {
    title: services.metaTitle || meta.siteName,
    description: services.metaDescription || meta.description,
    alternates: { canonical: "/services" },
  };
}

export default async function Page() {
  const content = await getSiteContent();
  const { faqs } = content.translations.fr.services;

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
      <ServicesView />
    </>
  );
}
