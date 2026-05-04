"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SourceTabs } from "@/components/SourceTabs";
import { NewsList } from "@/components/NewsList";
import { LastUpdate } from "@/components/LastUpdate";
import { NewsItem, SOURCES } from "@/lib/rss";

interface HomeClientProps {
  initialNews: NewsItem[];
  lastUpdated: Date;
}

export default function HomeClient({
  initialNews,
  lastUpdated,
}: HomeClientProps) {
  const searchParams = useSearchParams();
  const selectedSource = searchParams.get("source") || "all";

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
      <header className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="relative">
            <div className="absolute -left-3 top-0 bottom-0 w-1 bg-[var(--accent-coral)] rounded-full opacity-60"></div>
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-[var(--text-primary)] tracking-tight">
              Cuba <span className="text-[var(--accent-coral)]">News</span>
            </h1>
            <p className="text-[var(--text-secondary)] mt-2 text-lg font-light">
              Noticias de Cuba desde el exterior
            </p>
          </div>
          <LastUpdate date={lastUpdated} />
        </div>
      </header>

      <SourceTabs sources={SOURCES} selectedSource={selectedSource} />

      <div className="mb-8">
        <p className="text-sm text-[var(--text-muted)] font-medium">
          <span className="text-[var(--accent-navy)] font-semibold">{initialNews.length}</span> noticias encontradas
        </p>
      </div>

      <NewsList items={initialNews} loading={false} />

      <footer className="mt-16 pt-8 border-t border-[var(--border-color)]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--text-muted)]">
          <p className="font-light">Noticias obtenidas automáticamente de fuentes RSS públicas</p>
          <p className="flex items-center gap-2">
            <span>Actualiza la página</span>
            <Link href="/?reload=true" className="text-[var(--accent-coral)] hover:text-[var(--accent-coral-dark)] font-medium transition-colors">
              para ver las últimas noticias
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}