"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CourseData } from "@/types/learning";
import { useLearningStore } from "@/store/useLearningStore";

interface LearnSidebarProps {
  course: CourseData;
  activeLessonId: string;
  isOpen?: boolean;
  onClose?: () => void;
}

function ProgressRing({ value }: { value: number }) {
  const r = 10;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg className="w-7 h-7 -rotate-90" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
      <circle
        cx="14"
        cy="14"
        r={r}
        fill="none"
        stroke="#38bdf8"
        strokeWidth="3"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-700"
      />
    </svg>
  );
}

export function LearnSidebar({ course, activeLessonId, isOpen = true, onClose }: LearnSidebarProps) {
  const { isLessonCompleted, getCourseProgress, getCompletedCount } = useLearningStore();
  const [collapsedChapters, setCollapsedChapters] = useState<Set<string>>(new Set());
  const activeLessonRef = useRef<HTMLAnchorElement>(null);

  const progress = getCourseProgress(course.id);
  const completedCount = getCompletedCount(course.id);
  const totalLessons = course.chapters.reduce((s, c) => s + c.lessons.length, 0);

  useEffect(() => {
    activeLessonRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeLessonId]);

  const toggleChapter = (chapterId: string) => {
    setCollapsedChapters((prev) => {
      const next = new Set(prev);
      next.has(chapterId) ? next.delete(chapterId) : next.add(chapterId);
      return next;
    });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Course header */}
      <div className="p-4 border-b border-white/5 flex-shrink-0">
        <Link
          href="/learn"
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-3 group"
          onClick={onClose}
        >
          <svg
            className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Semua materi
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <div
            className={cn(
              "w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-lg flex-shrink-0",
              course.color
            )}
          >
            {course.icon}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate">{course.title}</p>
            <p className="text-xs text-zinc-500">
              {completedCount}/{totalLessons} pelajaran
            </p>
          </div>
          <ProgressRing value={progress} />
        </div>

        <div className="space-y-1">
          <div className="h-1 w-full bg-zinc-800/80 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full shadow-[0_0_8px_rgba(14,165,233,0.4)]"
            />
          </div>
          <p className="text-xs text-sky-400">{progress}% selesai</p>
        </div>
      </div>

      {/* Chapter & Lesson List */}
      <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
        {course.chapters.map((chapter, chIdx) => {
          const isCollapsed = collapsedChapters.has(chapter.id);
          const chapterCompleted = chapter.lessons.every((l) =>
            isLessonCompleted(course.id, l.id)
          );
          const chapterPartial = chapter.lessons.some((l) =>
            isLessonCompleted(course.id, l.id)
          );

          return (
            <div key={chapter.id} className="mb-0.5">
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left hover:bg-white/3 transition-colors group"
                aria-expanded={!isCollapsed}
              >
                <span className="text-sm flex-shrink-0">{chapter.icon}</span>
                <span className="flex-1 text-[11px] font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors uppercase tracking-wider truncate">
                  {chapter.title}
                </span>
                {chapterCompleted ? (
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                ) : chapterPartial ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />
                ) : null}
                <svg
                  className={cn(
                    "w-3 h-3 text-zinc-600 flex-shrink-0 transition-transform duration-200",
                    isCollapsed && "-rotate-90"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    {chapter.lessons.map((lesson, lIdx) => {
                      const isActive = lesson.id === activeLessonId;
                      const isDone = isLessonCompleted(course.id, lesson.id);
                      const lessonNum = chIdx * 10 + lIdx + 1;

                      return (
                        <Link
                          key={lesson.id}
                          href={`/learn/${course.id}/${lesson.id}`}
                          ref={isActive ? activeLessonRef : null}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-3 px-4 py-2.5 pl-10 relative transition-all duration-200 group/lesson",
                            isActive
                              ? "bg-sky-500/10 text-sky-300"
                              : "text-zinc-400 hover:text-zinc-200 hover:bg-white/3"
                          )}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="active-lesson-indicator"
                              className="absolute left-0 top-0 bottom-0 w-0.5 bg-sky-400 rounded-r-full shadow-[0_0_6px_rgba(56,189,248,0.8)]"
                            />
                          )}

                          <div
                            className={cn(
                              "w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center transition-all",
                              isDone
                                ? "border-emerald-500/50 bg-emerald-500/20"
                                : isActive
                                ? "border-sky-500/50 bg-sky-500/10"
                                : "border-zinc-700 bg-zinc-900 group-hover/lesson:border-zinc-600"
                            )}
                          >
                            {isDone ? (
                              <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : isActive ? (
                              <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                            ) : (
                              <span className="text-[9px] text-zinc-600 font-mono">{lessonNum}</span>
                            )}
                          </div>

                          <span
                            className={cn(
                              "text-xs flex-1 truncate leading-relaxed",
                              isActive && "font-medium text-sky-300"
                            )}
                          >
                            {lesson.title}
                          </span>
                          <span className="text-[10px] text-zinc-600 flex-shrink-0 ml-1">
                            {lesson.duration}
                          </span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0 h-screen sticky top-0 bg-zinc-950/90 border-r border-white/5 backdrop-blur-sm overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-zinc-950 border-r border-white/5 z-50 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 flex-shrink-0">
                <span className="text-sm font-semibold text-white">Daftar Materi</span>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                  aria-label="Tutup sidebar"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
