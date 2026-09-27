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
  iconedItem,
  navItem,
  serviceDomain,
  textBlock,
  titledDescription,
  titledItem,
  whatsappStep,
} from "./objects";
import { serviceDetailPage } from "./serviceDetail";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  localeString,
  localeText,
  titledItem,
  titledDescription,
  faqItem,
  textBlock,
  serviceDomain,
  iconedItem,
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
  serviceDetailPage,
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
