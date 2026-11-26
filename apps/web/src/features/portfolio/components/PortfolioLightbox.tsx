import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Badge } from '../../../components/ui/Badge';
import { ButtonLink } from '../../../components/ui/Button';
import {
  backdropVariants,
  modalPanelVariants,
  quickTransition,
} from '../../../lib/motion';
import type { PortfolioLightboxProps } from '../types/portfolioFeature.types';

export function PortfolioLightbox({
  item,
  currentIndex,
  totalCount,
  onClose,
  onPrevious,
  onNext,
}: PortfolioLightboxProps) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="portfolio-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-lightbox-title"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/85 p-4 backdrop-blur-xs sm:p-8"
          onClick={onClose}
        >
          <motion.div
            key="portfolio-lightbox-panel"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalPanelVariants}
            className="relative grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-md border border-border-warm bg-cream md:grid-cols-12"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close lookbook preview"
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/95 text-espresso transition-colors hover:bg-sand cursor-pointer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand md:col-span-7 md:aspect-auto md:min-h-[480px]">
              <AnimatePresence mode="wait">
                {item.public_url ? (
                  <motion.img
                    key={item.id}
                    src={item.public_url}
                    alt={`${item.title} — ${item.category} makeup look`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={quickTransition}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={quickTransition}
                    className="flex h-full min-h-[340px] w-full flex-col items-center justify-center bg-gradient-to-b from-sand to-blush-100/60 p-8 text-center"
                  >
                    <Camera className="h-9 w-9 text-rosewood/70" aria-hidden="true" />
                    <p className="mt-3 font-display text-3xl text-espresso">
                      {item.title}
                    </p>
                    <p className="mt-2 text-xs text-taupe">
                      Replace with studio photograph in public/images/
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {totalCount > 1 && (
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={onPrevious}
                    aria-label="Previous look"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/95 text-espresso transition-colors hover:bg-sand cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <span className="rounded-full bg-espresso/80 px-3 py-1 text-xs font-medium text-cream tabular-nums">
                    {currentIndex + 1} / {totalCount}
                  </span>
                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Next look"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/95 text-espresso transition-colors hover:bg-sand cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-5">
              <div>
                <Badge variant="blush">{item.category}</Badge>
                <h2
                  id="portfolio-lightbox-title"
                  className="mt-4 font-display text-3xl font-medium leading-tight text-espresso"
                >
                  {item.title}
                </h2>
                {item.service_name && (
                  <p className="mt-2 text-sm font-medium text-rosewood">
                    Service: {item.service_name}
                  </p>
                )}
                {item.caption && (
                  <p className="mt-4 text-sm leading-relaxed text-taupe">
                    {item.caption}
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-col gap-2.5 border-t border-border-warm pt-6">
                <ButtonLink to="/book" variant="primary" size="md" fullWidth>
                  Book this style
                </ButtonLink>
                <ButtonLink to="/services" variant="secondary" size="md" fullWidth>
                  View service pricing
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
