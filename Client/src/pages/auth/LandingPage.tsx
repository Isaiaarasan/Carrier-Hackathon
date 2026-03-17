import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../stores/authStore'
import {
  Target, BarChart3, FileText, Zap, Users, Trophy, Bell, ArrowRight,
  CheckCircle, ChevronRight, Star
} from 'lucide-react'

const features = [
  { icon: Target, title: 'Smart Goal Assignment', description: 'Managers set weekly goals with deadlines, points, and AI-powered suggestions tailored to each intern.' },
  { icon: FileText, title: 'Rich Report Submission', description: 'Interns submit detailed weekly reports using a full-featured text editor with attachments support.' },
  { icon: BarChart3, title: 'Real-Time Analytics', description: 'Track productivity trends, goal completion rates, and report submission patterns with beautiful charts.' },
  { icon: Trophy, title: 'Intern Leaderboard', description: 'Gamify the experience with a ranked leaderboard — rewarding top performers and driving engagement.' },
  { icon: Bell, title: 'Smart Notifications', description: 'Automated reminders ensure interns submit on time and managers never miss a review.' },
  { icon: Zap, title: 'AI-Powered Summaries', description: 'Managers get instant AI summaries of intern reports, making reviews 10x faster.' },
]

const steps = [
  { step: '01', title: 'Manager creates interns', desc: 'Onboard your interns in seconds with role assignment and department setup.' },
  { step: '02', title: 'Assign weekly goals', desc: 'Use the 3-step goal wizard to set objectives, deadlines, and point values.' },
  { step: '03', title: 'Interns submit reports', desc: 'Rich text editor makes it easy to document progress, blockers, and learnings.' },
  { step: '04', title: 'Review & approve', desc: 'Managers review, score with AI summaries, and provide structured feedback.' },
]

const stats = [
  { label: 'Interns Tracked', value: '2,400+' },
  { label: 'Goals Completed', value: '18,500+' },
  { label: 'Reports Reviewed', value: '34,200+' },
  { label: 'Companies Using', value: '120+' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated && user) {
      const dashboard =
        user.role === 'manager' ? '/manager/dashboard' :
        user.role === 'admin'   ? '/admin/users' :
        '/intern/dashboard'
      navigate(dashboard)
    }
  }, [isAuthenticated, user, navigate])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-border dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-bold">IP</span>
            </div>
            <span className="font-bold text-secondary dark:text-white text-lg">InternPulse</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <a href="#features" className="hover:text-primary-500 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary-500 transition-colors">How it Works</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-secondary dark:text-gray-300 hover:text-primary-500 font-semibold transition-colors">Login</Link>
            {/* <Link to="/login" className="bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3 rounded-2xl transition-all hover:shadow-glow">
              Get Started
            </Link> */}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 pt-20 pb-32">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200 dark:bg-primary-900/30 rounded-full blur-3xl opacity-30 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              <Star size={12} className="fill-current" />
              #1 Internship Management Platform
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-secondary dark:text-white leading-tight tracking-tight mb-6">
              Track Intern Progress{' '}
              <span className="bg-gradient-to-r from-primary-500 to-blue-500 bg-clip-text text-transparent">
                Smarter
              </span>
              <br />with InternPulse
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              The complete platform for managers to assign goals, track intern progress, and review weekly reports — all in one beautiful dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Link to="/login" className="bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 hover:shadow-glow inline-flex items-center gap-2">
              Get Started for Free <ArrowRight size={20} />
            </Link> */}
              <Link
                to="/login"
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-secondary dark:text-white font-semibold px-8 py-4 rounded-2xl border border-border dark:border-gray-700 transition-all duration-150 text-base"
              >
                Watch Demo
              </Link>
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-secondary dark:text-white">{s.value}</p>
                <p className="text-sm text-muted mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary dark:text-white mb-4">
              Everything you need to run a{' '}
              <span className="text-primary-500">world-class</span> internship
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              A powerful suite of tools for managers and interns to collaborate, track progress, and celebrate wins.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-hover hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
                  <Icon size={22} className="text-primary-500" />
                </div>
                <h3 className="font-semibold text-secondary dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary dark:text-white mb-4">
              How InternPulse works
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">From onboarding to certification — in 4 simple steps.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="text-6xl font-black text-primary-100 dark:text-primary-900/50 mb-3">{step}</div>
                <h3 className="font-semibold text-secondary dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                {i < 3 && (
                  <ChevronRight
                    size={20}
                    className="hidden lg:block absolute -right-4 top-8 text-primary-300 dark:text-primary-700"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-blue-600">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to transform your internship program?
          </h2>
          <p className="text-primary-100 text-lg mb-8">
            Join 120+ companies already using InternPulse to build better internships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-2xl hover:bg-primary-50 transition-all duration-150 flex items-center gap-2 justify-center"
            >
              Sign In to Start <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              className="border-2 border-white/50 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all duration-150"
            >
              Login to Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 mt-8 text-primary-100 text-sm">
            <CheckCircle size={16} />
            No credit card required — Free for teams up to 5 interns
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">IP</span>
            </div>
            <span className="text-white font-semibold">InternPulse</span>
          </div>
          <p className="text-gray-500 text-sm">© 2025 InternPulse. Built for hackathon excellence.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
