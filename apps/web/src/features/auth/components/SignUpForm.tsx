import { TextField } from '../../../components/ui/TextField';
import { useAuthForm } from '../hooks/useAuthForm';
import type { FormErrorItem, SignUpValues } from '../types/auth.types';
import { validateSignUp } from '../utils/authValidation';
import { AuthStatusNotice } from './AuthStatusNotice';
import { AuthSubmitButton } from './AuthSubmitButton';
import { FormErrorSummary } from './FormErrorSummary';
import { PasswordField } from './PasswordField';

const INITIAL_SIGN_UP_VALUES: SignUpValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
};

export function SignUpForm() {
  const {
    values,
    errors,
    submitAttempted,
    status,
    errorSummaryRef,
    setFieldValue,
    handleBlur,
    handleSubmit,
  } = useAuthForm(INITIAL_SIGN_UP_VALUES, validateSignUp);

  const isSubmitting = status === 'submitting';

  const summaryItems: FormErrorItem[] = submitAttempted
    ? ([
        errors.name && { fieldId: 'signup-name', message: errors.name },
        errors.email && { fieldId: 'signup-email', message: errors.email },
        errors.phone && { fieldId: 'signup-phone', message: errors.phone },
        errors.password && {
          fieldId: 'signup-password',
          message: errors.password,
        },
        errors.password_confirmation && {
          fieldId: 'signup-password-confirmation',
          message: errors.password_confirmation,
        },
      ].filter(Boolean) as FormErrorItem[])
    : [];

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <FormErrorSummary items={summaryItems} containerRef={errorSummaryRef} />

      <TextField
        id="signup-name"
        name="name"
        type="text"
        autoComplete="name"
        label="Full name"
        placeholder="Maria Clara Santos"
        value={values.name}
        onChange={(event) => setFieldValue('name', event.target.value)}
        onBlur={() => handleBlur('name')}
        error={errors.name}
        disabled={isSubmitting}
      />

      <TextField
        id="signup-email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        label="Email address"
        placeholder="you@example.com"
        value={values.email}
        onChange={(event) => setFieldValue('email', event.target.value)}
        onBlur={() => handleBlur('email')}
        error={errors.email}
        disabled={isSubmitting}
      />

      <TextField
        id="signup-phone"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        label="Mobile number"
        placeholder="0917 123 4567"
        hint="We'll text appointment updates here."
        value={values.phone}
        onChange={(event) => setFieldValue('phone', event.target.value)}
        onBlur={() => handleBlur('phone')}
        error={errors.phone}
        disabled={isSubmitting}
      />

      <PasswordField
        id="signup-password"
        name="password"
        label="Password"
        autoComplete="new-password"
        placeholder="Create a password"
        hint="At least 8 characters."
        value={values.password}
        onChange={(nextValue) => setFieldValue('password', nextValue)}
        onBlur={() => handleBlur('password')}
        error={errors.password}
        disabled={isSubmitting}
      />

      <PasswordField
        id="signup-password-confirmation"
        name="password_confirmation"
        label="Confirm password"
        autoComplete="new-password"
        placeholder="Re-enter your password"
        value={values.password_confirmation}
        onChange={(nextValue) =>
          setFieldValue('password_confirmation', nextValue)
        }
        onBlur={() => handleBlur('password_confirmation')}
        error={errors.password_confirmation}
        disabled={isSubmitting}
      />

      <AuthSubmitButton
        isSubmitting={isSubmitting}
        idleLabel="Create account"
        submittingLabel="Creating account…"
      />

      <p className="text-xs leading-relaxed text-taupe">
        We&apos;ll email you a link to verify your address before you can book.
      </p>

      {status === 'submitted' && (
        <AuthStatusNotice message="Registration isn't connected yet. Your details were not sent." />
      )}
    </form>
  );
}
