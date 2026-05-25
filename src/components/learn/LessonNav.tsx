"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LessonData } from "@/types/learning";

interface LessonNavProps {
  courseId: string;
  prev: (LessonData & { chapterId: string }) | null;
  next: (LessonData & { chapterId: string }) | null;
}

export function LessonNav({ courseId, prev, next }: LessonNavProps) {
  return (
    <div className="flex items-center justify-between gap-4 pt-8 border-t border-white/5">
      {/* Previous */}
      <div className="flex-1">
        {prev ? (
          <Link href={`/learn/${courseId}/${prev.id}`}>
            <motion.div
              whileHover={{ x: -3 }}
              className="group flex items-center gap-3 p-4 rounded-2xl border border-white/8 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-white/15 transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-800 group-hover:bg-sky-500/10 border border-zinc-700 group-hover:border-sky-500/30 flex items-center justify-center flex-shrink-0 transition-all">
                <svg className="w-4 h-4 text-zinc-400 group-hover:text-sky-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-zinc-500 mb-0.5">Previous</p>
                <p className="text-sm font-medium text-zinc-200 group-hover:text-white truncate transition-colors">
                  {prev.title}
                </p>
              </div>
            </motion.div>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Next */}
      <div className="flex-1">
        {next ? (
          <Link href={`/learn/${courseId}/${next.id}`}>
            <motion.div
              whileHover={{ x: 3 }}
              className="group flex items-center gap-3 p-4 rounded-2xl border border-white/8 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-sky-500/20 transition-all duration-200 text-right"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs text-zinc-500 mb-0.5">Next lesson</p>
                <p className="text-sm font-medium text-zinc-200 group-hover:text-sky-300 truncate transition-colors">
                  {next.title}
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 group-hover:bg-sky-500/20 group-hover:border-sky-500/40 group-hover:shadow-[0_0_12px_rgba(14,165,233,0.25)] flex items-center justify-center flex-shrink-0 transition-all">
                <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
