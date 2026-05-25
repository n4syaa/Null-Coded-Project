"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CodeBlock as CodeBlockType } from "@/types/learning";

interface CodeBlockProps {
  code: CodeBlockType;
  showPlayground?: boolean;
  onTryIt?: () => void;
}

const LANGUAGE_COLORS: Record<string, string> = {
  javascript: "text-yellow-400",
  js: "text-yellow-400",
  typescript: "text-blue-400",
  ts: "text-blue-400",
  tsx: "text-cyan-400",
  jsx: "text-cyan-400",
  python: "text-emerald-400",
  html: "text-orange-400",
  css: "text-pink-400",
  bash: "text-zinc-400",
  json: "text-amber-400",
};

const LANGUAGE_LABELS: Record<string, string> = {
  javascript: "JavaScript",
  js: "JavaScript",
  typescript: "TypeScript",
  ts: "TypeScript",
  tsx: "TypeScript JSX",
  jsx: "JavaScript JSX",
  python: "Python",
  html: "HTML",
  css: "CSS",
  bash: "Terminal",
  json: "JSON",
};

function syntaxHighlight(code: string, language: string): string {
  let result = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  if (language === "python") {
    result = result
      .replace(/(#[^\n]*)/g, '<span class="text-zinc-500 italic">$1</span>')
      .replace(/\b(def|class|return|if|elif|else|for|while|in|not|and|or|import|from|as|with|try|except|finally|raise|pass|break|continue|lambda|yield|async|await|True|False|None)\b/g,
        '<span class="text-violet-400 font-medium">$1</span>')
      .replace(/\b(print|len|range|type|int|str|float|list|dict|set|tuple|bool|input|open|enumerate|zip|map|filter|sorted|reversed)\b/g,
        '<span class="text-sky-400">$1</span>')
      .replace(/(@\w+)/g, '<span class="text-amber-400">$1</span>')
      .replace(/("""[\s\S]*?"""|\'\'\'[\s\S]*?\'\'\'|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/g,
        '<span class="text-amber-300">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-orange-400">$1</span>');
  } else {
    result = result
      .replace(/(\/\/[^\n]*)/g, '<span class="text-zinc-500 italic">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-zinc-500 italic">$1</span>')
      .replace(/\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|delete|typeof|instanceof|void|throw|try|catch|finally|class|extends|super|import|export|default|from|async|await|yield|of|in|this|true|false|null|undefined|type|interface|enum|namespace)\b/g,
        '<span class="text-violet-400 font-medium">$1</span>')
      .replace(/\b(console|window|document|Math|Array|Object|Promise|fetch|setTimeout|setInterval|JSON|localStorage)\b/g,
        '<span class="text-sky-400">$1</span>')
      .replace(/(`[^`]*`)/g, '<span class="text-amber-300">$1</span>')
      .replace(/(?<!`)(["'])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="text-amber-300">$1$2$3</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-orange-400">$1</span>')
      .replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, '<span class="text-cyan-300">$1</span>');
  }

  return result;
}

export function CodeBlock({ code, onTryIt }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlighted = syntaxHighlight(code.code, code.language);
  const colorClass = LANGUAGE_COLORS[code.language] ?? "text-zinc-400";
  const label = LANGUAGE_LABELS[code.language] ?? code.language;

  const lines = code.code.split("\n");

  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_8px_32px_rgba(0,0,0,0.5)]">
      {/* Header bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900/80 border-b border-white/5">
        {/* Traffic lights */}
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-amber-500/60" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
        </div>

        {/* Filename */}
        {code.filename && (
          <span className="text-xs text-zinc-400 font-mono bg-zinc-800/60 px-2 py-0.5 rounded-md border border-white/5">
            {code.filename}
          </span>
        )}

        {/* Language badge */}
        <span className={cn("text-xs font-semibold font-mono ml-auto", colorClass)}>
          {label}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {onTryIt && (
            <button
              onClick={onTryIt}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-sky-400 bg-sky-400/10 border border-sky-400/20 hover:bg-sky-400/20 transition-all"
            >
              <span>▶</span>
              <span className="hidden sm:inline">Try It</span>
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all border"
            style={{
              color: copied ? "rgb(74, 222, 128)" : "rgb(161, 161, 170)",
              background: copied ? "rgba(74, 222, 128, 0.08)" : "rgba(255,255,255,0.04)",
              borderColor: copied ? "rgba(74, 222, 128, 0.2)" : "rgba(255,255,255,0.08)",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Code area */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-mono leading-relaxed">
          <tbody>
            {highlighted.split("\n").map((line, i) => (
              <tr
                key={i}
                className={cn(
                  "hover:bg-white/[0.02] transition-colors",
                  code.highlight?.includes(i + 1) && "bg-sky-500/10 border-l-2 border-sky-500"
                )}
              >
                <td className="select-none text-right pr-4 pl-4 py-0 text-zinc-700 text-xs w-10 align-top pt-[3px]">
                  {i + 1}
                </td>
                <td
                  className="pr-6 pl-2 py-[2px] text-zinc-300 whitespace-pre align-top"
                  dangerouslySetInnerHTML={{ __html: line || " " }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
