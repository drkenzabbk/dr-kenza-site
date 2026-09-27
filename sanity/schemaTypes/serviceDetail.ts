import { defineArrayMember, defineField, defineType } from "sanity";
import { imageField, linkField, localizedString, localizedText } from "./locale";

/** SEO fields, matching the pattern used on the main pages. */
const seoFields = () => [
  defineField({
    name: "metaTitle",
    title: "SEO title",
    type: "localeString",
    group: "seo",
    description: "Shown in the browser tab and Google results. Around 50-60 characters.",
  }),
  defineField({
    name: "metaDescription",
    title: "SEO description",
    type: "localeText",
    group: "seo",
    description: "Shown under the title in Google results. Around 150-160 characters.",
  }),
];

export const serviceDetailPage = defineType({
  name: "serviceDetailPage",
  title: "Service detail page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "content", title: "Content" },
    { name: "faq", title: "FAQ" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    ...seoFields(),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "hero",
      description: "The page will be available at /services/<slug>. Do not change after publishing without updating redirects.",
      options: { source: "internalName", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "internalName",
      title: "Internal name (Studio only)",
      type: "string",
      group: "hero",
      description: "For your reference in the list of pages, not shown on the site.",
      validation: (Rule) => Rule.required(),
    }),
    localizedString("heroLabel", "Label"),
    localizedString("heroTitle", "Title"),
    localizedString("heroTitleAccent", "Accent title"),
    localizedText("heroText", "Text"),
    imageField("heroImage", "Hero photo"),
    defineField({
      name: "stats",
      title: "Quick stats",
      description: "Short highlight badges shown under the hero (e.g. \"15+ ans\", \"CNSS/CNOPS\").",
      type: "array",
      group: "hero",
      of: [defineArrayMember({ type: "titledItem" })],
      validation: (Rule) => Rule.max(4),
    }),
    localizedString("introTitle", "Intro title", ),
    localizedText("introText", "Intro text"),
    defineField({
      name: "treatmentsTitle",
      title: "Treatments section title",
      type: "localeString",
      group: "content",
    }),
    defineField({
      name: "treatments",
      title: "Treatments / acts",
      description: "The specific acts or treatments included in this service.",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "iconedItem" })],
    }),
    defineField({
      name: "benefitsTitle",
      title: "Benefits section title",
      type: "localeString",
      group: "content",
    }),
    defineField({
      name: "benefits",
      title: "Why choose this service",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "titledDescription" })],
    }),
    localizedString("processLabel", "Process label"),
    localizedString("processTitle", "Process title"),
    defineField({
      name: "processSteps",
      title: "Process steps",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "titledDescription" })],
    }),
    imageField("galleryImage1", "Gallery photo 1"),
    imageField("galleryImage2", "Gallery photo 2"),
    localizedString("faqLabel", "FAQ label"),
    localizedString("faqTitle", "FAQ title"),
    defineField({
      name: "faqs",
      title: "Questions",
      type: "array",
      group: "faq",
      of: [defineArrayMember({ type: "faqItem" })],
    }),
    localizedString("ctaTitle", "CTA title"),
    localizedText("ctaText", "CTA text"),
    linkField("ctaHref", "CTA link"),
  ].map((field) => {
    const name = "name" in field ? field.name : "";
    if (name.startsWith("meta")) return { ...field, group: "seo" };
    if (
      name.startsWith("hero") ||
      name === "slug" ||
      name === "internalName" ||
      name === "stats"
    ) {
      return { ...field, group: "hero" };
    }
    if (name.startsWith("faq")) return { ...field, group: "faq" };
    return { ...field, group: "content" };
  }),
  preview: {
    select: { en: "heroTitle.en", fr: "heroTitle.fr", slug: "slug.current" },
    prepare({ en, fr, slug }: { en?: string; fr?: string; slug?: string }) {
      return { title: en || fr || "Service", subtitle: slug ? `/services/${slug}` : undefined };
    },
  },
});
