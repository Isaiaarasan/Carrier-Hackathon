import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { authService } from '../../services/authService'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authService.forgotPassword(email)
      setSent(true)
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary-500 transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Login
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-border dark:border-gray-800 shadow-hover p-8">
          {!sent ? (
            <>
              <div className="mb-6">
                <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-4">
                  <Mail size={22} className="text-primary-500" />
                </div>
                <h1 className="text-2xl font-bold text-primaryText">Forgot password?</h1>
                <p className="text-sm text-muted mt-1">Enter your email and we'll send you a reset link.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Email address" type="email" placeholder="you@company.com" prefixIcon={<Mail size={15} />} value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Button type="submit" className="w-full" isLoading={loading} size="lg">Send Reset Link</Button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-success" />
              </div>
              <h2 className="text-xl font-bold text-primaryText mb-2">Check your inbox!</h2>
              <p className="text-sm text-muted mb-6">We've sent a reset link to <strong>{email}</strong></p>
              <Link to="/login" className="text-primary-500 hover:text-primary-600 font-semibold text-sm">Back to Login</Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
