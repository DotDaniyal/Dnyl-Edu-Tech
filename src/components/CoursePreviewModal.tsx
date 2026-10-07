/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Heart,
  Sparkles,
  X,
} from 'lucide-react';
import { Course } from '../types/edu';
import { AppLanguage, TRANSLATIONS } from '../data/translations';
import { renderCourseIcon } from './CourseCard';

interface CoursePreviewModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  completedLessons: string[];
  isFavorite: boolean;
  onToggleFavorite: (courseId: string) => void;
  onStartCourse: (courseId: string, lessonId?: string) => void;
  language: AppLanguage;
}

export const CoursePreviewModal: React.FC<CoursePreviewModalProps> = ({
  course,
  isOpen,
  onClose,
  completedLessons,
  isFavorite,
  onToggleFavorite,
  onStartCourse,
  language,
}) => {
  const t = TRANSLATIONS[language];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!course) return null;

  const totalMinutes = course.lessons.reduce((acc, l) => acc + (l.durationMinutes || 15), 0);
  const completedCount = course.lessons.filter((l) =>
    completedLessons.includes(l.id) || completedLessons.includes(`${course.id}:${l.id}`)
  ).length;
  const progressPct = course.lessons.length > 0
    ? Math.round((completedCount / course.lessons.length) * 100)
    : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="course-preview-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.1 }}
            className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[88vh] flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c121e] text-slate-900 dark:text-white shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 sm:gap-4 bg-slate-50/70 dark:bg-slate-900/40">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                  {renderCourseIcon(course.iconName, 'w-6 h-6')}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                    <span>{course.category}</span>
                    <span aria-hidden="true">&bull;</span>
                    <span>{course.difficulty}</span>
                    <span aria-hidden="true">&bull;</span>
                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-normal">
                      <Clock className="w-3 h-3" />
                      <span>{totalMinutes} {t.common.minutesShort}</span>
                    </span>
                  </div>
                  <h2
                    id="course-preview-title"
                    className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white truncate font-display"
                  >
                    {course.name}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onToggleFavorite(course.id)}
                  aria-label={isFavorite ? t.courseCard.unsaveCourse : t.courseCard.saveCourse}
                  className={`p-2 rounded-xl border text-xs font-medium transition-colors ${
                    isFavorite
                      ? 'border-rose-500/40 bg-rose-500/10 text-rose-500'
                      : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t.common.close}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Track Overview
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Topics Breakdown */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  Key Skills &amp; Concepts
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lesson Curriculum List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Curriculum ({course.lessons.length} {t.courseCard.lessons})
                  </h3>
                  <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                    {completedCount}/{course.lessons.length} ({progressPct}%)
                  </span>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {course.lessons.map((lesson, idx) => {
                    const isLessonDone =
                      completedLessons.includes(lesson.id) ||
                      completedLessons.includes(`${course.id}:${lesson.id}`);

                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => {
                          onClose();
                          onStartCourse(course.id, lesson.id);
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all text-left group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-[11px] font-mono font-bold flex items-center justify-center text-slate-600 dark:text-slate-400 shrink-0 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900 dark:text-white truncate text-xs sm:text-sm">
                              {lesson.title}
                            </div>
                            <div className="text-[11px] text-slate-500 truncate">
                              {lesson.summary}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          {isLessonDone ? (
                            <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Done</span>
                            </span>
                          ) : (
                            <span className="text-[11px] font-mono text-slate-400">
                              {lesson.durationMinutes || 15}m
                            </span>
                          )}
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {t.common.close}
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartCourse(course.id);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>
                  {progressPct > 0 ? t.courseCard.continueCourse : t.courseCard.startCourse}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
