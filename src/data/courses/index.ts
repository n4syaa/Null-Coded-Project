import type { CourseData } from "@/types/learning";
import javascript from "./javascript";
import react from "./react";
import python from "./python";

export const ALL_COURSES: CourseData[] = [javascript, react, python];

export const COURSE_MAP: Record<string, CourseData> = {
  javascript,
  react,
  python,
};

export function getCourse(courseId: string): CourseData | undefined {
  return COURSE_MAP[courseId];
}

export function getLesson(courseId: string, lessonId: string) {
  const course = getCourse(courseId);
  if (!course) return null;
  for (const chapter of course.chapters) {
    const lesson = chapter.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, chapter };
  }
  return null;
}

export function getAdjacentLessons(courseId: string, lessonId: string) {
  const course = getCourse(courseId);
  if (!course) return { prev: null, next: null };

  const allLessons = course.chapters.flatMap((ch) =>
    ch.lessons.map((l) => ({ ...l, chapterId: ch.id }))
  );

  const idx = allLessons.findIndex((l) => l.id === lessonId);
  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  };
}

export function getTotalLessons(courseId: string): number {
  const course = getCourse(courseId);
  if (!course) return 0;
  return course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
}

export { javascript, react, python };
