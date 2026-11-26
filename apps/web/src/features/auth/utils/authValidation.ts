import type {
  FieldErrors,
  SignInValues,
  SignUpValues,
} from '../types/auth.types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PH_MOBILE_PATTERN = /^(\+63|0)9\d{9}$/;
const MIN_PASSWORD_LENGTH = 8;
const MAX_NAME_LENGTH = 255;

function validateEmail(email: string): string | undefined {
  const trimmed = email.trim();
  if (!trimmed) {
    return 'Enter your email address.';
  }
  if (!EMAIL_PATTERN.test(trimmed)) {
    return 'Enter an email like name@example.com.';
  }
  return undefined;
}

function validatePhone(phone: string): string | undefined {
  const normalized = phone.replace(/[\s-]/g, '');
  if (!normalized) {
    return 'Enter a mobile number like 0917 123 4567.';
  }
  if (!PH_MOBILE_PATTERN.test(normalized)) {
    return 'Enter a mobile number like 0917 123 4567.';
  }
  return undefined;
}

export function validateSignIn(
  values: SignInValues,
): FieldErrors<SignInValues> {
  const errors: FieldErrors<SignInValues> = {};

  const emailError = validateEmail(values.email);
  if (emailError) {
    errors.email = emailError;
  }

  if (!values.password) {
    errors.password = 'Enter your password.';
  }

  return errors;
}

export function validateSignUp(
  values: SignUpValues,
): FieldErrors<SignUpValues> {
  const errors: FieldErrors<SignUpValues> = {};

  const trimmedName = values.name.trim();
  if (!trimmedName) {
    errors.name = 'Enter your full name.';
  } else if (trimmedName.length > MAX_NAME_LENGTH) {
    errors.name = `Full name must be ${MAX_NAME_LENGTH} characters or fewer.`;
  }

  const emailError = validateEmail(values.email);
  if (emailError) {
    errors.email = emailError;
  }

  const phoneError = validatePhone(values.phone);
  if (phoneError) {
    errors.phone = phoneError;
  }

  if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = 'Confirm your password.';
  } else if (values.password_confirmation !== values.password) {
    errors.password_confirmation = "Passwords don't match.";
  }

  return errors;
}
