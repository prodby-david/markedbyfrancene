import { cn } from '../../../lib/cn';
import type { PortfolioFilterBarProps } from '../types/portfolioFeature.types';

export function PortfolioFilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  totalCount,
}: PortfolioFilterBarProps) {
  return (
    <div className="flex flex-col gap-4 border-y border-border-warm py-5 sm:flex-row sm:items-center sm:justify-between">
      <div
        role="group"
        aria-label="Filter lookbook by category"
        className="flex flex-wrap items-center gap-2"
      >
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              aria-pressed={isActive}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer',
                isActive
                  ? 'border-espresso bg-espresso text-cream'
                  : 'border-border-warm bg-cream text-espresso hover:bg-sand',
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-taupe tabular-nums">
        Showing {totalCount} {totalCount === 1 ? 'look' : 'looks'}
      </p>
    </div>
  );
}
