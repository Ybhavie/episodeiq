"use client";

import { useState } from "react";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Gamepad2, ArrowLeft, Shield, Star } from "lucide-react";

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
          Who's joining EpisodeIQ?
        </h1>
        <p className="text-sm" style={{ color: "#6B6894" }}>
          Choose your role to get started
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Parent */}
        <motion.button
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect("parent")}
          className="flex flex-col items-center gap-4 p-6 rounded-3xl text-left transition-all"
          style={{
            backgroundColor: "white",
            border: "2px solid #EDE8FF",
            boxShadow: "0 4px 24px rgba(60,52,137,0.10)",
          }}
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#EDE8FF" }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="12" r="7" fill="#7F77DD"/>
              <circle cx="18" cy="12" r="5" fill="#FBBF8C"/>
              <circle cx="15" cy="11" r="1.2" fill="#1A1744"/>
              <circle cx="21" cy="11" r="1.2" fill="#1A1744"/>
              <path d="M15 14 Q18 16.5 21 14" stroke="#1A1744" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              <path d="M8 28 Q8 36 18 37 Q28 36 28 28 Q28 22 18 22 Q8 22 8 28Z" fill="#7F77DD"/>
              <rect x="15" y="25" width="6" height="4" rx="1" fill="white" opacity="0.5"/>
            </svg>
          </div>
          <div>
            <div className="font-black text-lg mb-1" style={{ color: "#1A1744" }}>
              I'm a Parent
            </div>
            <div className="text-xs leading-relaxed" style={{ color: "#6B6894" }}>
              Create an account and set up your child's learning profile
            </div>
          </div>
          <div className="w-full flex items-center gap-1.5 rounded-xl px-3 py-2"
            style={{ backgroundColor: "#F0EEFF" }}>
            <Shield size={12} style={{ color: "#7F77DD" }} />
            <span className="text-xs font-semibold" style={{ color: "#7F77DD" }}>
              COPPA compliant
            </span>
          </div>
        </motion.button>

        {/* Kid */}
        <motion.button
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect("kid")}
          className="flex flex-col items-center gap-4 p-6 rounded-3xl text-left transition-all"
          style={{
            backgroundColor: "white",
            border: "2px solid #EDE8FF",
            boxShadow: "0 4px 24px rgba(60,52,137,0.10)",
          }}
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#FFF3CD" }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="13" r="8" fill="#FBBF8C"/>
              <path d="M11 8 Q18 2 25 8" stroke="#FFD93D" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <circle cx="15" cy="12" r="1.5" fill="#1A1744"/>
              <circle cx="21" cy="12" r="1.5" fill="#1A1744"/>
              <circle cx="15.6" cy="11.4" r="0.5" fill="white"/>
              <circle cx="21.6" cy="11.4" r="0.5" fill="white"/>
              <path d="M15 16 Q18 19 21 16" stroke="#1A1744" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              <path d="M9 28 Q9 36 18 37 Q27 36 27 28 Q27 22 18 22 Q9 22 9 28Z" fill="#FFD93D"/>
              <circle cx="18" cy="26" r="3" fill="white"/>
            </svg>
          </div>
          <div>
            <div className="font-black text-lg mb-1" style={{ color: "#1A1744" }}>
              I'm a Kid
            </div>
            <div className="text-xs leading-relaxed" style={{ color: "#6B6894" }}>
              Enter the join code your parent gave you to start learning
            </div>
          </div>
          <div className="w-full flex items-center gap-1.5 rounded-xl px-3 py-2"
            style={{ backgroundColor: "#FFF3CD" }}>
            <Star size={12} style={{ color: "#D97706" }} />
            <span className="text-xs font-semibold" style={{ color: "#D97706" }}>
              Need a join code
            </span>
          </div>
        </motion.button>
      </div>

      <p className="text-center text-xs mt-6" style={{ color: "#6B6894" }}>
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold" style={{ color: "#7F77DD" }}>
          Sign in here
        </Link>
      </p>
    </motion.div>
  );
}

function KidJoinForm() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleJoin = () => {
    if (code.length < 6) {
      setError("Please enter a valid 6-digit join code");
      return;
    }
    // TODO: validate code against Supabase
    setError("This feature coming soon. Ask your parent to sign up first!");
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
          Enter your join code
        </h1>
        <p className="text-sm" style={{ color: "#6B6894" }}>
          Ask your parent for the 6-digit code from their dashboard
        </p>
      </div>

      <div className="rounded-3xl p-6"
        style={{
          backgroundColor: "white",
          boxShadow: "0 4px 24px rgba(60,52,137,0.10)",
          border: "1px solid #EDE8FF"
        }}>

        <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1744" }}>
          Join Code
        </label>
        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError("");
          }}
          placeholder="ABC123"
          className="w-full text-center text-3xl font-black tracking-[0.5em] rounded-2xl px-4 py-4 outline-none transition-all"
          style={{
            backgroundColor: "#F0EEFF",
            border: "2px solid #EDE8FF",
            color: "#3C3489",
            letterSpacing: "0.4em",
          }}
        />

        {error && (
          <p className="text-xs mt-2 text-center" style={{ color: "#FF6B6B" }}>
            {error}
          </p>
        )}

        <button
          onClick={handleJoin}
          className="w-full mt-4 py-3.5 rounded-2xl font-bold text-white transition-all"
          style={{ backgroundColor: "#3C3489" }}
        >
          Join Now
        </button>

        <div className="mt-4 rounded-2xl p-4 text-center"
          style={{ backgroundColor: "#F0EEFF" }}>
          <p className="text-xs" style={{ color: "#6B6894" }}>
            Don't have a code yet?{" "}
            <span className="font-semibold" style={{ color: "#7F77DD" }}>
              Ask your parent to sign up at episodeiq.com
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function SignUpPage() {
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
            Your child's own
            <br />
            <span style={{ color: "#A89FE8" }}>learning universe</span>
            <br />
            starts here.
          </h2>
          <p className="text-lg" style={{ color: "rgba(255,255,255,0.7)" }}>
            Set up takes 2 minutes. First episode ready in 30 seconds.
          </p>

          <div className="space-y-3">
            {[
              "Personalised animated video lessons",
              "Set in your child's own story world",
              "Quiz + XP system keeps them engaged",
              "Works in English, Hindi, Tamil, Marathi & Konkani",
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(29,158,117,0.3)" }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4 7L8 3" stroke="#1D9E75" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>{f}</span>
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

        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <Image src="/logo.png" alt="EpisodeIQ" width={40} height={40} className="h-10 w-10" />
          <span className="text-xl font-black">
            <span style={{ color: "#3C3489" }}>Episode</span>
            <span style={{ color: "#7F77DD" }}>IQ</span>
          </span>
        </Link>

        {/* Back button */}
        {role !== null && (
          <button
            onClick={() => setRole(null)}
            className="self-start mb-6 flex items-center gap-2 text-sm font-semibold transition-colors"
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
                    Parent account
                  </span>
                </div>
                <h1 className="text-2xl font-black mb-1" style={{ color: "#1A1744" }}>
                  Create your account
                </h1>
                <p className="text-sm" style={{ color: "#6B6894" }}>
                  You'll add your child's profile right after signing up.
                </p>
              </div>

              <SignUp
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
              <KidJoinForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}