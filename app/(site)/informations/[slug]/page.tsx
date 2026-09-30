import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts, getSiteContent } from "@/sanity/lib/content";
import { SITE_URL, DEFAULT_SHARE_IMAGE, CABINET_PHOTOS, CABINET_PHOTOS_ALT } from "@/lib/seo";
import { BlogPostView } from "./BlogPostView";

export async function generateStaticParams() {
  const posts = await getBlogPosts("fr");
  return posts.map((post) => ({ slug: post.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const [post, content] = await Promise.all([getBlogPost(slug, "fr"), getSiteContent()]);
  if (!post) return {};
  const { meta } = content.translations.fr;
  return {
    title: post.metaTitle || post.title || meta.siteName,
    description: post.metaDescription || post.excerpt || meta.description,
    alternates: { canonical: `/informations/${slug}` },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const post = await getBlogPost(slug, "fr");
  if (!post) notFound();

  // Break up the article with a real photo of the practice, deterministically
  // rotated per post so consecutive articles don't all show the same one.
  const hash = [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const galleryIndex = hash % CABINET_PHOTOS.length;
  const galleryImage = CABINET_PHOTOS[galleryIndex];
  const galleryImageAlt = CABINET_PHOTOS_ALT[galleryIndex];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "BlogPosting"],
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    image: post.image || DEFAULT_SHARE_IMAGE,
    url: `${SITE_URL}/informations/${slug}`,
    mainEntityOfPage: `${SITE_URL}/informations/${slug}`,
    author: {
      "@type": "Physician",
      name: "Dr Kenza Benboubker",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Cabinet Dr Kenza Benboubker",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: DEFAULT_SHARE_IMAGE },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Informations", item: `${SITE_URL}/informations` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/informations/${slug}` },
    ],
  };

  const faqJsonLd =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((item) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <BlogPostView post={post} galleryImage={galleryImage} galleryImageAlt={galleryImageAlt} />
    </>
  );
}
