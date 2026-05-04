'use client';

import Link from 'next/link';
import { NewsSource } from '@/lib/rss';

interface SourceTabsProps {
  sources: NewsSource[];
  selectedSource: string;
}

export function SourceTabs({ sources, selectedSource }: SourceTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      <Link
        href="/?source=all"
        className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
          selectedSource === 'all'
            ? 'bg-[var(--accent-navy)] text-white shadow-md'
            : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-navy)] hover:text-[var(--accent-navy)]'
        }`}
      >
        Todas las fuentes
      </Link>
      {sources.map((source) => (
        <Link
          key={source.id}
          href={`/?source=${source.id}`}
          className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
            selectedSource === source.id
              ? 'bg-[var(--accent-navy)] text-white shadow-md'
              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-navy)] hover:text-[var(--accent-navy)]'
          }`}
        >
          {source.name}
        </Link>
      ))}
    </div>
  );
}