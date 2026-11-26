import { motion } from 'motion/react';
import { defaultViewport, staggerContainerVariants } from '../../lib/motion';
import type { StaggerGroupProps } from '../../types/motion.types';

export function StaggerGroup({
  children,
  className,
  delay = 0,
  mountImmediate = false,
}: StaggerGroupProps) {
  if (mountImmediate) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        custom={delay}
        variants={staggerContainerVariants}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      custom={delay}
      variants={staggerContainerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
