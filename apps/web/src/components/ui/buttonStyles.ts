import type { ButtonSize, ButtonStyleOptions, ButtonVariant } from '../../types/ui.types';
import { cn } from '../../lib/cn';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-espresso text-cream hover:bg-rosewood border border-transparent',
  secondary:
    'bg-sand text-espresso border border-border-warm hover:bg-blush-100 hover:border-blush-400',
  rosewood:
    'bg-rosewood text-cream hover:bg-blush-400 hover:text-espresso border border-transparent',
  outlineLight:
    'bg-transparent text-cream border border-cream/40 hover:border-cream hover:bg-cream hover:text-espresso',
  cream:
    'bg-cream text-espresso border border-cream hover:bg-blush-100 hover:border-blush-100',
  ghost:
    'bg-transparent text-espresso hover:bg-sand border border-transparent',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-sm',
};

export function getButtonClassName({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
}: ButtonStyleOptions): string {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-md font-medium uppercase tracking-wide transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className,
  );
}
