import { BadgeCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Badge } from '../../../components/ui/Badge';
import { StarRating } from '../../../components/ui/StarRating';
import { formatManilaDate } from '../../../lib/datetime';
import { cardHoverLift, quickTransition } from '../../../lib/motion';
import type { ReviewCardProps } from '../types/reviewsFeature.types';

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <motion.article
      whileHover={cardHoverLift}
      transition={quickTransition}
      className="flex h-full flex-col justify-between rounded-md border border-border-warm bg-cream p-6 transition-colors hover:border-blush-400"
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <StarRating rating={review.rating} size="sm" />
          <Badge variant="sand">{review.service_name}</Badge>
        </div>

        <blockquote className="mt-4 text-sm leading-relaxed text-espresso sm:text-base">
          “{review.comment}”
        </blockquote>
      </div>

      <footer className="mt-6 flex items-center justify-between gap-3 border-t border-border-warm pt-4 text-xs text-taupe">
        <span className="inline-flex items-center gap-1.5 font-medium text-espresso">
          <BadgeCheck className="h-4 w-4 text-rosewood" aria-hidden="true" />
          {review.reviewer_name}
        </span>
        <time dateTime={review.created_at} className="tabular-nums">
          {formatManilaDate(review.created_at)}
        </time>
      </footer>
    </motion.article>
  );
}
