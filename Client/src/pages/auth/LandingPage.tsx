import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../stores/authStore";
import {
  Target,
  BarChart3,
  FileText,
  Zap,
  Trophy,
  Bell,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Sparkles,
  TrendingUp,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Smart Goal Assignment",
    desc: "Weekly goals with deadlines, points, and AI-powered suggestions.",
  },
  {
    icon: FileText,
    title: "Rich Report Editor",
    desc: "Full-featured rich text editor for detailed weekly progress reports.",
  },
  {
    icon: BarChart3,
    title: "Live Analytics Dashboard",
    desc: "Real-time productivity trends and beautiful performance charts.",
  },
  {
    icon: Trophy,
    title: "Gamified Leaderboard",
    desc: "Ranked leaderboard rewarding top performers and driving engagement.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    desc: "Automated reminders so interns submit on time, always.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Summaries",
    desc: "Instant AI summaries make report reviews 10x faster.",
  },
];

const steps = [
  {
    num: "01",
    icon: Shield,
    title: "Admin onboards team",
    desc: "Create accounts for managers and interns with role-based access.",
  },
  {
    num: "02",
    icon: Target,
    title: "Manager assigns goals",
    desc: "3-step wizard to set weekly objectives, points, and deadlines.",
  },
  {
    num: "03",
    icon: FileText,
    title: "Interns submit reports",
    desc: "Rich text editor to document progress, blockers, and learnings.",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "Review & approve",
    desc: "Managers score with AI summaries and provide feedback in seconds.",
  },
];

const stats = [
  { value: "2,400+", label: "Interns Tracked" },
  { value: "18K+", label: "Goals Completed" },
  { value: "34K+", label: "Reports Reviewed" },
  { value: "120+", label: "Companies" },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      const dashboard =
        user.role === "manager"
          ? "/manager/dashboard"
          : user.role === "admin"
            ? "/admin/users"
            : "/intern/dashboard";
      navigate(dashboard);
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden"
      style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}
    >
      {/* ─── NAVBAR ─── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
        style={{
          background: "var(--header-bg)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--header-border)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
              boxShadow: "0 0 16px rgba(124,58,237,0.5)",
            }}
          >
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>InternPulse</span>
        </div>
        <div
          className="hidden md:flex items-center gap-8 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          <a
            href="#features"
            className="hover:text-purple-500 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-purple-500 transition-colors"
          >
            How it Works
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-semibold transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            Sign In
          </Link>
          <Link
            to="/login"
            className="text-sm font-semibold px-5 py-2.5 rounded-2xl transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
              color: "#fff",
              boxShadow: "0 4px 15px rgba(124,58,237,0.4)",
            }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-24 pb-32 px-6">
        {/* Orbs */}
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] -translate-y-1/2 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] translate-y-1/2 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(6,214,160,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.25)",
                color: "#A78BFA",
              }}
            >
              <Star size={11} className="fill-current" />
              #1 Internship Management Platform
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#06D6A0", boxShadow: "0 0 6px #06D6A0" }}
              />
            </div>

            <h1
              className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6"
              style={{ letterSpacing: "-0.02em" }}
            >
              Track Intern Progress{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #A78BFA 0%, #7C3AED 40%, #06D6A0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Smarter.
              </span>
            </h1>

            <p
              className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              The all-in-one platform for managers to assign goals, review
              weekly reports, and celebrate intern success — with real-time data
              and AI superpowers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                  color: "#fff",
                  boxShadow: "0 4px 30px rgba(124,58,237,0.5)",
                }}
              >
                Start Free <ArrowRight size={18} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-200"
                style={{
                  background: "var(--bg-surface-2)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--bg-surface-3)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--bg-surface-2)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                See How It Works
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-3xl p-5 text-center"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <p
                  className="text-2xl font-extrabold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {value}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Everything you need for a{" "}
              <span style={{ color: "var(--primary)" }}>world-class</span>{" "}
              internship
            </h2>
            <p
              className="text-lg max-w-xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              A powerful suite of tools designed for speed, clarity, and
              delight.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl p-6 group transition-all duration-300 cursor-default"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  boxShadow: "var(--card-shadow)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--primary)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--card-shadow-hover)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-color)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--card-shadow)";
                  (e.currentTarget as HTMLDivElement).style.transform = "none";
                }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(79,70,229,0.15))",
                    border: "1px solid rgba(124,58,237,0.2)",
                  }}
                >
                  <Icon size={20} style={{ color: "var(--primary)" }} />
                </div>
                <h3 className="font-semibold mb-2 text-sm" style={{ color: "var(--text-primary)" }}>
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section
        id="how-it-works"
        className="py-24 px-6"
        style={{
          background: "var(--bg-surface-2)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              How InternPulse works
            </h2>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              From onboarding to certification — in 4 steps.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ num, icon: Icon, title, desc }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative"
              >
                <div
                  className="text-6xl font-black mb-3 leading-none opacity-20"
                  style={{
                    color: "var(--primary)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {num}
                </div>
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center mb-3"
                  style={{
                    background: "rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.2)",
                  }}
                >
                  <Icon size={18} style={{ color: "var(--primary)" }} />
                </div>
                <h3 className="font-semibold mb-2 text-sm" style={{ color: "var(--text-primary)" }}>
                  {title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="rounded-3xl p-12 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(79,70,229,0.1) 100%)",
              border: "1px solid rgba(124,58,237,0.3)",
            }}
          >
            {/* Glow spot */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(124,58,237,0.4) 0%, transparent 70%)",
              }}
            />

            <h2
              className="text-4xl font-bold mb-4 relative"
              style={{ color: "var(--text-primary)" }}
            >
              Ready to level up your internship program?
            </h2>
            <p
              className="text-lg mb-8 relative"
              style={{ color: "var(--text-secondary)" }}
            >
              Join 120+ companies already using InternPulse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                  boxShadow: "0 4px 25px rgba(124,58,237,0.5)",
                }}
              >
                Get Started Free <ArrowRight size={18} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-200"
                style={{
                  border: "1px solid var(--border-color)",
                  color: "var(--text-secondary)",
                }}
              >
                Sign In to Dashboard
              </Link>
            </div>
            <div
              className="flex items-center justify-center gap-2 mt-8 text-sm"
              style={{ color: "var(--success)" }}
            >
              <CheckCircle size={15} />
              No credit card needed — Free for teams up to 5 interns
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        className="py-10 px-6"
        style={{ borderTop: "1px solid var(--border-color)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
              }}
            >
              <Zap size={14} className="text-white" />
            </div>
            <span
              className="font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              InternPulse
            </span>
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2025 InternPulse · Built for hackathon excellence 🚀
          </p>
          <div
            className="flex gap-6 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a
                key={l}
                href="#"
                className="transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
