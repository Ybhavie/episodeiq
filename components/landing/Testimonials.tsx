"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Priya Naik",
    role: "Mother of Arjun, 11",
    location: "Panaji, Goa",
    text: "Arjun used to dread science homework. Now he asks ME questions about black holes. EpisodeIQ made him the curious kid I always knew he could be.",
    rating: 5,
    avatar: "PN",
    color: "#7F77DD",
  },
  {
    name: "Rahul Dessai",
    role: "Father of Sia, 10",
    location: "Margao, Goa",
    text: "The weekly report is incredible. I actually know what my daughter is struggling with and we talked about it over dinner. That never happened before.",
    rating: 5,
    avatar: "RD",
    color: "#4ECDC4",
  },
  {
    name: "Sunita Kamat",
    role: "Mother of twins, 9",
    location: "Mumbai, Maharashtra",
    text: "Both my kids have different story worlds. They actually compete on who learned more this week. EpisodeIQ turned learning into a game.",
    rating: 5,
    avatar: "SK",
    color: "#FF6B6B",
  },
  {
    name: "Deepak Sharma",
    role: "Father of Rohan, 12",
    location: "Pune, Maharashtra",
    text: "The Hindi episodes are fantastic. Rohan's teacher noticed a huge improvement in his understanding of history. She asked what changed — I showed her EpisodeIQ.",
    rating: 5,
    avatar: "DS",
    color: "#1D9E75",
  },
  {
    name: "Anita Prabhu",
    role: "Mother of Kavya, 10",
    location: "Mangalore, Karnataka",
    text: "No app to download, works on any browser, even on our old phone. The lessons are genuinely brilliant — Kavya watches them twice sometimes.",
    rating: 5,
    avatar: "AP",
    color: "#3C3489",
  },
  {
    name: "Vikram Borkar",
    role: "Father of Dev, 11",
    location: "Vasco, Goa",
    text: "Dev typed a question into EpisodeIQ instead of googling it. Twenty minutes later he was explaining plate tectonics to his grandmother.",
    rating: 5,
    avatar: "VB",
    color: "#4A3FA0",
  },
  {
    name: "Meena Navelkar",
    role: "Mother of Siya, 10",
    location: "Mapusa, Goa",
    text: "The Konkani episodes are a wonderful surprise. Siya connected with the lessons so much more in her mother tongue. Truly thoughtful product.",
    rating: 5,
    avatar: "MN",
    color: "#FF6B6B",
  },
  {
    name: "Suresh Gaonkar",
    role: "Father of Nikhil, 12",
    location: "Ponda, Goa",
    text: "Nikhil's quiz scores went from 40 percent to 90 percent in three weeks. The re-explanation feature when he gets something wrong is genius.",
    rating: 5,
    avatar: "SG",
    color: "#1D9E75",
  },
];

const doubled = [...testimonials, ...testimonials];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      className="flex-shrink-0 w-[300px] sm:w-[340px] rounded-3xl p-6 flex flex-col gap-4 mx-3"
      style={{
        backgroundColor: "white",
        boxShadow: "0 4px 24px rgba(60,52,137,0.10)",
        border: "1px solid rgba(237,232,255,0.6)",
      }}
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: "#F0EEFF" }}>
        <Quote size={14} style={{ color: "#7F77DD" }} />
      </div>
      <div className="flex items-center gap-1">
        {[...Array(t.rating)].map((_, j) => (
          <Star key={j} size={13} style={{ fill: "#FFD93D", color: "#FFD93D" }} />
        ))}
      </div>
      <p className="text-sm leading-relaxed flex-1" style={{ color: "#1A1744" }}>
        "{t.text}"
      </p>
      <div className="flex items-center gap-3 pt-2"
        style={{ borderTop: "1px solid #EDE8FF" }}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: t.color }}
        >
          {t.avatar}
        </div>
        <div>
          <div className="text-sm font-bold" style={{ color: "#1A1744" }}>{t.name}</div>
          <div className="text-xs" style={{ color: "#6B6894" }}>{t.role}</div>
          <div className="text-xs font-medium" style={{ color: "#7F77DD" }}>{t.location}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    let pos = 0;
    const speed = 0.6;

    function tick() {
      const el = scrollRef.current;
      if (el) {
        const max = el.scrollWidth / 2;
        pos += speed;
        if (pos >= max) pos = 0;
        el.style.transform = `translateX(-${pos}px)`;
      }
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="section bg-white overflow-hidden">
      <div className="container-main mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
            style={{
              backgroundColor: "#F0EEFF",
              border: "1px solid rgba(168,159,232,0.3)"
            }}
          >
            <Star size={14} style={{ fill: "#FFD93D", color: "#FFD93D" }} />
            <span className="text-sm font-semibold" style={{ color: "#7F77DD" }}>
              What parents say
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: "#1A1744" }}>
            Real kids.{" "}
            <span className="text-gradient">Real breakthroughs.</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#6B6894" }}>
            From Goa to Mumbai — families across India are watching their children
            fall in love with learning.
          </p>
        </motion.div>
      </div>

      {/* Scrolling row */}
      <div className="overflow-hidden mb-16">
        <div
          ref={scrollRef}
          className="flex will-change-transform"
          style={{ width: "max-content" }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="container-main mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {[
            { value: "2,400+", label: "Kids learning" },
            { value: "18,000+", label: "Episodes generated" },
            { value: "4.9/5", label: "Parent rating" },
            { value: "94%", label: "Quiz pass rate" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl font-black mb-1"
                style={{ color: "#3C3489" }}>
                {stat.value}
              </div>
              <div className="text-sm font-medium" style={{ color: "#6B6894" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}