export const cardVariants = {
  hover: {
    y: -5,
    transition: {
      type: 'spring',
      stiffness: 300
    }
  }
};

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};
