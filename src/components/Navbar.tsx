/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Globe, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { DANIYAL_IDENTITY } from '../data/daniyalData';
import { AppLanguage, TRANSLATIONS } from '../data/translations';

export type NavPage =
  | 'home'
  | 'courses'
  | 'course-detail'
  | 'practice'
  | 'learning'
  | 'projects'
  | 'blog'
  | 'about'
  | '404';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  onOpenSearch: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  language: AppLanguage;
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  theme,
  onToggleTheme,
  language,
  onToggleLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const t = TRANSLATIONS[language];

  // Smart scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY < 60) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8) {
        if (!mobileMenuOpen) {
          setVisible(false);
        }
      } else if (currentScrollY < lastScrollY.current - 8) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems: { id: NavPage; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'courses', label: t.nav.courses },
    { id: 'practice', label: t.nav.practice },
    { id: 'learning', label: t.nav.dashboard },
    { id: 'projects', label: t.nav.projects },
    { id: 'blog', label: t.nav.articles },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (page: NavPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -80,
      }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'border-b border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-cyan-950/20'
          : 'border-b border-slate-200/60 dark:border-slate-800/60 bg-white/85 dark:bg-[#090d16]/85 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-3">
        {/* Zone 1: Brand Wordmark with responsive scaling */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-bold tracking-tight font-display text-slate-900 dark:text-white whitespace-nowrap shrink-0 rounded-lg p-1 -ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          aria-label="Daniyal Edu Tech Home"
        >
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-400 text-slate-950 text-xs sm:text-sm font-mono font-black shadow-sm shrink-0">
            &lt;/&gt;
          </span>
          <span className="font-extrabold tracking-tight">
            <span className="hidden xs:inline">Daniyal Edu Tech</span>
            <span className="xs:hidden">DNYL Edu</span>
          </span>
        </motion.button>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1 text-sm font-medium"
        >
          {navItems.map((item) => {
            const isActive =
              currentPage === item.id ||
              (item.id === 'courses' && currentPage === 'course-detail');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                  isActive
                    ? 'text-cyan-600 dark:text-cyan-300 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Search, Language, Theme, Portfolio, Hamburger) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Command Search Trigger */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenSearch}
            aria-label="Open Global Command Search (Ctrl + K)"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 text-xs text-slate-600 dark:text-slate-300 hover:border-cyan-500/50 transition-colors whitespace-nowrap shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 min-h-[36px]"
          >
            <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span className="hidden sm:inline">{t.nav.search}</span>
            <kbd className="hidden md:inline-block font-mono text-[10px] text-slate-500 dark:text-slate-400 px-1 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
              {t.nav.searchShortcut}
            </kbd>
          </motion.button>

          {/* Bilingual Switcher */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleLanguage}
            title={t.nav.languageToggle}
            aria-label={t.nav.languageToggle}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-cyan-500/50 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 min-h-[36px]"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
            <span className="font-mono text-[11px] uppercase tracking-wider">
              {language === 'en' ? 'EN' : 'UR'}
            </span>
          </motion.button>

          {/* Theme Switcher */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </motion.button>

          {/* Portfolio External Link (Hidden on small mobile/tablets to preserve space) */}
          <a
            href={DANIYAL_IDENTITY.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-semibold text-xs whitespace-nowrap shadow-md shadow-cyan-500/20 min-h-[36px]"
          >
            <span>{t.nav.portfolio}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Hamburger Trigger */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 min-h-[38px] min-w-[38px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-[#090d16]/98 backdrop-blur-2xl px-4 py-4 space-y-3 overflow-hidden shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`min-h-[44px] px-3.5 py-2.5 rounded-xl text-left text-sm font-medium transition-colors whitespace-nowrap flex items-center ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 font-semibold border border-cyan-500/30'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={onToggleLanguage}
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                <Globe className="w-4 h-4 text-cyan-500" />
                <span>{language === 'en' ? 'Switch to Roman Urdu' : 'Switch to English'}</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={DANIYAL_IDENTITY.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs whitespace-nowrap shadow-sm"
                >
                  <span>{t.nav.portfolio}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={DANIYAL_IDENTITY.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
