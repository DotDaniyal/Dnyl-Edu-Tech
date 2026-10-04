/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Compass,
  Filter,
  Heart,
  Home,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import {
  COURSES,
  COURSE_CATEGORIES,
  COURSE_DIFFICULTIES,
  getCourseById,
} from './data/coursesData';
import { AppLanguage, TRANSLATIONS } from './data/translations';
import { Course, CourseCategory, CourseDifficulty, LastVisitedLesson } from './types/edu';
import {
  addSearchHistory,
  getBookmarkedLessons,
  getCompletedChallenges,
  getCompletedLessons,
  getFavoriteCourses,
  getHideContinueBanner,
  getLanguage,
  getLastVisitedLesson,
  getRecentCourses,
  getSearchHistory,
  getTheme,
  markChallengeCompleted,
  setHideContinueBanner,
  setLanguage,
  setLastVisitedLesson,
  setTheme,
  toggleBookmarkLesson,
  toggleFavoriteCourse,
  toggleLessonCompletion,
} from './lib/storage';
import { InteractiveBackground } from './components/InteractiveBackground';
import { Navbar, NavPage } from './components/Navbar';
import { CommandSearchModal } from './components/CommandSearchModal';
import { CoursePreviewModal } from './components/CoursePreviewModal';
import { HeroSection } from './components/HeroSection';
import { CourseCard } from './components/CourseCard';
import { LessonViewer } from './components/LessonViewer';
import { PracticeArena } from './components/PracticeArena';
import { MyLearningDashboard } from './components/MyLearningDashboard';
import { ProjectsAndPortfolioSection } from './components/ProjectsAndPortfolioSection';
import { AboutAndBlogSection } from './components/AboutAndBlogSection';
import { Footer } from './components/Footer';
import { PageTransition } from './components/animations/PageTransition';
import { ScrollToTop } from './components/animations/ScrollToTop';
import { CursorGlow } from './components/animations/CursorGlow';
import { FadeIn } from './components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from './components/animations/StaggerContainer';
import { FloatingElement } from './components/animations/FloatingElement';
import { EduTechPreloader } from './components/animations/EduTechPreloader';

export default function App() {
  // Opening Cinematic Preloader State
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Language State (English <-> Roman Urdu)
  const [language, setLanguageState] = useState<AppLanguage>('en');

  // Navigation & Route State
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [activeCourseId, setActiveCourseId] = useState<string>(COURSES[0].id);
  const [activeLessonId, setActiveLessonId] = useState<string>(
    COURSES[0].lessons[0].id
  );
  const [commandSearchOpen, setCommandSearchOpen] = useState(false);

  // Quick Course Preview Modal
  const [previewCourse, setPreviewCourse] = useState<Course | null>(null);

  // Course Catalog Search & Filter State
  const [catalogSearch, setCatalogSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Saved' | CourseCategory>('All');
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
  const [hideContinueBanner, setHideContinueBannerState] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Hydrate all LocalStorage states on mount
  useEffect(() => {
    const initialTheme = getTheme();
    setThemeState(initialTheme);
    setTheme(initialTheme);

    const initialLang = getLanguage();
    setLanguageState(initialLang);

    setCompletedLessons(getCompletedLessons());
    setCompletedChallenges(getCompletedChallenges());
    setFavoriteCourses(getFavoriteCourses());
    setBookmarkedLessons(getBookmarkedLessons());
    setRecentCourses(getRecentCourses());
    setLastVisited(getLastVisitedLesson());
    setRecentCatalogSearches(getSearchHistory());
    setHideContinueBannerState(getHideContinueBanner());
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

  const handleToggleLanguage = () => {
    const next: AppLanguage = language === 'en' ? 'ur' : 'en';
    setLanguageState(next);
    setLanguage(next);
    showToast(next === 'ur' ? 'Roman Urdu zaban muntakhab ki gayi' : 'Switched to English');
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

  // Recommended Course calculation
  const recommendedCourseId = useMemo(() => {
    if (lastVisited?.courseId) {
      const current = getCourseById(lastVisited.courseId);
      if (current?.category === 'Frontend') return 'course-nextjs';
      if (current?.category === 'Programming') return 'course-react';
      if (current?.category === 'Mobile') return 'course-algorithms';
    }
    return 'course-typescript';
  }, [lastVisited]);

  // Filtered Courses for Catalog
  const filteredCourses = useMemo(() => {
    const q = catalogSearch.trim().toLowerCase();
    return COURSES.filter((course) => {
      // Saved filter
      if (selectedCategory === 'Saved' && !favoriteCourses.includes(course.id)) {
        return false;
      }
      const matchesCategory =
        selectedCategory === 'All' ||
        selectedCategory === 'Saved' ||
        course.category === selectedCategory;

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
            l.tenPoints.definition.toLowerCase().includes(q) ||
            l.tenPoints.romanUrduExplanation.toLowerCase().includes(q)
        );

      return matchesCategory && matchesDifficulty && matchesQuery;
    });
  }, [catalogSearch, selectedCategory, selectedDifficulty, favoriteCourses]);

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
      <FadeIn direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.catalog.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            {t.catalog.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            {t.catalog.subtitle}
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums self-start md:self-end">
          {filteredCourses.length} {t.catalog.resultsFound}
        </div>
      </FadeIn>

      {/* Course Search & Filters Bar */}
      <FadeIn direction="up" delay={0.08}>
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-sm space-y-4 shadow-sm">
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
                placeholder={t.catalog.searchPlaceholder}
                aria-label="Search programming courses"
                className="w-full pl-10 pr-16 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                    selectedDifficulty === diff
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {diff === 'All'
                    ? t.catalog.difficultyAll
                    : diff === 'Beginner'
                    ? t.catalog.difficultyBeginner
                    : diff === 'Intermediate'
                    ? t.catalog.difficultyIntermediate
                    : t.catalog.difficultyAdvanced}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Buttons + Saved Filter + Clear Filters */}
          <div className="flex items-center justify-between gap-3 flex-wrap pt-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />

              {/* All button */}
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === 'All'
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t.catalog.filterAll}
              </button>

              {/* Saved Courses Filter button */}
              <button
                type="button"
                onClick={() => setSelectedCategory('Saved')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${
                  selectedCategory === 'Saved'
                    ? 'bg-rose-500 text-white font-semibold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${selectedCategory === 'Saved' ? 'fill-current' : ''}`} />
                <span>{t.catalog.filterSaved} ({favoriteCourses.length})</span>
              </button>

              {COURSE_CATEGORIES.filter((c) => c !== 'All').map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.catalog.clearFilters}</span>
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
      </FadeIn>

      {/* Course Cards Grid or Friendly Empty State */}
      {filteredCourses.length === 0 ? (
        <FadeIn direction="up">
          <div className="p-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-sm text-center space-y-3 shadow-md">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              {selectedCategory === 'Saved'
                ? t.dashboard.noSavedCourses
                : t.catalog.noResultsTitle}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              {selectedCategory === 'Saved'
                ? t.dashboard.exploreToSave
                : t.catalog.noResultsDesc}
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.catalog.resetSearch}</span>
            </button>
          </div>
        </FadeIn>
      ) : (
        <StaggerContainer staggerDelay={0.06} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <StaggerItem key={course.id}>
              <CourseCard
                course={course}
                completedLessonsCount={
                  course.lessons.filter((l) =>
                    completedLessons.includes(l.id) ||
                    completedLessons.includes(`${course.id}:${l.id}`)
                  ).length
                }
                isFavorite={favoriteCourses.includes(course.id)}
                isRecommended={course.id === recommendedCourseId}
                onToggleFavorite={(id) => {
                  handleToggleFavoriteCourse(id);
                  showToast(
                    favoriteCourses.includes(id)
                      ? `Removed ${course.shortName} from Favorites`
                      : `Saved ${course.shortName} to My Favorites!`
                  );
                }}
                onOpenCourse={(id) => handleOpenCourse(id)}
                onPreviewCourse={(c) => setPreviewCourse(c)}
                language={language}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#090d16] text-slate-900 dark:text-slate-100 relative overflow-x-hidden">
      {/* Premium Cinematic Startup Animation */}
      {!preloaderDone && (
        <EduTechPreloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Interactive Developer Mesh Background */}
      <InteractiveBackground />

      {/* Ambient Desktop Cursor Glow */}
      <CursorGlow />

      {/* Top Navigation Bar with Smart Scroll Direction Glass Effect */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onOpenSearch={() => setCommandSearchOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Global Command Search Modal (Ctrl + K / Cmd + K) */}
      <CommandSearchModal
        isOpen={commandSearchOpen}
        onClose={() => setCommandSearchOpen(false)}
        onSelectCourse={handleOpenCourse}
        onNavigate={setCurrentPage}
        language={language}
        onToggleTheme={handleToggleTheme}
        onToggleLanguage={handleToggleLanguage}
        theme={theme}
      />

      {/* Course Quick Outline Preview Modal */}
      <CoursePreviewModal
        course={previewCourse}
        isOpen={Boolean(previewCourse)}
        onClose={() => setPreviewCourse(null)}
        completedLessons={completedLessons}
        isFavorite={previewCourse ? favoriteCourses.includes(previewCourse.id) : false}
        onToggleFavorite={handleToggleFavoriteCourse}
        onStartCourse={handleOpenCourse}
        language={language}
      />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />

      {/* Toast Notification with Motion AnimatePresence */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border border-cyan-500/40 bg-slate-900 text-slate-100 shadow-2xl text-xs sm:text-sm font-medium backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              aria-label="Dismiss notification"
              className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area with Smooth Page Transitions */}
      <main id="main-content" className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <PageTransition pageKey="home">
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
                language={language}
                hideContinueBanner={hideContinueBanner}
                onDismissContinueBanner={() => {}}
                onDontShowAgainContinueBanner={() => setHideContinueBannerState(true)}
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
            </PageTransition>
          )}

          {currentPage === 'courses' && (
            <PageTransition pageKey="courses">
              <div className="pt-20">
                {renderCourseCatalogSection(true)}
              </div>
            </PageTransition>
          )}

          {currentPage === 'course-detail' && (
            <PageTransition pageKey="course-detail">
              <div className="pt-20">
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
              </div>
            </PageTransition>
          )}

          {currentPage === 'practice' && (
            <PageTransition pageKey="practice">
              <div className="pt-20">
                <PracticeArena
                  completedChallenges={completedChallenges}
                  onMarkChallengeComplete={handleMarkChallengeComplete}
                  onOpenLesson={handleOpenCourse}
                  onToast={showToast}
                />
              </div>
            </PageTransition>
          )}

          {currentPage === 'learning' && (
            <PageTransition pageKey="learning">
              <div className="pt-20">
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
                  language={language}
                />
              </div>
            </PageTransition>
          )}

          {currentPage === 'projects' && (
            <PageTransition pageKey="projects">
              <div className="pt-20">
                <ProjectsAndPortfolioSection onOpenCourse={handleOpenCourse} />
              </div>
            </PageTransition>
          )}

          {currentPage === 'blog' && (
            <PageTransition pageKey="blog">
              <div className="pt-20">
                <AboutAndBlogSection
                  mode="blog-only"
                  onOpenCourse={handleOpenCourse}
                  onExploreCourses={() => setCurrentPage('courses')}
                  onToast={showToast}
                />
              </div>
            </PageTransition>
          )}

          {currentPage === 'about' && (
            <PageTransition pageKey="about">
              <div className="pt-20">
                <AboutAndBlogSection
                  mode="full"
                  onOpenCourse={handleOpenCourse}
                  onExploreCourses={() => setCurrentPage('courses')}
                  onToast={showToast}
                />
              </div>
            </PageTransition>
          )}

          {/* 404 Experience */}
          {currentPage === '404' && (
            <PageTransition pageKey="404">
              <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center space-y-6">
                <FloatingElement distance={8} duration={4}>
                  <div className="font-mono text-sm font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 inline-block px-3 py-1 rounded-full">
                    404 NOT FOUND
                  </div>
                </FloatingElement>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display">
                  Lost in the Code?
                </h1>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
                  This page doesn't exist, but there's plenty left to learn in the curriculum.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCurrentPage('courses')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm shadow-md shadow-cyan-500/20"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Explore Courses</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCurrentPage('home')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm"
                  >
                    <Home className="w-4 h-4" />
                    <span>Go Home</span>
                  </motion.button>
                </div>
              </section>
            </PageTransition>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setCurrentPage}
        language={language}
        onReplayIntro={() => {
          setPreloaderDone(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
