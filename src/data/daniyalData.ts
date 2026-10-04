import { VerifiedSkill, RealProject, EngineeringArticle } from '../types/edu';

export const DANIYAL_IDENTITY = {
  platformName: 'Daniyal Edu Tech',
  founderName: 'Daniyal Hayat',
  primaryBrand: 'Daniyal',
  role: 'Full-Stack Developer & Creative Builder',
  tagline: 'Building High-Impact Web Platforms & Resilient Digital Systems.',
  heroMainHeading: 'Learn. Build. Grow with Daniyal.',
  heroSubHeading: 'Learn Programming. Understand Concepts. Build Real Things.',
  heroDescription:
    'Daniyal Edu Tech is a developer-focused programming education platform created by Daniyal Hayat — Full-Stack Developer & Creative Builder crafting modern web platforms, interactive applications, native Android apps in Kotlin, and AI-powered digital products.',
  aboutBio: [
    'Daniyal Hayat is a Full-Stack Developer & Creative Builder focused on engineering modern web platforms, interactive applications, native Android mobile apps in Kotlin, and AI-powered digital products.',
    'Through hands-on engineering across React, Next.js, TypeScript, Tailwind CSS, Kotlin, Node.js, and the Google Gemini AI SDK, Daniyal builds digital systems that prioritize clean architecture, offline resilience, type safety, and responsive user experience.',
    'Daniyal Edu Tech brings this real-world engineering workflow into an interactive educational environment — combining a structured 10-Point Learning System, clear English and Roman Urdu explanations, live coding sandboxes, and architectural breakdowns of real production repositories.'
  ],
  portfolioUrl: 'https://daniyal-hayat-portfolio.vercel.app/',
  githubUrl: 'https://github.com/DotDaniyal',
  githubUsername: 'DotDaniyal',
  email: 'mdaniyalhayyat@gmail.com',
  profileImage: '/profile.jpeg',
  location: 'Available Globally & Remote',
  focusAreas: [
    'Full-Stack Web Engineering (React, Next.js, TypeScript, Tailwind CSS)',
    'Native Android Mobile Development (Kotlin, Android SDK, Offline Persistence)',
    'Algorithmic Systems & Interactive Canvas Engines (State Machines, 2D Matrices, Web Audio)',
    'AI Application Engineering (Google AI Studio, Gemini SDK, Defensive Prompting & Proxy Routes)'
  ],
  services: [
    {
      title: 'Full-Stack Web Development',
      tagline: 'High-performance web apps built to scale',
      description:
        'End-to-end development of modern web applications using React, Next.js, and TypeScript with clean component architecture and responsive Tailwind CSS design systems.'
    },
    {
      title: 'Native Android Mobile Apps',
      tagline: 'Fluid, reliable apps built with Kotlin',
      description:
        'Native Android development utilizing Kotlin and modern Android SDK patterns, emphasizing smooth touch ergonomics, local SQLite/Room offline caching, and lightweight memory footprints.'
    },
    {
      title: 'Google AI Studio & AI App Engineering',
      tagline: 'Empowering applications with AI Studio & Gemini capabilities',
      description:
        'Architecting custom AI applications using Google AI Studio and @google/genai SDK with structured JSON schemas, defensive guardrails, and secure server-side API proxy routes.'
    },
    {
      title: 'UI/UX Craft & Performance Audits',
      tagline: 'Delivering world-class digital feel',
      description:
        'Transforming interfaces into accessible, responsive digital experiences with dual-theme systems, purposeful Motion transitions, and technical SEO optimization.'
    }
  ]
} as const;

export const LEARNING_PRINCIPLES = [
  {
    number: '01',
    title: 'Concept First',
    subtitle: 'Understand the idea before memorizing syntax.',
    description:
      'Syntax changes across languages, but mental models endure. Every topic starts with a clear definition, simple explanation, Roman Urdu intuition, and a concrete real-world analogy.'
  },
  {
    number: '02',
    title: 'Real Code',
    subtitle: 'Learn through practical examples.',
    description:
      'Instead of abstract foo/bar snippets, lessons use realistic code patterns drawn from production web applications, API pipelines, and interactive user interfaces.'
  },
  {
    number: '03',
    title: 'Understand Internals',
    subtitle: 'Explain what happens behind the scenes.',
    description:
      'Every lesson unpacks how the runtime, call stack, DOM reconciler, or state machine executes your code line by line — plus the common mistakes beginners make.'
  },
  {
    number: '04',
    title: 'Build Projects',
    subtitle: 'Turn knowledge into working projects.',
    description:
      'Connect every programming track directly to real repositories built by Daniyal Hayat — inspecting how HTML, CSS, TypeScript, React, and Kotlin power deployed software.'
  }
] as const;

export const TEN_POINT_SYSTEM_META = [
  { step: '01', title: 'Definition', desc: 'What is it?' },
  { step: '02', title: 'Simple Explanation', desc: 'Explain it in beginner-friendly language.' },
  { step: '03', title: 'Real-World Analogy', desc: 'Connect the concept to something familiar.' },
  { step: '04', title: 'Syntax', desc: 'Show the basic syntax.' },
  { step: '05', title: 'Code Example', desc: 'Provide practical code.' },
  { step: '06', title: 'Line-by-Line Explanation', desc: 'Explain important lines.' },
  { step: '07', title: 'How It Works', desc: 'Explain the internal process.' },
  { step: '08', title: 'Common Mistakes', desc: 'Show mistakes beginners make.' },
  { step: '09', title: 'Practical Example', desc: 'Show how developers actually use it.' },
  { step: '10', title: 'Practice', desc: 'Give exercises and challenges.' }
] as const;

export const VERIFIED_SKILLS: VerifiedSkill[] = [
  {
    id: 'skill-typescript',
    name: 'TypeScript',
    category: 'Programming',
    iconName: 'FileCode2',
    shortDescription:
      'Strongly typed superset of JavaScript used across Daniyal’s flagship web platforms, AI suites, and interactive applications for compile-time safety.',
    relatedCourseIds: ['course-typescript', 'course-react', 'course-nextjs'],
    relatedProjectIds: ['cortexiq-by-dnyl', 'daniyal-hayat-portfolio', 'dnyl-eyewear', 'islamic-ai-mujeeb']
  },
  {
    id: 'skill-javascript',
    name: 'JavaScript (ES6+)',
    category: 'Programming',
    iconName: 'Terminal',
    shortDescription:
      'Core language of the web powering asynchronous Fetch pipelines, DOM manipulation, Canvas loops, and client state architecture.',
    relatedCourseIds: ['course-javascript', 'course-algorithms'],
    relatedProjectIds: ['hamara-weather', 'offical-darul-ifta-irshad-us-saileen', 'faryal-fc']
  },
  {
    id: 'skill-react',
    name: 'React',
    category: 'Frontend',
    iconName: 'Atom',
    shortDescription:
      'Component-driven UI engineering with hooks, memoized state pipelines, and reactive data views used in production apps.',
    relatedCourseIds: ['course-react', 'course-nextjs'],
    relatedProjectIds: ['daniyal-hayat-portfolio', 'faryal-fc', 'dnyl-eyewear', 'cortexiq-by-dnyl']
  },
  {
    id: 'skill-nextjs',
    name: 'Next.js',
    category: 'Frontend',
    iconName: 'Layers',
    shortDescription:
      'Full-stack React framework for structured routing, hybrid rendering, technical SEO optimization, and scalable web architecture.',
    relatedCourseIds: ['course-nextjs', 'course-react'],
    relatedProjectIds: ['daniyal-hayat-portfolio', 'darul-ifta-web']
  },
  {
    id: 'skill-tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend',
    iconName: 'Palette',
    shortDescription:
      'Utility-first CSS architecture for crafting responsive mobile-first layouts, dark/light theme systems, and high-contrast typography.',
    relatedCourseIds: ['course-html-css', 'course-tailwind'],
    relatedProjectIds: ['dnyl-eyewear', 'faryal-fc', 'offical-darul-ifta-irshad-us-saileen']
  },
  {
    id: 'skill-html-css',
    name: 'HTML5 & CSS3',
    category: 'Frontend',
    iconName: 'Layout',
    shortDescription:
      'Semantic document structure, accessibility standards, RTL/LTR bilingual layouts, Flexbox, CSS Grid, and Web Canvas foundations.',
    relatedCourseIds: ['course-html-css', 'course-tailwind'],
    relatedProjectIds: ['offical-darul-ifta-irshad-us-saileen', 'hamara-weather']
  },
  {
    id: 'skill-kotlin',
    name: 'Kotlin & Android SDK',
    category: 'Mobile',
    iconName: 'Smartphone',
    shortDescription:
      'Native Android application and algorithmic game engineering using Kotlin, XML/Material layouts, and local offline storage.',
    relatedCourseIds: ['course-kotlin-android', 'course-algorithms'],
    relatedProjectIds: ['darul-ifta-irshad-us-saileen-app2', 'mystic-match-by-dnyl']
  },
  {
    id: 'skill-node-express',
    name: 'Node.js & Express',
    category: 'Backend',
    iconName: 'Server',
    shortDescription:
      'Server-side JavaScript runtime and Express API routing used for secure credential proxying, REST endpoints, and backend workflows.',
    relatedCourseIds: ['course-nodejs-express', 'course-ai-engineering'],
    relatedProjectIds: ['islamic-ai-mujeeb', 'soutnaqi-ai', 'cortexiq-by-dnyl']
  },
  {
    id: 'skill-rest-apis',
    name: 'RESTful APIs & Async Data',
    category: 'Backend',
    iconName: 'Globe',
    shortDescription:
      'Asynchronous HTTP communication, JSON schema validation, defensive error boundaries, and live GitHub/weather data synchronization.',
    relatedCourseIds: ['course-javascript', 'course-nodejs-express'],
    relatedProjectIds: ['hamara-weather', 'daniyal-hayat-portfolio', 'islamic-ai-mujeeb']
  },
  {
    id: 'skill-sqlite-storage',
    name: 'SQLite / Room & LocalStorage',
    category: 'Databases',
    iconName: 'Database',
    shortDescription:
      'Client-side and native mobile data persistence strategies ensuring uninterrupted offline reading, state caching, and fault tolerance.',
    relatedCourseIds: ['course-sql-persistence', 'course-kotlin-android'],
    relatedProjectIds: ['darul-ifta-irshad-us-saileen-app2', 'dnyl-eyewear', 'daniyal-hayat-portfolio']
  },
  {
    id: 'skill-gemini-ai',
    name: 'Google AI Studio & Gemini SDK',
    category: 'Tools & AI',
    iconName: 'Cpu',
    shortDescription:
      'Building intelligent applications with @google/genai SDK, system instructions, structured JSON output grounding, and defensive prompt engineering.',
    relatedCourseIds: ['course-ai-engineering', 'course-typescript'],
    relatedProjectIds: ['cortexiq-by-dnyl', 'islamic-ai-mujeeb', 'soutnaqi-ai']
  },
  {
    id: 'skill-git-vite',
    name: 'Git, GitHub, Vite & Motion',
    category: 'Tools & AI',
    iconName: 'GitBranch',
    shortDescription:
      'Modern build tooling with Vite, version control and repository management on GitHub, and smooth 60 FPS animations with Motion.',
    relatedCourseIds: ['course-git-deployment', 'course-react'],
    relatedProjectIds: ['daniyal-hayat-portfolio', 'mystic-match-by-dnyl', 'faryal-fc']
  }
];

export const REAL_PROJECTS: RealProject[] = [
  {
    id: 'offical-darul-ifta-irshad-us-saileen',
    name: 'Official Darul Ifta Irshad us Saileen',
    repoName: 'DotDaniyal/Offical-Darul-ifta-Irshad-us-saileen-',
    description:
      'Production web platform serving community religious consultation and guidance resources with bilingual Urdu/English support, searchable fatwa categories, and high-performance responsive layouts.',
    category: 'Web Platform',
    language: 'TypeScript / JavaScript',
    technologies: ['TypeScript', 'HTML5', 'Tailwind CSS', 'JavaScript ES6+', 'REST APIs', 'Responsive RTL/LTR'],
    githubUrl: 'https://github.com/DotDaniyal/Offical-Darul-ifta-Irshad-us-saileen-',
    liveUrl: 'https://darulifta-bkfbzf6u.manus.space/',
    relatedCourseIds: ['course-html-css', 'course-tailwind', 'course-javascript'],
    relatedTopic: 'Semantic HTML5, Bilingual RTL/LTR Typography & Low-Bandwidth Web Architecture',
    learnBreakdown: {
      technologyUsed: 'Semantic HTML5, Tailwind CSS, JavaScript ES6+, TypeScript, and RESTful API integration.',
      architecture:
        'Lightweight client architecture engineered for fast initial paint and minimal bundle overhead on variable-speed cellular connections.',
      uiAndDesign:
        'Dignified editorial typography with high contrast, clean categorization, and seamless switching between RTL (Urdu/Arabic) and LTR (English) reading modes.',
      components:
        'Categorized Fatwa Repository Index, Searchable Inquiry Portal, Direct Question Submission Form, and Mobile Reading Drawer.',
      coreLogic:
        'Client-side search indexing and category filtering combined with clean DOM updates to eliminate layout shift during archive browsing.',
      developmentProcess:
        'Designed around real community accessibility needs — prioritizing legibility, fast asset loading, and structured archive navigation.'
    }
  },
  {
    id: 'mystic-match-by-dnyl',
    name: 'Mystic Match Puzzle Game',
    repoName: 'DotDaniyal/Mystic-Match',
    description:
      'Mobile-first fantasy match-3 algorithmic puzzle game engineered with custom game mechanics, 2D matrix traversal algorithms, and responsive touch physics.',
    category: 'Mobile & Web Game',
    language: 'Kotlin & TypeScript',
    technologies: ['Kotlin', 'TypeScript', '2D Matrix Algorithms', 'State Machines', 'Canvas UI', 'Vercel'],
    githubUrl: 'https://github.com/DotDaniyal/Mystic-Match',
    liveUrl: 'https://mystic-match-rho.vercel.app/',
    relatedCourseIds: ['course-algorithms', 'course-kotlin-android', 'course-typescript'],
    relatedTopic: 'Finite State Machines & 2D Coordinate Matrix Traversal',
    learnBreakdown: {
      technologyUsed: 'Kotlin, TypeScript, Android/Web Canvas rendering, and custom algorithmic state machines.',
      architecture:
        'Deterministic finite state machine (IDLE -> SWAPPING -> CHECKING -> CLEARING -> DROPPING) that prevents race conditions and infinite cascade loops.',
      uiAndDesign:
        'Fantasy neo-aesthetic featuring distinct gem motifs, clear board boundaries, and immediate visual reactions upon valid match combinations.',
      components:
        '2D Grid Board Renderer, Touch/Drag Gesture Controller, Cascade Multiplier Calculator, and Score Telemetry Header.',
      coreLogic:
        'Horizontal and vertical contiguous run-length scanning across a 2D array, followed by gravity-based column compaction and top-row tile replenishment.',
      developmentProcess:
        'Built from scratch without bloated third-party game engines to maintain strict memory control and smooth 60 FPS touch responsiveness.'
    }
  },
  {
    id: 'hamara-weather',
    name: 'Hamara Weather',
    repoName: 'DotDaniyal/Hamara-Weather',
    description:
      'Real-time meteorological tracking application delivering live atmospheric condition metrics, precision forecasts, and intuitive visual data with minimal bandwidth footprint.',
    category: 'Utility App',
    language: 'TypeScript / JavaScript',
    technologies: ['JavaScript ES6+', 'TypeScript', 'OpenWeather API', 'HTML5', 'CSS3', 'Async Fetch Pipeline'],
    githubUrl: 'https://github.com/DotDaniyal/Hamara-Weather',
    liveUrl: 'https://hamara-weather.vercel.app/',
    relatedCourseIds: ['course-javascript', 'course-html-css'],
    relatedTopic: 'Asynchronous Fetch API Pipelines, JSON Parsing & Defensive Error Handling',
    learnBreakdown: {
      technologyUsed: 'JavaScript (ES6+), TypeScript, OpenWeather REST API, Semantic HTML5, and CSS3.',
      architecture:
        'Asynchronous request-response pipeline with defensive try/catch wrappers, input sanitization, and graceful fallback states.',
      uiAndDesign:
        'Ad-free atmospheric interface with clear typographic hierarchy separating primary temperature readouts from secondary humidity, wind, and pressure telemetry.',
      components:
        'Instant City Search Bar, Live Atmospheric Metric Grid, Condition Status Banner, and Error Recovery Alert.',
      coreLogic:
        'Async/await Fetch execution with HTTP status verification, metric unit formatting, and DOM state synchronization.',
      developmentProcess:
        'Created to replace cluttered, ad-heavy weather portals with a fast, dependable utility deployed live on Vercel.'
    }
  },
  {
    id: 'cortexiq-by-dnyl',
    name: 'CortexIQ AI Suite',
    repoName: 'DotDaniyal/cortexiq-by-dnyl',
    description:
      'Production-ready AI computational intelligence suite featuring LLM integration, reactive dashboard telemetry, and modular TypeScript tool pipelines.',
    category: 'AI & Intelligence',
    language: 'TypeScript',
    technologies: ['TypeScript', 'React', 'Google Gemini AI SDK', 'Tailwind CSS', 'Vite', 'Motion'],
    githubUrl: 'https://github.com/DotDaniyal/cortexiq-by-dnyl',
    liveUrl: 'https://daniyal-hayat-portfolio.vercel.app/',
    relatedCourseIds: ['course-ai-engineering', 'course-typescript', 'course-react'],
    relatedTopic: 'Type-Safe AI SDK Integration, Reactive Dashboards & Server-Side Key Protection',
    learnBreakdown: {
      technologyUsed: 'TypeScript, React 19, Google Gemini AI SDK (@google/genai), Tailwind CSS, Vite, and Motion.',
      architecture:
        'Client-server boundary separating reactive React dashboard views from server-side API proxy routes that safeguard API keys.',
      uiAndDesign:
        'Obsidian-and-cyan dark interface with structured telemetry panels and zero-latency visual feedback during model streaming.',
      components:
        'Prompt Workspace Editor, Structured JSON Output Inspector, Token & Latency Telemetry Cards, and Error Boundary Wrapper.',
      coreLogic:
        'Memoized React state updates combined with structured schema validation for deterministic AI responses.',
      developmentProcess:
        'Engineered with 100% TypeScript coverage and defensive loading states for reliable developer workflows.'
    }
  },
  {
    id: 'faryal-fc',
    name: 'Faryal FC Web Platform',
    repoName: 'DotDaniyal/FARYAL-FC',
    description:
      'Modern sports club web platform featuring fixture schedules, squad roster management, matchday highlights, and a mobile-first fan experience.',
    category: 'Web Platform',
    language: 'TypeScript',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript ES6+', 'Vercel'],
    githubUrl: 'https://github.com/DotDaniyal/FARYAL-FC',
    liveUrl: 'https://faryal-fc.vercel.app/',
    relatedCourseIds: ['course-react', 'course-tailwind'],
    relatedTopic: 'Component-Driven Lists, Filtering & Mobile-First Sports UI',
    learnBreakdown: {
      technologyUsed: 'React, TypeScript, Tailwind CSS, and Vercel deployment.',
      architecture:
        'Single-page component architecture with instantaneous tab transitions and zero layout shift on mobile connections.',
      uiAndDesign:
        'High-contrast athletic dark theme with bold tabular numerals for kickoff times, match scores, and player jersey numbers.',
      components:
        'Fixture Timeline Matrix, Interactive Squad Roster Grid, Player Profile Modal, and Matchday Recap Cards.',
      coreLogic:
        'Declarative array filtering and sorting by player position, fixture date, and match status.',
      developmentProcess:
        'Built to centralize fragmented club announcements into a fast, scannable hub where fans find kickoff times in under two seconds.'
    }
  },
  {
    id: 'dnyl-eyewear',
    name: 'DNYL Eyewear Boutique Experience',
    repoName: 'DotDaniyal/DNYL-EYEWEAR',
    description:
      'Luxury optical boutique showcase featuring editorial layouts, curated frame catalogues, interactive lens customizer, and LocalStorage cart persistence.',
    category: 'E-Commerce & Brand',
    language: 'TypeScript',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'LocalStorage'],
    githubUrl: 'https://github.com/DotDaniyal/DNYL-EYEWEAR',
    liveUrl: 'https://dnyl-eyewear.vercel.app/',
    relatedCourseIds: ['course-react', 'course-tailwind', 'course-sql-persistence'],
    relatedTopic: 'Editorial UI Architecture, Interactive Product Customizers & LocalStorage State',
    learnBreakdown: {
      technologyUsed: 'React 19, TypeScript, Tailwind CSS, Motion, and LocalStorage state persistence.',
      architecture:
        'Modular e-commerce state engine combining multi-criteria catalog filtering with persistent client-side cart storage.',
      uiAndDesign:
        'Editorial monochrome and cyan palette with generous whitespace, treating each optical frame with gallery-grade visual hierarchy.',
      components:
        'Frame Lookbook Grid, Interactive Lens & Tint Customizer, Persistent Cart Drawer, and Progressive Image Wrapper.',
      coreLogic:
        'Type-safe configuration state reducer calculating frame + lens options and syncing cart state to LocalStorage.',
      developmentProcess:
        'Focused on pairing high-fashion editorial typography with sub-second page responsiveness.'
    }
  },
  {
    id: 'darul-ifta-irshad-us-saileen-app2',
    name: 'Darul Ifta Android App v2',
    repoName: 'DotDaniyal/Darul-Ifta-Irshad-us-Saileen-app2',
    description:
      'Second-generation native Android application engineered in Kotlin featuring offline caching, refined Material layouts, and rapid consultation querying.',
    category: 'Mobile App',
    language: 'Kotlin',
    technologies: ['Kotlin', 'Android SDK', 'SQLite / Room', 'Offline Caching', 'XML Material Layouts'],
    githubUrl: 'https://github.com/DotDaniyal/Darul-Ifta-Irshad-us-Saileen-app2',
    liveUrl: 'https://darulifta-bkfbzf6u.manus.space/',
    relatedCourseIds: ['course-kotlin-android', 'course-sql-persistence'],
    relatedTopic: 'Native Android Lifecycle, ViewHolder Recycling & Offline-First Caching',
    learnBreakdown: {
      technologyUsed: 'Kotlin, Android Studio, Android SDK, local SQLite/Room caching, and XML Material layouts.',
      architecture:
        'Offline-first mobile architecture that caches previously read fatwas locally so users in low-connectivity regions never lose access.',
      uiAndDesign:
        'Modern Android Material guidelines with accessible touch targets, intuitive navigation bars, and clear Urdu/Arabic script rendering.',
      components:
        'Offline Fatwa Reader, RecyclerView Adapter with ViewHolder pattern, Local Cache Sync Manager, and Bilingual Search Bar.',
      coreLogic:
        'Local database lookup prior to network fetch, with background synchronization and memory-efficient list recycling.',
      developmentProcess:
        'Rebuilt mobile navigation from the ground up in v2 to optimize disk I/O and memory footprint for low-spec Android devices.'
    }
  },
  {
    id: 'daniyal-hayat-portfolio',
    name: 'Daniyal Hayat Portfolio Platform',
    repoName: 'DotDaniyal/Daniyal-Hayat-Portfolio',
    description:
      'Personal developer showcase platform featuring live GitHub repository synchronization, detailed engineering case studies, dual-theme styling, and command palette navigation.',
    category: 'Web Application',
    language: 'TypeScript',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Motion', 'GitHub REST API', 'Vite'],
    githubUrl: 'https://github.com/DotDaniyal/Daniyal-Hayat-Portfolio',
    liveUrl: 'https://daniyal-hayat-portfolio.vercel.app/',
    relatedCourseIds: ['course-react', 'course-typescript', 'course-git-deployment'],
    relatedTopic: 'Live GitHub API Synchronization with Resilient Local Fallback & Dual-Theme Systems',
    learnBreakdown: {
      technologyUsed: 'React 19, TypeScript, Tailwind CSS v4, Motion, Vite, and the GitHub REST API.',
      architecture:
        'Hybrid data layer that fetches live repository data from the GitHub API while maintaining a verified local fallback for offline resilience.',
      uiAndDesign:
        'Dual-theme (dark/light) developer showcase with interactive project case study modals and smooth page transitions.',
      components:
        'Live GitHub Repo Synchronizer, Interactive Case Study Modal, Skills Matrix, and Theme Persistence Controller.',
      coreLogic:
        'Asynchronous API hydration merged with static TypeScript case study metadata and LocalStorage theme persistence.',
      developmentProcess:
        'Built from scratch to replace generic templates with a transparent, verified engineering showcase.'
    }
  }
];

export const ENGINEERING_ARTICLES: EngineeringArticle[] = [
  {
    id: 'art-1',
    slug: 'deterministic-state-machines-in-mystic-match',
    title: 'How Finite State Machines Prevent Game Loop Bugs in Mystic Match',
    category: 'Algorithms & Game Logic',
    readTime: '5 min read',
    publishedDate: 'September 2026',
    excerpt:
      'Why boolean flags like isAnimating and isSwapping quickly break down in interactive grid games — and how a strict 5-state machine solved cascading match logic.',
    romanUrduTakeaway:
      'Jab game mein multiple animations aik sath chalti hain to boolean variables (true/false) ulajh jatay hain. Finite State Machine (IDLE, SWAPPING, CHECKING, CLEARING, DROPPING) har waqt sirf aik valid state allow karti hai.',
    relatedCourseId: 'course-algorithms',
    relatedProjectId: 'mystic-match-by-dnyl',
    sections: [
      {
        heading: 'The Problem with Scattered Boolean Flags',
        body: 'When building an interactive match-3 puzzle grid in Kotlin and TypeScript, a common beginner mistake is tracking board state with multiple booleans: isSwapping, isChecking, isDropping. As soon as a player taps rapidly during a cascade, two booleans become true simultaneously and corrupt the 2D array.'
      },
      {
        heading: 'Designing a 5-Stage Finite State Machine',
        body: 'In Mystic Match, the board controller enforces a single active state at any frame. Input events are only accepted when the board is strictly in the IDLE state.',
        codeSnippet: {
          language: 'typescript',
          code: `type BoardState = 'IDLE' | 'SWAPPING' | 'CHECKING' | 'CLEARING' | 'DROPPING';

function handleTileSwipe(currentState: BoardState, from: [number, number], to: [number, number]) {
  // Guard clause: ignore touch input while cascades are running
  if (currentState !== 'IDLE') return currentState;
  return 'SWAPPING';
}`
        }
      },
      {
        heading: 'Key Engineering Takeaway',
        body: 'Whether you are building a mobile puzzle game in Kotlin or a multi-step checkout flow in React, model mutually exclusive statuses with a union type or enum rather than independent boolean flags.'
      }
    ]
  },
  {
    id: 'art-2',
    slug: 'offline-first-caching-for-low-bandwidth-users',
    title: 'Engineering Offline-First Persistence for Web & Native Android Apps',
    category: 'Architecture & Persistence',
    readTime: '6 min read',
    publishedDate: 'September 2026',
    excerpt:
      'Lessons learned building Darul Ifta Irshad us Saileen v2 and Daniyal Edu Tech: why resilient local storage and cache-first reads matter in the real world.',
    romanUrduTakeaway:
      'Har user ke paas har waqt fast internet nahi hota. Offline-first architecture ka matlab hai ke jo data aik dafa load ho jaye ya user save kare, wo LocalStorage ya SQLite mein mehfooz rahe.',
    relatedCourseId: 'course-sql-persistence',
    relatedProjectId: 'darul-ifta-irshad-us-saileen-app2',
    sections: [
      {
        heading: 'Designing for Real-World Connectivity',
        body: 'When users in areas with unstable cellular coverage open a reference app or learning platform, a blank loading screen makes the software unusable. In Darul Ifta Android App v2, caching consulted rulings locally allowed instant offline reading.'
      },
      {
        heading: 'Safe JSON Serialization in Browser LocalStorage',
        body: 'Browser LocalStorage is synchronous and can throw errors if storage quota is exceeded or if a user manually edits a key. Wrapping every read/write in a safe helper guarantees that corrupted JSON never crashes the React component tree.',
        codeSnippet: {
          language: 'typescript',
          code: `export function safeReadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}`
        }
      }
    ]
  },
  {
    id: 'art-3',
    slug: 'defensive-api-pipelines-and-gemini-guardrails',
    title: 'Defensive API Engineering: From Weather Telemetry to Grounded AI Systems',
    category: 'Backend & AI Systems',
    readTime: '5 min read',
    publishedDate: 'October 2026',
    excerpt:
      'How structured error handling in Hamara Weather and strict system grounding in CortexIQ & Mujeeb us Saileen keep production apps reliable.',
    romanUrduTakeaway:
      'External APIs ya AI models se data lete waqt hamesha assume karein ke network fail ho sakta hai ya invalid response aa sakta hai. Defensive code har step par data validate karta hai.',
    relatedCourseId: 'course-ai-engineering',
    relatedProjectId: 'cortexiq-by-dnyl',
    sections: [
      {
        heading: 'Never Trust External Network Responses Blindly',
        body: 'In Hamara Weather, querying an external meteorological endpoint requires handling misspelled city names, HTTP 429 rate limits, and offline states gracefully without exposing raw stack traces to the user.'
      },
      {
        heading: 'Grounding AI Outputs with Structured Schemas',
        body: 'In CortexIQ AI Suite and domain-specific consultation tools, open-ended text generation is replaced with strict system instructions, server-side API key protection, and typed response schemas.',
        codeSnippet: {
          language: 'typescript',
          code: `interface GroundedResponse {
  summary: string;
  verifiedSources: string[];
  confidenceLevel: 'high' | 'needs_review';
}

function validateResponse(payload: unknown): GroundedResponse | null {
  if (!payload || typeof payload !== 'object') return null;
  const candidate = payload as Record<string, unknown>;
  if (typeof candidate.summary !== 'string' || !Array.isArray(candidate.verifiedSources)) {
    return null;
  }
  return candidate as unknown as GroundedResponse;
}`
        }
      }
    ]
  }
];
