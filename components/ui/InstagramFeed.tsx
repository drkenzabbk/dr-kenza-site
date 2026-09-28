"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react";
import { IconBrandInstagram } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

function instagramHandle(url: string) {
  try {
    const segment = new URL(url).pathname.split("/").filter(Boolean)[0];
    return segment ? `@${segment}` : "";
  } catch {
    return "";
  }
}

export function InstagramFeed({ posts }: { posts: { url: string }[] }) {
  const { t, links, locale } = useLanguage();

  useEffect(() => {
    let cancelled = false;
    const tryProcess = () => {
      if (cancelled) return;
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      } else {
        setTimeout(tryProcess, 300);
      }
    };
    tryProcess();
    return () => {
      cancelled = true;
    };
  }, [posts]);

  if (posts.length === 0) return null;

  const handle = instagramHandle(links.instagram);
  const viewPostLabel = locale === "fr" ? "Voir la publication" : "View the post";

  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <SectionHeading
          label={t.home.instagramLabel}
          title={t.home.instagramTitle}
          accent={t.home.instagramTitleAccent}
          align="center"
          className="mb-10 md:mb-12"
        />

        <div className="overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 p-5 md:p-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-green/20 bg-beige-soft">
                {t.meta.logoUrl ? (
                  <Image
                    src={t.meta.logoUrl}
                    alt={t.meta.siteName}
                    fill
                    sizes="48px"
                    className="object-contain p-1.5"
                  />
                ) : (
                  <IconBrandInstagram className="h-5 w-5 text-green" stroke={1.5} />
                )}
              </span>
              <div className="leading-tight">
                <p className="font-serif text-base text-green">{t.meta.siteName}</p>
                {handle ? <p className="text-xs text-text-muted">{handle}</p> : null}
              </div>
            </div>
            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-green px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-deep"
            >
              <IconBrandInstagram className="h-4 w-4" stroke={1.8} />
              {t.common.subscribe}
            </a>
          </div>

          <div className="grid grid-cols-1 gap-px bg-border/80 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((post) => (
              <div key={post.url} className="flex bg-white p-2">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={post.url}
                  data-instgrm-version="14"
                  style={{ margin: 0, width: "100%" }}
                >
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    {viewPostLabel}
                  </a>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window.instgrm?.Embeds.process()}
        onReady={() => window.instgrm?.Embeds.process()}
      />
    </section>
  );
}
