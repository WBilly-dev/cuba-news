import Parser from 'rss-parser';

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  creator: string;
  source: string;
  sourceId: string;
  imageUrl?: string;
  categories: string[];
}

export interface NewsSource {
  id: string;
  name: string;
  feedUrl: string;
  language: 'es' | 'en';
}

export const SOURCES: NewsSource[] = [
  {
    id: 'granma',
    name: 'Granma',
    feedUrl: 'https://en.granma.cu/feed',
    language: 'es',
  },
  {
    id: 'portal-cuba',
    name: 'Portal Cuba',
    feedUrl: 'https://www.portal-cuba.com/feed',
    language: 'es',
  },
  {
    id: 'havana-times',
    name: 'Havana Times',
    feedUrl: 'https://havanatimes.org/feed',
    language: 'en',
  },
  {
    id: '14ymedio',
    name: '14ymedio',
    feedUrl: 'https://14ymedio.com/rss',
    language: 'es',
  },
  {
    id: 'trabajadores',
    name: 'Trabajadores',
    feedUrl: 'https://trabajadores.cu/feed',
    language: 'es',
  },
  {
    id: 'juventud-rebelde',
    name: 'Juventud Rebelde',
    feedUrl: 'https://juventudrebelde.cu/get/rss/general',
    language: 'es',
  },
];

const parser: Parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
      ['enclosure', 'enclosure'],
    ],
  },
});

function extractImageUrl(item: Record<string, unknown>): string | undefined {
  try {
    const mc = item.mediaContent as Record<string, unknown> | undefined;
    if (mc && typeof mc === 'object' && 'url' in mc) {
      return String((mc as Record<string, unknown>).url);
    }
    const mt = item.mediaThumbnail as Record<string, unknown> | undefined;
    if (mt && typeof mt === 'object' && 'url' in mt) {
      return String((mt as Record<string, unknown>).url);
    }
    const enc = item.enclosure as Record<string, unknown> | undefined;
    if (enc && typeof enc === 'object' && 'type' in enc) {
      const encType = String((enc as Record<string, unknown>).type || '');
      if (encType.startsWith('image/')) {
        return String((enc as Record<string, unknown>).url || '');
      }
    }
  } catch {
    return undefined;
  }
  return undefined;
}

export async function fetchSourceNews(sourceId: string): Promise<NewsItem[]> {
  const source = SOURCES.find(s => s.id === sourceId);
  if (!source) {
    throw new Error(`Source not found: ${sourceId}`);
  }

  try {
    const feed = await parser.parseURL(source.feedUrl);
    
    return feed.items.map((item, index) => {
      const itemObj = item as unknown as Record<string, unknown>;
      return {
        id: `${sourceId}-${index}-${Date.now()}`,
        title: item.title || 'Sin título',
        link: item.link || '',
        pubDate: item.pubDate || '',
        content: item.content || '',
        contentSnippet: item.contentSnippet || item.summary || '',
        creator: item.creator || item.author || '',
        source: source.name,
        sourceId: source.id,
        imageUrl: extractImageUrl(itemObj),
        categories: item.categories || [],
      };
    });
  } catch (error) {
    console.error(`Error fetching ${source.name}:`, error);
    return [];
  }
}

export async function fetchAllSources(): Promise<Record<string, NewsItem[]>> {
  const results: Record<string, NewsItem[]> = {};
  
  await Promise.all(
    SOURCES.map(async (source) => {
      results[source.id] = await fetchSourceNews(source.id);
    })
  );
  
  return results;
}