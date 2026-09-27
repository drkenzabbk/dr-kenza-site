import {
  aboutPage,
  approachPage,
  contactPage,
  homePage,
  informationsPage,
  servicesPage,
} from "./pages";
import { localeString, localeText } from "./locale";
import {
  articleItem,
  categoryItem,
  faqItem,
  navItem,
  serviceDomain,
  textBlock,
  titledDescription,
  titledItem,
  whatsappStep,
} from "./objects";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  localeString,
  localeText,
  titledItem,
  titledDescription,
  faqItem,
  textBlock,
  serviceDomain,
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
];

export const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "aboutPage",
  "servicesPage",
  "approachPage",
  "informationsPage",
  "contactPage",
]);
