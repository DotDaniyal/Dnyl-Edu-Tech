import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Github,
  Mail,
  Send,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import {
  DANIYAL_IDENTITY,
  ENGINEERING_ARTICLES,
  LEARNING_PRINCIPLES,
  TEN_POINT_SYSTEM_META,
  VERIFIED_SKILLS,
} from '../data/daniyalData';
import { CodeBlock } from './CodeBlock';
import {
  getContactSubmissions,
  getPreferences,
  saveContactSubmission,
  updatePreferences,
} from '../lib/storage';
import { FadeIn } from './animations/FadeIn';
import { StaggerContainer, StaggerItem } from './animations/StaggerContainer';
import { SpotlightCard } from './animations/SpotlightCard';

interface AboutAndBlogSectionProps {
  onOpenCourse: (courseId: string) => void;
  onExploreCourses: () => void;
  onToast: (msg: string) => void;
  mode?: 'full' | 'blog-only' | 'home-summary';
}

export const AboutAndBlogSection: React.FC<AboutAndBlogSectionProps> = ({
  onOpenCourse,
  onExploreCourses,
  onToast,
  mode = 'full',
}) => {
  const [skillCategory, setSkillCategory] = useState<string>('All');
  const [selectedArticleId, setSelectedArticleId] = useState<string>(
    ENGINEERING_ARTICLES[0].id
  );
  const [newsletterEmail, setNewsletterEmail] = useState(
    getPreferences().subscriberEmail || ''
  );
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(
    Boolean(getPreferences().newsletterSubscribed)
  );

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('Course Question / Feedback');
  const [contactMessage, setContactMessage] = useState('');
  const [recentMessages, setRecentMessages] = useState(() => getContactSubmissions());

  const skillCategories = [
    'All',
    'Frontend',
    'Backend',
    'Programming',
    'Databases',
    'Mobile',
    'Tools & AI',
  ];

  const filteredSkills =
    skillCategory === 'All'
      ? VERIFIED_SKILLS
      : VERIFIED_SKILLS.filter((s) => s.category === skillCategory);

  const activeArticle =
    ENGINEERING_ARTICLES.find((a) => a.id === selectedArticleId) ||
    ENGINEERING_ARTICLES[0];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      onToast('Please enter a valid email address.');
      return;
    }
    updatePreferences({
      newsletterSubscribed: true,
      subscriberEmail: newsletterEmail.trim(),
    });
    setNewsletterSubscribed(true);
    onToast('Subscribed to Daniyal Edu Tech updates!');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.includes('@') || !contactMessage.trim()) {
      onToast('Please complete your name, valid email, and message.');
      return;
    }
    saveContactSubmission({
      name: contactName.trim(),
      email: contactEmail.trim(),
      topic: contactTopic,
      message: contactMessage.trim(),
    });
    setRecentMessages(getContactSubmissions());
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    onToast('Message logged! Real-time notification recorded.');
  };

  return (
    <div className="space-y-16 py-12">
      {/* Section 8: Meet Daniyal Hayat */}
      {mode !== 'blog-only' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <SpotlightCard className="p-6 sm:p-10 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
              {/* Profile Photo */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-4">
                <div className="relative w-44 h-52 sm:w-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shrink-0 shadow-lg">
                  <img
                    src={DANIYAL_IDENTITY.profileImage}
                    alt="Daniyal Hayat — Founder of Daniyal Edu Tech"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    {DANIYAL_IDENTITY.founderName}
                  </div>
                  <div className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">
                    {DANIYAL_IDENTITY.role}
                  </div>
                </div>
              </div>

              {/* Bio & Focus Areas */}
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Founder &amp; Educator Identity</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
                  Meet Daniyal Hayat
                </h2>

                <div className="space-y-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {DANIYAL_IDENTITY.aboutBio.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-2">
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2">
                    Core Engineering &amp; Teaching Focus
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                    {DANIYAL_IDENTITY.focusAreas.map((area) => (
                      <div key={area} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <motion.a
                    href={DANIYAL_IDENTITY.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-semibold text-xs sm:text-sm transition-all whitespace-nowrap shadow-md shadow-cyan-500/20"
                  >
                    <span>View Full Portfolio</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>

                  <motion.a
                    href={DANIYAL_IDENTITY.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-cyan-500 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap bg-white/40 dark:bg-slate-900/40"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub</span>
                  </motion.a>
                </div>
              </div>
            </SpotlightCard>
          </FadeIn>
        </section>
      )}

      {/* Technologies I Teach & Build With */}
      {mode !== 'blog-only' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <FadeIn direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                Verified Stack from Daniyal’s Portfolio &amp; GitHub
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
                Technologies I Teach &amp; Build With
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
                Every technology below is backed by real repositories on GitHub (`DotDaniyal`) and interactive learning tracks on this platform.
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {skillCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSkillCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    skillCategory === cat
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          <StaggerContainer staggerDelay={0.06} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSkills.map((skill) => (
              <StaggerItem key={skill.id}>
                <SpotlightCard className="p-5 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 flex flex-col justify-between gap-4 h-full shadow-sm">
                  <div className="space-y-2">
                    <div className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">
                      {skill.category}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                      {skill.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {skill.shortDescription}
                    </p>
                  </div>

                  {skill.relatedCourseIds[0] && (
                    <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        {skill.relatedProjectIds.length} verified project{skill.relatedProjectIds.length === 1 ? '' : 's'}
                      </span>
                      <button
                        type="button"
                        onClick={() => onOpenCourse(skill.relatedCourseIds[0])}
                        className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                      >
                        Open Related Track &rarr;
                      </button>
                    </div>
                  )}
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

      {/* Learn With Daniyal & 10-Point System */}
      {mode !== 'blog-only' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-6">
            <FadeIn direction="up" className="space-y-2">
              <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                Educational Philosophy
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
                Learn With Daniyal
              </h2>
            </FadeIn>

            <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {LEARNING_PRINCIPLES.map((item) => (
                <StaggerItem key={item.number}>
                  <SpotlightCard className="p-6 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 space-y-2.5 h-full shadow-sm">
                    <div className="font-mono text-sm font-bold text-cyan-600 dark:text-cyan-400">
                      {item.number} &mdash; {item.title}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                      {item.subtitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* 10-Point Learning System Architecture */}
          <FadeIn direction="up">
            <SpotlightCard className="p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 space-y-6 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                    Signature Curriculum Architecture
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                    The 10-Point Learning System
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Every topic on Daniyal Edu Tech is structured around 10 progressive stages &mdash; taking you from first definition to internal workings and hands-on practice.
                  </p>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onExploreCourses}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs whitespace-nowrap self-start shadow-md shadow-cyan-500/20"
                >
                  <span>Experience a 10-Point Lesson</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {TEN_POINT_SYSTEM_META.map((pt) => (
                  <div
                    key={pt.step}
                    className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 space-y-1"
                  >
                    <div className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">
                      {pt.step} &mdash; {pt.title}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {pt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </FadeIn>
        </section>
      )}

      {/* Engineering Blog & Technical Insights Section */}
      {mode !== 'home-summary' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <FadeIn direction="up" className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              Engineering Notes &amp; Architecture Deep-Dives
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
              Engineering Insights &amp; Blog
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
              Practical lessons learned while building Mystic Match, Darul Ifta v2, Hamara Weather, and CortexIQ AI Suite.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Article List */}
            <div className="lg:col-span-5 space-y-3">
              {ENGINEERING_ARTICLES.map((art) => {
                const active = art.id === activeArticle.id;
                return (
                  <button
                    key={art.id}
                    type="button"
                    onClick={() => setSelectedArticleId(art.id)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all space-y-2 ${
                      active
                        ? 'border-cyan-500 bg-cyan-500/10 dark:bg-cyan-950/25 shadow-md shadow-cyan-500/10'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {art.category} &bull; {art.publishedDate} &bull; {art.readTime}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      {art.excerpt}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Article Reader */}
            <article className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-sm space-y-6 shadow-lg">
              <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">
                  {activeArticle.category} &bull; {activeArticle.publishedDate} &bull; {activeArticle.readTime}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                  {activeArticle.title}
                </h3>
              </div>

              <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/5 dark:bg-cyan-950/20 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                  Roman Urdu Key Takeaway:{' '}
                </span>
                {activeArticle.romanUrduTakeaway}
              </div>

              <div className="space-y-5">
                {activeArticle.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                      {sec.heading}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {sec.body}
                    </p>
                    {sec.codeSnippet && (
                      <CodeBlock
                        code={sec.codeSnippet.code}
                        language={sec.codeSnippet.language}
                        onCopyToast={onToast}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOpenCourse(activeArticle.relatedCourseId)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs shadow-md shadow-cyan-500/20"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Study Related Course Track</span>
                </motion.button>
                <a
                  href={DANIYAL_IDENTITY.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  Inspect Source on GitHub &rarr;
                </a>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Newsletter & Contact Form */}
      {mode === 'full' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <FadeIn direction="up">
            <SpotlightCard className="p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 space-y-3 shadow-md">
              <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                Platform Mission
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                About Daniyal Edu Tech
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                Daniyal Edu Tech is a developer-focused educational platform created to make programming easier to understand through structured learning, practical examples, projects, and hands-on practice. Every course connects foundational concepts directly to real software built by Daniyal Hayat.
              </p>
            </SpotlightCard>
          </FadeIn>

          {/* Newsletter & Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <FadeIn direction="up" delay={0.05} className="lg:col-span-5">
              <SpotlightCard className="p-6 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 flex flex-col justify-between space-y-6 h-full shadow-md">
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                    <Mail className="w-4 h-4" />
                    <span>Curriculum &amp; Project Updates</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                    Subscribe to Learning Updates
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Get notified when new 10-Point programming modules, Roman Urdu guides, or open-source repositories go live.
                  </p>

                  <form onSubmit={handleNewsletterSubmit} className="space-y-3 pt-2">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      aria-label="Email address for newsletter"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors shadow-md shadow-cyan-500/20"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>
                        {newsletterSubscribed ? 'Update Subscription' : 'Subscribe for Updates'}
                      </span>
                    </motion.button>
                  </form>

                  {newsletterSubscribed && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-600 dark:text-emerald-300">
                      ✓ Active subscription saved for {newsletterEmail}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 space-y-1">
                  <div>Direct Email: {DANIYAL_IDENTITY.email}</div>
                  <div>GitHub: {DANIYAL_IDENTITY.githubUrl}</div>
                </div>
              </SpotlightCard>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn direction="up" delay={0.1} className="lg:col-span-7">
              <SpotlightCard className="p-6 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 space-y-5 h-full shadow-md">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                    Direct Developer &amp; Educator Communication
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                    Send a Message to Daniyal
                  </h3>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your Name"
                      aria-label="Your Name"
                      className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Your Email"
                      aria-label="Your Email"
                      className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <select
                    value={contactTopic}
                    onChange={(e) => setContactTopic(e.target.value)}
                    aria-label="Message Topic"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Course Question / Feedback">Course Question / Feedback</option>
                    <option value="Project Collaboration">Project Collaboration</option>
                    <option value="Full-Stack / Android Inquiry">Full-Stack / Android Inquiry</option>
                  </select>

                  <textarea
                    rows={3}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Write your question or project inquiry..."
                    aria-label="Your Message"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  />

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors shadow-md shadow-cyan-500/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </motion.button>
                </form>

                {recentMessages.length > 0 && (
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      Real-Time Sent Message Log ({recentMessages.length})
                    </div>
                    <div className="space-y-2 max-h-36 overflow-y-auto">
                      {recentMessages.slice(0, 3).map((msg) => (
                        <div
                          key={msg.id}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs flex items-start justify-between gap-2"
                        >
                          <div>
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {msg.name} ({msg.topic}):{' '}
                            </span>
                            <span className="text-slate-600 dark:text-slate-300">
                              {msg.message}
                            </span>
                          </div>
                          <span className="text-[11px] text-emerald-500 shrink-0">✓ Delivered</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </SpotlightCard>
            </FadeIn>
          </div>
        </section>
      )}
    </div>
  );
};
