import type { SkeletonProps } from '../../types/ui.types';
import { cn } from '../../lib/cn';

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-md bg-sand', className)}
    />
  );
}
