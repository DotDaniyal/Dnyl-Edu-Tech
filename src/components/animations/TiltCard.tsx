import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { TIMING } from './MotionTokens';

interface TiltCardProps {
  maxRotation?: number; // degrees (default 5)
  perspective?: number; // px (default 1000)
  scaleOnHover?: number; // default 1.02
  className?: string;
  children: React.ReactNode;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  maxRotation = 5,
  perspective = 1000,
  scaleOnHover = 1.015,
  className = '',
  children,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Spring physics for buttery-smooth return
  const springConfig = { damping: 20, stiffness: 250 };
  const rotateX = useSpring(
    useTransform(y, [0, 1], [maxRotation, -maxRotation]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(x, [0, 1], [-maxRotation, maxRotation]),
    springConfig
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    x.set(clientX / rect.width);
    y.set(clientY / rect.height);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className="relative will-change-transform"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: scaleOnHover }}
        transition={{ duration: TIMING.fast }}
        className={`relative ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};
