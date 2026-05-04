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
    ? item.contentSnippet.substring(0, 180) + (item.contentSnippet.length > 180 ? '...' : '')
    : '';

  return (
    <article className="group bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] overflow-hidden hover:shadow-[var(--shadow-lifted)] transition-all duration-400 hover:-translate-y-1">
      {item.imageUrl && (
        <div className="aspect-[16/10] relative overflow-hidden bg-[var(--bg-accent)]">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-wide uppercase px-3 py-1 bg-[var(--accent-coral)]/10 text-[var(--accent-coral)] rounded-md">
            {item.source}
          </span>
          <time className="text-xs text-[var(--text-muted)] font-light">{formattedDate()}</time>
        </div>
        <h2 className="text-lg font-serif font-medium text-[var(--text-primary)] mb-3 line-clamp-2 leading-snug group-hover:text-[var(--accent-navy)] transition-colors">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.title}
          </a>
        </h2>
        {cleanContent && (
          <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3 font-light leading-relaxed">{cleanContent}</p>
        )}
        {item.categories && item.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.categories.slice(0, 3).map((cat, idx) => (
              <span key={idx} className="text-xs px-2 py-0.5 bg-[var(--bg-accent)] text-[var(--text-muted)] rounded">
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}