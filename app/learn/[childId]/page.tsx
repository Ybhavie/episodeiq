"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Search,
  Star,
  Zap,
  BookOpen,
  FlaskConical,
  Globe,
  Calculator,
  BookMarked,
  Flame,
  Trophy,
  ArrowRight,
  Sparkles,
  LogOut,
} from "lucide-react";
import { clearKidSession } from "@/lib/kidSession";
import { worldGradients } from "@/lib/worlds";

interface Child {
  id: string;
  name: string;
  age: number;
  world: string;
  character_name: string;
  language: string;
  subjects: string[];
  xp: number;
  streak: number;
}

const worldGreetings: Record<string, string> = {
  "Wizard Academy": "The Academy awaits your magic",
  "Space Station": "Mission Control is ready",
  "Detective Agency": "A new case has arrived",
  "Jungle Explorer": "The jungle calls your name",
};

const subjectConfig = [
  { id: "math", label: "Maths", icon: Calculator, color: "#D97706", bg: "#FFF3CD" },
  { id: "science", label: "Science", icon: FlaskConical, color: "#0F766E", bg: "#E6FAF8" },
  { id: "history", label: "History", icon: BookMarked, color: "#B91C1C", bg: "#FFF0F0" },
  { id: "english", label: "English", icon: BookOpen, color: "#7F77DD", bg: "#F0EEFF" },
  { id: "geography", label: "Geography", icon: Globe, color: "#1D9E75", bg: "#E6F7F2" },
  { id: "computers", label: "Computers", icon: Zap, color: "#3C3489", bg: "#EDEAFF" },
];

// Suggested questions by world
const worldQuestions: Record<string, string[]> = {
  "Wizard Academy": [
    "Why do volcanoes erupt?",
    "How does gravity work?",
    "What caused World War 2?",
    "How do plants make food?",
    "What are prime numbers?",
  ],
  "Space Station": [
    "Why is the sky blue?",
    "How far away is the Sun?",
    "What is a black hole?",
    "How do rockets work?",
    "What is the water cycle?",
  ],
  "Detective Agency": [
    "Who was Mahatma Gandhi?",
    "How do our muscles work?",
    "What is the French Revolution?",
    "How does electricity work?",
    "What are fractions?",
  ],
  "Jungle Explorer": [
    "Why do leaves change colour?",
    "What is photosynthesis?",
    "How do animals adapt?",
    "What causes earthquakes?",
    "How does the food chain work?",
  ],
};

interface Episode {
  id: string;
  topic: string;
  title: string;
  completed: boolean;
  score: number | null;
  xpEarned: number;
}

function XPBar({ xp }: { xp: number }) {
  const level = Math.floor(xp / 500) + 1;
  const progress = (xp % 500) / 500;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 rounded-full px-3 py-1"
        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
        <Star size={13} style={{ fill: "#FFD93D", color: "#FFD93D" }} />
        <span className="text-sm font-black text-white">{xp} XP</span>
      </div>
      <div className="flex-1 max-w-[100px]">
        <div className="h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full rounded-full"
            style={{ backgroundColor: "#FFD93D" }}
          />
        </div>
      </div>
      <span className="text-xs text-white font-bold opacity-80">Lv.{level}</span>
    </div>
  );
}

export default function KidHomePage() {
  const params = useParams();
  const router = useRouter();
  const childId = params.childId as string;

  const [child, setChild] = useState<Child | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchChild();
    fetchEpisodes();
  }, [childId]);

  const fetchChild = async () => {
    try {
      const res = await fetch(`/api/children/${childId}`);
      if (!res.ok) {
        router.push("/sign-in");
        return;
      }
      const data = await res.json();
      setChild(data.child);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEpisodes = async () => {
    try {
      const res = await fetch(`/api/episodes?childId=${childId}`);
      if (!res.ok) return;
      const data = await res.json();
      setEpisodes(data.episodes ?? []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (topic?: string) => {
    const searchTopic = topic ?? query.trim();
    if (!searchTopic) return;
    setSearching(true);
    await new Promise((r) => setTimeout(r, 400));
    router.push(
      `/learn/${childId}/generate?topic=${encodeURIComponent(searchTopic)}`
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#FAFAFF" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-t-brand-purple rounded-full animate-spin"
            style={{ border: "3px solid #EDE8FF", borderTopColor: "#7F77DD" }} />
          <p className="text-sm font-semibold" style={{ color: "#6B6894" }}>
            Loading your world...
          </p>
        </div>
      </div>
    );
  }

  if (!child) return null;

  const gradient = worldGradients[child.world] ?? worldGradients["Wizard Academy"];
  const greeting = worldGreetings[child.world] ?? "Your world awaits";
  const suggestions = worldQuestions[child.world] ?? worldQuestions["Wizard Academy"];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAFF" }}>

      {/* Hero header */}
      <div className="relative overflow-hidden pb-24 pt-6 px-4 sm:px-6"
        style={{ background: gradient }}>

        {/* Background stars */}
        {[...Array(12)].map((_, i) => (
          <div key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              backgroundColor: "rgba(255,255,255,0.3)",
              top: `${10 + i * 7}%`,
              left: `${5 + i * 8}%`,
            }} />
        ))}

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="EpisodeIQ" width={30} height={30}
              className="h-8 w-8" />
          </div>

          <div className="flex items-center gap-3">
            <XPBar xp={child.xp ?? 0} />
            <button
              onClick={() => { clearKidSession(); router.push("/sign-in"); }}
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
              <LogOut size={15} className="text-white" />
            </button>
          </div>
        </div>

        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mb-6"
        >
          <p className="text-sm font-semibold mb-1"
            style={{ color: "rgba(255,255,255,0.7)" }}>
            {greeting}
          </p>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome back, {child.name}!
          </h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>
            {child.character_name} · {child.world}
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-6 relative z-10"
        >
          <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
            <BookOpen size={13} className="text-white" />
            <span className="text-xs font-bold text-white">
              {episodes.length} episodes
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
            <Flame size={13} style={{ color: "#FFD93D" }} />
            <span className="text-xs font-bold text-white">
              {child.streak ?? 0} day streak
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
            <Trophy size={13} style={{ color: "#FFD93D" }} />
            <span className="text-xs font-bold text-white">
              Level {Math.floor((child.xp ?? 0) / 500) + 1}
            </span>
          </div>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10"
        >
          <div className="relative">
            <Search size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "#6B6894" }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="What are you confused about today?"
              className="w-full rounded-2xl pl-11 pr-28 py-4 text-base outline-none font-medium"
              style={{
                backgroundColor: "white",
                color: "#1A1744",
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
              }}
            />
            <button
              onClick={() => handleSearch()}
              disabled={!query.trim() || searching}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl font-bold text-sm text-white transition-all"
              style={{
                backgroundColor: query.trim() ? "#3C3489" : "#A89FE8",
              }}>
              {searching ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <div className="flex items-center gap-1">
                  <Sparkles size={14} />
                  Ask
                </div>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Content — overlaps hero */}
      <div className="px-4 sm:px-6 -mt-16 relative z-10 max-w-2xl mx-auto pb-10">

        {/* Suggested questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl p-5 mb-5"
          style={{
            backgroundColor: "white",
            boxShadow: "0 4px 24px rgba(60,52,137,0.12)",
            border: "1px solid #EDE8FF",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} style={{ color: "#7F77DD" }} />
            <span className="text-sm font-black" style={{ color: "#1A1744" }}>
              Try asking...
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {suggestions.map((q, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                onClick={() => handleSearch(q)}
                className="flex items-center justify-between px-4 py-3 rounded-2xl text-left transition-all active:scale-[0.98] group"
                style={{
                  backgroundColor: "#F8F7FF",
                  border: "1px solid #EDE8FF",
                }}>
                <span className="text-sm font-medium" style={{ color: "#1A1744" }}>
                  {q}
                </span>
                <ArrowRight size={14}
                  className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color: "#7F77DD" }} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Subject quick picks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-5"
        >
          <h2 className="text-base font-black mb-3" style={{ color: "#1A1744" }}>
            Explore by subject
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {subjectConfig.map((subject, i) => {
              const Icon = subject.icon;
              return (
                <motion.button
                  key={subject.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.07 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSearch(`Teach me something interesting about ${subject.label}`)}
                  className="rounded-2xl p-4 flex flex-col items-center gap-2 transition-all active:scale-95"
                  style={{
                    backgroundColor: subject.bg,
                    border: `1px solid ${subject.color}30`,
                  }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "white" }}>
                    <Icon size={18} style={{ color: subject.color }} />
                  </div>
                  <span className="text-xs font-bold text-center"
                    style={{ color: "#1A1744" }}>
                    {subject.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Recent episodes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-black" style={{ color: "#1A1744" }}>
              Your episodes
            </h2>
            <span className="text-xs font-semibold" style={{ color: "#7F77DD" }}>
              {episodes.length} total
            </span>
          </div>

          {episodes.length === 0 ? (
            <div className="rounded-3xl p-8 text-center"
              style={{ backgroundColor: "white", border: "2px dashed #EDE8FF" }}>
              <BookOpen size={32} className="mx-auto mb-3" style={{ color: "#A89FE8" }} />
              <p className="text-sm font-semibold mb-1" style={{ color: "#1A1744" }}>
                No episodes yet
              </p>
              <p className="text-xs" style={{ color: "#6B6894" }}>
                Ask a question above to create your first episode!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {episodes.map((ep, i) => (
                <motion.div
                  key={ep.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                >
                  <Link href={`/learn/${childId}/episode/${ep.id}`}
                    className="flex items-center gap-4 rounded-2xl p-4 transition-all active:scale-[0.98]"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #EDE8FF",
                      boxShadow: "0 2px 12px rgba(60,52,137,0.06)",
                    }}>

                    {/* Episode icon */}
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: gradient,
                      }}>
                      <BookOpen size={18} className="text-white" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold truncate"
                        style={{ color: "#1A1744" }}>
                        {ep.topic}
                      </div>
                      {ep.completed && (
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-semibold"
                            style={{ color: "#1D9E75" }}>
                            {ep.score}/3 correct
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col items-end gap-1.5">
                      {ep.completed ? (
                        <div className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#1D9E75" }}>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#EDE8FF" }}>
                          <ArrowRight size={10} style={{ color: "#7F77DD" }} />
                        </div>
                      )}
                      {ep.xpEarned > 0 && (
                        <span className="text-[10px] font-bold"
                          style={{ color: "#D97706" }}>
                          +{ep.xpEarned} XP
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}