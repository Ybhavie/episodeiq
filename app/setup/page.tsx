"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";
import { WorldCharacter } from "@/components/WorldCharacter";

// Step types
type Step = 1 | 2 | 3 | 4;

interface ChildData {
  name: string;
  age: string;
  grade: string;
  language: string;
  board: string;
  world: string;
  characterName: string;
  subjects: string[];
}
// Story worlds
const worlds = [
  {
    id: "wizard",
    name: "Wizard Academy",
    description: "Learn magic spells that are actually science, history and math concepts",
    gradient: "linear-gradient(135deg, #3C3489 0%, #7F77DD 100%)",
    character: <WorldCharacter world="Wizard Academy" />,
  },
  {
    id: "space",
    name: "Space Station",
    description: "Explore the universe as an astronaut solving cosmic mysteries",
    gradient: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
    character: <WorldCharacter world="Space Station" />,
  },
  {
    id: "detective",
    name: "Detective Agency",
    description: "Solve mysteries that secretly teach critical thinking and reasoning",
    gradient: "linear-gradient(135deg, #1A1744 0%, #3C3489 100%)",
    character: <WorldCharacter world="Detective Agency" />,
  },
  {
    id: "jungle",
    name: "Jungle Explorer",
    description: "Trek through adventures that reveal secrets of nature and geography",
    gradient: "linear-gradient(135deg, #1D9E75 0%, #0F6B4F 100%)",
    character: <WorldCharacter world="Jungle Explorer" />,
  },
];

const subjects = [
  { id: "math", label: "Mathematics", icon: "📐", color: "#FFD93D", bg: "#FFF9E6" },
  { id: "science", label: "Science", icon: "🔬", color: "#4ECDC4", bg: "#E6FAF8" },
  { id: "history", label: "History", icon: "📜", color: "#FF6B6B", bg: "#FFF0F0" },
  { id: "english", label: "English", icon: "📚", color: "#7F77DD", bg: "#F0EEFF" },
  { id: "geography", label: "Geography", icon: "🌍", color: "#1D9E75", bg: "#E6F7F2" },
  { id: "computers", label: "Computers", icon: "💻", color: "#3C3489", bg: "#EDEAFF" },
];

const languages = ["English", "Hindi", "Tamil", "Marathi", "Konkani"];
const grades = ["3rd", "4th", "5th", "6th", "7th", "8th"];

const stepTitles = [
  "About your child",
  "Choose a world",
  "Name their character",
  "Pick subjects",
];

export default function SetupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<ChildData>({
    name: "",
    age: "",
    grade: "",
    language: "English",
    board: "NCERT",
    world: "",
    characterName: "",
    subjects: [],
  });
  const [saving, setSaving] = useState(false);

  const canNext = () => {
    if (step === 1) return data.name.trim() && data.age && data.grade && data.language;
    if (step === 2) return data.world !== "";
    if (step === 3) return data.characterName.trim().length >= 2;
    if (step === 4) return data.subjects.length >= 1;
    return false;
  };

  const handleNext = () => {
    if (step < 4) setStep((s) => (s + 1) as Step);
    else handleFinish();
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

 const handleFinish = async () => {
    setSaving(true);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch("/api/children", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          age: data.age,
          grade: data.grade,
          world: data.world,
          character_name: data.characterName,
          language: data.language,
          subjects: data.subjects,
          board: data.board,
        }),
        signal: controller.signal,
        cache: "no-store",
      });

      if (!res.ok) {
        let message = "Something went wrong";
        try {
          const err = await res.json();
          message = err.error ?? message;
        } catch {
          message = await res.text();
        }
        alert(message);
        return;
      }

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      if (err.name === "AbortError") {
        alert("The request timed out. Please try again.");
      } else {
        alert("Failed to save. Please try again.");
      }
    } finally {
      window.clearTimeout(timeoutId);
      setSaving(false);
    }
  };

  const toggleSubject = (id: string) => {
    setData((d) => ({
      ...d,
      subjects: d.subjects.includes(id)
        ? d.subjects.filter((s) => s !== id)
        : [...d.subjects, id],
    }));
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAFAFF" }}>

      {/* Top bar */}
      <header className="flex items-center justify-between px-4 sm:px-6 h-14 border-b"
        style={{ backgroundColor: "white", borderColor: "#EDE8FF" }}>
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/logo.png" alt="EpisodeIQ" width={30} height={30} className="h-8 w-8" />
          <span className="text-base font-black hidden sm:inline">
            <span style={{ color: "#3C3489" }}>Episode</span>
            <span style={{ color: "#7F77DD" }}>IQ</span>
          </span>
        </Link>

        {/* Progress steps */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={{
                  backgroundColor: s < step ? "#1D9E75" : s === step ? "#3C3489" : "#EDE8FF",
                  color: s <= step ? "white" : "#6B6894",
                }}>
                {s < step ? <Check size={12} /> : s}
              </div>
              {s < 4 && (
                <div className="w-6 h-0.5 rounded-full hidden sm:block transition-all"
                  style={{ backgroundColor: s < step ? "#1D9E75" : "#EDE8FF" }} />
              )}
            </div>
          ))}
        </div>

        <div className="text-xs font-semibold" style={{ color: "#6B6894" }}>
          Step {step} of 4
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-lg">

          {/* Step title */}
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3"
              style={{ backgroundColor: "#EDE8FF" }}>
              <Sparkles size={12} style={{ color: "#7F77DD" }} />
              <span className="text-xs font-bold" style={{ color: "#7F77DD" }}>
                {stepTitles[step - 1]}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black" style={{ color: "#1A1744" }}>
              {step === 1 && "Tell us about your child"}
              {step === 2 && "Pick their story world"}
              {step === 3 && "Name their character"}
              {step === 4 && "What do they love to learn?"}
            </h1>
            <p className="text-sm mt-2" style={{ color: "#6B6894" }}>
              {step === 1 && "This helps us personalise every episode for them"}
              {step === 2 && "Every lesson will be set in this universe"}
              {step === 3 && "This character will be the hero of every episode"}
              {step === 4 && "Pick at least one — they can always explore more"}
            </p>
          </motion.div>

          {/* Step content */}
          <AnimatePresence mode="wait">

            {/* Step 1 — Basic info */}
            {step === 1 && (
              <motion.div key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-semibold mb-1.5"
                    style={{ color: "#1A1744" }}>
                    Child's name
                  </label>
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="e.g. Arjun"
                    className="w-full rounded-2xl px-4 py-3.5 text-base outline-none transition-all"
                    style={{
                      backgroundColor: "white",
                      border: "2px solid #EDE8FF",
                      color: "#1A1744",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#7F77DD"}
                    onBlur={(e) => e.target.style.borderColor = "#EDE8FF"}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5"
                      style={{ color: "#1A1744" }}>
                      Age
                    </label>
                    <select
                      value={data.age}
                      onChange={(e) => setData({ ...data, age: e.target.value })}
                      className="w-full rounded-2xl px-4 py-3.5 text-base outline-none transition-all appearance-none"
                      style={{
                        backgroundColor: "white",
                        border: "2px solid #EDE8FF",
                        color: data.age ? "#1A1744" : "#6B6894",
                      }}>
                      <option value="">Select age</option>
                      {[8,9,10,11,12,13].map(a => (
                        <option key={a} value={a}>{a} years</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5"
                      style={{ color: "#1A1744" }}>
                      Grade
                    </label>
                    <select
                      value={data.grade}
                      onChange={(e) => setData({ ...data, grade: e.target.value })}
                      className="w-full rounded-2xl px-4 py-3.5 text-base outline-none transition-all appearance-none"
                      style={{
                        backgroundColor: "white",
                        border: "2px solid #EDE8FF",
                        color: data.grade ? "#1A1744" : "#6B6894",
                      }}>
                      <option value="">Select grade</option>
                      {grades.map(g => (
                        <option key={g} value={g}>{g} Grade</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5"
                    style={{ color: "#1A1744" }}>
                    Preferred language
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <button key={lang}
                        onClick={() => setData({ ...data, language: lang })}
                        className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                        style={{
                          backgroundColor: data.language === lang ? "#3C3489" : "white",
                          color: data.language === lang ? "white" : "#6B6894",
                          border: `2px solid ${data.language === lang ? "#3C3489" : "#EDE8FF"}`,
                        }}>
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2 — World picker */}
            {step === 2 && (
              <motion.div key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {worlds.map((world) => (
                  <motion.button
                    key={world.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setData({ ...data, world: world.name })}
                    className="rounded-3xl p-5 text-left transition-all relative overflow-hidden"
                    style={{
                      backgroundColor: "white",
                      border: `2px solid ${data.world === world.name ? "#3C3489" : "#EDE8FF"}`,
                      boxShadow: data.world === world.name
                        ? "0 8px 30px rgba(60,52,137,0.20)"
                        : "0 2px 12px rgba(60,52,137,0.06)",
                    }}>

                    {/* Selected check */}
                    {data.world === world.name && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#1D9E75" }}>
                        <Check size={12} className="text-white" />
                      </div>
                    )}

                    {/* Character */}
                    <div className="mb-3">{world.character}</div>

                    <div className="font-black text-base mb-1" style={{ color: "#1A1744" }}>
                      {world.name}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "#6B6894" }}>
                      {world.description}
                    </p>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Step 3 — Character name */}
            {step === 3 && (
              <motion.div key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                {/* Show chosen world */}
                <div className="rounded-2xl p-4 flex items-center gap-4"
                  style={{ backgroundColor: "#F0EEFF", border: "1px solid #EDE8FF" }}>
                  <div>
                    {worlds.find(w => w.name === data.world)?.character}
                  </div>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: "#7F77DD" }}>
                      Their world
                    </div>
                    <div className="font-black" style={{ color: "#1A1744" }}>
                      {data.world}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5"
                    style={{ color: "#1A1744" }}>
                    Character name
                  </label>
                  <input
                    type="text"
                    value={data.characterName}
                    onChange={(e) => setData({ ...data, characterName: e.target.value })}
                    placeholder={`e.g. ${data.name} the Brave`}
                    className="w-full rounded-2xl px-4 py-3.5 text-base outline-none transition-all"
                    style={{
                      backgroundColor: "white",
                      border: "2px solid #EDE8FF",
                      color: "#1A1744",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#7F77DD"}
                    onBlur={(e) => e.target.style.borderColor = "#EDE8FF"}
                  />
                  <p className="text-xs mt-2" style={{ color: "#6B6894" }}>
                    This character will appear in every episode as the hero of the story
                  </p>
                </div>

                {/* Suggestions */}
                <div>
                  <div className="text-xs font-semibold mb-2" style={{ color: "#6B6894" }}>
                    Quick suggestions
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      `${data.name} the Brave`,
                      `${data.name} the Wise`,
                      `${data.name} the Explorer`,
                      `${data.name} the Bold`,
                    ].map((suggestion) => (
                      <button key={suggestion}
                        onClick={() => setData({ ...data, characterName: suggestion })}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                        style={{
                          backgroundColor: data.characterName === suggestion ? "#3C3489" : "#EDE8FF",
                          color: data.characterName === suggestion ? "white" : "#3C3489",
                        }}>
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4 — Subjects */}
            {step === 4 && (
              <motion.div key="step4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
              >
                {subjects.map((subject) => {
                  const selected = data.subjects.includes(subject.id);
                  return (
                    <motion.button
                      key={subject.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSubject(subject.id)}
                      className="rounded-2xl p-4 text-center transition-all relative"
                      style={{
                        backgroundColor: selected ? subject.bg : "white",
                        border: `2px solid ${selected ? subject.color : "#EDE8FF"}`,
                        boxShadow: selected
                          ? `0 4px 20px ${subject.color}30`
                          : "0 2px 8px rgba(60,52,137,0.05)",
                      }}>
                      {selected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: subject.color }}>
                          <Check size={10} className="text-white" />
                        </div>
                      )}
                      <div className="text-2xl mb-2">{subject.icon}</div>
                      <div className="text-sm font-bold" style={{ color: "#1A1744" }}>
                        {subject.label}
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}

          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm transition-all"
              style={{
                backgroundColor: step === 1 ? "transparent" : "#F0EEFF",
                color: step === 1 ? "transparent" : "#3C3489",
                pointerEvents: step === 1 ? "none" : "auto",
              }}>
              <ArrowLeft size={16} />
              Back
            </button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleNext}
              disabled={!canNext() || saving}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white transition-all"
              style={{
                backgroundColor: canNext() ? "#3C3489" : "#A89FE8",
                cursor: canNext() ? "pointer" : "not-allowed",
                boxShadow: canNext() ? "0 4px 20px rgba(60,52,137,0.25)" : "none",
              }}>
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Creating profile...
                </>
              ) : step === 4 ? (
                <>
                  <Sparkles size={16} />
                  Create Profile
                </>
              ) : (
                <>
                  Next
                  <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </div>

          {/* Preview */}
          {step === 4 && data.name && data.world && data.characterName && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-2xl p-4"
              style={{ backgroundColor: "#F0EEFF", border: "1px solid #EDE8FF" }}>
              <div className="text-xs font-semibold mb-1" style={{ color: "#7F77DD" }}>
                Profile preview
              </div>
              <div className="text-sm font-bold" style={{ color: "#1A1744" }}>
                {data.name} · {data.world} · {data.characterName}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "#6B6894" }}>
                {data.subjects.length} subject{data.subjects.length !== 1 ? "s" : ""} selected · {data.language}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}