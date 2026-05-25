"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/course/ProgressBar";
import Link from "next/link";
import { type Course } from "@/store/useUserStore";

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: "Pemula",
  intermediate: "Menengah",
  advanced: "Mahir",
};

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const difficultyLabel = DIFFICULTY_LABELS[course.difficulty] ?? course.difficulty;

  return (
    <Card
      hover
      className="h-full flex flex-col border-white/5 bg-zinc-900/40 backdrop-blur-sm group"
      padding="none"
    >
      <div className={`h-2 w-full bg-gradient-to-r ${course.color || "from-sky-500 to-blue-600"}`} />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
            {course.icon ?? "📚"}
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-sky-400 bg-sky-400/10 px-2 py-1 rounded">
            {difficultyLabel}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
          {course.title}
        </h3>

        <p className="text-zinc-400 text-sm line-clamp-2 mb-6 flex-1">
          {course.description ?? "Pelajari dasar-dasar hingga konsep mahir dalam kurikulum interaktif ini."}
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>{course.lessons} Materi</span>
            <span>{course.duration}</span>
          </div>

          {course.progress !== undefined && (
            <ProgressBar value={course.progress} size="sm" color="sky" showPercent />
          )}

          <Link href={`/learn/${course.id}`} className="block">
            <Button variant={course.progress ? "outline" : "primary"} fullWidth size="md">
              {course.progress ? "Lanjutkan" : "Mulai Belajar"}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
