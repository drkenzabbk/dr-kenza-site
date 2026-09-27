import { defineArrayMember, defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./locale";

const bilingualPreview = {
  select: { en: "title.en", fr: "title.fr" },
  prepare({ en, fr }: { en?: string; fr?: string }) {
    return { title: en || fr || "Item" };
  },
};

export const titledItem = defineType({
  name: "titledItem",
  title: "Item",
  type: "object",
  fields: [localizedString("title", "Title")],
  preview: bilingualPreview,
});

const TREATMENT_ICONS = [
  "stethoscope", "heart", "droplet", "sparkles", "vaccine", "activity",
  "waveSine", "clipboardList", "certificate", "apple", "needle", "bandage",
  "mask", "flame", "moodSmile", "bath", "sun", "shieldCheck",
  "microscope", "scissors", "massage", "yoga",
];

export const iconedItem = defineType({
  name: "iconedItem",
  title: "Treatment",
  type: "object",
  fields: [
    localizedString("title", "Title"),
    localizedText("description", "Description"),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: TREATMENT_ICONS, layout: "dropdown" },
      initialValue: "stethoscope",
    }),
  ],
  preview: bilingualPreview,
});

export const titledDescription = defineType({
  name: "titledDescription",
  title: "Item",
  type: "object",
  fields: [
    localizedString("title", "Title"),
    localizedText("description", "Description"),
  ],
  preview: bilingualPreview,
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Avis patient",
  type: "object",
  fields: [
    defineField({
      name: "author",
      title: "Nom du patient",
      type: "string",
      description: "Tel qu'affiché publiquement (ex: sur l'avis Google).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Source",
      type: "string",
      description: "Ex: Avis Google",
      initialValue: "Avis Google",
    }),
    defineField({
      name: "rating",
      title: "Note (sur 5)",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5).required(),
    }),
    localizedText("text", "Texte de l'avis"),
  ],
  preview: {
    select: { title: "author", subtitle: "text.fr" },
  },
});

export const faqItem = defineType({
  name: "faqItem",
  title: "Question",
  type: "object",
  fields: [
    localizedString("question", "Question"),
    localizedText("answer", "Answer"),
  ],
  preview: {
    select: { en: "question.en", fr: "question.fr" },
    prepare({ en, fr }: { en?: string; fr?: string }) {
      return { title: en || fr || "Question" };
    },
  },
});

export const textBlock = defineType({
  name: "textBlock",
  title: "Paragraph",
  type: "object",
  fields: [localizedText("text", "Text")],
  preview: {
    select: { en: "text.en", fr: "text.fr" },
    prepare({ en, fr }: { en?: string; fr?: string }) {
      return { title: en || fr || "Paragraph" };
    },
  },
});

export const serviceDomain = defineType({
  name: "serviceDomain",
  title: "Domain",
  type: "object",
  fields: [
    localizedString("title", "Title"),
    localizedText("description", "Description"),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "href",
      title: "Button link",
      type: "string",
      description: "Where the Discover button goes. Example: /contact",
    }),
  ],
  preview: bilingualPreview,
});

export const articleItem = defineType({
  name: "articleItem",
  title: "Article",
  type: "object",
  fields: [
    defineField({
      name: "categoryKey",
      title: "Category",
      type: "string",
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
    localizedString("category", "Category label"),
    localizedString("title", "Title"),
    localizedText("excerpt", "Excerpt"),
    localizedString("date", "Date"),
    localizedString("readTime", "Reading time"),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Optional. Leave empty if the article has no destination yet.",
    }),
  ],
  preview: bilingualPreview,
});

export const categoryItem = defineType({
  name: "categoryItem",
  title: "Category",
  type: "object",
  fields: [
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      options: {
        list: [
          { title: "All articles", value: "all" },
          { title: "General medicine", value: "general" },
          { title: "Diabetology", value: "diabetes" },
          { title: "Aesthetic medicine", value: "aesthetic" },
          { title: "Wellness", value: "wellness" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    localizedString("label", "Label"),
  ],
  preview: {
    select: { en: "label.en", fr: "label.fr", key: "key" },
    prepare({ en, fr, key }: { en?: string; fr?: string; key?: string }) {
      return { title: en || fr || "Category", subtitle: key };
    },
  },
});

export const whatsappStep = defineType({
  name: "whatsappStep",
  title: "Step",
  type: "object",
  fields: [localizedString("title", "Title"), localizedText("text", "Text")],
  preview: bilingualPreview,
});

export const navItem = defineType({
  name: "navItem",
  title: "Navigation item",
  type: "object",
  fields: [
    defineField({
      name: "key",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "About", value: "about" },
          { title: "Services", value: "services" },
          { title: "Approach", value: "approach" },
          { title: "Information", value: "informations" },
          { title: "Contact", value: "contact" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    localizedString("label", "Label"),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { en: "label.en", fr: "label.fr", href: "href" },
    prepare({ en, fr, href }: { en?: string; fr?: string; href?: string }) {
      return { title: en || fr || "Link", subtitle: href };
    },
  },
});

export const itemList = (name: string, title: string, ofType: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [defineArrayMember({ type: ofType })],
  });
