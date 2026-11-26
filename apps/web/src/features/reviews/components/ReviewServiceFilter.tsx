import { cn } from '../../../lib/cn';
import type {
  ReviewServiceFilterProps,
  ReviewSortOrder,
} from '../types/reviewsFeature.types';

export function ReviewServiceFilter({
  options,
  selectedServiceId,
  onServiceChange,
  sortOrder,
  onSortOrderChange,
}: ReviewServiceFilterProps) {
  return (
    <div className="flex flex-col gap-4 border-y border-border-warm py-5 sm:flex-row sm:items-center sm:justify-between">
      <div
        role="group"
        aria-label="Filter reviews by service"
        className="flex flex-wrap items-center gap-2"
      >
        {options.map((option) => {
          const isActive = option.id === selectedServiceId;
          return (
            <button
              key={String(option.id)}
              type="button"
              onClick={() => onServiceChange(option.id)}
              aria-pressed={isActive}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer',
                isActive
                  ? 'border-espresso bg-espresso text-cream'
                  : 'border-border-warm bg-cream text-espresso hover:bg-sand',
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-taupe">
        <span>Sort by</span>
        <select
          value={sortOrder}
          onChange={(event) =>
            onSortOrderChange(event.target.value as ReviewSortOrder)
          }
          className="rounded-md border border-border-warm bg-cream px-3 py-1.5 text-sm font-medium text-espresso"
        >
          <option value="newest">Most recent</option>
          <option value="highest">Highest rated</option>
        </select>
      </label>
    </div>
  );
}
