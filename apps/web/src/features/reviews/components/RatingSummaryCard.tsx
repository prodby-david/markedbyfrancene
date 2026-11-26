import { ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { StarRating } from '../../../components/ui/StarRating';
import { editorialTransition } from '../../../lib/motion';
import type { RatingSummaryCardProps } from '../types/reviewsFeature.types';

export function RatingSummaryCard({
  summary,
  distribution,
}: RatingSummaryCardProps) {
  return (
    <section
      aria-label="Aggregate studio rating summary"
      className="grid grid-cols-1 gap-8 rounded-md border border-border-warm bg-sand/55 p-6 sm:p-8 md:grid-cols-12 md:items-center"
    >
      <div className="md:col-span-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-rosewood">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          <span>Verified completed bookings only</span>
        </div>
        <div className="mt-3 flex items-baseline gap-3">
          <p className="font-display text-6xl font-medium leading-none text-espresso tabular-nums">
            {summary.average_rating.toFixed(1)}
          </p>
          <div>
            <StarRating rating={summary.average_rating} size="md" />
            <p className="mt-1 text-xs text-taupe tabular-nums">
              Based on {summary.total_count}{' '}
              {summary.total_count === 1 ? 'verified review' : 'verified reviews'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 md:col-span-7">
        {distribution.map((row) => (
          <div key={row.stars} className="flex items-center gap-3 text-xs">
            <span className="w-12 shrink-0 font-medium text-espresso tabular-nums">
              {row.stars} stars
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-cream">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={editorialTransition}
                className="h-full origin-left rounded-full bg-rosewood"
                style={{ width: `${row.percentage}%` }}
              />
            </div>
            <span className="w-8 shrink-0 text-right text-taupe tabular-nums">
              {row.count}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
