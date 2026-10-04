import React, { useEffect, useState } from 'react';
import { CheckCircle2, Code2, HelpCircle, ListChecks, Play, RotateCcw } from 'lucide-react';
import { LessonTenPointSystem } from '../types/edu';
import { getCodeDraft, saveCodeDraft } from '../lib/storage';

interface PracticeLabSectionProps {
  lessonId: string;
  practice: LessonTenPointSystem['practice'];
  isChallengeDone: boolean;
  onMarkChallengeComplete: (challengeId: string) => void;
  onToast: (msg: string) => void;
}

export const PracticeLabSection: React.FC<PracticeLabSectionProps> = ({
  lessonId,
  practice,
  isChallengeDone,
  onMarkChallengeComplete,
  onToast,
}) => {
  const [selectedMcqOption, setSelectedMcqOption] = useState<number | null>(null);
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [shortAnswerInput, setShortAnswerInput] = useState('');
  const [shortAnswerChecked, setShortAnswerChecked] = useState(false);
  const [challengeCode, setChallengeCode] = useState('');
  const [challengeResult, setChallengeResult] = useState<{
    passed: boolean;
    output: string;
  } | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    setSelectedMcqOption(null);
    setMcqSubmitted(false);
    setShortAnswerInput('');
    setShortAnswerChecked(false);
    setChallengeCode(
      getCodeDraft(practice.codingChallenge.id, practice.codingChallenge.starterCode)
    );
    setChallengeResult(null);
    setShowSolution(false);
  }, [lessonId, practice.codingChallenge.id, practice.codingChallenge.starterCode]);

  const handleRunChallenge = () => {
    saveCodeDraft(practice.codingChallenge.id, challengeCode);
    try {
      const logs: string[] = [];
      const customConsole = {
        log: (...args: unknown[]) =>
          logs.push(
            args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')
          ),
      };
      const runner = new Function('console', challengeCode);
      runner(customConsole);
      const actualOutput = logs.join('\n').trim();
      const expected = practice.codingChallenge.expectedOutput.trim();
      const hasKeywords = practice.codingChallenge.validationKeywords.every((kw) =>
        challengeCode.includes(kw)
      );
      const passed = actualOutput === expected && hasKeywords;

      setChallengeResult({
        passed,
        output: actualOutput || '(No console.log output produced)',
      });

      if (passed) {
        onMarkChallengeComplete(practice.codingChallenge.id);
        onToast('Coding challenge verified & saved to My Learning!');
      }
    } catch (err) {
      setChallengeResult({
        passed: false,
        output: `Execution Error: ${err instanceof Error ? err.message : 'Syntax error'}`,
      });
    }
  };

  return (
    <section className="p-6 rounded-2xl border border-cyan-500/40 bg-white dark:bg-[#0d1322] space-y-6">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
          10. Hands-On Practice &amp; Challenge Lab
        </h2>
        {isChallengeDone && (
          <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Challenge Completed</span>
          </span>
        )}
      </div>

      {/* Part A: MCQ */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4" />
          <span>Part A · Multiple-Choice Concept Check</span>
        </div>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {practice.mcq.question}
        </p>
        <div className="space-y-2">
          {practice.mcq.options.map((option, idx) => {
            const isSelected = selectedMcqOption === idx;
            const isCorrect = idx === practice.mcq.correctIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedMcqOption(idx);
                  setMcqSubmitted(true);
                }}
                className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-colors ${
                  mcqSubmitted && isSelected
                    ? isCorrect
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold'
                      : 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
        {mcqSubmitted && selectedMcqOption !== null && (
          <p
            className={`text-xs sm:text-sm font-medium ${
              selectedMcqOption === practice.mcq.correctIndex
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {selectedMcqOption === practice.mcq.correctIndex ? '✓ Correct! ' : '✗ Not quite. '}
            {practice.mcq.explanation}
          </p>
        )}
      </div>

      {/* Part B: Short Answer */}
      <div className="pt-5 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
          <ListChecks className="w-4 h-4" />
          <span>Part B · Short Answer Reflection</span>
        </div>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {practice.shortAnswer.question}
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={shortAnswerInput}
            onChange={(e) => setShortAnswerInput(e.target.value)}
            placeholder="Write a brief 1-sentence technical explanation..."
            className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="button"
            onClick={() => setShortAnswerChecked(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold whitespace-nowrap"
          >
            Compare Answer
          </button>
        </div>
        {shortAnswerChecked && (
          <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold text-cyan-600 dark:text-cyan-400">
              Reference Answer:{' '}
            </span>
            {practice.shortAnswer.sampleAnswer}
          </div>
        )}
      </div>

      {/* Part C: Interactive Coding Challenge */}
      <div className="pt-5 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
            <Code2 className="w-4 h-4" />
            <span>Part C · Live Coding Challenge — {practice.codingChallenge.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setChallengeCode(practice.codingChallenge.starterCode);
                setChallengeResult(null);
              }}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
            <button
              type="button"
              onClick={() => setShowSolution((prev) => !prev)}
              className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              {showSolution ? 'Hide Solution' : 'Show Hint / Solution'}
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300">
          {practice.codingChallenge.prompt}
        </p>

        <textarea
          value={challengeCode}
          onChange={(e) => setChallengeCode(e.target.value)}
          rows={7}
          spellCheck={false}
          aria-label="Coding challenge editor"
          className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-cyan-500"
        />

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleRunChallenge}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap"
          >
            <Play className="w-4 h-4" />
            <span>Run &amp; Verify Code</span>
          </button>
          <span className="text-xs text-slate-500 font-mono">
            Expected Output: "{practice.codingChallenge.expectedOutput}"
          </span>
        </div>

        {challengeResult && (
          <div
            className={`p-4 rounded-xl border font-mono text-xs ${
              challengeResult.passed
                ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
                : 'border-amber-500/40 bg-amber-950/30 text-amber-300'
            }`}
          >
            <div className="font-sans font-bold mb-1">
              {challengeResult.passed
                ? '✓ Challenge Passed! Saved to your completed challenges.'
                : '⚠ Output did not match expected result yet:'}
            </div>
            <div>Actual Output: {challengeResult.output}</div>
          </div>
        )}

        {showSolution && (
          <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 space-y-2 text-xs">
            <div className="font-semibold text-slate-800 dark:text-slate-200">
              Hint: {practice.codingChallenge.hint}
            </div>
            <pre className="p-3 rounded-lg bg-slate-950 text-cyan-300 font-mono overflow-x-auto">
              {practice.codingChallenge.solutionCode}
            </pre>
          </div>
        )}
      </div>

      {/* Mini Task & Concept Check */}
      <div className="pt-5 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 space-y-1">
          <div className="font-semibold text-slate-900 dark:text-white">
            Mini Engineering Task
          </div>
          <p className="text-slate-600 dark:text-slate-300">{practice.miniTask}</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 space-y-1">
          <div className="font-semibold text-slate-900 dark:text-white">
            Concept Check Summary
          </div>
          <p className="text-slate-600 dark:text-slate-300">{practice.conceptCheck}</p>
        </div>
      </div>
    </section>
  );
};
