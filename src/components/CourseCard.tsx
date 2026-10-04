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
      className="group relative flex flex-col justify-between p-6 rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white/95 dark:bg-[#0d1322]/95 backdrop-blur-sm hover:border-cyan-500/60 dark:hover:border-cyan-500/60 transition-all duration-200 shadow-sm hover:shadow-md"
    >
      {/* Recommended Tag */}
      {isRecommended && (
        <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-bold text-[10px] tracking-wide uppercase shadow-md shadow-cyan-500/20 z-10">
          <Sparkles className="w-3 h-3" />
          <span>{t.catalog.recommendedBadge}</span>
        </div>
      )}

      <div>
        {/* Top Row: Icon + Metadata + Favorite Button */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <motion.div
              whileHover={{ rotate: 6, scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 shadow-sm"
            >
              {renderCourseIcon(course.iconName, 'w-5 h-5')}
            </motion.div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 truncate font-medium">
                <span>{course.category}</span>
                <span aria-hidden="true">&bull;</span>
                <span>{course.difficulty}</span>
                <span aria-hidden="true">&bull;</span>
                <span className="flex items-center gap-1 tabular-nums">
                  <Clock className="w-3 h-3" />
                  <span>{totalDuration}m</span>
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate font-display">
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
            aria-label={
              isFavorite
                ? `${t.courseCard.unsaveCourse}: ${course.name}`
                : `${t.courseCard.saveCourse}: ${course.name}`
            }
            aria-pressed={isFavorite}
            className={`min-h-[36px] px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
              isFavorite
                ? 'border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400 shadow-sm'
                : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <motion.span
              animate={isFavorite ? { scale: [1, 1.35, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            </motion.span>
            <span className="hidden sm:inline">{isFavorite ? 'Saved' : 'Save'}</span>
          </motion.button>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
          {course.description}
        </p>

        {/* Topics */}
        <div className="mb-5">
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1">
            {t.courseCard.topics}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
            {course.topics.slice(0, 4).join(' · ')}
          </div>
        </div>
      </div>

      {/* Bottom Progress & Actions */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
              {isCompleted ? (
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.courseCard.completed}</span>
                </span>
              ) : progressPercent > 0 ? (
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                  {t.courseCard.inProgress}
                </span>
              ) : (
                <span>
                  {totalLessons} {t.courseCard.lessons}
                </span>
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
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-cyan-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}

          <motion.button
            type="button"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => onOpenCourse(course.id)}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 min-h-[44px] ${
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
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
        </div>
      </div>
    </SpotlightCard>
  );
};
