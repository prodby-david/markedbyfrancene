import type { AuthStatusNoticeProps } from '../types/auth.types';

export function AuthStatusNotice({ message }: AuthStatusNoticeProps) {
  return (
    <div
      role="status"
      className="rounded-md border border-border-warm bg-sand p-4 text-sm leading-relaxed text-espresso"
    >
      {message}
    </div>
  );
}
