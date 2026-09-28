import type { Metadata } from "next";
import { getSiteContent } from "@/sanity/lib/content";
import { InternationalView } from "./InternationalView";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const { international, meta } = content.translations.fr;
  return {
    title: international.metaTitle || meta.siteName,
    description: international.metaDescription || meta.description,
    alternates: { canonical: "/patientes-etranger" },
  };
}

export default async function Page() {
  const content = await getSiteContent();
  const { faqs } = content.translations.fr.international;

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
      <InternationalView />
    </>
  );
}
