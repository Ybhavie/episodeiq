"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus, BookOpen, Star, TrendingUp,
  Sparkles, ArrowRight, Clock, Trophy,
  Users, Trash2, AlertTriangle, KeyRound,
} from "lucide-react";
import { worldColors } from "@/lib/worlds";

interface Child {
  id: string;
  name: string;
  age: number;
  grade: string;
  world: string;
  character_name: string;
  language: string;
  subjects: string[];
  xp: number;
  streak: number;
  pin?: string;
}

const worldInitials: Record<string, string> = {
  "Wizard Academy": "WA",
  "Space Station": "SS",
  "Detective Agency": "DA",
  "Jungle Explorer": "JE",
};

// Dummy child for testing
const DUMMY_CHILDREN: Child[] = [
  {
    id: "dummy-1",
    name: "Arjun",
    age: 11,
    grade: "6th",
    world: "Wizard Academy",
    character_name: "Arjun the Brave (Dummy Child, Please Delete",
    language: "English",
    subjects: ["science", "history", "math"],
    xp: 1250,
    streak: 7,
    pin: "0000",
  },
];

function DeleteModal({
  child,
  onConfirm,
  onCancel,
  loading,
}: {
  child: Child;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="w-full max-w-sm rounded-3xl p-6"
        style={{ backgroundColor: "white" }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "#FFF0F0" }}>
          <AlertTriangle size={24} style={{ color: "#FF6B6B" }} />
        </div>
        <h3 className="text-lg font-black text-center mb-2" style={{ color: "#1A1744" }}>
          Delete {child.name}'s profile?
        </h3>
        <p className="text-sm text-center mb-6" style={{ color: "#6B6894" }}>
          All episodes and progress will be permanently deleted.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-3 rounded-2xl font-semibold text-sm"
            style={{ backgroundColor: "#F0EEFF", color: "#3C3489" }}>
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 py-3 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2"
            style={{ backgroundColor: "#FF6B6B" }}>
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <><Trash2 size={14} /> Delete</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Child | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const res = await fetch("/api/children");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      // If no real children yet, show dummy
      const kids = data.children ?? [];
      setChildren(kids.length > 0 ? kids : DUMMY_CHILDREN);
    } catch {
      // Fallback to dummy on error
      setChildren(DUMMY_CHILDREN);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      if (deleteTarget.id === "dummy-1") {
        setChildren([]);
        setDeleteTarget(null);
        setDeleting(false);
        return;
      }
      const res = await fetch(`/api/children/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setChildren((prev) => prev.filter((c) => c.id !== deleteTarget.id));
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
    }
  };

  const totalXP = children.reduce((a, c) => a + (c.xp ?? 0), 0);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto">

      {deleteTarget && (
        <DeleteModal
          child={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black" style={{ color: "#1A1744" }}>
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm mt-0.5" style={{ color: "#6B6894" }}>
            Track your children's learning
          </p>
        </div>
        <Link href="/setup"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-white text-sm"
          style={{ backgroundColor: "#3C3489" }}>
          <Plus size={15} />
          <span className="hidden sm:inline">Add Child</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Children", value: children.length, icon: Users, color: "#7F77DD", bg: "#F0EEFF" },
          { label: "Episodes", value: 0, icon: BookOpen, color: "#1D9E75", bg: "#E6F7F2" },
          { label: "Avg score", value: "—", icon: TrendingUp, color: "#4ECDC4", bg: "#E6FAF8" },
          { label: "Total XP", value: totalXP.toLocaleString(), icon: Star, color: "#D97706", bg: "#FFF3CD" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="rounded-2xl p-4"
              style={{
                backgroundColor: "white",
                border: "1px solid #EDE8FF",
                boxShadow: "0 2px 12px rgba(60,52,137,0.06)"
              }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2"
                style={{ backgroundColor: stat.bg }}>
                <Icon size={15} style={{ color: stat.color }} />
              </div>
              <div className="text-xl sm:text-2xl font-black" style={{ color: "#1A1744" }}>
                {stat.value}
              </div>
              <div className="text-xs mt-0.5 font-medium" style={{ color: "#6B6894" }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Children */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-black" style={{ color: "#1A1744" }}>
            Your Children
          </h2>
          {children.length < 3 && (
            <Link href="/setup"
              className="text-xs font-semibold flex items-center gap-1"
              style={{ color: "#7F77DD" }}>
              <Plus size={12} /> Add child
            </Link>
          )}
        </div>

        {/* Loading shimmer */}
        {loading && (
          <div className="flex flex-col gap-4">
            {[1,2].map(i => (
              <div key={i} className="rounded-3xl h-48"
                style={{ backgroundColor: "#EDE8FF" }} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && children.length === 0 && (
          <div className="rounded-3xl p-10 flex flex-col items-center gap-4 text-center"
            style={{ backgroundColor: "white", border: "2px dashed #A89FE8" }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "#F0EEFF" }}>
              <Users size={28} style={{ color: "#7F77DD" }} />
            </div>
            <div>
              <div className="font-black text-lg mb-1" style={{ color: "#1A1744" }}>
                No children yet
              </div>
              <div className="text-sm mb-4" style={{ color: "#6B6894" }}>
                Add your first child profile to get started
              </div>
              <Link href="/setup"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-white text-sm"
                style={{ backgroundColor: "#3C3489" }}>
                <Plus size={15} /> Add First Child
              </Link>
            </div>
          </div>
        )}

        {/* Children grid */}
        {!loading && children.length > 0 && (
          <div className="flex flex-col sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {children.map((child) => {
              const color = worldColors[child.world] ?? "#7F77DD";
              const initials = worldInitials[child.world] ?? "??";
              return (
                <div key={child.id} className="rounded-3xl p-5"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #EDE8FF",
                    boxShadow: "0 2px 16px rgba(60,52,137,0.07)"
                  }}>

                  {/* Top row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-sm font-black flex-shrink-0"
                        style={{ backgroundColor: color }}>
                        {initials}
                      </div>
                      <div>
                        <div className="font-black text-base" style={{ color: "#1A1744" }}>
                          {child.name}
                        </div>
                        <div className="text-xs" style={{ color: "#6B6894" }}>
                          Age {child.age} · {child.grade} Grade
                        </div>
                        <div className="text-xs font-semibold mt-0.5" style={{ color }}>
                          {child.world}
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setDeleteTarget(child)}
                      className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "#FFF0F0" }}>
                      <Trash2 size={14} style={{ color: "#FF6B6B" }} />
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{ backgroundColor: "#FFF3CD", color: "#D97706" }}>
                      <Trophy size={10} className="inline mr-1" />
                      {child.streak}d streak
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{ backgroundColor: "#F0EEFF", color: "#7F77DD" }}>
                      {child.language}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {[
                      { label: "Episodes", value: 0 },
                      { label: "Quiz avg", value: "—" },
                      { label: "XP", value: (child.xp ?? 0).toLocaleString() },
                    ].map((s, i) => (
                      <div key={i} className="text-center rounded-xl py-2"
                        style={{ backgroundColor: "#F8F7FF" }}>
                        <div className="text-sm font-black" style={{ color: "#3C3489" }}>
                          {s.value}
                        </div>
                        <div className="text-[10px]" style={{ color: "#6B6894" }}>
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Subjects */}
                  {child.subjects?.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {child.subjects.slice(0, 3).map((s) => (
                        <span key={s}
                          className="text-[11px] px-2 py-0.5 rounded-full capitalize"
                          style={{ backgroundColor: "#EDE8FF", color: "#3C3489" }}>
                          {s}
                        </span>
                      ))}
                      {child.subjects.length > 3 && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: "#EDE8FF", color: "#6B6894" }}>
                          +{child.subjects.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* PIN to share */}
                  {child.pin && (
                    <div className="flex items-center justify-between rounded-xl px-3 py-2 mb-3"
                      style={{ backgroundColor: "#FFF3CD" }}>
                      <div className="flex items-center gap-1.5 text-xs font-semibold"
                        style={{ color: "#D97706" }}>
                        <KeyRound size={12} />
                        Kid login PIN
                      </div>
                      <span className="text-sm font-black tracking-widest"
                        style={{ color: "#D97706" }}>
                        {child.pin}
                      </span>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3"
                    style={{ borderTop: "1px solid #EDE8FF" }}>
                    <div className="flex items-center gap-1 text-xs"
                      style={{ color: "#6B6894" }}>
                      <Clock size={11} />
                      {child.character_name}
                    </div>
                    <Link href={`/learn/${child.id}`}
                      className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl"
                      style={{ backgroundColor: "#3C3489", color: "white" }}>
                      Open <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* Add child card */}
            {children.length < 3 && (
              <Link href="/setup"
                className="rounded-3xl p-5 flex flex-col items-center justify-center gap-3 min-h-[200px]"
                style={{ backgroundColor: "white", border: "2px dashed #A89FE8" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "#F0EEFF" }}>
                  <Plus size={22} style={{ color: "#7F77DD" }} />
                </div>
                <div className="text-center">
                  <div className="font-bold text-sm mb-0.5" style={{ color: "#3C3489" }}>
                    Add another child
                  </div>
                  <div className="text-xs" style={{ color: "#6B6894" }}>
                    Up to 3 on Family plan
                  </div>
                </div>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* AI Activity */}
      <div className="rounded-3xl p-5"
        style={{
          backgroundColor: "white",
          border: "1px solid #EDE8FF",
          boxShadow: "0 2px 16px rgba(60,52,137,0.07)"
        }}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={15} style={{ color: "#7F77DD" }} />
          <h2 className="text-base font-black" style={{ color: "#1A1744" }}>
            AI Activity This Week
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
            style={{ backgroundColor: "#EDE8FF", color: "#7F77DD" }}>
            XPRIZE
          </span>
        </div>

        <div className="space-y-0">
          {[
            { time: "Today 4:12 PM", action: "Episode generated for Arjun", detail: "Why does the Moon have craters? · Wizard Academy · 3 scenes illustrated", color: "#7F77DD" },
            { time: "Today 2:30 PM", action: "Quiz completed", detail: "Solar System · Score: 2/3 · Re-explanation generated", color: "#4ECDC4" },
            { time: "Yesterday", action: "Groq script written", detail: "French Revolution · 3 scenes · Wizard Academy theme", color: "#1D9E75" },
            { time: "Yesterday", action: "Scenes animated", detail: "3 scenes · narrated aloud · no text-reading required", color: "#D97706" },
            { time: "Mon 8:00 AM", action: "Weekly parent report", detail: "5 topics covered · avg score 87%", color: "#FF6B6B" },
          ].map((log, i) => (
            <div key={i} className="flex items-start gap-3 py-3"
              style={{ borderBottom: i < 4 ? "1px solid #F0EEFF" : "none" }}>
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: log.color }} />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5">
                  <span className="text-sm font-semibold" style={{ color: "#1A1744" }}>
                    {log.action}
                  </span>
                  <span className="text-[11px]" style={{ color: "#6B6894" }}>
                    {log.time}
                  </span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: "#6B6894" }}>
                  {log.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}