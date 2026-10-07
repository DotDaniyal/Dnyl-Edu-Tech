/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Atom,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  Eye,
  FileCode2,
  GitBranch,
  Heart,
  Layers,
  Layout,
  Palette,
  Server,
  Smartphone,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { Course } from '../types/edu';
import { AppLanguage, TRANSLATIONS } from '../data/translations';
import { SpotlightCard } from './animations/SpotlightCard';

interface CourseCardProps {
  course: Course;
  completedLessonsCount: number;
  isFavorite: boolean;
  isRecommended?: boolean;
  onToggleFavorite: (courseId: string) => void;
  onOpenCourse: (courseId: string) => void;
  onPreviewCourse?: (course: Course) => void;
  language?: AppLanguage;
}

export function renderCourseIcon(iconName: string, className = 'w-5 h-5') {
  switch (iconName) {
    case 'Terminal':
      return <Terminal className={className} />;
    case 'FileCode2':
      return <FileCode2 className={className} />;
    case 'Atom':
      return <Atom className={className} />;
    case 'Layout':
      return <Layout className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Smartphone':
      return <Smartphone className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Server':
      return <Server className={className} />;
    case 'Database':
      return <Database className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'GitBranch':
      return <GitBranch className={className} />;
    default:
      return <Terminal className={className} />;
  }
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  completedLessonsCount,
  isFavorite,
  isRecommended = false,
  onToggleFavorite,
  onOpenCourse,
  onPreviewCourse,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language];
  const totalLessons = course.lessons.length;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;
  const isCompleted = progressPercent === 100;
  const totalDuration = course.lessons.reduce(
    (acc, l) => acc + (l.durationMinutes || 15),
    0
  );

  return (
    <SpotlightCard
      spotlightColor="rgba(6, 182, 212, 0.14)"
      borderColor="rgba(6, 182, 212, 0.3)"
      className="group relative flex flex-col justify-between p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white/95 dark:bg-[#0d1322]/95 backdrop-blur-sm hover:border-cyan-500/60 dark:hover:border-cyan-500/60 transition-all duration-200 shadow-sm hover:shadow-md"
    >
      {/* Recommended Tag */}
      {isRecommended && (
        <div className="absolute -top-3 left-4 sm:left-6 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-bold text-[10px] tracking-wide uppercase shadow-md shadow-cyan-500/20 z-10">
          <Sparkles className="w-3 h-3 shrink-0" />
          <span>{t.catalog.recommendedBadge}</span>
        </div>
      )}

      <div>
        {/* Top Row: Icon + Metadata + Favorite Button */}
        <div className="flex items-start justify-between gap-2.5 mb-3.5 sm:mb-4">
          <div className="flex items-start gap-3 min-w-0">
            <motion.div
              whileHover={{ rotate: 6, scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 shadow-sm mt-0.5"
            >
              {renderCourseIcon(course.iconName, 'w-5 h-5')}
            </motion.div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 truncate font-medium mb-0.5">
                <span>{course.category}</span>
                <span aria-hidden="true">&bull;</span>
                <span>{course.difficulty}</span>
                <span aria-hidden="true">&bull;</span>
                <span className="flex items-center gap-1 tabular-nums">
                  <Clock className="w-3 h-3 shrink-0" />
                  <span>{totalDuration}m</span>
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 font-display leading-snug">
                {course.name}
              </h3>
            </div>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(course.id);
            }}
            aria-label={isFavorite ? t.courseCard.unsaveCourse : t.courseCard.saveCourse}
            className={`p-2 rounded-xl border text-xs font-medium transition-colors shrink-0 ${
              isFavorite
                ? 'border-rose-500/40 bg-rose-500/10 text-rose-500'
                : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-500 hover:border-rose-500/30'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-rose-500' : ''}`} />
          </motion.button>
        </div>

        {/* Course Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-3.5 sm:mb-4 leading-relaxed">
          {course.tagline}
        </p>

        {/* Topics Chips */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-4 sm:mb-5">
          {course.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800"
            >
              {topic}
            </span>
          ))}
          {course.topics.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-400 dark:text-slate-500">
              +{course.topics.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Progress Bar + Quick Preview & CTA */}
      <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3">
        {/* Progress stats */}
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 font-medium">
              {isCompleted ? (
                <span className="text-emerald-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.courseCard.completed}</span>
                </span>
              ) : progressPercent > 0 ? (
                <span>{t.courseCard.inProgress}</span>
              ) : (
                <span>{t.courseCard.notStarted}</span>
              )}
            </span>
            <span className="font-mono font-medium text-slate-700 dark:text-slate-300 tabular-nums">
              {completedLessonsCount}/{totalLessons} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                isCompleted
                  ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                  : 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
              }`}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onPreviewCourse && (
            <button
              type="button"
              onClick={() => onPreviewCourse(course)}
              aria-label={`${t.catalog.quickPreview}: ${course.name}`}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-cyan-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shrink-0"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}

          <motion.button
            type="button"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => onOpenCourse(course.id)}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 min-h-[42px] ${
              isCompleted
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 dark:bg-cyan-500 hover:bg-slate-800 dark:hover:bg-cyan-400 text-white dark:text-slate-950 shadow-md shadow-cyan-500/15'
            }`}
          >
            <span>
              {isCompleted
                ? 'Review Track'
                : progressPercent > 0
                ? t.courseCard.continueCourse
                : t.courseCard.startCourse}
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
          </motion.button>
        </div>
      </div>
    </SpotlightCard>
  );
};
