import { Star } from 'lucide-react';
import type { StarRatingProps } from '../../types/ui.types';
import { cn } from '../../lib/cn';

export function StarRating({
  rating,
  max = 5,
  size = 'sm',
}: StarRatingProps) {
  const iconClass = size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5';
  const rounded = Math.round(rating);

  return (
    <div
      className="inline-flex items-center gap-1"
      aria-label={`Rated ${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, index) => {
        const filled = index < rounded;
        return (
          <Star
            key={index}
            aria-hidden="true"
            className={cn(
              iconClass,
              filled
                ? 'fill-champagne text-champagne'
                : 'fill-transparent text-border-warm',
            )}
          />
        );
      })}
    </div>
  );
}
