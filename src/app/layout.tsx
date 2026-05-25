import type { Metadata } from "next";
import "./globals.css";
import "../styles/animations.css";
import { Navbar } from "@/components/home/Navbar";
import { AuthGuard } from "@/components/home/AuthGuard";
import { Toaster } from "sonner";
import { Particles } from "@/components/effects/Particles";
import { TopGlow, BottomGlow } from "@/components/effects/GradientGlow";

export const metadata: Metadata = {
  title: {
    default: "NullCoded — Code your future today",
    template: "%s | NullCoded",
  },
  description:
    "NullCoded adalah platform belajar coding modern untuk pemula hingga profesional. Pelajari teknologi terbaru, bangun project nyata, dan tingkatkan skill programming-mu.",
  keywords: ["coding", "programming", "learn to code", "web development", "pembelajaran online"],
  authors: [{ name: "NullCoded Team" }],
  openGraph: {
    title: "NullCoded — Code your future today",
    description: "NullCoded adalah platform belajar coding modern untuk pemula hingga profesional.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased">
        <Particles />
        <TopGlow />
        <BottomGlow />
        <Navbar />
        <AuthGuard>
          {children}
        </AuthGuard>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
