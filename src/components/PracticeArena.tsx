import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Code2, Play, RotateCcw, Terminal } from 'lucide-react';
import { getAllLessons } from '../data/coursesData';
import { getCodeDraft, saveCodeDraft } from '../lib/storage';

interface PracticeArenaProps {
  completedChallenges: string[];
  onMarkChallengeComplete: (challengeId: string) => void;
  onOpenLesson: (courseId: string, lessonId: string) => void;
  onToast: (msg: string) => void;
}

export const PracticeArena: React.FC<PracticeArenaProps> = ({
  completedChallenges,
  onMarkChallengeComplete,
  onOpenLesson,
  onToast,
}) => {
  const allItems = useMemo(() => getAllLessons(), []);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    allItems[0]?.lesson.id || ''
  );
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');

  const activeEntry =
    allItems.find((item) => item.lesson.id === selectedLessonId) || allItems[0];
  const challenge = activeEntry.lesson.tenPoints.practice.codingChallenge;

  const [editorCode, setEditorCode] = useState('');
  const [outputLog, setOutputLog] = useState<string>('');
  const [statusPassed, setStatusPassed] = useState<boolean | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    setEditorCode(getCodeDraft(challenge.id, challenge.starterCode));
    setOutputLog('');
    setStatusPassed(null);
    setShowSolution(false);
  }, [challenge.id, challenge.starterCode]);

  const filteredItems = useMemo(() => {
    return allItems.filter(({ lesson }) => {
      const done = completedChallenges.includes(lesson.tenPoints.practice.codingChallenge.id);
      if (filterStatus === 'completed') return done;
      if (filterStatus === 'pending') return !done;
      return true;
    });
  }, [allItems, completedChallenges, filterStatus]);

  const handleExecuteCode = () => {
    saveCodeDraft(challenge.id, editorCode);
    try {
      const logs: string[] = [];
      const customConsole = {
        log: (...args: unknown[]) =>
          logs.push(
            args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')
          ),
      };
      const runner = new Function('console', editorCode);
      runner(customConsole);
      const actual = logs.join('\n').trim();
      const expected = challenge.expectedOutput.trim();
      const validKeywords = challenge.validationKeywords.every((kw) =>
        editorCode.includes(kw)
      );
      const passed = actual === expected && validKeywords;

      setOutputLog(actual || '(No console output)');
      setStatusPassed(passed);

      if (passed) {
        onMarkChallengeComplete(challenge.id);
        onToast(`Challenge "${challenge.title}" completed!`);
      }
    } catch (err) {
      setOutputLog(`Error: ${err instanceof Error ? err.message : 'Invalid syntax'}`);
      setStatusPassed(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            Interactive Coding Sandbox &amp; Concept Verification
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Practice Arena
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            Write real code in the interactive sandbox, test your logic against expected outputs, and track your completed challenges in LocalStorage.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start">
          {(['all', 'pending', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterStatus(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors whitespace-nowrap ${
                filterStatus === tab
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab} ({tab === 'all' ? allItems.length : tab === 'completed' ? completedChallenges.length : allItems.length - completedChallenges.length})
            </button>
          ))}
        </div>
      </div>

      {/* Two-Zone Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left List of Challenges */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2">
            Select a Coding Challenge
          </div>
          {filteredItems.length === 0 ? (
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
              No challenges match the selected filter.
            </div>
          ) : (
            filteredItems.map(({ course, lesson }) => {
              const ch = lesson.tenPoints.practice.codingChallenge;
              const isSelected = lesson.id === activeEntry.lesson.id;
              const isSolved = completedChallenges.includes(ch.id);
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-500/10 dark:bg-cyan-950/30'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] hover:border-cyan-500/40'
                  }`}
                >
                  <div className="min-w-0 space-y-1">
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {course.shortName} · {course.difficulty}
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {ch.title}
                    </div>
                  </div>
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 mt-1 ${
                      isSolved ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-700'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Right Interactive Code Editor Stage */}
        <div className="lg:col-span-8 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1322] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">
                {activeEntry.course.name} · Lesson 0{activeEntry.lesson.number}
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {challenge.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onOpenLesson(activeEntry.course.id, activeEntry.lesson.id)}
              className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline whitespace-nowrap"
            >
              Read Full 10-Point Lesson →
            </button>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {challenge.prompt}
          </p>

          {/* Code Editor Box */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span className="font-mono">sandbox-runner.js</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditorCode(challenge.starterCode);
                    setOutputLog('');
                    setStatusPassed(null);
                  }}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-white"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Starter</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSolution((prev) => !prev)}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  {showSolution ? 'Hide Solution' : 'View Solution'}
                </button>
              </div>
            </div>

            <textarea
              value={editorCode}
              onChange={(e) => setEditorCode(e.target.value)}
              rows={9}
              spellCheck={false}
              aria-label="Interactive JavaScript and TypeScript Practice Editor"
              className="w-full p-4 bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none"
            />

            <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-3 flex-wrap">
              <button
                type="button"
                onClick={handleExecuteCode}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap"
              >
                <Play className="w-4 h-4" />
                <span>Run &amp; Check Output</span>
              </button>
              <span className="text-xs font-mono text-slate-400">
                Expected: "{challenge.expectedOutput}"
              </span>
            </div>
          </div>

          {/* Live Console Output */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live Console Output</span>
              </span>
              {statusPassed !== null && (
                <span className={statusPassed ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                  {statusPassed ? '✓ PASSED' : '● NEEDS ADJUSTMENT'}
                </span>
              )}
            </div>
            <pre className="text-emerald-400 whitespace-pre-wrap">
              {outputLog || 'Click "Run & Check Output" to execute your code.'}
            </pre>
          </div>

          {showSolution && (
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 space-y-2 text-xs">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                Hint: {challenge.hint}
              </div>
              <pre className="p-3 rounded-lg bg-slate-950 text-cyan-300 font-mono overflow-x-auto">
                {challenge.solutionCode}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
