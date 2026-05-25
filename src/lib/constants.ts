import type { NavLink, Feature, LearningPath, Category } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Beranda", href: "/" },
  { label: "Belajar", href: "/learn" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Tentang", href: "/about" },
];

export const SITE_CONFIG = {
  name: "Null Coded",
  description: "Null Coded adalah platform belajar coding modern untuk pemula hingga profesional. Pelajari teknologi terbaru, bangun project nyata, dan tingkatkan skill programming-mu.",
  tagline: "Belajar. Bangun. Luncurkan.",
  url: "https://nullcoded.dev",
  version: "2.0.0",
};

export const STATS = [
  { label: "Pelajar Aktif", value: "120rb+", icon: "👥" },
  { label: "Materi Tersedia", value: "500+", icon: "📚" },
  { label: "Instruktur Ahli", value: "80+", icon: "🎓" },
  { label: "Tingkat Kelulusan", value: "94%", icon: "🏆" },
];

export const FEATURES: Feature[] = [
  {
    id: "1",
    title: "Pembelajaran Berbasis AI",
    description: "Jalur belajar adaptif yang berkembang sesuai dengan tingkat keahlian dan kecepatan belajar Anda.",
    icon: "⚡",
  },
  {
    id: "2",
    title: "Lingkungan Kode Langsung",
    description: "Tulis, jalankan, dan perbaiki kode langsung di browser tanpa instalasi apa pun.",
    icon: "💻",
  },
  {
    id: "3",
    title: "Instruktur Ahli",
    description: "Belajar dari profesional industri yang bekerja di perusahaan teknologi top dunia.",
    icon: "🎯",
  },
  {
    id: "4",
    title: "Belajar Berbasis Proyek",
    description: "Bangun proyek nyata yang dapat Anda pamerkan di portofolio Anda.",
    icon: "🚀",
  },
  {
    id: "5",
    title: "Dukungan Komunitas",
    description: "Bergabung dengan ribuan pelajar dan dapatkan bantuan dari rekan serta mentor 24/7.",
    icon: "🌐",
  },
  {
    id: "6",
    title: "Sertifikat",
    description: "Dapatkan sertifikat yang diakui industri untuk meningkatkan prospek karier Anda.",
    icon: "🏅",
  },
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: "1",
    title: "Pengembang Full-Stack",
    description: "Kuasai pengembangan frontend dan backend dari nol hingga produksi.",
    courses: ["1", "2", "3", "4"],
    duration: "6 bulan",
    level: "Pemula ke Lanjutan",
    icon: "⚡",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "2",
    title: "Ilmuwan Data",
    description: "Pelajari Python, ML, dan visualisasi data untuk menjadi ahli data.",
    courses: ["5", "6", "7"],
    duration: "4 bulan",
    level: "Menengah",
    icon: "📊",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: "3",
    title: "DevOps Engineer",
    description: "Otomatisasi deployment, kelola infrastruktur, dan kuasai pipeline CI/CD.",
    courses: ["8", "9", "10"],
    duration: "3 bulan",
    level: "Lanjutan",
    icon: "🔧",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    id: "4",
    title: "Pengembang Mobile",
    description: "Bangun aplikasi indah untuk iOS dan Android menggunakan React Native.",
    courses: ["11", "12"],
    duration: "5 bulan",
    level: "Menengah",
    icon: "📱",
    color: "from-emerald-500/20 to-teal-500/20",
  },
];

export const CATEGORIES: Category[] = [
  { id: "1", name: "Pengembangan Web", icon: "🌐", count: 128, color: "from-blue-500 to-cyan-500" },
  { id: "2", name: "Sains Data", icon: "📊", count: 94, color: "from-violet-500 to-purple-500" },
  { id: "3", name: "Dev Mobile", icon: "📱", count: 67, color: "from-emerald-500 to-teal-500" },
  { id: "4", name: "DevOps", icon: "🔧", count: 45, color: "from-orange-500 to-red-500" },
  { id: "5", name: "AI & ML", icon: "🤖", count: 82, color: "from-pink-500 to-rose-500" },
  { id: "6", name: "Cybersecurity", icon: "🛡️", count: 39, color: "from-amber-500 to-yellow-500" },
];

export const DIFFICULTY_LABELS = {
  beginner: "Pemula",
  intermediate: "Menengah",
  advanced: "Lanjutan",
};

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.7,
  verySlow: 1.2,
};
