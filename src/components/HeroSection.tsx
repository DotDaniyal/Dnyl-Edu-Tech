import React, { useState } from 'react';
import { ArrowRight, BookOpen, ExternalLink, Github, Play, RotateCcw, Terminal } from 'lucide-react';
import { DANIYAL_IDENTITY } from '../data/daniyalData';
import { LastVisitedLesson } from '../types/edu';

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

  const handleRunHeroDemo = () => {
    setTerminalOutput(
      '▶ Executing MysticMatchStateMachine...\nState Transition: IDLE -> SWAPPING -> CHECKING -> CLEARING (3 Cyan Gems Matched!)'
    );
  };

  return (
    <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Continue Learning Banner (Shown when LocalStorage has previous session) */}
        {lastVisitedLesson && (
          <div className="mb-8 p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/5 dark:bg-cyan-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                Continue Learning Where You Left Off
              </div>
              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Continue {lastVisitedLesson.courseName} — {lastVisitedLesson.lessonTitle}
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                onContinueLesson(lastVisitedLesson.courseId, lastVisitedLesson.lessonId)
              }
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Continue</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand & Primary Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-cyan-600 dark:text-cyan-400">
              <span>Created by {DANIYAL_IDENTITY.founderName}</span>
              <span aria-hidden="true">·</span>
              <span>{DANIYAL_IDENTITY.role}</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.08] text-slate-900 dark:text-white font-display">
                {DANIYAL_IDENTITY.heroMainHeading}
              </h1>
              <p className="text-lg sm:text-2xl font-semibold text-slate-700 dark:text-slate-200 tracking-tight">
                {DANIYAL_IDENTITY.heroSubHeading}
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {DANIYAL_IDENTITY.heroDescription}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onStartLearning}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-transform active:scale-[0.99] whitespace-nowrap shadow-sm"
              >
                <BookOpen className="w-4 h-4" />
                <span>Start Learning</span>
              </button>

              <button
                type="button"
                onClick={onExploreCourses}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-cyan-500/60 text-slate-900 dark:text-slate-100 font-semibold text-sm transition-colors whitespace-nowrap"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 text-cyan-500" />
              </button>

              <a
                href={DANIYAL_IDENTITY.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium text-sm transition-colors whitespace-nowrap"
              >
                <span>View Daniyal's Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-500" />
              </a>

              <a
                href={DANIYAL_IDENTITY.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Daniyal Hayat on GitHub (DotDaniyal)"
                className="inline-flex items-center gap-2 px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium text-sm transition-colors whitespace-nowrap"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Clean Unboxed Platform Highlights */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
              <span>10-Point Learning Architecture</span>
              <span aria-hidden="true">·</span>
              <span>English &amp; Roman Urdu Concept Support</span>
              <span aria-hidden="true">·</span>
              <span>Interactive Practice Arena</span>
              <span aria-hidden="true">·</span>
              <span>Real Portfolio &amp; GitHub Projects</span>
            </div>
          </div>

          {/* Right Column: Interactive Developer Terminal & 10-Point Preview */}
          <div className="lg:col-span-5 min-w-0">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100 shadow-xl overflow-hidden">
              {/* Terminal Top Bar */}
              <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs text-slate-200 font-medium">
                    daniyal-edu-engine.ts
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-slate-800/90 p-0.5 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setActiveTerminalTab('code')}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                      activeTerminalTab === 'code'
                        ? 'bg-cyan-500 text-slate-950 font-semibold'
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
                        ? 'bg-cyan-500 text-slate-950 font-semibold'
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
                        ? 'bg-cyan-500 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Roman Urdu
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm space-y-4">
                {activeTerminalTab === 'code' && (
                  <pre className="overflow-x-auto leading-relaxed text-slate-200">
{`type BoardState = 'IDLE' | 'SWAPPING' | 'CHECKING' | 'CLEARING';

export function nextState(state: BoardState, matched: boolean): BoardState {
  if (state === 'CHECKING') {
    return matched ? 'CLEARING' : 'IDLE';
  }
  return 'CHECKING';
}`}
                  </pre>
                )}

                {activeTerminalTab === 'internals' && (
                  <div className="space-y-2.5 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <div className="font-semibold text-cyan-400">
                      How It Works Under the Hood (Mystic Match Engine):
                    </div>
                    <p>
                      1. Union types (`BoardState`) restrict valid states at compile time in TypeScript and sealed classes in Kotlin.
                    </p>
                    <p>
                      2. Touch input is ignored unless the board is strictly in the `IDLE` state, preventing cascade race conditions.
                    </p>
                  </div>
                )}

                {activeTerminalTab === 'romanUrdu' && (
                  <div className="space-y-2.5 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <div className="font-semibold text-cyan-400">
                      Roman Urdu Concept Intuition:
                    </div>
                    <p>
                      "Jab game mein tiles drop ho rahi hon to naya touch swipe روکنا (ignore karna) zaroori hota hai. Finite State Machine har waqt sirf aik valid state allow karti hai taake 2D array corrupt na ho."
                    </p>
                  </div>
                )}

                {/* Interactive Run Row */}
                <div className="pt-3 border-t border-slate-800/90 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleRunHeroDemo}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 text-xs font-semibold transition-colors whitespace-nowrap"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Run State Check</span>
                  </button>
                  <span className="text-[11px] text-slate-500">
                    Press ⌘K / Ctrl+K to search any topic
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-emerald-400 whitespace-pre-wrap">
                  {terminalOutput}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
