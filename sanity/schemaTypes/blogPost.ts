import { defineArrayMember, defineField, defineType } from "sanity";
import { imageField, linkField, localizedString, localizedText } from "./locale";

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

export const articleSection = defineType({
  name: "articleSection",
  title: "Section",
  type: "object",
  fields: [
    localizedString("heading", "Section heading (H2)"),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "textBlock" })],
    }),
  ],
  preview: {
    select: { en: "heading.en", fr: "heading.fr" },
    prepare({ en, fr }: { en?: string; fr?: string }) {
      return { title: en || fr || "Section" };
    },
  },
});

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "body", title: "Body" },
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
      description: "The post will be available at /informations/<slug>.",
      options: { source: "internalName", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "internalName",
      title: "Internal name (Studio only)",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoryKey",
      title: "Category",
      type: "string",
      group: "hero",
      options: {
        list: [
          { title: "General medicine", value: "general" },
          { title: "Diabetology", value: "diabetes" },
          { title: "Aesthetic medicine", value: "aesthetic" },
          { title: "Wellness", value: "wellness" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    localizedString("category", "Category label (displayed)"),
    localizedString("title", "Title"),
    localizedText("excerpt", "Excerpt (shown on listing cards)"),
    defineField({
      name: "publishedAt",
      title: "Publish date",
      type: "date",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    localizedString("date", "Date (displayed text)"),
    localizedString("readTime", "Reading time (displayed text)"),
    imageField("heroImage", "Hero image"),
    defineField({
      name: "featured",
      title: "Featured on the Information page",
      type: "boolean",
      group: "hero",
      initialValue: false,
    }),
    defineField({
      name: "sections",
      title: "Article body",
      description: "Each section becomes an H2 heading with its paragraphs.",
      type: "array",
      group: "body",
      of: [defineArrayMember({ type: "articleSection" })],
    }),
    defineField({
      name: "relatedServiceSlug",
      title: "Related service page slug",
      type: "string",
      group: "body",
      description: "Optional. Example: medecine-esthetique — links to /services/medecine-esthetique for a strong call to action.",
    }),
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
    if (name.startsWith("faq")) return { ...field, group: "faq" };
    if (
      name === "slug" ||
      name === "internalName" ||
      name === "categoryKey" ||
      name === "publishedAt" ||
      name === "featured" ||
      name.startsWith("hero")
    ) {
      return { ...field, group: "hero" };
    }
    return { ...field, group: "body" };
  }),
  preview: {
    select: { en: "title.en", fr: "title.fr", slug: "slug.current", media: "heroImage" },
    prepare({ en, fr, slug, media }: { en?: string; fr?: string; slug?: string; media?: unknown }) {
      return {
        title: en || fr || "Article",
        subtitle: slug ? `/informations/${slug}` : undefined,
        media: media as never,
      };
    },
  },
});
