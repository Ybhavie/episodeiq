import Link from "next/link";
import Image from "next/image";
import { Shield, Globe, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#3C3489", color: "white" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl p-1" style={{ backgroundColor: "white" }}>
                <Image
                  src="/logo.png"
                  alt="EpisodeIQ"
                  width={120}
                  height={120}
                  className="h-10 w-10"
                />
              </div>
              <span className="text-2xl font-black tracking-tight">
                <span style={{ color: "white" }}>Episode</span>
                <span style={{ color: "#A89FE8" }}>IQ</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed max-w-xs mb-6"
              style={{ color: "rgba(255,255,255,0.6)" }}>
              Every confused kid deserves their own episode. AI-powered personalised
              animated lessons for children aged 9–12.
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              <Globe size={14} style={{ color: "#A89FE8" }} />
              {["English", "Hindi", "Tamil", "Marathi", "Konkani"].map((lang) => (
                <span key={lang}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.10)",
                    color: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(255,255,255,0.10)"
                  }}>
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "How it works", href: "#how-it-works" },
                { label: "Pricing", href: "#pricing" },
                { label: "Story worlds", href: "#worlds" },
                { label: "For parents", href: "#parents" },
                { label: "Sign up", href: "/sign-up" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.6)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">
              Trust & Safety
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Children's Privacy", href: "/coppa" },
                { label: "Contact Us", href: "mailto:hello@episodeiq.com" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.6)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-2 text-xs"
              style={{ color: "rgba(255,255,255,0.5)" }}>
              <Mail size={12} />
              <span>hello@episodeiq.com</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>

          <div className="flex items-center gap-1.5 text-xs"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            <span>Built with</span>
            <Heart size={11} style={{ color: "#FF6B6B", fill: "#FF6B6B" }} />
            <span>in Goa, India · {new Date().getFullYear()} EpisodeIQ</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{
                backgroundColor: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.10)"
              }}>
              <Shield size={12} style={{ color: "#1D9E75" }} />
              <span className="text-xs font-medium"
                style={{ color: "rgba(255,255,255,0.7)" }}>
                COPPA Compliant
              </span>
            </div>

            <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{
                backgroundColor: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.10)"
              }}>
              <div className="w-3 h-3 rounded-full"
                style={{ background: "linear-gradient(135deg, #60A5FA, #A78BFA)" }} />
              <span className="text-xs font-medium"
                style={{ color: "rgba(255,255,255,0.7)" }}>
                Powered by Gemini
              </span>
            </div>

            <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{
                backgroundColor: "rgba(255,217,61,0.20)",
                border: "1px solid rgba(255,217,61,0.30)"
              }}>
              <span className="text-xs font-bold" style={{ color: "#FFD93D" }}>
                XPRIZE 2026
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}