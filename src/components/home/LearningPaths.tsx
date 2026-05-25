"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LEARNING_PATHS } from "@/lib/constants";

const getLevelColor = (level: string) => {
  const l = level.toLowerCase();
  if (l.includes("pemula")) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
  if (l.includes("menengah")) return "text-amber-400 bg-amber-400/10 border-amber-400/20";
  return "text-red-400 bg-red-400/10 border-red-400/20";
};

export function LearningPaths() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Pembelajaran terstruktur untuk <span className="gradient-text">setiap tujuan</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            Pilih jalur belajar yang sesuai dengan aspirasi karier Anda dan kuasai keahlian yang dibutuhkan industri.
          </motion.p>
        </div>

        {/* Paths grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEARNING_PATHS.map((path, i) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href="/learn" className="group block h-full">
                <div className="h-full rounded-2xl border border-white/8 bg-zinc-900/50 hover:bg-zinc-900/80 hover:border-white/15 hover:shadow-[0_0_30px_rgba(14,165,233,0.08)] transition-all duration-300 overflow-hidden flex flex-col">
                  {/* Color band - matching Learn page style */}
                  <div className={`h-1 w-full bg-gradient-to-r ${path.color.replace("/20", "")} opacity-60`} />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Icon + title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${path.color} border border-white/10 flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                        {path.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-tight mb-1">
                          {path.title}
                        </h3>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border whitespace-nowrap ${getLevelColor(path.level)}`}>
                          {path.level}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-zinc-400 leading-relaxed mb-6 flex-1">
                      {path.description}
                    </p>

                    {/* Stats - using course count, duration, and calculated XP */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500 mb-6">
                      <span className="flex items-center gap-1">
                        <span>📚</span> {path.courses.length} materi
                      </span>
                      <span className="flex items-center gap-1">
                        <span>⏱</span> {path.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>⚡</span> {path.courses.length * 500} XP
                      </span>
                    </div>

                    {/* CTA Button matching Learn page style */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-xs text-sky-400 font-medium group-hover:text-sky-300 transition-colors flex items-center gap-1">
                        Mulai belajar
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}