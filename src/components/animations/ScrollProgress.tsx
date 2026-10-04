import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

interface ScrollProgressProps {
  className?: string;
  gradient?: string;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  className = '',
  gradient = 'linear-gradient(90deg, #10B981 0%, #06B6D4 50%, #3B82F6 100%)',
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        background: gradient,
        transformOrigin: '0%',
      }}
      className={`fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none shadow-[0_0_12px_rgba(16,185,129,0.5)] ${className}`}
    />
  );
};
