import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  ExternalLink,
  FolderGit2,
  Github,
  Layers,
  Sparkles,
} from 'lucide-react';
import { DANIYAL_IDENTITY, REAL_PROJECTS } from '../data/daniyalData';
import { RealProject } from '../types/edu';
import { FadeIn } from './animations/FadeIn';
import { StaggerContainer, StaggerItem } from './animations/StaggerContainer';
import { SpotlightCard } from './animations/SpotlightCard';

interface ProjectsAndPortfolioSectionProps {
  onOpenCourse: (courseId: string) => void;
}

interface GithubRepoFeedItem {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
  homepage: string | null;
}

export const ProjectsAndPortfolioSection: React.FC<ProjectsAndPortfolioSectionProps> = ({
  onOpenCourse,
}) => {
  const [selectedProject, setSelectedProject] = useState<RealProject>(REAL_PROJECTS[0]);
  const [liveRepos, setLiveRepos] = useState<GithubRepoFeedItem[]>([]);

  useEffect(() => {
    let active = true;
    fetch('https://api.github.com/users/DotDaniyal/repos?per_page=6&sort=updated')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (active && Array.isArray(data)) {
          setLiveRepos(data.slice(0, 6));
        }
      })
      .catch(() => {
        // Fallback silently to verified static projects
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-16 py-12">
      {/* Built by Daniyal Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <FadeIn direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Production Repositories &bull; GitHub DotDaniyal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
              Built by Daniyal
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
              Real applications, platforms, and algorithmic games engineered by Daniyal Hayat &mdash; connecting every programming track on this platform to production source code.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start">
            <a
              href={DANIYAL_IDENTITY.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-semibold text-xs whitespace-nowrap shadow-md shadow-cyan-500/20 transition-all"
            >
              <span>Visit Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={DANIYAL_IDENTITY.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-cyan-500 text-slate-800 dark:text-slate-200 font-semibold text-xs whitespace-nowrap bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub (DotDaniyal)</span>
            </a>
          </div>
        </FadeIn>

        {/* Project Cards Grid */}
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REAL_PROJECTS.map((project) => (
            <StaggerItem key={project.id}>
              <SpotlightCard className="flex flex-col justify-between p-6 border border-slate-200 dark:border-slate-800/90 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-sm hover:border-cyan-500/60 transition-all h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span>{project.category}</span>
                    <span aria-hidden="true">&bull;</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                      {project.language}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-display">
                    {project.name}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1">
                      Technologies
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
                      {project.technologies.join(' · ')}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800/80 mb-5">
                    <div className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">
                      Relevant Educational Topic
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                      {project.relatedTopic}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-cyan-500 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors whitespace-nowrap"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code Repository</span>
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenCourse(project.relatedCourseIds[0] || 'course-javascript')}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Study Related Course Track &rarr;</span>
                  </button>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Case Study Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-sm space-y-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                Production Case Study &bull; Real Architecture
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
                {selectedProject.name} Architecture
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl">
                {selectedProject.description}
              </p>
            </div>

            {/* Project Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              {REAL_PROJECTS.map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => setSelectedProject(proj)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedProject.id === proj.id
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {proj.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                1. System Architecture
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedProject.learnBreakdown.architecture}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                2. Core Logic &amp; Engineering
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedProject.learnBreakdown.coreLogic}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-500/5 dark:bg-cyan-950/20 border border-cyan-500/30 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                  3. Educational Connection
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Learn how {selectedProject.name} was structured by exploring the linked curriculum track.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenCourse(selectedProject.relatedCourseIds[0] || 'course-javascript')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors shadow-md shadow-cyan-500/20"
              >
                <span>Explore Track Concepts</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* GitHub Live Feed */}
      {liveRepos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <FadeIn direction="up">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <Github className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              <span>Latest GitHub Activity from @DotDaniyal</span>
            </h3>
          </FadeIn>

          <StaggerContainer staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveRepos.map((repo) => (
              <StaggerItem key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0d1322]/80 hover:border-cyan-500/60 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-sm text-slate-900 dark:text-white truncate font-mono">
                      {repo.name}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
                    {repo.description || 'Public GitHub repository by Daniyal Hayat'}
                  </p>
                  {repo.language && (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                      {repo.language}
                    </span>
                  )}
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}
    </div>
  );
};
