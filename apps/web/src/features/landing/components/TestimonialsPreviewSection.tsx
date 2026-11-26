import { motion } from 'motion/react';
import { Reveal } from '../../../components/motion/Reveal';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton } from '../../../components/ui/Skeleton';
import { StarRating } from '../../../components/ui/StarRating';
import { formatManilaDate } from '../../../lib/datetime';
import { cardHoverLift, quickTransition } from '../../../lib/motion';
import type { TestimonialsPreviewSectionProps } from '../types/landing.types';

export function TestimonialsPreviewSection({
  reviews,
  isLoading,
}: TestimonialsPreviewSectionProps) {
  return (
    <div id="lovenotes" className="scroll-mt-24 pt-16 sm:pt-20">
      <Reveal className="max-w-2xl">
        <h2 className="font-display text-5xl font-normal italic leading-none tracking-[-0.02em] text-cream sm:text-6xl">
          love notes from our clients
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-cream/85 sm:text-base">
          Every beauty experience should leave you feeling confident, beautiful,
          and cared for. Here’s what our clients have to say about their
          experience with Marked by Francene.
        </p>
        <p className="mt-2 text-sm text-cream/75">
          Swipe to see more love notes!
        </p>
      </Reveal>

      {isLoading ? (
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="h-52 w-full bg-cream/15" />
          ))}
        </div>
      ) : (
        <div
          role="region"
          aria-label="Client love notes carousel"
          className="mt-8 flex gap-5 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory"
        >
          {reviews.map((review) => (
            <motion.article
              key={review.id}
              whileHover={cardHoverLift}
              transition={quickTransition}
              className="flex w-[310px] shrink-0 snap-start flex-col justify-between rounded-sm border border-cream/15 bg-cream p-6 text-espresso sm:w-[420px]"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <StarRating rating={review.rating} size="sm" />
                  <Badge variant="sand">{review.service_name}</Badge>
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-espresso">
                  “{review.comment}”
                </blockquote>
              </div>
              <footer className="mt-5 flex items-center justify-between border-t border-border-warm pt-3 text-xs text-taupe">
                <span className="font-semibold text-espresso">
                  {review.reviewer_name}
                </span>
                <time dateTime={review.created_at} className="tabular-nums">
                  {formatManilaDate(review.created_at)}
                </time>
              </footer>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}
