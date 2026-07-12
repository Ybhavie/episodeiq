"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Users, Zap } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for trying EpisodeIQ with your child.",
    icon: Zap,
    iconColor: "text-text-muted",
    iconBg: "bg-surface",
    features: [
      "3 episodes per month",
      "1 child profile",
      "All 4 story worlds",
      "Quiz after each episode",
      "English language only",
      "Basic progress tracking",
    ],
    missing: [
      "Weekly parent report",
      "Multi-language support",
      "Unlimited episodes",
    ],
    cta: "Start Free",
    ctaStyle: "btn-secondary w-full justify-center text-base py-3.5",
    highlight: false,
  },
  {
    name: "Spark",
    price: "₹499",
    period: "per month",
    description: "Unlimited learning for one curious kid.",
    icon: Sparkles,
    iconColor: "text-white",
    iconBg: "bg-brand-purple",
    features: [
      "Unlimited episodes",
      "1 child profile",
      "All 4 story worlds",
      "Quiz after each episode",
      "English, Hindi, Tamil, Marathi",
      "Weekly AI parent report",
      "XP points and streaks",
      "Episode certificates",
      "Priority video generation",
    ],
    missing: [],
    cta: "Start Spark",
    ctaStyle: "btn-dark w-full justify-center text-base py-3.5",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Family",
    price: "₹799",
    period: "per month",
    description: "Everything in Spark, for up to 3 kids.",
    icon: Users,
    iconColor: "text-brand-purple",
    iconBg: "bg-surface",
    features: [
      "Unlimited episodes",
      "Up to 3 child profiles",
      "All 4 story worlds",
      "Quiz after each episode",
      "English, Hindi, Tamil, Marathi",
      "Weekly AI parent report per child",
      "XP points and streaks",
      "Episode certificates",
      "Priority video generation",
    ],
    missing: [],
    cta: "Start Family",
    ctaStyle: "btn-secondary w-full justify-center text-base py-3.5",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section bg-page-bg">
      <div className="container-main mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-surface border border-brand-light/30 rounded-full px-4 py-1.5 mb-4">
            <Sparkles size={14} className="text-brand-purple" />
            <span className="text-sm font-semibold text-brand-purple">
              Simple pricing
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-text-main mb-4">
            Learning that fits{" "}
            <span className="text-gradient">every family</span>
          </h2>
          <p className="text-lg text-text-muted max-w-xl mx-auto">
            Start free. Upgrade when your child is ready to learn without limits.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-3xl p-7 flex flex-col gap-6 border transition-all duration-300
                  ${plan.highlight
                    ? "bg-brand-dark text-white border-brand-purple shadow-glow-lg scale-[1.03]"
                    : "bg-white border-surface-alt shadow-card hover:shadow-card-hover hover:-translate-y-1"
                  }`}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <div className="bg-accent-yellow text-yellow-900 text-xs font-bold px-4 py-1 rounded-full shadow-card whitespace-nowrap">
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Plan header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className={`w-10 h-10 ${plan.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                      <Icon size={18} className={plan.iconColor} />
                    </div>
                    <h3 className={`text-xl font-black ${plan.highlight ? "text-white" : "text-text-main"}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm mt-1 ${plan.highlight ? "text-brand-light" : "text-text-muted"}`}>
                      {plan.description}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-end gap-1.5">
                    <span className={`text-5xl font-black ${plan.highlight ? "text-white" : "text-text-main"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm mb-2 ${plan.highlight ? "text-brand-light" : "text-text-muted"}`}>
                      /{plan.period}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Link href="/sign-up" className={plan.ctaStyle}>
                  {plan.cta}
                </Link>

                {/* Divider */}
                <div className={`border-t ${plan.highlight ? "border-white/10" : "border-surface-alt"}`} />

                {/* Features */}
                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                        ${plan.highlight ? "bg-accent-green/20" : "bg-accent-green/10"}`}>
                        <Check size={11} className="text-accent-green" strokeWidth={3} />
                      </div>
                      <span className={`text-sm ${plan.highlight ? "text-white/90" : "text-text-main"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                  {plan.missing.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5 opacity-35">
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-0.5 bg-gray-400 rounded-full" />
                      </div>
                      <span className="text-sm text-text-muted line-through">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-text-muted mt-8"
        >
          No credit card required for Free plan. Cancel anytime.
          <span className="mx-2">·</span>
          COPPA compliant — built for children's privacy.
        </motion.p>

      </div>
    </section>
  );
}