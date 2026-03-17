import { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp, Mail, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'

const faqs = [
  { q: 'How do I submit my weekly report?', a: 'Go to "Submit Report" in the sidebar, select your active goal, write your report using the rich text editor, and click Submit.' },
  { q: 'How is my score calculated?', a: 'Your score is based on 40% goal completion, 40% approved reports, and 20% average manager feedback score.' },
  { q: 'Can I edit a submitted report?', a: 'Once submitted, reports cannot be edited. If revision is requested by your manager, you can resubmit.' },
  { q: 'How does the leaderboard work?', a: 'Points are awarded: 10 pts per completed goal, 10 pts per approved report, 5 pts bonus for on-time submission.' },
  { q: 'When will I get feedback on my report?', a: 'Managers typically review reports within 2–3 business days. You will get a notification when reviewed.' },
]

export default function HelpSupport() {
  const [open, setOpen] = useState<number | null>(null)
  const [contactForm, setContactForm] = useState({ subject: '', message: '' })

  return (
    <div className="page-container space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-secondary dark:text-white">Help & Support</h2>
        <p className="text-sm text-muted mt-1">Find answers or reach out to us</p>
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><HelpCircle size={16} /> Frequently Asked Questions</CardTitle></CardHeader>
        <CardBody className="space-y-2">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="border border-border dark:border-gray-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <span className="text-sm font-medium text-secondary dark:text-white">{q}</span>
                {open === i ? <ChevronUp size={16} className="text-muted shrink-0" /> : <ChevronDown size={16} className="text-muted shrink-0" />}
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-border dark:border-gray-700 pt-3">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Mail size={16} /> Contact Support</CardTitle></CardHeader>
        <CardBody className="space-y-4">
          <Input label="Subject" placeholder="What do you need help with?" value={contactForm.subject} onChange={e => setContactForm({ ...contactForm, subject: e.target.value })} />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-secondary dark:text-gray-200">Message</label>
            <textarea
              placeholder="Describe your issue in detail..."
              value={contactForm.message}
              onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
              rows={4}
              className="input-base resize-none"
            />
          </div>
          <Button onClick={() => toast.success('Message sent! We\'ll respond within 24 hours.')}>
            <MessageSquare size={15} /> Send Message
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}
