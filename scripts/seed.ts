import { getCliClient } from "sanity/cli";
import { SITE, NAV_ITEMS } from "../lib/constants";
import { images } from "../lib/images";
import { en } from "../translations/en";
import { fr } from "../translations/fr";
import type { Translations } from "../translations/types";

const client = getCliClient({ apiVersion: "2026-02-01" });

const ls = (english: string, french: string) => ({
  _type: "localeString" as const,
  en: english,
  fr: french,
});

const lt = (english: string, french: string) => ({
  _type: "localeText" as const,
  en: english,
  fr: french,
});

function withKeys<T extends Record<string, unknown>>(items: T[]) {
  return items.map((item, index) => ({
    ...item,
    _key: `${String(item._type || "item")}-${index}`,
  }));
}

const uploaded = new Map<string, string>();

async function uploadImage(url: string) {
  const cached = uploaded.get(url);
  if (cached) return cached;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not download image ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename: `${uploaded.size + 1}.jpg`,
  });
  uploaded.set(url, asset._id);
  return asset._id;
}

async function imageField(url: string) {
  const ref = await uploadImage(url);
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: ref } };
}

function pair<T>(english: T[], french: T[]) {
  return english.map((item, index) => ({ en: item, fr: french[index] ?? item }));
}

const articleKeys = ["diabetes", "aesthetic", "wellness", "diabetes", "general", "wellness"];
const categoryKeys = ["all", "general", "diabetes", "aesthetic", "wellness"];
const serviceImageUrls = [
  images.serviceGeneral,
  images.serviceAesthetic,
  images.serviceDiabetes,
  images.serviceHijama,
];
const articleImageUrls = [
  images.article1,
  images.article2,
  images.article3,
  images.article4,
  images.article5,
  images.article6,
];

async function titled(items: { title: string }[], french: { title: string }[]) {
  return withKeys(
    pair(items, french).map(({ en: item, fr: other }) => ({
      _type: "titledItem",
      title: ls(item.title, other.title),
    })),
  );
}

async function described(
  items: { title: string; description: string }[],
  french: { title: string; description: string }[],
) {
  return withKeys(
    pair(items, french).map(({ en: item, fr: other }) => ({
      _type: "titledDescription",
      title: ls(item.title, other.title),
      description: lt(item.description, other.description),
    })),
  );
}

function paragraphs(english: string[], french: string[]) {
  return withKeys(
    pair(english, french).map(({ en: text, fr: other }) => ({
      _type: "textBlock",
      text: lt(text, other),
    })),
  );
}

function questions(
  english: { question: string; answer: string }[],
  french: { question: string; answer: string }[],
) {
  return withKeys(
    pair(english, french).map(({ en: item, fr: other }) => ({
      _type: "faqItem",
      question: ls(item.question, other.question),
      answer: lt(item.answer, other.answer),
    })),
  );
}

async function build(copy: { en: Translations; fr: Translations }) {
  const e = copy.en;
  const f = copy.fr;
  const [
    heroHome,
    heroAbout,
    cabinet,
    heroServices,
    priority,
    faqSide,
    ctaOffice,
    heroApproach,
    philosophy,
    engagement,
    heroInfo,
    featured,
    heroContact,
    access,
    ...cardImages
  ] = await Promise.all([
    imageField(images.doctorHome),
    imageField(images.doctorAbout),
    imageField(images.office),
    imageField(images.stethoscopeStill),
    imageField(images.doctorDesk),
    imageField(images.plant),
    imageField(images.office),
    imageField(images.doctorApproach),
    imageField(images.vase),
    imageField(images.office),
    imageField(images.vaseAlt),
    imageField(images.featured),
    imageField(images.doctorContact),
    imageField(images.clinicExterior),
    ...serviceImageUrls.map((url) => imageField(url)),
    ...articleImageUrls.map((url) => imageField(url)),
  ]);

  const domainImages = cardImages.slice(0, 4);
  const articleImages = cardImages.slice(4);

  return [
    {
      _id: "siteSettings",
      _type: "siteSettings",
      siteName: ls(e.meta.siteName, f.meta.siteName),
      tagline: ls(e.meta.tagline, f.meta.tagline),
      description: lt(e.meta.description, f.meta.description),
      bookAppointment: ls(e.common.bookAppointment, f.common.bookAppointment),
      discoverServices: ls(e.common.discoverServices, f.common.discoverServices),
      discover: ls(e.common.discover, f.common.discover),
      readArticle: ls(e.common.readArticle, f.common.readArticle),
      seeAllQuestions: ls(e.common.seeAllQuestions, f.common.seeAllQuestions),
      seeDirections: ls(e.common.seeDirections, f.common.seeDirections),
      subscribe: ls(e.common.subscribe, f.common.subscribe),
      emailPlaceholder: ls(e.common.emailPlaceholder, f.common.emailPlaceholder),
      responseWithin: ls(e.common.responseWithin, f.common.responseWithin),
      confidentiality: ls(e.common.confidentiality, f.common.confidentiality),
      whatsappChat: ls(e.common.whatsappChat, f.common.whatsappChat),
      byAppointment: ls(e.common.byAppointment, f.common.byAppointment),
      language: ls(e.common.language, f.common.language),
      navigation: withKeys(
        NAV_ITEMS.map((item) => ({
          _type: "navItem",
          key: item.key,
          label: ls(e.nav[item.key], f.nav[item.key]),
          href: item.href,
        })),
      ),
      usefulLinks: ls(e.footer.usefulLinks, f.footer.usefulLinks),
      footerContact: ls(e.footer.contact, f.footer.contact),
      hoursHeading: ls(e.footer.hours, f.footer.hours),
      copyright: ls(e.footer.copyright, f.footer.copyright),
      phone: ls(e.contactInfo.phone, f.contactInfo.phone),
      whatsapp: ls(e.contactInfo.whatsapp, f.contactInfo.whatsapp),
      email: ls(e.contactInfo.email, f.contactInfo.email),
      address: lt(e.contactInfo.address, f.contactInfo.address),
      addressShort: ls(e.contactInfo.addressShort, f.contactInfo.addressShort),
      hoursWeekday: ls(e.contactInfo.hoursWeekday, f.contactInfo.hoursWeekday),
      hoursSaturday: ls(e.contactInfo.hoursSaturday, f.contactInfo.hoursSaturday),
      mapLabel: ls(e.contactInfo.mapLabel, f.contactInfo.mapLabel),
      phoneHref: SITE.phoneHref,
      whatsappHref: SITE.whatsappHref,
      emailHref: SITE.emailHref,
      mapsUrl: SITE.mapsUrl,
      instagram: SITE.instagram,
      bookAppointmentHref: "/contact",
      discoverServicesHref: "/services",
      seeAllQuestionsHref: "/contact",
    },
    {
      _id: "homePage",
      _type: "homePage",
      heroLabel: ls(e.home.heroLabel, f.home.heroLabel),
      heroTitle: ls(e.home.heroTitle, f.home.heroTitle),
      heroTitleAccent: ls(e.home.heroTitleAccent, f.home.heroTitleAccent),
      heroText: lt(e.home.heroText, f.home.heroText),
      heroImage: heroHome,
      features: await titled(e.home.features, f.home.features),
      servicesLabel: ls(e.home.servicesLabel, f.home.servicesLabel),
      servicesTitle: ls(e.home.servicesTitle, f.home.servicesTitle),
      services: await described(e.home.services, f.home.services),
      expertiseTitle: ls(e.home.expertiseTitle, f.home.expertiseTitle),
      expertiseItems: await described(e.home.expertiseItems, f.home.expertiseItems),
      resultsLabel: ls(e.home.resultsLabel, f.home.resultsLabel),
      resultsTitle: ls(e.home.resultsTitle, f.home.resultsTitle),
      resultsTitleAccent: ls(e.home.resultsTitleAccent, f.home.resultsTitleAccent),
      instagramLabel: ls(e.home.instagramLabel, f.home.instagramLabel),
      instagramTitle: ls(e.home.instagramTitle, f.home.instagramTitle),
      instagramTitleAccent: ls(e.home.instagramTitleAccent, f.home.instagramTitleAccent),
      appointmentTitle: ls(e.home.appointmentTitle, f.home.appointmentTitle),
      appointmentCta: ls(e.home.appointmentCta, f.home.appointmentCta),
      appointmentHref: "/contact",
      faqLabel: ls(e.home.faqLabel, f.home.faqLabel),
      faqTitle: ls(e.home.faqTitle, f.home.faqTitle),
      faqs: questions(e.home.faqs, f.home.faqs),
    },
    {
      _id: "aboutPage",
      _type: "aboutPage",
      heroLabel: ls(e.about.heroLabel, f.about.heroLabel),
      heroTitle: ls(e.about.heroTitle, f.about.heroTitle),
      heroTitleAccent: ls(e.about.heroTitleAccent, f.about.heroTitleAccent),
      heroText: lt(e.about.heroText, f.about.heroText),
      heroImage: heroAbout,
      features: await titled(e.about.features, f.about.features),
      timelineLabel: ls(e.about.timelineLabel, f.about.timelineLabel),
      timelineTitle: ls(e.about.timelineTitle, f.about.timelineTitle),
      timeline: await described(e.about.timeline, f.about.timeline),
      approachLabel: ls(e.about.approachLabel, f.about.approachLabel),
      approachTitle: ls(e.about.approachTitle, f.about.approachTitle),
      approachText: paragraphs(e.about.approachText, f.about.approachText),
      approachCards: await described(e.about.approachCards, f.about.approachCards),
      commitmentsLabel: ls(e.about.commitmentsLabel, f.about.commitmentsLabel),
      commitmentsTitle: ls(e.about.commitmentsTitle, f.about.commitmentsTitle),
      commitments: await described(e.about.commitments, f.about.commitments),
      cabinetLabel: ls(e.about.cabinetLabel, f.about.cabinetLabel),
      cabinetTitle: ls(e.about.cabinetTitle, f.about.cabinetTitle),
      cabinetText: lt(e.about.cabinetText, f.about.cabinetText),
      cabinetImage: cabinet,
      cabinetHref: "/contact",
    },
    {
      _id: "servicesPage",
      _type: "servicesPage",
      heroLabel: ls(e.services.heroLabel, f.services.heroLabel),
      heroTitle: ls(e.services.heroTitle, f.services.heroTitle),
      heroTitleAccent: ls(e.services.heroTitleAccent, f.services.heroTitleAccent),
      heroText: lt(e.services.heroText, f.services.heroText),
      heroImage: heroServices,
      domainsLabel: ls(e.services.domainsLabel, f.services.domainsLabel),
      domainsTitle: ls(e.services.domainsTitle, f.services.domainsTitle),
      domains: withKeys(
        pair(e.services.domains, f.services.domains).map(({ en: item, fr: other }, index) => ({
          _type: "serviceDomain",
          title: ls(item.title, other.title),
          description: lt(item.description, other.description),
          image: domainImages[index],
          href: "/contact",
        })),
      ),
      priorityLabel: ls(e.services.priorityLabel, f.services.priorityLabel),
      priorityTitle: ls(e.services.priorityTitle, f.services.priorityTitle),
      priorityText: lt(e.services.priorityText, f.services.priorityText),
      priorityImage: priority,
      priorityFeatures: await titled(e.services.priorityFeatures, f.services.priorityFeatures),
      processLabel: ls(e.services.processLabel, f.services.processLabel),
      processTitle: ls(e.services.processTitle, f.services.processTitle),
      processSteps: await described(e.services.processSteps, f.services.processSteps),
      faqLabel: ls(e.services.faqLabel, f.services.faqLabel),
      faqTitle: ls(e.services.faqTitle, f.services.faqTitle),
      faqs: questions(e.services.faqs, f.services.faqs),
      faqImage: faqSide,
      specificQuestion: ls(e.services.specificQuestion, f.services.specificQuestion),
      specificLink: ls(e.services.specificLink, f.services.specificLink),
      specificHref: "/contact",
      ctaTitle: ls(e.services.ctaTitle, f.services.ctaTitle),
      ctaText: lt(e.services.ctaText, f.services.ctaText),
      ctaImage: ctaOffice,
      ctaHref: "/contact",
    },
    {
      _id: "approachPage",
      _type: "approachPage",
      heroLabel: ls(e.approach.heroLabel, f.approach.heroLabel),
      heroTitle: ls(e.approach.heroTitle, f.approach.heroTitle),
      heroTitleAccent: ls(e.approach.heroTitleAccent, f.approach.heroTitleAccent),
      heroText: lt(e.approach.heroText, f.approach.heroText),
      heroImage: heroApproach,
      philosophyLabel: ls(e.approach.philosophyLabel, f.approach.philosophyLabel),
      philosophyTitle: ls(e.approach.philosophyTitle, f.approach.philosophyTitle),
      philosophyImage: philosophy,
      philosophyText: paragraphs(e.approach.philosophyText, f.approach.philosophyText),
      valuesLabel: ls(e.approach.valuesLabel, f.approach.valuesLabel),
      values: await described(e.approach.values, f.approach.values),
      processLabel: ls(e.approach.processLabel, f.approach.processLabel),
      processTitle: ls(e.approach.processTitle, f.approach.processTitle),
      processSteps: await described(e.approach.processSteps, f.approach.processSteps),
      engagementLabel: ls(e.approach.engagementLabel, f.approach.engagementLabel),
      engagementTitle: ls(e.approach.engagementTitle, f.approach.engagementTitle),
      engagementImage: engagement,
      engagementText: paragraphs(e.approach.engagementText, f.approach.engagementText),
      engagementIcons: await titled(e.approach.engagementIcons, f.approach.engagementIcons),
      faqLabel: ls(e.approach.faqLabel, f.approach.faqLabel),
      faqTitle: ls(e.approach.faqTitle, f.approach.faqTitle),
      faqs: questions(e.approach.faqs, f.approach.faqs),
      ctaTitle: ls(e.approach.ctaTitle, f.approach.ctaTitle),
      ctaText: lt(e.approach.ctaText, f.approach.ctaText),
      ctaHref: "/contact",
    },
    {
      _id: "informationsPage",
      _type: "informationsPage",
      heroLabel: ls(e.informations.heroLabel, f.informations.heroLabel),
      heroTitle: ls(e.informations.heroTitle, f.informations.heroTitle),
      heroTitleAccent: ls(e.informations.heroTitleAccent, f.informations.heroTitleAccent),
      heroText: lt(e.informations.heroText, f.informations.heroText),
      heroImage: heroInfo,
      categories: withKeys(
        pair(e.informations.categories, f.informations.categories).map(
          ({ en: label, fr: other }, index) => ({
            _type: "categoryItem",
            key: categoryKeys[index],
            label: ls(label, other),
          }),
        ),
      ),
      featuredLabel: ls(e.informations.featuredLabel, f.informations.featuredLabel),
      featuredCategory: ls(e.informations.featuredCategory, f.informations.featuredCategory),
      featuredTitle: ls(e.informations.featuredTitle, f.informations.featuredTitle),
      featuredExcerpt: lt(e.informations.featuredExcerpt, f.informations.featuredExcerpt),
      featuredDate: ls(e.informations.featuredDate, f.informations.featuredDate),
      featuredReadTime: ls(e.informations.featuredReadTime, f.informations.featuredReadTime),
      featuredImage: featured,
      featuredHref: "",
      articles: withKeys(
        pair(e.informations.articles, f.informations.articles).map(
          ({ en: item, fr: other }, index) => ({
            _type: "articleItem",
            categoryKey: articleKeys[index],
            category: ls(item.category, other.category),
            title: ls(item.title, other.title),
            excerpt: lt(item.excerpt, other.excerpt),
            date: ls(item.date, other.date),
            readTime: ls(item.readTime, other.readTime),
            image: articleImages[index],
            href: "",
          }),
        ),
      ),
      newsletterTitle: ls(e.informations.newsletterTitle, f.informations.newsletterTitle),
      newsletterText: lt(e.informations.newsletterText, f.informations.newsletterText),
      faqLabel: ls(e.informations.faqLabel, f.informations.faqLabel),
      faqTitle: ls(e.informations.faqTitle, f.informations.faqTitle),
      faqs: questions(e.informations.faqs, f.informations.faqs),
      ctaTitle: ls(e.informations.ctaTitle, f.informations.ctaTitle),
      ctaText: lt(e.informations.ctaText, f.informations.ctaText),
      ctaHref: "/contact",
    },
    {
      _id: "contactPage",
      _type: "contactPage",
      heroLabel: ls(e.contact.heroLabel, f.contact.heroLabel),
      heroTitle: ls(e.contact.heroTitle, f.contact.heroTitle),
      heroTitleAccent: ls(e.contact.heroTitleAccent, f.contact.heroTitleAccent),
      heroText: lt(e.contact.heroText, f.contact.heroText),
      heroImage: heroContact,
      whatsappTitle: ls(e.contact.whatsappTitle, f.contact.whatsappTitle),
      whatsappText: lt(e.contact.whatsappText, f.contact.whatsappText),
      whatsappCta: ls(e.contact.whatsappCta, f.contact.whatsappCta),
      whatsappPrefill: lt(e.contact.whatsappPrefill, f.contact.whatsappPrefill),
      whatsappSteps: withKeys(
        pair(e.contact.whatsappSteps, f.contact.whatsappSteps).map(
          ({ en: item, fr: other }) => ({
            _type: "whatsappStep",
            title: ls(item.title, other.title),
            text: lt(item.text, other.text),
          }),
        ),
      ),
      phoneLabel: ls(e.contact.phoneLabel, f.contact.phoneLabel),
      whatsappLabel: ls(e.contact.whatsappLabel, f.contact.whatsappLabel),
      hoursLabel: ls(e.contact.hoursLabel, f.contact.hoursLabel),
      addressLabel: ls(e.contact.addressLabel, f.contact.addressLabel),
      accessTitle: ls(e.contact.accessTitle, f.contact.accessTitle),
      accessImage: access,
      accessSimpleTitle: ls(e.contact.accessSimpleTitle, f.contact.accessSimpleTitle),
      accessSimpleText: lt(e.contact.accessSimpleText, f.contact.accessSimpleText),
      parkingTitle: ls(e.contact.parkingTitle, f.contact.parkingTitle),
      parkingText: lt(e.contact.parkingText, f.contact.parkingText),
      faqLabel: ls(e.contact.faqLabel, f.contact.faqLabel),
      faqTitle: ls(e.contact.faqTitle, f.contact.faqTitle),
      faqs: questions(e.contact.faqs, f.contact.faqs),
      ctaTitle: ls(e.contact.ctaTitle, f.contact.ctaTitle),
      ctaText: lt(e.contact.ctaText, f.contact.ctaText),
      ctaHref: "/contact",
    },
  ];
}

async function seed() {
  const documents = await build({ en, fr });
  for (const document of documents) {
    await client.createOrReplace(document as {_id: string; _type: string});
    console.log(`Saved ${document._id}`);
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
