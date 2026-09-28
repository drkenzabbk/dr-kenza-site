import {
  aboutPage,
  approachPage,
  contactPage,
  homePage,
  informationsPage,
  internationalPage,
  servicesPage,
} from "./pages";
import { localeString, localeText } from "./locale";
import {
  articleItem,
  categoryItem,
  faqItem,
  iconedItem,
  instagramPost,
  navItem,
  resultImage,
  serviceDomain,
  testimonial,
  textBlock,
  titledDescription,
  titledItem,
  whatsappStep,
} from "./objects";
import { serviceDetailPage } from "./serviceDetail";
import { articleSection, blogPost } from "./blogPost";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  localeString,
  localeText,
  titledItem,
  titledDescription,
  faqItem,
  textBlock,
  serviceDomain,
  testimonial,
  iconedItem,
  instagramPost,
  resultImage,
  articleItem,
  categoryItem,
  whatsappStep,
  navItem,
  siteSettings,
  homePage,
  aboutPage,
  servicesPage,
  approachPage,
  informationsPage,
  contactPage,
  internationalPage,
  serviceDetailPage,
  articleSection,
  blogPost,
];

export const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "aboutPage",
  "servicesPage",
  "approachPage",
  "informationsPage",
  "contactPage",
  "internationalPage",
]);
