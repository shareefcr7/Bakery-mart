
"use client";

import Sidebar from "@/components/admin/Sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      {!isLoginPage && <Sidebar />}
      <main
        className={`transition-all duration-300 ${
          !isLoginPage ? "ml-64 p-8" : "w-full h-screen flex items-center justify-center p-4"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
