import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAFF" }}>

      {/* Top navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14"
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #EDE8FF",
          boxShadow: "0 2px 12px rgba(60,52,137,0.06)"
        }}>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="EpisodeIQ" width={32} height={32}
            className="h-8 w-8" />
          <span className="text-base font-black">
            <span style={{ color: "#3C3489" }}>Episode</span>
            <span style={{ color: "#7F77DD" }}>IQ</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1"
            style={{ backgroundColor: "#F0EEFF" }}>
            <Sparkles size={12} style={{ color: "#7F77DD" }} />
            <span className="text-xs font-semibold" style={{ color: "#7F77DD" }}>
              AI Active
            </span>
          </div>
          <Link href="/sign-out"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
            style={{ color: "#FF6B6B", backgroundColor: "#FFF0F0" }}>
            <LogOut size={13} />
            <span className="hidden sm:inline">Sign out</span>
          </Link>
        </div>
      </header>

      {/* Sidebar desktop */}
      <aside className="hidden lg:flex w-60 flex-col fixed top-14 left-0 h-[calc(100vh-56px)] z-30"
        style={{ backgroundColor: "white", borderRight: "1px solid #EDE8FF" }}>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { label: "My Children", href: "/dashboard/children", icon: Users },
            { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
            { label: "Settings", href: "/dashboard/settings", icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all hover:bg-[#F0EEFF]"
                style={{ color: "#6B6894" }}>
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4">
          <div className="rounded-2xl p-4"
            style={{ background: "linear-gradient(135deg, #3C3489 0%, #7F77DD 100%)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={13} className="text-white" />
              <span className="text-xs font-bold text-white">Powered by AI</span>
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
              Groq + Gemini for instant personalised lessons
            </p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-60 pt-14 pb-20 lg:pb-6">
        {children}
      </main>

      {/* Bottom nav mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-2 h-16"
        style={{
          backgroundColor: "white",
          borderTop: "1px solid #EDE8FF",
          boxShadow: "0 -4px 20px rgba(60,52,137,0.08)"
        }}>
        {[
          { label: "Home", href: "/dashboard", icon: LayoutDashboard },
          { label: "Children", href: "/dashboard/children", icon: Users },
          { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
          { label: "Settings", href: "/dashboard/settings", icon: Settings },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.label} href={item.href}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl"
              style={{ color: "#6B6894" }}>
              <Icon size={20} />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}