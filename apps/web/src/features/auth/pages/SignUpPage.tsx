import { AuthLayout } from '../components/AuthLayout';
import { SignUpForm } from '../components/SignUpForm';

export function SignUpPage() {
  return (
    <AuthLayout
      title="create your account"
      lead="Book appointments, upload your deposit receipt, and track your glam sessions in one place."
      imageSrc="/images/hero-editorial.jpg"
      imageAlt="Soft bridal hair and makeup artistry by Marked by Francene"
      switchPrompt="Already have an account?"
      switchLabel="Sign in"
      switchTo="/login"
    >
      <SignUpForm />
    </AuthLayout>
  );
}
