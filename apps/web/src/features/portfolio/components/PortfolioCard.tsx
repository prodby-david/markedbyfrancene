import { Camera, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton } from '../../../components/ui/Skeleton';
import { cn } from '../../../lib/cn';
import { cardHoverLift, quickTransition } from '../../../lib/motion';
import { useImageLoaded } from '../hooks/useImageLoaded';
import type { PortfolioCardProps } from '../types/portfolioFeature.types';

export function PortfolioCard({ item, onOpen }: PortfolioCardProps) {
  const { isLoaded, handleLoad } = useImageLoaded(item.public_url);

  return (
    <motion.article
      whileHover={cardHoverLift}
      transition={quickTransition}
      className="group flex flex-col"
    >
      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-label={`View ${item.title} in full resolution`}
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-md border border-border-warm bg-sand text-left cursor-pointer"
      >
        {item.public_url ? (
          <>
            {!isLoaded && (
              <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
            )}
            <img
              src={item.public_url}
              alt={`${item.title} — ${item.category} makeup look`}
              loading="lazy"
              onLoad={handleLoad}
              className={cn(
                'h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]',
                isLoaded ? 'opacity-100' : 'opacity-0',
              )}
            />
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-sand to-blush-100/60 p-6 text-center">
            <Camera className="h-7 w-7 text-rosewood/70" aria-hidden="true" />
            <p className="mt-3 font-display text-2xl font-medium text-espresso">
              {item.title}
            </p>
            <p className="mt-1 text-xs text-taupe">
              Editorial portrait placeholder
            </p>
          </div>
        )}

        <span
          aria-hidden="true"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 text-espresso opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-medium leading-snug text-espresso transition-colors group-hover:text-rosewood">
            {item.title}
          </h2>
          {item.service_name && (
            <p className="mt-0.5 text-xs text-taupe">{item.service_name}</p>
          )}
        </div>
        <Badge variant="sand" className="shrink-0">
          {item.category}
        </Badge>
      </div>

      {item.caption && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-taupe">
          {item.caption}
        </p>
      )}
    </motion.article>
  );
}
