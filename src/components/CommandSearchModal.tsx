import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, BookOpen, Clock, Code2, FolderGit2, Search, Trash2, X } from 'lucide-react';
import { COURSES, getAllLessons } from '../data/coursesData';
import { REAL_PROJECTS } from '../data/daniyalData';
import { addSearchHistory, clearSearchHistory, getSearchHistory } from '../lib/storage';
import { NavPage } from './Navbar';

interface CommandSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: (courseId: string, lessonId?: string) => void;
  onNavigate: (page: NavPage) => void;
}

export const CommandSearchModal: React.FC<CommandSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCourse,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setRecentSearches(getSearchHistory());
      setTimeout(() => inputRef.current?.focus(), 40);
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

    return { courses, lessons, projects };
  }, [query]);

  if (!isOpen) return null;

  const totalMatches =
    results.courses.length + results.lessons.length + results.projects.length;

  const handleChooseCourse = (courseId: string, lessonId?: string) => {
    if (query.trim().length >= 2) {
      setRecentSearches(addSearchHistory(query));
    }
    onSelectCourse(courseId, lessonId);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Global Command Search"
      className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-slate-950/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] shadow-2xl overflow-hidden"
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
            placeholder="Search courses, lessons, Roman Urdu concepts, or Daniyal's projects..."
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
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Recent Searches */}
        {!query && recentSearches.length > 0 && (
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-500">Recent:</span>
              {recentSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setQuery(item)}
                  className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setRecentSearches(clearSearchHistory())}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>
        )}

        {/* Results Container */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-5">
          {query && (
            <div className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
              Found {totalMatches} matching result{totalMatches === 1 ? '' : 's'} for "{query}"
            </div>
          )}

          {totalMatches === 0 ? (
            <div className="py-10 text-center space-y-3">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                No courses, lessons, or projects matched "{query}".
              </p>
              <p className="text-xs text-slate-500">
                Try searching for JavaScript, TypeScript, React, Kotlin, SQL, or Mystic Match.
              </p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-xs"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <>
              {/* Courses */}
              {results.courses.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Programming Tracks ({results.courses.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.courses.map((course) => (
                      <button
                        key={course.id}
                        type="button"
                        onClick={() => handleChooseCourse(course.id)}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 transition-colors truncate">
                            {course.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {course.category} · {course.difficulty} · {course.lessons.length} lessons
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Lessons */}
              {results.lessons.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-cyan-500" />
                    <span>10-Point Interactive Lessons ({results.lessons.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.lessons.map(({ course, lesson }) => (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => handleChooseCourse(course.id, lesson.id)}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-cyan-400 truncate">
                            {lesson.title}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {course.shortName} · Lesson 0{lesson.number} · {lesson.durationMinutes} min read
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Real Projects */}
              {results.projects.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Real Projects Built by Daniyal ({results.projects.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.projects.map((proj) => (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => {
                          onNavigate('projects');
                          onClose();
                        }}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-cyan-400 truncate">
                            {proj.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {proj.category} · {proj.language}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Keyboard Hints */}
        <div className="px-4 py-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between text-xs text-slate-500">
          <span>Click any item to jump directly to the lesson or track</span>
          <span className="font-mono">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
