import { cn } from '../../lib/cn';
import type { CheckboxFieldProps } from '../../types/ui.types';

export function CheckboxField({
  id,
  label,
  className,
  ...inputProps
}: CheckboxFieldProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-espresso select-none',
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded-sm border border-border-warm accent-rosewood cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        {...inputProps}
      />
      <span>{label}</span>
    </label>
  );
}
