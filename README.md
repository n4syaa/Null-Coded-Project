# Null Coded — Coding Learning Platform

A futuristic, premium coding education platform built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and Zustand.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Zustand**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Pages

- `/` — Homepage (Hero, Features, Learning Paths, CTA)
- `/learn` — Jelajahi semua materi pembelajaran dengan filter
- `/dashboard` — User dashboard with progress tracking
- `/login` — Authentication (login)
- `/register` — Authentication (register)
- `/about` — About page

## Project Structure

```
src/
  app/           # Next.js App Router pages
  components/    # React components
    layout/      # Navbar, Footer, Sidebar
    home/        # Hero, Features, LearningPaths, CTA
    course/      # CourseCard, LessonCard, ProgressBar
    effects/     # Particles, GradientGlow, BlurOrb
    ui/          # Button, Card, Input, Modal
  data/          # Static data (courses)
  hooks/         # Custom React hooks
  lib/           # Utilities and constants
  store/         # Zustand state management
  styles/        # Global CSS animations
  types/         # TypeScript types
```
