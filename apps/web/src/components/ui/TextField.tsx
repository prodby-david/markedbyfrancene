import { cn } from '../../lib/cn';
import type { TextFieldProps } from '../../types/ui.types';

export function TextField({
  id,
  label,
  hint,
  error,
  trailing,
  className,
  ...inputProps
}: TextFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium text-espresso">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'h-12 w-full rounded-md border bg-cream px-4 text-base text-espresso caret-rosewood transition-colors placeholder:text-taupe disabled:cursor-not-allowed disabled:bg-sand/60 disabled:opacity-60',
            error
              ? 'border-rosewood'
              : 'border-border-warm hover:border-blush-400',
            Boolean(trailing) && 'pr-12',
          )}
          {...inputProps}
        />
        {trailing && (
          <div className="absolute inset-y-0 right-1 flex items-center">
            {trailing}
          </div>
        )}
      </div>
      {hint && !error && (
        <p id={hintId} className="text-xs leading-relaxed text-taupe">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs font-medium text-rosewood">
          {error}
        </p>
      )}
    </div>
  );
}
