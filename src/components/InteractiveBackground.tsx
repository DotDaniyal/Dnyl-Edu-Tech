import React, { useEffect, useState } from 'react';

export const InteractiveBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Subtle Architectural Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Subtle Cursor-Following Radial Spotlight */}
      <div
        className="hidden md:block absolute w-[520px] h-[520px] rounded-full opacity-20 dark:opacity-15 blur-3xl transition-transform duration-200 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.28) 0%, rgba(37, 99, 235, 0.08) 50%, transparent 70%)',
          transform: `translate3d(${mousePos.x - 260}px, ${mousePos.y - 260}px, 0)`,
        }}
      />

      {/* Minimal SVG Node Network */}
      <svg
        className="absolute top-0 right-0 w-[640px] h-[480px] opacity-[0.06] dark:opacity-[0.09] text-cyan-500"
        viewBox="0 0 640 480"
        fill="none"
      >
        <line x1="80" y1="60" x2="240" y2="140" stroke="currentColor" strokeWidth="1" />
        <line x1="240" y1="140" x2="420" y2="90" stroke="currentColor" strokeWidth="1" />
        <line x1="240" y1="140" x2="310" y2="290" stroke="currentColor" strokeWidth="1" />
        <line x1="420" y1="90" x2="540" y2="210" stroke="currentColor" strokeWidth="1" />
        <line x1="310" y1="290" x2="540" y2="210" stroke="currentColor" strokeWidth="1" />
        <circle cx="80" cy="60" r="3" fill="currentColor" />
        <circle cx="240" cy="140" r="4" fill="currentColor" />
        <circle cx="420" cy="90" r="3" fill="currentColor" />
        <circle cx="310" cy="290" r="3.5" fill="currentColor" />
        <circle cx="540" cy="210" r="4" fill="currentColor" />
      </svg>
    </div>
  );
};
