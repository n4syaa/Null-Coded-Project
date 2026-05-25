"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "sky" | "emerald" | "violet" | "amber" | "rose";
  animated?: boolean;
  className?: string;
}

const sizes = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

const colors = {
  sky: "bg-sky-500",
  emerald: "bg-emerald-500",
  violet: "bg-violet-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
};

const glows = {
  sky: "shadow-[0_0_8px_rgba(14,165,233,0.6)]",
  emerald: "shadow-[0_0_8px_rgba(16,185,129,0.6)]",
  violet: "shadow-[0_0_8px_rgba(139,92,246,0.6)]",
  amber: "shadow-[0_0_8px_rgba(245,158,11,0.6)]",
  rose: "shadow-[0_0_8px_rgba(244,63,94,0.6)]",
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercent = true,
  size = "md",
  color = "sky",
  animated = true,
  className,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full", className)}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm text-zinc-400">{label}</span>
          )}
          {showPercent && (
            <span className="text-sm font-medium text-zinc-300">{Math.round(percent)}%</span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full bg-zinc-800 rounded-full overflow-hidden",
          sizes[size]
        )}
      >
        <motion.div
          initial={animated ? { width: 0 } : { width: `${percent}%` }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className={cn(
            "h-full rounded-full",
            colors[color],
            glows[color]
          )}
        />
      </div>
    </div>
  );
}
