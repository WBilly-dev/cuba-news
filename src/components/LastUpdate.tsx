'use client';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface LastUpdateProps {
  date: Date;
}

export function LastUpdate({ date }: LastUpdateProps) {
  const formattedDate = format(date, "dd 'de' MMMM 'de' yyyy, HH:mm", {
    locale: es,
  });

  return (
    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] bg-[var(--bg-secondary)] px-4 py-2.5 rounded-lg border border-[var(--border-color)]">
      <svg className="w-4 h-4 text-[var(--accent-coral)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="font-light">Última actualización:</span>
      <span className="text-[var(--text-secondary)] font-medium">{formattedDate}</span>
    </div>
  );
}