import { AuthLayout } from '../components/AuthLayout';
import { SignInForm } from '../components/SignInForm';

export function SignInPage() {
  return (
    <AuthLayout
      title="sign in"
      lead="Welcome back. Sign in to manage your bookings and deposits."
      imageSrc="/images/look-editorial.jpg"
      imageAlt="Editorial hair and makeup artistry by Marked by Francene"
      switchPrompt="New here?"
      switchLabel="Create an account"
      switchTo="/register"
    >
      <SignInForm />
    </AuthLayout>
  );
}
