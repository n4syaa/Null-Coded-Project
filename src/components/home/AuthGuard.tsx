"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

const PROTECTED_ROUTES = ["/learn", "/dashboard"];
const PUBLIC_ONLY_ROUTES = ["/login", "/register"];

function isProtected(pathname: string): boolean {
  return PROTECTED_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"));
}

function isPublicOnly(pathname: string): boolean {
  return PUBLIC_ONLY_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"));
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, hasHydrated } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!hasHydrated) return;

    if (isProtected(pathname) && !isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (isPublicOnly(pathname) && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [hasHydrated, isAuthenticated, pathname, router]);

  // Tunggu hydration
  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
          <p className="text-zinc-600 text-sm">Memuat...</p>
        </div>
      </div>
    );
  }

  // Sembunyikan konten protected saat belum login
  if (isProtected(pathname) && !isAuthenticated) {
    return null;
  }

  // Sembunyikan login/register saat sudah login
  if (isPublicOnly(pathname) && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
