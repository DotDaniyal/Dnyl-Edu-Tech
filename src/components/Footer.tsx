/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { DANIYAL_IDENTITY } from '../data/daniyalData';
import { AppLanguage, TRANSLATIONS } from '../data/translations';
import { NavPage } from './Navbar';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
  language?: AppLanguage;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, language = 'en' }) => {
  const t = TRANSLATIONS[language];
  const links: { label: string; page: NavPage }[] = [
    { label: t.nav.home, page: 'home' },
    { label: t.nav.courses, page: 'courses' },
    { label: t.nav.practice, page: 'practice' },
    { label: t.nav.dashboard, page: 'learning' },
    { label: t.nav.projects, page: 'projects' },
    { label: t.nav.articles, page: 'blog' },
    { label: 'About', page: 'about' },
  ];

  const handleLink = (page: NavPage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090d16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="text-lg font-bold font-display text-slate-900 dark:text-white">
              &lt;/&gt; {DANIYAL_IDENTITY.platformName}
            </div>
            <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
              Learn. Build. Grow.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
              Created by {DANIYAL_IDENTITY.founderName} &mdash; {DANIYAL_IDENTITY.role}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
            {links.map((item) => (
              <button
                key={item.page}
                type="button"
                onClick={() => handleLink(item.page)}
                className="hover:text-cyan-500 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded p-1"
              >
                {item.label}
              </button>
            ))}
            <a
              href={DANIYAL_IDENTITY.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-cyan-500 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded p-1"
            >
              <span>{t.nav.portfolio}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={DANIYAL_IDENTITY.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-cyan-500 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded p-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div>&copy; {new Date().getFullYear()} Daniyal Edu Tech. {t.footer.rights}</div>
          <div className="flex items-center gap-3">
            <a
              href={DANIYAL_IDENTITY.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-500 transition-colors"
            >
              daniyal-hayat-portfolio.vercel.app
            </a>
            <span aria-hidden="true">&bull;</span>
            <a
              href={DANIYAL_IDENTITY.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-500 transition-colors"
            >
              github.com/DotDaniyal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
