"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PlaygroundConfig } from "@/types/learning";

interface LivePlaygroundProps {
  initial: PlaygroundConfig;
}

type Tab = "html" | "css" | "js";

const TAB_COLORS: Record<Tab, string> = {
  html: "text-orange-400",
  css: "text-pink-400",
  js: "text-yellow-400",
};

export function LivePlayground({ initial }: LivePlaygroundProps) {
  const [code, setCode] = useState<PlaygroundConfig>(initial);
  const [activeTab, setActiveTab] = useState<Tab>("html");
  const [showPreview, setShowPreview] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const runTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const buildSrc = useCallback((c: PlaygroundConfig) => {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, sans-serif; }
  ${c.css}
</style>
</head>
<body>
${c.html}
<script>
try {
  ${c.js}
} catch(e) {
  document.body.innerHTML += '<div style="color:red;font-family:monospace;padding:12px;background:#1a0000;border:1px solid red;border-radius:4px;margin:8px">Error: ' + e.message + '</div>';
}
</script>
</body>
</html>`;
  }, []);

  const runCode = useCallback(() => {
    setIsRunning(true);
    if (iframeRef.current) {
      iframeRef.current.srcdoc = buildSrc(code);
    }
    setTimeout(() => setIsRunning(false), 500);
  }, [code, buildSrc]);

  // Auto-run on mount
  useEffect(() => {
    runCode();
  }, []);

  // Debounced auto-run on code change
  useEffect(() => {
    clearTimeout(runTimerRef.current);
    runTimerRef.current = setTimeout(runCode, 800);
    return () => clearTimeout(runTimerRef.current);
  }, [code, runCode]);

  const reset = () => setCode(initial);

  const currentCode = code[activeTab];
  const setCurrentCode = (val: string) =>
    setCode((prev) => ({ ...prev, [activeTab]: val }));

  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-zinc-950 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-white">Live Playground</span>
        </div>
        <div className="flex gap-1 ml-3">
          {(["html", "css", "js"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all",
                activeTab === tab
                  ? cn("bg-white/10", TAB_COLORS[tab])
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={reset}
            className="px-2 py-1 rounded-lg text-xs text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all"
            title="Reset to default"
          >
            ↺ Reset
          </button>
          <button
            onClick={() => setShowPreview((v) => !v)}
            className="px-2 py-1 rounded-lg text-xs text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-all"
          >
            {showPreview ? "Hide" : "Show"} Preview
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-sky-400 bg-sky-400/10 border border-sky-400/20 hover:bg-sky-400/20 transition-all disabled:opacity-50"
          >
            {isRunning ? (
              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <span>▶</span>
            )}
            Run
          </button>
        </div>
      </div>

      <div className={cn("grid", showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1")}>
        {/* Editor */}
        <div className="relative border-r border-white/5">
          <textarea
            value={currentCode}
            onChange={(e) => setCurrentCode(e.target.value)}
            spellCheck={false}
            className={cn(
              "w-full h-64 p-4 bg-transparent text-sm font-mono text-zinc-300 resize-none",
              "focus:outline-none focus:ring-0 leading-relaxed",
              "placeholder:text-zinc-700"
            )}
            style={{ tabSize: 2 }}
            placeholder={`Write your ${activeTab.toUpperCase()} here...`}
          />
          <div className="absolute bottom-2 right-3 text-[10px] text-zinc-700 font-mono">
            {currentCode.split("\n").length} lines
          </div>
        </div>

        {/* Preview */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="relative bg-white overflow-hidden"
              style={{ minHeight: 256 }}
            >
              <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-white/70 font-mono">preview</span>
              </div>
              <iframe
                ref={iframeRef}
                title="code-preview"
                sandbox="allow-scripts"
                className="w-full h-64 border-0"
                style={{ backgroundColor: "white" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
