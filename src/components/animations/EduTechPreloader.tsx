/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DANIYAL_IDENTITY } from '../../data/daniyalData';

/**
 * Preloader animation timings configured for a deliberate 5 to 6 second cinematic reveal
 */
const PRELOADER_TIMINGS = {
  /** Active progress bar advancement duration (4.8s) */
  PROGRESS_DURATION_MS: 4800,
  /** Brief pause at 100% before triggering exit curtain (0.3s) */
  COMPLETION_HOLD_MS: 300,
  /** Exit slide-up animation duration in seconds (0.85s) */
  EXIT_DURATION_SEC: 0.85,
  /** Exit slide-up animation duration in ms */
  EXIT_DURATION_MS: 850,
  /** Progress polling interval in ms */
  TICK_INTERVAL_MS: 16,
};

interface EduTechPreloaderProps {
  onComplete: () => void;
}

export const EduTechPreloader: React.FC<EduTechPreloaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'intro' | 'loading' | 'finishing' | 'exit'>('intro');
  const [statusMessage, setStatusMessage] = useState('INITIALIZING 10-POINT LEARNING ENGINE...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = PRELOADER_TIMINGS.PROGRESS_DURATION_MS;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const linearPct = Math.min(1, elapsed / duration);

      // Smooth organic S-curve easing for cinematic progress across 5-6s
      const easedPct =
        linearPct < 0.5
          ? 4 * linearPct * linearPct * linearPct
          : 1 - Math.pow(-2 * linearPct + 2, 3) / 2;

      const currentProgress = Math.min(100, Math.floor(easedPct * 100));
      setProgress(currentProgress);

      // Dynamic milestone status updates
      if (currentProgress < 20) {
        setPhase('intro');
        setStatusMessage('INITIALIZING 10-POINT LEARNING ENGINE...');
      } else if (currentProgress < 42) {
        setPhase('loading');
        setStatusMessage('COMPILING INTERACTIVE CODE PLAYGROUND...');
      } else if (currentProgress < 68) {
        setPhase('loading');
        setStatusMessage('SYNCHRONIZING VERIFIED CURRICULUM...');
      } else if (currentProgress < 86) {
        setPhase('loading');
        setStatusMessage('PREPARING BILINGUAL EXPERIENCE...');
      } else if (currentProgress < 100) {
        setPhase('finishing');
        setStatusMessage('OPTIMIZING WORKSPACE & ENVIRONMENT...');
      } else {
        setPhase('finishing');
        setStatusMessage('PLATFORM READY // LAUNCHING');
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setProgress(100);
        setStatusMessage('PLATFORM READY // LAUNCHING');
        setTimeout(() => {
          setPhase('exit');
          setTimeout(() => {
            onComplete();
          }, PRELOADER_TIMINGS.EXIT_DURATION_MS);
        }, PRELOADER_TIMINGS.COMPLETION_HOLD_MS);
      }
    }, PRELOADER_TIMINGS.TICK_INTERVAL_MS);

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
            filter: 'blur(12px)',
            transition: {
              duration: PRELOADER_TIMINGS.EXIT_DURATION_SEC,
              ease: [0.19, 1, 0.22, 1], // Smooth cinematic slide-up exit
            },
          }}
          className="fixed inset-0 z-[999999] bg-[#07090e] flex flex-col items-center justify-center select-none overflow-hidden"
          style={{ willChange: 'transform, opacity, filter' }}
        >
          {/* Background Matrix Grid */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, #38bdf8 1.5px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Soft Blue & Purple Ambient Glow behind Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.4 }}
            animate={{
              scale: [0.9, 1.25, 0.95],
              opacity: [0.4, 0.8, 0.45],
            }}
            exit={{
              scale: 1.4,
              opacity: 0,
              transition: { duration: 0.75, ease: [0.19, 1, 0.22, 1] },
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background:
                'radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(99,102,241,0.2) 45%, transparent 70%)',
            }}
            className="absolute w-[500px] h-[500px] sm:w-[620px] sm:h-[620px] rounded-full blur-[90px] pointer-events-none"
          />

          {/* Top Subtle Scanning Light Beam */}
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-90 shadow-[0_0_12px_#22d3ee]"
          />

          {/* Center Brand Container */}
          <motion.div
            exit={{
              scale: 0.92,
              opacity: 0,
              y: -24,
              filter: 'blur(10px)',
              transition: { duration: 0.75, ease: [0.19, 1, 0.22, 1] },
            }}
            className="relative z-10 flex flex-col items-center space-y-6 max-w-md px-6 text-center"
          >
            {/* Logo Emblem */}
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-3 rounded-2xl border border-cyan-500/50 pointer-events-none"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)', y: 14 }}
                animate={{
                  opacity: 1,
                  scale: phase === 'finishing' ? 0.98 : 1,
                  filter: 'blur(0px)',
                  y: 0,
                }}
                transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
                className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-2xl bg-slate-900/95 border-2 border-cyan-500/60 flex flex-col items-center justify-center shadow-2xl shadow-cyan-500/35 backdrop-blur-xl ring-1 ring-white/20"
              >
                <div className="font-mono text-3xl sm:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
                  &lt;/&gt;
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-ping" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400" />
              </motion.div>
            </div>

            {/* Typography */}
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.25, duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
                className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display uppercase"
              >
                {DANIYAL_IDENTITY.platformName}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-center justify-center gap-2 text-xs font-mono tracking-wider text-slate-300 min-h-[22px]"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="text-cyan-300 font-semibold tracking-wide transition-all duration-300">
                  {statusMessage}
                </span>
              </motion.div>
            </div>

            {/* Glowing Animated Loading Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="w-64 sm:w-76 space-y-2.5"
            >
              <div className="w-full h-2.5 bg-slate-900/90 rounded-full overflow-hidden p-[1px] border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 rounded-full shadow-[0_0_14px_rgba(6,182,212,0.9)] relative"
                  style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
                >
                  <span className="absolute right-0 top-0 bottom-0 w-2 bg-white/80 rounded-full shadow-[0_0_6px_#ffffff]" />
                </motion.div>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-slate-300 font-medium">DANIYAL HAYAT // {new Date().getFullYear()}</span>
                <span className="text-cyan-300 font-bold tabular-nums">{progress}%</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Platform Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="absolute bottom-6 flex items-center gap-2.5 text-xs font-mono text-slate-400 tracking-widest uppercase font-medium"
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
