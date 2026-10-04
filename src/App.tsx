/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Compass,
  Filter,
  Home,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import {
  COURSES,
  COURSE_CATEGORIES,
  COURSE_DIFFICULTIES,
  getCourseById,
} from './data/coursesData';
import { CourseCategory, CourseDifficulty, LastVisitedLesson } from './types/edu';
import {
  addSearchHistory,
  getBookmarkedLessons,
  getCompletedChallenges,
  getCompletedLessons,
  getFavoriteCourses,
  getLastVisitedLesson,
  getRecentCourses,
  getSearchHistory,
  getTheme,
  markChallengeCompleted,
  setLastVisitedLesson,
  setTheme,
  toggleBookmarkLesson,
  toggleFavoriteCourse,
  toggleLessonCompletion,
} from './lib/storage';
import { InteractiveBackground } from './components/InteractiveBackground';
import { Navbar, NavPage } from './components/Navbar';
import { CommandSearchModal } from './components/CommandSearchModal';
import { HeroSection } from './components/HeroSection';
import { CourseCard } from './components/CourseCard';
import { LessonViewer } from './components/LessonViewer';
import { PracticeArena } from './components/PracticeArena';
import { MyLearningDashboard } from './components/MyLearningDashboard';
import { ProjectsAndPortfolioSection } from './components/ProjectsAndPortfolioSection';
import { AboutAndBlogSection } from './components/AboutAndBlogSection';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Route State
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [activeCourseId, setActiveCourseId] = useState<string>(COURSES[0].id);
  const [activeLessonId, setActiveLessonId] = useState<string>(
    COURSES[0].lessons[0].id
  );
  const [commandSearchOpen, setCommandSearchOpen] = useState(false);

  // Course Catalog Search & Filter State
  const [catalogSearch, setCatalogSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | CourseCategory>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | CourseDifficulty>('All');
  const [recentCatalogSearches, setRecentCatalogSearches] = useState<string[]>([]);

  // LocalStorage Persisted State
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [favoriteCourses, setFavoriteCourses] = useState<string[]>([]);
  const [bookmarkedLessons, setBookmarkedLessons] = useState<string[]>([]);
  const [recentCourses, setRecentCourses] = useState<string[]>([]);
  const [lastVisited, setLastVisited] = useState<LastVisitedLesson | null>(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Hydrate all LocalStorage states on mount
  useEffect(() => {
    const initialTheme = getTheme();
    setThemeState(initialTheme);
    setTheme(initialTheme);
    setCompletedLessons(getCompletedLessons());
    setCompletedChallenges(getCompletedChallenges());
    setFavoriteCourses(getFavoriteCourses());
    setBookmarkedLessons(getBookmarkedLessons());
    setRecentCourses(getRecentCourses());
    setLastVisited(getLastVisitedLesson());
    setRecentCatalogSearches(getSearchHistory());
  }, []);

  // Global Command Search Keyboard Shortcut (Ctrl + K / Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setThemeState(next);
    setTheme(next);
    showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`);
  };

  const handleOpenCourse = (courseId: string, lessonId?: string) => {
    const course = getCourseById(courseId);
    if (!course) {
      setCurrentPage('404');
      return;
    }
    const targetLesson =
      (lessonId && course.lessons.find((l) => l.id === lessonId)) ||
      course.lessons[0];

    setActiveCourseId(course.id);
    setActiveLessonId(targetLesson.id);
    setCurrentPage('course-detail');

    const visitedRecord: LastVisitedLesson = {
      courseId: course.id,
      courseSlug: course.slug,
      courseName: course.shortName,
      lessonId: targetLesson.id,
      lessonTitle: targetLesson.title,
      timestamp: Date.now(),
    };
    setLastVisitedLesson(visitedRecord);
    setLastVisited(visitedRecord);
    setRecentCourses(getRecentCourses());
  };

  const handleSelectLessonInCourse = (lessonId: string) => {
    const course = getCourseById(activeCourseId);
    if (!course) return;
    const lesson = course.lessons.find((l) => l.id === lessonId);
    if (!lesson) return;

    setActiveLessonId(lesson.id);
    const visitedRecord: LastVisitedLesson = {
      courseId: course.id,
      courseSlug: course.slug,
      courseName: course.shortName,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      timestamp: Date.now(),
    };
    setLastVisitedLesson(visitedRecord);
    setLastVisited(visitedRecord);
  };

  const handleToggleCompleteLesson = (lessonId: string, courseId: string) => {
    const updated = toggleLessonCompletion(lessonId, courseId);
    setCompletedLessons(updated);
  };

  const handleMarkChallengeComplete = (challengeId: string) => {
    const updated = markChallengeCompleted(challengeId);
    setCompletedChallenges(updated);
  };

  const handleToggleFavoriteCourse = (courseId: string) => {
    const updated = toggleFavoriteCourse(courseId);
    setFavoriteCourses(updated);
  };

  const handleToggleBookmarkLesson = (lessonId: string) => {
    const updated = toggleBookmarkLesson(lessonId);
    setBookmarkedLessons(updated);
  };

  // Filtered Courses for Catalog
  const filteredCourses = useMemo(() => {
    const q = catalogSearch.trim().toLowerCase();
    return COURSES.filter((course) => {
      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
      const matchesQuery =
        !q ||
        course.name.toLowerCase().includes(q) ||
        course.shortName.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.topics.some((t) => t.toLowerCase().includes(q)) ||
        course.lessons.some(
          (l) =>
            l.title.toLowerCase().includes(q) ||
            l.tenPoints.definition.toLowerCase().includes(q)
        );

      return matchesCategory && matchesDifficulty && matchesQuery;
    });
  }, [catalogSearch, selectedCategory, selectedDifficulty]);

  const hasActiveFilters =
    catalogSearch.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedDifficulty !== 'All';

  const handleClearFilters = () => {
    setCatalogSearch('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
  };

  const activeCourse = getCourseById(activeCourseId) || COURSES[0];

  const renderCourseCatalogSection = (showFullHeader = false) => (
    <section
      id="explore-programming-tracks"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            Structured 10-Point Curriculum &amp; Roman Urdu Support
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            {showFullHeader ? 'Explore Programming Tracks' : 'Explore Programming Tracks'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            Every track is structured around Daniyal Edu Tech’s 10-Point Learning System — covering definitions, Roman Urdu intuition, internal workings, common mistakes, and live coding practice.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums self-start md:self-end">
          Showing {filteredCourses.length} of {COURSES.length} tracks
        </div>
      </div>

      {/* Course Search & Filters Bar */}
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={catalogSearch}
              onChange={(e) => setCatalogSearch(e.target.value)}
              onBlur={() => {
                if (catalogSearch.trim().length >= 2) {
                  setRecentCatalogSearches(addSearchHistory(catalogSearch));
                }
              }}
              placeholder="Search by course, technology, topic, lesson, or concept..."
              aria-label="Search programming courses"
              className="w-full pl-10 pr-16 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
            />
            {catalogSearch && (
              <button
                type="button"
                onClick={() => setCatalogSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto">
            {COURSE_DIFFICULTIES.map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedDifficulty === diff
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Buttons + Clear Filters */}
        <div className="flex items-center justify-between gap-3 flex-wrap pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
            {COURSE_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-cyan-500 text-slate-950 font-semibold'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        {/* Recent Searches */}
        {recentCatalogSearches.length > 0 && !catalogSearch && (
          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2 flex-wrap text-xs text-slate-500">
            <span>Recent searches:</span>
            {recentCatalogSearches.slice(0, 5).map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setCatalogSearch(term)}
                className="text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                {term}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Course Cards Grid or Friendly Empty State */}
      {filteredCourses.length === 0 ? (
        <div className="p-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] text-center space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No matching programming tracks found
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            We couldn’t find any tracks matching "{catalogSearch}" with the selected filters. Reset your filters to browse all {COURSES.length} tracks.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              completedLessonsCount={
                course.lessons.filter((l) => completedLessons.includes(l.id)).length
              }
              isFavorite={favoriteCourses.includes(course.id)}
              onToggleFavorite={(id) => {
                handleToggleFavoriteCourse(id);
                showToast(
                  favoriteCourses.includes(id)
                    ? `Removed ${course.shortName} from Favorites`
                    : `Saved ${course.shortName} to My Favorites!`
                );
              }}
              onOpenCourse={(id) => handleOpenCourse(id)}
            />
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#090d16] text-slate-900 dark:text-slate-100 relative overflow-x-hidden">
      {/* Subtle Developer Interactive Background */}
      <InteractiveBackground />

      {/* Top Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onOpenSearch={() => setCommandSearchOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Global Command Search Modal (Ctrl + K / Cmd + K) */}
      <CommandSearchModal
        isOpen={commandSearchOpen}
        onClose={() => setCommandSearchOpen(false)}
        onSelectCourse={handleOpenCourse}
        onNavigate={setCurrentPage}
      />

      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border border-cyan-500/40 bg-slate-900 text-slate-100 shadow-xl text-xs sm:text-sm font-medium"
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            aria-label="Dismiss notification"
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main id="main-content" className="relative z-10 flex-1">
        {currentPage === 'home' && (
          <>
            <HeroSection
              onStartLearning={() =>
                lastVisited
                  ? handleOpenCourse(lastVisited.courseId, lastVisited.lessonId)
                  : handleOpenCourse(COURSES[0].id)
              }
              onExploreCourses={() => {
                const el = document.getElementById('explore-programming-tracks');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              lastVisitedLesson={lastVisited}
              onContinueLesson={handleOpenCourse}
            />

            {/* Course Catalog */}
            {renderCourseCatalogSection(false)}

            {/* Meet Daniyal, Skills, 4 Principles & 10-Point System */}
            <AboutAndBlogSection
              mode="home-summary"
              onOpenCourse={handleOpenCourse}
              onExploreCourses={() => setCurrentPage('courses')}
              onToast={showToast}
            />

            {/* Built by Daniyal, Learn Through Real Projects & Portfolio Integration */}
            <ProjectsAndPortfolioSection onOpenCourse={handleOpenCourse} />

            {/* Blog, About Platform, Newsletter & Contact */}
            <AboutAndBlogSection
              mode="blog-only"
              onOpenCourse={handleOpenCourse}
              onExploreCourses={() => setCurrentPage('courses')}
              onToast={showToast}
            />
          </>
        )}

        {currentPage === 'courses' && renderCourseCatalogSection(true)}

        {currentPage === 'course-detail' && (
          <LessonViewer
            course={activeCourse}
            activeLessonId={activeLessonId}
            onSelectLesson={handleSelectLessonInCourse}
            onBackToCatalog={() => setCurrentPage('courses')}
            completedLessons={completedLessons}
            onToggleCompleteLesson={handleToggleCompleteLesson}
            completedChallenges={completedChallenges}
            onMarkChallengeComplete={handleMarkChallengeComplete}
            bookmarkedLessons={bookmarkedLessons}
            onToggleBookmark={handleToggleBookmarkLesson}
            isFavoriteCourse={favoriteCourses.includes(activeCourse.id)}
            onToggleFavoriteCourse={handleToggleFavoriteCourse}
            onToast={showToast}
          />
        )}

        {currentPage === 'practice' && (
          <PracticeArena
            completedChallenges={completedChallenges}
            onMarkChallengeComplete={handleMarkChallengeComplete}
            onOpenLesson={handleOpenCourse}
            onToast={showToast}
          />
        )}

        {currentPage === 'learning' && (
          <MyLearningDashboard
            completedLessons={completedLessons}
            completedChallenges={completedChallenges}
            favoriteCourses={favoriteCourses}
            bookmarkedLessons={bookmarkedLessons}
            recentCourses={recentCourses}
            lastVisitedLesson={lastVisited}
            onOpenCourse={handleOpenCourse}
            onToggleFavorite={handleToggleFavoriteCourse}
            onToggleBookmark={handleToggleBookmarkLesson}
            onExploreCourses={() => setCurrentPage('courses')}
          />
        )}

        {currentPage === 'projects' && (
          <ProjectsAndPortfolioSection onOpenCourse={handleOpenCourse} />
        )}

        {currentPage === 'blog' && (
          <AboutAndBlogSection
            mode="blog-only"
            onOpenCourse={handleOpenCourse}
            onExploreCourses={() => setCurrentPage('courses')}
            onToast={showToast}
          />
        )}

        {currentPage === 'about' && (
          <AboutAndBlogSection
            mode="full"
            onOpenCourse={handleOpenCourse}
            onExploreCourses={() => setCurrentPage('courses')}
            onToast={showToast}
          />
        )}

        {/* Section 41: Custom 404 Experience */}
        {currentPage === '404' && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-6">
            <div className="font-mono text-sm font-bold text-cyan-500">404 NOT FOUND</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display">
              Lost in the Code?
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              This page doesn't exist, but there's plenty left to learn.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('courses')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Courses</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('home')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm"
              >
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}
