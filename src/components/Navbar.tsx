import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Menu, Moon, Search, Sun, X, Sparkles } from 'lucide-react';
import { DANIYAL_IDENTITY } from '../data/daniyalData';
import { MagneticButton } from './animations/MagneticButton';

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
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: NavPage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'practice', label: 'Practice' },
    { id: 'learning', label: 'My Learning' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (page: NavPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-cyan-950/20'
          : 'border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-[#090d16]/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark with subtle hover animation */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight font-display text-slate-900 dark:text-white whitespace-nowrap shrink-0 rounded focus-visible:outline-2 focus-visible:outline-cyan-500"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-400 text-slate-950 text-xs font-mono font-black shadow-sm">
            &lt;/&gt;
          </span>
          <span className="font-extrabold tracking-tight">Daniyal Edu Tech</span>
        </motion.button>

        {/* Zone 2: Navigation Links with Animated Pill Indicator */}
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
                className={`relative px-3.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors duration-200 ${
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

          <button
            type="button"
            onClick={() => handleNavClick('blog')}
            className={`relative hidden xl:inline-block px-3.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors duration-200 ${
              currentPage === 'blog'
                ? 'text-cyan-600 dark:text-cyan-300 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
            }`}
          >
            {currentPage === 'blog' && (
              <motion.div
                layoutId="activeNavIndicator"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30"
              />
            )}
            <span className="relative z-10">Insights</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Search, Theme, Portfolio) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenSearch}
            aria-label="Open Global Command Search (Ctrl + K)"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 text-xs text-slate-600 dark:text-slate-300 hover:border-cyan-500/50 transition-colors whitespace-nowrap shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden md:inline-block font-mono text-[10px] text-slate-500 dark:text-slate-400 px-1 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
              ⌘K
            </kbd>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </motion.button>

          <MagneticButton
            onClick={() => window.open(DANIYAL_IDENTITY.portfolioUrl, '_blank')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-semibold text-xs whitespace-nowrap shadow-md shadow-cyan-500/20"
          >
            <span>Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </MagneticButton>

          {/* Mobile Hamburger Trigger */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-xl px-4 py-4 space-y-3 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2">
              {[...navItems, { id: 'blog' as NavPage, label: 'Insights' }].map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-colors whitespace-nowrap ${
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
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <a
                href={DANIYAL_IDENTITY.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs whitespace-nowrap shadow-sm"
              >
                <span>Visit Daniyal’s Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={DANIYAL_IDENTITY.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
