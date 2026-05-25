"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Lesson } from "@/types";

interface LessonCardProps {
  lesson: Lesson;
  index?: number;
}

const typeIcons: Record<string, string> = {
  video: "▶",
  article: "📄",
  quiz: "❓",
  project: "🛠",
};

const typeColors: Record<string, string> = {
  video: "text-sky-400 bg-sky-400/10",
  article: "text-emerald-400 bg-emerald-400/10",
  quiz: "text-amber-400 bg-amber-400/10",
  project: "text-violet-400 bg-violet-400/10",
};

export function LessonCard({ lesson, index = 0 }: LessonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200",
        lesson.locked
          ? "border-zinc-800/50 bg-zinc-900/30 opacity-60 cursor-not-allowed"
          : lesson.completed
          ? "border-emerald-500/20 bg-emerald-500/5 cursor-pointer hover:border-emerald-500/40"
          : "border-zinc-800 bg-zinc-900/50 cursor-pointer hover:border-zinc-700 hover:bg-zinc-800/50"
      )}
    >
      {/* Status indicator */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
          lesson.completed
            ? "bg-emerald-500 text-white"
            : lesson.locked
            ? "bg-zinc-800 text-zinc-600"
            : "bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700"
        )}
      >
        {lesson.completed ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : lesson.locked ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        ) : (
          <span className="text-xs">{index + 1}</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-medium truncate",
            lesson.locked ? "text-zinc-600" : "text-zinc-200"
          )}
        >
          {lesson.title}
        </p>
        <p className="text-xs text-zinc-500 mt-0.5">{lesson.duration}</p>
      </div>

      {/* Type Badge */}
      <div
        className={cn(
          "flex-shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium",
          lesson.locked ? "text-zinc-600 bg-zinc-800/50" : typeColors[lesson.type]
        )}
      >
        <span>{typeIcons[lesson.type]}</span>
        <span className="capitalize hidden sm:inline">{lesson.type}</span>
      </div>
    </motion.div>
  );
}
