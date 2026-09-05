"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}

function SidebarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 3v18" />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function getInitials(name?: string | null) {
  if (!name) return "U";
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

const navItems = [
  { icon: HomeIcon, label: "Overview", href: "/dashboard/user" },
  { icon: PlusIcon, label: "Add Resource", href: "/dashboard/user/add" },
  { icon: ListIcon, label: "Manage Resources", href: "/dashboard/user/manage" },
];

export default function Sidebar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  if (isPending) {
    return (
      <aside className="hidden lg:flex w-64 shrink-0 bg-[#08090C] border-r border-white/10 min-h-screen flex-col p-5">
        <div className="h-8 w-32 rounded-lg bg-white/5 animate-pulse mb-8" />
        <div className="space-y-3 flex-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-10 rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      </aside>
    );
  }

  if (!session) return null;

  const user = session.user;

  async function handleLogout() {
    await authClient.signOut();
    router.replace("/login");
  }

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
              isActive
                ? "bg-[#0084FF]/10 text-[#0084FF] border border-[#0084FF]/20 font-semibold"
                : "text-[#9CA3AF] hover:bg-white/5 hover:text-white"
            }`}
          >
            <item.icon className={`h-5 w-5 transition-colors ${isActive ? "text-[#0084FF]" : "text-[#9CA3AF]"}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const userCard = (
    <div className="border-t border-white/10 pt-4 mt-4">
      <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 mb-3 border border-white/5">
        <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-r from-[#0084FF] to-[#0D99FF] flex items-center justify-center text-sm font-bold text-white shadow-[0_0_10px_rgba(13,153,255,0.4)]">
          {getInitials(user?.name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white truncate">{user?.name || "User"}</p>
          <p className="text-xs text-[#9CA3AF] truncate">{user?.email}</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#9CA3AF] hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-150 cursor-pointer"
      >
        <LogoutIcon className="h-5 w-5" />
        Sign Out
      </button>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex w-64 shrink-0 bg-[#08090C] border-r border-white/10 min-h-screen flex-col">
        <div className="px-5 py-6 border-b border-white/10">
          <Link href="/" className="group inline-flex items-center">
            <span className="text-xl font-black tracking-tight text-white transition-opacity duration-200 group-hover:opacity-90">
              Study<span className="bg-gradient-to-r from-[#0084FF] to-[#0D99FF] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(13,153,255,0.6)]">Zone</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 px-3 py-5">
          <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]/60">Menu</p>
          {navContent}
        </div>

        <div className="px-3 py-4">
          {userCard}
        </div>
      </aside>

      <button
        onClick={() => setDrawerOpen(true)}
        className="lg:hidden fixed top-20 right-4 z-40 min-w-10 w-10 h-10 p-0 flex items-center justify-center rounded-xl bg-[#08090C]/90 border border-white/10 text-[#9CA3AF] backdrop-blur-md transition-all shadow-lg hover:text-white hover:border-white/20"
      >
        <SidebarIcon className="w-5 h-5" />
      </button>

      {drawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <div
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-72 bg-[#0A0B10] border-r border-white/10 flex flex-col transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <Link href="/" className="group flex items-center" onClick={() => setDrawerOpen(false)}>
            <span className="text-lg font-black tracking-tight text-white transition-opacity duration-200 group-hover:opacity-90">
              Study<span className="bg-gradient-to-r from-[#0084FF] to-[#0D99FF] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(13,153,255,0.6)]">Zone</span>
            </span>
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            className="h-8 w-8 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-white hover:bg-white/5 transition"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 px-3 py-5">
          <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]/60">Menu</p>
          {navContent}
        </div>

        <div className="px-3 py-4">
          {userCard}
        </div>
      </div>
    </>
  );
}
