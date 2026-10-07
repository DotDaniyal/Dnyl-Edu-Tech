/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Award,
  Bookmark,
  BookOpen,
  CheckCircle2,
  Code2,
  Flame,
  Heart,
  RotateCcw,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react';
import { COURSES, getAllLessons } from '../data/coursesData';
import { AppLanguage, TRANSLATIONS } from '../data/translations';
import { LastVisitedLesson } from '../types/edu';
import { CourseCard } from './CourseCard';
import { NumberCounter } from './animations/NumberCounter';
import { FadeIn } from './animations/FadeIn';
import { StaggerContainer, StaggerItem } from './animations/StaggerContainer';
import { SpotlightCard } from './animations/SpotlightCard';

interface MyLearningDashboardProps {
  completedLessons: string[];
  completedChallenges: string[];
  favoriteCourses: string[];
  bookmarkedLessons: string[];
  recentCourses: string[];
  lastVisitedLesson: LastVisitedLesson | null;
  onOpenCourse: (courseId: string, lessonId?: string) => void;
  onToggleFavorite: (courseId: string) => void;
  onToggleBookmark: (lessonId: string) => void;
  onExploreCourses: () => void;
  language?: AppLanguage;
}

export const MyLearningDashboard: React.FC<MyLearningDashboardProps> = ({
  completedLessons,
  completedChallenges,
  favoriteCourses,
  bookmarkedLessons,
  recentCourses,
  lastVisitedLesson,
  onOpenCourse,
  onToggleFavorite,
  onToggleBookmark,
  onExploreCourses,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language];
  const allLessons = getAllLessons();
  const totalLessonsCount = allLessons.length;
  const overallProgressPercent =
    totalLessonsCount > 0
      ? Math.round((completedLessons.length / totalLessonsCount) * 100)
      : 0;

  // Calculate Developer XP and Streak estimate
  const totalXP = completedLessons.length * 100 + completedChallenges.length * 50;
  const currentStreakDays = completedLessons.length > 0 ? Math.min(completedLessons.length, 7) : 0;

  const coursesStarted = COURSES.filter(
    (c) =>
      recentCourses.includes(c.id) ||
      c.lessons.some((l) => completedLessons.includes(l.id))
  );

  const coursesCompleted = COURSES.filter(
    (c) => c.lessons.length > 0 && c.lessons.every((l) => completedLessons.includes(l.id))
  );

  const favoriteCourseObjects = COURSES.filter((c) => favoriteCourses.includes(c.id));
  const bookmarkedLessonObjects = allLessons.filter(({ lesson }) =>
    bookmarkedLessons.includes(lesson.id)
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <FadeIn direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Learning Telemetry &bull; LocalStorage Sync</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            {t.dashboard.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            {t.dashboard.subtitle}
          </p>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onExploreCourses}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-semibold text-xs sm:text-sm whitespace-nowrap self-start shadow-md shadow-cyan-500/20"
        >
          <span>Explore All Tracks</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </FadeIn>

      {/* Top Metrics Row with NumberCounter */}
      <StaggerContainer staggerDelay={0.06} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Metric 1: Overall Progress */}
        <StaggerItem>
          <SpotlightCard className="p-3.5 sm:p-5 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 space-y-1.5 shadow-sm h-full">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Overall Progress</div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-cyan-500 tabular-nums">
              <NumberCounter value={overallProgressPercent} suffix="%" />
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 tabular-nums">
              {completedLessons.length} of {totalLessonsCount} lessons
            </div>
          </SpotlightCard>
        </StaggerItem>

        {/* Metric 2: Developer XP */}
        <StaggerItem>
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.15)"
            className="p-3.5 sm:p-5 border border-amber-500/30 bg-amber-500/5 dark:bg-[#0d1322]/90 space-y-1.5 shadow-sm h-full"
          >
            <div className="text-xs text-amber-500 dark:text-amber-400 font-medium flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{t.dashboard.xpEarned}</span>
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-amber-500 tabular-nums">
              <NumberCounter value={totalXP} />
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400">+100 per completed lesson</div>
          </SpotlightCard>
        </StaggerItem>

        {/* Metric 3: Active Streak */}
        <StaggerItem>
          <SpotlightCard
            spotlightColor="rgba(244, 63, 94, 0.15)"
            className="p-3.5 sm:p-5 border border-rose-500/30 bg-rose-500/5 dark:bg-[#0d1322]/90 space-y-1.5 shadow-sm h-full"
          >
            <div className="text-xs text-rose-500 dark:text-rose-400 font-medium flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-current animate-bounce" />
              <span>{t.dashboard.streak}</span>
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-rose-500 tabular-nums">
              <NumberCounter value={currentStreakDays} suffix=" Days" />
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400">Consistency booster</div>
          </SpotlightCard>
        </StaggerItem>

        {/* Metric 4: Courses Started */}
        <StaggerItem>
          <SpotlightCard className="p-3.5 sm:p-5 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 space-y-1.5 shadow-sm h-full">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tracks Started</div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              <NumberCounter value={coursesStarted.length} />
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 tabular-nums">
              Out of {COURSES.length} tracks
            </div>
          </SpotlightCard>
        </StaggerItem>

        {/* Metric 5: Courses Completed */}
        <StaggerItem>
          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.15)"
            className="p-3.5 sm:p-5 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 space-y-1.5 shadow-sm h-full"
          >
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-emerald-400" />
              <span>Completed</span>
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-emerald-400 tabular-nums">
              <NumberCounter value={coursesCompleted.length} />
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400">100% finished</div>
          </SpotlightCard>
        </StaggerItem>

        {/* Metric 6: Practice Challenges Solved */}
        <StaggerItem className="col-span-2 sm:col-span-1 lg:col-span-1">
          <SpotlightCard className="p-3.5 sm:p-5 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 space-y-1.5 shadow-sm h-full">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.dashboard.completedChallenges}</span>
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-cyan-400 tabular-nums">
              <NumberCounter value={completedChallenges.length} />
            </div>
            <div className="text-xs text-slate-400">Interactive labs</div>
          </SpotlightCard>
        </StaggerItem>
      </StaggerContainer>

      {/* Completion Mastery Badge & Certificate Card */}
      {completedLessons.length >= 3 && (
        <FadeIn direction="up">
          <div className="p-6 rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-emerald-500 text-slate-950 shrink-0 shadow-lg shadow-emerald-500/25">
                <Award className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Developer Mastery Milestone</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display">
                  Verified 10-Point Engineering Progress ({completedLessons.length} Lessons Completed)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
                  You have successfully mastered multiple programming topics across syntax, internals, common pitfalls, and hands-on practice code.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden sm:block">
                <div className="text-xs text-slate-500">Mastery Level</div>
                <div className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {completedLessons.length >= 10 ? 'Senior Apprentice' : 'Active Builder'}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      )}

      {/* Continue Learning Card */}
      {lastVisitedLesson && (
        <FadeIn direction="up">
          <SpotlightCard
            spotlightColor="rgba(6, 182, 212, 0.2)"
            className="p-6 border border-cyan-500/40 bg-cyan-500/5 dark:bg-cyan-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
          >
            <div className="space-y-1">
              <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.dashboard.resume}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display">
                Continue {lastVisitedLesson.courseName} &mdash; <span className="text-cyan-400">{lastVisitedLesson.lessonTitle}</span>
              </h2>
            </div>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                onOpenCourse(lastVisitedLesson.courseId, lastVisitedLesson.lessonId)
              }
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm whitespace-nowrap shrink-0 shadow-md shadow-cyan-500/20"
            >
              <span>{t.hero.continueBannerAction}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </SpotlightCard>
        </FadeIn>
      )}

      {/* My Favorites Section */}
      <div className="space-y-4">
        <FadeIn direction="up" className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <span>{t.dashboard.savedCourses} ({favoriteCourseObjects.length})</span>
          </h2>
        </FadeIn>

        {favoriteCourseObjects.length === 0 ? (
          <FadeIn direction="up">
            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-sm text-center space-y-2">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t.dashboard.noSavedCourses}
              </p>
              <p className="text-xs text-slate-500">
                {t.dashboard.exploreToSave}
              </p>
            </div>
          </FadeIn>
        ) : (
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCourseObjects.map((course) => (
              <StaggerItem key={course.id}>
                <CourseCard
                  course={course}
                  completedLessonsCount={
                    course.lessons.filter((l) => completedLessons.includes(l.id)).length
                  }
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                  onOpenCourse={(id) => onOpenCourse(id)}
                  language={language}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>

      {/* Saved Lessons (Bookmarks) */}
      <div className="space-y-4">
        <FadeIn direction="up">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500 fill-current" />
            <span>Bookmarked Concepts ({bookmarkedLessonObjects.length})</span>
          </h2>
        </FadeIn>

        {bookmarkedLessonObjects.length === 0 ? (
          <FadeIn direction="up">
            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-sm text-center space-y-2">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                No bookmarked lessons yet.
              </p>
              <p className="text-xs text-slate-500">
                While reading any lesson, click "Bookmark" in the top bar to save it here.
              </p>
            </div>
          </FadeIn>
        ) : (
          <StaggerContainer staggerDelay={0.06} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmarkedLessonObjects.map(({ course, lesson }) => (
              <StaggerItem key={lesson.id}>
                <SpotlightCard className="p-5 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 flex items-center justify-between gap-4 shadow-sm">
                  <div className="min-w-0 space-y-1">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {course.name} &bull; Lesson 0{lesson.number}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white truncate font-display">
                      {lesson.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onToggleBookmark(lesson.id)}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-500 hover:text-rose-500 transition-colors"
                    >
                      Remove
                    </button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => onOpenCourse(course.id, lesson.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs whitespace-nowrap shadow-sm shadow-cyan-500/20"
                    >
                      Open Lesson
                    </motion.button>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>

      {/* Recently Viewed / Started Courses */}
      <div className="space-y-4">
        <FadeIn direction="up">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-500" />
            <span>Tracks In Progress &amp; Active Tracks ({coursesStarted.length})</span>
          </h2>
        </FadeIn>

        {coursesStarted.length === 0 ? (
          <FadeIn direction="up">
            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-sm text-center space-y-3">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Start your first programming track to see your progress telemetry here.
              </p>
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreCourses}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs"
              >
                <Code2 className="w-4 h-4" />
                <span>Browse Programming Tracks</span>
              </motion.button>
            </div>
          </FadeIn>
        ) : (
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesStarted.map((course) => (
              <StaggerItem key={course.id}>
                <CourseCard
                  course={course}
                  completedLessonsCount={
                    course.lessons.filter((l) => completedLessons.includes(l.id)).length
                  }
                  isFavorite={favoriteCourses.includes(course.id)}
                  onToggleFavorite={onToggleFavorite}
                  onOpenCourse={(id) => onOpenCourse(id)}
                  language={language}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
};
