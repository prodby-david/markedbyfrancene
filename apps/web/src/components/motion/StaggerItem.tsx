import { motion } from 'motion/react';
import { staggerItemVariants } from '../../lib/motion';
import type { StaggerItemProps } from '../../types/motion.types';

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}
