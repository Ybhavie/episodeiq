import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-dark":    "#3C3489",
        "brand-purple":  "#7F77DD",
        "brand-light":   "#A89FE8",
        "brand-icon":    "#4A3FA0",
        "surface":       "#F0EEFF",
        "surface-alt":   "#EDE8FF",
        "page-bg":       "#FAFAFF",
        "accent-yellow": "#FFD93D",
        "accent-coral":  "#FF6B6B",
        "accent-green":  "#1D9E75",
        "accent-teal":   "#4ECDC4",
        "text-main":     "#1A1744",
        "text-muted":    "#6B6894",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "xl":  "12px",
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "28px",
      },
      boxShadow: {
        "card":       "0 4px 24px rgba(60, 52, 137, 0.10)",
        "card-hover": "0 8px 40px rgba(60, 52, 137, 0.18)",
        "glow":       "0 0 40px rgba(127, 119, 221, 0.25)",
        "glow-lg":    "0 0 80px rgba(127, 119, 221, 0.35)",
      },
      backgroundImage: {
        "hero-gradient":   "radial-gradient(ellipse at 60% 0%, #EDE8FF 0%, #FAFAFF 60%)",
        "purple-gradient": "linear-gradient(135deg, #3C3489 0%, #7F77DD 100%)",
        "card-gradient":   "linear-gradient(135deg, #F0EEFF 0%, #FAFAFF 100%)",
        "kid-gradient":    "linear-gradient(135deg, #7F77DD 0%, #4ECDC4 100%)",
      },
      animation: {
        "float":      "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "slide-up":   "slideUp 0.6s ease-out forwards",
        "fade-in":    "fadeIn 0.5s ease-out forwards",
        "bounce-in":  "bounceIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "shimmer":    "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-16px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%":      { opacity: "1",   transform: "scale(1.05)" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        bounceIn: {
          "0%":   { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;