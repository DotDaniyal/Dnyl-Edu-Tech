import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  Circle,
  Heart,
  Languages,
  Sparkles,
} from 'lucide-react';
import { Course } from '../types/edu';
import { CodeBlock } from './CodeBlock';
import { PracticeLabSection } from './PracticeLabSection';
import { ScrollProgress } from './animations/ScrollProgress';
import { FadeIn } from './animations/FadeIn';

interface LessonViewerProps {
  course: Course;
  activeLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  onBackToCatalog: () => void;
  completedLessons: string[];
  onToggleCompleteLesson: (lessonId: string, courseId: string) => void;
  completedChallenges: string[];
  onMarkChallengeComplete: (challengeId: string) => void;
  bookmarkedLessons: string[];
  onToggleBookmark: (lessonId: string) => void;
  isFavoriteCourse: boolean;
  onToggleFavoriteCourse: (courseId: string) => void;
  onToast: (msg: string) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  course,
  activeLessonId,
  onSelectLesson,
  onBackToCatalog,
  completedLessons,
  onToggleCompleteLesson,
  completedChallenges,
  onMarkChallengeComplete,
  bookmarkedLessons,
  onToggleBookmark,
  isFavoriteCourse,
  onToggleFavoriteCourse,
  onToast,
}) => {
  const currentIndex = Math.max(
    0,
    course.lessons.findIndex((l) => l.id === activeLessonId)
  );
  const lesson = course.lessons[currentIndex] || course.lessons[0];
  const prevLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < course.lessons.length - 1 ? course.lessons[currentIndex + 1] : null;

  const [mobileLessonDrawerOpen, setMobileLessonDrawerOpen] = useState(false);
  const [showRomanUrdu, setShowRomanUrdu] = useState(true);

  const tp = lesson.tenPoints;
  const isLessonComplete = completedLessons.includes(lesson.id);
  const isBookmarked = bookmarkedLessons.includes(lesson.id);
  const isChallengeDone = completedChallenges.includes(tp.practice.codingChallenge.id);

  useEffect(() => {
    setMobileLessonDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lesson.id]);

  const completedInCourseCount = course.lessons.filter((l) =>
    completedLessons.includes(l.id)
  ).length;
  const courseProgressPercent = Math.round(
    (completedInCourseCount / course.lessons.length) * 100
  );

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Reading Progress Bar */}
      <ScrollProgress />

      {/* Top Breadcrumb & Course Actions */}
      <FadeIn direction="down" duration={0.3} className="pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap"
            >
              <button
                type="button"
                onClick={onBackToCatalog}
                className="inline-flex items-center gap-1 hover:text-cyan-500 font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Courses</span>
              </button>
              <span aria-hidden="true">&bull;</span>
              <span className="text-slate-700 dark:text-slate-300 font-medium truncate">
                {course.name}
              </span>
              <span aria-hidden="true">&bull;</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                Lesson 0{lesson.number}
              </span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
              {lesson.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowRomanUrdu((prev) => !prev)}
              aria-pressed={showRomanUrdu}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap ${
                showRomanUrdu
                  ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>Roman Urdu: {showRomanUrdu ? 'ON' : 'OFF'}</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                onToggleBookmark(lesson.id);
                onToast(
                  isBookmarked ? 'Removed lesson from Saved Lessons' : 'Saved lesson to Bookmarks!'
                );
              }}
              aria-pressed={isBookmarked}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap ${
                isBookmarked
                  ? 'border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-300 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                onToggleFavoriteCourse(course.id);
                onToast(
                  isFavoriteCourse
                    ? `Removed ${course.shortName} from Favorites`
                    : `Added ${course.shortName} to Favorites`
                );
              }}
              aria-pressed={isFavoriteCourse}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap ${
                isFavoriteCourse
                  ? 'border-rose-500/50 bg-rose-500/10 text-rose-600 dark:text-rose-400 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavoriteCourse ? 'fill-current' : ''}`} />
              <span>{isFavoriteCourse ? 'Favorited' : 'Favorite Track'}</span>
            </motion.button>
          </div>
        </div>
      </FadeIn>

      {/* Mobile Compact Expandable Lesson Drawer */}
      <div className="lg:hidden mb-6">
        <button
          type="button"
          onClick={() => setMobileLessonDrawerOpen((prev) => !prev)}
          aria-expanded={mobileLessonDrawerOpen}
          className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] flex items-center justify-between text-sm font-semibold text-slate-900 dark:text-white"
        >
          <span>
            Curriculum ({completedInCourseCount}/{course.lessons.length} completed)
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              mobileLessonDrawerOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {mobileLessonDrawerOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] space-y-1.5 overflow-hidden"
            >
              {course.lessons.map((item) => {
                const active = item.id === lesson.id;
                const done = completedLessons.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectLesson(item.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between gap-2 text-xs font-medium ${
                      active
                        ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span className="truncate">
                      0{item.number}. {item.title}
                    </span>
                    {done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[290px_minmax(0,1fr)] gap-8 items-start">
        {/* Left Sidebar */}
        <aside className="hidden lg:block sticky top-24 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-sm space-y-5 shadow-sm">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
              {course.category} &bull; {course.difficulty}
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
              {course.name}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {course.tagline}
            </p>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Course Progress</span>
              <span className="font-mono font-semibold text-cyan-600 dark:text-cyan-400 tabular-nums">
                {courseProgressPercent}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${courseProgressPercent}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2">
              Track Lessons ({course.lessons.length})
            </div>
            {course.lessons.map((item) => {
              const active = item.id === lesson.id;
              const done = completedLessons.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectLesson(item.id)}
                  className={`w-full text-left p-2.5 rounded-xl flex items-start justify-between gap-2.5 text-xs transition-all ${
                    active
                      ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-mono text-[11px] text-slate-400">
                      Lesson 0{item.number} &bull; {item.durationMinutes}m
                    </div>
                    <div className="truncate mt-0.5">{item.title}</div>
                  </div>
                  {done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Column: 10-Point Learning System Content */}
        <div className="min-w-0 space-y-8">
          {/* Header Summary & Completion Action */}
          <FadeIn direction="up" delay={0.05}>
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  <span>10-Point Structured Lesson &bull; {lesson.durationMinutes} min read</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {lesson.summary}
                </p>
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  onToggleCompleteLesson(lesson.id, course.id);
                  onToast(
                    isLessonComplete
                      ? 'Marked lesson as incomplete'
                      : 'Lesson completed! Progress saved.'
                  );
                }}
                className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap shrink-0 ${
                  isLessonComplete
                    ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 shadow-sm'
                    : 'bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 shadow-md shadow-cyan-500/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isLessonComplete ? 'Lesson Completed' : 'Mark as Complete'}</span>
              </motion.button>
            </div>
          </FadeIn>

          {/* 01 & 02 */}
          <FadeIn direction="up" delay={0.08}>
            <section className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-sm space-y-6 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-display">
                  01. Definition &mdash; What is it?
                </h2>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                  {tp.definition}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-200/80 dark:border-slate-800/80">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-display">
                  02. Simple Explanation
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tp.simpleExplanation}
                </p>

                <AnimatePresence>
                  {showRomanUrdu && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-4 p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/5 dark:bg-cyan-950/20 overflow-hidden"
                    >
                      <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-1 flex items-center gap-1.5">
                        <Languages className="w-3.5 h-3.5" />
                        <span>Roman Urdu Explanation (Concept Intuition)</span>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                        {tp.romanUrduExplanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          </FadeIn>

          {/* 03 */}
          <FadeIn direction="up" delay={0.1}>
            <section className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-sm space-y-3 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                03. Real-World Analogy &mdash; {tp.realWorldAnalogy.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {tp.realWorldAnalogy.analogy}
              </p>
              <p className="text-xs sm:text-sm font-medium text-cyan-700 dark:text-cyan-300 pt-1">
                Technical Connection: {tp.realWorldAnalogy.connection}
              </p>
            </section>
          </FadeIn>

          {/* 04 & 05 */}
          <FadeIn direction="up" delay={0.12}>
            <section className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-sm space-y-6 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1 font-display">
                  04. Syntax Reference
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3">
                  {tp.syntax.notes}
                </p>
                <CodeBlock
                  code={tp.syntax.code}
                  language={tp.syntax.language}
                  title="Core Syntax"
                  onCopyToast={onToast}
                />
              </div>

              <div className="pt-5 border-t border-slate-200/80 dark:border-slate-800/80">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1 font-display">
                  05. Practical Code Example &mdash; {tp.codeExample.title}
                </h2>
                <CodeBlock
                  code={tp.codeExample.code}
                  language={tp.codeExample.language}
                  title={tp.codeExample.title}
                  expectedOutput={tp.codeExample.output}
                  runnable={true}
                  onCopyToast={onToast}
                />
              </div>
            </section>
          </FadeIn>

          {/* 06 & 07 */}
          <FadeIn direction="up" delay={0.14}>
            <section className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-sm space-y-6 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 font-display">
                  06. Line-by-Line Breakdown
                </h2>
                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {tp.lineByLine.map((item, idx) => (
                    <div key={idx} className="py-3.5 first:pt-0 last:pb-0 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
                        <span>{item.lines}</span>
                        <span aria-hidden="true">&bull;</span>
                        <code className="text-slate-800 dark:text-slate-200 break-all">
                          {item.code}
                        </code>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {item.explanation}
                      </p>
                      {showRomanUrdu && item.romanUrdu && (
                        <p className="text-xs text-cyan-700 dark:text-cyan-300/90">
                          Roman Urdu: {item.romanUrdu}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  07. How It Works Behind the Scenes
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tp.howItWorksInternally.summary}
                </p>
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  {tp.howItWorksInternally.steps.map((step, i) => (
                    <li key={i} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </FadeIn>

          {/* 08 & 09 */}
          <FadeIn direction="up" delay={0.16}>
            <section className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-sm space-y-6 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 font-display">
                  08. Common Mistakes Beginners Make
                </h2>
                <div className="space-y-4">
                  {tp.commonMistakes.map((mistake, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/50 space-y-3"
                    >
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {mistake.title}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/30 font-mono text-xs text-rose-200 overflow-x-auto">
                          <div className="font-sans font-semibold text-rose-400 mb-1">
                            ✗ Avoid (Bug-Prone):
                          </div>
                          <pre>{mistake.wrongCode}</pre>
                        </div>
                        <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 font-mono text-xs text-emerald-200 overflow-x-auto">
                          <div className="font-sans font-semibold text-emerald-400 mb-1">
                            ✓ Prefer (Production Pattern):
                          </div>
                          <pre>{mistake.correctCode}</pre>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        Why it happens: {mistake.whyItHappens}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  09. Practical Real-Project Example
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tp.practicalExample.scenario}
                </p>
                <CodeBlock
                  code={tp.practicalExample.code}
                  language={tp.practicalExample.language}
                  title="Production Architecture Pattern"
                  onCopyToast={onToast}
                />
                <p className="text-xs sm:text-sm font-medium text-cyan-600 dark:text-cyan-400">
                  Engineering Takeaway: {tp.practicalExample.takeaway}
                </p>
              </div>
            </section>
          </FadeIn>

          {/* 10 — Interactive Practice Lab */}
          <FadeIn direction="up" delay={0.18}>
            <PracticeLabSection
              lessonId={lesson.id}
              practice={tp.practice}
              isChallengeDone={isChallengeDone}
              onMarkChallengeComplete={onMarkChallengeComplete}
              onToast={onToast}
            />
          </FadeIn>

          {/* Bottom Lesson Navigation */}
          <FadeIn direction="up" delay={0.2}>
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              {prevLesson ? (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectLesson(prevLesson.id)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Prev: 0{prevLesson.number}. {prevLesson.title}</span>
                </motion.button>
              ) : (
                <div className="text-xs text-slate-400">First lesson in this track</div>
              )}

              {nextLesson ? (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectLesson(nextLesson.id)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm whitespace-nowrap shadow-md shadow-cyan-500/20"
                >
                  <span>Next: 0{nextLesson.number}. {nextLesson.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onBackToCatalog}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm whitespace-nowrap shadow-md shadow-emerald-500/20"
                >
                  <span>Track Complete &bull; Explore More Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};
