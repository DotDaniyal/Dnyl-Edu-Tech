/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  X,
  EyeOff,
} from 'lucide-react';
import { DANIYAL_IDENTITY } from '../data/daniyalData';
import { AppLanguage, TRANSLATIONS } from '../data/translations';
import { LastVisitedLesson } from '../types/edu';
import { setHideContinueBanner } from '../lib/storage';
import { TextReveal } from './animations/TextReveal';
import { MagneticButton } from './animations/MagneticButton';
import { TiltCard } from './animations/TiltCard';
import { FloatingElement } from './animations/FloatingElement';
import { FadeIn } from './animations/FadeIn';
import { ShimmerText } from './animations/Shimmer';

interface HeroSectionProps {
  onStartLearning: () => void;
  onExploreCourses: () => void;
  lastVisitedLesson: LastVisitedLesson | null;
  onContinueLesson: (courseId: string, lessonId: string) => void;
  language?: AppLanguage;
  hideContinueBanner?: boolean;
  onDismissContinueBanner?: () => void;
  onDontShowAgainContinueBanner?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLearning,
  onExploreCourses,
  lastVisitedLesson,
  onContinueLesson,
  language = 'en',
  hideContinueBanner = false,
  onDismissContinueBanner,
  onDontShowAgainContinueBanner,
}) => {
  const t = TRANSLATIONS[language];
  const [activeTerminalTab, setActiveTerminalTab] = useState<'code' | 'internals' | 'romanUrdu'>('code');
  const [terminalOutput, setTerminalOutput] = useState<string>(
    '✓ Ready: 10-Point Learning System initialized (TypeScript, React, Kotlin, JS)'
  );
  const [isRunning, setIsRunning] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

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

  const showBanner = lastVisitedLesson && !hideContinueBanner && !bannerDismissed;

  return (
    <section className="relative pt-20 sm:pt-28 pb-14 sm:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
      {/* Subtle Floating Ambient Tech Badges in Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden hidden sm:block">
        <FloatingElement duration={7} distance={12} delay={0.2} className="absolute top-12 left-6 md:left-24 opacity-40">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 backdrop-blur-sm shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>TypeScript &bull; React</span>
          </div>
        </FloatingElement>

        <FloatingElement duration={8.5} distance={15} delay={1.2} className="absolute top-36 right-8 md:right-32 opacity-40">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 backdrop-blur-sm shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>Kotlin &bull; Android</span>
          </div>
        </FloatingElement>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Continue Learning Banner */}
        <AnimatePresence>
          {showBanner && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-md shadow-sm"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  <Sparkles className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>{t.hero.continueBannerTitle}</span>
                </div>
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                  {lastVisitedLesson.courseName} &mdash;{' '}
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                    {lastVisitedLesson.lessonTitle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setBannerDismissed(true);
                    onDismissContinueBanner?.();
                  }}
                  aria-label="Dismiss banner"
                  className="px-2.5 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Dismiss</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setBannerDismissed(true);
                    setHideContinueBanner(true);
                    onDontShowAgainContinueBanner?.();
                  }}
                  className="px-2.5 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-1"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Don't show again</span>
                </button>

                <MagneticButton
                  type="button"
                  onClick={() =>
                    onContinueLesson(lastVisitedLesson.courseId, lastVisitedLesson.lessonId)
                  }
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs whitespace-nowrap shadow-md shadow-cyan-500/20"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.hero.continueBannerAction}</span>
                </MagneticButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand & Primary Value Proposition */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <FadeIn direction="up" delay={0.05} distance={14}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/25 bg-cyan-500/10 text-xs sm:text-sm font-medium text-cyan-700 dark:text-cyan-300 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>{t.hero.kicker}</span>
              </div>
            </FadeIn>

            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white font-display">
                <TextReveal
                  text={language === 'en' ? DANIYAL_IDENTITY.heroMainHeading : `${t.hero.mainHeading1} ${t.hero.mainHeading2}`}
                  highlightWords={['Daniyal', 'Grow', 'Build', 'Seekhein', 'Banayein']}
                  highlightClassName="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400"
                />
              </h1>
              <FadeIn direction="up" delay={0.2} distance={16}>
                <p className="text-base sm:text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-200 tracking-tight">
                  <ShimmerText>{t.hero.subHeading}</ShimmerText>
                </p>
              </FadeIn>
            </div>

            <FadeIn direction="up" delay={0.28} distance={16}>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {t.hero.description}
              </p>
            </FadeIn>

            {/* Primary & Secondary Action Buttons */}
            <FadeIn direction="up" delay={0.36} distance={18}>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
                <MagneticButton
                  type="button"
                  onClick={onStartLearning}
                  className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-semibold text-sm whitespace-nowrap shadow-lg shadow-cyan-500/20 transition-shadow min-h-[44px]"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t.hero.startLearning}</span>
                </MagneticButton>

                <MagneticButton
                  type="button"
                  onClick={onExploreCourses}
                  className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm hover:border-cyan-500/60 text-slate-900 dark:text-slate-100 font-semibold text-sm whitespace-nowrap min-h-[44px]"
                >
                  <span>{t.hero.exploreCourses}</span>
                  <ArrowRight className="w-4 h-4 text-cyan-500 transition-transform group-hover:translate-x-1" />
                </MagneticButton>

                <a
                  href={DANIYAL_IDENTITY.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 bg-slate-100/60 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm transition-all whitespace-nowrap min-h-[40px] sm:min-h-[44px]"
                >
                  <span>{t.hero.viewPortfolio}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-500" />
                </a>

                <a
                  href={DANIYAL_IDENTITY.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Daniyal Hayat on GitHub (DotDaniyal)"
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 bg-slate-100/60 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm transition-all whitespace-nowrap min-h-[40px] sm:min-h-[44px]"
                >
                  <Github className="w-4 h-4" />
                  <span>{t.hero.github}</span>
                </a>
              </div>
            </FadeIn>

            {/* Clean Unboxed Platform Highlights */}
            <FadeIn direction="up" delay={0.44} distance={14}>
              <div className="pt-3 sm:pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> 10-Point Architecture
                </span>
                <span aria-hidden="true">&bull;</span>
                <span>English &amp; Roman Urdu</span>
                <span aria-hidden="true">&bull;</span>
                <span>Practice Arena</span>
                <span aria-hidden="true">&bull;</span>
                <span>Real GitHub Projects</span>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Interactive Developer Terminal & 10-Point Preview */}
          <div className="lg:col-span-5 min-w-0 w-full">
            <FadeIn direction="left" delay={0.25} distance={30}>
              <TiltCard maxRotation={4} scaleOnHover={1.01}>
                <div className="rounded-2xl border border-slate-700/80 bg-slate-950/95 text-slate-100 shadow-2xl shadow-cyan-950/30 backdrop-blur-md overflow-hidden ring-1 ring-white/5">
                  {/* Terminal Top Bar */}
                  <div className="px-3.5 sm:px-4 py-3 border-b border-slate-800/90 bg-slate-900/90 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 mr-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="font-mono text-xs text-slate-300 font-medium hidden sm:inline">
                        daniyal-edu-engine.ts
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-800/90 p-0.5 rounded-lg overflow-x-auto">
                      <button
                        type="button"
                        onClick={() => setActiveTerminalTab('code')}
                        className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap ${
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
                        className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap ${
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
                        className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap ${
                          activeTerminalTab === 'romanUrdu'
                            ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Roman Urdu
                      </button>
                    </div>
                  </div>

                  {/* Terminal Body */}
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
                          <pre className="overflow-x-auto leading-relaxed text-slate-200 font-mono text-[11px] sm:text-xs md:text-sm">
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
                            <Code2 className="w-4 h-4 shrink-0" />
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
                          key="tab-roman-urdu"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="space-y-2 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed"
                        >
                          <div className="font-semibold text-cyan-400">
                            Roman Urdu Mein Concept Samajhein:
                          </div>
                          <p>
                            Game state machine ka matlab hai ke board ek waqt mein sirf ek state mein ho sakta hai (e.g., jab gems clear ho rahe hon to user aur click na kar sake). Is se race conditions khatam hoti hain.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Interactive Live Run Simulation */}
                    <div className="pt-3 border-t border-slate-800 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] text-slate-400 font-mono">
                          Live Architecture Verification:
                        </span>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={handleRunHeroDemo}
                          disabled={isRunning}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs whitespace-nowrap shadow-sm shadow-cyan-500/20 disabled:opacity-50"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>{isRunning ? 'Running...' : 'Simulate State'}</span>
                        </motion.button>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 text-[11px] text-emerald-400 font-mono overflow-x-auto whitespace-pre-wrap leading-tight">
                        {terminalOutput}
                      </div>
                    </div>
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
