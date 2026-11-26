import type { FormErrorSummaryProps } from '../types/auth.types';

export function FormErrorSummary({
  items,
  containerRef,
}: FormErrorSummaryProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      role="alert"
      tabIndex={-1}
      aria-labelledby="auth-error-summary-heading"
      className="rounded-md border border-rosewood/40 bg-blush-100 p-4 text-espresso"
    >
      <h2
        id="auth-error-summary-heading"
        className="font-sans text-sm font-bold text-espresso"
      >
        Please check the highlighted fields
      </h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-rosewood">
        {items.map((item) => (
          <li key={item.fieldId}>
            <a
              href={`#${item.fieldId}`}
              className="font-medium underline underline-offset-4 transition-colors hover:text-espresso"
            >
              {item.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
