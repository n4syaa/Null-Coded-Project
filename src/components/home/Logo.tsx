import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`inline-flex items-center font-mono font-bold tracking-tighter ${className}`}>
      <span className="text-sky-400">&lt;</span>
      <span className="text-white px-0.5">code</span>
      <span className="text-sky-400">/&gt;</span>
    </div>
  );
}