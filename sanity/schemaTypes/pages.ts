import { defineArrayMember, defineField, defineType } from "sanity";
import { imageField, linkField, localizedString, localizedText } from "./locale";

const faqList = defineField({
  name: "faqs",
  title: "Questions",
  type: "array",
  of: [defineArrayMember({ type: "faqItem" })],
});

export const homePage = defineType({
  name: "homePage",
  title: "Home",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "services", title: "Services" },
    { name: "expertise", title: "Expertise" },
    { name: "appointment", title: "Appointment" },
    { name: "faq", title: "FAQ" },
  ],
  fields: [
    localizedString("heroLabel", "Label"),
    localizedString("heroTitle", "Title"),
    localizedString("heroTitleAccent", "Accent title"),
    localizedText("heroText", "Text"),
    imageField("heroImage", "Portrait"),
    defineField({
      name: "features",
      title: "Highlights",
      type: "array",
      of: [defineArrayMember({ type: "titledItem" })],
      group: "hero",
    }),
    localizedString("servicesLabel", "Label"),
    localizedString("servicesTitle", "Title"),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [defineArrayMember({ type: "titledDescription" })],
      group: "services",
    }),
    localizedString("expertiseTitle", "Title"),
    defineField({
      name: "expertiseItems",
      title: "Expertise items",
      type: "array",
      of: [defineArrayMember({ type: "titledDescription" })],
      group: "expertise",
    }),
    localizedString("appointmentTitle", "Title"),
    localizedString("appointmentCta", "Button"),
    linkField("appointmentHref", "Button link"),
    localizedString("faqLabel", "Label"),
    localizedString("faqTitle", "Title"),
    { ...faqList, group: "faq" },
  ].map((field) => {
    const name = "name" in field ? field.name : "";
    if (name.startsWith("hero") || name === "features") return { ...field, group: "hero" };
    if (name.startsWith("services")) return { ...field, group: "services" };
    if (name.startsWith("expertise")) return { ...field, group: "expertise" };
    if (name.startsWith("appointment")) return { ...field, group: "appointment" };
    if (name.startsWith("faq")) return { ...field, group: "faq" };
    return field;
  }),
  preview: { prepare: () => ({ title: "Home" }) },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "timeline", title: "Timeline" },
    { name: "approach", title: "Approach" },
    { name: "commitments", title: "Commitments" },
    { name: "cabinet", title: "Practice" },
  ],
  fields: [
    localizedString("heroLabel", "Label"),
    localizedString("heroTitle", "Title"),
    localizedString("heroTitleAccent", "Accent title"),
    localizedText("heroText", "Text"),
    imageField("heroImage", "Portrait"),
    defineField({
      name: "features",
      title: "Highlights",
      type: "array",
      of: [defineArrayMember({ type: "titledItem" })],
    }),
    localizedString("timelineLabel", "Label"),
    localizedString("timelineTitle", "Title"),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "array",
      of: [defineArrayMember({ type: "titledDescription" })],
    }),
    localizedString("approachLabel", "Label"),
    localizedString("approachTitle", "Title"),
    defineField({
      name: "approachText",
      title: "Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "textBlock" })],
    }),
    defineField({
      name: "approachCards",
      title: "Cards",
      type: "array",
      of: [defineArrayMember({ type: "titledDescription" })],
    }),
    localizedString("commitmentsLabel", "Label"),
    localizedString("commitmentsTitle", "Title"),
    defineField({
      name: "commitments",
      title: "Commitments",
      type: "array",
      of: [defineArrayMember({ type: "titledDescription" })],
    }),
    localizedString("cabinetLabel", "Label"),
    localizedString("cabinetTitle", "Title"),
    localizedText("cabinetText", "Text"),
    imageField("cabinetImage", "Photo"),
    linkField("cabinetHref", "Button link"),
  ].map((field) => {
    const name = "name" in field ? field.name : "";
    const group = name.startsWith("hero") || name === "features"
      ? "hero"
      : name.startsWith("timeline")
        ? "timeline"
        : name.startsWith("approach")
          ? "approach"
          : name.startsWith("commitment")
            ? "commitments"
            : name.startsWith("cabinet")
              ? "cabinet"
              : undefined;
    return group ? { ...field, group } : field;
  }),
  preview: { prepare: () => ({ title: "About" }) },
});

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "domains", title: "Domains" },
    { name: "priority", title: "Priority" },
    { name: "process", title: "Process" },
    { name: "faq", title: "FAQ" },
    { name: "cta", title: "Call to action" },
  ],
  fields: [
    localizedString("heroLabel", "Label"),
    localizedString("heroTitle", "Title"),
    localizedString("heroTitleAccent", "Accent title"),
    localizedText("heroText", "Text"),
    imageField("heroImage", "Photo"),
    localizedString("domainsLabel", "Label"),
    localizedString("domainsTitle", "Title"),
    defineField({
      name: "domains",
      title: "Domains",
      type: "array",
      of: [defineArrayMember({ type: "serviceDomain" })],
    }),
    localizedString("priorityLabel", "Label"),
    localizedString("priorityTitle", "Title"),
    localizedText("priorityText", "Text"),
    imageField("priorityImage", "Photo"),
    defineField({
      name: "priorityFeatures",
      title: "Highlights",
      type: "array",
      of: [defineArrayMember({ type: "titledItem" })],
    }),
    localizedString("processLabel", "Label"),
    localizedString("processTitle", "Title"),
    defineField({
      name: "processSteps",
      title: "Steps",
      type: "array",
      of: [defineArrayMember({ type: "titledDescription" })],
    }),
    localizedString("faqLabel", "Label"),
    localizedString("faqTitle", "Title"),
    faqList,
    imageField("faqImage", "Side photo"),
    localizedString("specificQuestion", "Side card title"),
    localizedString("specificLink", "Side card link text"),
    linkField("specificHref", "Side card link"),
    localizedString("ctaTitle", "Title"),
    localizedText("ctaText", "Text"),
    imageField("ctaImage", "Photo"),
    linkField("ctaHref", "Button link"),
  ].map((field) => {
    const name = "name" in field ? field.name : "";
    const group = name.startsWith("hero")
      ? "hero"
      : name.startsWith("domain")
        ? "domains"
        : name.startsWith("priority")
          ? "priority"
          : name.startsWith("process")
            ? "process"
            : name.startsWith("faq") || name.startsWith("specific")
              ? "faq"
              : name.startsWith("cta")
                ? "cta"
                : undefined;
    return group ? { ...field, group } : field;
  }),
  preview: { prepare: () => ({ title: "Services" }) },
});

export const approachPage = defineType({
  name: "approachPage",
  title: "Approach",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "philosophy", title: "Philosophy" },
    { name: "values", title: "Values" },
    { name: "process", title: "Process" },
    { name: "engagement", title: "Engagement" },
    { name: "faq", title: "FAQ" },
  ],
  fields: [
    localizedString("heroLabel", "Label"),
    localizedString("heroTitle", "Title"),
    localizedString("heroTitleAccent", "Accent title"),
    localizedText("heroText", "Text"),
    imageField("heroImage", "Portrait"),
    localizedString("philosophyLabel", "Label"),
    localizedString("philosophyTitle", "Title"),
    imageField("philosophyImage", "Photo"),
    defineField({
      name: "philosophyText",
      title: "Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "textBlock" })],
    }),
    localizedString("valuesLabel", "Label"),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [defineArrayMember({ type: "titledDescription" })],
    }),
    localizedString("processLabel", "Label"),
    localizedString("processTitle", "Title"),
    defineField({
      name: "processSteps",
      title: "Steps",
      type: "array",
      of: [defineArrayMember({ type: "titledDescription" })],
    }),
    localizedString("engagementLabel", "Label"),
    localizedString("engagementTitle", "Title"),
    imageField("engagementImage", "Photo"),
    defineField({
      name: "engagementText",
      title: "Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "textBlock" })],
    }),
    defineField({
      name: "engagementIcons",
      title: "Highlights",
      type: "array",
      of: [defineArrayMember({ type: "titledItem" })],
    }),
    localizedString("faqLabel", "Label"),
    localizedString("faqTitle", "Title"),
    faqList,
    localizedString("ctaTitle", "Call to action title"),
    localizedText("ctaText", "Call to action text"),
    linkField("ctaHref", "Call to action link"),
  ].map((field) => {
    const name = "name" in field ? field.name : "";
    const group = name.startsWith("hero")
      ? "hero"
      : name.startsWith("philosophy")
        ? "philosophy"
        : name.startsWith("value")
          ? "values"
          : name.startsWith("process")
            ? "process"
            : name.startsWith("engagement")
              ? "engagement"
              : "faq";
    return { ...field, group };
  }),
  preview: { prepare: () => ({ title: "Approach" }) },
});

export const informationsPage = defineType({
  name: "informationsPage",
  title: "Information",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "articles", title: "Articles" },
    { name: "newsletter", title: "Newsletter" },
    { name: "faq", title: "FAQ" },
  ],
  fields: [
    localizedString("heroLabel", "Label"),
    localizedString("heroTitle", "Title"),
    localizedString("heroTitleAccent", "Accent title"),
    localizedText("heroText", "Text"),
    imageField("heroImage", "Photo"),
    defineField({
      name: "categories",
      title: "Categories",
      description: "The existing filters. Edit the labels. Do not add a new language.",
      type: "array",
      validation: (Rule) => Rule.max(5),
      of: [defineArrayMember({ type: "categoryItem" })],
    }),
    localizedString("featuredLabel", "Featured label"),
    localizedString("featuredCategory", "Featured category"),
    localizedString("featuredTitle", "Featured title"),
    localizedText("featuredExcerpt", "Featured excerpt"),
    localizedString("featuredDate", "Featured date"),
    localizedString("featuredReadTime", "Featured reading time"),
    imageField("featuredImage", "Featured image"),
    linkField("featuredHref", "Featured article link"),
    defineField({
      name: "articles",
      title: "Articles",
      type: "array",
      of: [defineArrayMember({ type: "articleItem" })],
    }),
    localizedString("newsletterTitle", "Title"),
    localizedText("newsletterText", "Text"),
    localizedString("faqLabel", "Label"),
    localizedString("faqTitle", "Title"),
    faqList,
    localizedString("ctaTitle", "Call to action title"),
    localizedText("ctaText", "Call to action text"),
    linkField("ctaHref", "Call to action link"),
  ].map((field) => {
    const name = "name" in field ? field.name : "";
    const group = name.startsWith("hero")
      ? "hero"
      : name.startsWith("newsletter")
        ? "newsletter"
        : name.startsWith("faq") || name.startsWith("cta")
          ? "faq"
          : "articles";
    return { ...field, group };
  }),
  preview: { prepare: () => ({ title: "Information" }) },
});

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "whatsapp", title: "WhatsApp" },
    { name: "details", title: "Details" },
    { name: "access", title: "Access" },
    { name: "faq", title: "FAQ" },
  ],
  fields: [
    localizedString("heroLabel", "Label"),
    localizedString("heroTitle", "Title"),
    localizedString("heroTitleAccent", "Accent title"),
    localizedText("heroText", "Text"),
    imageField("heroImage", "Portrait"),
    localizedString("whatsappTitle", "Title"),
    localizedText("whatsappText", "Text"),
    localizedString("whatsappCta", "Button"),
    localizedText("whatsappPrefill", "WhatsApp prefilled message"),
    defineField({
      name: "whatsappSteps",
      title: "Steps",
      type: "array",
      of: [defineArrayMember({ type: "whatsappStep" })],
    }),
    localizedString("phoneLabel", "Phone label"),
    localizedString("whatsappLabel", "WhatsApp label"),
    localizedString("hoursLabel", "Hours label"),
    localizedString("addressLabel", "Address label"),
    localizedString("accessTitle", "Title"),
    imageField("accessImage", "Photo"),
    localizedString("accessSimpleTitle", "Access title"),
    localizedText("accessSimpleText", "Access text"),
    localizedString("parkingTitle", "Parking title"),
    localizedText("parkingText", "Parking text"),
    localizedString("faqLabel", "Label"),
    localizedString("faqTitle", "Title"),
    faqList,
    localizedString("ctaTitle", "Call to action title"),
    localizedText("ctaText", "Call to action text"),
    linkField("ctaHref", "Call to action link"),
  ].map((field) => {
    const name = "name" in field ? field.name : "";
    const group = name.startsWith("hero")
      ? "hero"
      : name.startsWith("whatsapp")
        ? "whatsapp"
        : name.startsWith("faq") || name.startsWith("cta")
          ? "faq"
          : name.startsWith("access") || name.startsWith("parking")
            ? "access"
            : "details";
    return { ...field, group };
  }),
  preview: { prepare: () => ({ title: "Contact" }) },
});
