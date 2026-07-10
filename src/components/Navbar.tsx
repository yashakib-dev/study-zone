'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  const activeLinkClass = "text-cyan-400 font-semibold relative after:absolute after:bottom-[-22px] after:left-0 after:right-0 after:h-[2px] after:bg-cyan-400 after:rounded-full";
  const inactiveLinkClass = "text-slate-300 hover:text-cyan-400 transition-colors duration-200 font-medium";

  const activeMobileLinkClass = "text-cyan-400 font-semibold bg-slate-900/60 pl-3 border-l-2 border-cyan-400 py-2 rounded-r-md";
  const inactiveMobileLinkClass = "text-slate-300 hover:text-cyan-400 pl-3 transition-all duration-200 py-2 hover:bg-slate-900/30 rounded-md";

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          <Link href="/" className="flex items-center gap-2 group" onClick={closeDrawer}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent group-hover:text-white transition-colors duration-200">
              StudyZone
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className={pathname === '/' ? activeLinkClass : inactiveLinkClass}>
              Home
            </Link>
            <Link href="/explore" className={pathname === '/explore' ? activeLinkClass : inactiveLinkClass}>
              Explore
            </Link>
            <Link href="/dashboard" className={pathname === '/dashboard' ? activeLinkClass : inactiveLinkClass}>
              Dashboard
            </Link>
            <Link href="/about" className={pathname === '/about' ? activeLinkClass : inactiveLinkClass}>
              About
            </Link>
            <Link href="/contact" className={pathname === '/contact' ? activeLinkClass : inactiveLinkClass}>
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-900/30 hover:from-indigo-500 hover:to-indigo-400 hover:shadow-indigo-500/20 active:scale-95 transition-all duration-150 text-center"
            >
              Login
            </Link>
          </div>

          <button
            onClick={toggleDrawer}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 text-slate-300 md:hidden hover:text-white hover:bg-slate-900 transition-colors duration-200 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isDrawerOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

        </div>
      </header>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={closeDrawer}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 w-72 bg-slate-950 border-l border-slate-850 p-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-6">
            <Link href="/" className="flex items-center gap-2 group" onClick={closeDrawer}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                StudyZone
              </span>
            </Link>
            <button
              onClick={closeDrawer}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-900 bg-slate-900/30 text-slate-400 hover:text-white cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={closeDrawer}
              className={pathname === '/' ? activeMobileLinkClass : inactiveMobileLinkClass}
            >
              Home
            </Link>
            <Link
              href="/explore"
              onClick={closeDrawer}
              className={pathname === '/explore' ? activeMobileLinkClass : inactiveMobileLinkClass}
            >
              Explore
            </Link>
            <Link
              href="/dashboard"
              onClick={closeDrawer}
              className={pathname === '/dashboard' ? activeMobileLinkClass : inactiveMobileLinkClass}
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              onClick={closeDrawer}
              className={pathname === '/about' ? activeMobileLinkClass : inactiveMobileLinkClass}
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={closeDrawer}
              className={pathname === '/contact' ? activeMobileLinkClass : inactiveMobileLinkClass}
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="border-t border-slate-900 pt-6">
          <Link
            href="/login"
            onClick={closeDrawer}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-950/40 hover:from-indigo-500 hover:to-indigo-400 active:scale-[0.98] transition-all text-center animate-pulse"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
