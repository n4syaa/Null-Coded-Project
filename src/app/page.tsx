import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { LearningPaths } from "@/components/home/LearningPaths";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <LearningPaths />
      <CTA />
      <Footer />
    </>
  );
}
