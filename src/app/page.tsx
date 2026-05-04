import { fetchSourceNews, SOURCES } from '@/lib/rss';
import HomeClient from '@/components/HomeClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ source?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedSource = params.source || 'all';

  let newsItems;

  if (selectedSource === 'all') {
    const allNews = await Promise.all(
      SOURCES.map(async (source) => {
        const items = await fetchSourceNews(source.id);
        return items.map(item => ({ ...item, sourceId: source.id, source: source.name }));
      })
    );
    newsItems = allNews.flat();
    newsItems.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    });
  } else {
    newsItems = await fetchSourceNews(selectedSource);
  }

  return <HomeClient initialNews={newsItems} lastUpdated={new Date()} />;
}