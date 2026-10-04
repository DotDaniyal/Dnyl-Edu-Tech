/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppLanguage = 'en' | 'ur';

export interface Translations {
  nav: {
    home: string;
    courses: string;
    practice: string;
    dashboard: string;
    projects: string;
    articles: string;
    search: string;
    searchShortcut: string;
    themeToggle: string;
    languageToggle: string;
    openMenu: string;
    closeMenu: string;
    portfolio: string;
  };
  hero: {
    kicker: string;
    mainHeading1: string;
    mainHeading2: string;
    subHeading: string;
    description: string;
    startLearning: string;
    exploreCourses: string;
    viewPortfolio: string;
    github: string;
    continueBannerTitle: string;
    continueBannerAction: string;
    continueFrom: string;
  };
  catalog: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterAll: string;
    filterSaved: string;
    clearFilters: string;
    difficultyAll: string;
    difficultyBeginner: string;
    difficultyIntermediate: string;
    difficultyAdvanced: string;
    resultsFound: string;
    noResultsTitle: string;
    noResultsDesc: string;
    resetSearch: string;
    recommendedBadge: string;
    quickPreview: string;
  };
  courseCard: {
    lessons: string;
    minutes: string;
    startCourse: string;
    continueCourse: string;
    completed: string;
    inProgress: string;
    saveCourse: string;
    unsaveCourse: string;
    viewCurriculum: string;
    level: string;
    topics: string;
  };
  lesson: {
    backToCourses: string;
    courseProgress: string;
    completed: string;
    markComplete: string;
    markIncomplete: string;
    nextLesson: string;
    prevLesson: string;
    viewInUrdu: string;
    viewInEnglish: string;
    urduBadge: string;
    tenPointsTitle: string;
    practiceTab: string;
    codeRunnerTab: string;
    copyCode: string;
    copied: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    streak: string;
    completedLessons: string;
    completedChallenges: string;
    xpEarned: string;
    savedCourses: string;
    recentActivity: string;
    noSavedCourses: string;
    exploreToSave: string;
    resume: string;
  };
  searchModal: {
    title: string;
    placeholder: string;
    categories: string;
    courses: string;
    lessons: string;
    projects: string;
    articles: string;
    noResults: string;
    navigateTip: string;
    selectTip: string;
    closeTip: string;
    clearHistory: string;
    recentSearches: string;
  };
  footer: {
    tagline: string;
    rights: string;
    learningTracks: string;
    portfolioLinks: string;
    resources: string;
    backToTop: string;
  };
  common: {
    loading: string;
    error: string;
    close: string;
    allRightsReserved: string;
    minutesShort: string;
    lessonsShort: string;
  };
}

export const TRANSLATIONS: Record<AppLanguage, Translations> = {
  en: {
    nav: {
      home: 'Home',
      courses: 'Courses',
      practice: 'Practice Lab',
      dashboard: 'My Learning',
      projects: 'Projects',
      articles: 'Engineering Blog',
      search: 'Search platform...',
      searchShortcut: '⌘K',
      themeToggle: 'Toggle theme',
      languageToggle: 'Switch to Roman Urdu',
      openMenu: 'Open main menu',
      closeMenu: 'Close menu',
      portfolio: 'Portfolio',
    },
    hero: {
      kicker: 'Created by Daniyal Hayat · Full-Stack Developer & Creative Builder',
      mainHeading1: 'Learn. Build. Grow',
      mainHeading2: 'with Daniyal.',
      subHeading: 'Learn Programming. Understand Concepts. Build Real Things.',
      description:
        'Daniyal Edu Tech is a developer-focused programming education platform crafted by Daniyal Hayat — combining a structured 10-Point Learning System, clear English & Roman Urdu explanations, live coding sandboxes, and architectural breakdowns of real production repositories.',
      startLearning: 'Start Learning',
      exploreCourses: 'Explore Courses',
      viewPortfolio: "Daniyal's Portfolio",
      github: 'GitHub',
      continueBannerTitle: 'Continue Learning Where You Left Off',
      continueBannerAction: 'Continue Lesson',
      continueFrom: 'Continue',
    },
    catalog: {
      badge: 'Structured 10-Point Curriculum · English & Roman Urdu',
      title: 'Explore Programming Tracks',
      subtitle:
        'Comprehensive, production-tested courses engineered to help you master modern web architectures, native Android development, algorithms, and AI tooling.',
      searchPlaceholder: 'Search tracks by keyword, topic, or concept (e.g., TypeScript, State Machine, Kotlin)...',
      filterAll: 'All Tracks',
      filterSaved: 'Saved Courses',
      clearFilters: 'Clear Filters',
      difficultyAll: 'All Levels',
      difficultyBeginner: 'Beginner',
      difficultyIntermediate: 'Intermediate',
      difficultyAdvanced: 'Advanced',
      resultsFound: 'tracks found',
      noResultsTitle: 'No Matching Tracks Found',
      noResultsDesc: 'Try adjusting your search query, switching difficulty, or clearing active filters.',
      resetSearch: 'Reset Search Filters',
      recommendedBadge: 'Recommended Track',
      quickPreview: 'Curriculum Preview',
    },
    courseCard: {
      lessons: 'lessons',
      minutes: 'min total',
      startCourse: 'Start Course',
      continueCourse: 'Continue Learning',
      completed: 'Completed',
      inProgress: 'In Progress',
      saveCourse: 'Save course',
      unsaveCourse: 'Remove from saved',
      viewCurriculum: 'View Lessons',
      level: 'Level',
      topics: 'Topics',
    },
    lesson: {
      backToCourses: 'Back to Tracks',
      courseProgress: 'Course Progress',
      completed: 'Completed',
      markComplete: 'Mark as Completed',
      markIncomplete: 'Mark as Incomplete',
      nextLesson: 'Next Lesson',
      prevLesson: 'Previous Lesson',
      viewInUrdu: 'Roman Urdu Explanation',
      viewInEnglish: 'English Explanation',
      urduBadge: 'Roman Urdu Intuition',
      tenPointsTitle: '10-Point Deep Dive Breakdown',
      practiceTab: 'Practice & Challenges',
      codeRunnerTab: 'Interactive Code Arena',
      copyCode: 'Copy Snippet',
      copied: 'Copied to Clipboard!',
    },
    dashboard: {
      title: 'My Learning Hub',
      subtitle: 'Track your completed lessons, coding arena challenges, bookmarks, and active course progress in one place.',
      streak: 'Day Streak',
      completedLessons: 'Lessons Completed',
      completedChallenges: 'Challenges Solved',
      xpEarned: 'Total Dev XP',
      savedCourses: 'Saved Courses',
      recentActivity: 'Recent Study Tracks',
      noSavedCourses: 'You haven’t saved any courses yet.',
      exploreToSave: 'Browse course catalog to bookmark your favorite learning tracks.',
      resume: 'Resume Track',
    },
    searchModal: {
      title: 'Quick Navigation & Command Search',
      placeholder: 'Search courses, lessons, real projects, and articles...',
      categories: 'Categories',
      courses: 'Courses & Tracks',
      lessons: 'Individual Lessons',
      projects: 'Real Projects',
      articles: 'Engineering Articles',
      noResults: 'No matches found for your search.',
      navigateTip: 'Navigate with',
      selectTip: 'to open',
      closeTip: 'to close',
      clearHistory: 'Clear Recent',
      recentSearches: 'Recent Searches',
    },
    footer: {
      tagline: 'Empowering developers with real-world architectural foundations, live sandboxes, and verified production code.',
      rights: 'All rights reserved.',
      learningTracks: 'Learning Tracks',
      portfolioLinks: 'Live Projects & Showcase',
      resources: 'Curriculum & Resources',
      backToTop: 'Back to Top',
    },
    common: {
      loading: 'Loading content...',
      error: 'An unexpected error occurred.',
      close: 'Close',
      allRightsReserved: 'All rights reserved',
      minutesShort: 'min',
      lessonsShort: 'lessons',
    },
  },
  ur: {
    nav: {
      home: 'Home (مرکزی)',
      courses: 'Courses (کورسز)',
      practice: 'Practice Lab (پریکٹس)',
      dashboard: 'My Learning (ڈیش بورڈ)',
      projects: 'Projects (پروجیکٹس)',
      articles: 'Engineering Blog (مضامین)',
      search: 'Search karein...',
      searchShortcut: '⌘K',
      themeToggle: 'Theme badlein',
      languageToggle: 'English mein dekhein',
      openMenu: 'Menu kholein',
      closeMenu: 'Menu band karein',
      portfolio: 'Daniyal Portfolio',
    },
    hero: {
      kicker: 'Daniyal Hayat ka tayyar karda · Full-Stack Developer & Creative Builder',
      mainHeading1: 'Seekhein. Banayein. Grow Karein',
      mainHeading2: 'Daniyal ke sath.',
      subHeading: 'Programming Seekhein. Concepts Samjhein. Real Systems Banayein.',
      description:
        'Daniyal Edu Tech aik developer-focused platform hai jo Daniyal Hayat ne design kiya hai — structured 10-Point Learning System, Roman Urdu aur English explanations, live code sandbox aur production projects ke detailed breakdowns ke sath.',
      startLearning: 'Seekhna Shuru Karein',
      exploreCourses: 'Courses Dekhein',
      viewPortfolio: 'Daniyal ka Portfolio',
      github: 'GitHub Repositories',
      continueBannerTitle: 'Jahan se chora tha wahin se continue karein',
      continueBannerAction: 'Sabaq Continue Karein',
      continueFrom: 'Continue',
    },
    catalog: {
      badge: '10-Point Structured Curriculum · English & Roman Urdu',
      title: 'Programming Tracks Explore Karein',
      subtitle:
        'Practical aur industry-tested courses jo modern web architecture, native Android apps, algorithms aur AI tooling sikhate hain.',
      searchPlaceholder: 'Topic ya concept search karein (maslan: TypeScript, State Machine, React)...',
      filterAll: 'Tamam Tracks',
      filterSaved: 'Saved Courses',
      clearFilters: 'Filters Clear Karein',
      difficultyAll: 'Har Level',
      difficultyBeginner: 'Beginner (ابتدائی)',
      difficultyIntermediate: 'Intermediate (درمیانی)',
      difficultyAdvanced: 'Advanced (اعلیٰ)',
      resultsFound: 'courses dastiyab hain',
      noResultsTitle: 'Koi Course Nahi Mila',
      noResultsDesc: 'Search query ya category filter tabdeel kar ke dobarah check karein.',
      resetSearch: 'Filters Reset Karein',
      recommendedBadge: 'Tajweez Karda Track',
      quickPreview: 'Curriculum Preview',
    },
    courseCard: {
      lessons: 'asbaaq',
      minutes: 'minute total',
      startCourse: 'Course Shuru Karein',
      continueCourse: 'Jari Rakhein',
      completed: 'Mukammal',
      inProgress: 'Jari Hai',
      saveCourse: 'Bookmark karein',
      unsaveCourse: 'Bookmark hatayein',
      viewCurriculum: 'Lessons Dekhein',
      level: 'Level',
      topics: 'Topics',
    },
    lesson: {
      backToCourses: 'Tamam Tracks par wapis jayein',
      courseProgress: 'Course Progress',
      completed: 'Mukammal Shuda',
      markComplete: 'Mukammal Mark Karein',
      markIncomplete: 'Ghair Mukammal Mark Karein',
      nextLesson: 'Agla Sabaq',
      prevLesson: 'Pichla Sabaq',
      viewInUrdu: 'Roman Urdu Tashreeh',
      viewInEnglish: 'English Tashreeh',
      urduBadge: 'Roman Urdu Concept Insight',
      tenPointsTitle: '10-Point Step-by-Step Deep Dive',
      practiceTab: 'Practice & MCQs',
      codeRunnerTab: 'Interactive Code Arena',
      copyCode: 'Code Copy Karein',
      copied: 'Code Copy Ho Gaya!',
    },
    dashboard: {
      title: 'Aap Ka Learning Hub',
      subtitle: 'Apne mukammal asbaaq, coding arena challenges, bookmarks aur active progress aik jagah check karein.',
      streak: 'Day Streak',
      completedLessons: 'Mukammal Asbaaq',
      completedChallenges: 'Hal Shuda Challenges',
      xpEarned: 'Total Dev XP',
      savedCourses: 'Saved Courses',
      recentActivity: 'Haliya Tracks',
      noSavedCourses: 'Aap ne abhi tak koi course bookmark nahi kiya.',
      exploreToSave: 'Course catalog mein ja kar pasandeeda tracks save karein.',
      resume: 'Track Jari Rakhein',
    },
    searchModal: {
      title: 'Quick Command Search',
      placeholder: 'Courses, asbaaq, projects aur articles search karein...',
      categories: 'Categories',
      courses: 'Courses & Tracks',
      lessons: 'Individual Lessons',
      projects: 'Real Projects',
      articles: 'Engineering Articles',
      noResults: 'Aap ki search ke mutabiq kuch nahi mila.',
      navigateTip: 'Navigate karein',
      selectTip: 'open karne ke liye',
      closeTip: 'band karne ke liye',
      clearHistory: 'History Saaf Karein',
      recentSearches: 'Haliya Searches',
    },
    footer: {
      tagline: 'Real-world software engineering, verified production code aur practical explanations ke sath.',
      rights: 'Tamam huqooq mehfooz hain.',
      learningTracks: 'Learning Tracks',
      portfolioLinks: 'Live Projects & Portfolio',
      resources: 'Curriculum & Resources',
      backToTop: 'Wapis Ooper Jayein',
    },
    common: {
      loading: 'Load ho raha hai...',
      error: 'Ghalti pesh aai hai.',
      close: 'Band karein',
      allRightsReserved: 'Tamam huqooq mehfooz hain',
      minutesShort: 'min',
      lessonsShort: 'asbaaq',
    },
  },
};
