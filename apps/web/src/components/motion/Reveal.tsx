import { motion } from 'motion/react';
import {
  defaultViewport,
  editorialEase,
  fadeUpVariants,
} from '../../lib/motion';
import type { RevealProps } from '../../types/motion.types';

export function Reveal({
  children,
  className,
  delay = 0,
  mountImmediate = false,
}: RevealProps) {
  const transition = {
    duration: 0.55,
    delay,
    ease: editorialEase,
  };

  if (mountImmediate) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        transition={transition}
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
      variants={fadeUpVariants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
