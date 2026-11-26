import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Reveal } from '../../../components/motion/Reveal';
import { Container } from '../../../components/ui/Container';
import { cn } from '../../../lib/cn';
import { quickTransition, subtleButtonHover, subtleButtonTap } from '../../../lib/motion';
import { bookingReminderSections } from '../data/studioContent';
import { useAvailabilityPreview } from '../hooks/useAvailabilityPreview';
import type { AvailabilityAndLoveNotesSectionProps } from '../types/landing.types';
import { TestimonialsPreviewSection } from './TestimonialsPreviewSection';

const weekdayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export function AvailabilityAndLoveNotesSection({
  reviews,
  isLoading,
}: AvailabilityAndLoveNotesSectionProps) {
  const {
    monthLabel,
    cells,
    selectedIsoDate,
    setSelectedIsoDate,
    goPreviousMonth,
    goNextMonth,
  } = useAvailabilityPreview();

  return (
    <section
      id="availability"
      className="scroll-mt-24 bg-espresso py-16 text-cream sm:py-20"
    >
      <Container>
        <Reveal className="text-center">
          <h2 className="font-display text-5xl font-normal italic leading-none tracking-[-0.02em] text-cream sm:text-6xl lg:text-7xl">
            check my availability
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 grid grid-cols-1 gap-8 rounded-[15px] bg-cream p-6 text-espresso sm:p-8 lg:grid-cols-12 lg:p-10">
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between border-b border-border-warm pb-4">
                <div className="inline-flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-rosewood" aria-hidden="true" />
                  <h3 className="font-sans text-base font-bold text-espresso">
                    {monthLabel}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <motion.button
                    type="button"
                    whileHover={subtleButtonHover}
                    whileTap={subtleButtonTap}
                    transition={quickTransition}
                    onClick={goPreviousMonth}
                    aria-label="Previous month"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border-warm bg-cream text-espresso transition-colors hover:bg-sand cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={subtleButtonHover}
                    whileTap={subtleButtonTap}
                    transition={quickTransition}
                    onClick={goNextMonth}
                    aria-label="Next month"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border-warm bg-cream text-espresso transition-colors hover:bg-sand cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </motion.button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-1.5 text-center text-xs font-semibold text-taupe">
                {weekdayHeaders.map((day) => (
                  <div key={day} className="py-1.5">
                    {day}
                  </div>
                ))}
              </div>

              <div className="mt-1 grid grid-cols-7 gap-1.5">
                {cells.map((cell) => {
                  const isSelected = cell.isoDate === selectedIsoDate;
                  const interactive = cell.isCurrentMonth && cell.isAvailable;
                  return (
                    <motion.button
                      key={cell.isoDate}
                      type="button"
                      disabled={!interactive}
                      whileHover={interactive ? { scale: 1.04 } : undefined}
                      whileTap={interactive ? { scale: 0.96 } : undefined}
                      transition={quickTransition}
                      onClick={() => setSelectedIsoDate(cell.isoDate)}
                      aria-pressed={isSelected}
                      className={cn(
                        'flex h-11 flex-col items-center justify-center rounded-sm border text-sm tabular-nums transition-colors',
                        !cell.isCurrentMonth &&
                          'border-transparent bg-transparent text-taupe/35 cursor-default',
                        cell.isCurrentMonth &&
                          !cell.isAvailable &&
                          'border-border-warm/50 bg-sand/50 text-taupe/55 line-through cursor-not-allowed',
                        interactive &&
                          !isSelected &&
                          'border-border-warm bg-cream text-espresso hover:border-rosewood hover:bg-blush-100/60 cursor-pointer',
                        isSelected &&
                          'border-rosewood bg-rosewood font-semibold text-cream cursor-pointer',
                      )}
                    >
                      {cell.dayNumber}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-border-warm pt-6 lg:col-span-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <h3 className="font-sans text-base font-bold tracking-tight text-espresso">
                Important Booking Reminders
              </h3>

              <div className="mt-4 space-y-4 text-sm leading-relaxed text-espresso/90">
                {bookingReminderSections.map((section) => (
                  <div key={section.heading} className="space-y-1.5">
                    <p className="font-bold text-espresso">{section.heading}</p>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets && (
                      <ul className="list-disc space-y-1 pl-5">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <TestimonialsPreviewSection reviews={reviews} isLoading={isLoading} />
      </Container>
    </section>
  );
}
