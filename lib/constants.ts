import type { NavKey } from "@/translations";

/** Route map only — labels and contact details come from Sanity. */
export const NAV_ITEMS: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/a-propos" },
  { key: "services", href: "/services" },
  { key: "approach", href: "/approche" },
  { key: "informations", href: "/informations" },
  { key: "contact", href: "/contact" },
];

/** Defaults used only when seeding Sanity. Live site reads these from CMS. */
export const SITE = {
  phoneHref: "tel:+212500000000",
  whatsappHref: "https://wa.me/212600000000",
  emailHref: "mailto:contact@drkenzabenboubker.ma",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Bouskoura+Morocco",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
};
