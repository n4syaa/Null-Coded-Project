"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { FEATURES } from "@/lib/constants";

export function Features() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-sky-400 bg-sky-400/10 border border-sky-400/20 rounded-full mb-4">
            Platform Features
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Everything you need to
            <br />
            <span className="gradient-text">become a great developer</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            From beginner to senior engineer — we provide all the tools, content, and community support to accelerate your growth.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card
                hover
                glow
                className="h-full group"
                padding="lg"
              >
                <div className="flex flex-col gap-4 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-sky-500/40 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-sky-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                  <div className="mt-auto pt-4">
                    <span className="text-xs text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      Learn more
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
