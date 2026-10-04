import React from 'react';
import { motion } from 'motion/react';

interface FloatingElementProps {
  duration?: number; // seconds for full float cycle
  distance?: number; // px float amplitude
  delay?: number;
  rotate?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  duration = 5,
  distance = 10,
  delay = 0,
  rotate = false,
  className = '',
  children,
}) => {
  return (
    <motion.div
      animate={{
        y: [-distance, distance, -distance],
        rotate: rotate ? [-2, 2, -2] : 0,
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
