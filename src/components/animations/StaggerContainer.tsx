import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { EASINGS, TIMING } from './MotionTokens';

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  staggerDelay = 0.08,
  delayChildren = 0.05,
  once = true,
  className = '',
  children,
  ...props
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-40px' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  blur?: boolean;
  scale?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  direction = 'up',
  distance = 20,
  blur = true,
  scale = false,
  className = '',
  children,
  ...props
}) => {
  const getInitial = () => {
    const init: Record<string, any> = { opacity: 0 };
    if (direction === 'up') init.y = distance;
    if (direction === 'down') init.y = -distance;
    if (direction === 'left') init.x = distance;
    if (direction === 'right') init.x = -distance;
    if (blur) init.filter = 'blur(6px)';
    if (scale) init.scale = 0.96;
    return init;
  };

  const getAnimate = () => {
    const anim: Record<string, any> = {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: TIMING.medium,
        ease: EASINGS.outQuart,
      },
    };
    if (blur) anim.filter = 'blur(0px)';
    if (scale) anim.scale = 1;
    return anim;
  };

  const itemVariants = {
    hidden: getInitial(),
    show: getAnimate(),
  };

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
};
