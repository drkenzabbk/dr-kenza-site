"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { LanguageProvider } from "@/context/LanguageContext";
import type { SiteContent } from "@/sanity/lib/content";
import type { ReactNode } from "react";

export function SiteShell({
  children,
  content,
}: {
  children: ReactNode;
  content: SiteContent;
}) {
  return (
    <LanguageProvider content={content}>
      <div className="bg-paper flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
}
