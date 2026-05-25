"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLearningStore } from "@/store/useLearningStore";
import type { CourseData } from "@/types/learning";

interface LearnTopbarProps {
  course: CourseData;
  onMenuClick?: () => void;
}

const XP_PER_LEVEL = 500;

export function LearnTopbar({ course, onMenuClick }: LearnTopbarProps) {
  const { totalXP, level, getCourseProgress } = useLearningStore();
  const progress = getCourseProgress(course.id);
  const xpInCurrentLevel = totalXP % XP_PER_LEVEL;
  const xpPct = (xpInCurrentLevel / XP_PER_LEVEL) * 100;

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 px-4 h-14 bg-black/80 backdrop-blur-xl border-b border-white/5">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all flex-shrink-0"
        aria-label="Open course menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-glow-sm">
          <span className="text-white font-black text-xs">N</span>
        </div>
        <span className="hidden sm:block text-white font-bold text-sm tracking-tight">
          Null<span className="text-sky-400">Coded</span>
        </span>
      </Link>

      {/* Divider */}
      <span className="hidden sm:block text-zinc-700 text-lg">/</span>

      {/* Course title */}
      <div className="hidden sm:flex items-center gap-2 min-w-0">
        <span className="text-base">{course.icon}</span>
        <span className="text-sm font-medium text-zinc-300 truncate">{course.title}</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Progress % */}
      <div className="hidden md:flex items-center gap-3">
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-xs text-zinc-500">Course progress</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"
              />
            </div>
            <span className="text-xs font-medium text-sky-400 tabular-nums w-8">{progress}%</span>
          </div>
        </div>
      </div>

      {/* XP & Level */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8">
        {/* Level badge */}
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[10px] font-black text-white flex-shrink-0">
            {level}
          </div>
          <div className="hidden sm:block">
            <p className="text-[10px] text-zinc-500 leading-none">Level</p>
            <p className="text-xs font-bold text-white leading-none">{level}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-white/10" />

        {/* XP */}
        <div className="flex items-center gap-1.5">
          <span className="text-amber-400 text-sm">⚡</span>
          <div>
            <p className="text-[10px] text-zinc-500 leading-none hidden sm:block">XP</p>
            <p className="text-xs font-bold text-white leading-none">{totalXP.toLocaleString()}</p>
          </div>
          {/* XP bar */}
          <div className="hidden md:flex items-center gap-1">
            <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${xpPct}%` }}
                transition={{ duration: 0.4 }}
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
