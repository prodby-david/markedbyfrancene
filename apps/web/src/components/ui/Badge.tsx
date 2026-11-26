import type { BadgeProps, BadgeVariant } from '../../types/ui.types';
import { cn } from '../../lib/cn';

const badgeVariantClasses: Record<BadgeVariant, string> = {
  sand: 'bg-sand text-espresso border-border-warm',
  blush: 'bg-blush-100 text-rosewood border-blush-400/50',
  rosewood: 'bg-rosewood text-cream border-rosewood',
  espresso: 'bg-espresso text-cream border-espresso',
  champagne: 'bg-cream text-espresso border-champagne',
};

export function Badge({
  variant = 'sand',
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium leading-none',
        badgeVariantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
