import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  quickTransition,
  subtleButtonHover,
  subtleButtonTap,
} from '../../lib/motion';
import type { ButtonLinkProps, ButtonProps } from '../../types/ui.types';
import { getButtonClassName } from './buttonStyles';

const MotionLink = motion.create(Link);

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  type = 'button',
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={disabled ? undefined : subtleButtonHover}
      whileTap={disabled ? undefined : subtleButtonTap}
      transition={quickTransition}
      className={getButtonClassName({ variant, size, fullWidth, className })}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <MotionLink
      whileHover={subtleButtonHover}
      whileTap={subtleButtonTap}
      transition={quickTransition}
      className={getButtonClassName({ variant, size, fullWidth, className })}
      {...rest}
    >
      {children}
    </MotionLink>
  );
}
