import type { ReactNode } from 'react';

export interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  mountImmediate?: boolean;
}

export interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  mountImmediate?: boolean;
}

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}
