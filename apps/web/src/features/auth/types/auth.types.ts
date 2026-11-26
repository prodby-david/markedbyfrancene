import type { ReactNode, RefObject } from 'react';

export interface SignInValues {
  email: string;
  password: string;
  remember: boolean;
}

export interface SignUpValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export type FieldErrors<T extends object> = Partial<Record<keyof T, string>>;

export type AuthFormStatus = 'idle' | 'submitting' | 'submitted';

export interface FormErrorItem {
  fieldId: string;
  message: string;
}

export interface AuthLayoutProps {
  title: string;
  lead: string;
  imageSrc: string;
  imageAlt: string;
  switchPrompt: string;
  switchLabel: string;
  switchTo: string;
  children: ReactNode;
}

export interface PasswordFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  autoComplete: 'current-password' | 'new-password';
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
}

export interface FormErrorSummaryProps {
  items: readonly FormErrorItem[];
  containerRef: RefObject<HTMLDivElement | null>;
}

export interface AuthSubmitButtonProps {
  isSubmitting: boolean;
  idleLabel: string;
  submittingLabel: string;
}

export interface AuthStatusNoticeProps {
  message: string;
}
