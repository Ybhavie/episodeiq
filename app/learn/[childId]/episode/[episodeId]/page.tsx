"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Check,
  Trophy,
  Star,
  Volume2,
  VolumeX,
} from "lucide-react";
import { worldGradients } from "@/lib/worlds";
import { WorldCharacter } from "@/components/WorldCharacter";

interface Child {
  id: string;
  name: string;
  world: string;
  character_name: string;
  language?: string;
}

const speechLangMap: Record<string, string> = {
  English: "en-IN",
  Hindi: "hi-IN",
  Tamil: "ta-IN",
  Marathi: "mr-IN",
  // Most browsers ship no Konkani voice; Hindi is the closest widely-available fallback.
  Konkani: "hi-IN",
};

interface Scene {
  id: number;
  title: string;
  narration: string;
  keyPoints: string[];
  visualType: "intro" | "explanation" | "summary";
}

interface Episode {
  id: string;
  title: string;
  topic: string;
  scenes: Scene[];
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

type Phase = "loading" | "error" | "story" | "quiz-loading" | "quiz" | "results";

export default function EpisodePlayerPage() {
  const params = useParams();
  const router = useRouter();
  const childId = params.childId as string;
  const episodeId = params.episodeId as string;

  const [phase, setPhase] = useState<Phase>("loading");
  const [child, setChild] = useState<Child | null>(null);
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [pickedOption, setPickedOption] = useState<number | null>(null);

  const [score, setScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [speechOn, setSpeechOn] = useState(true);

  const load = useCallback(async () => {
    try {
      const [childRes, episodeRes] = await Promise.all([
        fetch(`/api/children/${childId}`),
        fetch(`/api/episodes/${episodeId}`),
      ]);

      if (!childRes.ok || !episodeRes.ok) {
        setErrorMsg("This episode could not be found.");
        setPhase("error");
        return;
      }

      const childData = await childRes.json();
      const episodeData = await episodeRes.json();
      setChild(childData.child);
      setEpisode(episodeData.episode);
      setPhase("story");
    } catch {
      setErrorMsg("Something went wrong loading this episode.");
      setPhase("error");
    }
  }, [childId, episodeId]);

  useEffect(() => {
    load();
  }, [load]);

  const gradient = worldGradients[child?.world ?? ""] ?? worldGradients["Wizard Academy"];
  const scenes = episode?.scenes ?? [];
  const currentScene = scenes[sceneIndex];
  const isLastScene = sceneIndex === scenes.length - 1;

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = speechLangMap[child?.language ?? "English"] ?? "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  }, [child]);

  useEffect(() => {
    if (phase !== "story" || !currentScene) return;
    if (speechOn) speak(currentScene.narration);
    return () => window.speechSynthesis?.cancel();
  }, [phase, sceneIndex, currentScene, speechOn, speak]);

  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  const startQuiz = async () => {
    setPhase("quiz-loading");
    try {
      const res = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ episodeId }),
      });
      const data = await res.json();
      if (!res.ok || !data.questions?.length) {
        setErrorMsg(data.error ?? "Could not create your quiz. Please try again.");
        setPhase("error");
        return;
      }
      setQuestions(data.questions);
      setQuestionIndex(0);
      setSelectedAnswers([]);
      setPickedOption(null);
      setPhase("quiz");
    } catch {
      setErrorMsg("Could not create your quiz. Please try again.");
      setPhase("error");
    }
  };

  const pickOption = (optionIndex: number) => {
    if (pickedOption !== null) return;
    setPickedOption(optionIndex);
  };

  const nextQuestion = async () => {
    const newAnswers = [...selectedAnswers, pickedOption ?? -1];
    setSelectedAnswers(newAnswers);
    setPickedOption(null);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((i) => i + 1);
      return;
    }

    // Last question — submit
    const finalScore = newAnswers.reduce(
      (acc, ans, i) => acc + (ans === questions[i].correctIndex ? 1 : 0),
      0
    );
    setScore(finalScore);

    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          episodeId,
          childId,
          answers: newAnswers,
          score: finalScore,
          total: questions.length,
        }),
      });
      const data = await res.json();
      setXpEarned(res.ok ? data.xpEarned : finalScore * 20);
    } catch {
      setXpEarned(finalScore * 20);
    }
    setPhase("results");
  };

  if (phase === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAFAFF" }}>
        <div className="w-10 h-10 rounded-full animate-spin"
          style={{ border: "3px solid #EDE8FF", borderTopColor: "#7F77DD" }} />
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: "#FAFAFF" }}>
        <div className="w-full max-w-sm rounded-3xl p-8 text-center"
          style={{ backgroundColor: "white", border: "1px solid #EDE8FF" }}>
          <h2 className="text-xl font-black mb-2" style={{ color: "#1A1744" }}>
            Oops!
          </h2>
          <p className="text-sm mb-6" style={{ color: "#6B6894" }}>{errorMsg}</p>
          <button
            onClick={() => router.push(`/learn/${childId}`)}
            className="w-full py-3 rounded-2xl font-bold text-white"
            style={{ backgroundColor: "#3C3489" }}>
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAFF" }}>
      {/* Header */}
      <div className="px-4 sm:px-6 pt-6 pb-4" style={{ background: gradient }}>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.push(`/learn/${childId}`)}
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
            <ArrowLeft size={16} className="text-white" />
          </button>
          <span className="text-xs font-bold text-white opacity-80 truncate px-2">
            {episode?.title}
          </span>
          {phase === "story" ? (
            <button
              onClick={() => setSpeechOn((v) => !v)}
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
              {speechOn ? (
                <Volume2 size={16} className="text-white" />
              ) : (
                <VolumeX size={16} className="text-white" />
              )}
            </button>
          ) : (
            <div className="w-8 flex-shrink-0" />
          )}
        </div>

        {/* Progress bar */}
        {(phase === "story") && (
          <div className="flex gap-1.5">
            {scenes.map((_, i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: "rgba(255,255,255,0.25)" }}>
                <div className="h-full rounded-full transition-all"
                  style={{
                    width: i <= sceneIndex ? "100%" : "0%",
                    backgroundColor: "#FFD93D",
                  }} />
              </div>
            ))}
          </div>
        )}
        {(phase === "quiz" || phase === "quiz-loading") && (
          <div className="flex gap-1.5">
            {Array.from({ length: questions.length || 3 }).map((_, i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: "rgba(255,255,255,0.25)" }}>
                <div className="h-full rounded-full transition-all"
                  style={{
                    width: i <= questionIndex ? "100%" : "0%",
                    backgroundColor: "#4ECDC4",
                  }} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 sm:px-6 py-8 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {/* STORY */}
          {phase === "story" && currentScene && (
            <motion.div
              key={`scene-${sceneIndex}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <div className="rounded-3xl p-6 mb-5"
                style={{ backgroundColor: "white", border: "1px solid #EDE8FF", boxShadow: "0 4px 24px rgba(60,52,137,0.08)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1"
                    style={{ backgroundColor: "#F0EEFF" }}>
                    <Sparkles size={12} style={{ color: "#7F77DD" }} />
                    <span className="text-xs font-bold" style={{ color: "#7F77DD" }}>
                      Scene {sceneIndex + 1} of {scenes.length}
                    </span>
                  </div>
                  <button
                    onClick={() => speak(currentScene.narration)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#F0EEFF" }}>
                    <Volume2 size={14} style={{ color: "#7F77DD" }} />
                  </button>
                </div>

                <div className="rounded-2xl overflow-hidden mb-4 relative flex items-center justify-center"
                  style={{ aspectRatio: "4 / 3", background: gradient }}>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: `${4 + (i % 3) * 3}px`,
                        height: `${4 + (i % 3) * 3}px`,
                        backgroundColor: "rgba(255,255,255,0.4)",
                        top: `${15 + i * 12}%`,
                        left: `${8 + i * 15}%`,
                      }}
                      animate={{ y: [0, -10, 0], opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.25 }}
                    />
                  ))}
                  <motion.div
                    key={`${sceneIndex}-character`}
                    animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <WorldCharacter world={child?.world ?? "Wizard Academy"} size={110} />
                  </motion.div>
                </div>

                <h2 className="text-xl font-black mb-3" style={{ color: "#1A1744" }}>
                  {currentScene.title}
                </h2>
                <p className="text-base leading-relaxed mb-5" style={{ color: "#1A1744" }}>
                  {currentScene.narration}
                </p>

                {currentScene.keyPoints?.length > 0 && (
                  <div className="space-y-2">
                    {currentScene.keyPoints.map((point, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.12 }}
                        className="flex items-start gap-2 rounded-xl px-3 py-2.5"
                        style={{ backgroundColor: "#F8F7FF" }}>
                        <Star size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#FFD93D", fill: "#FFD93D" }} />
                        <span className="text-sm font-medium" style={{ color: "#1A1744" }}>
                          {point}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSceneIndex((i) => Math.max(0, i - 1))}
                  disabled={sceneIndex === 0}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm"
                  style={{
                    backgroundColor: sceneIndex === 0 ? "transparent" : "#F0EEFF",
                    color: sceneIndex === 0 ? "transparent" : "#3C3489",
                    pointerEvents: sceneIndex === 0 ? "none" : "auto",
                  }}>
                  <ArrowLeft size={16} /> Back
                </button>

                <button
                  onClick={() => (isLastScene ? startQuiz() : setSceneIndex((i) => i + 1))}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white"
                  style={{ backgroundColor: "#3C3489", boxShadow: "0 4px 20px rgba(60,52,137,0.25)" }}>
                  {isLastScene ? "Take the quiz" : "Next"}
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* QUIZ LOADING */}
          {phase === "quiz-loading" && (
            <motion.div key="quiz-loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-12 h-12 rounded-full animate-spin"
                style={{ border: "3px solid #EDE8FF", borderTopColor: "#4ECDC4" }} />
              <p className="text-sm font-semibold" style={{ color: "#6B6894" }}>
                Writing your quiz questions...
              </p>
            </motion.div>
          )}

          {/* QUIZ */}
          {phase === "quiz" && questions[questionIndex] && (
            <motion.div
              key={`quiz-${questionIndex}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
                style={{ backgroundColor: "#E6FAF8" }}>
                <span className="text-xs font-bold" style={{ color: "#0F766E" }}>
                  Question {questionIndex + 1} of {questions.length}
                </span>
              </div>
              <h2 className="text-xl font-black mb-5" style={{ color: "#1A1744" }}>
                {questions[questionIndex].question}
              </h2>

              <div className="space-y-3 mb-6">
                {questions[questionIndex].options.map((option, i) => {
                  const isCorrect = i === questions[questionIndex].correctIndex;
                  const isPicked = i === pickedOption;
                  const revealed = pickedOption !== null;

                  let bg = "white";
                  let border = "#EDE8FF";
                  if (revealed && isCorrect) { bg = "#E6F7F2"; border = "#1D9E75"; }
                  else if (revealed && isPicked && !isCorrect) { bg = "#FFF0F0"; border = "#FF6B6B"; }

                  return (
                    <button
                      key={i}
                      onClick={() => pickOption(i)}
                      disabled={revealed}
                      className="w-full flex items-center justify-between text-left px-4 py-3.5 rounded-2xl transition-all"
                      style={{ backgroundColor: bg, border: `2px solid ${border}` }}>
                      <span className="text-sm font-semibold" style={{ color: "#1A1744" }}>
                        {option}
                      </span>
                      {revealed && isCorrect && (
                        <Check size={16} style={{ color: "#1D9E75" }} />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={nextQuestion}
                disabled={pickedOption === null}
                className="w-full py-3.5 rounded-2xl font-bold text-white text-sm"
                style={{
                  backgroundColor: pickedOption === null ? "#A89FE8" : "#3C3489",
                  cursor: pickedOption === null ? "not-allowed" : "pointer",
                }}>
                {questionIndex === questions.length - 1 ? "See results" : "Next question"}
              </button>
            </motion.div>
          )}

          {/* RESULTS */}
          {phase === "results" && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-center">
              {score === questions.length && (
                <Confetti recycle={false} numberOfPieces={250} />
              )}
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: "#FFF3CD" }}>
                <Trophy size={36} style={{ color: "#D97706" }} />
              </div>
              <h2 className="text-2xl font-black mb-2" style={{ color: "#1A1744" }}>
                {score} / {questions.length} correct!
              </h2>
              <p className="text-sm mb-6" style={{ color: "#6B6894" }}>
                {child?.character_name} earned <span className="font-bold" style={{ color: "#D97706" }}>+{xpEarned} XP</span> for this episode
              </p>
              <button
                onClick={() => router.push(`/learn/${childId}`)}
                className="w-full py-3.5 rounded-2xl font-bold text-white text-sm"
                style={{ backgroundColor: "#3C3489" }}>
                Back to home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
