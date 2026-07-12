"use client";

import { motion } from "framer-motion";
import { Search, Wand2, PlayCircle, Trophy } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Kid asks a question",
    description: "Your child types anything they're confused about — 'Why do stars twinkle?' or 'How does gravity work?' — in plain simple words.",
    color: "#EDE8FF",
    iconColor: "#7F77DD",
    number: "01",
    delay: 0,
    character: "detective",
  },
  {
    icon: Wand2,
    title: "AI builds their episode",
    description: "Our AI writes a full script set in their chosen world — Wizard Academy, Space Station, or Jungle Explorer — with their own character as the hero.",
    color: "#FFF8DC",
    iconColor: "#D4A017",
    number: "02",
    delay: 0.15,
    character: "wizard",
  },
  {
    icon: PlayCircle,
    title: "Watch the animated lesson",
    description: "A personalised animated video plays instantly — narrated in their language, with diagrams that build themselves and characters that explain everything.",
    color: "#E0FAF4",
    iconColor: "#1D9E75",
    number: "03",
    delay: 0.3,
    character: "astronaut",
  },
  {
    icon: Trophy,
    title: "Quiz, earn XP, level up",
    description: "After watching, a quick 3-question quiz awards XP points. Wrong answers get a 30-second re-explanation. Parents get a weekly report every Sunday.",
    color: "#FFE8E8",
    iconColor: "#FF6B6B",
    number: "04",
    delay: 0.45,
    character: "explorer",
  },
];

// SVG cartoon character illustrations
function DetectiveChar() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Body */}
      <circle cx="24" cy="18" r="10" fill="#FBBF8C"/>
      {/* Hat */}
      <rect x="14" y="10" width="20" height="4" rx="2" fill="#3C3489"/>
      <rect x="17" y="6" width="14" height="6" rx="2" fill="#3C3489"/>
      {/* Eyes */}
      <circle cx="20" cy="18" r="2" fill="#1A1744"/>
      <circle cx="28" cy="18" r="2" fill="#1A1744"/>
      <circle cx="20.7" cy="17.3" r="0.7" fill="white"/>
      <circle cx="28.7" cy="17.3" r="0.7" fill="white"/>
      {/* Smile */}
      <path d="M20 22 Q24 25 28 22" stroke="#1A1744" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Coat */}
      <path d="M14 28 Q14 38 24 40 Q34 38 34 28 L30 26 L24 28 L18 26 Z" fill="#3C3489"/>
      {/* Magnifying glass */}
      <circle cx="36" cy="34" r="5" stroke="#7F77DD" strokeWidth="2" fill="none"/>
      <line x1="39.5" y1="37.5" x2="43" y2="41" stroke="#7F77DD" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function WizardChar() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Hat */}
      <polygon points="24,4 16,20 32,20" fill="#7F77DD"/>
      <rect x="13" y="20" width="22" height="4" rx="2" fill="#A89FE8"/>
      {/* Star on hat */}
      <polygon points="24,8 25,11 28,11 25.5,13 26.5,16 24,14.5 21.5,16 22.5,13 20,11 23,11" fill="#FFD93D"/>
      {/* Face */}
      <circle cx="24" cy="30" r="9" fill="#FBBF8C"/>
      {/* Eyes */}
      <circle cx="21" cy="29" r="1.8" fill="#1A1744"/>
      <circle cx="27" cy="29" r="1.8" fill="#1A1744"/>
      <circle cx="21.6" cy="28.4" r="0.6" fill="white"/>
      <circle cx="27.6" cy="28.4" r="0.6" fill="white"/>
      {/* Beard */}
      <path d="M18 34 Q24 40 30 34" stroke="#E2D9F3" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Wand */}
      <line x1="34" y1="24" x2="44" y2="34" stroke="#3C3489" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="34" cy="24" r="2.5" fill="#FFD93D"/>
    </svg>
  );
}

function AstronautChar() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Helmet outer */}
      <circle cx="24" cy="20" r="13" fill="#E8E4FF"/>
      <circle cx="24" cy="20" r="13" stroke="#7F77DD" strokeWidth="2" fill="none"/>
      {/* Visor */}
      <path d="M15 17 Q24 26 33 17" fill="#4ECDC4" opacity="0.6"/>
      <path d="M15 17 Q24 26 33 17" stroke="#3C3489" strokeWidth="1.5" fill="none"/>
      {/* Face inside helmet */}
      <circle cx="21" cy="19" r="1.8" fill="#1A1744"/>
      <circle cx="27" cy="19" r="1.8" fill="#1A1744"/>
      <circle cx="21.6" cy="18.4" r="0.6" fill="white"/>
      <circle cx="27.6" cy="18.4" r="0.6" fill="white"/>
      <path d="M20 23 Q24 26 28 23" stroke="#1A1744" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Suit body */}
      <path d="M13 31 Q13 42 24 44 Q35 42 35 31 L31 29 L24 31 L17 29 Z" fill="#A89FE8"/>
      {/* Suit details */}
      <rect x="21" y="33" width="6" height="4" rx="1" fill="#7F77DD"/>
      {/* Oxygen tanks */}
      <rect x="9" y="30" width="4" height="8" rx="2" fill="#7F77DD"/>
      <rect x="35" y="30" width="4" height="8" rx="2" fill="#7F77DD"/>
    </svg>
  );
}

function ExplorerChar() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Hat */}
      <path d="M12 18 Q24 10 36 18" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <rect x="11" y="18" width="26" height="3" rx="1.5" fill="#A0522D"/>
      {/* Face */}
      <circle cx="24" cy="26" r="10" fill="#FBBF8C"/>
      {/* Eyes */}
      <circle cx="21" cy="25" r="2" fill="#1A1744"/>
      <circle cx="27" cy="25" r="2" fill="#1A1744"/>
      <circle cx="21.7" cy="24.3" r="0.7" fill="white"/>
      <circle cx="27.7" cy="24.3" r="0.7" fill="white"/>
      {/* Smile */}
      <path d="M20 29 Q24 33 28 29" stroke="#1A1744" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Shirt */}
      <path d="M14 35 Q14 44 24 46 Q34 44 34 35 L30 33 L24 35 L18 33 Z" fill="#1D9E75"/>
      {/* Binoculars */}
      <rect x="30" y="30" width="5" height="4" rx="1.5" fill="#3C3489"/>
      <rect x="36" y="30" width="5" height="4" rx="1.5" fill="#3C3489"/>
      <line x1="35" y1="32" x2="36" y2="32" stroke="#7F77DD" strokeWidth="1.5"/>
    </svg>
  );
}

const characters = [DetectiveChar, WizardChar, AstronautChar, ExplorerChar];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-white">
      <div className="container-main mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-surface border border-brand-light/30 rounded-full px-4 py-1.5 mb-4"
            style={{ backgroundColor: "#F0EEFF", border: "1px solid rgba(168,159,232,0.3)" }}>
            <span className="text-sm font-semibold" style={{ color: "#7F77DD" }}>
              How EpisodeIQ works
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: "#1A1744" }}>
            From confused to{" "}
            <span className="text-gradient">confident</span>
            {" "}in 4 steps
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6B6894" }}>
            No teacher needed. No app to install. Just a question and a world of learning waiting.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const CharComponent = characters[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: step.delay }}
                whileHover={{ y: -6 }}
                className="card p-6 flex flex-col gap-4 relative overflow-hidden group"
              >
                {/* Step number watermark */}
                <div className="absolute -top-3 -right-2 text-7xl font-black select-none pointer-events-none transition-colors duration-300"
                  style={{ color: "#EDE8FF" }}>
                  {step.number}
                </div>

                {/* Character illustration */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: step.color }}
                >
                  <CharComponent />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#1A1744" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B6894" }}>
                    {step.description}
                  </p>
                </div>

                {/* Connector arrow */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                      style={{ border: "2px solid #EDE8FF" }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5H8M8 5L5.5 2.5M8 5L5.5 7.5"
                          stroke="#7F77DD" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: "radial-gradient(ellipse at 60% 0%, #EDE8FF 0%, #FAFAFF 60%)",
            border: "1px solid rgba(168,159,232,0.2)"
          }}
        >
          <div>
            <h3 className="text-xl font-bold mb-1" style={{ color: "#3C3489" }}>
              Works in 5 languages
            </h3>
            <p className="text-sm" style={{ color: "#6B6894" }}>
              Kids learn best in their own language
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {["English", "Hindi", "Tamil", "Marathi", "Konkani"].map((lang) => (
              <span key={lang}
                className="text-sm font-semibold px-4 py-2 rounded-full"
                style={{
                  backgroundColor: "white",
                  border: "1px solid rgba(168,159,232,0.3)",
                  color: "#3C3489",
                  boxShadow: "0 4px 24px rgba(60,52,137,0.10)"
                }}>
                {lang}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}