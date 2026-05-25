"use client";

import { motion } from "framer-motion";
import { cn, getDifficultyColor } from "@/lib/utils";
import type { Course } from "@/types";
import { ProgressBar } from "./ProgressBar";
import { Button } from "@/components/ui/Button";

interface CourseCardProps {
  course: Course;
  variant?: "default" | "featured" | "compact";
  index?: number;
}

const difficultyLabels: Record<string, string> = {
  beginner: "Pemula",
  intermediate: "Menengah",
  advanced: "Mahir",
};

const categoryIcons: Record<string, string> = {
  "Web Development": "🌐",
  "Data Science": "📊",
  "Mobile Dev": "📱",
  DevOps: "🔧",
  "AI & ML": "🤖",
  Cybersecurity: "🛡️",
};

export function CourseCard({ course, variant = "default", index = 0 }: CourseCardProps) {
  const emoji = categoryIcons[course.category] ?? "📚";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/50 overflow-hidden",
        "transition-all duration-300 hover:border-zinc-700/80 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
        variant === "featured" && "ring-1 ring-sky-500/20"
      )}
    >
      <div className={cn("h-36 relative overflow-hidden", `bg-gradient-to-br ${course.color}`)}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl opacity-40 group-hover:opacity-60 transition-opacity duration-300">
            {emoji}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <span
            className={cn(
              "text-xs font-medium px-2.5 py-1 rounded-full border",
              getDifficultyColor(course.difficulty)
            )}
          >
            {difficultyLabels[course.difficulty] ?? course.difficulty}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <span className="text-xs text-zinc-500 font-medium uppercase tracking-wide">
            {course.category}
          </span>
          <h3 className="font-semibold text-white text-base leading-snug group-hover:text-sky-300 transition-colors line-clamp-2 mt-1">
            {course.title}
          </h3>
        </div>

        <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">{course.description}</p>

        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <span className="text-amber-400">★</span>
            <span className="text-zinc-300 font-medium">{course.rating}</span>
          </span>
          <span>•</span>
          <span>{course.duration}</span>
        </div>

        {course.tags && course.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 pt-1 mt-auto">
          <Button variant="primary" size="sm" fullWidth>
            Mulai Belajar
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
