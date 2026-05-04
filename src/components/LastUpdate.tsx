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
    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
      Última actualización: {formattedDate}
    </div>
  );
}