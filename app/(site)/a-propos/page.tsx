import type { Metadata } from "next";
import { getSiteContent } from "@/sanity/lib/content";
import { AboutView } from "./AboutView";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const { about, meta } = content.translations.fr;
  return {
    title: about.metaTitle || meta.siteName,
    description: about.metaDescription || meta.description,
    alternates: { canonical: "/a-propos" },
  };
}

export default function Page() {
  return <AboutView />;
}
