"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Play, Star, Zap, BookOpen } from "lucide-react";

// SVG cartoon characters for floating cards
function ScientistChar() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="12" r="7" fill="#FBBF8C"/>
      <rect x="10" y="5" width="12" height="3" rx="1.5" fill="white"/>
      <circle cx="13" cy="12" r="1.5" fill="#1A1744"/>
      <circle cx="19" cy="12" r="1.5" fill="#1A1744"/>
      <circle cx="13.5" cy="11.5" r="0.5" fill="white"/>
      <circle cx="19.5" cy="11.5" r="0.5" fill="white"/>
      <path d="M13 15 Q16 17.5 19 15" stroke="#1A1744" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M9 19 Q9 27 16 28 Q23 27 23 19 L20 18 L16 19 L12 18 Z" fill="#4ECDC4"/>
      <rect x="14" y="20" width="4" height="3" rx="0.5" fill="white"/>
    </svg>
  );
}

function VolcanoChar() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="12" r="7" fill="#FBBF8C"/>
      <path d="M10 6 Q16 2 22 6" stroke="#8B5E3C" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <rect x="9" y="6" width="14" height="2" rx="1" fill="#A0522D"/>
      <circle cx="13" cy="12" r="1.5" fill="#1A1744"/>
      <circle cx="19" cy="12" r="1.5" fill="#1A1744"/>
      <circle cx="13.5" cy="11.5" r="0.5" fill="white"/>
      <circle cx="19.5" cy="11.5" r="0.5" fill="white"/>
      <path d="M13 15 Q16 17.5 19 15" stroke="#1A1744" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M9 19 Q9 27 16 28 Q23 27 23 19 L20 18 L16 19 L12 18 Z" fill="#1D9E75"/>
    </svg>
  );
}

function PlantChar() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="12" r="7" fill="#FBBF8C"/>
      <circle cx="13" cy="12" r="1.5" fill="#1A1744"/>
      <circle cx="19" cy="12" r="1.5" fill="#1A1744"/>
      <circle cx="13.5" cy="11.5" r="0.5" fill="white"/>
      <circle cx="19.5" cy="11.5" r="0.5" fill="white"/>
      <path d="M13 15 Q16 18 19 15" stroke="#1A1744" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M9 19 Q9 27 16 28 Q23 27 23 19 L20 18 L16 19 L12 18 Z" fill="#7F77DD"/>
      <path d="M12 5 Q10 2 8 4 Q10 6 12 5Z" fill="#1D9E75"/>
      <path d="M16 4 Q16 1 19 2 Q18 5 16 4Z" fill="#1D9E75"/>
      <path d="M20 5 Q22 2 24 4 Q22 6 20 5Z" fill="#1D9E75"/>
    </svg>
  );
}

function KnightChar() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="10" y="5" width="12" height="13" rx="6" fill="#A89FE8"/>
      <rect x="10" y="5" width="12" height="13" rx="6" stroke="#3C3489" strokeWidth="1.5" fill="none"/>
      <rect x="11" y="10" width="10" height="5" rx="1" fill="#4ECDC4" opacity="0.7"/>
      <circle cx="13" cy="12" r="1.2" fill="#1A1744"/>
      <circle cx="19" cy="12" r="1.2" fill="#1A1744"/>
      <path d="M9 19 Q9 27 16 28 Q23 27 23 19 L20 18 L16 19 L12 18 Z" fill="#3C3489"/>
      <rect x="14" y="19" width="4" height="5" rx="0.5" fill="#7F77DD"/>
      <line x1="25" y1="14" x2="30" y2="8" stroke="#A89FE8" strokeWidth="2" strokeLinecap="round"/>
      <rect x="28" y="6" width="3" height="5" rx="0.5" fill="#A89FE8"/>
    </svg>
  );
}

const floatingCards = [
  {
    title: "Why is the sky blue?",
    subject: "Science",
    CardChar: ScientistChar,
    borderColor: "#99F6E4",
    bgColor: "#F0FDF9",
    subjectColor: "#0F766E",
    delay: 0,
    x: "left-[5%]",
    y: "top-[20%]",
    animation: "animate-float-slow",
  },
  {
    title: "How do volcanoes erupt?",
    subject: "Geography",
    CardChar: VolcanoChar,
    borderColor: "#FED7AA",
    bgColor: "#FFF7ED",
    subjectColor: "#C2410C",
    delay: 1,
    x: "right-[4%]",
    y: "top-[15%]",
    animation: "animate-float",
  },
  {
    title: "What is photosynthesis?",
    subject: "Science",
    CardChar: PlantChar,
    borderColor: "#BBF7D0",
    bgColor: "#F0FDF4",
    subjectColor: "#15803D",
    delay: 2,
    x: "left-[2%]",
    y: "bottom-[20%]",
    animation: "animate-float-fast",
  },
  {
    title: "Who was Shivaji Maharaj?",
    subject: "History",
    CardChar: KnightChar,
    borderColor: "#FECACA",
    bgColor: "#FEF2F2",
    subjectColor: "#B91C1C",
    delay: 0.5,
    x: "right-[3%]",
    y: "bottom-[25%]",
    animation: "animate-float-slow",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ background: "radial-gradient(ellipse at 60% 0%, #EDE8FF 0%, #FAFAFF 60%)" }}>

      {/* Background glow blobs */}
      <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl pointer-events-none animate-pulse-glow"
        style={{ backgroundColor: "rgba(127,119,221,0.10)" }} />
      <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "rgba(78,205,196,0.10)" }} />
      <div className="absolute top-[30%] right-[5%] w-[250px] h-[250px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "rgba(255,217,61,0.10)" }} />

      {/* Floating cards */}
      <div className="hidden lg:block">
        {floatingCards.map((card, i) => {
          const CardChar = card.CardChar;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + card.delay * 0.3, duration: 0.5 }}
              className={`absolute ${card.x} ${card.y} ${card.animation}`}
            >
              <div className="rounded-2xl px-4 py-3 max-w-[190px]"
                style={{
                  backgroundColor: card.bgColor,
                  border: `2px solid ${card.borderColor}`,
                  boxShadow: "0 4px 24px rgba(60,52,137,0.10)"
                }}>
                <div className="flex items-center gap-2 mb-1">
                  <CardChar />
                  <span className="text-xs font-bold" style={{ color: card.subjectColor }}>
                    {card.subject}
                  </span>
                </div>
                <p className="text-xs font-medium leading-snug" style={{ color: "#1A1744" }}>
                  {card.title}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: "#1D9E75" }} />
                  <span className="text-[10px]" style={{ color: "#6B6894" }}>
                    Episode ready
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main content */}
      <div className="container-main px-4 sm:px-6 lg:px-8 mx-auto text-center relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          {/* Top badge */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                backgroundColor: "white",
                border: "1px solid rgba(168,159,232,0.4)",
                boxShadow: "0 4px 24px rgba(60,52,137,0.10)"
              }}>
              <Sparkles size={14} style={{ color: "#7F77DD" }} />
              <span className="text-sm font-semibold" style={{ color: "#3C3489" }}>
                AI-powered lessons for kids aged 9–12
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "#FFD93D", color: "#713F12" }}>
                NEW
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={item} className="max-w-4xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight"
              style={{ color: "#1A1744" }}>
              Every confused kid
              <br />
              <span className="text-gradient">deserves a</span>
              <br />
              <span className="text-gradient">real answer</span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p variants={item}
            className="text-lg sm:text-xl max-w-2xl leading-relaxed"
            style={{ color: "#6B6894" }}>
            EpisodeIQ turns any question into a{" "}
            <span className="font-semibold" style={{ color: "#3C3489" }}>
              clear, real explanation
            </span>
            {" "}— with visuals, key facts, and a quiz to lock it in, ready in seconds.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 items-center">
            <Link href="/sign-up" className="btn-dark text-base px-8 py-4 rounded-2xl"
              style={{ boxShadow: "0 0 80px rgba(127,119,221,0.35)" }}>
              <Sparkles size={18} />
              Start Learning Free
            </Link>
            <Link href="#how-it-works" className="btn-secondary text-base px-8 py-4 rounded-2xl">
              <Play size={16} style={{ color: "#7F77DD" }} />
              See how it works
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={item}
            className="flex flex-wrap items-center justify-center gap-6 text-sm pt-2"
            style={{ color: "#6B6894" }}>
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2">
                {["A", "R", "S", "D"].map((letter, i) => (
                  <div key={i}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      backgroundColor: ["#7F77DD","#1D9E75","#FF6B6B","#4ECDC4"][i],
                      border: "2px solid white"
                    }}>
                    {letter}
                  </div>
                ))}
              </div>
              <span className="font-medium" style={{ color: "#1A1744" }}>2,400+ kids learning</span>
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={14} style={{ fill: "#FFD93D", color: "#FFD93D" }} />
              ))}
              <span className="ml-1 font-medium" style={{ color: "#1A1744" }}>4.9/5 from parents</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap size={14} style={{ color: "#1D9E75" }} />
              <span>No app install needed</span>
            </div>
          </motion.div>

          {/* Demo mockup */}
          <motion.div variants={item} className="relative w-full max-w-3xl mt-4">
            <div className="card p-3" style={{ boxShadow: "0 0 80px rgba(127,119,221,0.35)" }}>
              {/* Browser bar */}
              <div className="rounded-2xl px-4 py-2.5 flex items-center gap-2 mb-3"
                style={{ backgroundColor: "#EDE8FF" }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "rgba(255,107,107,0.6)" }}/>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "rgba(255,217,61,0.6)" }}/>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "rgba(29,158,117,0.6)" }}/>
                </div>
                <div className="flex-1 bg-white rounded-lg px-3 py-1 text-xs text-center"
                  style={{ color: "#6B6894" }}>
                  episodeiq.com/learn
                </div>
              </div>

              {/* Lesson screen */}
              <div className="rounded-2xl p-6 sm:p-10 text-white relative overflow-hidden min-h-[200px] flex flex-col items-center justify-center gap-4"
                style={{ background: "linear-gradient(135deg, #3C3489 0%, #4A3FA0 100%)" }}>

                <div className="w-16 h-16 rounded-3xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                  <Sparkles size={30} className="text-white" />
                </div>

                <div className="text-center">
                  <div className="text-xs font-semibold mb-1 uppercase tracking-widest"
                    style={{ color: "#A89FE8" }}>
                    Science
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    Why does the Moon have craters?
                  </h3>
                  <p className="text-sm max-w-md" style={{ color: "rgba(255,255,255,0.7)" }}>
                    Rocks from space called meteorites crashed into the Moon billions of years ago — and with no wind or rain to wear them away, those craters are still there today.
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full max-w-sm rounded-full h-2"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "45%" }}
                    transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
                    className="h-2 rounded-full"
                    style={{ backgroundColor: "#FFD93D" }}
                  />
                </div>

                {/* Episode badge */}
                <div className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                  style={{ backgroundColor: "rgba(255,217,61,0.9)", color: "#713F12" }}>
                  <BookOpen size={10} />
                  Episode 12
                </div>
              </div>
            </div>

            {/* XP badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 6 }}
              transition={{ delay: 1.8, duration: 0.4, type: "spring" }}
              className="absolute -bottom-4 -right-4 rounded-2xl px-3 py-2"
              style={{
                backgroundColor: "white",
                border: "2px solid #FFD93D",
                boxShadow: "0 4px 24px rgba(60,52,137,0.10)"
              }}>
              <div className="flex items-center gap-1">
                <Star size={12} style={{ fill: "#FFD93D", color: "#FFD93D" }} />
                <span className="text-xs font-bold" style={{ color: "#92400E" }}>
                  +50 XP earned!
                </span>
              </div>
            </motion.div>

            {/* Quiz badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              transition={{ delay: 2, duration: 0.4, type: "spring" }}
              className="absolute -bottom-4 -left-4 rounded-2xl px-3 py-2"
              style={{
                backgroundColor: "white",
                border: "2px solid rgba(29,158,117,0.5)",
                boxShadow: "0 4px 24px rgba(60,52,137,0.10)"
              }}>
              <span className="text-xs font-bold" style={{ color: "#065F46" }}>
                Quiz: 3/3 correct
              </span>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}