import type { Course } from "@/types";

export const COURSES: Course[] = [
  {
    id: "1",
    title: "Modern JavaScript Mastery",
    description: "Deep dive into ES2024, async patterns, closures, prototypes, and everything you need to master JS.",
    category: "Web Development",
    difficulty: "intermediate",
    duration: "24h",
    lessons: 96,
    students: 48320,
    rating: 4.9,
    instructor: "Nasya Rivera",
    tags: ["JavaScript", "ES2024", "Async", "DOM"],
    image: "/images/js-course.jpg",
    color: "from-yellow-500/20 to-orange-500/20",
    progress: 68,
  },
  {
    id: "2",
    title: "React & Next.js Complete Guide",
    description: "Build production-ready web apps with React 19 and Next.js 15 App Router.",
    category: "Web Development",
    difficulty: "intermediate",
    duration: "32h",
    lessons: 128,
    students: 61740,
    rating: 4.8,
    instructor: "Sarah Chen",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    image: "/images/react-course.jpg",
    color: "from-cyan-500/20 to-blue-500/20",
    progress: 34,
  },
  {
    id: "3",
    title: "Python for Data Science",
    description: "Master NumPy, Pandas, Matplotlib, and Scikit-learn to analyze and visualize data like a pro.",
    category: "Data Science",
    difficulty: "beginner",
    duration: "28h",
    lessons: 112,
    students: 52100,
    rating: 4.7,
    instructor: "Marcus Johnson",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib"],
    image: "/images/python-course.jpg",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: "4",
    title: "TypeScript Deep Dive",
    description: "Advanced TypeScript patterns, generics, utility types, and type-safe application architecture.",
    category: "Web Development",
    difficulty: "advanced",
    duration: "18h",
    lessons: 72,
    students: 29800,
    rating: 4.9,
    instructor: "Elena Kozlov",
    tags: ["TypeScript", "Generics", "Types", "Patterns"],
    image: "/images/ts-course.jpg",
    color: "from-blue-600/20 to-indigo-500/20",
  },
  {
    id: "5",
    title: "Machine Learning Fundamentals",
    description: "Supervised and unsupervised learning, neural networks, and model deployment with real projects.",
    category: "AI & ML",
    difficulty: "advanced",
    duration: "40h",
    lessons: 160,
    students: 38400,
    rating: 4.8,
    instructor: "Dr. Priya Nair",
    tags: ["ML", "Python", "TensorFlow", "PyTorch"],
    image: "/images/ml-course.jpg",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: "6",
    title: "Docker & Kubernetes Mastery",
    description: "Container orchestration, microservices, CI/CD pipelines, and cloud-native deployments.",
    category: "DevOps",
    difficulty: "advanced",
    duration: "22h",
    lessons: 88,
    students: 21600,
    rating: 4.7,
    instructor: "Tom Walsh",
    tags: ["Docker", "Kubernetes", "DevOps", "AWS"],
    image: "/images/devops-course.jpg",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    id: "7",
    title: "React Native Mobile Apps",
    description: "Build cross-platform mobile apps for iOS and Android with React Native and Expo.",
    category: "Mobile Dev",
    difficulty: "intermediate",
    duration: "30h",
    lessons: 120,
    students: 18900,
    rating: 4.6,
    instructor: "Yuki Tanaka",
    tags: ["React Native", "Expo", "iOS", "Android"],
    image: "/images/rn-course.jpg",
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: "8",
    title: "Node.js Backend Development",
    description: "Build scalable REST APIs and GraphQL servers with Node.js, Express, and PostgreSQL.",
    category: "Web Development",
    difficulty: "intermediate",
    duration: "26h",
    lessons: 104,
    students: 34500,
    rating: 4.8,
    instructor: "James Carter",
    tags: ["Node.js", "Express", "PostgreSQL", "GraphQL"],
    image: "/images/node-course.jpg",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "9",
    title: "CSS Animations & Motion Design",
    description: "Master CSS animations, Framer Motion, GSAP, and create cinematic web experiences.",
    category: "Web Development",
    difficulty: "beginner",
    duration: "14h",
    lessons: 56,
    students: 27300,
    rating: 4.7,
    instructor: "Mia Fontaine",
    tags: ["CSS", "Animations", "Framer Motion", "GSAP"],
    image: "/images/css-course.jpg",
    color: "from-fuchsia-500/20 to-pink-500/20",
  },
];

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export function getCoursesByCategory(category: string): Course[] {
  return COURSES.filter((c) => c.category === category);
}

export function getCoursesByDifficulty(difficulty: Course["difficulty"]): Course[] {
  return COURSES.filter((c) => c.difficulty === difficulty);
}

export function searchCourses(query: string): Course[] {
  const q = query.toLowerCase();
  return COURSES.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q)) ||
      c.category.toLowerCase().includes(q)
  );
}
