'use client';

import { NewsItem } from '@/lib/rss';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface NewsCardProps {
  item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
  const formattedDate = () => {
    try {
      const date = new Date(item.pubDate);
      if (isNaN(date.getTime())) return item.pubDate;
      return formatDistanceToNow(date, { addSuffix: true, locale: es });
    } catch {
      return item.pubDate;
    }
  };

  const cleanContent = item.contentSnippet
    ? item.contentSnippet.substring(0, 200) + (item.contentSnippet.length > 200 ? '...' : '')
    : '';

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {item.imageUrl && (
        <div className="aspect-video relative overflow-hidden bg-gray-100">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="object-cover w-full h-full"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
            {item.source}
          </span>
          <time className="text-xs text-gray-500">{formattedDate()}</time>
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            {item.title}
          </a>
        </h2>
        {cleanContent && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-3">{cleanContent}</p>
        )}
        {item.categories && item.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.categories.slice(0, 3).map((cat, idx) => (
              <span key={idx} className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}