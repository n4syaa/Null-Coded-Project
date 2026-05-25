export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  instructor: string;
  tags: string[];
  image: string;
  color: string;
  progress?: number;
  featured?: boolean;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  type: "video" | "article" | "quiz" | "project";
  completed?: boolean;
  locked?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: string;
  coursesEnrolled: number;
  coursesCompleted: number;
  totalHours: number;
  streak: number;
  level: number;
  xp: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: string[];
  duration: string;
  level: string;
  icon: string;
  color: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
}
