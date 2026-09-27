import { defineField, defineType } from "sanity";

export const localeString = defineType({
  name: "localeString",
  title: "Text",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "string" }),
    defineField({ name: "fr", title: "Français", type: "string" }),
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Text",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "text", rows: 4 }),
    defineField({ name: "fr", title: "Français", type: "text", rows: 4 }),
  ],
});

export const localizedString = (name: string, title: string) =>
  defineField({ name, title, type: "localeString" });

export const localizedText = (name: string, title: string) =>
  defineField({ name, title, type: "localeText" });

export const imageField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Texte alternatif (SEO)",
        type: "string",
        description: "Décrit précisément le contenu de l'image (utile pour le SEO et l'accessibilité).",
      }),
    ],
  });

export const linkField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: "string",
    description: description ?? "A site path such as /contact, or a full URL.",
  });
