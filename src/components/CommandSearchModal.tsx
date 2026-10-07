/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  Clock,
  Code2,
  FileText,
  FolderGit2,
  Globe,
  Moon,
  Search,
  Sparkles,
  Sun,
  Trash2,
  X,
} from 'lucide-react';
import { COURSES, getAllLessons } from '../data/coursesData';
import { ENGINEERING_ARTICLES, REAL_PROJECTS } from '../data/daniyalData';
import { AppLanguage, TRANSLATIONS } from '../data/translations';
import { addSearchHistory, clearSearchHistory, getSearchHistory } from '../lib/storage';
import { NavPage } from './Navbar';

interface CommandSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: (courseId: string, lessonId?: string) => void;
  onNavigate: (page: NavPage) => void;
  language?: AppLanguage;
  onToggleTheme?: () => void;
  onToggleLanguage?: () => void;
  theme?: 'dark' | 'light';
}

export const CommandSearchModal: React.FC<CommandSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCourse,
  onNavigate,
  language = 'en',
  onToggleTheme,
  onToggleLanguage,
  theme = 'dark',
}) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (isOpen) {
      setRecentSearches(getSearchHistory());
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        courses: COURSES.slice(0, 4),
        lessons: getAllLessons().slice(0, 4),
        projects: REAL_PROJECTS.slice(0, 3),
        articles: ENGINEERING_ARTICLES.slice(0, 2),
      };
    }

    const courses = COURSES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.topics.some((t) => t.toLowerCase().includes(q))
    );

    const lessons = getAllLessons().filter(
      ({ course, lesson }) =>
        lesson.title.toLowerCase().includes(q) ||
        lesson.summary.toLowerCase().includes(q) ||
        lesson.tenPoints.definition.toLowerCase().includes(q) ||
        lesson.tenPoints.romanUrduExplanation.toLowerCase().includes(q) ||
        course.shortName.toLowerCase().includes(q)
    );

    const projects = REAL_PROJECTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    );

    const articles = ENGINEERING_ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );

    return { courses, lessons, projects, articles };
  }, [query]);

  const handleChooseCourse = (courseId: string, lessonId?: string) => {
    if (query.trim().length >= 2) {
      setRecentSearches(addSearchHistory(query));
    }
    onSelectCourse(courseId, lessonId);
    onClose();
  };

  const hasAnyResults =
    results.courses.length > 0 ||
    results.lessons.length > 0 ||
    results.projects.length > 0 ||
    results.articles.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.searchModal.title}
          className="fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-16 md:pt-20 px-3 sm:px-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="relative w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] shadow-2xl overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Search Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
              <Search className="w-5 h-5 text-cyan-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchModal.placeholder}
                className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search query"
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close command search"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions Shortcuts Bar */}
            <div className="px-4 py-2 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/40 flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
                Quick Actions:
              </span>
              {onToggleTheme && (
                <button
                  type="button"
                  onClick={() => {
                    onToggleTheme();
                    onClose();
                  }}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-cyan-500/40 shrink-0 flex items-center gap-1.5 font-medium transition-colors"
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              )}
              {onToggleLanguage && (
                <button
                  type="button"
                  onClick={() => {
                    onToggleLanguage();
                    onClose();
                  }}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-cyan-500/40 shrink-0 flex items-center gap-1.5 font-medium transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{language === 'en' ? 'Roman Urdu' : 'English'}</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  onNavigate('learning');
                  onClose();
                }}
                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-cyan-500/40 shrink-0 flex items-center gap-1.5 font-medium transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                <span>My Learning</span>
              </button>
            </div>

            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-500">{t.searchModal.recentSearches}:</span>
                  {recentSearches.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:text-cyan-500"
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    clearSearchHistory();
                    setRecentSearches([]);
                  }}
                  className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>{t.searchModal.clearHistory}</span>
                </button>
              </div>
            )}

            {/* Results Body */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6 divide-y divide-slate-100 dark:divide-slate-800/60">
              {!hasAnyResults && (
                <div className="py-12 text-center space-y-2">
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t.searchModal.noResults}
                  </div>
                  <p className="text-xs text-slate-500">
                    Try searching for "React", "State Machine", "Kotlin", or "CSS".
                  </p>
                </div>
              )}

              {/* Courses */}
              {results.courses.length > 0 && (
                <div className="space-y-2 pt-2 first:pt-0">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
                    <span>{t.searchModal.courses} ({results.courses.length})</span>
                  </div>
                  <div className="space-y-1">
                    {results.courses.map((course) => (
                      <button
                        key={course.id}
                        type="button"
                        onClick={() => handleChooseCourse(course.id)}
                        className="w-full text-left p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-colors flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs text-slate-400 font-medium">
                              {course.category} &bull; {course.difficulty}
                            </div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 truncate">
                              {course.name}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Lessons */}
              {results.lessons.length > 0 && (
                <div className="space-y-2 pt-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
                    <span>{t.searchModal.lessons} ({results.lessons.length})</span>
                  </div>
                  <div className="space-y-1">
                    {results.lessons.slice(0, 6).map(({ course, lesson }) => (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => handleChooseCourse(course.id, lesson.id)}
                        className="w-full text-left p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-colors flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                            <Code2 className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs text-slate-400">
                              {course.name} &bull; Lesson 0{lesson.number}
                            </div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 truncate">
                              {lesson.title}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 group-hover:text-cyan-500 whitespace-nowrap">
                          {lesson.durationMinutes || 15}m read &rarr;
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {results.projects.length > 0 && (
                <div className="space-y-2 pt-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
                    <span>{t.searchModal.projects} ({results.projects.length})</span>
                  </div>
                  <div className="space-y-1">
                    {results.projects.map((project) => (
                      <div
                        key={project.id}
                        className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-colors flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
                            <FolderGit2 className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 truncate">
                              {project.name}
                            </div>
                            <div className="text-xs text-slate-400 truncate">
                              {project.description}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onNavigate('projects');
                            onClose();
                          }}
                          className="text-xs font-semibold text-cyan-500 hover:text-cyan-400 whitespace-nowrap"
                        >
                          View Project &rarr;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles */}
              {results.articles.length > 0 && (
                <div className="space-y-2 pt-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
                    <span>{t.searchModal.articles} ({results.articles.length})</span>
                  </div>
                  <div className="space-y-1">
                    {results.articles.map((article) => (
                      <div
                        key={article.id}
                        className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-colors flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 truncate">
                              {article.title}
                            </div>
                            <div className="text-xs text-slate-400 truncate">
                              {article.excerpt}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onNavigate('blog');
                            onClose();
                          }}
                          className="text-xs font-semibold text-cyan-500 hover:text-cyan-400 whitespace-nowrap"
                        >
                          Read &rarr;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Key Hints */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
              <span>{t.searchModal.navigateTip} cursor / tab</span>
              <div className="flex items-center gap-2">
                <span>ESC {t.searchModal.closeTip}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
