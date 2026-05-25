"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Flame,
  Zap,
  Trophy,
  Play,
  BarChart3,
  Lock,
  Code,
} from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProgressBar } from "@/components/course/ProgressBar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useUserStore, type Course } from "@/store/useUserStore";
import Link from "next/link";

// ─── Types ──────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  color?: "sky" | "emerald" | "violet" | "amber";
}

const COLOR_MAP = {
  sky: "bg-sky-500/10 border-sky-500/20 text-sky-400",
  emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  violet: "bg-violet-500/10 border-violet-500/20 text-violet-400",
  amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
};

function StatCard({ icon, label, value, subtext, color = "sky" }: StatCardProps) {
  return (
    <Card padding="md" className="flex items-start gap-4">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border ${COLOR_MAP[color]}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-zinc-400">{label}</p>
        {subtext && <p className="text-xs text-zinc-600 mt-0.5">{subtext}</p>}
      </div>
    </Card>
  );
}

const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  "Web Development": <Code className="w-5 h-5" />,
  "Data Science": <BarChart3 className="w-5 h-5" />,
  "AI & ML": <Zap className="w-5 h-5" />,
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

// ─── Activity icon map ───────────────────────────────────────────────────────

function ActivityIcon({ type }: { type: string }) {
  const base = "w-4 h-4";
  if (type === "lesson") return <BookOpen className={base} />;
  if (type === "badge") return <Trophy className={base} />;
  if (type === "quiz") return <Zap className={base} />;
  return <Flame className={base} />;
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { currentUser: user, enrolledCourses, recentActivity, isAuthenticated, hasHydrated } =
    useUserStore();

  if (!hasHydrated || !isAuthenticated || !user) return null;

  const myCourses = enrolledCourses ?? [];
  const progressColors: Array<"sky" | "emerald" | "violet"> = ["sky", "emerald", "violet"];
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex h-screen pt-16 overflow-hidden">
      <Sidebar className="hidden md:flex w-60 flex-shrink-0" />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Header */}
          <motion.div {...fadeUp(0)} className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                Selamat datang kembali,{" "}
                <span className="text-sky-400">{user.name.split(" ")[0]}</span>
              </h1>
              <p className="text-zinc-400 text-sm flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                Streak{" "}
                <span className="text-sky-400 font-medium">{user.streak ?? 0} hari</span>.{" "}
                Pertahankan!
              </p>
            </div>
            <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 items-center justify-center text-white font-bold text-lg shadow-glow">
              {initials}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            {...fadeUp(0.1)}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8"
          >
            <StatCard
              icon={<BookOpen />}
              label="Materi Diikuti"
              value={user.coursesEnrolled ?? 0}
              color="sky"
            />
            <StatCard
              icon={<CheckCircle />}
              label="Selesai"
              value={user.coursesCompleted ?? 0}
              color="emerald"
            />
            <StatCard
              icon={<Clock />}
              label="Jam Belajar"
              value={`${user.totalHours ?? 0}j`}
              color="violet"
            />
            <StatCard
              icon={<Flame />}
              label="Streak Hari"
              value={user.streak ?? 0}
              subtext="Terbaik: 21 hari"
              color="amber"
            />
          </motion.div>

          {/* XP Bar */}
          <motion.div {...fadeUp(0.2)} className="mb-8">
            <Card padding="md">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-glow">
                  {user.level ?? 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-sky-400" />
                      Level {user.level ?? 1}
                    </span>
                    <span className="text-xs text-zinc-400">{user.xp ?? 0} / 4000 XP</span>
                  </div>
                  <ProgressBar
                    value={user.xp ?? 0}
                    max={4000}
                    size="sm"
                    showPercent={false}
                    color="sky"
                  />
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-zinc-500">Level berikutnya</p>
                  <p className="text-sm font-medium text-zinc-300">Level {(user.level ?? 1) + 1}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Continue Learning */}
            <motion.div {...fadeUp(0.3)} className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Play className="w-5 h-5 text-sky-400" />
                  Lanjutkan Belajar
                </h2>
                <Link href="/learn">
                  <Button variant="ghost" size="sm">
                    Jelajahi semua
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {myCourses.map((course: Course, i: number) => (
                  <Card key={course.id} padding="md" hover className="group">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white flex-shrink-0`}
                      >
                        {CATEGORY_ICON_MAP[course.category] ?? <BookOpen className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white text-sm mb-1 group-hover:text-sky-300 transition-colors truncate">
                          {course.title}
                        </h3>
                        <p className="text-xs text-zinc-500 mb-3">
                          {course.lessons} materi • {course.duration}
                        </p>
                        <ProgressBar
                          value={course.progress ?? (i === 0 ? 68 : i === 1 ? 34 : 12)}
                          size="sm"
                          showPercent
                          color={progressColors[i % 3]}
                        />
                      </div>
                      <Link href="/learn">
                        <Button variant="ghost" size="sm" className="flex-shrink-0">
                          Lanjut
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}

                {myCourses.length === 0 && (
                  <Card padding="lg" className="text-center">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-6 h-6 text-sky-400" />
                    </div>
                    <p className="text-white font-medium mb-1">Belum ada materi</p>
                    <p className="text-zinc-400 text-sm mb-4">Mulai belajar hari ini!</p>
                    <Link href="/learn">
                      <Button variant="primary" size="sm">
                        Jelajahi materi
                      </Button>
                    </Link>
                  </Card>
                )}
              </div>
            </motion.div>

            {/* Right column */}
            <motion.div {...fadeUp(0.4)} className="space-y-6">

              {/* Badges */}
              <div>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  Pencapaian
                </h2>
                <Card padding="md">
                  <div className="grid grid-cols-3 gap-3">
                    {user.badges.map((badge) => (
                      <div
                        key={badge.id}
                        className="flex flex-col items-center gap-1 p-2 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors cursor-default"
                        title={badge.description}
                      >
                        <div className="w-8 h-8 flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-amber-400" />
                        </div>
                        <span className="text-xs text-zinc-400 text-center leading-tight">
                          {badge.name}
                        </span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-zinc-900/50 border border-dashed border-zinc-800">
                      <div className="w-8 h-8 flex items-center justify-center opacity-30">
                        <Lock className="w-5 h-5 text-zinc-400" />
                      </div>
                      <span className="text-xs text-zinc-600 text-center">Terkunci</span>
                    </div>
                  </div>
                  {user.badges.length === 0 && (
                    <p className="text-xs text-zinc-600 text-center mt-2">
                      Selesaikan pelajaran untuk mendapatkan badge
                    </p>
                  )}
                </Card>
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  Aktivitas Terbaru
                </h2>
                <Card padding="md">
                  <div className="space-y-3">
                    {recentActivity.slice(0, 5).map((activity) => {
                      const diff = Math.round(
                        (Date.now() - new Date(activity.timestamp).getTime()) / 60000
                      );
                      const timeAgo =
                        diff < 60 ? `${diff}mnt lalu` : `${Math.round(diff / 60)}jam lalu`;

                      return (
                        <div key={activity.id} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center text-zinc-400 flex-shrink-0">
                            <ActivityIcon type={activity.type} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-zinc-300 truncate">{activity.title}</p>
                            <p className="text-xs text-zinc-600 mt-0.5">{timeAgo}</p>
                          </div>
                        </div>
                      );
                    })}

                    {recentActivity.length === 0 && (
                      <div className="text-center py-4">
                        <BarChart3 className="w-6 h-6 text-zinc-700 mx-auto mb-2" />
                        <p className="text-xs text-zinc-600">Belum ada aktivitas</p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
