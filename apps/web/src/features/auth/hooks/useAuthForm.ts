import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { AuthFormStatus, FieldErrors } from '../types/auth.types';

// shortcut: no API yet; replace with the login/register mutation once auth endpoints exist.
function submitPlaceholder(): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 700);
  });
}

export function useAuthForm<T extends object>(
  initialValues: T,
  validate: (values: T) => FieldErrors<T>,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [errors, setErrors] = useState<FieldErrors<T>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<AuthFormStatus>('idle');
  const errorSummaryRef = useRef<HTMLDivElement | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const setFieldValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValues((prev) => {
        const next = { ...prev, [field]: value };
        if (submitAttempted) {
          setErrors(validate(next));
        } else if (touched[field]) {
          const nextErrors = validate(next);
          setErrors((prevErrors) => {
            const updated: FieldErrors<T> = { ...prevErrors };
            for (const key of Object.keys(touched) as Array<keyof T>) {
              if (touched[key]) {
                updated[key] = nextErrors[key];
              }
            }
            return updated;
          });
        }
        return next;
      });
      if (status === 'submitted') {
        setStatus('idle');
      }
    },
    [status, submitAttempted, touched, validate],
  );

  const handleBlur = useCallback(
    <K extends keyof T>(field: K) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const nextErrors = validate(values);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: nextErrors[field],
      }));
    },
    [validate, values],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (status === 'submitting') {
        return;
      }

      setSubmitAttempted(true);
      const nextErrors = validate(values);
      setErrors(nextErrors);

      const hasErrors = Object.values(nextErrors).some(Boolean);
      if (hasErrors) {
        setStatus('idle');
        window.requestAnimationFrame(() => {
          errorSummaryRef.current?.focus();
        });
        return;
      }

      setStatus('submitting');
      await submitPlaceholder();
      if (isMountedRef.current) {
        setStatus('submitted');
      }
    },
    [status, validate, values],
  );

  return {
    values,
    errors,
    submitAttempted,
    status,
    errorSummaryRef,
    setFieldValue,
    handleBlur,
    handleSubmit,
  };
}
