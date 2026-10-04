import { Course } from '../types/edu';

export const COURSES_PART_2: Course[] = [
  {
    id: 'course-nextjs',
    slug: 'nextjs-fullstack-web-systems',
    name: 'Next.js Full-Stack Web Systems',
    shortName: 'Next.js',
    tagline: 'Architect file-based routing, Server & Client Components, and SEO-optimized web platforms.',
    description:
      'Learn how Next.js structures modern React applications. Understand the boundary between Server and Client Components, dynamic route segments (`[slug]`), and metadata generation.',
    category: 'Frontend',
    difficulty: 'Advanced',
    iconName: 'Layers',
    accentColor: 'indigo',
    topics: ['App Router Architecture', 'Server vs Client Components', 'Dynamic Route Slugs', 'Technical SEO Metadata', 'Data Caching'],
    relatedProjectIds: ['daniyal-hayat-portfolio', 'offical-darul-ifta-irshad-us-saileen'],
    lessons: [
      {
        id: 'next-lesson-1',
        courseId: 'course-nextjs',
        slug: 'server-and-client-component-boundaries',
        number: 1,
        title: 'App Router, Dynamic Slugs & Client/Server Component Boundaries',
        summary: 'Know exactly when to render on the server and when to add `"use client"` for interactive state.',
        durationMinutes: 20,
        tenPoints: {
          definition:
            'In Next.js App Router, components are Server Components by default (rendered ahead of time without shipping component JS to the browser) unless marked with `"use client"` to enable browser hooks (`useState`, `useEffect`) and LocalStorage.',
          simpleExplanation:
            'Static shells, headings, and SEO metadata can be prepared on the server, while interactive islands like a Code Sandbox, Favorite toggle, or LocalStorage dashboard use `"use client"` so they respond immediately in the user’s browser.',
          romanUrduExplanation:
            'Next.js mein har component default tor par Server Component hota hai. Jahan aapko `useState`, `onClick`, ya `localStorage` use karna ho, wahan file ke bilkul upar `"use client"` likhna zaroori hota hai.',
          realWorldAnalogy: {
            title: 'Printed Textbook Pages vs. Interactive Calculator Insert',
            analogy:
              'The printed chapters of a textbook are pre-rendered at the printing press (Server Component), while a solar-powered calculator clipped to the binder (`"use client"`) runs calculations locally in your hands.',
            connection:
              'Keep `"use client"` boundaries at the interactive leaf components so the initial bundle stays fast.'
          },
          syntax: {
            language: 'tsx',
            code: `'use client';
import { useState } from 'react';

export function InteractiveCounter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}`,
            notes: 'Place `"use client"` at the very top of a file before any `import` statements.'
          },
          codeExample: {
            title: 'Dynamic Course Slug Resolver',
            language: 'javascript',
            code: `function resolveCourseRoute(slug) {
  const validSlugs = ["javascript-es6-internals", "typescript-engineering-type-safety", "react-19-component-architecture"];
  if (!validSlugs.includes(slug)) {
    return "404: Lost in the Code — Course not found";
  }
  return \`200 OK: Rendering /course/\${slug}\`;
}

console.log(resolveCourseRoute("typescript-engineering-type-safety"));`,
            output: '200 OK: Rendering /course/typescript-engineering-type-safety'
          },
          lineByLine: [
            {
              lines: 'Line 1',
              code: "'use client';",
              explanation: 'Declares the boundary where code transitions from server-only execution to hydrated browser execution.',
              romanUrdu: 'Yeh directive batata hai ke yeh component browser mein interactive state chala sakta hai.'
            }
          ],
          howItWorksInternally: {
            summary:
              'Next.js renders Server Components into a compact React Server Component Payload (RSC) and hydrates `"use client"` components on the browser.',
            steps: [
              '1. Route Matching: Maps `/course/[slug]` to the corresponding route handler.',
              '2. Server Pass: Generates initial HTML and SEO `<head>` tags.',
              '3. Client Hydration: Attaches event listeners and reads LocalStorage inside `useEffect`.'
            ]
          },
          commonMistakes: [
            {
              title: 'Accessing `window.localStorage` directly during top-level render',
              wrongCode: `const theme = window.localStorage.getItem("theme"); // Crashes during SSR!`,
              correctCode: `const theme = typeof window !== "undefined" ? window.localStorage.getItem("theme") : "dark";`,
              whyItHappens:
                'On the server or during build pre-rendering, `window` does not exist.'
            }
          ],
          practicalExample: {
            scenario:
              'Daniyal Edu Tech’s `safeGetItem` helper checks `if (typeof window === "undefined") return fallback;` so storage utilities never crash in SSR or browser environments.',
            language: 'typescript',
            code: `export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}`,
            takeaway: 'Always guard browser-only APIs (`window`, `document`, `localStorage`) when building universal React/Next.js modules.'
          },
          practice: {
            mcq: {
              id: 'mcq-next-1',
              question: 'What directive must be placed at the top of a Next.js App Router file that uses `useState` or `useEffect`?',
              options: ["'use server'", "'use client'", "'use browser'", "'use interactive'"],
              correctIndex: 1,
              explanation: 'Client hooks and browser event listeners require the `"use client"` directive.'
            },
            shortAnswer: {
              id: 'sa-next-1',
              question: 'Why does calling `window.localStorage.getItem()` unconditionally outside `useEffect` fail during Server-Side Rendering?',
              sampleAnswer: 'Because `window` and `localStorage` are browser Web APIs that do not exist in a Node.js server environment.',
              keyKeywords: ['window', 'browser', 'server', 'Node', 'undefined']
            },
            codingChallenge: {
              id: 'cc-next-1',
              title: 'Build Safe Route Slug Generator',
              prompt:
                'Complete `toCourseSlug(title)` so `"Next.js Web Systems"` becomes `"nextjs-web-systems"`.',
              starterCode: `function toCourseSlug(title) {
  return title
    .toLowerCase()
    .replace(/\\./g, "")
    .replace(/\\s+/g, "-");
}

console.log(toCourseSlug("Next.js Web Systems"));`,
              solutionCode: `function toCourseSlug(title) {
  return title
    .toLowerCase()
    .replace(/\\./g, "")
    .replace(/\\s+/g, "-");
}

console.log(toCourseSlug("Next.js Web Systems"));`,
              expectedOutput: 'nextjs-web-systems',
              validationKeywords: ['toLowerCase', 'replace', 'return'],
              hint: 'Convert to lowercase, strip dots, and replace spaces with hyphens.'
            },
            miniTask: 'Check that all storage helper functions guard against `typeof window === "undefined"`.',
            conceptCheck: 'Can a Server Component pass serializable props (strings, numbers, arrays) down to a Client Component? Yes.'
          }
        }
      }
    ]
  },
  {
    id: 'course-kotlin-android',
    slug: 'kotlin-and-native-android-development',
    name: 'Kotlin & Native Android Development',
    shortName: 'Kotlin & Android',
    tagline: 'Build fluid native Android applications, null-safe Kotlin logic, and offline-first mobile systems.',
    description:
      'Learn Kotlin and Android engineering directly from Daniyal’s mobile projects (Darul Ifta Android App v2 & Mystic Match). Master null safety, `data class`, `sealed class`, and offline caching.',
    category: 'Mobile',
    difficulty: 'Intermediate',
    iconName: 'Smartphone',
    accentColor: 'violet',
    topics: ['Kotlin Null Safety (`?`, `?:`)', 'Data Classes & Immutability', 'Sealed Classes & State', 'Android Activity/View Lifecycle', 'Offline Caching Patterns'],
    relatedProjectIds: ['darul-ifta-irshad-us-saileen-app2', 'mystic-match-by-dnyl'],
    lessons: [
      {
        id: 'kt-lesson-1',
        courseId: 'course-kotlin-android',
        slug: 'kotlin-null-safety-and-data-classes',
        number: 1,
        title: 'Kotlin Null Safety (`?`, `?:`), Data Classes & Sealed States',
        summary: 'Eliminate NullPointerExceptions at compile time and model mobile UI states cleanly in Kotlin.',
        durationMinutes: 18,
        tenPoints: {
          definition:
            'Kotlin is a modern statically typed language for Android and multiplatform engineering that distinguishes nullable references (`String?`) from non-null references (`String`) directly in the type system.',
          simpleExplanation:
            'The #1 cause of Android app crashes historically was the `NullPointerException`. Kotlin solves this by refusing to let you assign `null` to a standard variable unless you explicitly mark its type with `?` and handle the null case using safe call `?.` or the Elvis operator `?:`.',
          romanUrduExplanation:
            'Android apps aksar `NullPointerException` ki wajah se crash hoti thin. Kotlin mein default variables `null` nahi ho sakte. Agar koi value empty ho sakti hai to uske sath `?` lagate hain aur `?:` (Elvis operator) se safe fallback value dete hain.',
          realWorldAnalogy: {
            title: 'Insured Parcel Delivery With Backup Address',
            analogy:
              'A standard Kotlin type (`val title: String`) is a guaranteed hand-delivered parcel. A nullable type (`val cachedTitle: String?`) comes with an Elvis instruction (`?: "Offline Article"`): if the box is empty, automatically hand the recipient the backup leaflet.',
            connection:
              'The Elvis operator `val display = input ?: "Default"` guarantees a non-null result.'
          },
          syntax: {
            language: 'kotlin',
            code: `data class FatwaArticle(
    val id: Int,
    val title: String,
    val cachedSummary: String? = null
)

fun getDisplaySummary(article: FatwaArticle): String {
    return article.cachedSummary ?: "Summary available offline soon"
}`,
            notes: 'A Kotlin `data class` automatically generates `equals()`, `hashCode()`, `toString()`, and `copy()`.'
          },
          codeExample: {
            title: 'Simulating Kotlin Elvis (`?:`) & Data Class Copy in JS Sandbox',
            language: 'javascript',
            code: `function elvisFallback(nullableValue, defaultText) {
  return nullableValue !== null && nullableValue !== undefined
    ? nullableValue
    : defaultText;
}

const cachedFatwa = { id: 104, title: "Modern Financial Rulings", summary: null };
const output = \`#\${cachedFatwa.id} \${cachedFatwa.title} -> \${elvisFallback(cachedFatwa.summary, "Cached locally for offline reading")}\`;
console.log(output);`,
            output: '#104 Modern Financial Rulings -> Cached locally for offline reading'
          },
          lineByLine: [
            {
              lines: 'Line 4',
              code: 'val cachedSummary: String? = null',
              explanation: 'Declares an optional nullable string property with a default value of `null`.',
              romanUrdu: '`String?` batata hai ke yeh property `null` ho sakti hai.'
            },
            {
              lines: 'Line 8',
              code: 'return article.cachedSummary ?: "Summary available offline soon"',
              explanation: 'Returns `cachedSummary` if non-null; otherwise evaluates the right side of the Elvis operator `?:`.',
              romanUrdu: 'Agar `cachedSummary` mojood hai to wohi return hogi, warna `?:` ke baad wala fallback text milega.'
            }
          ],
          howItWorksInternally: {
            summary:
              'The Kotlin compiler translates non-null `String` parameters into JVM bytecode with intrinsic null-check guards and compiles `data class` into immutable value holders.',
            steps: [
              '1. Compile-Time Null Analysis: Rejects `article.cachedSummary.length` unless accessed via `article.cachedSummary?.length`.',
              '2. Smart Casting: Once you check `if (x != null)`, Kotlin automatically smart-casts `x` from `String?` to `String` inside that block.',
              '3. Value Copying: `article.copy(cachedSummary = "Updated")` creates a new instance without mutating `val` fields.'
            ]
          },
          commonMistakes: [
            {
              title: 'Using the not-null assertion operator `!!` on network data',
              wrongCode: `val length = apiResponse.title!!.length // Throws NullPointerException if null!`,
              correctCode: `val length = apiResponse.title?.length ?: 0 // Safe fallback to 0`,
              whyItHappens:
                'The `!!` operator forces Kotlin to bypass null safety and crash if the value is `null`. Always prefer `?.` and `?:`.'
            }
          ],
          practicalExample: {
            scenario:
              'In Daniyal’s Darul Ifta Android App v2, consulted fatwas are modeled with Kotlin data classes and cached locally in SQLite/Room so users in low-connectivity regions can read offline without crashes.',
            language: 'kotlin',
            code: `sealed class ConsultationState {
    object Loading : ConsultationState()
    data class Ready(val items: List<FatwaArticle>, val isOfflineCache: Boolean) : ConsultationState()
    data class Error(val reason: String) : ConsultationState()
}`,
            takeaway: 'Combine `val` immutability, `?` null safety, and `sealed class` states for crash-free Android apps.'
          },
          practice: {
            mcq: {
              id: 'mcq-kt-1',
              question: 'What does the Elvis operator `?:` do in Kotlin?',
              options: [
                'It throws a NullPointerException immediately',
                'It returns the left-hand expression if it is non-null, or the right-hand fallback value if the left side is null',
                'It converts a String into an Int',
                'It deletes a variable from memory'
              ],
              correctIndex: 1,
              explanation: 'In Kotlin, `a ?: b` evaluates to `a` if `a != null`, or `b` when `a == null`.'
            },
            shortAnswer: {
              id: 'sa-kt-1',
              question: 'Why should Android developers avoid the `!!` operator in Kotlin?',
              sampleAnswer:
                'Because `!!` throws a runtime NullPointerException if the variable is null, defeating Kotlin’s compile-time null safety.',
              keyKeywords: ['NullPointerException', 'crash', 'null', 'runtime', 'safety']
            },
            codingChallenge: {
              id: 'cc-kt-1',
              title: 'Simulate Offline Cache Fallback',
              prompt:
                'Write `resolveFatwaTitle(cachedTitle)` that returns `cachedTitle` when non-empty, or `"Offline Archive #1"` when null/empty.',
              starterCode: `function resolveFatwaTitle(cachedTitle) {
  return cachedTitle ? cachedTitle : "Offline Archive #1";
}

console.log(resolveFatwaTitle(null) + " | " + resolveFatwaTitle("Book of Trade"));`,
              solutionCode: `function resolveFatwaTitle(cachedTitle) {
  return cachedTitle ? cachedTitle : "Offline Archive #1";
}

console.log(resolveFatwaTitle(null) + " | " + resolveFatwaTitle("Book of Trade"));`,
              expectedOutput: 'Offline Archive #1 | Book of Trade',
              validationKeywords: ['Offline Archive #1', 'return'],
              hint: 'Use a ternary or nullish coalescing check.'
            },
            miniTask: 'Replace any nullable check in your code with a clean fallback expression.',
            conceptCheck: 'What is the difference between `val` and `var` in Kotlin? `val` is a read-only reference (like `const`), whereas `var` is mutable (like `let`).'
          }
        }
      }
    ]
  },
  {
    id: 'course-algorithms',
    slug: 'algorithms-matrices-and-state-machines',
    name: 'Algorithms, 2D Matrices & State Machines',
    shortName: 'Algorithms & Logic',
    tagline: 'Master 2D grid traversal, deterministic finite state machines, and game loop optimization.',
    description:
      'Learn the exact algorithmic concepts behind Daniyal’s Mystic Match puzzle engine. Master 2D coordinate matrices, contiguous match scanning, and finite state machines.',
    category: 'Programming',
    difficulty: 'Advanced',
    iconName: 'Cpu',
    accentColor: 'amber',
    topics: ['Finite State Machines (FSM)', '2D Array Coordinate Grids', 'Contiguous Match Detection', 'Cascade & Gravity Compaction', 'Time & Space Complexity'],
    relatedProjectIds: ['mystic-match-by-dnyl'],
    lessons: [
      {
        id: 'algo-lesson-1',
        courseId: 'course-algorithms',
        slug: 'finite-state-machines-and-2d-grid-traversal',
        number: 1,
        title: 'Finite State Machines & 2D Coordinate Matrix Traversal',
        summary: 'How Mystic Match scans a 2D board for 3-in-a-row combinations and prevents cascade race conditions.',
        durationMinutes: 22,
        tenPoints: {
          definition:
            'A Finite State Machine (FSM) is a behavioral model consisting of a finite number of mutually exclusive states and deterministic transition rules between them; a 2D matrix (`grid[row][col]`) represents spatial coordinates in rows and columns.',
          simpleExplanation:
            'In a puzzle game or complex UI workflow, only one stage should happen at a time: waiting for user input (`IDLE`), swapping two tiles (`SWAPPING`), scanning for 3-in-a-row (`CHECKING`), clearing matched tiles (`CLEARING`), or dropping tiles down (`DROPPING`).',
          romanUrduExplanation:
            '2D Matrix ko aap शतरंज (chessboard) ya table samajh sakte hain jisme har box ka aik `row` aur `col` address hota hai. Aur Finite State Machine is baat ki guarantee deti hai ke jab tiles drop ho rahi hon (`DROPPING`), us waqt naya swipe ignore kiya jaye taake game bug na kare.',
          realWorldAnalogy: {
            title: 'A Traffic Light Intersection Controller',
            analogy:
              'A traffic signal transitions strictly from `GREEN -> YELLOW -> RED -> GREEN`. It can never be both `GREEN` and `RED` simultaneously because the state machine only holds one active state value.',
            connection:
              'In Mystic Match, touch gestures are only accepted when `boardState === "IDLE"`.'
          },
          syntax: {
            language: 'typescript',
            code: `type GameState = 'IDLE' | 'SWAPPING' | 'CHECKING' | 'CLEARING' | 'DROPPING';

const grid: string[][] = [
  ['Ruby', 'Ruby', 'Ruby'],
  ['Sapphire', 'Emerald', 'Topaz'],
];`,
            notes: 'Access a 2D array using `grid[rowIndex][colIndex]`, always verifying bounds (`0 <= row < rows`) first.'
          },
          codeExample: {
            title: 'Horizontal 3-in-a-Row Scanner (Mystic Match Engine)',
            language: 'javascript',
            code: `function findHorizontalMatches(row) {
  const matches = [];
  for (let col = 0; col <= row.length - 3; col++) {
    if (row[col] && row[col] === row[col + 1] && row[col] === row[col + 2]) {
      matches.push(\`Match of \${row[col]} at cols [\${col},\${col + 1},\${col + 2}]\`);
    }
  }
  return matches;
}

console.log(findHorizontalMatches(["Amber", "Cyan", "Cyan", "Cyan", "Ruby"]).join(" | "));`,
            output: 'Match of Cyan at cols [1,2,3]'
          },
          lineByLine: [
            {
              lines: 'Line 3',
              code: 'for (let col = 0; col <= row.length - 3; col++)',
              explanation: 'Stops at `row.length - 3` so `row[col + 2]` never reads past the end of the array (preventing out-of-bounds bugs).',
              romanUrdu: 'Loop ko `length - 3` tak chalaya gaya hai taake `col + 2` array ki boundary se bahar na jaye.'
            },
            {
              lines: 'Line 4',
              code: 'if (row[col] && row[col] === row[col + 1] && row[col] === row[col + 2])',
              explanation: 'Checks that three adjacent cells in the row contain the exact same non-empty gem type.',
              romanUrdu: 'Check karta hai ke lagataar 3 boxes mein aik hi gem mojood hai ya nahi.'
            }
          ],
          howItWorksInternally: {
            summary:
              'Scanning an $R \\times C$ matrix requires $O(R \\times C)$ linear time relative to the total number of cells on the board.',
            steps: [
              '1. Horizontal Pass: Iterates each row `r` from `0` to `R - 1` and compares adjacent columns.',
              '2. Vertical Pass: Iterates each column `c` from `0` to `C - 1` and compares adjacent rows.',
              '3. State Transition: If matches > 0, transitions `CHECKING -> CLEARING -> DROPPING -> CHECKING`; otherwise transitions `CHECKING -> IDLE`.'
            ]
          },
          commonMistakes: [
            {
              title: 'Looping to `col < row.length` when checking `row[col + 2]`',
              wrongCode: `for (let col = 0; col < grid[r].length; col++) {
  if (grid[r][col] === grid[r][col + 2]) // Out of bounds on last 2 columns!
}`,
              correctCode: `for (let col = 0; col <= grid[r].length - 3; col++) {
  if (grid[r][col] === grid[r][col + 1] && grid[r][col] === grid[r][col + 2]) { ... }
}`,
              whyItHappens:
                'When reading `k` elements ahead (`col + 2`), the loop upper bound must be reduced accordingly.'
            }
          ],
          practicalExample: {
            scenario:
              'Powers the core match-3 cascade engine in Daniyal’s Mystic Match (`https://mystic-match-rho.vercel.app/`).',
            language: 'typescript',
            code: `function nextBoardState(current: GameState, hasMatches: boolean): GameState {
  switch (current) {
    case 'IDLE': return 'SWAPPING';
    case 'SWAPPING': return 'CHECKING';
    case 'CHECKING': return hasMatches ? 'CLEARING' : 'IDLE';
    case 'CLEARING': return 'DROPPING';
    case 'DROPPING': return 'CHECKING';
  }
}`,
            takeaway: 'Notice how `DROPPING` transitions back to `CHECKING` — that single rule handles multi-step chain cascades automatically!'
          },
          practice: {
            mcq: {
              id: 'mcq-algo-1',
              question: 'In Mystic Match’s state machine, why does `DROPPING` transition back to `CHECKING` instead of `IDLE`?',
              options: [
                'To restart the entire game from zero',
                'Because newly dropped tiles might form new cascade matches that also need to be detected and cleared',
                'Because `IDLE` is not a valid state',
                'To block the screen permanently'
              ],
              correctIndex: 1,
              explanation: 'After gravity drops tiles into empty slots, new 3-in-a-row combinations can form automatically (chain cascades).'
            },
            shortAnswer: {
              id: 'sa-algo-1',
              question: 'Why do we stop at `col <= row.length - 3` when scanning for a horizontal match of 3 tiles?',
              sampleAnswer:
                'Because we compare `row[col]`, `row[col + 1]`, and `row[col + 2]`, so stopping at `length - 3` keeps `col + 2` within valid array bounds.',
              keyKeywords: ['bounds', 'col + 2', 'index', 'length', 'three']
            },
            codingChallenge: {
              id: 'cc-algo-1',
              title: 'Implement State Machine Transition',
              prompt:
                'Write `transitionAfterCheck(hasMatches)` that returns `"CLEARING"` if `hasMatches` is true, or `"IDLE"` if false.',
              starterCode: `function transitionAfterCheck(hasMatches) {
  return hasMatches ? "CLEARING" : "IDLE";
}

console.log("Match found:", transitionAfterCheck(true), "| No match:", transitionAfterCheck(false));`,
              solutionCode: `function transitionAfterCheck(hasMatches) {
  return hasMatches ? "CLEARING" : "IDLE";
}

console.log("Match found:", transitionAfterCheck(true), "| No match:", transitionAfterCheck(false));`,
              expectedOutput: 'Match found: CLEARING | No match: IDLE',
              validationKeywords: ['CLEARING', 'IDLE', 'return'],
              hint: 'Use `hasMatches ? "CLEARING" : "IDLE"`.'
            },
            miniTask: 'Trace a 4x4 2D array on paper and list the `[row, col]` coordinates of the main diagonal.',
            conceptCheck: 'What is the time complexity of visiting every cell once in an $N \\times N$ grid? $O(N^2)$.'
          }
        }
      }
    ]
  },
  {
    id: 'course-nodejs-express',
    slug: 'nodejs-express-and-restful-apis',
    name: 'Node.js, Express & RESTful API Architecture',
    shortName: 'Node.js & Express',
    tagline: 'Build backend API routes, request validation middleware, and secure server-side proxy endpoints.',
    description:
      'Learn how backend services work with Node.js and Express. Understand HTTP methods, JSON request/response lifecycles, status codes, and secure API key proxying.',
    category: 'Backend',
    difficulty: 'Intermediate',
    iconName: 'Server',
    accentColor: 'teal',
    topics: ['HTTP Methods & Status Codes', 'Express Routing & Middleware', 'Request Body Validation', 'Server-Side API Proxying', 'Error Handling Middleware'],
    relatedProjectIds: ['islamic-ai-mujeeb', 'soutnaqi-ai', 'cortexiq-by-dnyl'],
    lessons: [
      {
        id: 'node-lesson-1',
        courseId: 'course-nodejs-express',
        slug: 'express-routing-middleware-and-api-proxies',
        number: 1,
        title: 'Express Routes, Status Codes & Server-Side API Key Proxying',
        summary: 'Why sensitive credentials must stay on the server and how Express routes validate incoming requests.',
        durationMinutes: 18,
        tenPoints: {
          definition:
            'Express is a minimal web framework for Node.js that processes incoming HTTP requests through a pipeline of middleware functions (`req, res, next`) before sending a structured JSON response.',
          simpleExplanation:
            'If you put a secret API key inside frontend code, anyone can open Browser DevTools and steal it. Instead, your frontend sends a request to your own Express route (`/api/analyze`), and the Express server attaches the secret key safely from `process.env` on the backend.',
          romanUrduExplanation:
            'Secret API keys ko kabhi bhi frontend React code mein nahi rakhna chahiye warna koi bhi DevTools khol kar key dekh sakta hai. Hum Node.js aur Express par `/api/*` route banate hain jo server par `process.env` se key read karke safe response wapas bhejta hai.',
          realWorldAnalogy: {
            title: 'A Bank Teller Window',
            analogy:
              'Customers never walk into the bank vault themselves. They hand a withdrawal slip (`req.body`) to the teller (`/api/route`). The teller verifies their ID (validation middleware), accesses the vault (`process.env`), and hands back the exact cash (`res.json()`).',
            connection:
              'Server-side proxy routes protect credentials and enforce validation rules.'
          },
          syntax: {
            language: 'typescript',
            code: `app.post('/api/consult', async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query string is required' });
  }
  return res.status(200).json({ ok: true, query });
});`,
            notes: 'Always return HTTP `400 Bad Request` when client input is invalid, and `500 Internal Server Error` when an unexpected server exception occurs.'
          },
          codeExample: {
            title: 'Express Request Validator Simulation',
            language: 'javascript',
            code: `function validateConsultationRequest(body) {
  if (!body || typeof body.query !== "string" || body.query.trim().length < 3) {
    return { status: 400, json: { ok: false, error: "Query must be at least 3 characters" } };
  }
  return { status: 200, json: { ok: true, sanitizedQuery: body.query.trim() } };
}

const result = validateConsultationRequest({ query: "  What is closure in JS?  " });
console.log(\`HTTP \${result.status}: \${JSON.stringify(result.json)}\`);`,
            output: 'HTTP 200: {"ok":true,"sanitizedQuery":"What is closure in JS?"}'
          },
          lineByLine: [
            {
              lines: 'Line 3',
              code: 'if (!query || typeof query !== "string")',
              explanation: 'Guards the endpoint against missing or malformed JSON payloads before running expensive logic.',
              romanUrdu: 'Check karta hai ke user ne valid string bheji hai ya nahi.'
            },
            {
              lines: 'Line 4',
              code: 'return res.status(400).json({ error: ... })',
              explanation: 'Uses `return` immediately so execution does not continue and trigger `"Cannot set headers after they are sent"`.',
              romanUrdu: '`res.json()` ke sath `return` zaroor lagayein taake function wahin ruk jaye.'
            }
          ],
          howItWorksInternally: {
            summary:
              'Node.js uses an event-driven, non-blocking I/O loop (libuv) that handles thousands of concurrent HTTP connections without spawning a heavy OS thread per request.',
            steps: [
              '1. JSON Body Parser (`express.json()`): Reads the incoming HTTP stream and populates `req.body`.',
              '2. Route Handler Execution: Runs your validation and async logic.',
              '3. Serialization: `res.json()` sets `Content-Type: application/json` and serializes the object.'
            ]
          },
          commonMistakes: [
            {
              title: 'Forgetting `return` before `res.status(400).json(...)`',
              wrongCode: `if (!req.body.email) {
  res.status(400).json({ error: "Missing email" });
}
res.status(200).json({ ok: true }); // Crashes: Cannot set headers after they are sent!`,
              correctCode: `if (!req.body.email) {
  return res.status(400).json({ error: "Missing email" });
}
return res.status(200).json({ ok: true });`,
              whyItHappens:
                'Calling `res.json()` sends the HTTP response, but it does not exit the JavaScript function unless you write `return`.'
            }
          ],
          practicalExample: {
            scenario:
              'Used in Daniyal’s CortexIQ AI Suite, SOUTNAQI AI Audio Suite, and Mujeeb us Saileen to proxy requests through Node.js while keeping API keys strictly server-side.',
            language: 'typescript',
            code: `// Server-side route in server.ts
app.post('/api/health', (_req, res) => {
  return res.status(200).json({ status: 'nominal' });
});`,
            takeaway: 'Never expose private keys in client bundles; validate every `req.body` at the API boundary.'
          },
          practice: {
            mcq: {
              id: 'mcq-node-1',
              question: 'Why do we write `return res.status(400).json(...)` inside an `if` check in Express?',
              options: [
                'To restart the Node.js server',
                'To exit the route handler immediately so subsequent `res.json()` calls do not attempt to send headers a second time',
                'Because Express requires return values for logging',
                'To clear browser LocalStorage'
              ],
              correctIndex: 1,
              explanation: '`res.json()` sends the response but does not stop function execution without `return`.'
            },
            shortAnswer: {
              id: 'sa-node-1',
              question: 'Which HTTP status code indicates that the client sent invalid or incomplete request parameters?',
              sampleAnswer: 'HTTP 400 (Bad Request).',
              keyKeywords: ['400', 'Bad Request']
            },
            codingChallenge: {
              id: 'cc-node-1',
              title: 'Format Express JSON Response',
              prompt:
                'Complete `buildApiResponse(email)` so it returns `"400: Invalid email"` if email does not include `"@"`, or `"200: Subscribed"` if valid.',
              starterCode: `function buildApiResponse(email) {
  if (!email || !email.includes("@")) {
    return "400: Invalid email";
  }
  return "200: Subscribed";
}

console.log(buildApiResponse("invalid") + " | " + buildApiResponse("daniyal@example.com"));`,
              solutionCode: `function buildApiResponse(email) {
  if (!email || !email.includes("@")) {
    return "400: Invalid email";
  }
  return "200: Subscribed";
}

console.log(buildApiResponse("invalid") + " | " + buildApiResponse("daniyal@example.com"));`,
              expectedOutput: '400: Invalid email | 200: Subscribed',
              validationKeywords: ['includes("@")', '400', '200'],
              hint: 'Check `email.includes("@")`.'
            },
            miniTask: 'Review how `express.json()` middleware parses JSON request bodies.',
            conceptCheck: 'Where should secret API keys be stored? In server-side environment variables (`process.env`), never in client-side code.'
          }
        }
      }
    ]
  },
  {
    id: 'course-sql-persistence',
    slug: 'sql-sqlite-and-localstorage-persistence',
    name: 'SQL, SQLite & LocalStorage Data Persistence',
    shortName: 'SQL & Persistence',
    tagline: 'Design relational tables, SQL queries, offline Android caching, and fault-tolerant LocalStorage layers.',
    description:
      'Learn how data survives page reloads and offline states. Understand relational SQL queries (`SELECT`, `WHERE`, `JOIN`), SQLite/Room mobile caching, and browser LocalStorage architecture.',
    category: 'Database',
    difficulty: 'Intermediate',
    iconName: 'Database',
    accentColor: 'emerald',
    topics: ['Relational Tables & Primary Keys', 'SELECT, WHERE & ORDER BY', 'SQLite / Room Offline Caching', 'Browser LocalStorage Architecture', 'Safe JSON Serialization'],
    relatedProjectIds: ['darul-ifta-irshad-us-saileen-app2', 'dnyl-eyewear', 'daniyal-hayat-portfolio'],
    lessons: [
      {
        id: 'sql-lesson-1',
        courseId: 'course-sql-persistence',
        slug: 'relational-queries-and-local-persistence',
        number: 1,
        title: 'SQL Queries, Primary Keys & Fault-Tolerant Client Storage',
        summary: 'Query structured records cleanly and build LocalStorage layers that never crash on corrupted data.',
        durationMinutes: 17,
        tenPoints: {
          definition:
            'Data persistence is the mechanism by which application state outlives the current process memory — using structured relational tables (SQL / SQLite) or key-value document stores (LocalStorage).',
          simpleExplanation:
            'Variables in RAM disappear the moment a user refreshes the page or closes an app. Databases (like SQLite on Android or PostgreSQL on servers) and LocalStorage (in the browser) write data to disk so progress, bookmarks, and cached articles are still there next time.',
          romanUrduExplanation:
            'Normal variables RAM mein hote hain jo page refresh hote hi khatam ho jatay hain. Data ko permanent save rakhne ke liye hum browser mein `LocalStorage` aur mobile/server par `SQL` database istemal karte hain.',
          realWorldAnalogy: {
            title: 'A Chalkboard vs. A Bound Ledger Book',
            analogy:
              'RAM variables are written on a classroom chalkboard that gets wiped clean every evening. Persistent storage (SQL / LocalStorage) is a bound ledger book with numbered rows (Primary Keys) stored in a cabinet.',
            connection:
              'Every row in a SQL table or key in `daniyal_edu_*` LocalStorage persists across browser sessions.'
          },
          syntax: {
            language: 'sql',
            code: `SELECT id, title, difficulty
FROM courses
WHERE category = 'Frontend'
ORDER BY id ASC;`,
            notes: 'Always index columns frequently used in `WHERE` clauses and `JOIN` conditions.'
          },
          codeExample: {
            title: 'In-Memory SQL Query & Safe LocalStorage Simulation',
            language: 'javascript',
            code: `const coursesTable = [
  { id: 1, title: "HTML5 & Web Core", category: "Frontend" },
  { id: 2, title: "Kotlin & Android", category: "Mobile" },
  { id: 3, title: "React 19", category: "Frontend" }
];

// Equivalent to: SELECT title FROM courses WHERE category = 'Frontend'
const frontendTitles = coursesTable
  .filter((row) => row.category === "Frontend")
  .map((row) => row.title);

console.log("SELECT Result: " + frontendTitles.join(", "));`,
            output: 'SELECT Result: HTML5 & Web Core, React 19'
          },
          lineByLine: [
            {
              lines: 'Line 1 (SQL)',
              code: 'SELECT id, title, difficulty FROM courses',
              explanation: 'Specifies the exact columns to project rather than fetching unnecessary columns with `SELECT *`.',
              romanUrdu: '`SELECT *` ke bajaye sirf zaroori columns mangwana performance ke liye behtar hota hai.'
            },
            {
              lines: 'Line 3 (SQL)',
              code: "WHERE category = 'Frontend'",
              explanation: 'Filters rows matching the predicate before sorting.',
              romanUrdu: '`WHERE` clause sirf Frontend category wali rows filter karta hai.'
            }
          ],
          howItWorksInternally: {
            summary:
              'In SQLite/SQL, a query planner parses the SQL string into bytecode and uses B-Tree indexes for $O(\\log N)$ lookups; in LocalStorage, strings are stored synchronously per origin (`protocol + domain + port`).',
            steps: [
              '1. SQL Execution Order: `FROM` -> `WHERE` -> `GROUP BY` -> `SELECT` -> `ORDER BY` -> `LIMIT`.',
              '2. LocalStorage Serialization: Objects must be serialized via `JSON.stringify(data)` on write and `JSON.parse(raw)` on read.',
              '3. Defensive Fallback: Wrapping `JSON.parse` in `try/catch` prevents corrupted storage strings from crashing the app.'
            ]
          },
          commonMistakes: [
            {
              title: 'Passing an Object directly to `localStorage.setItem` without `JSON.stringify`',
              wrongCode: `localStorage.setItem("user", { name: "Daniyal" });
// Stores literal string "[object Object]" — data is lost!`,
              correctCode: `localStorage.setItem("user", JSON.stringify({ name: "Daniyal" }));`,
              whyItHappens:
                'LocalStorage only stores strings; passing a raw object calls `.toString()`, which produces `"[object Object]"`.'
            }
          ],
          practicalExample: {
            scenario:
              'Daniyal Edu Tech stores all learning progress (`daniyal_edu_progress`, `daniyal_edu_completed_lessons`, `daniyal_edu_favorites`, `daniyal_edu_bookmarks`) in a centralized LocalStorage layer with automatic fallbacks.',
            language: 'typescript',
            code: `export function safeSetItem<T>(key: string, value: T): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}`,
            takeaway: 'Always serialize with `JSON.stringify` and guard `JSON.parse` with `try/catch`.'
          },
          practice: {
            mcq: {
              id: 'mcq-sql-1',
              question: 'What happens if you pass a JavaScript object directly to `localStorage.setItem("key", obj)` without `JSON.stringify()`?',
              options: [
                'It automatically creates a SQL table',
                'It converts the object to the useless string `"[object Object]"`',
                'It encrypts the object',
                'It throws a syntax error at compile time'
              ],
              correctIndex: 1,
              explanation: 'Web Storage only supports string values and coerces non-strings to `"[object Object]"`.'
            },
            shortAnswer: {
              id: 'sa-sql-1',
              question: 'In a SQL query, does `WHERE` filter rows before or after `SELECT` projections?',
              sampleAnswer: 'The database engine evaluates `FROM` and `WHERE` before projecting columns in `SELECT` and sorting with `ORDER BY`.',
              keyKeywords: ['before', 'FROM', 'WHERE', 'filter']
            },
            codingChallenge: {
              id: 'cc-sql-1',
              title: 'Serialize & Parse Storage Record Safely',
              prompt:
                'Complete `roundTripStorage(obj)` so it serializes `obj` with `JSON.stringify`, parses it back with `JSON.parse`, and returns `parsed.track`.',
              starterCode: `function roundTripStorage(obj) {
  const raw = JSON.stringify(obj);
  const parsed = JSON.parse(raw);
  return \`Saved Track: \${parsed.track}\`;
}

console.log(roundTripStorage({ track: "SQL & Persistence" }));`,
              solutionCode: `function roundTripStorage(obj) {
  const raw = JSON.stringify(obj);
  const parsed = JSON.parse(raw);
  return \`Saved Track: \${parsed.track}\`;
}

console.log(roundTripStorage({ track: "SQL & Persistence" }));`,
              expectedOutput: 'Saved Track: SQL & Persistence',
              validationKeywords: ['JSON.stringify', 'JSON.parse', 'return'],
              hint: 'Use `JSON.stringify(obj)` followed by `JSON.parse(raw)`.'
            },
            miniTask: 'Open your browser DevTools -> Application -> Local Storage and inspect the `daniyal_edu_*` keys created as you use this platform.',
            conceptCheck: 'What is a Primary Key in a database table? A column (or set of columns) that uniquely identifies every single row in the table.'
          }
        }
      }
    ]
  },
  {
    id: 'course-ai-engineering',
    slug: 'ai-app-engineering-with-gemini-sdk',
    name: 'AI App Engineering with Gemini SDK & AI Studio',
    shortName: 'AI Engineering',
    tagline: 'Engineer grounded AI applications using @google/genai, system instructions, and structured JSON schemas.',
    description:
      'Learn how Daniyal builds production AI applications like CortexIQ AI Suite and Mujeeb us Saileen. Master `@google/genai`, system instructions, structured JSON output schemas, and defensive prompting.',
    category: 'AI & Tooling',
    difficulty: 'Advanced',
    iconName: 'Sparkles',
    accentColor: 'cyan',
    topics: ['@google/genai SDK', 'System Instructions & Guardrails', 'Structured JSON Output Schemas', 'Defensive Prompt Engineering', 'Server-Side Proxy Security'],
    relatedProjectIds: ['cortexiq-by-dnyl', 'islamic-ai-mujeeb', 'soutnaqi-ai'],
    lessons: [
      {
        id: 'ai-lesson-1',
        courseId: 'course-ai-engineering',
        slug: 'structured-json-outputs-and-defensive-prompting',
        number: 1,
        title: 'System Instructions, Structured JSON Schemas & Defensive Guardrails',
        summary: 'How to turn unpredictable LLM text responses into deterministic, type-safe JSON data.',
        durationMinutes: 20,
        tenPoints: {
          definition:
            'Structured Output Grounding is an AI engineering pattern where a language model is constrained via `systemInstruction` and `responseSchema` (`responseMimeType: "application/json"`) to emit strictly typed JSON rather than freeform conversational prose.',
          simpleExplanation:
            'When building a software UI like CortexIQ or Mujeeb us Saileen, your React components cannot reliably render random paragraphs of markdown. By defining a strict JSON schema and system instructions, the model returns predictable fields (`summary`, `citations`, `confidence`) that map straight to TypeScript interfaces.',
          romanUrduExplanation:
            'Jab hum AI model ko kisi app ke UI ke sath connect karte hain to humein random paragraphs ke bajaye structured JSON data chahiye hota hai. `responseSchema` aur `systemInstruction` lagane se AI model hamesha tay-shuda JSON format mein jawab deta hai.',
          realWorldAnalogy: {
            title: 'A Standardized Medical Lab Report Form vs. A Blank Notepad',
            analogy:
              'If you give a lab technician a blank notepad, every report will be formatted differently. If you provide a standardized form with labeled boxes (`Hemoglobin`, `Reference Range`, `Verified By`), every response follows the exact same structure.',
            connection:
              '`responseSchema` acts as that standardized form for the Gemini model.'
          },
          syntax: {
            language: 'typescript',
            code: `import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: userPrompt,
  config: {
    systemInstruction: 'Respond strictly using verified reference data.',
    responseMimeType: 'application/json',
  },
});`,
            notes: 'Always initialize `new GoogleGenAI` on the server where `process.env.GEMINI_API_KEY` is protected.'
          },
          codeExample: {
            title: 'Validating Structured AI JSON Output',
            language: 'javascript',
            code: `function parseGroundedAiPayload(rawJson) {
  try {
    const parsed = JSON.parse(rawJson);
    if (typeof parsed.summary === "string" && Array.isArray(parsed.sources)) {
      return \`Verified Summary: \${parsed.summary} (Sources: \${parsed.sources.length})\`;
    }
    return "Schema Validation Failed";
  } catch {
    return "Invalid JSON Response";
  }
}

console.log(parseGroundedAiPayload('{"summary":"Closures retain outer lexical scope.","sources":["MDN","ECMA-262"]}'));`,
            output: 'Verified Summary: Closures retain outer lexical scope. (Sources: 2)'
          },
          lineByLine: [
            {
              lines: 'Line 3',
              code: 'const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });',
              explanation: 'Initializes the official `@google/genai` SDK using the server environment variable.',
              romanUrdu: 'Official `@google/genai` SDK ko server environment key ke sath initialize kiya gaya hai.'
            },
            {
              lines: 'Line 9',
              code: "responseMimeType: 'application/json'",
              explanation: 'Instructs the model decoder to constrain token generation to valid JSON syntax.',
              romanUrdu: 'Model ko paband karta hai ke wo sirf valid JSON format mein output de.'
            }
          ],
          howItWorksInternally: {
            summary:
              'When `responseSchema` is provided, the model uses constrained decoding (finite-state grammar masks) so tokens that would violate the JSON schema are assigned zero probability.',
            steps: [
              '1. System Instruction Conditioning: Sets the role, domain boundaries, and anti-hallucination rules.',
              '2. Constrained Token Sampling: Ensures every generated bracket, key, and type matches the declared schema.',
              '3. Client Boundary Validation: The application parses `response.text` and verifies fields before rendering.'
            ]
          },
          commonMistakes: [
            {
              title: 'Parsing LLM output with fragile regex instead of `responseMimeType: "application/json"`',
              wrongCode: `// Fragile: breaks whenever the model wraps JSON in markdown backticks!
const data = JSON.parse(rawText);`,
              correctCode: `// Reliable: configure responseMimeType: 'application/json' and responseSchema`,
              whyItHappens:
                'Without `responseMimeType: "application/json"`, models often include conversational prefixes or ` ```json ` fences.'
            }
          ],
          practicalExample: {
            scenario:
              'Used in Daniyal’s Islamic AI / Mujeeb us Saileen and CortexIQ AI Suite to enforce citation grounding and prevent unverified hallucinations.',
            language: 'typescript',
            code: `export interface GroundedAnswer {
  rulingSummary: string;
  referenceCitations: string[];
  requiresScholarReview: boolean;
}`,
            takeaway: 'Domain-specific AI applications require strict schemas and defensive guardrails.'
          },
          practice: {
            mcq: {
              id: 'mcq-ai-1',
              question: 'Which configuration property in `@google/genai` constrains the model to return valid JSON?',
              options: [
                'responseMimeType: "text/plain"',
                'responseMimeType: "application/json" (paired with responseSchema)',
                'allowRandomMarkdown: true',
                'window.alert()'
              ],
              correctIndex: 1,
              explanation: 'Setting `responseMimeType: "application/json"` and `responseSchema` enforces structured JSON output.'
            },
            shortAnswer: {
              id: 'sa-ai-1',
              question: 'Why are `systemInstruction` guardrails critical in domain-specific AI apps like Mujeeb us Saileen?',
              sampleAnswer:
                'They restrict the model to verified reference sources, set strict tone/citation rules, and prevent fabricated or off-topic responses.',
              keyKeywords: ['verified', 'citation', 'guardrails', 'hallucination', 'restrict']
            },
            codingChallenge: {
              id: 'cc-ai-1',
              title: 'Verify Grounded Citation Count',
              prompt:
                'Complete `verifyCitations(payload)` so it returns `"Grounded (2 citations)"` when `payload.citations.length > 0`.',
              starterCode: `function verifyCitations(payload) {
  if (Array.isArray(payload.citations) && payload.citations.length > 0) {
    return \`Grounded (\${payload.citations.length} citations)\`;
  }
  return "Unverified";
}

console.log(verifyCitations({ citations: ["Ref A", "Ref B"] }));`,
              solutionCode: `function verifyCitations(payload) {
  if (Array.isArray(payload.citations) && payload.citations.length > 0) {
    return \`Grounded (\${payload.citations.length} citations)\`;
  }
  return "Unverified";
}

console.log(verifyCitations({ citations: ["Ref A", "Ref B"] }));`,
              expectedOutput: 'Grounded (2 citations)',
              validationKeywords: ['Array.isArray', 'citations.length', 'return'],
              hint: 'Check `Array.isArray(payload.citations)` and its `.length`.'
            },
            miniTask: 'Design a TypeScript interface for a structured code-review response containing `summary`, `bugsFound`, and `fixedCode`.',
            conceptCheck: 'Should `@google/genai` API keys ever be hardcoded in frontend React components? Never — always keep them on the server.'
          }
        }
      }
    ]
  },
  {
    id: 'course-git-deployment',
    slug: 'git-github-and-production-deployment',
    name: 'Git, GitHub & Production Deployment Workflows',
    shortName: 'Git & Deployment',
    tagline: 'Master Git version control, clean commit hygiene, Vite builds, and live Vercel deployments.',
    description:
      'Learn how professional developers manage source code on GitHub (`DotDaniyal`), resolve branches cleanly, optimize Vite production bundles, and deploy live web applications.',
    category: 'AI & Tooling',
    difficulty: 'Beginner',
    iconName: 'GitBranch',
    accentColor: 'purple',
    topics: ['Git Commits & Branches', 'GitHub Repositories & Remotes', 'Vite Build Pipeline', 'Environment Variables', 'Vercel Production Deployment'],
    relatedProjectIds: ['daniyal-hayat-portfolio', 'hamara-weather', 'mystic-match-by-dnyl'],
    lessons: [
      {
        id: 'git-lesson-1',
        courseId: 'course-git-deployment',
        slug: 'git-workflow-and-production-builds',
        number: 1,
        title: 'Git Version Control, Atomic Commits & Production Builds',
        summary: 'Track code history safely with Git and verify zero-error TypeScript builds before deploying.',
        durationMinutes: 15,
        tenPoints: {
          definition:
            'Git is a distributed version control system that records snapshots (commits) of your project files over time, allowing safe branching, history auditing, and remote collaboration on platforms like GitHub.',
          simpleExplanation:
            'Instead of saving folders named `project-final-v2-real-final.zip`, Git lets you save clean checkpoints (`git commit`) with a message explaining what changed, and push them to your GitHub profile (`https://github.com/DotDaniyal`).',
          romanUrduExplanation:
            'Git ko aap apne code ki time-machine samajh sakte hain. Har feature mukammal hone par aap aik `commit` (checkpoint) banate hain taake agar aage koi bug aa jaye to aap purane working version par wapas ja sakein.',
          realWorldAnalogy: {
            title: 'Save Checkpoints in an Adventure Game',
            analogy:
              'Before entering a difficult boss level, you save your game at a checkpoint (`git commit`). If your experiment fails, you reload the checkpoint cleanly (`git restore` / `git checkout`).',
            connection:
              'Atomic commits let you isolate and revert a single change without losing unrelated work.'
          },
          syntax: {
            language: 'bash',
            code: `git status
git add src/
git commit -m "feat(courses): add 10-point learning viewer"
git push origin main`,
            notes: 'Always run `npm run build` locally to verify zero TypeScript or bundler errors before pushing to `main`.'
          },
          codeExample: {
            title: 'Conventional Commit Message Validator',
            language: 'javascript',
            code: `function validateCommitMessage(msg) {
  const prefixes = ["feat:", "fix:", "docs:", "refactor:", "perf:"];
  const hasValidPrefix = prefixes.some((p) => msg.startsWith(p));
  return hasValidPrefix ? \`Valid Commit -> "\${msg}"\` : "Use a clear prefix like feat: or fix:";
}

console.log(validateCommitMessage("feat: integrate LocalStorage progress tracker"));`,
            output: 'Valid Commit -> "feat: integrate LocalStorage progress tracker"'
          },
          lineByLine: [
            {
              lines: 'Line 2',
              code: 'git add src/',
              explanation: 'Stages modified files in `src/` into the Git Index so they are included in the next snapshot.',
              romanUrdu: '`git add` files ko staging area mein rakhta hai.'
            },
            {
              lines: 'Line 3',
              code: 'git commit -m "feat(courses): ..."',
              explanation: 'Records a permanent cryptographic SHA-1/SHA-256 snapshot in the local `.git` repository.',
              romanUrdu: '`git commit` aik permanent message ke sath code ka snapshot save kar leta hai.'
            }
          ],
          howItWorksInternally: {
            summary:
              'Git stores data as a directed acyclic graph (DAG) of content-addressable objects: blobs (file contents), trees (directories), and commits (metadata + parent commit pointers).',
            steps: [
              '1. Working Directory: The files you actively edit in your code editor.',
              '2. Staging Area (Index): The exact changes prepared for the next commit.',
              '3. Local & Remote Repository (`.git` & GitHub): The committed history synchronized via `git push`.'
            ]
          },
          commonMistakes: [
            {
              title: 'Committing `.env` secret files or `node_modules/` to GitHub',
              wrongCode: `git add . // Accidentally stages .env with private API keys!`,
              correctCode: `# Ensure .gitignore includes:
node_modules/
dist/
.env`,
              whyItHappens:
                'Without a proper `.gitignore`, sensitive `.env` secrets and heavy `node_modules` folders get uploaded publicly.'
            }
          ],
          practicalExample: {
            scenario:
              'Every public repository on Daniyal Hayat’s GitHub (`https://github.com/DotDaniyal`) — from Mystic Match to Hamara Weather — uses Git version control and automated Vercel production builds.',
            language: 'json',
            code: `{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "tsc --noEmit"
  }
}`,
            takeaway: 'Run `tsc --noEmit` and `vite build` before shipping so broken code never reaches production.'
          },
          practice: {
            mcq: {
              id: 'mcq-git-1',
              question: 'Which file tells Git which folders and secret files (like `node_modules` and `.env`) must NOT be tracked or uploaded?',
              options: ['package.json', '.gitignore', 'README.md', 'index.html'],
              correctIndex: 1,
              explanation: '`.gitignore` specifies intentionally untracked files that Git should ignore.'
            },
            shortAnswer: {
              id: 'sa-git-1',
              question: 'What are the three main states/trees a file moves through in a local Git workflow?',
              sampleAnswer: 'Working Directory (modified), Staging Area / Index (staged via `git add`), and Repository (committed via `git commit`).',
              keyKeywords: ['Working', 'Staging', 'Repository', 'commit', 'add']
            },
            codingChallenge: {
              id: 'cc-git-1',
              title: 'Check Gitignore Security Rule',
              prompt:
                'Complete `isGitignoreSafe(entries)` so it returns `"Safe: .env and node_modules ignored"` when both are present in `entries`.',
              starterCode: `function isGitignoreSafe(entries) {
  const hasEnv = entries.includes(".env");
  const hasModules = entries.includes("node_modules");
  return hasEnv && hasModules
    ? "Safe: .env and node_modules ignored"
    : "Warning: missing ignore rules";
}

console.log(isGitignoreSafe(["node_modules", "dist", ".env"]));`,
              solutionCode: `function isGitignoreSafe(entries) {
  const hasEnv = entries.includes(".env");
  const hasModules = entries.includes("node_modules");
  return hasEnv && hasModules
    ? "Safe: .env and node_modules ignored"
    : "Warning: missing ignore rules";
}

console.log(isGitignoreSafe(["node_modules", "dist", ".env"]));`,
              expectedOutput: 'Safe: .env and node_modules ignored',
              validationKeywords: ['.env', 'node_modules', 'includes'],
              hint: 'Verify both `.env` and `node_modules` are in `entries`.'
            },
            miniTask: 'Check your project’s `.gitignore` file to confirm `.env` and `node_modules` are listed.',
            conceptCheck: 'What command checks TypeScript types without emitting JS files? `tsc --noEmit`.'
          }
        }
      }
    ]
  }
];
