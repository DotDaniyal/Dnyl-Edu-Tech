/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Timing tokens (in seconds for Motion)
export const TIMING = {
  instant: 0.1,
  fast: 0.18,
  normal: 0.28,
  medium: 0.45,
  slow: 0.75,
  ambient: 4.0,
} as const;

// Curated cubic-bezier curves for developer UI
export const EASINGS = {
  // Snappy deceleration for entrances
  outQuart: [0.25, 1, 0.5, 1] as [number, number, number, number],
  // Smooth symmetric transition
  inOutCubic: [0.65, 0, 0.35, 1] as [number, number, number, number],
  // Natural UI deceleration
  outExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  // Subtle bouncy spring
  springSoft: { type: 'spring', stiffness: 260, damping: 24 } as const,
  springSnappy: { type: 'spring', stiffness: 400, damping: 30 } as const,
  springBouncy: { type: 'spring', stiffness: 300, damping: 18 } as const,
};

// Reduced motion helper hook
export function usePrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
