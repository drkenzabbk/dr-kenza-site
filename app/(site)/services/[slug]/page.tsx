import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceDetail, getServiceSlugs, getSiteContent } from "@/sanity/lib/content";
import { SITE_URL, DEFAULT_SHARE_IMAGE } from "@/lib/seo";
import { ServiceDetailView } from "./ServiceDetailView";

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const [service, content] = await Promise.all([
    getServiceDetail(slug, "fr"),
    getSiteContent(),
  ]);
  if (!service) return {};
  const { meta } = content.translations.fr;
  return {
    title: service.metaTitle || service.heroTitle || meta.siteName,
    description: service.metaDescription || service.heroText || meta.description,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const service = await getServiceDetail(slug, "fr");
  if (!service) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.heroTitle,
    description: service.metaDescription || service.heroText,
    url: `${SITE_URL}/services/${slug}`,
    image: service.heroImage || DEFAULT_SHARE_IMAGE,
    provider: {
      "@type": "Physician",
      name: "Dr Kenza Benboubker",
      url: SITE_URL,
    },
  };

  const faqJsonLd =
    service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <ServiceDetailView service={service} />
    </>
  );
}
