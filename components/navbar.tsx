"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 text-white backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-bold tracking-tight">CareerCopilot AI</Link>
          <div className="h-8 w-8 rounded-full bg-white/10 animate-pulse" />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 text-white backdrop-blur">
      
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          CareerCopilot AI
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm text-gray-300 transition hover:text-white">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm text-gray-300 transition hover:text-white">
            How it Works
          </Link>
          <Link href="#testimonials" className="text-sm text-gray-300 transition hover:text-white">
            Testimonials
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <button className="rounded-xl bg-white px-5 py-2 text-sm font-medium text-black transition hover:opacity-80">
                Login
              </button>
            </SignInButton>
          ) : (
            <>
              <Link href="/dashboard" className="text-sm text-gray-300 hover:text-white">
                Dashboard
              </Link>
              <UserButton />
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-white/10 bg-black md:hidden">
          
          <nav className="flex flex-col gap-6 px-6 py-6">
            <Link href="#features" className="text-gray-300 transition hover:text-white" onClick={() => setOpen(false)}>
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-300 transition hover:text-white" onClick={() => setOpen(false)}>
              How it Works
            </Link>
            
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className="rounded-xl bg-white px-5 py-3 font-medium text-black">
                  Login
                </button>
              </SignInButton>
            ) : (
              <>
                <Link href="/dashboard" className="text-gray-300 transition hover:text-white" onClick={() => setOpen(false)}>
                  Dashboard
                </Link>
                <div className="pt-2">
                  <UserButton />
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
