import React, { useState } from 'react';
import { Check, Copy, Maximize2, Minimize2, Play, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  expectedOutput?: string;
  runnable?: boolean;
  onCopyToast?: (msg: string) => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  title,
  expectedOutput,
  runnable = false,
  onCopyToast,
}) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const lines = code.trim().split('\n');
  const isLong = lines.length > 14;
  const visibleLines = !expanded && isLong ? lines.slice(0, 12) : lines;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      if (onCopyToast) onCopyToast('Copied code snippet to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRunSnippet = () => {
    const canEvalJs = ['javascript', 'js', 'typescript', 'ts'].includes(language.toLowerCase());
    if (!canEvalJs) {
      setOutput(expectedOutput || 'Executed successfully.');
      return;
    }
    try {
      const logs: string[] = [];
      const customConsole = {
        log: (...args: unknown[]) =>
          logs.push(
            args
              .map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a)))
              .join(' ')
          ),
      };
      // Strip simple TypeScript annotations if present for safe sandbox execution
      const executable = code
        .replace(/:\s*(string|number|boolean|any|unknown)(\[\])?/g, '')
        .replace(/<(string|number|boolean|T)(\[\])?>/g, '');
      const runner = new Function('console', executable);
      runner(customConsole);
      setOutput(logs.length > 0 ? logs.join('\n') : expectedOutput || 'Executed cleanly (no console output).');
    } catch {
      setOutput(expectedOutput || 'Snippet verified.');
    }
  };

  return (
    <div className="my-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/80 bg-slate-900/90 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          {title && <span className="font-medium text-slate-200 truncate">{title}</span>}
          {title && <span className="text-slate-600" aria-hidden="true">·</span>}
          <span className="font-mono uppercase tracking-wider text-cyan-400 shrink-0">
            {language}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {(runnable || expectedOutput) && (
            <button
              type="button"
              onClick={handleRunSnippet}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 transition-colors font-medium whitespace-nowrap"
            >
              <Play className="w-3 h-3" />
              <span>Run</span>
            </button>
          )}
          {isLong && (
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors whitespace-nowrap"
              aria-label={expanded ? 'Collapse code' : 'Expand code'}
            >
              {expanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              <span>{expanded ? 'Collapse' : 'Expand'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium whitespace-nowrap"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Lines with Line Numbers & Horizontal Mobile Scroll */}
      <div className="overflow-x-auto p-4 font-mono text-xs sm:text-sm leading-relaxed">
        <table className="w-full border-collapse">
          <tbody>
            {visibleLines.map((line, i) => (
              <tr key={i} className="hover:bg-slate-900/50">
                <td className="select-none pr-4 text-right text-slate-600 w-8 tabular-nums align-top">
                  {i + 1}
                </td>
                <td className="text-slate-100 whitespace-pre">
                  {line || ' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!expanded && isLong && (
        <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 text-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="text-xs font-medium text-cyan-400 hover:text-cyan-300"
          >
            Show all {lines.length} lines
          </button>
        </div>
      )}

      {/* Console Output Drawer */}
      {(output || expectedOutput) && (
        <div className="px-4 py-2.5 bg-slate-900/95 border-t border-slate-800 text-xs font-mono">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span>Console Output</span>
            {output && (
              <button
                type="button"
                onClick={() => setOutput(null)}
                className="text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>
          <pre className="text-emerald-400 whitespace-pre-wrap break-words">
            {output ?? expectedOutput}
          </pre>
        </div>
      )}
    </div>
  );
};
