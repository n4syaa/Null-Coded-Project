export interface CodeBlock {
  language: string;
  code: string;
  filename?: string;
  highlight?: number[];
}

export interface ContentBlock {
  type:
    | "paragraph"
    | "heading"
    | "subheading"
    | "code"
    | "note"
    | "warning"
    | "tip"
    | "list"
    | "ordered-list"
    | "divider"
    | "playground";
  content?: string;
  items?: string[];
  code?: CodeBlock;
  playground?: PlaygroundConfig;
}

export interface PlaygroundConfig {
  html: string;
  css: string;
  js: string;
}

export interface LessonData {
  id: string;
  title: string;
  description: string;
  duration: string;
  xp: number;
  content: ContentBlock[];
}

export interface Chapter {
  id: string;
  title: string;
  icon: string;
  lessons: LessonData[];
}

export interface CourseData {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  totalLessons: number;
  estimatedHours: string;
  chapters: Chapter[];
}

export interface LessonProgress {
  [lessonId: string]: boolean;
}

export interface CourseProgress {
  [courseId: string]: LessonProgress;
}

export interface Certificate {
  courseId: string;
  courseTitle: string;
  completedAt: string;
  id: string;
}
