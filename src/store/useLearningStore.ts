"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CourseProgress, Certificate } from "@/types/learning";
import { getTotalLessons } from "@/data/courses/index";

const XP_PER_LESSON = 50;
const XP_PER_LEVEL = 500;

function calcLevel(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

interface LearningState {
  // Progress tracking
  progress: CourseProgress;
  certificates: Certificate[];
  totalXP: number;
  level: number;

  // Actions
  completeLesson: (courseId: string, lessonId: string, courseTitle: string) => void;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  getCourseProgress: (courseId: string) => number;
  getCompletedCount: (courseId: string) => number;
  hasCertificate: (courseId: string) => boolean;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      progress: {},
      certificates: [],
      totalXP: 0,
      level: 1,

      completeLesson: (courseId, lessonId, courseTitle) => {
        const state = get();

        // Already completed — no double XP
        if (state.isLessonCompleted(courseId, lessonId)) return;

        const newProgress: CourseProgress = {
          ...state.progress,
          [courseId]: {
            ...(state.progress[courseId] ?? {}),
            [lessonId]: true,
          },
        };

        const newXP = state.totalXP + XP_PER_LESSON;
        const newLevel = calcLevel(newXP);

        // Check if course is now 100% complete
        const totalLessons = getTotalLessons(courseId);
        const completedCount = Object.values(newProgress[courseId] ?? {}).filter(Boolean).length;
        const isComplete = totalLessons > 0 && completedCount >= totalLessons;

        let newCertificates = state.certificates;
        if (isComplete && !state.hasCertificate(courseId)) {
          newCertificates = [
            ...state.certificates,
            {
              courseId,
              courseTitle,
              completedAt: new Date().toISOString(),
              id: `cert-${courseId}-${Date.now()}`,
            },
          ];
        }

        set({
          progress: newProgress,
          totalXP: newXP,
          level: newLevel,
          certificates: newCertificates,
        });
      },

      isLessonCompleted: (courseId, lessonId) => {
        return get().progress[courseId]?.[lessonId] === true;
      },

      getCourseProgress: (courseId) => {
        const total = getTotalLessons(courseId);
        if (total === 0) return 0;
        const completed = Object.values(get().progress[courseId] ?? {}).filter(Boolean).length;
        return Math.round((completed / total) * 100);
      },

      getCompletedCount: (courseId) => {
        return Object.values(get().progress[courseId] ?? {}).filter(Boolean).length;
      },

      hasCertificate: (courseId) => {
        return get().certificates.some((c) => c.courseId === courseId);
      },
    }),
    {
      name: "null-coded-learning",
      version: 1,
    }
  )
);
