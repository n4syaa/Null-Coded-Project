"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLearningStore } from "@/store/useLearningStore";

interface MarkCompleteProps {
  courseId: string;
  lessonId: string;
  courseTitle: string;
  xp?: number;
}

export function MarkComplete({
  courseId,
  lessonId,
  courseTitle,
  xp = 50,
}: MarkCompleteProps) {
  const { isLessonCompleted, completeLesson, getCourseProgress, hasCertificate } =
    useLearningStore();
  const [showCelebration, setShowCelebration] = useState(false);
  const [loading, setLoading] = useState(false);

  const isCompleted = isLessonCompleted(courseId, lessonId);

  const handleMark = async () => {
    if (isCompleted || loading) return;
    setLoading(true);

    // Simulate a tiny delay for UX feel
    await new Promise((r) => setTimeout(r, 400));
    completeLesson(courseId, lessonId, courseTitle);

    setLoading(false);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const progress = getCourseProgress(courseId);
  const gotCert = hasCertificate(courseId);

  return (
    <div className="relative">
      {/* Celebration burst */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: -20 }}
            exit={{ opacity: 0, scale: 0.8, y: -40 }}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 pointer-events-none"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <span className="text-lg">⚡</span>
              <span className="text-sm font-bold text-emerald-300">+{xp} XP</span>
              <span className="text-sm">🎉</span>
            </div>
            {progress === 100 && gotCert && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 mt-1">
                <span>🏆</span>
                <span className="text-xs font-bold text-amber-300">Certificate Unlocked!</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={!isCompleted ? { scale: 1.02 } : {}}
        whileTap={!isCompleted ? { scale: 0.97 } : {}}
        onClick={handleMark}
        disabled={isCompleted || loading}
        className={cn(
          "relative flex items-center gap-3 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 overflow-hidden w-full sm:w-auto",
          isCompleted
            ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 cursor-default"
            : "bg-sky-500 hover:bg-sky-400 text-white border border-sky-400/20 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
        )}
      >
        {/* Shimmer on hover */}
        {!isCompleted && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
        )}

        <AnimatePresence mode="wait" initial={false}>
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </motion.div>
          ) : isCompleted ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Lesson Completed!
            </motion.div>
          ) : (
            <motion.div
              key="mark"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mark as Complete
              <span className="text-xs opacity-75 bg-white/10 px-1.5 py-0.5 rounded-md">+{xp} XP</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
