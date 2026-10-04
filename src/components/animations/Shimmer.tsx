import React from 'react';

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
}

export const ShimmerText: React.FC<ShimmerTextProps> = ({
  children,
  className = '',
}) => {
  return (
    <span
      className={`inline-block bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_5s_ease-in-out_infinite] ${className}`}
    >
      {children}
    </span>
  );
};
