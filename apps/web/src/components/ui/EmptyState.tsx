import type { EmptyStateProps } from '../../types/ui.types';
import { Button } from './Button';

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="rounded-md border border-border-warm bg-sand/50 px-6 py-12 text-center">
      <h3 className="font-display text-2xl font-medium text-espresso">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-taupe">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button variant="secondary" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
