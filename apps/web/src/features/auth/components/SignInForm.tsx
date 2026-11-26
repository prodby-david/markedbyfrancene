import { Link } from 'react-router';
import { CheckboxField } from '../../../components/ui/CheckboxField';
import { TextField } from '../../../components/ui/TextField';
import { useAuthForm } from '../hooks/useAuthForm';
import type { FormErrorItem, SignInValues } from '../types/auth.types';
import { validateSignIn } from '../utils/authValidation';
import { AuthStatusNotice } from './AuthStatusNotice';
import { AuthSubmitButton } from './AuthSubmitButton';
import { FormErrorSummary } from './FormErrorSummary';
import { PasswordField } from './PasswordField';

const INITIAL_SIGN_IN_VALUES: SignInValues = {
  email: '',
  password: '',
  remember: false,
};

export function SignInForm() {
  const {
    values,
    errors,
    submitAttempted,
    status,
    errorSummaryRef,
    setFieldValue,
    handleBlur,
    handleSubmit,
  } = useAuthForm(INITIAL_SIGN_IN_VALUES, validateSignIn);

  const isSubmitting = status === 'submitting';

  const summaryItems: FormErrorItem[] = submitAttempted
    ? ([
        errors.email && { fieldId: 'signin-email', message: errors.email },
        errors.password && {
          fieldId: 'signin-password',
          message: errors.password,
        },
      ].filter(Boolean) as FormErrorItem[])
    : [];

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <FormErrorSummary items={summaryItems} containerRef={errorSummaryRef} />

      <TextField
        id="signin-email"
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

      <PasswordField
        id="signin-password"
        name="password"
        label="Password"
        autoComplete="current-password"
        placeholder="Enter your password"
        value={values.password}
        onChange={(nextValue) => setFieldValue('password', nextValue)}
        onBlur={() => handleBlur('password')}
        error={errors.password}
        disabled={isSubmitting}
      />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <CheckboxField
          id="signin-remember"
          name="remember"
          label="Remember me"
          checked={values.remember}
          onChange={(event) => setFieldValue('remember', event.target.checked)}
          disabled={isSubmitting}
        />

        <Link
          to="/forgot-password"
          className="text-sm font-medium text-rosewood underline underline-offset-4 transition-colors hover:text-espresso"
        >
          Forgot password?
        </Link>
      </div>

      <AuthSubmitButton
        isSubmitting={isSubmitting}
        idleLabel="Sign in"
        submittingLabel="Signing in…"
      />

      {status === 'submitted' && (
        <AuthStatusNotice message="Sign-in isn't connected yet. Your details were not sent." />
      )}
    </form>
  );
}
