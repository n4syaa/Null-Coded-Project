"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

const footerLinks = {
  Platform: [
    { label: "Belajar", href: "/learn" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Learning Paths", href: "/#paths" },
    { label: "Community", href: "#" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Status", href: "#" },
    { label: "Privacy", href: "#" },
  ],
};

const socials = [
  { label: "GitHub", icon: "GH", href: "#" },
  { label: "Twitter", icon: "TW", href: "#" },
  { label: "Discord", icon: "DC", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-glow-sm">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Null<span className="text-sky-400"> Coded</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-xs">
              Platform belajar coding modern untuk pemula hingga profesional. Pelajari teknologi terbaru, bangun project nyata, dan tingkatkan skill programming-mu.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all text-xs font-bold"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-zinc-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-500 text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
