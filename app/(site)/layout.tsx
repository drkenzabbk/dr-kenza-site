import { SiteShell } from "@/components/layout/SiteShell";
import { getSiteContent } from "@/sanity/lib/content";
import type { ReactNode } from "react";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const content = await getSiteContent();
  return <SiteShell content={content}>{children}</SiteShell>;
}
