import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export const CursorGlow: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  const mouseX = useSpring(0, { stiffness: 350, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 350, damping: 30 });

  useEffect(() => {
    // Only enable on desktop pointer devices with fine tracking
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-30 h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-emerald-500/6 via-cyan-500/5 to-transparent blur-[80px]"
    />
  );
};
