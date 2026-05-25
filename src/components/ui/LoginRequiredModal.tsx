"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginRequiredModal({ isOpen, onClose }: LoginRequiredModalProps) {
  // 1. Semua hooks wajib dipanggil di paling atas komponen
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mengelola overflow body saat modal terbuka/tertutup
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup function untuk memastikan overflow kembali normal saat komponen di-unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLoginClick = () => {
    onClose();
    router.push("/login");
  };

  const transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" };
  const overlayTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.2 };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-black/70 backdrop-blur-md p-4" onClick={onClose}>
          {/* Konten Modal Futuristic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-cyan-500/30 bg-[#0B1120]/90 p-8 text-center shadow-[0_0_40px_rgba(34,211,238,0.25)] relative z-10"
          >
          {/* Background Orbs Inside Modal */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-sky-500/10 border border-sky-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(14,165,233,0.2)]">
              <svg className="w-10 h-10 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] mb-3">
              Akses Terbatas
            </h2>
            
            <p className="text-white text-base mb-10 leading-relaxed px-4">
              Silahkan login untuk mengakses fitur ini
            </p>

            <div className="flex gap-3 justify-center">
              <Button 
                variant="primary" 
                size="md" 
                onClick={handleLoginClick}
                className="rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] px-6"
              >
                Login
              </Button>
              <Button 
                variant="ghost" 
                size="md" 
                onClick={onClose}
                className="rounded-xl border border-white/10 hover:bg-white/5 px-6 text-zinc-400 hover:text-white"
              >
                Kembali
              </Button>
            </div>
          </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}