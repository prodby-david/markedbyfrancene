import { useCallback, useMemo, useState } from 'react';
import type { AvailabilityDayCell } from '../types/landing.types';

const monthFormatter = new Intl.DateTimeFormat('en-PH', {
  timeZone: 'Asia/Manila',
  month: 'long',
  year: 'numeric',
});

const fullDateFormatter = new Intl.DateTimeFormat('en-PH', {
  timeZone: 'Asia/Manila',
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

function formatIsoDate(year: number, monthIndex: number, day: number): string {
  const m = String(monthIndex + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export function useAvailabilityPreview() {
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedIsoDate, setSelectedIsoDate] = useState<string | null>(null);

  const monthLabel = useMemo(() => {
    return monthFormatter.format(new Date(Date.UTC(viewYear, viewMonth, 15)));
  }, [viewYear, viewMonth]);

  const todayIso = useMemo(() => {
    return formatIsoDate(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
  }, [today]);

  const cells = useMemo<AvailabilityDayCell[]>(() => {
    const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const result: AvailabilityDayCell[] = [];

    for (let i = 0; i < firstWeekday; i += 1) {
      const prevDate = new Date(viewYear, viewMonth, i - firstWeekday + 1);
      const iso = formatIsoDate(
        prevDate.getFullYear(),
        prevDate.getMonth(),
        prevDate.getDate(),
      );
      result.push({
        isoDate: iso,
        dayNumber: prevDate.getDate(),
        isCurrentMonth: false,
        isPast: true,
        isAvailable: false,
      });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const iso = formatIsoDate(viewYear, viewMonth, day);
      const weekday = new Date(viewYear, viewMonth, day).getDay();
      const isPast = iso <= todayIso;
      const isClosedPreview = weekday === 1 || day % 11 === 0;
      result.push({
        isoDate: iso,
        dayNumber: day,
        isCurrentMonth: true,
        isPast,
        isAvailable: !isPast && !isClosedPreview,
      });
    }

    return result;
  }, [viewYear, viewMonth, todayIso]);

  const selectedDateLabel = useMemo(() => {
    if (!selectedIsoDate) {
      return null;
    }
    return fullDateFormatter.format(new Date(`${selectedIsoDate}T04:00:00Z`));
  }, [selectedIsoDate]);

  const goPreviousMonth = useCallback(() => {
    setViewMonth((prev) => {
      if (prev === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }, []);

  const goNextMonth = useCallback(() => {
    setViewMonth((prev) => {
      if (prev === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  return {
    monthLabel,
    cells,
    selectedIsoDate,
    selectedDateLabel,
    setSelectedIsoDate,
    goPreviousMonth,
    goNextMonth,
  };
}
