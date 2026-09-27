import type { Metadata } from "next";
import { getSiteContent } from "@/sanity/lib/content";
import { HomeView } from "./HomeView";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const { home, meta } = content.translations.fr;
  return {
    title: home.metaTitle || meta.siteName,
    description: home.metaDescription || meta.description,
    alternates: { canonical: "/" },
  };
}

export default async function Page() {
  const content = await getSiteContent();
  const { faqs } = content.translations.fr.home;

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
      <HomeView />
    </>
  );
}
