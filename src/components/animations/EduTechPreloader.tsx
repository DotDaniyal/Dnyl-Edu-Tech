/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DANIYAL_IDENTITY } from '../../data/daniyalData';

interface EduTechPreloaderProps {
  onComplete: () => void;
}

export const EduTechPreloader: React.FC<EduTechPreloaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'intro' | 'loading' | 'finishing' | 'exit'>('intro');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Respect accessibility reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const duration = 1200; // Fast and cinematic (1.2s)
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const linearPct = Math.min(1, elapsed / duration);

      // Smooth organic cubic easing for progress
      const easedPct =
        linearPct < 0.5
          ? 4 * linearPct * linearPct * linearPct
          : 1 - Math.pow(-2 * linearPct + 2, 3) / 2;

      const currentProgress = Math.min(100, Math.floor(easedPct * 100));
      setProgress(currentProgress);

      if (currentProgress >= 20 && currentProgress < 85) {
        setPhase('loading');
      } else if (currentProgress >= 85) {
        setPhase('finishing');
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setPhase('exit');
          setTimeout(() => {
            onComplete();
          }, 850);
        }, 180);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="dnyl-edutech-preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            opacity: 0,
            filter: 'blur(8px)',
            transition: {
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1], // Smooth slide-up exit
            },
          }}
          className="fixed inset-0 z-[99999] bg-[#07090e] flex flex-col items-center justify-center select-none overflow-hidden"
          style={{ willChange: 'transform, opacity, filter' }}
        >
          {/* Subtle Background Developer Dot Matrix Grid */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Soft Blue & Purple Ambient Glow behind Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.3 }}
            animate={{
              scale: [0.88, 1.15, 1],
              opacity: [0.35, 0.7, 0.45],
            }}
            exit={{
              scale: 1.3,
              opacity: 0,
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[460px] h-[460px] sm:w-[540px] sm:h-[540px] rounded-full bg-radial from-cyan-500/20 via-indigo-600/15 to-transparent blur-[85px] pointer-events-none"
          />

          {/* Top Subtle Scanning Light Beam */}
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 shadow-[0_0_8px_#22d3ee]"
          />

          {/* Center Brand Container */}
          <motion.div
            exit={{
              scale: 0.92,
              opacity: 0,
              y: -20,
              filter: 'blur(8px)',
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            }}
            className="relative z-10 flex flex-col items-center space-y-5 max-w-sm px-6 text-center"
          >
            {/* Logo Emblem (Initial: opacity: 0, scale: 0.80, blur: 10px, y: 14px -> 0px) */}
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.15, 0.5, 0.15] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-2.5 rounded-2xl border border-cyan-500/40 pointer-events-none"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)', y: 14 }}
                animate={{
                  opacity: 1,
                  scale: phase === 'finishing' ? 0.97 : 1,
                  filter: 'blur(0px)',
                  y: 0,
                }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-20 h-20 rounded-2xl bg-slate-900/95 border border-cyan-500/50 flex flex-col items-center justify-center shadow-2xl shadow-cyan-500/25 backdrop-blur-xl ring-1 ring-white/10"
              >
                <div className="font-mono text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
                  &lt;/&gt;
                </div>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-ping" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400" />
              </motion.div>
            </div>

            {/* Typography */}
            <div className="space-y-1.5">
              <motion.div
                initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg font-bold tracking-tight text-white font-display uppercase"
              >
                {DANIYAL_IDENTITY.platformName}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.35 }}
                className="flex items-center justify-center gap-2 text-[11px] font-mono tracking-wider text-slate-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-cyan-400 font-medium">
                  {phase === 'intro' && 'INITIALIZING 10-POINT LEARNING ENGINE...'}
                  {phase === 'loading' && 'SYNCHRONIZING VERIFIED CODE TRACKS...'}
                  {phase === 'finishing' && 'PLATFORM READY // LAUNCHING'}
                </span>
              </motion.div>
            </div>

            {/* Thin Animated Loading Line under Logo (0% -> 100%) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="w-52 sm:w-60 space-y-2"
            >
              <div className="w-full h-1 bg-slate-800/90 rounded-full overflow-hidden p-[0.5px] border border-slate-700/60 shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.7)]"
                  style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>DANIYAL HAYAT // {new Date().getFullYear()}</span>
                <span className="text-cyan-300 font-bold tabular-nums">{progress}%</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Platform Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="absolute bottom-6 flex items-center gap-2 text-[10px] font-mono text-slate-500 tracking-widest uppercase"
          >
            <span>LEARN</span>
            <span aria-hidden="true">&bull;</span>
            <span>UNDERSTAND</span>
            <span aria-hidden="true">&bull;</span>
            <span>BUILD REAL SYSTEMS</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
