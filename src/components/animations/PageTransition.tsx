import React from 'react';
import { motion } from 'motion/react';
import { EASINGS, TIMING } from './MotionTokens';

interface PageTransitionProps {
  pageKey: string;
  className?: string;
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  pageKey,
  className = '',
  children,
}) => {
  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
      animate={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: TIMING.normal,
          ease: EASINGS.outQuart,
        },
      }}
      exit={{
        opacity: 0,
        y: -10,
        filter: 'blur(4px)',
        transition: {
          duration: TIMING.fast,
          ease: EASINGS.outQuart,
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
