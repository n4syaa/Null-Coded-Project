"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurOrbProps {
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
  delay?: number;
}

const sizes = {
  sm: "w-48 h-48",
  md: "w-72 h-72",
  lg: "w-96 h-96",
  xl: "w-[600px] h-[600px]",
};

export function BlurOrb({
  className,
  color = "sky",
  size = "lg",
  animate = true,
  delay = 0,
}: BlurOrbProps) {
  const colorMap: Record<string, string> = {
    sky: "bg-sky-500/10",
    blue: "bg-blue-500/10",
    violet: "bg-violet-500/10",
    cyan: "bg-cyan-400/10",
    emerald: "bg-emerald-500/10",
    rose: "bg-rose-500/10",
    amber: "bg-amber-500/10",
  };

  const bgColor = colorMap[color] || colorMap.sky;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        animate
          ? {
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
            }
          : { opacity: 0.3 }
      }
      transition={
        animate
          ? {
              duration: 6,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : {}
      }
      className={cn(
        "rounded-full blur-3xl pointer-events-none",
        sizes[size],
        bgColor,
        className
      )}
      aria-hidden="true"
    />
  );
}
