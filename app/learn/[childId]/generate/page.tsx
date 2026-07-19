"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowLeft, BookOpen, Zap, Brain, FileText, CheckCircle } from "lucide-react";
import { worldGradients } from "@/lib/worlds";

interface Child {
  id: string;
  name: string;
  world: string;
  character_name: string;
  language: string;
}

interface GeneratedEpisode {
  id: string;
  title: string;
  topic: string;
  scenes: Scene[];
}

interface Scene {
  id: number;
  title: string;
  narration: string;
  keyPoints: string[];
  visualType: "intro" | "explanation" | "summary";
  imageUrl?: string | null;
}

// Generation steps shown to user
const generationSteps = [
  { icon: Brain, label: "Understanding your question...", color: "#7F77DD" },
  { icon: Zap, label: "Checking for similar episodes...", color: "#4ECDC4" },
  { icon: FileText, label: "Writing your episode script...", color: "#1D9E75" },
  { icon: BookOpen, label: "Painting your scenes with Gemini...", color: "#D97706" },
  { icon: CheckCircle, label: "Episode ready!", color: "#1D9E75" },
];

function GeneratingAnimation({
  child,
  topic,
  currentStep,
}: {
  child: Child;
  topic: string;
  currentStep: number;
}) {
  const gradient = worldGradients[child.world] ?? worldGradients["Wizard Academy"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4"
      style={{ backgroundColor: "#FAFAFF" }}>

      {/* Animated world card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm rounded-3xl p-8 mb-8 text-center relative overflow-hidden"
        style={{ background: gradient }}
      >
        {/* Animated background dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${4 + (i % 3) * 3}px`,
              height: `${4 + (i % 3) * 3}px`,
              backgroundColor: "rgba(255,255,255,0.15)",
              top: `${10 + i * 10}%`,
              left: `${5 + i * 12}%`,
            }}
            animate={{ y: [0, -10, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Spinning loader */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "3px solid rgba(255,255,255,0.2)" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "3px solid transparent", borderTopColor: "#FFD93D" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles size={28} className="text-white" />
          </div>
        </div>

        <h2 className="text-xl font-black text-white mb-2">
          Creating your episode...
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
          {child.character_name} is about to discover
        </p>
        <p className="text-base font-bold text-white mt-1 px-4">
          "{topic}"
        </p>
      </motion.div>

      {/* Generation steps */}
      <div className="w-full max-w-sm space-y-3">
        {generationSteps.map((step, i) => {
          const Icon = step.icon;
          const isDone = i < currentStep;
          const isCurrent = i === currentStep;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: i <= currentStep ? 1 : 0.3, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{
                backgroundColor: isCurrent ? "white" : "transparent",
                boxShadow: isCurrent
                  ? "0 4px 20px rgba(60,52,137,0.12)"
                  : "none",
                border: isCurrent ? "1px solid #EDE8FF" : "1px solid transparent",
              }}
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: isDone
                    ? "#E6F7F2"
                    : isCurrent
                      ? step.color + "20"
                      : "#F0EEFF",
                }}>
                {isDone ? (
                  <CheckCircle size={16} style={{ color: "#1D9E75" }} />
                ) : (
                  <Icon size={16}
                    style={{ color: isCurrent ? step.color : "#A89FE8" }} />
                )}
              </div>
              <span className="text-sm font-semibold"
                style={{ color: isCurrent ? "#1A1744" : isDone ? "#1D9E75" : "#A89FE8" }}>
                {step.label}
              </span>
              {isCurrent && (
                <motion.div
                  className="ml-auto flex gap-1"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {[0, 1, 2].map((dot) => (
                    <div key={dot}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: step.color,
                        animationDelay: `${dot * 0.2}s`,
                      }} />
                  ))}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs mt-6 text-center" style={{ color: "#A89FE8" }}>
        Powered by Gemini · Usually takes 20–30 seconds
      </p>
    </div>
  );
}

export default function GeneratePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const childId = params.childId as string;
  const topic = searchParams.get("topic") ?? "";

  const [child, setChild] = useState<Child | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [generating, setGenerating] = useState(true);
  const [episode, setEpisode] = useState<GeneratedEpisode | null>(null);
  const [error, setError] = useState("");

  const fetchChild = useCallback(async () => {
    try {
      const res = await fetch(`/api/children/${childId}`);
      if (!res.ok) return;
      const data = await res.json();
      setChild(data.child);
    } catch (err) {
      console.error(err);
    }
  }, [childId]);

  const generateEpisode = useCallback(async (childData: Child) => {
    try {
      // Animate through steps
      for (let i = 0; i < 4; i++) {
        setCurrentStep(i);
        await new Promise((r) => setTimeout(r, 1200));
      }

      const res = await fetch("/api/episodes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          childId,
          world: childData.world,
          characterName: childData.character_name,
          language: childData.language,
          childName: childData.name,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Generation failed");
      }

      const data = await res.json();
      setCurrentStep(4);
      await new Promise((r) => setTimeout(r, 800));
      setEpisode(data.episode);
      setGenerating(false);

      // Redirect to episode player
      router.push(`/learn/${childId}/episode/${data.episode.id}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setGenerating(false);
    }
  }, [topic, childId, router]);

  useEffect(() => {
    if (!topic) {
      router.push(`/learn/${childId}`);
      return;
    }
    fetchChild().then((result) => {
      // fetchChild sets child in state, we need it from the response
    });
  }, [topic, childId, fetchChild, router]);

  useEffect(() => {
    if (child && generating && topic) {
      generateEpisode(child);
    }
  }, [child, generating, topic, generateEpisode]);

  if (!child) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#FAFAFF" }}>
        <div className="w-8 h-8 rounded-full animate-spin"
          style={{ border: "3px solid #EDE8FF", borderTopColor: "#7F77DD" }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ backgroundColor: "#FAFAFF" }}>
        <div className="w-full max-w-sm rounded-3xl p-8 text-center"
          style={{ backgroundColor: "white", border: "1px solid #EDE8FF" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#FFF0F0" }}>
            <Sparkles size={28} style={{ color: "#FF6B6B" }} />
          </div>
          <h2 className="text-xl font-black mb-2" style={{ color: "#1A1744" }}>
            Oops! Something went wrong
          </h2>
          <p className="text-sm mb-6" style={{ color: "#6B6894" }}>
            {error}
          </p>
          <button
            onClick={() => router.push(`/learn/${childId}`)}
            className="w-full py-3 rounded-2xl font-bold text-white"
            style={{ backgroundColor: "#3C3489" }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {generating && (
        <motion.div
          key="generating"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <GeneratingAnimation
            child={child}
            topic={topic}
            currentStep={currentStep}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}