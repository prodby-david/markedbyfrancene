import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { TextField } from '../../../components/ui/TextField';
import type { PasswordFieldProps } from '../types/auth.types';

export function PasswordField({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  autoComplete,
  placeholder,
  hint,
  error,
  disabled,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TextField
      id={id}
      name={name}
      type={isVisible ? 'text' : 'password'}
      label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      autoComplete={autoComplete}
      placeholder={placeholder}
      hint={hint}
      error={error}
      disabled={disabled}
      trailing={
        <button
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
          disabled={disabled}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-taupe transition-colors hover:bg-sand hover:text-espresso cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isVisible ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      }
    />
  );
}
