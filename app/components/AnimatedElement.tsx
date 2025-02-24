'use client';

import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export default function AnimatedElement({ children, delay = 0, className = '' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        delay,
        ease: [0.21, 0.45, 0.25, 0.95] // Smooth easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}