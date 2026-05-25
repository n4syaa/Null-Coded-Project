"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import { Logo } from "@/components/home/Logo";
import { Button } from "@/components/ui/Button";
import { useUserStore } from "@/store/useUserStore";

const navLinks = [
  { name: "Beranda", href: "/", protected: false },
  { name: "Belajar", href: "/learn", protected: true },
  { name: "Dashboard", href: "/dashboard", protected: true },
  { name: "Tentang", href: "/about", protected: false },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { isAuthenticated, logout, hasHydrated, currentUser } = useUserStore();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
    setIsOpen(false);
  };

  const handleProtectedLink = (e: React.MouseEvent, href: string, isProtected: boolean) => {
    if (isProtected && !isAuthenticated) {
      e.preventDefault();
      router.push("/login");
    }
    setIsOpen(false);
  };

  const initials = currentUser
    ? currentUser.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-black/50 backdrop-blur-xl border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
            onClick={() => setIsOpen(false)}
          >
            <Logo className="text-xl" />
            <span className="text-white font-bold text-xl tracking-tight">
              Null<span className="text-sky-400">Coded</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleProtectedLink(e, link.href, link.protected)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-sky-400 bg-sky-400/10"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Auth Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {hasHydrated && (
              <div className="hidden md:flex items-center gap-2">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                          {initials}
                        </div>
                        <span className="text-sm text-zinc-300 font-medium">
                          {currentUser?.name.split(" ")[0]}
                        </span>
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-zinc-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                      title="Keluar"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="ghost" size="sm">
                        Masuk
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button variant="primary" size="sm">
                        Daftar
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 md:hidden text-zinc-400 hover:text-white transition-all rounded-xl hover:bg-white/5 active:scale-90"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-2xl overflow-y-auto max-h-[calc(100vh-64px)] shadow-2xl shadow-sky-500/10"
          >
            <div className="px-6 py-8 space-y-2">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleProtectedLink(e, link.href, link.protected)}
                    className={`flex items-center px-4 py-3.5 rounded-2xl font-medium transition-all duration-200 active:scale-[0.98] ${
                      isActive
                        ? "text-sky-400 bg-sky-400/10 shadow-[0_0_15px_rgba(56,189,248,0.1)] border border-sky-500/20"
                        : "text-zinc-400 hover:text-white border border-transparent"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {hasHydrated && (
                <div className="pt-6 flex flex-col gap-3 border-t border-white/10 mt-6">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      {/* User Info Card */}
                      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/5 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-sky-500/20">
                          {initials}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-white font-semibold leading-tight">{currentUser?.name}</span>
                          <span className="text-[11px] text-zinc-500">{currentUser?.email}</span>
                        </div>
                      </div>
                      
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full h-12 rounded-2xl border border-white/5">
                          Dashboard
                        </Button>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full h-12 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/10 transition-all flex items-center justify-center gap-2 font-semibold"
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full h-12 rounded-2xl border border-white/5">
                          Masuk
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        <Button variant="primary" className="w-full h-12 rounded-2xl shadow-lg shadow-sky-500/20">
                          Daftar
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
