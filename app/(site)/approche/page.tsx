import type { Metadata } from "next";
import { getSiteContent } from "@/sanity/lib/content";
import { ApproachView } from "./ApproachView";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const { approach, meta } = content.translations.fr;
  return {
    title: approach.metaTitle || meta.siteName,
    description: approach.metaDescription || meta.description,
    alternates: { canonical: "/approche" },
  };
}

export default async function Page() {
  const content = await getSiteContent();
  const { faqs } = content.translations.fr.approach;

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
      <ApproachView />
    </>
  );
}
