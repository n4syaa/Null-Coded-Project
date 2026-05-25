"use client";

import { cn } from "@/lib/utils";

interface GradientGlowProps {
  className?: string;
  color?: "blue" | "purple" | "cyan" | "mixed";
  intensity?: "low" | "medium" | "high";
  position?: "top" | "center" | "bottom" | "left" | "right";
}

const colorMap = {
  blue: "from-sky-500/30 via-blue-600/20 to-transparent",
  purple: "from-violet-500/30 via-purple-600/20 to-transparent",
  cyan: "from-cyan-400/30 via-sky-500/20 to-transparent",
  mixed: "from-sky-500/20 via-violet-500/15 to-transparent",
};

const intensityMap = {
  low: "opacity-40",
  medium: "opacity-60",
  high: "opacity-85",
};

export function GradientGlow({
  className,
  color = "blue",
  intensity = "medium",
  position = "top",
}: GradientGlowProps) {
  return (
    <div
      className={cn(
        "absolute pointer-events-none",
        intensityMap[intensity],
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "w-full h-full bg-gradient-radial",
          colorMap[color],
          "blur-3xl rounded-full"
        )}
      />
    </div>
  );
}

export function TopGlow() {
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none z-0" aria-hidden="true">
      <div className="w-full h-full bg-gradient-radial from-sky-400/25 via-sky-500/10 to-transparent blur-3xl rounded-full" />
    </div>
  );
}

export function BottomGlow() {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none z-0" aria-hidden="true">
      <div className="w-full h-full bg-gradient-radial from-violet-400/20 via-violet-500/10 to-transparent blur-3xl rounded-full" />
    </div>
  );
}
