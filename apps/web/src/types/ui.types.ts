import type { HTMLMotionProps } from 'motion/react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import type { LinkProps } from 'react-router';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'rosewood'
  | 'outlineLight'
  | 'cream';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type BadgeVariant = 'sand' | 'blush' | 'rosewood' | 'espresso' | 'champagne';

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

export interface ButtonProps
  extends HTMLMotionProps<'button'>,
    ButtonStyleOptions {
  children: ReactNode;
}

export interface ButtonLinkProps
  extends Omit<
      LinkProps,
      'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'
    >,
    ButtonStyleOptions {
  children: ReactNode;
}

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer';
}

export interface SkeletonProps {
  className?: string;
}

export interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md';
}

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface NavLinkItem {
  label: string;
  to: string;
}

export interface PlaceholderPageProps {
  title: string;
  description: string;
  badgeText: string;
  primaryActionLabel: string;
  primaryActionTo: string;
  secondaryActionLabel?: string;
  secondaryActionTo?: string;
}

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  trailing?: ReactNode;
}

export interface CheckboxFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  id: string;
  label: string;
}
