"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
      style={scrolled ? {
        boxShadow: "0 4px 24px rgba(60,52,137,0.10)",
        borderBottom: "1px solid #EDE8FF"
      } : {}}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="EpisodeIQ"
            width={120}
            height={120}
            className="h-12 w-12 group-hover:scale-105 transition-transform duration-200"
            priority
          />
          <span className="text-2xl font-black tracking-tight">
            <span style={{ color: "#3C3489" }}>Episode</span>
            <span style={{ color: "#7F77DD" }}>IQ</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works"
            className="font-medium transition-colors text-sm"
            style={{ color: "#6B6894" }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = "#3C3489"}
            onMouseLeave={e => (e.target as HTMLElement).style.color = "#6B6894"}>
            How it works
          </Link>
          <Link href="#subjects"
            className="font-medium transition-colors text-sm"
            style={{ color: "#6B6894" }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = "#3C3489"}
            onMouseLeave={e => (e.target as HTMLElement).style.color = "#6B6894"}>
            Subjects
          </Link>
          <Link href="#pricing"
            className="font-medium transition-colors text-sm"
            style={{ color: "#6B6894" }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = "#3C3489"}
            onMouseLeave={e => (e.target as HTMLElement).style.color = "#6B6894"}>
            Pricing
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isSignedIn ? (
            <Link href="/dashboard" className="btn-dark text-sm py-2 px-5">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/sign-in"
                className="font-semibold text-sm transition-colors"
                style={{ color: "#3C3489" }}>
                Sign in
              </Link>
              <Link href="/sign-up" className="btn-primary text-sm py-2 px-5">
                Start Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-xl transition-colors"
          style={{ backgroundColor: "transparent" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen
            ? <X size={22} style={{ color: "#3C3489" }} />
            : <Menu size={22} style={{ color: "#3C3489" }} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
            style={{
              backgroundColor: "white",
              borderTop: "1px solid #EDE8FF"
            }}
          >
            <div className="flex flex-col gap-1 p-4">
              {["How it works", "Subjects", "Pricing"].map((label) => (
                <Link
                  key={label}
                  href={`#${label.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl font-medium transition-all text-sm"
                  style={{ color: "#6B6894" }}
                >
                  {label}
                </Link>
              ))}
              <div style={{ borderTop: "1px solid #EDE8FF", margin: "8px 0" }} />
              {isSignedIn ? (
                <Link href="/dashboard" className="btn-dark justify-center">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/sign-in"
                    className="px-4 py-3 font-semibold text-center rounded-xl transition-all text-sm"
                    style={{ color: "#3C3489" }}>
                    Sign in
                  </Link>
                  <Link href="/sign-up" className="btn-primary justify-center">
                    Start Free
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}