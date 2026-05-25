"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "glass";
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  variant = "default",
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-zinc-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            "w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500",
            "border transition-all duration-200 outline-none",
            "focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10",
            variant === "default"
              ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
              : "bg-white/5 border-white/10 backdrop-blur-sm hover:border-white/20",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/10",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}
