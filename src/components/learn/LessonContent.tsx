"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ContentBlock } from "@/types/learning";
import { CodeBlock } from "./CodeBlock";
import { LivePlayground } from "./LivePlayground";

interface LessonContentProps {
  blocks: ContentBlock[];
}

function NoteBlock({
  type,
  content,
}: {
  type: "note" | "warning" | "tip";
  content: string;
}) {
  const styles = {
    note: {
      border: "border-sky-500/30",
      bg: "bg-sky-500/5",
      icon: "ℹ️",
      label: "Note",
      labelColor: "text-sky-400",
      bar: "bg-sky-500",
    },
    warning: {
      border: "border-amber-500/30",
      bg: "bg-amber-500/5",
      icon: "⚠️",
      label: "Warning",
      labelColor: "text-amber-400",
      bar: "bg-amber-500",
    },
    tip: {
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/5",
      icon: "💡",
      label: "Tip",
      labelColor: "text-emerald-400",
      bar: "bg-emerald-500",
    },
  };

  const s = styles[type];

  return (
    <div className={cn("flex gap-3 p-4 rounded-xl border", s.border, s.bg)}>
      <div className={cn("w-0.5 rounded-full flex-shrink-0 self-stretch", s.bar)} />
      <div>
        <p className={cn("text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5", s.labelColor)}>
          <span>{s.icon}</span>
          {s.label}
        </p>
        <p className="text-sm text-zinc-300 leading-relaxed">{content}</p>
      </div>
    </div>
  );
}

export function LessonContent({ blocks }: LessonContentProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
        >
          {block.type === "paragraph" && block.content && (
            <p className="text-zinc-300 leading-relaxed text-base">{block.content}</p>
          )}

          {block.type === "heading" && block.content && (
            <h2 className="text-xl font-bold text-white mt-2 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-sky-500 flex-shrink-0 shadow-[0_0_8px_rgba(14,165,233,0.6)]" />
              {block.content}
            </h2>
          )}

          {block.type === "subheading" && block.content && (
            <h3 className="text-lg font-semibold text-zinc-100">{block.content}</h3>
          )}

          {block.type === "code" && block.code && (
            <CodeBlock code={block.code} />
          )}

          {block.type === "note" && block.content && (
            <NoteBlock type="note" content={block.content} />
          )}

          {block.type === "warning" && block.content && (
            <NoteBlock type="warning" content={block.content} />
          )}

          {block.type === "tip" && block.content && (
            <NoteBlock type="tip" content={block.content} />
          )}

          {block.type === "list" && block.items && (
            <ul className="space-y-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-zinc-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0 mt-2" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {block.type === "ordered-list" && block.items && (
            <ol className="space-y-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-zinc-300 text-sm">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-bold flex-shrink-0 flex items-center justify-center mt-0.5">
                    {j + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          )}

          {block.type === "divider" && (
            <div className="h-px bg-white/5 my-2" />
          )}

          {block.type === "playground" && block.playground && (
            <div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Playground — edit the code!
              </p>
              <LivePlayground initial={block.playground} />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
