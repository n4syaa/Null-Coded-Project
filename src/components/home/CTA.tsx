"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BlurOrb } from "@/components/effects/BlurOrb";

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative glass rounded-3xl border border-white/10 p-12 md:p-20 text-center overflow-hidden"
        >
          {/* Orbs */}
          <BlurOrb className="absolute -top-20 -left-20 opacity-50" color="sky" size="lg" delay={0} />
          <BlurOrb className="absolute -bottom-20 -right-20 opacity-50" color="violet" size="lg" delay={1.5} />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Siap untuk meluncurkan
              <br />
              <span className="gradient-text">proyek pertama Anda?</span>
            </h2>

            <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Pelajari coding dari nol hingga mahir dengan materi interaktif, project nyata, dan pembelajaran yang mudah dipahami. Mulai perjalanan programming Anda bersama Null Coded sekarang.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button variant="primary" size="xl" className="min-w-48">
                  Mulai Belajar
                </Button>
              </Link>
              <Link href="/learn">
                <Button variant="ghost" size="xl">
                  Jelajahi Pembelajaran
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
