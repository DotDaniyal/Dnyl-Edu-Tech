import React, { useRef, useState, useCallback } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { EASINGS, TIMING } from './MotionTokens';

interface SpotlightCardProps extends HTMLMotionProps<'div'> {
  spotlightColor?: string;
  borderColor?: string;
  className?: string;
  children: React.ReactNode;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  spotlightColor = 'rgba(16, 185, 129, 0.12)',
  borderColor = 'rgba(52, 211, 153, 0.25)',
  className = '',
  children,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4, transition: { duration: TIMING.fast, ease: EASINGS.outQuart } }}
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {/* Subtle border glow layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 border"
        style={{
          opacity,
          borderColor,
        }}
      />
      {children}
    </motion.div>
  );
};
