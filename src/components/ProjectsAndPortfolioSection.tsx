import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  ExternalLink,
  FolderGit2,
  Github,
  Layers,
} from 'lucide-react';
import { DANIYAL_IDENTITY, REAL_PROJECTS } from '../data/daniyalData';
import { RealProject } from '../types/edu';

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
      {/* Section 25: Built by Daniyal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              Verified Production Repositories &amp; Deployments
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
              Built by Daniyal
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
              Real applications, platforms, and algorithmic games engineered by Daniyal Hayat — connecting every programming track on this platform to production source code.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start">
            <a
              href={DANIYAL_IDENTITY.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs whitespace-nowrap"
            >
              <span>Visit Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={DANIYAL_IDENTITY.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-cyan-500 text-slate-800 dark:text-slate-200 font-semibold text-xs whitespace-nowrap"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub (DotDaniyal)</span>
            </a>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REAL_PROJECTS.map((project) => (
            <article
              key={project.id}
              className="flex flex-col justify-between p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] hover:border-cyan-500/60 transition-all duration-150 hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400">
                    {project.language}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {project.name}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="mb-4">
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1">
                    Technologies
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
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
                    <span>GitHub</span>
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-xs font-semibold text-slate-950 transition-colors whitespace-nowrap"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProject(project);
                      const el = document.getElementById('learn-through-real-projects');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors whitespace-nowrap"
                  >
                    Inspect Architecture
                  </button>
                  {project.relatedCourseIds[0] && (
                    <button
                      type="button"
                      onClick={() => onOpenCourse(project.relatedCourseIds[0])}
                      className="px-3 py-2 rounded-lg text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline whitespace-nowrap"
                    >
                      Related Course →
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section 26: Learn Through Real Projects */}
      <section
        id="learn-through-real-projects"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>Interactive Engineering Case Study Breakdown</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                Learn Through Real Projects
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Select any verified project built by Daniyal Hayat to study its technology choices, architecture, UI components, core logic, and development process.
              </p>
            </div>

            {/* Project Selector Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {REAL_PROJECTS.slice(0, 5).map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => setSelectedProject(proj)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    selectedProject.id === proj.id
                      ? 'bg-cyan-500 text-slate-950 font-semibold'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {proj.name.split(' ')[0]} {proj.name.split(' ')[1] || ''}
                </button>
              ))}
            </div>
          </div>

          {/* Active Project Architectural Breakdown */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Repository: {selectedProject.repoName}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                  Project: {selectedProject.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={selectedProject.liveUrl || selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs whitespace-nowrap"
                >
                  <span>Explore Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                {selectedProject.relatedCourseIds[0] && (
                  <button
                    type="button"
                    onClick={() => onOpenCourse(selectedProject.relatedCourseIds[0])}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-cyan-500 text-xs font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Study Related Track</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  01. Technology Used
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedProject.learnBreakdown.technologyUsed}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  02. Architecture
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedProject.learnBreakdown.architecture}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  03. UI &amp; Visual System
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedProject.learnBreakdown.uiAndDesign}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  04. Key Components
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedProject.learnBreakdown.components}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  05. Core Logic &amp; Data Flow
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedProject.learnBreakdown.coreLogic}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  06. Development Process
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedProject.learnBreakdown.developmentProcess}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 27: Dedicated Daniyal's Portfolio & Live GitHub Ecosystem Integration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              Connected Personal Developer Ecosystem
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
              Daniyal’s Portfolio &amp; GitHub
            </h2>
            <p className="text-base text-slate-700 dark:text-slate-200 font-medium">
              Explore my complete developer portfolio
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Visit Daniyal Hayat’s official portfolio platform to inspect interactive case studies, full-stack services, and live GitHub repository telemetry, or browse source repositories directly on GitHub (`DotDaniyal`).
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={DANIYAL_IDENTITY.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors whitespace-nowrap"
              >
                <span>Visit Portfolio</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={DANIYAL_IDENTITY.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-cyan-500 text-slate-900 dark:text-white font-semibold text-sm transition-colors whitespace-nowrap"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Profile (@DotDaniyal)</span>
              </a>
            </div>
          </div>

          {/* Live GitHub Activity Feed Preview Card */}
          <div className="lg:col-span-5 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <FolderGit2 className="w-4 h-4 text-cyan-500" />
                <span>GitHub Feed · github.com/DotDaniyal</span>
              </span>
              <a
                href={DANIYAL_IDENTITY.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 dark:text-cyan-400 hover:underline font-mono"
              >
                View All →
              </a>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              {(liveRepos.length > 0
                ? liveRepos.slice(0, 4).map((r) => ({
                    name: r.name,
                    url: r.html_url,
                    lang: r.language || 'TypeScript',
                  }))
                : REAL_PROJECTS.slice(0, 4).map((p) => ({
                    name: p.repoName.replace('DotDaniyal/', ''),
                    url: p.githubUrl,
                    lang: p.language,
                  }))
              ).map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 flex items-center justify-between gap-2 hover:text-cyan-500 transition-colors"
                >
                  <span className="font-mono font-medium text-slate-800 dark:text-slate-200 truncate">
                    DotDaniyal/{repo.name}
                  </span>
                  <span className="text-slate-500 shrink-0">{repo.lang}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
