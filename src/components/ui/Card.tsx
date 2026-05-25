"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  variant?: "default" | "glass" | "solid" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
}

const variants = {
  default: "bg-zinc-900/50 border border-zinc-800/80",
  glass: "glass",
  solid: "bg-zinc-900 border border-zinc-800",
  outlined: "bg-transparent border border-zinc-700",
};

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className,
  hover = false,
  glow = false,
  variant = "default",
  padding = "md",
  onClick,
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "rounded-2xl transition-all duration-300",
        variants[variant],
        paddings[padding],
        glow && "hover:shadow-glow-lg hover:border-sky-400/50",
        hover && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
