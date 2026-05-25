"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { BlurOrb } from "@/components/effects/BlurOrb";
import { useUserStore } from "@/store/useUserStore";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

function validateForm(form: FormState) {
  const errs: Record<string, string> = {};
  if (!form.name.trim()) errs.name = "Nama wajib diisi";
  if (!form.email) errs.email = "Email wajib diisi";
  else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Alamat email tidak valid";
  if (!form.password) errs.password = "Kata sandi wajib diisi";
  else if (form.password.length < 8) errs.password = "Kata sandi minimal 8 karakter";
  if (form.password !== form.confirm) errs.confirm = "Kata sandi tidak cocok";
  return errs;
}

export default function RegisterPage() {
  const router = useRouter();
  const { register, hasHydrated } = useUserStore();

  const [form, setForm] = useState<FormState>({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // CRITICAL: Wait for store hydration before allowing register
  useEffect(() => {
    // Don't render anything until hydration is complete
  }, []);

  const updateField = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((e2) => ({ ...e2, [field]: "", submit: "" }));
  };

  const handleSubmit = async () => {
    // Ensure hydration before register
    if (!hasHydrated) {
      setErrors({ submit: "Sistem sedang dimuat. Silakan tunggu..." });
      return;
    }

    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800)); // Beri waktu state untuk sinkronisasi
      const result = register(form.name, form.email, form.password);

      if (!result.success) {
        setErrors({ submit: result.error ?? "Terjadi kesalahan saat mendaftar." });
        setLoading(false);
        return;
      }

      // Register successful - redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      setErrors({ submit: "Terjadi kesalahan. Silakan coba lagi." });
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading && hasHydrated) handleSubmit();
  };

  const passwordStrength = (() => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 8) return { level: 1, label: "Lemah", color: "bg-red-500" };
    if (p.length < 10 || !/[0-9]/.test(p)) return { level: 2, label: "Cukup", color: "bg-amber-500" };
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) return { level: 3, label: "Kuat", color: "bg-emerald-500" };
    return { level: 2, label: "Cukup", color: "bg-amber-500" };
  })();

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
        className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2"
        color="violet"
        size="xl"
        delay={0}
      />
      <BlurOrb
        className="absolute bottom-1/3 left-1/4 -translate-x-1/2 translate-y-1/2"
        color="cyan"
        size="lg"
        delay={1.5}
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
          <h1 className="text-2xl font-bold text-white mb-2">Buat akun Anda</h1>
          <p className="text-zinc-400 text-sm">Mulai perjalanan coding Anda — gratis selamanya</p>
        </div>

        <Card variant="glass" padding="lg" className="border-white/10">
          <div className="space-y-4" onKeyDown={handleKeyDown}>
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errors.submit}
              </motion.div>
            )}

            <Input
              label="Nama Lengkap"
              type="text"
              placeholder="Masukkan nama Anda"
              value={form.name}
              onChange={updateField("name")}
              error={errors.name}
              variant="glass"
              autoComplete="name"
              leftIcon={<User className="w-4 h-4" />}
            />

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

            <div>
              <Input
                label="Kata Sandi"
                type={showPassword ? "text" : "password"}
                placeholder="Minimal 8 karakter"
                value={form.password}
                onChange={updateField("password")}
                error={errors.password}
                variant="glass"
                autoComplete="new-password"
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
              {passwordStrength && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${(passwordStrength.level / 3) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-zinc-400">{passwordStrength.label}</span>
                </div>
              )}
            </div>

            <Input
              label="Konfirmasi Kata Sandi"
              type={showConfirm ? "text" : "password"}
              placeholder="Ulangi kata sandi"
              value={form.confirm}
              onChange={updateField("confirm")}
              error={errors.confirm}
              variant="glass"
              autoComplete="new-password"
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="text-zinc-400 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            {form.password && form.password === form.confirm && !errors.confirm && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                Kata sandi cocok
              </motion.div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-6"
              variant="primary"
            >
              {loading ? "Sedang mendaftar..." : "Daftar"}
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-zinc-400 text-sm">
              Sudah memiliki akun?{" "}
              <Link href="/login" className="text-sky-400 hover:text-sky-300 font-semibold">
                Masuk di sini
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
