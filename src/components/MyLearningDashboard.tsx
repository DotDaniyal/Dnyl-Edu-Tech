import React from 'react';
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  CheckCircle2,
  Code2,
  Heart,
  RotateCcw,
} from 'lucide-react';
import { COURSES, getAllLessons } from '../data/coursesData';
import { LastVisitedLesson } from '../types/edu';
import { CourseCard } from './CourseCard';

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
}) => {
  const allLessons = getAllLessons();
  const totalLessonsCount = allLessons.length;
  const overallProgressPercent =
    totalLessonsCount > 0
      ? Math.round((completedLessons.length / totalLessonsCount) * 100)
      : 0;

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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            LocalStorage-Persisted Learning Telemetry
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            My Learning
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            Track your completed lessons, coding challenges, favorite programming tracks, and bookmarked concepts — saved locally in your browser.
          </p>
        </div>

        <button
          type="button"
          onClick={onExploreCourses}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm whitespace-nowrap self-start"
        >
          <span>Explore All Tracks</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] space-y-1">
          <div className="text-xs text-slate-500 dark:text-slate-400">Overall Progress</div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-600 dark:text-cyan-400 tabular-nums">
            {overallProgressPercent}%
          </div>
          <div className="text-xs text-slate-400 tabular-nums">
            {completedLessons.length} of {totalLessonsCount} lessons
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] space-y-1">
          <div className="text-xs text-slate-500 dark:text-slate-400">Courses Started</div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {coursesStarted.length}
          </div>
          <div className="text-xs text-slate-400 tabular-nums">
            Out of {COURSES.length} tracks
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] space-y-1">
          <div className="text-xs text-slate-500 dark:text-slate-400">Courses Completed</div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            {coursesCompleted.length}
          </div>
          <div className="text-xs text-slate-400">100% finished tracks</div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] space-y-1">
          <div className="text-xs text-slate-500 dark:text-slate-400">Lessons Completed</div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {completedLessons.length}
          </div>
          <div className="text-xs text-slate-400">10-Point modules</div>
        </div>

        <div className="col-span-2 lg:col-span-1 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] space-y-1">
          <div className="text-xs text-slate-500 dark:text-slate-400">Practice Solved</div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-500 tabular-nums">
            {completedChallenges.length}
          </div>
          <div className="text-xs text-slate-400">Coding challenges</div>
        </div>
      </div>

      {/* Continue Learning Card */}
      {lastVisitedLesson && (
        <div className="p-6 rounded-2xl border border-cyan-500/40 bg-cyan-500/5 dark:bg-cyan-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Continue Learning</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Continue {lastVisitedLesson.courseName} — {lastVisitedLesson.lessonTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={() =>
              onOpenCourse(lastVisitedLesson.courseId, lastVisitedLesson.lessonId)
            }
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm whitespace-nowrap shrink-0"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* My Favorites Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <span>My Favorites ({favoriteCourseObjects.length})</span>
          </h2>
        </div>

        {favoriteCourseObjects.length === 0 ? (
          <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] text-center space-y-2">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              You have not favorited any courses yet.
            </p>
            <p className="text-xs text-slate-500">
              Click "♡ Favorite" on any course card to save it here for quick access.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCourseObjects.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                completedLessonsCount={
                  course.lessons.filter((l) => completedLessons.includes(l.id)).length
                }
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
                onOpenCourse={(id) => onOpenCourse(id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Saved Lessons (Bookmarks) */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-amber-500 fill-current" />
          <span>Saved Lessons ({bookmarkedLessonObjects.length})</span>
        </h2>

        {bookmarkedLessonObjects.length === 0 ? (
          <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] text-center space-y-2">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              No bookmarked lessons yet.
            </p>
            <p className="text-xs text-slate-500">
              While reading any lesson, click "Bookmark" in the top bar to save it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmarkedLessonObjects.map(({ course, lesson }) => (
              <div
                key={lesson.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] flex items-center justify-between gap-4"
              >
                <div className="min-w-0 space-y-1">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {course.name} · Lesson 0{lesson.number}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                    {lesson.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onToggleBookmark(lesson.id)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-500 hover:text-rose-500"
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenCourse(course.id, lesson.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-xs whitespace-nowrap"
                  >
                    Open Lesson
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recently Viewed / Started Courses */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-500" />
          <span>Courses In Progress &amp; Recently Viewed ({coursesStarted.length})</span>
        </h2>

        {coursesStarted.length === 0 ? (
          <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] text-center space-y-3">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Start your first programming track to see your progress here.
            </p>
            <button
              type="button"
              onClick={onExploreCourses}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs"
            >
              <Code2 className="w-4 h-4" />
              <span>Browse Programming Tracks</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesStarted.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                completedLessonsCount={
                  course.lessons.filter((l) => completedLessons.includes(l.id)).length
                }
                isFavorite={favoriteCourses.includes(course.id)}
                onToggleFavorite={onToggleFavorite}
                onOpenCourse={(id) => onOpenCourse(id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
