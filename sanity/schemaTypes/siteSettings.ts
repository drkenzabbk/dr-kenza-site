import { defineArrayMember, defineField, defineType } from "sanity";
import { linkField, localizedString, localizedText } from "./locale";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "identity", title: "Name & SEO", default: true },
    { name: "buttons", title: "Shared buttons" },
    { name: "nav", title: "Navigation" },
    { name: "footer", title: "Footer" },
    { name: "contact", title: "Contact details" },
    { name: "links", title: "Links" },
  ],
  fields: [
    localizedString("siteName", "Site name"),
    localizedString("tagline", "Tagline"),
    localizedText("description", "SEO description"),
    localizedString("bookAppointment", "Book appointment"),
    localizedString("discoverServices", "Discover services"),
    localizedString("discover", "Discover"),
    localizedString("readArticle", "Read the article"),
    localizedString("seeAllQuestions", "See all questions"),
    localizedString("seeDirections", "Get directions"),
    localizedString("subscribe", "Subscribe"),
    localizedString("emailPlaceholder", "Email placeholder"),
    localizedString("responseWithin", "Response note"),
    localizedString("confidentiality", "Confidentiality note"),
    localizedString("whatsappChat", "WhatsApp chat label"),
    localizedString("byAppointment", "By appointment"),
    localizedString("language", "Language label"),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "array",
      group: "nav",
      description: "The six existing pages. Edit labels and links. Do not add new pages.",
      validation: (Rule) => Rule.max(6),
      of: [defineArrayMember({ type: "navItem" })],
    }),
    localizedString("usefulLinks", "Useful links heading"),
    localizedString("footerContact", "Contact heading"),
    localizedString("hoursHeading", "Hours heading"),
    localizedString("copyright", "Copyright"),
    localizedString("phone", "Phone (displayed)"),
    localizedString("whatsapp", "WhatsApp (displayed)"),
    localizedString("email", "Email (displayed)"),
    localizedText("address", "Address"),
    localizedString("addressShort", "Short address"),
    localizedString("hoursWeekday", "Weekday hours"),
    localizedString("hoursSaturday", "Saturday hours"),
    localizedString("mapLabel", "Map label"),
    linkField("phoneHref", "Phone link", "Example: tel:+212500000000"),
    linkField("whatsappHref", "WhatsApp link", "Example: https://wa.me/212600000000"),
    linkField("emailHref", "Email link", "Example: mailto:contact@example.com"),
    linkField("mapsUrl", "Google Maps link"),
    linkField("instagram", "Instagram link"),
    linkField("bookAppointmentHref", "Book appointment link", "Used by appointment buttons. Example: /contact"),
    linkField("discoverServicesHref", "Discover services link", "Example: /services"),
    linkField("seeAllQuestionsHref", "See all questions link", "Example: /contact"),
  ].map((field) => {
    const name = field.name;
    if (["siteName", "tagline", "description"].includes(name ?? "")) {
      return { ...field, group: "identity" };
    }
    if (
      [
        "bookAppointment",
        "discoverServices",
        "discover",
        "readArticle",
        "seeAllQuestions",
        "seeDirections",
        "subscribe",
        "emailPlaceholder",
        "responseWithin",
        "confidentiality",
        "whatsappChat",
        "byAppointment",
        "language",
      ].includes(name ?? "")
    ) {
      return { ...field, group: "buttons" };
    }
    if (["usefulLinks", "footerContact", "hoursHeading", "copyright"].includes(name ?? "")) {
      return { ...field, group: "footer" };
    }
    if (
      [
        "phone",
        "whatsapp",
        "email",
        "address",
        "addressShort",
        "hoursWeekday",
        "hoursSaturday",
        "mapLabel",
      ].includes(name ?? "")
    ) {
      return { ...field, group: "contact" };
    }
    if (
      [
        "phoneHref",
        "whatsappHref",
        "emailHref",
        "mapsUrl",
        "instagram",
        "bookAppointmentHref",
        "discoverServicesHref",
        "seeAllQuestionsHref",
      ].includes(name ?? "")
    ) {
      return { ...field, group: "links" };
    }
    return field;
  }),
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
