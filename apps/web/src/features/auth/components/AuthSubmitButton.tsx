import { Loader2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import type { AuthSubmitButtonProps } from '../types/auth.types';

export function AuthSubmitButton({
  isSubmitting,
  idleLabel,
  submittingLabel,
}: AuthSubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      fullWidth
      disabled={isSubmitting}
    >
      {isSubmitting && (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      <span>{isSubmitting ? submittingLabel : idleLabel}</span>
    </Button>
  );
}
