import type { Transition, Variants } from 'motion/react';

export const editorialEase: readonly [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
];

export const editorialTransition: Transition = {
  duration: 0.55,
  ease: editorialEase,
};

export const quickTransition: Transition = {
  duration: 0.22,
  ease: editorialEase,
};

export const defaultViewport = {
  once: true,
  amount: 0.16,
} as const;

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: editorialTransition,
  },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: (customDelay = 0) => ({
    transition: {
      staggerChildren: 0.08,
      delayChildren: customDelay,
    },
  }),
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: editorialTransition,
  },
};

export const drawerVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: quickTransition,
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: quickTransition,
  },
};

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: quickTransition },
  exit: { opacity: 0, transition: quickTransition },
};

export const modalPanelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: editorialTransition },
  exit: { opacity: 0, scale: 0.97, y: 10, transition: quickTransition },
};

export const accordionVariants: Variants = {
  collapsed: { opacity: 0, height: 0 },
  expanded: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.28, ease: editorialEase },
  },
};

export const subtleButtonHover = { y: -1.5 };

export const subtleButtonTap = { scale: 0.985 };

export const cardHoverLift = { y: -4 };
