"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { getCourse, getLesson, getAdjacentLessons } from "@/data/courses/index";
import { LearnSidebar } from "@/components/learn/LearnSidebar";
import { LearnTopbar } from "@/components/learn/LearnTopbar";
import { LessonContent } from "@/components/learn/LessonContent";
import { LessonNav } from "@/components/learn/LessonNav";
import { MarkComplete } from "@/components/learn/MarkComplete";
import { useLearningStore } from "@/store/useLearningStore";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ courseId: string; lessonId: string }>;
}

export default function LessonPage({ params }: PageProps) {
  const { courseId, lessonId } = use(params);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isLessonCompleted } = useLearningStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sidebar on ESC
  useEffect(() => {
    if (!sidebarOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [sidebarOpen]);

  const course = getCourse(courseId);
  if (!course) notFound();

  const result = getLesson(courseId, lessonId);
  if (!result) notFound();

  const { lesson, chapter } = result;
  const { prev, next } = getAdjacentLessons(courseId, lessonId);
  const isCompleted = mounted ? isLessonCompleted(courseId, lessonId) : false;

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <LearnSidebar
        course={course}
        activeLessonId={lessonId}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <LearnTopbar course={course} onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-xs text-zinc-500 mb-6 flex-wrap"
            >
              <span>{course.icon}</span>
              <span>{course.title}</span>
              <span className="text-zinc-700">/</span>
              <span className="text-zinc-400">{chapter.title}</span>
              <span className="text-zinc-700">/</span>
              <span className="text-sky-400 font-medium truncate max-w-[140px] sm:max-w-none">
                {lesson.title}
              </span>
            </motion.div>

            {/* Lesson Header */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mb-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0",
                    `bg-gradient-to-br ${course.color}`,
                    "border border-white/10"
                  )}
                >
                  {course.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
                    {lesson.title}
                  </h1>
                  <p className="text-zinc-400 text-sm leading-relaxed">{lesson.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {lesson.duration}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full">
                  ⚡ +{lesson.xp} XP
                </span>
                {isCompleted && (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Selesai
                  </span>
                )}
                <span className="text-xs text-zinc-600 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full capitalize">
                  {course.difficulty}
                </span>
              </div>
            </motion.div>

            <div className="h-px bg-white/5 mb-8" />

            <LessonContent blocks={lesson.content} />

            <div className="mt-12 space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-white/8 bg-zinc-900/40">
                <div>
                  <p className="text-sm font-semibold text-white mb-0.5">
                    Selesai dengan pelajaran ini?
                  </p>
                  <p className="text-xs text-zinc-400">
                    Tandai selesai untuk mendapatkan XP dan lacak kemajuan Anda.
                  </p>
                </div>
                <MarkComplete
                  courseId={courseId}
                  lessonId={lessonId}
                  courseTitle={course.title}
                  xp={lesson.xp}
                />
              </div>
              <LessonNav courseId={courseId} prev={prev} next={next} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
