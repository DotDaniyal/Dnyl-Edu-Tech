import { LastVisitedLesson, UserPreferences, ContactSubmission } from '../types/edu';

export const STORAGE_KEYS = {
  USER: 'daniyal_edu_user',
  THEME: 'daniyal_edu_theme',
  PROGRESS: 'daniyal_edu_progress',
  COURSES: 'daniyal_edu_courses',
  LESSONS: 'daniyal_edu_lessons',
  COMPLETED_LESSONS: 'daniyal_edu_completed_lessons',
  COMPLETED_CHALLENGES: 'daniyal_edu_completed_challenges',
  FAVORITES: 'daniyal_edu_favorites',
  RECENT_COURSES: 'daniyal_edu_recent_courses',
  PREFERENCES: 'daniyal_edu_preferences',
  BOOKMARKS: 'daniyal_edu_bookmarks',
  SEARCH_HISTORY: 'daniyal_edu_search_history',
  CONTACT_MESSAGES: 'daniyal_edu_contact_messages',
  CODE_DRAFTS: 'daniyal_edu_code_drafts',
} as const;

export function safeGetItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed !== null && parsed !== undefined ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
}

export function safeSetItem<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function getTheme(): 'dark' | 'light' {
  const stored = safeGetItem<string>(STORAGE_KEYS.THEME, 'dark');
  return stored === 'light' ? 'light' : 'dark';
}

export function setTheme(theme: 'dark' | 'light'): void {
  safeSetItem(STORAGE_KEYS.THEME, theme);
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}

export function getCompletedLessons(): string[] {
  const arr = safeGetItem<string[]>(STORAGE_KEYS.COMPLETED_LESSONS, []);
  return Array.isArray(arr) ? arr : [];
}

export function toggleLessonCompletion(lessonId: string, courseId: string): string[] {
  const current = getCompletedLessons();
  const exists = current.includes(lessonId);
  const next = exists ? current.filter((id) => id !== lessonId) : [...current, lessonId];
  safeSetItem(STORAGE_KEYS.COMPLETED_LESSONS, next);

  // Also update course progress record
  const progressMap = safeGetItem<Record<string, { updatedAt: number; completedLessonIds: string[] }>>(
    STORAGE_KEYS.PROGRESS,
    {}
  );
  const courseLessonIds = next.filter((id) => id.startsWith(`${courseId}:`) || id.includes(courseId));
  progressMap[courseId] = {
    updatedAt: Date.now(),
    completedLessonIds: courseLessonIds,
  };
  safeSetItem(STORAGE_KEYS.PROGRESS, progressMap);

  return next;
}

export function getCompletedChallenges(): string[] {
  const arr = safeGetItem<string[]>(STORAGE_KEYS.COMPLETED_CHALLENGES, []);
  return Array.isArray(arr) ? arr : [];
}

export function markChallengeCompleted(challengeId: string): string[] {
  const current = getCompletedChallenges();
  if (current.includes(challengeId)) return current;
  const next = [...current, challengeId];
  safeSetItem(STORAGE_KEYS.COMPLETED_CHALLENGES, next);
  return next;
}

export function getFavoriteCourses(): string[] {
  const arr = safeGetItem<string[]>(STORAGE_KEYS.FAVORITES, []);
  return Array.isArray(arr) ? arr : [];
}

export function toggleFavoriteCourse(courseId: string): string[] {
  const current = getFavoriteCourses();
  const next = current.includes(courseId)
    ? current.filter((id) => id !== courseId)
    : [...current, courseId];
  safeSetItem(STORAGE_KEYS.FAVORITES, next);
  return next;
}

export function getBookmarkedLessons(): string[] {
  const arr = safeGetItem<string[]>(STORAGE_KEYS.BOOKMARKS, []);
  return Array.isArray(arr) ? arr : [];
}

export function toggleBookmarkLesson(lessonId: string): string[] {
  const current = getBookmarkedLessons();
  const next = current.includes(lessonId)
    ? current.filter((id) => id !== lessonId)
    : [...current, lessonId];
  safeSetItem(STORAGE_KEYS.BOOKMARKS, next);
  return next;
}

export function getRecentCourses(): string[] {
  const arr = safeGetItem<string[]>(STORAGE_KEYS.RECENT_COURSES, []);
  return Array.isArray(arr) ? arr : [];
}

export function recordRecentCourse(courseId: string): string[] {
  const current = getRecentCourses().filter((id) => id !== courseId);
  const next = [courseId, ...current].slice(0, 8);
  safeSetItem(STORAGE_KEYS.RECENT_COURSES, next);
  return next;
}

export function getLastVisitedLesson(): LastVisitedLesson | null {
  return safeGetItem<LastVisitedLesson | null>(STORAGE_KEYS.LESSONS, null);
}

export function setLastVisitedLesson(item: LastVisitedLesson): void {
  safeSetItem(STORAGE_KEYS.LESSONS, item);
  recordRecentCourse(item.courseId);
}

export function getSearchHistory(): string[] {
  const arr = safeGetItem<string[]>(STORAGE_KEYS.SEARCH_HISTORY, []);
  return Array.isArray(arr) ? arr : [];
}

export function addSearchHistory(query: string): string[] {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return getSearchHistory();
  const current = getSearchHistory().filter((q) => q.toLowerCase() !== trimmed.toLowerCase());
  const next = [trimmed, ...current].slice(0, 8);
  safeSetItem(STORAGE_KEYS.SEARCH_HISTORY, next);
  return next;
}

export function clearSearchHistory(): string[] {
  safeSetItem(STORAGE_KEYS.SEARCH_HISTORY, []);
  return [];
}

export function getPreferences(): UserPreferences {
  return safeGetItem<UserPreferences>(STORAGE_KEYS.PREFERENCES, {
    showRomanUrduByDefault: true,
    codeFontSize: 'base',
    newsletterSubscribed: false,
  });
}

export function updatePreferences(partial: Partial<UserPreferences>): UserPreferences {
  const current = getPreferences();
  const next = { ...current, ...partial };
  safeSetItem(STORAGE_KEYS.PREFERENCES, next);
  return next;
}

export function saveCodeDraft(challengeId: string, code: string): void {
  const drafts = safeGetItem<Record<string, string>>(STORAGE_KEYS.CODE_DRAFTS, {});
  drafts[challengeId] = code;
  safeSetItem(STORAGE_KEYS.CODE_DRAFTS, drafts);
}

export function getCodeDraft(challengeId: string, fallback: string): string {
  const drafts = safeGetItem<Record<string, string>>(STORAGE_KEYS.CODE_DRAFTS, {});
  return typeof drafts[challengeId] === 'string' ? drafts[challengeId] : fallback;
}

export function getContactSubmissions(): ContactSubmission[] {
  const arr = safeGetItem<ContactSubmission[]>(STORAGE_KEYS.CONTACT_MESSAGES, []);
  return Array.isArray(arr) ? arr : [];
}

export function saveContactSubmission(submission: Omit<ContactSubmission, 'id' | 'timestamp'>): ContactSubmission {
  const current = getContactSubmissions();
  const entry: ContactSubmission = {
    ...submission,
    id: `msg_${Date.now()}`,
    timestamp: new Date().toISOString(),
  };
  safeSetItem(STORAGE_KEYS.CONTACT_MESSAGES, [entry, ...current]);
  return entry;
}
