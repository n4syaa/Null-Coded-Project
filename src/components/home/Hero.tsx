"use client";

import { motion } from "framer-motion";
import { BlurOrb } from "@/components/effects/BlurOrb";
import { STATS } from "@/lib/constants";

const codeSnippet = `const learn = async () => {
  const skills = await nullcoded.enroll({
    path: "fullstack",
    pace: "your-own",
  });

  return skills.build(); // 🚀
};`;

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden pt-20 md:pt-16">
      {/* Background elements */}
      <BlurOrb className="absolute -top-32 left-1/2 -translate-x-1/2 opacity-50 md:opacity-100" color="sky" size="xl" delay={0} />
      <BlurOrb className="absolute top-1/2 -left-48 opacity-30 md:opacity-100" color="violet" size="lg" delay={1} />
      <BlurOrb className="absolute bottom-0 right-0 opacity-30 md:opacity-100" color="cyan" size="md" delay={2} />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 drop-shadow-[0_0_25px_rgba(14,165,233,0.3)] leading-[1.1]"
        >
          <span className="text-white">Coding masa</span>
          <br />
          <span className="gradient-text filter drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">depanmu sekarang</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed px-2"
        >
          Null Coded adalah platform belajar coding modern untuk pemula hingga profesional. Pelajari teknologi terbaru, bangun project nyata, dan tingkatkan skill programming-mu.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:flex items-center justify-center gap-6 md:gap-12 mb-12 max-w-sm md:max-w-none mx-auto"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span className="text-xl sm:text-3xl font-bold text-white">{stat.value}</span>
              <span className="text-sm text-zinc-500">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Credit Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs sm:text-sm text-sky-400 text-center mb-16 md:mb-20 font-semibold tracking-wide drop-shadow-[0_0_10px_rgba(14,165,233,0.8)]"
        >
          Made by: Nasya Nabila
        </motion.p>

        {/* Code Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto relative group px-2 sm:px-0"
        >
          <div className="glass rounded-2xl border border-white/10 overflow-hidden shadow-glass group-hover:shadow-glow transition-shadow duration-500">
            {/* Window bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-xs text-zinc-500 ml-2 font-mono">learn.ts</span>
            </div>
            {/* Code */}
            <div className="p-4 md:p-6 text-left">
              <pre className="text-xs md:text-sm font-mono text-zinc-300 leading-relaxed overflow-x-auto">
                <code>
                  {codeSnippet.split("\n").map((line, i) => (
                    <div key={i} className="flex gap-3 md:gap-4">
                      <span className="text-zinc-600 select-none w-4 text-right flex-shrink-0">{i + 1}</span>
                      <span
                        className="text-zinc-300 whitespace-pre"
                        dangerouslySetInnerHTML={{
                          __html: line
                            .replace(/const|async|await|return/g, '<span class="text-violet-400">$&</span>')
                            .replace(/"[^"]*"/g, '<span class="text-amber-300">$&</span>')
                            .replace(/\/\/.*/g, '<span class="text-zinc-500">$&</span>')
                            .replace(/nullcoded/g, '<span class="text-sky-400">nullcoded</span>'),
                        }}
                      />
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
