import { Course } from '../types/edu';

export const COURSES_PART_1: Course[] = [
  {
    id: 'course-javascript',
    slug: 'javascript-es6-internals',
    name: 'JavaScript (ES6+ & Runtime Internals)',
    shortName: 'JavaScript',
    tagline: 'Master variables, lexical scope, arrays, async/await Fetch pipelines, and V8 internals.',
    description:
      'Build a strong foundation in modern JavaScript. Understand how memory allocation, block scoping, array transformations, and asynchronous API pipelines work under the hood.',
    category: 'Programming',
    difficulty: 'Beginner',
    iconName: 'Terminal',
    accentColor: 'cyan',
    topics: ['Variables & Scope', 'Arrays & Objects', 'Functions & Closures', 'Async/Await & Fetch API', 'DOM Manipulation'],
    relatedProjectIds: ['hamara-weather', 'offical-darul-ifta-irshad-us-saileen', 'faryal-fc'],
    lessons: [
      {
        id: 'js-lesson-1',
        courseId: 'course-javascript',
        slug: 'variables-memory-and-lexical-scope',
        number: 1,
        title: 'Variables, Memory & Lexical Scope (let, const, var)',
        summary: 'Understand how JavaScript stores values in memory and why block scoping prevents subtle bugs.',
        durationMinutes: 15,
        tenPoints: {
          definition:
            'A variable is a named reference to a memory location where a program stores, retrieves, or updates data during execution, governed by lexical scope rules.',
          simpleExplanation:
            'When your program runs, it needs a place to remember values like a user name, a weather temperature, or a score. `const` creates a read-only reference, while `let` creates a block-scoped reference that can be reassigned.',
          romanUrduExplanation:
            'Variable ko aap memory mein aik labeled box samajh sakte hain. Agar aap value change nahi karna chahte to `const` use karein, aur agar value aage chal kar update hogi (jaise game score) to `let` use karein. Purane `var` se parhez karein kyunke wo block `{}` ke bahar bhi leak ho jata hai.',
          realWorldAnalogy: {
            title: 'Labeled Storage Lockers in a Lab',
            analogy:
              'Think of `const` as a sealed glass display case with a permanent label — you can always read what is inside, and if there is a folder inside you can add pages to the folder, but you cannot swap the entire case. `let` is a whiteboard locker where you can erase the number and write a new one.',
            connection:
              'In JavaScript, `const` prevents reassigning the variable identifier (`=`), whereas `let` allows reassigning the identifier to a new value within its `{ }` block.'
          },
          syntax: {
            language: 'javascript',
            code: `const platformName = "Daniyal Edu Tech"; // Cannot be reassigned
let completedCount = 0;                  // Can be reassigned
completedCount = completedCount + 1;`,
            notes: 'Always default to `const`. Only switch to `let` when loop counters or state updates require reassignment.'
          },
          codeExample: {
            title: 'Block Scope & Safe State Tracking',
            language: 'javascript',
            code: `function calculateTrackProgress(totalLessons, finishedLessons) {
  const trackTitle = "JavaScript Core";
  let statusLabel = "In Progress";

  if (finishedLessons >= totalLessons) {
    const completionBonus = 100;
    statusLabel = \`Completed (+\${completionBonus} XP)\`;
  }

  return \`\${trackTitle}: \${statusLabel} (\${finishedLessons}/\${totalLessons})\`;
}

console.log(calculateTrackProgress(10, 10));`,
            output: 'JavaScript Core: Completed (+100 XP) (10/10)'
          },
          lineByLine: [
            {
              lines: 'Line 2',
              code: 'const trackTitle = "JavaScript Core";',
              explanation: 'Allocates a constant binding scoped to the function execution context.',
              romanUrdu: 'Yahan `trackTitle` ko constant rakha gaya hai kyunke course ka naam change nahi hoga.'
            },
            {
              lines: 'Line 3',
              code: 'let statusLabel = "In Progress";',
              explanation: 'Declares a mutable binding because the status may change inside the conditional check.',
              romanUrdu: '`let` is liye lagaya kyunke agar lessons complete ho gaye to status update karna parega.'
            },
            {
              lines: 'Line 6',
              code: 'const completionBonus = 100;',
              explanation: 'Exists strictly inside the `if { ... }` block and is cleaned up after the block finishes.',
              romanUrdu: '`completionBonus` sirf `if` block ke andar zinda rehta hai, bahar memory zaya nahi karta.'
            }
          ],
          howItWorksInternally: {
            summary:
              'When the JavaScript engine (like V8) enters a function or block, it creates a Lexical Environment in memory before executing code line by line.',
            steps: [
              '1. Creation Phase: The engine registers `let` and `const` identifiers in the Lexical Environment but places them in the Temporal Dead Zone (TDZ) until their declaration line is reached.',
              '2. Allocation Phase: Primitive values (numbers, booleans) are stored directly on the Call Stack, while objects and arrays are stored on the Heap with a memory pointer on the Stack.',
              '3. Block Exit: When execution leaves `{ }`, block-scoped variables become unreachable and eligible for garbage collection.'
            ]
          },
          commonMistakes: [
            {
              title: 'Accessing a `let` or `const` variable before declaration (TDZ Error)',
              wrongCode: `console.log(score); // ReferenceError
let score = 50;`,
              correctCode: `let score = 50;
console.log(score); // 50`,
              whyItHappens:
                'While `let` is known to the parser, accessing it before its declaration line throws a ReferenceError.'
            }
          ],
          practicalExample: {
            scenario:
              'In Daniyal’s Hamara Weather project, API configuration constants are locked with `const` while the current temperature advisory is updated cleanly within block scopes.',
            language: 'javascript',
            code: `const DEFAULT_UNIT = "metric";

function formatTemperatureReading(rawCelsius) {
  let advisory = "Comfortable conditions";
  if (rawCelsius >= 38) advisory = "High heat alert — stay hydrated";
  return { celsius: Math.round(rawCelsius), unit: DEFAULT_UNIT, advisory };
}`,
            takeaway: 'Keep configuration immutable with `const` and isolate mutable variables inside small functions.'
          },
          practice: {
            mcq: {
              id: 'mcq-js-1',
              question: 'What happens if you try to reassign a primitive variable declared with `const` in JavaScript?',
              options: [
                'It silently ignores the reassignment',
                'It throws a TypeError: Assignment to constant variable',
                'It converts the variable into a `let` variable automatically',
                'It resets the variable to undefined'
              ],
              correctIndex: 1,
              explanation: 'JavaScript enforces immutability of the binding reference for `const` and throws a runtime TypeError on reassignment.'
            },
            shortAnswer: {
              id: 'sa-js-1',
              question: 'What is the Temporal Dead Zone (TDZ) in JavaScript?',
              sampleAnswer:
                'The Temporal Dead Zone is the period between entering a block scope and reaching the line where a `let` or `const` variable is declared, during which accessing it throws a ReferenceError.',
              keyKeywords: ['block', 'before', 'declaration', 'ReferenceError', 'let', 'const']
            },
            codingChallenge: {
              id: 'cc-js-1',
              title: 'Compute Course Completion Percentage',
              prompt:
                'Write a function `getCompletionSummary(courseTitle, completed, total)` using `const` that returns `"React Track: 75% Complete"`.',
              starterCode: `function getCompletionSummary(courseTitle, completed, total) {
  const percentage = Math.round((completed / total) * 100);
  return \`\${courseTitle}: \${percentage}% Complete\`;
}

console.log(getCompletionSummary("React Track", 3, 4));`,
              solutionCode: `function getCompletionSummary(courseTitle, completed, total) {
  const percentage = Math.round((completed / total) * 100);
  return \`\${courseTitle}: \${percentage}% Complete\`;
}

console.log(getCompletionSummary("React Track", 3, 4));`,
              expectedOutput: 'React Track: 75% Complete',
              validationKeywords: ['const', 'Math.round', 'return'],
              hint: 'Use `Math.round((completed / total) * 100)` and return a template literal.'
            },
            miniTask: 'Audit a small script and replace every `var` with `const` by default, using `let` only where reassignment occurs.',
            conceptCheck: 'Can you mutate a property inside an object declared with `const user = { name: "Daniyal" }`? Yes, because `const` locks the memory reference, not the object’s internal properties.'
          }
        }
      },
      {
        id: 'js-lesson-2',
        courseId: 'course-javascript',
        slug: 'arrays-and-declarative-transformations',
        number: 2,
        title: 'Arrays & Declarative Transformations (map, filter, reduce)',
        summary: 'Transform collections cleanly without mutating original arrays using functional array methods.',
        durationMinutes: 18,
        tenPoints: {
          definition:
            'An Array is an ordered, zero-indexed collection of values equipped with higher-order methods (`map`, `filter`, `reduce`) for immutable data transformations.',
          simpleExplanation:
            'Instead of writing manual `for` loops that accidentally modify data in place, JavaScript gives you `filter` (keep matching items), `map` (transform every item into a new shape), and `reduce` (combine all items into a single summary value).',
          romanUrduExplanation:
            'Array ko aap aik list samajh sakte hain jisme index `0` se start hota hai. `.filter()` chhan-ne ka kaam karta hai, `.map()` har item ko naye format mein convert karta hai, aur `.reduce()` poori list ka total ya summary nikalta hai — baghair original array ko kharab kiye.',
          realWorldAnalogy: {
            title: 'An Automated Fruit Processing Line',
            analogy:
              'Stage 1 (`filter`) removes bruised apples. Stage 2 (`map`) slices and packages each good apple. Stage 3 (`reduce`) weighs all packages together to print the total shipment weight.',
            connection:
              'Chaining `.filter().map().reduce()` lets data flow through clean, predictable stages without side effects.'
          },
          syntax: {
            language: 'javascript',
            code: `const numbers = [10, 25, 40, 55];
const highValues = numbers.filter((n) => n >= 25);
const labeled = highValues.map((n) => \`\${n} pts\`);
const total = highValues.reduce((sum, n) => sum + n, 0);`,
            notes: 'Always pass an initial accumulator value (like `0`) as the second argument to `.reduce()`.'
          },
          codeExample: {
            title: 'Filtering & Summarizing Course Modules',
            language: 'javascript',
            code: `const lessons = [
  { title: "Variables", minutes: 15, completed: true },
  { title: "Arrays", minutes: 20, completed: true },
  { title: "Async Fetch", minutes: 25, completed: false }
];

const completedTitles = lessons
  .filter((lesson) => lesson.completed)
  .map((lesson) => lesson.title);

const totalMinutes = lessons
  .filter((lesson) => lesson.completed)
  .reduce((acc, lesson) => acc + lesson.minutes, 0);

console.log(completedTitles.join(", ") + " | " + totalMinutes + " mins");`,
            output: 'Variables, Arrays | 35 mins'
          },
          lineByLine: [
            {
              lines: 'Lines 7–9',
              code: 'lessons.filter((lesson) => lesson.completed).map((lesson) => lesson.title);',
              explanation: 'Selects only completed lesson objects, then extracts each object’s `title` string into a new array.',
              romanUrdu: 'Pehle sirf completed lessons filter kiye, phir unke titles ki aik nayi array bana li.'
            },
            {
              lines: 'Line 13',
              code: '.reduce((acc, lesson) => acc + lesson.minutes, 0);',
              explanation: 'Iterates through the filtered array starting `acc` at `0`, adding `lesson.minutes` on each step.',
              romanUrdu: '`acc` `0` se shuru ho kar har completed lesson ke minutes jama karta hai.'
            }
          ],
          howItWorksInternally: {
            summary:
              '`map` and `filter` allocate a brand-new array in heap memory and invoke your callback function once per element.',
            steps: [
              '1. `filter` creates an empty result array and pushes elements for which the callback returns truthy.',
              '2. `map` allocates a new array of the exact same length and populates each index with the callback return value.',
              '3. Original array indices remain untouched, preserving immutability for frameworks like React.'
            ]
          },
          commonMistakes: [
            {
              title: 'Forgetting `return` inside a curly-brace `.map()` callback',
              wrongCode: `const doubled = [1, 2, 3].map((n) => { n * 2; }); // [undefined, undefined, undefined]`,
              correctCode: `const doubled = [1, 2, 3].map((n) => { return n * 2; }); // [2, 4, 6]`,
              whyItHappens:
                'When using `{ }` block bodies in arrow functions, JavaScript requires an explicit `return` statement.'
            }
          ],
          practicalExample: {
            scenario:
              'In Faryal FC Web Platform and Daniyal Edu Tech, squad rosters and course catalogs are filtered by category and search query in real time using `.filter()` and `.map()`.',
            language: 'javascript',
            code: `function filterCatalog(courses, category, query) {
  const q = query.trim().toLowerCase();
  return courses.filter((c) =>
    (category === "All" || c.category === category) &&
    (!q || c.name.toLowerCase().includes(q))
  );
}`,
            takeaway: 'Combining predicates inside `.filter()` keeps UI filtering instantaneous and bug-free.'
          },
          practice: {
            mcq: {
              id: 'mcq-js-2',
              question: 'Which array method returns a brand-new array of the exact same length as the original array?',
              options: ['Array.prototype.filter()', 'Array.prototype.map()', 'Array.prototype.reduce()', 'Array.prototype.find()'],
              correctIndex: 1,
              explanation: '`.map()` transforms every element 1-to-1, always returning a new array of identical length.'
            },
            shortAnswer: {
              id: 'sa-js-2',
              question: 'Why should you pass `0` as the second argument when summing numbers with `.reduce()`?',
              sampleAnswer:
                'Providing `0` sets the initial accumulator value and prevents a TypeError if the array is empty.',
              keyKeywords: ['initial', 'empty', 'accumulator', '0', 'TypeError']
            },
            codingChallenge: {
              id: 'cc-js-2',
              title: 'Filter & Format Scores',
              prompt:
                'Given `scores = [45, 82, 91, 60, 95]`, filter scores `>= 80` and map them to strings with `"%"`, then join with `", "`.',
              starterCode: `const scores = [45, 82, 91, 60, 95];
const topScores = scores
  .filter((s) => s >= 80)
  .map((s) => \`\${s}%\`);

console.log(topScores.join(", "));`,
              solutionCode: `const scores = [45, 82, 91, 60, 95];
const topScores = scores
  .filter((s) => s >= 80)
  .map((s) => \`\${s}%\`);

console.log(topScores.join(", "));`,
              expectedOutput: '82%, 91%, 95%',
              validationKeywords: ['filter', 'map', 'join'],
              hint: 'Chain `.filter((s) => s >= 80)` and `.map((s) => `${s}%`)`.'
            },
            miniTask: 'Take a list of 5 numbers and compute both the filtered list of even numbers and their sum.',
            conceptCheck: 'Does `.filter()` modify the original array? No, it returns a new array.'
          }
        }
      },
      {
        id: 'js-lesson-3',
        courseId: 'course-javascript',
        slug: 'async-await-and-defensive-fetch-pipelines',
        number: 3,
        title: 'Async/Await, Promises & Defensive Fetch Pipelines',
        summary: 'Fetch real API data cleanly while handling network failures and invalid responses gracefully.',
        durationMinutes: 20,
        tenPoints: {
          definition:
            '`async/await` is syntactic sugar built on top of Promises that enables non-blocking asynchronous operations to be written and read like sequential code.',
          simpleExplanation:
            'Fetching weather data or GitHub repositories over the internet takes time. `async/await` pauses only that specific function until the server responds, keeping the browser UI smooth.',
          romanUrduExplanation:
            'Jab hum internet (API) se data mangwate hain to response aane mein kuch waqt lagta hai. `async/await` browser ko hang kiye baghair response ka intezar karta hai, aur `try / catch` network error aane par app ko crash hone se bachata hai.',
          realWorldAnalogy: {
            title: 'Ordering at a Busy Cafe Counter',
            analogy:
              'When you order coffee, the cashier gives you a buzzer (a Promise). You step aside (`await`), and when the buzzer rings, you collect your order (`resolve`) or handle an out-of-stock notice (`reject`).',
            connection:
              'The Event Loop continues handling user clicks while the network request resolves in the background.'
          },
          syntax: {
            language: 'javascript',
            code: `async function fetchUserData(username) {
  try {
    const response = await fetch(\`https://api.github.com/users/\${username}\`);
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    return await response.json();
  } catch {
    return null;
  }
}`,
            notes: '`fetch()` only rejects on network failure; always check `if (!response.ok)` for HTTP 404/500 errors.'
          },
          codeExample: {
            title: 'Resilient Weather Telemetry Parser (Hamara Weather Pattern)',
            language: 'javascript',
            code: `function formatWeatherResponse(city, status, tempC) {
  if (status !== 200) {
    return \`Fallback: Unable to load live weather for \${city} (HTTP \${status})\`;
  }
  return \`\${city}: \${tempC}°C — Live Telemetry Active\`;
}

console.log(formatWeatherResponse("Karachi", 200, 31));`,
            output: 'Karachi: 31°C — Live Telemetry Active'
          },
          lineByLine: [
            {
              lines: 'Line 1',
              code: 'async function fetchUserData(username)',
              explanation: 'Marking a function `async` guarantees that its return value is wrapped in a Promise.',
              romanUrdu: '`async` keyword lagane se function hamesha aik Promise return karta hai.'
            },
            {
              lines: 'Line 4',
              code: 'if (!response.ok) throw new Error(...)',
              explanation: 'Explicitly guards against HTTP 4xx and 5xx status codes before parsing JSON.',
              romanUrdu: 'JSON parse karne se pehle check karta hai ke server ne 200 OK bheja hai ya nahi.'
            }
          ],
          howItWorksInternally: {
            summary:
              'When execution hits `await`, the engine suspends the function context and schedules the continuation in the Microtask Queue once the Promise settles.',
            steps: [
              '1. `fetch()` initiates a network request via Web APIs and returns a pending Promise.',
              '2. `await` yields control back to the main thread so animations stay at 60 FPS.',
              '3. When the HTTP response arrives, the continuation runs in the Microtask Queue.'
            ]
          },
          commonMistakes: [
            {
              title: 'Assuming `fetch()` throws an error on 404 Not Found',
              wrongCode: `const res = await fetch("/api/missing");
const data = await res.json(); // Fails on 404 HTML body!`,
              correctCode: `const res = await fetch("/api/missing");
if (!res.ok) throw new Error(\`Status \${res.status}\`);
const data = await res.json();`,
              whyItHappens:
                'Fetch only rejects on network-level failures, not HTTP 4xx/5xx status codes.'
            }
          ],
          practicalExample: {
            scenario:
              'Used in Daniyal Hayat’s Portfolio to synchronize live GitHub repository statistics from `https://api.github.com/users/DotDaniyal/repos` with a verified local fallback.',
            language: 'javascript',
            code: `async function syncReposWithFallback(username, fallbackRepos) {
  try {
    const res = await fetch(\`https://api.github.com/users/\${username}/repos\`);
    if (!res.ok) return fallbackRepos;
    return await res.json();
  } catch {
    return fallbackRepos;
  }
}`,
            takeaway: 'Always pair live external API calls with a verified local fallback.'
          },
          practice: {
            mcq: {
              id: 'mcq-js-3',
              question: 'When does a `fetch()` Promise reject automatically?',
              options: [
                'Whenever the server returns HTTP 404',
                'Whenever the server returns HTTP 500',
                'Only when a network error prevents the request from completing',
                'Whenever the JSON body is empty'
              ],
              correctIndex: 2,
              explanation: '`fetch()` only rejects on network failures; HTTP 4xx/5xx resolve with `response.ok === false`.'
            },
            shortAnswer: {
              id: 'sa-js-3',
              question: 'Why must you check `response.ok` before calling `await response.json()`?',
              sampleAnswer:
                'Because HTTP 404 or 500 responses still resolve the fetch promise, and checking `response.ok` ensures a 200-299 status before parsing JSON.',
              keyKeywords: ['200', '404', '500', 'status', 'success', 'resolve']
            },
            codingChallenge: {
              id: 'cc-js-3',
              title: 'Format API Status Check',
              prompt:
                'Complete `checkApiHealth(statusCode)` to return `"OK: 200"` when `statusCode >= 200 && statusCode < 300`, or `"Error: " + statusCode` otherwise.',
              starterCode: `function checkApiHealth(statusCode) {
  if (statusCode >= 200 && statusCode < 300) {
    return \`OK: \${statusCode}\`;
  }
  return \`Error: \${statusCode}\`;
}

console.log(checkApiHealth(200) + " | " + checkApiHealth(404));`,
              solutionCode: `function checkApiHealth(statusCode) {
  if (statusCode >= 200 && statusCode < 300) {
    return \`OK: \${statusCode}\`;
  }
  return \`Error: \${statusCode}\`;
}

console.log(checkApiHealth(200) + " | " + checkApiHealth(404));`,
              expectedOutput: 'OK: 200 | Error: 404',
              validationKeywords: ['200', '300', 'return'],
              hint: 'Check `if (statusCode >= 200 && statusCode < 300)`.'
            },
            miniTask: 'Write an `async` wrapper around `fetch` that catches errors and returns a fallback object.',
            conceptCheck: 'What does an `async` function always return? A Promise.'
          }
        }
      }
    ]
  },
  {
    id: 'course-typescript',
    slug: 'typescript-engineering-type-safety',
    name: 'TypeScript Engineering & Type Safety',
    shortName: 'TypeScript',
    tagline: 'Eliminate runtime crashes with interfaces, union types, generics, and strict schema narrowing.',
    description:
      'Learn how TypeScript powers Daniyal Hayat’s production platforms. Master structural typing, discriminated unions, generic utilities, and runtime boundary validation.',
    category: 'Programming',
    difficulty: 'Intermediate',
    iconName: 'FileCode2',
    accentColor: 'blue',
    topics: ['Interfaces & Type Aliases', 'Discriminated Unions', 'Generics `<T>`', 'Type Narrowing & Guards', 'Strict Null Checks'],
    relatedProjectIds: ['cortexiq-by-dnyl', 'daniyal-hayat-portfolio', 'dnyl-eyewear', 'islamic-ai-mujeeb'],
    lessons: [
      {
        id: 'ts-lesson-1',
        courseId: 'course-typescript',
        slug: 'interfaces-structural-contracts-and-unions',
        number: 1,
        title: 'Interfaces, Structural Contracts & Discriminated Unions',
        summary: 'Design self-documenting data shapes and eliminate impossible UI states at compile time.',
        durationMinutes: 18,
        tenPoints: {
          definition:
            'TypeScript is a statically typed superset of JavaScript that performs compile-time type analysis using structural contracts (`interface`, `type`) before emitting standard JavaScript.',
          simpleExplanation:
            'In plain JavaScript, you often discover a typo like `course.titel` only when a user clicks a button and the page crashes. TypeScript checks every property name and data type while you write code.',
          romanUrduExplanation:
            'TypeScript ko aap code ka blueprint samajh sakte hain. Plain JavaScript mein ghalti tab pata chalti hai jab app run hoti hai, magar TypeScript code likhte waqt hi bata deta hai ke kis object mein kaunsi property mojood hai.',
          realWorldAnalogy: {
            title: 'Architectural Blueprints & Power Sockets',
            analogy:
              'An `interface` is like an electrical socket specification. Any plug that has the exact required pins fits safely, and if a pin is missing, the inspector flags it before the building opens.',
            connection:
              'If an object matches the required shape of an `interface`, it satisfies the TypeScript contract.'
          },
          syntax: {
            language: 'typescript',
            code: `type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

interface CourseTrack {
  readonly id: string;
  title: string;
  difficulty: Difficulty;
  lessonsCount: number;
}`,
            notes: 'Use union string literals (`"Beginner" | "Intermediate"`) instead of generic `string` whenever a field has a fixed set of valid values.'
          },
          codeExample: {
            title: 'Type-Safe Course Badge Formatter',
            language: 'javascript',
            code: `function describeTrack(title, difficulty, lessons) {
  return \`[\${difficulty.toUpperCase()}] \${title} (\${lessons} lessons)\`;
}

console.log(describeTrack("TypeScript Engineering", "Intermediate", 12));`,
            output: '[INTERMEDIATE] TypeScript Engineering (12 lessons)'
          },
          lineByLine: [
            {
              lines: 'Line 1',
              code: "type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';",
              explanation: 'Restricts the type to three valid string literals; any misspelling causes an immediate compiler error.',
              romanUrdu: 'Ab `Difficulty` mein in teen words ke ilawa koi spelling mistake allow nahi hogi.'
            },
            {
              lines: 'Line 4',
              code: 'readonly id: string;',
              explanation: 'Marks `id` as immutable so no function can accidentally overwrite a course ID.',
              romanUrdu: '`readonly` lagane se koi function ghalti se bhi `id` ko overwrite nahi kar sakta.'
            }
          ],
          howItWorksInternally: {
            summary:
              'The TypeScript compiler (`tsc`) parses your code into an AST, performs structural type checking, and erases all type annotations during transpilation.',
            steps: [
              '1. AST Parsing: Maps every identifier and type declaration across modules.',
              '2. Structural Type Checker: Compares assigned values against declared interfaces.',
              '3. Type Erasure: Removes all `interface` and `: string` annotations so the final JavaScript bundle has zero runtime overhead.'
            ]
          },
          commonMistakes: [
            {
              title: 'Overusing `any` and disabling the type checker',
              wrongCode: `function processPayload(data: any) {
  return data.user.name.toUpperCase(); // Runtime crash if user is null!
}`,
              correctCode: `interface Payload { user?: { name?: string } }
function processPayload(data: Payload): string {
  return data.user?.name ? data.user.name.toUpperCase() : "Guest";
}`,
              whyItHappens:
                'Using `any` turns off all TypeScript safety checks. Use explicit interfaces or `unknown` instead.'
            }
          ],
          practicalExample: {
            scenario:
              'In Daniyal’s Mystic Match and CortexIQ AI Suite, union types represent board states (`"IDLE" | "SWAPPING" | "CHECKING"`) without ambiguous boolean combinations.',
            language: 'typescript',
            code: `type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T };`,
            takeaway: 'Discriminated unions make it impossible to read `state.data` before verifying `state.status === "success"`.'
          },
          practice: {
            mcq: {
              id: 'mcq-ts-1',
              question: 'What happens to TypeScript `interface` declarations when code is compiled to JavaScript?',
              options: [
                'They are converted into browser cookies',
                'They are completely erased during compilation with zero runtime footprint',
                'They become global window variables',
                'They slow down JavaScript execution'
              ],
              correctIndex: 1,
              explanation: 'TypeScript performs compile-time checking and erases all interfaces when emitting JavaScript.'
            },
            shortAnswer: {
              id: 'sa-ts-1',
              question: 'Why is `unknown` safer than `any` for untrusted API payloads in TypeScript?',
              sampleAnswer:
                '`unknown` forces you to perform type narrowing or validation checks before accessing properties on the value, whereas `any` bypasses compiler checks.',
              keyKeywords: ['narrowing', 'check', 'validate', 'compiler', 'properties']
            },
            codingChallenge: {
              id: 'cc-ts-1',
              title: 'Format Discriminated Union State',
              prompt:
                'Write `handleState(status, count)` that returns `"Ready: 5 items"` when status is `"success"`, or `"Waiting..."` otherwise.',
              starterCode: `function handleState(status, count) {
  if (status === "success") {
    return \`Ready: \${count} items\`;
  }
  return "Waiting...";
}

console.log(handleState("success", 5));`,
              solutionCode: `function handleState(status, count) {
  if (status === "success") {
    return \`Ready: \${count} items\`;
  }
  return "Waiting...";
}

console.log(handleState("success", 5));`,
              expectedOutput: 'Ready: 5 items',
              validationKeywords: ['success', 'Ready:', 'return'],
              hint: 'Check `if (status === "success")` and return the template literal.'
            },
            miniTask: 'Create an interface `ProjectCardProps` with `readonly id: string`, `name: string`, and optional `liveUrl?: string`.',
            conceptCheck: 'What does `?` on `liveUrl?: string` mean? The property is optional (`string | undefined`).'
          }
        }
      },
      {
        id: 'ts-lesson-2',
        courseId: 'course-typescript',
        slug: 'generics-and-reusable-storage-utilities',
        number: 2,
        title: 'Generics `<T>` & Type-Safe Storage Utilities',
        summary: 'Write reusable functions and data wrappers that preserve exact types across your entire codebase.',
        durationMinutes: 20,
        tenPoints: {
          definition:
            'Generics (`<T>`) allow functions, interfaces, and classes to operate on a type parameter specified by the caller, preserving full type safety without duplicating code.',
          simpleExplanation:
            'When reading from LocalStorage, sometimes you read a `string[]` and sometimes a `UserPreferences` object. Generics let you pass the expected type `<T>` so TypeScript knows the exact return type.',
          romanUrduExplanation:
            'Generics `<T>` ko aap aik flexible template samajh sakte hain jo automatically wohi type adopt kar leta hai jo aap function call karte waqt dete hain.',
          realWorldAnalogy: {
            title: 'A Custom-Labeled Shipping Container',
            analogy:
              'A standard shipping container (`Wrapper<T>`) has the same lock mechanism regardless of cargo, while stamping `<OpticalFrames>` on the manifest tells the warehouse the exact item type inside.',
            connection:
              'In `safeGetItem<string[]>("daniyal_edu_favorites", [])`, `<string[]>` informs TypeScript that the returned value is an array of strings.'
          },
          syntax: {
            language: 'typescript',
            code: `function wrapInArray<T>(item: T): T[] {
  return [item];
}
const names = wrapInArray<string>("Daniyal"); // string[]`,
            notes: 'TypeScript can infer `<T>` automatically from the argument you pass.'
          },
          codeExample: {
            title: 'Type-Safe LocalStorage Reader (Daniyal Edu Tech Architecture)',
            language: 'javascript',
            code: `function parseWithFallback(rawJson, fallbackValue) {
  try {
    if (!rawJson) return fallbackValue;
    return JSON.parse(rawJson);
  } catch {
    return fallbackValue;
  }
}

const favorites = parseWithFallback('["course-typescript", "course-react"]', []);
console.log("Loaded " + favorites.length + " favorites: " + favorites.join(", "));`,
            output: 'Loaded 2 favorites: course-typescript, course-react'
          },
          lineByLine: [
            {
              lines: 'Line 1',
              code: 'function safeGetItem<T>(key: string, fallback: T): T',
              explanation: 'Declares a generic type parameter `T` where both `fallback` and the return value share the exact same type `T`.',
              romanUrdu: 'Jo type `fallback` ki hogi, wohi exact type function return bhi karega.'
            }
          ],
          howItWorksInternally: {
            summary:
              'During compilation, TypeScript substitutes `<T>` at each call site with the concrete type provided or inferred.',
            steps: [
              '1. Type Parameter Instantiation: Binds `T` to the concrete type at the call site.',
              '2. Constraint Verification: Checks any `T extends ...` constraints.',
              '3. Return Propagation: Downstream variables inherit the resolved type `T`.'
            ]
          },
          commonMistakes: [
            {
              title: 'Using `as T` without a fallback or runtime check',
              wrongCode: `const data = JSON.parse(localStorage.getItem("key")!) as string[];`,
              correctCode: `const raw = localStorage.getItem("key");
const data: string[] = raw ? JSON.parse(raw) : [];`,
              whyItHappens: 'Type assertions (`as T`) do not prevent runtime crashes when storage is null.'
            }
          ],
          practicalExample: {
            scenario:
              'Used directly in Daniyal Edu Tech’s `src/lib/storage.ts` to manage all LocalStorage keys with 100% type safety.',
            language: 'typescript',
            code: `export function safeGetItem<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}`,
            takeaway: 'One generic helper eliminates dozens of repetitive `try/catch` blocks.'
          },
          practice: {
            mcq: {
              id: 'mcq-ts-2',
              question: 'In `function firstElement<T>(arr: T[]): T | undefined`, what is the return type when called with `firstElement([10, 20, 30])`?',
              options: ['string', 'number | undefined', 'any', 'number[]'],
              correctIndex: 1,
              explanation: 'Since `arr` is `number[]`, `T` is inferred as `number`.'
            },
            shortAnswer: {
              id: 'sa-ts-2',
              question: 'How do you restrict a generic type `<T>` so it only accepts objects that have an `id: string` property?',
              sampleAnswer: 'Use a generic constraint with `extends`: `function findById<T extends { id: string }>(items: T[])`.',
              keyKeywords: ['extends', 'id', 'string', 'constraint']
            },
            codingChallenge: {
              id: 'cc-ts-2',
              title: 'Implement First & Last Helper',
              prompt:
                'Write `getFirstAndLast(items)` that returns `"First: HTML, Last: React"` for `["HTML", "CSS", "React"]`.',
              starterCode: `function getFirstAndLast(items) {
  const first = items[0];
  const last = items[items.length - 1];
  return \`First: \${first}, Last: \${last}\`;
}

console.log(getFirstAndLast(["HTML", "CSS", "React"]));`,
              solutionCode: `function getFirstAndLast(items) {
  const first = items[0];
  const last = items[items.length - 1];
  return \`First: \${first}, Last: \${last}\`;
}

console.log(getFirstAndLast(["HTML", "CSS", "React"]));`,
              expectedOutput: 'First: HTML, Last: React',
              validationKeywords: ['items[0]', 'items.length - 1', 'return'],
              hint: 'Access `items[0]` and `items[items.length - 1]`.'
            },
            miniTask: 'Write a generic `ApiResponse<T>` interface with `ok: boolean` and `data: T`.',
            conceptCheck: 'Does `as MyType` perform runtime validation in JavaScript? No, it is compile-time only.'
          }
        }
      }
    ]
  },
  {
    id: 'course-react',
    slug: 'react-19-component-architecture',
    name: 'React 19 & Component Architecture',
    shortName: 'React',
    tagline: 'Build declarative user interfaces, custom hooks, and high-performance interactive views.',
    description:
      'Learn how React renders UI as a pure function of state. Master props, `useState`, `useEffect`, derived state, custom hooks, and Virtual DOM reconciliation.',
    category: 'Frontend',
    difficulty: 'Intermediate',
    iconName: 'Atom',
    accentColor: 'cyan',
    topics: ['Declarative UI & JSX', 'State & Immutability', 'Derived State vs useEffect', 'Custom Hooks', 'Fiber Reconciliation'],
    relatedProjectIds: ['daniyal-hayat-portfolio', 'faryal-fc', 'dnyl-eyewear', 'cortexiq-by-dnyl'],
    lessons: [
      {
        id: 'react-lesson-1',
        courseId: 'course-react',
        slug: 'declarative-state-and-immutability',
        number: 1,
        title: 'Declarative UI, useState & State Immutability',
        summary: 'Understand why React re-renders only when state references change and how to structure interactive components.',
        durationMinutes: 18,
        tenPoints: {
          definition:
            'React is a declarative UI library where components describe what the interface should look like for any given state (`UI = f(state)`), triggering automatic DOM updates when immutable state transitions occur.',
          simpleExplanation:
            'In React, you update your state variable using `setState`, and React automatically calculates the smallest DOM update needed.',
          romanUrduExplanation:
            'React mein aapko manually HTML elements dhoond kar change nahi karne partay. Aap sirf `useState` ke zariye data update karte hain, aur React khud screen ka wohi hissa refresh kar deta hai jahan data badla ho.',
          realWorldAnalogy: {
            title: 'A Digital Airport Flight Board',
            analogy:
              'When the control room updates the flight database record (`setState`), the digital display board refreshes the changed row automatically.',
            connection:
              'Calling a React state setter schedules a re-render with the new state snapshot.'
          },
          syntax: {
            language: 'tsx',
            code: `const [favorites, setFavorites] = useState<string[]>([]);

function handleToggle(courseId: string) {
  setFavorites((prev) =>
    prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
  );
}`,
            notes: 'Always create a new array reference (`[...prev, item]`) rather than mutating with `.push()`.'
          },
          codeExample: {
            title: 'Immutable Favorite Toggle Logic',
            language: 'javascript',
            code: `function toggleFavoriteState(prevFavorites, courseId) {
  return prevFavorites.includes(courseId)
    ? prevFavorites.filter((id) => id !== courseId)
    : [...prevFavorites, courseId];
}

const step1 = toggleFavoriteState(["js-101"], "ts-201");
const step2 = toggleFavoriteState(step1, "js-101");
console.log("Current Favorites: " + step2.join(", "));`,
            output: 'Current Favorites: ts-201'
          },
          lineByLine: [
            {
              lines: 'Line 2',
              code: 'prevFavorites.filter((id) => id !== courseId)',
              explanation: 'Returns a brand-new array reference with `courseId` removed, signaling React to re-render.',
              romanUrdu: '`.filter()` aik nayi array banata hai taake React ko pata chale ke state change hui hai.'
            }
          ],
          howItWorksInternally: {
            summary:
              'React maintains an internal Fiber tree representing every mounted component and its hook linked list.',
            steps: [
              '1. State Comparison: React compares `Object.is(prev, next)`. If identical, it bails out.',
              '2. Render Phase: React invokes your component function to produce a new element tree.',
              '3. Commit Phase: React applies only the changed nodes to the real browser DOM.'
            ]
          },
          commonMistakes: [
            {
              title: 'Mutating state arrays directly with `.push()`',
              wrongCode: `items.push("TypeScript");
setItems(items); // Same reference — React skips re-render!`,
              correctCode: `setItems((prev) => [...prev, "TypeScript"]);`,
              whyItHappens:
                '`.push()` keeps the same array reference in memory, so `Object.is(prev, next)` is true.'
            }
          ],
          practicalExample: {
            scenario:
              'Used in DNYL Eyewear Boutique for optical frame customization and in Daniyal Edu Tech for toggling favorite courses (`♥`).',
            language: 'tsx',
            code: `<button type="button" onClick={onToggle} aria-pressed={isFavorite}>
  {isFavorite ? '♥ Favorited' : '♡ Favorite'}
</button>`,
            takeaway: 'Treat React state as immutable snapshots.'
          },
          practice: {
            mcq: {
              id: 'mcq-react-1',
              question: 'Why does `items.push(newItem); setItems(items);` fail to trigger a React re-render?',
              options: [
                'Because `.push()` is deprecated',
                'Because `items` still points to the exact same array reference in memory (`Object.is` is true)',
                'Because `useState` only supports strings',
                'Because React requires a page reload'
              ],
              correctIndex: 1,
              explanation: 'React compares old and new state with `Object.is(prevState, nextState)`.'
            },
            shortAnswer: {
              id: 'sa-react-1',
              question: 'Why should you compute filtered lists directly during render instead of storing them in a second `useState`?',
              sampleAnswer:
                'Derived state calculated during render stays automatically in sync with the source state and avoids extra cascading re-renders.',
              keyKeywords: ['derived', 'sync', 'render', 'useEffect', 're-render']
            },
            codingChallenge: {
              id: 'cc-react-1',
              title: 'Immutable State Reducer Simulation',
              prompt:
                'Complete `addBookmarkImmutable(bookmarks, newId)` so it returns a new array with `newId` added only if not already present.',
              starterCode: `function addBookmarkImmutable(bookmarks, newId) {
  if (bookmarks.includes(newId)) return bookmarks;
  return [...bookmarks, newId];
}

console.log(addBookmarkImmutable(["lesson-1"], "lesson-2").join(" -> "));`,
              solutionCode: `function addBookmarkImmutable(bookmarks, newId) {
  if (bookmarks.includes(newId)) return bookmarks;
  return [...bookmarks, newId];
}

console.log(addBookmarkImmutable(["lesson-1"], "lesson-2").join(" -> "));`,
              expectedOutput: 'lesson-1 -> lesson-2',
              validationKeywords: ['includes', '...bookmarks', 'return'],
              hint: 'Use `bookmarks.includes(newId)` and `[...bookmarks, newId]`.'
            },
            miniTask: 'Refactor a component with redundant state variables so derived totals are computed during render.',
            conceptCheck: 'Why must React Hooks only be called at the top level? Because React relies on the exact call order of hooks across renders.'
          }
        }
      }
    ]
  },
  {
    id: 'course-html-css',
    slug: 'html5-semantic-web-architecture',
    name: 'HTML5 & Semantic Web Architecture',
    shortName: 'HTML5 & Web Core',
    tagline: 'Write accessible, SEO-ready semantic markup, bilingual RTL/LTR layouts, and structured documents.',
    description:
      'Master the structural foundation of every web platform. Learn semantic landmarks, accessibility attributes, form ergonomics, OpenGraph metadata, and RTL/LTR document direction.',
    category: 'Frontend',
    difficulty: 'Beginner',
    iconName: 'Layout',
    accentColor: 'emerald',
    topics: ['Semantic Landmarks', 'Accessibility & ARIA', 'Forms & Validation', 'Bilingual RTL/LTR Markup', 'Technical SEO & Schema'],
    relatedProjectIds: ['offical-darul-ifta-irshad-us-saileen', 'hamara-weather'],
    lessons: [
      {
        id: 'html-lesson-1',
        courseId: 'course-html-css',
        slug: 'semantic-landmarks-accessibility-and-seo',
        number: 1,
        title: 'Semantic HTML5 Landmarks, Accessibility & Technical SEO',
        summary: 'Why `<header>`, `<main>`, `<nav>`, `<article>`, and `<section>` matter for screen readers and search engines.',
        durationMinutes: 14,
        tenPoints: {
          definition:
            'Semantic HTML is the practice of choosing HTML elements based on the meaning and structural role of the content (`<nav>`, `<main>`, `<article>`) rather than its visual appearance alone.',
          simpleExplanation:
            'Semantic tags give your document an instant outline, better search engine indexing, and built-in keyboard accessibility.',
          romanUrduExplanation:
            'Sirf `<div>` lagane se browser ko pata nahi chalta ke konsa hissa navigation bar hai aur konsa main article. Semantic tags (`<header>`, `<nav>`, `<main>`, `<footer>`) lagane se SEO aur accessibility dono behtar hoti hain.',
          realWorldAnalogy: {
            title: 'A Newspaper With Clear Section Headers',
            analogy:
              'A well-edited newspaper has a Masthead (`<header>`), Table of Contents (`<nav>`), and Lead Story (`<main>` + `<article>`), allowing readers to jump straight to what they need.',
            connection:
              'Assistive technologies allow users to jump straight to `<main>` or `<nav>` via keyboard shortcuts.'
          },
          syntax: {
            language: 'html',
            code: `<header><nav aria-label="Primary">...</nav></header>
<main id="main-content">
  <article><h1>Lesson Title</h1></article>
</main>
<footer>...</footer>`,
            notes: 'Every page should have one `<main>` landmark and start with a single `<h1>`.'
          },
          codeExample: {
            title: 'Semantic Landmark Audit Helper',
            language: 'javascript',
            code: `function auditLandmarks(tags) {
  const required = ["header", "nav", "main", "footer"];
  const missing = required.filter((req) => !tags.includes(req));
  return missing.length === 0
    ? "Audit PASSED: All core landmarks present"
    : "Missing: " + missing.join(", ");
}

console.log(auditLandmarks(["header", "nav", "main", "article", "footer"]));`,
            output: 'Audit PASSED: All core landmarks present'
          },
          lineByLine: [
            {
              lines: 'Line 1',
              code: '<nav aria-label="Primary">',
              explanation: 'Distinguishes the top navigation bar from footer navigation landmarks.',
              romanUrdu: '`aria-label` batata hai ke yeh primary navigation menu hai.'
            }
          ],
          howItWorksInternally: {
            summary:
              'When the browser parses HTML into the DOM tree, it constructs an Accessibility Tree exposed to assistive APIs.',
            steps: [
              '1. HTML Tokenizer builds DOM nodes from semantic tags.',
              '2. Browser maps `<main>` and `<button>` to accessible roles and focusable controls.',
              '3. Search engine crawlers prioritize headings and `<article>` content.'
            ]
          },
          commonMistakes: [
            {
              title: 'Using `<div onClick={...}>` instead of `<button type="button">`',
              wrongCode: `<div onClick={save}>Save</div>`,
              correctCode: `<button type="button" onClick={save}>Save</button>`,
              whyItHappens: 'A `<div>` is not focusable with `Tab` and does not respond to `Enter`/`Space`.'
            }
          ],
          practicalExample: {
            scenario:
              'In Official Darul Ifta Irshad us Saileen, semantic `<article>` tags and `dir="rtl"` / `dir="ltr"` attributes allow seamless reading of Urdu fatwas alongside English navigation.',
            language: 'html',
            code: `<article lang="ur" dir="rtl" class="p-6 rounded-xl border">
  <h2>فتویٰ نمبر ١٠٤: جدید مسائل کی تحقیق</h2>
</article>`,
            takeaway: 'Use native HTML attributes (`lang`, `dir`, `<button>`, `<article>`) first.'
          },
          practice: {
            mcq: {
              id: 'mcq-html-1',
              question: 'Why is `<button type="button">` superior to `<div onClick={...}>` for interactive actions?',
              options: [
                'It downloads faster over HTTP',
                'It provides built-in Tab focus, Enter/Space key activation, and screen reader role announcement',
                'It automatically saves data to LocalStorage',
                'It prevents CSS styles from being applied'
              ],
              correctIndex: 1,
              explanation: 'Native `<button>` elements are keyboard-focusable and accessible by default.'
            },
            shortAnswer: {
              id: 'sa-html-1',
              question: 'Which HTML attribute should you set on a container holding Urdu or Arabic text so layout flows right-to-left?',
              sampleAnswer: 'Set `dir="rtl"` on the container element.',
              keyKeywords: ['dir', 'rtl', 'right-to-left']
            },
            codingChallenge: {
              id: 'cc-html-1',
              title: 'Generate Accessible Button Markup',
              prompt:
                'Write `renderButton(label, isPressed)` returning `<button type="button" aria-pressed="true">Saved</button>`.',
              starterCode: `function renderButton(label, isPressed) {
  return \`<button type="button" aria-pressed="\${isPressed}">\${label}</button>\`;
}

console.log(renderButton("Saved", true));`,
              solutionCode: `function renderButton(label, isPressed) {
  return \`<button type="button" aria-pressed="\${isPressed}">\${label}</button>\`;
}

console.log(renderButton("Saved", true));`,
              expectedOutput: '<button type="button" aria-pressed="true">Saved</button>',
              validationKeywords: ['button', 'type="button"', 'aria-pressed'],
              hint: 'Interpolate `isPressed` and `label` inside the template literal.'
            },
            miniTask: 'Verify that every icon-only button in your UI includes an `aria-label`.',
            conceptCheck: 'How many `<main>` landmarks should be visible on a page at once? One.'
          }
        }
      }
    ]
  },
  {
    id: 'course-tailwind',
    slug: 'modern-css3-and-tailwind-systems',
    name: 'Modern CSS3 & Tailwind CSS Systems',
    shortName: 'Tailwind CSS',
    tagline: 'Craft responsive layouts, Flexbox/Grid architectures, and dual dark/light theme systems.',
    description:
      'Master utility-first styling with Tailwind CSS and modern CSS3. Build mobile-first grids, zero-overflow layouts, custom design tokens, and accessible contrast systems.',
    category: 'Frontend',
    difficulty: 'Beginner',
    iconName: 'Palette',
    accentColor: 'sky',
    topics: ['Flexbox & CSS Grid', 'Mobile-First Breakpoints', 'Dark/Light Theme Tokens', '60-30-10 Color Balance', 'Responsive Typography'],
    relatedProjectIds: ['dnyl-eyewear', 'faryal-fc', 'daniyal-hayat-portfolio'],
    lessons: [
      {
        id: 'tw-lesson-1',
        courseId: 'course-tailwind',
        slug: 'responsive-grid-and-mobile-first-architecture',
        number: 1,
        title: 'Mobile-First Responsive Layouts with CSS Grid & Flexbox',
        summary: 'Design layouts that scale effortlessly from 320px phones to 1920px desktop monitors without horizontal overflow.',
        durationMinutes: 16,
        tenPoints: {
          definition:
            'Mobile-first responsive design is a CSS methodology where base styles target narrow viewports (`320px+`) and progressive media query prefixes (`sm:`, `md:`, `lg:`, `xl:`) enhance the layout as screen width increases.',
          simpleExplanation:
            'In Tailwind CSS, an unprefixed class like `grid-cols-1` applies to mobile phones first. Adding `md:grid-cols-2 lg:grid-cols-3` expands the grid on tablets and laptops.',
          romanUrduExplanation:
            'Tailwind CSS mobile-first kaam karta hai: baghair prefix wali class mobile par lagti hai, aur `md:` ya `lg:` wali classes bari screens par activate hoti hain.',
          realWorldAnalogy: {
            title: 'Modular Shelving Units',
            analogy:
              'In a narrow hallway (320px mobile), storage cubes stack in a single vertical column. In a wider studio room (1440px desktop), the same cubes sit side-by-side in three columns.',
            connection:
              '`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` reflows cards without duplicating HTML.'
          },
          syntax: {
            language: 'html',
            code: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  <article class="flex flex-col justify-between p-6 rounded-xl border">...</article>
</div>`,
            notes: 'Use CSS Grid for 2D card grids and Flexbox for 1D row alignment.'
          },
          codeExample: {
            title: 'Responsive Breakpoint Column Calculator',
            language: 'javascript',
            code: `function resolveGridColumns(viewportWidth) {
  if (viewportWidth >= 1024) return "3 columns (lg:grid-cols-3)";
  if (viewportWidth >= 768) return "2 columns (md:grid-cols-2)";
  return "1 column (grid-cols-1)";
}

console.log("375px:", resolveGridColumns(375), "| 1440px:", resolveGridColumns(1440));`,
            output: '375px: 1 column (grid-cols-1) | 1440px: 3 columns (lg:grid-cols-3)'
          },
          lineByLine: [
            {
              lines: 'Line 1',
              code: 'class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"',
              explanation: 'Defines 1 column on mobile, 2 at `>= 768px`, and 3 at `>= 1024px`.',
              romanUrdu: 'Mobile par 1 column, tablet par 2, aur laptop par 3 columns automatically ban jayenge.'
            }
          ],
          howItWorksInternally: {
            summary:
              'Tailwind scans source files at build time and generates atomic CSS rules wrapped in `@media (min-width: ...)` queries.',
            steps: [
              '1. Token Scan: Detects utility classes used in components.',
              '2. Rule Generation: Emits only used classes into the CSS bundle.',
              '3. Browser Layout: Evaluates `@media` queries natively without JS overhead.'
            ]
          },
          commonMistakes: [
            {
              title: 'Hardcoding fixed pixel widths like `w-[600px]`',
              wrongCode: `<div className="w-[600px]">Overflows on 375px phones!</div>`,
              correctCode: `<div className="w-full max-w-[600px]">Scales cleanly on 320px+</div>`,
              whyItHappens: 'Fixed widths wider than 320px cause horizontal scrollbars on mobile.'
            }
          ],
          practicalExample: {
            scenario:
              'Used across Daniyal Edu Tech’s two-column Lesson Viewer (`lg:grid-cols-[280px_minmax(0,1fr)]`) which collapses into a compact drawer on mobile.',
            language: 'tsx',
            code: `<div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8">
  <aside className="hidden lg:block">...</aside>
  <main className="min-w-0">...</main>
</div>`,
            takeaway: 'Add `min-w-0` on grid children containing `<pre><code>` blocks to prevent horizontal overflow.'
          },
          practice: {
            mcq: {
              id: 'mcq-tw-1',
              question: 'In Tailwind CSS, which screens does `md:flex` apply to?',
              options: [
                'Only screens narrower than 768px',
                'Screens 768px wide and wider (`@media (min-width: 768px)`)',
                'Only phones between 375px and 414px',
                'Only print stylesheets'
              ],
              correctIndex: 1,
              explanation: 'Tailwind uses `min-width` breakpoints, so `md:` applies at `768px` and wider.'
            },
            shortAnswer: {
              id: 'sa-tw-1',
              question: 'Why should you add `min-w-0` to a CSS Grid or Flex child that contains a `<pre><code>` block?',
              sampleAnswer:
                '`min-w-0` allows the grid/flex child to shrink below its content’s intrinsic width so wide code scrolls inside its container instead of overflowing the page.',
              keyKeywords: ['shrink', 'overflow', 'scroll', 'width', 'code']
            },
            codingChallenge: {
              id: 'cc-tw-1',
              title: 'Validate Container Spacing Math',
              prompt:
                'Write `checkSpacingRule(outerPadding, innerGap)` returning `"Valid Spatial Math"` when `outerPadding >= innerGap`.',
              starterCode: `function checkSpacingRule(outerPadding, innerGap) {
  return outerPadding >= innerGap ? "Valid Spatial Math" : "Increase outer padding";
}

console.log(checkSpacingRule(24, 16));`,
              solutionCode: `function checkSpacingRule(outerPadding, innerGap) {
  return outerPadding >= innerGap ? "Valid Spatial Math" : "Increase outer padding";
}

console.log(checkSpacingRule(24, 16));`,
              expectedOutput: 'Valid Spatial Math',
              validationKeywords: ['>=', 'Valid Spatial Math'],
              hint: 'Compare `outerPadding >= innerGap`.'
            },
            miniTask: 'Test a card grid at 320px viewport width and verify zero horizontal scrollbar.',
            conceptCheck: 'What is the 60-30-10 color rule? 60% neutral canvas, 30% structural surfaces, 10% primary accent.'
          }
        }
      }
    ]
  }
];
