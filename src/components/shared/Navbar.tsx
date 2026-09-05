'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const firstName = user?.name ? user.name.split(' ')[0] : '';

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success('Logged out successfully');
      router.push('/');
      router.refresh();
      closeDrawer();
    } catch {
      toast.error('Failed to log out');
    }
  };

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  const activeLinkClass = "bg-[#0084FF]/15 text-white font-semibold text-xs sm:text-sm px-3.5 py-1.5 rounded-full border border-[#0084FF]/30 shadow-[0_0_12px_rgba(13,153,255,0.25)] transition-all duration-300 ease-out";
  const inactiveLinkClass = "text-[#9CA3AF] hover:text-white transition-all duration-300 ease-out font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-full hover:bg-white/5";

  const activeMobileLinkClass = "text-white font-semibold bg-[#0084FF]/15 border border-[#0084FF]/30 px-4 py-2.5 rounded-xl shadow-[0_0_12px_rgba(13,153,255,0.2)] transition-all duration-300";
  const inactiveMobileLinkClass = "text-[#9CA3AF] hover:text-white px-4 transition-all duration-300 py-2.5 hover:bg-white/5 rounded-xl font-medium text-sm";

  return (
    <>
      <header className="sticky top-0 z-50 w-full pt-4 pb-2 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full bg-[rgba(18,21,28,0.75)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] px-5 sm:px-6 shadow-2xl shadow-black/60">

          <Link href="/" className="group flex items-center" onClick={closeDrawer}>
            <span className="text-lg sm:text-xl font-black tracking-tight text-white transition-opacity duration-200 group-hover:opacity-90">
              Study<span className="bg-gradient-to-r from-[#0084FF] to-[#0D99FF] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(13,153,255,0.6)]">Zone</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2.5">
            <Link href="/" className={pathname === '/' ? activeLinkClass : inactiveLinkClass}>
              Home
            </Link>
            <Link href="/explore" className={pathname === '/explore' ? activeLinkClass : inactiveLinkClass}>
              Explore
            </Link>
            <Link href="/dashboard/user" className={pathname.startsWith('/dashboard') ? activeLinkClass : inactiveLinkClass}>
              Dashboard
            </Link>
            <Link href="/about" className={pathname === '/about' ? activeLinkClass : inactiveLinkClass}>
              About
            </Link>
            <Link href="/contact" className={pathname === '/contact' ? activeLinkClass : inactiveLinkClass}>
              Contact
            </Link>
          </nav>

          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/dashboard/user" className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 hover:bg-white/10 hover:border-white/20 transition-all">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-6 w-6 rounded-full object-cover border border-[#0084FF]/50"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#0084FF] to-[#0D99FF] flex items-center justify-center text-[10px] font-bold text-white">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                )}
                <span className="text-xs font-semibold text-white">
                  Hi, {firstName}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-[#9CA3AF] hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all duration-150 cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-[#9CA3AF] hover:text-white hover:bg-white/10 transition-all duration-150 text-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-gradient-to-r from-[#0084FF] to-[#0D99FF] px-4.5 py-1.5 text-xs font-semibold text-white shadow-[0_0_16px_rgba(13,153,255,0.40)] hover:brightness-110 active:scale-95 transition-all duration-150 text-center"
              >
                Register
              </Link>
            </div>
          )}

          <button
            onClick={toggleDrawer}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#9CA3AF] md:hidden hover:text-white transition-colors duration-200 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isDrawerOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

        </div>
      </header>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md md:hidden transition-opacity duration-300"
          onClick={closeDrawer}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 w-72 bg-[#0A0B10] border-l border-white/10 p-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <Link href="/" className="group flex items-center" onClick={closeDrawer}>
              <span className="text-lg font-black tracking-tight text-white transition-opacity duration-200 group-hover:opacity-90">
                Study<span className="bg-gradient-to-r from-[#0084FF] to-[#0D99FF] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(13,153,255,0.6)]">Zone</span>
              </span>
            </Link>
            <button
              onClick={closeDrawer}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#9CA3AF] hover:text-white cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-2.5">
            <Link href="/" onClick={closeDrawer} className={pathname === '/' ? activeMobileLinkClass : inactiveMobileLinkClass}>
              Home
            </Link>
            <Link href="/explore" onClick={closeDrawer} className={pathname === '/explore' ? activeMobileLinkClass : inactiveMobileLinkClass}>
              Explore
            </Link>
            <Link href="/dashboard/user" onClick={closeDrawer} className={pathname.startsWith('/dashboard') ? activeMobileLinkClass : inactiveMobileLinkClass}>
              Dashboard
            </Link>
            <Link href="/about" onClick={closeDrawer} className={pathname === '/about' ? activeMobileLinkClass : inactiveMobileLinkClass}>
              About
            </Link>
            <Link href="/contact" onClick={closeDrawer} className={pathname === '/contact' ? activeMobileLinkClass : inactiveMobileLinkClass}>
              Contact
            </Link>
          </nav>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 mb-1">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-9 w-9 rounded-full object-cover border border-[#0084FF]/50"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-gradient-to-r from-[#0084FF] to-[#0D99FF] flex items-center justify-center text-xs font-bold text-white">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                )}
                <div>
                  <p className="text-[11px] text-[#9CA3AF]">Logged in as</p>
                  <p className="text-xs font-semibold text-white">{user.name}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 active:scale-95 transition-all text-center cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={closeDrawer} className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-[#9CA3AF] hover:text-white active:scale-95 transition-all text-center">
                Login
              </Link>
              <Link href="/register" onClick={closeDrawer} className="w-full rounded-full bg-gradient-to-r from-[#0084FF] to-[#0D99FF] py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(13,153,255,0.40)] active:scale-95 transition-all text-center">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
