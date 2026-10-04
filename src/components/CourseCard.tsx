import React from 'react';
import {
  ArrowUpRight,
  Atom,
  Cpu,
  Database,
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

interface CourseCardProps {
  course: Course;
  completedLessonsCount: number;
  isFavorite: boolean;
  onToggleFavorite: (courseId: string) => void;
  onOpenCourse: (courseId: string) => void;
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
  onToggleFavorite,
  onOpenCourse,
}) => {
  const totalLessons = course.lessons.length;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  return (
    <article className="group flex flex-col justify-between p-6 rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#0d1322] hover:border-cyan-500/60 dark:hover:border-cyan-500/60 transition-all duration-150 hover:-translate-y-0.5">
      <div>
        {/* Top Row: Icon + Unboxed Metadata + Favorite Button */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
              {renderCourseIcon(course.iconName, 'w-5 h-5')}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 truncate">
                <span>{course.category}</span>
                <span aria-hidden="true">·</span>
                <span>{course.difficulty}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{totalLessons} {totalLessons === 1 ? 'lesson' : 'lessons'}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                {course.name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(course.id);
            }}
            aria-label={isFavorite ? `Remove ${course.name} from favorites` : `Add ${course.name} to favorites`}
            aria-pressed={isFavorite}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 ${
              isFavorite
                ? 'border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400'
                : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {course.description}
        </p>

        {/* Topics as Clean Unboxed Text with Typographic Separators */}
        <div className="mb-5">
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1">
            Key Topics Covered
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {course.topics.join(' · ')}
          </div>
        </div>
      </div>

      {/* Bottom Progress & Start Action */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              Track Progress
            </span>
            <span className="font-mono font-medium text-slate-700 dark:text-slate-300 tabular-nums">
              {completedLessonsCount}/{totalLessons} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-cyan-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenCourse(course.id)}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-cyan-500 hover:bg-slate-800 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap"
        >
          <span>
            {progressPercent === 100
              ? 'Review Track'
              : progressPercent > 0
              ? 'Continue Track'
              : 'Start Learning'}
          </span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};
