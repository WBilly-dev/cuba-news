'use client';

import Link from 'next/link';
import { NewsSource } from '@/lib/rss';

interface SourceTabsProps {
  sources: NewsSource[];
  selectedSource: string;
}

export function SourceTabs({ sources, selectedSource }: SourceTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link
        href="/?source=all"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedSource === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Todas
      </Link>
      {sources.map((source) => (
        <Link
          key={source.id}
          href={`/?source=${source.id}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedSource === source.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {source.name}
        </Link>
      ))}
    </div>
  );
}