"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role?: string;
  streak?: number;
  level?: number;
  xp?: number;
  coursesEnrolled?: number;
  coursesCompleted?: number;
  totalHours?: number;
  createdAt?: string;
  badges: Array<{ id: string; name: string; icon: string; description: string }>;
}

interface Activity {
  id: string;
  type: "lesson" | "badge" | "quiz" | "milestone";
  title: string;
  timestamp: string;
}

export interface Course {
  id: string;
  title: string;
  lessons: number;
  duration: string;
  progress?: number;
  category: string;
  color: string;
  icon?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  description?: string;
}

interface UserState {
  // Auth state - SINGLE SOURCE OF TRUTH
  currentUser: User | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;

  // User-specific runtime data
  enrolledCourses: Course[];
  recentActivity: Activity[];

  // Centralized user registry - ALL REGISTERED USERS
  registeredUsers: User[];

  // Actions - ONLY THESE METHODS MODIFY STATE
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setHasHydrated: (value: boolean) => void;
}

// SEED USERS FOR TESTING
const SEED_USERS: User[] = [
  {
    id: "demo-user-1",
    name: "Demo User",
    email: "demo@nullcoded.com",
    password: "Demo123456",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
    role: "user",
    streak: 5,
    level: 3,
    xp: 1250,
    coursesEnrolled: 2,
    coursesCompleted: 1,
    totalHours: 12,
    createdAt: new Date().toISOString(),
    badges: [
      { id: "first-course", name: "First Course", icon: "🎓", description: "Selesaikan kursus pertama" },
    ],
  },
];

// Helper for ID generation (fallback for non-secure contexts)
const generateId = () => {
  try {
    return crypto.randomUUID();
  } catch (e) {
    return 'user-' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
  }
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      hasHydrated: false,
      enrolledCourses: [],
      recentActivity: [],
      registeredUsers: SEED_USERS,

      register: (name: string, email: string, password: string) => {
        console.group("🔐 AUTH: Registering User");
        try {
        const state = get();
        const normalizedEmail = email.trim().toLowerCase();

        // Check for duplicate email
        const existing = state.registeredUsers.find(
          (u) => u.email.toLowerCase() === normalizedEmail
        );
        if (existing) {
            console.warn("Register failed: Email already exists");
            console.groupEnd();
          return { success: false, error: "Email sudah digunakan. Silakan gunakan email lain." };
        }

        const newUser: User = {
          id: generateId(),
          name: name.trim(),
          email: normalizedEmail,
          password,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${normalizedEmail}`,
          role: "user",
          streak: 0,
          level: 1,
          xp: 0,
          coursesEnrolled: 0,
          coursesCompleted: 0,
          totalHours: 0,
          createdAt: new Date().toISOString(),
          badges: [],
        };

        set((s) => ({
          registeredUsers: [...s.registeredUsers, newUser],
          currentUser: newUser,
          isAuthenticated: true,
          enrolledCourses: [],
          recentActivity: [],
        }));
          
          console.log("New User Created:", newUser);
          console.log("Current Registered Users:", get().registeredUsers);
          console.groupEnd();
        return { success: true };
        } catch (err) {
          console.error("Critical Register Error:", err);
          console.groupEnd();
          return { success: false, error: "Terjadi kesalahan internal sistem." };
        }
      },

      login: (email: string, password: string) => {
        console.group("🔐 AUTH: Login Attempt");
        const state = get();
        const normalizedEmail = email.trim().toLowerCase();

        console.log("Searching for:", normalizedEmail);
        console.log("Database size:", state.registeredUsers.length);

        // Find user by email
        const found = state.registeredUsers.find(
          (u) => u.email.toLowerCase() === normalizedEmail
        );

        if (!found) {
          console.warn("Login failed: Email not found");
          console.groupEnd();
          return { success: false, error: "Email atau kata sandi salah." };
        }

        // Check password
        if (found.password !== password) {
          console.warn("Login failed: Password mismatch");
          console.groupEnd();
          return { success: false, error: "Email atau kata sandi salah." };
        }

        set({
          currentUser: found,
          isAuthenticated: true,
        });

        console.log("Login Successful:", found.name);
        console.groupEnd();
        return { success: true };
      },

      logout: () =>
        set({
          currentUser: null,
          isAuthenticated: false,
          enrolledCourses: [],
          recentActivity: [],
        }),

      updateUser: (updates: Partial<User>) => {
        const state = get();
        if (!state.currentUser) return;

        const updatedUser = { ...state.currentUser, ...updates };

        set({
          currentUser: updatedUser,
          registeredUsers: state.registeredUsers.map((u) =>
            u.id === updatedUser.id ? updatedUser : u
          ),
        });
      },

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "nullcoded-auth-v2",
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        enrolledCourses: state.enrolledCourses,
        recentActivity: state.recentActivity,
        registeredUsers: state.registeredUsers,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHasHydrated(true);
      },
    }
  )
);
