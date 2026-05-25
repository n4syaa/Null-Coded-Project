"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ALL_COURSES } from "@/data/courses/index";
import { Footer } from "@/components/layout/Footer";

const DIFFICULTY_STYLES: Record<string, string> = {
  beginner: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  intermediate: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  advanced: "text-red-400 bg-red-400/10 border-red-400/20",
};

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: "Pemula",
  intermediate: "Menengah",
  advanced: "Mahir",
};

export default function LearnIndexPage() {
  return (
    <>
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              {ALL_COURSES.length} materi tersedia
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Mulai{" "}
              <span className="gradient-text">belajar</span> hari ini
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Materi terstruktur dan praktik langsung dengan contoh kode interaktif dan pelacakan
              kemajuan. Pilih materi dan mulai coding.
            </p>
          </motion.div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ALL_COURSES.map((course, index) => {
              const firstLesson = course.chapters[0]?.lessons[0];
              const totalLessons = course.chapters.reduce(
                (sum, ch) => sum + ch.lessons.length,
                0
              );
              const difficultyStyle =
                DIFFICULTY_STYLES[course.difficulty] ?? DIFFICULTY_STYLES.beginner;
              const difficultyLabel =
                DIFFICULTY_LABELS[course.difficulty] ?? course.difficulty;

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <Link
                    href={`/learn/${course.id}/${firstLesson?.id ?? ""}`}
                    className="group block h-full"
                  >
                    <div className="h-full flex flex-col rounded-2xl border border-white/8 bg-zinc-950/60 hover:bg-zinc-900/80 hover:border-sky-500/30 hover:shadow-[0_0_32px_rgba(14,165,233,0.08)] transition-all duration-300 overflow-hidden">
                      {/* Top accent */}
                      <div className={`h-0.5 w-full bg-gradient-to-r ${course.color} opacity-70`} />

                      <div className="p-6 flex flex-col flex-1">
                        {/* Icon + title */}
                        <div className="flex items-start gap-3 mb-4">
                          <div
                            className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${course.color} border border-white/10 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}
                            style={{ width: "52px", height: "52px" }}
                          >
                            {course.icon}
                          </div>
                          <div className="min-w-0">
                            <h2 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors leading-snug mb-1.5">
                              {course.title}
                            </h2>
                            <span
                              className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${difficultyStyle}`}
                            >
                              {difficultyLabel}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-zinc-400 leading-relaxed mb-5 flex-1">
                          {course.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-xs text-zinc-500 mb-5">
                          <span className="flex items-center gap-1.5">
                            <span>📚</span>
                            <span>{totalLessons} materi</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span>⏱</span>
                            <span>{course.estimatedHours}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span>⚡</span>
                            <span>{totalLessons * 50} XP</span>
                          </span>
                        </div>

                        {/* Chapter preview */}
                        <div className="space-y-1.5 mb-5">
                          {course.chapters.slice(0, 3).map((ch) => (
                            <div
                              key={ch.id}
                              className="flex items-center gap-2 text-xs text-zinc-500"
                            >
                              <span className="flex-shrink-0">{ch.icon}</span>
                              <span className="truncate">{ch.title}</span>
                              <span className="text-zinc-700 flex-shrink-0">
                                · {ch.lessons.length} materi
                              </span>
                            </div>
                          ))}
                          {course.chapters.length > 3 && (
                            <p className="text-xs text-zinc-600 pl-5">
                              +{course.chapters.length - 3} bab lainnya
                            </p>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                          <span className="text-xs text-sky-400 font-medium group-hover:text-sky-300 transition-colors flex items-center gap-1">
                            Mulai belajar
                            <svg
                              className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Gratis
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
