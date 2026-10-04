export type CourseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type CourseCategory =
  | 'Frontend'
  | 'Backend'
  | 'Programming'
  | 'Database'
  | 'Mobile'
  | 'AI & Tooling';

export interface LineExplanation {
  lines: string;
  code: string;
  explanation: string;
  romanUrdu?: string;
}

export interface CommonMistake {
  title: string;
  wrongCode: string;
  correctCode: string;
  whyItHappens: string;
}

export interface PracticeMCQ {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PracticeShortAnswer {
  id: string;
  question: string;
  sampleAnswer: string;
  keyKeywords: string[];
}

export interface PracticeCodingChallenge {
  id: string;
  title: string;
  prompt: string;
  starterCode: string;
  solutionCode: string;
  expectedOutput: string;
  validationKeywords: string[];
  hint: string;
}

export interface LessonTenPointSystem {
  /** 01 — Definition: What is it? */
  definition: string;
  /** 02 — Simple Explanation: Beginner-friendly language */
  simpleExplanation: string;
  /** Roman Urdu support for simplifying the concept */
  romanUrduExplanation: string;
  /** 03 — Real-World Analogy */
  realWorldAnalogy: {
    title: string;
    analogy: string;
    connection: string;
  };
  /** 04 — Syntax */
  syntax: {
    language: string;
    code: string;
    notes: string;
  };
  /** 05 — Code Example */
  codeExample: {
    title: string;
    language: string;
    code: string;
    output: string;
  };
  /** 06 — Line-by-Line Explanation */
  lineByLine: LineExplanation[];
  /** 07 — How It Works (Internals) */
  howItWorksInternally: {
    summary: string;
    steps: string[];
  };
  /** 08 — Common Mistakes */
  commonMistakes: CommonMistake[];
  /** 09 — Practical Example (Production scenario) */
  practicalExample: {
    scenario: string;
    language: string;
    code: string;
    takeaway: string;
  };
  /** 10 — Practice */
  practice: {
    mcq: PracticeMCQ;
    shortAnswer: PracticeShortAnswer;
    codingChallenge: PracticeCodingChallenge;
    miniTask: string;
    conceptCheck: string;
  };
}

export interface Lesson {
  id: string;
  courseId: string;
  slug: string;
  number: number;
  title: string;
  summary: string;
  durationMinutes: number;
  tenPoints: LessonTenPointSystem;
}

export interface Course {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  category: CourseCategory;
  difficulty: CourseDifficulty;
  iconName: string;
  accentColor: string;
  topics: string[];
  relatedProjectIds: string[];
  lessons: Lesson[];
}

export interface VerifiedSkill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Programming' | 'Databases' | 'Mobile' | 'Tools & AI';
  iconName: string;
  shortDescription: string;
  relatedCourseIds: string[];
  relatedProjectIds: string[];
}

export interface RealProject {
  id: string;
  name: string;
  repoName: string;
  description: string;
  category: string;
  language: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  relatedCourseIds: string[];
  relatedTopic: string;
  learnBreakdown: {
    technologyUsed: string;
    architecture: string;
    uiAndDesign: string;
    components: string;
    coreLogic: string;
    developmentProcess: string;
  };
}

export interface EngineeringArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedDate: string;
  excerpt: string;
  romanUrduTakeaway: string;
  relatedCourseId: string;
  relatedProjectId: string;
  sections: {
    heading: string;
    body: string;
    codeSnippet?: {
      language: string;
      code: string;
    };
  }[];
}

export interface LastVisitedLesson {
  courseId: string;
  courseSlug: string;
  courseName: string;
  lessonId: string;
  lessonTitle: string;
  timestamp: number;
}

export interface UserPreferences {
  showRomanUrduByDefault: boolean;
  codeFontSize: 'sm' | 'base' | 'lg';
  newsletterSubscribed?: boolean;
  subscriberEmail?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  timestamp: string;
}
