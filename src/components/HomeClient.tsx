"use client";

import { useSearchParams } from "next/navigation";
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
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:py-8">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl text-gray-600 md:text-4xl font-bold  mb-2">Cuba News</h1>
            <p className="text-gray-600">Noticias de Cuba desde el exterior</p>
          </div>
          <LastUpdate date={lastUpdated} />
        </div>
      </header>

      <SourceTabs sources={SOURCES} selectedSource={selectedSource} />

      <div className="mb-4">
        <p className="text-sm text-gray-500">
          {initialNews.length} noticias encontradas
        </p>
      </div>

      <NewsList items={initialNews} loading={false} />

      <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>Noticias obtenidas automáticamente de fuentes RSS públicas</p>
        <p className="mt-1">
          <a href="/?reload=true" className="text-blue-600 hover:underline">
            Actualiza la página
          </a>{" "}
          para ver las últimas noticias
        </p>
      </footer>
    </main>
  );
}
