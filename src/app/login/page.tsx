"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { BlurOrb } from "@/components/effects/BlurOrb";
import { useUserStore } from "@/store/useUserStore";

function validateForm(form: { email: string; password: string }) {
  const errs: Record<string, string> = {};
  if (!form.email) errs.email = "Email wajib diisi";
  else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Alamat email tidak valid";
  if (!form.password) errs.password = "Kata sandi wajib diisi";
  else if (form.password.length < 8) errs.password = "Kata sandi minimal 8 karakter";
  return errs;
}

export default function LoginPage() {
  const router = useRouter();
  const { login, hasHydrated } = useUserStore();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  // CRITICAL: Wait for store hydration before allowing login
  useEffect(() => {
    // Don't render anything until hydration is complete
  }, []);

  const updateField = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((e2) => ({ ...e2, [field]: "", auth: "" }));
  };

  const handleSubmit = async () => {
    // Ensure hydration before login
    if (!hasHydrated) {
      setErrors({ auth: "Sistem sedang dimuat. Silakan tunggu..." });
      return;
    }

    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 600));
      
      const result = login(form.email, form.password);

      if (!result.success) {
        setErrors({ auth: result.error ?? "Email atau kata sandi salah." });
        setLoading(false);
        return;
      }

      // Login successful - redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      setErrors({ auth: "Terjadi kesalahan. Silakan coba lagi." });
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading && hasHydrated) handleSubmit();
  };

  // Show loading state while hydrating
  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
          <p className="text-zinc-600 text-sm">Memuat sistem autentikasi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-4 py-12">
      <BlurOrb
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"
        color="sky"
        size="xl"
        delay={0}
      />
      <BlurOrb
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2"
        color="violet"
        size="lg"
        delay={1}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 text-white font-bold text-2xl">
            Null<span className="text-sky-400">Coded</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Selamat datang kembali</h1>
          <p className="text-zinc-400 text-sm">Masuk untuk melanjutkan perjalanan belajar Anda</p>
        </div>

        <Card variant="glass" padding="lg" className="border-white/10">
          <div className="space-y-4" onKeyDown={handleKeyDown}>
            {errors.auth && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errors.auth}
              </motion.div>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="anda@contoh.com"
              value={form.email}
              onChange={updateField("email")}
              error={errors.email}
              variant="glass"
              autoComplete="email"
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Kata Sandi"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={updateField("password")}
              error={errors.password}
              variant="glass"
              autoComplete="current-password"
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-zinc-400 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-6"
              variant="primary"
            >
              {loading ? "Sedang masuk..." : "Masuk"}
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-zinc-400 text-sm">
              Belum memiliki akun?{" "}
              <Link href="/register" className="text-sky-400 hover:text-sky-300 font-semibold">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
