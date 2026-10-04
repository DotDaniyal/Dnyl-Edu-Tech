import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  ExternalLink,
  Github,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { DANIYAL_IDENTITY } from '../data/daniyalData';
import { LastVisitedLesson } from '../types/edu';
import { TextReveal } from './animations/TextReveal';
import { MagneticButton } from './animations/MagneticButton';
import { TiltCard } from './animations/TiltCard';
import { FloatingElement } from './animations/FloatingElement';
import { FadeIn } from './animations/FadeIn';
import { StaggerContainer, StaggerItem } from './animations/StaggerContainer';
import { ShimmerText } from './animations/Shimmer';

interface HeroSectionProps {
  onStartLearning: () => void;
  onExploreCourses: () => void;
  lastVisitedLesson: LastVisitedLesson | null;
  onContinueLesson: (courseId: string, lessonId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLearning,
  onExploreCourses,
  lastVisitedLesson,
  onContinueLesson,
}) => {
  const [activeTerminalTab, setActiveTerminalTab] = useState<'code' | 'internals' | 'romanUrdu'>('code');
  const [terminalOutput, setTerminalOutput] = useState<string>(
    '✓ Ready: 10-Point Learning System initialized (TypeScript, React, Kotlin, JS)'
  );
  const [isRunning, setIsRunning] = useState(false);

  const handleRunHeroDemo = () => {
    setIsRunning(true);
    setTerminalOutput('⏳ Analyzing finite state transitions...');
    setTimeout(() => {
      setTerminalOutput(
        '▶ Executing MysticMatchStateMachine...\nState Transition: IDLE -> SWAPPING -> CHECKING -> CLEARING (3 Cyan Gems Matched!)'
      );
      setIsRunning(false);
    }, 450);
  };

  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
      {/* Subtle Floating Ambient Tech Badges in Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <FloatingElement duration={7} distance={12} delay={0.2} className="absolute top-12 left-6 md:left-24 opacity-40">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[11px] font-mono text-emerald-400 backdrop-blur-sm shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>TypeScript &bull; React</span>
          </div>
        </FloatingElement>

        <FloatingElement duration={8.5} distance={15} delay={1.2} className="absolute top-36 right-8 md:right-32 opacity-40">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-[11px] font-mono text-cyan-400 backdrop-blur-sm shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>Kotlin &bull; Android</span>
          </div>
        </FloatingElement>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Continue Learning Banner (Shown when LocalStorage has previous session) */}
        {lastVisitedLesson && (
          <FadeIn direction="down" duration={0.35} className="mb-8">
            <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/5 dark:bg-cyan-950/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-sm shadow-sm">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Continue Learning Where You Left Off</span>
                </div>
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Continue {lastVisitedLesson.courseName} &mdash; <span className="text-cyan-400 font-semibold">{lastVisitedLesson.lessonTitle}</span>
                </div>
              </div>
              <MagneticButton
                type="button"
                onClick={() =>
                  onContinueLesson(lastVisitedLesson.courseId, lastVisitedLesson.lessonId)
                }
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs whitespace-nowrap shrink-0 shadow-md shadow-cyan-500/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Continue</span>
              </MagneticButton>
            </div>
          </FadeIn>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand & Primary Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <FadeIn direction="up" delay={0.05} distance={14}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/25 bg-cyan-500/10 text-xs sm:text-sm font-medium text-cyan-600 dark:text-cyan-300 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Created by {DANIYAL_IDENTITY.founderName}</span>
                <span aria-hidden="true">&bull;</span>
                <span className="opacity-90">{DANIYAL_IDENTITY.role}</span>
              </div>
            </FadeIn>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.08] text-slate-900 dark:text-white font-display">
                <TextReveal
                  text={DANIYAL_IDENTITY.heroMainHeading}
                  highlightWords={['Daniyal', 'Grow', 'Build']}
                  highlightClassName="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400"
                />
              </h1>
              <FadeIn direction="up" delay={0.2} distance={16}>
                <p className="text-lg sm:text-2xl font-semibold text-slate-700 dark:text-slate-200 tracking-tight">
                  <ShimmerText>{DANIYAL_IDENTITY.heroSubHeading}</ShimmerText>
                </p>
              </FadeIn>
            </div>

            <FadeIn direction="up" delay={0.28} distance={16}>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {DANIYAL_IDENTITY.heroDescription}
              </p>
            </FadeIn>

            {/* Primary & Secondary Action Buttons with Magnetic Feel */}
            <FadeIn direction="up" delay={0.36} distance={18}>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <MagneticButton
                  type="button"
                  onClick={onStartLearning}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-semibold text-sm whitespace-nowrap shadow-lg shadow-cyan-500/20 transition-shadow"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Start Learning</span>
                </MagneticButton>

                <MagneticButton
                  type="button"
                  onClick={onExploreCourses}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:border-cyan-500/60 text-slate-900 dark:text-slate-100 font-semibold text-sm whitespace-nowrap"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4 text-cyan-500 transition-transform group-hover:translate-x-1" />
                </MagneticButton>

                <a
                  href={DANIYAL_IDENTITY.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 bg-slate-100/60 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium text-sm transition-all whitespace-nowrap"
                >
                  <span>Daniyal's Portfolio</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-500" />
                </a>

                <a
                  href={DANIYAL_IDENTITY.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Daniyal Hayat on GitHub (DotDaniyal)"
                  className="inline-flex items-center gap-2 px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 bg-slate-100/60 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium text-sm transition-all whitespace-nowrap"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </FadeIn>

            {/* Clean Unboxed Platform Highlights */}
            <FadeIn direction="up" delay={0.44} distance={14}>
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 10-Point Learning Architecture
                </span>
                <span aria-hidden="true">&bull;</span>
                <span>English &amp; Roman Urdu Support</span>
                <span aria-hidden="true">&bull;</span>
                <span>Interactive Practice Arena</span>
                <span aria-hidden="true">&bull;</span>
                <span>Real GitHub Projects</span>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Interactive Developer Terminal & 10-Point Preview with 3D Tilt */}
          <div className="lg:col-span-5 min-w-0">
            <FadeIn direction="left" delay={0.25} distance={30}>
              <TiltCard maxRotation={4} scaleOnHover={1.01}>
                <div className="rounded-2xl border border-slate-700/80 bg-slate-950/95 text-slate-100 shadow-2xl shadow-cyan-950/30 backdrop-blur-md overflow-hidden ring-1 ring-white/5">
                  {/* Terminal Top Bar */}
                  <div className="px-4 py-3 border-b border-slate-800/90 bg-slate-900/90 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 mr-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-mono text-xs text-slate-300 font-medium">
                        daniyal-edu-engine.ts
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-800/90 p-0.5 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setActiveTerminalTab('code')}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                          activeTerminalTab === 'code'
                            ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        05. Real Code
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTerminalTab('internals')}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                          activeTerminalTab === 'internals'
                            ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        07. Internals
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTerminalTab('romanUrdu')}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                          activeTerminalTab === 'romanUrdu'
                            ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Roman Urdu
                      </button>
                    </div>
                  </div>

                  {/* Terminal Body with Animated Content Switch */}
                  <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm space-y-4">
                    <AnimatePresence mode="wait">
                      {activeTerminalTab === 'code' && (
                        <motion.div
                          key="tab-code"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                        >
                          <pre className="overflow-x-auto leading-relaxed text-slate-200 font-mono">
{`type BoardState = 'IDLE' | 'SWAPPING' | 'CHECKING' | 'CLEARING';

export function nextState(state: BoardState, matched: boolean): BoardState {
  if (state === 'CHECKING') {
    return matched ? 'CLEARING' : 'IDLE';
  }
  return 'CHECKING';
}`}
                          </pre>
                        </motion.div>
                      )}

                      {activeTerminalTab === 'internals' && (
                        <motion.div
                          key="tab-internals"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-2.5 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed"
                        >
                          <div className="font-semibold text-cyan-400 flex items-center gap-1.5">
                            <Code2 className="w-4 h-4" />
                            <span>How It Works Under the Hood (Mystic Match Engine):</span>
                          </div>
                          <p>
                            1. Union types (<code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">BoardState</code>) restrict valid states at compile time in TypeScript and sealed classes in Kotlin.
                          </p>
                          <p>
                            2. Touch input is ignored unless the board is strictly in the <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">IDLE</code> state, preventing cascade race conditions.
                          </p>
                        </motion.div>
                      )}

                      {activeTerminalTab === 'romanUrdu' && (
                        <motion.div
                          key="tab-roman"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-2.5 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed"
                        >
                          <div className="font-semibold text-cyan-400">
                            Roman Urdu Concept Intuition:
                          </div>
                          <p className="italic text-slate-200 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                            "Jab game mein tiles drop ho rahi hon to naya touch swipe ignore karna zaroori hota hai. Finite State Machine har waqt sirf aik valid state allow karti hai taake 2D array corrupt na ho."
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Interactive Run Row */}
                    <div className="pt-3 border-t border-slate-800/90 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={handleRunHeroDemo}
                        disabled={isRunning}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all border border-cyan-500/30 active:scale-95"
                      >
                        <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                        <span>Run State Check</span>
                      </button>
                      <span className="text-[11px] text-slate-500 hidden sm:inline">
                        Press ⌘K / Ctrl+K to search
                      </span>
                    </div>

                    <motion.div
                      animate={{ scale: isRunning ? 0.99 : 1 }}
                      className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-emerald-400 whitespace-pre-wrap shadow-inner"
                    >
                      {terminalOutput}
                    </motion.div>
                  </div>
                </div>
              </TiltCard>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
