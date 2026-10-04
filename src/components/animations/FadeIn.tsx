import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { EASINGS, TIMING } from './MotionTokens';

export type FadeDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export interface FadeInProps extends HTMLMotionProps<'div'> {
  direction?: FadeDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  blur?: boolean;
  scale?: boolean;
  once?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const FadeIn: React.FC<FadeInProps> = ({
  direction = 'up',
  delay = 0,
  duration = TIMING.medium,
  distance = 24,
  blur = true,
  scale = false,
  once = true,
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
    if (scale) init.scale = 0.95;
    return init;
  };

  const getAnimate = () => {
    const anim: Record<string, any> = {
      opacity: 1,
      x: 0,
      y: 0,
    };
    if (blur) anim.filter = 'blur(0px)';
    if (scale) anim.scale = 1;
    return anim;
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: EASINGS.outQuart,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
