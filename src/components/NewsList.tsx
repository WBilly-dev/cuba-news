'use client';

import { NewsItem } from '@/lib/rss';
import { NewsCard } from './NewsCard';

interface NewsListProps {
  items: NewsItem[];
  loading?: boolean;
}

function SkeletonCard() {
  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] overflow-hidden">
      <div className="aspect-[16/10] bg-[var(--bg-accent)] animate-shimmer" />
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-5 w-20 bg-[var(--bg-accent)] rounded animate-shimmer" />
          <div className="h-4 w-16 bg-[var(--bg-accent)] rounded animate-shimmer ml-auto" />
        </div>
        <div className="h-6 bg-[var(--bg-accent)] rounded animate-shimmer" />
        <div className="h-6 w-3/4 bg-[var(--bg-accent)] rounded animate-shimmer" />
        <div className="h-4 bg-[var(--bg-accent)] rounded animate-shimmer" />
        <div className="h-4 w-2/3 bg-[var(--bg-accent)] rounded animate-shimmer" />
      </div>
    </div>
  );
}

export function NewsList({ items, loading }: NewsListProps) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-accent)] flex items-center justify-center">
          <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <p className="text-[var(--text-secondary)] text-lg font-medium">No hay noticias disponibles</p>
        <p className="text-[var(--text-muted)] text-sm mt-2 font-light">
          Intenta actualizar más tarde
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <div 
          key={item.id} 
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <NewsCard item={item} />
        </div>
      ))}
    </div>
  );
}