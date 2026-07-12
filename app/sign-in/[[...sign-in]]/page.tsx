"use client";

import { useState } from "react";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Gamepad2, ArrowLeft } from "lucide-react";
import { setKidSession } from "@/lib/kidSession";

type Role = null | "parent" | "kid";

function RoleSelector({ onSelect }: { onSelect: (r: "parent" | "kid") => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black mb-2" style={{ color: "#1A1744" }}>
          Welcome back!
        </h1>
        <p className="text-sm" style={{ color: "#6B6894" }}>
          Are you a parent or a kid?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect("parent")}
          className="flex flex-col items-center gap-4 p-6 rounded-3xl transition-all"
          style={{
            backgroundColor: "white",
            border: "2px solid #EDE8FF",
            boxShadow: "0 4px 24px rgba(60,52,137,0.10)",
          }}
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#EDE8FF" }}>
            <Users size={32} style={{ color: "#7F77DD" }} />
          </div>
          <div className="text-center">
            <div className="font-black text-lg mb-1" style={{ color: "#1A1744" }}>Parent</div>
            <div className="text-xs" style={{ color: "#6B6894" }}>Sign in with email</div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect("kid")}
          className="flex flex-col items-center gap-4 p-6 rounded-3xl transition-all"
          style={{
            backgroundColor: "white",
            border: "2px solid #EDE8FF",
            boxShadow: "0 4px 24px rgba(60,52,137,0.10)",
          }}
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#FFF3CD" }}>
            <Gamepad2 size={32} style={{ color: "#D97706" }} />
          </div>
          <div className="text-center">
            <div className="font-black text-lg mb-1" style={{ color: "#1A1744" }}>Kid</div>
            <div className="text-xs" style={{ color: "#6B6894" }}>Enter your name + PIN</div>
          </div>
        </motion.button>
      </div>

      <p className="text-center text-xs mt-6" style={{ color: "#6B6894" }}>
        New here?{" "}
        <Link href="/sign-up" className="font-semibold" style={{ color: "#7F77DD" }}>
          Create an account
        </Link>
      </p>
    </motion.div>
  );
}

function KidSignIn() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!name || pin.length < 4) {
      setError("Please enter your name and 4-digit PIN");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/kid-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, pin }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }
      setKidSession({ childId: data.childId, name: data.name });
      router.push(`/learn/${data.childId}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "#FFF3CD" }}>
          <Gamepad2 size={36} style={{ color: "#D97706" }} />
        </div>
        <h1 className="text-2xl font-black mb-2" style={{ color: "#1A1744" }}>
          Hi there, explorer!
        </h1>
        <p className="text-sm" style={{ color: "#6B6894" }}>
          Enter your name and PIN to continue your adventure
        </p>
      </div>

      <div className="rounded-3xl p-6 space-y-4"
        style={{
          backgroundColor: "white",
          boxShadow: "0 4px 24px rgba(60,52,137,0.10)",
          border: "1px solid #EDE8FF"
        }}>
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1744" }}>
            Your name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            placeholder="e.g. Arjun"
            className="w-full rounded-2xl px-4 py-3 text-lg font-semibold outline-none transition-all"
            style={{
              backgroundColor: "#F0EEFF",
              border: "2px solid #EDE8FF",
              color: "#3C3489",
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1744" }}>
            Your 4-digit PIN
          </label>
          <input
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError(""); }}
            placeholder="••••"
            className="w-full text-center text-3xl font-black rounded-2xl px-4 py-3 outline-none tracking-widest transition-all"
            style={{
              backgroundColor: "#F0EEFF",
              border: "2px solid #EDE8FF",
              color: "#3C3489",
            }}
          />
        </div>

        {error && (
          <p className="text-xs text-center" style={{ color: "#FF6B6B" }}>{error}</p>
        )}

        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl font-bold text-white transition-all text-lg flex items-center justify-center gap-2"
          style={{ backgroundColor: "#3C3489" }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            "Let's go!"
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default function SignInPage() {
  const [role, setRole] = useState<Role>(null);

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#FAFAFF" }}>

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3C3489 0%, #4A3FA0 100%)" }}>

        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: "rgba(127,119,221,0.2)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: "rgba(78,205,196,0.15)" }} />

        <Link href="/" className="flex items-center gap-2 relative z-10">
          <Image src="/logo.png" alt="EpisodeIQ" width={44} height={44} className="h-11 w-11" />
          <span className="text-2xl font-black">
            <span style={{ color: "white" }}>Episode</span>
            <span style={{ color: "#A89FE8" }}>IQ</span>
          </span>
        </Link>

        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-black text-white leading-tight">
            Welcome back.
            <br />
            <span style={{ color: "#A89FE8" }}>Your kids</span>
            <br />
            are waiting.
          </h2>
          <p className="text-lg" style={{ color: "rgba(255,255,255,0.7)" }}>
            New episodes. New XP. New things to discover today.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "18,000+", label: "Episodes generated" },
              { value: "94%", label: "Quiz pass rate" },
              { value: "4.9/5", label: "Parent rating" },
              { value: "5", label: "Languages" },
            ].map((stat, i) => (
              <div key={i} className="rounded-2xl p-4"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.10)"
                }}>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs relative z-10" style={{ color: "rgba(255,255,255,0.4)" }}>
          COPPA compliant · Built for children's privacy · No ads ever
        </p>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12">

        <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <Image src="/logo.png" alt="EpisodeIQ" width={40} height={40} className="h-10 w-10" />
          <span className="text-xl font-black">
            <span style={{ color: "#3C3489" }}>Episode</span>
            <span style={{ color: "#7F77DD" }}>IQ</span>
          </span>
        </Link>

        {role !== null && (
          <button
            onClick={() => setRole(null)}
            className="self-start mb-6 flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#6B6894" }}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        )}

        <AnimatePresence mode="wait">
          {role === null && (
            <motion.div key="selector" className="w-full flex justify-center">
              <RoleSelector onSelect={setRole} />
            </motion.div>
          )}

          {role === "parent" && (
            <motion.div
              key="parent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md"
            >
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4"
                  style={{ backgroundColor: "#EDE8FF" }}>
                  <Users size={14} style={{ color: "#7F77DD" }} />
                  <span className="text-xs font-bold" style={{ color: "#7F77DD" }}>
                    Parent login
                  </span>
                </div>
                <h1 className="text-2xl font-black mb-1" style={{ color: "#1A1744" }}>
                  Sign in to your account
                </h1>
                <p className="text-sm" style={{ color: "#6B6894" }}>
                  Welcome back — your child's learning journey continues.
                </p>
              </div>

              <SignIn
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-0 p-0 bg-transparent",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton:
                      "border border-[#EDE8FF] rounded-xl font-semibold hover:bg-[#F0EEFF] transition-all",
                    formButtonPrimary:
                      "bg-[#3C3489] hover:bg-[#4A3FA0] rounded-xl font-semibold py-3 transition-all",
                    formFieldInput:
                      "rounded-xl border-[#EDE8FF] focus:border-[#7F77DD] text-[#1A1744]",
                    formFieldLabel: "text-[#1A1744] font-medium text-sm",
                    footerActionLink: "text-[#7F77DD] font-semibold hover:text-[#3C3489]",
                  },
                  variables: {
                    colorPrimary: "#3C3489",
                    colorBackground: "#FAFAFF",
                    borderRadius: "12px",
                    fontFamily: "Inter, system-ui, sans-serif",
                  },
                }}
              />
            </motion.div>
          )}

          {role === "kid" && (
            <motion.div key="kid" className="w-full flex justify-center">
              <KidSignIn />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}