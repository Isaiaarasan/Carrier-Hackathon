# InternPulse - Task Checklist

## Phase 1: Foundation Setup (Hours 0-4)
- [ ] Install all frontend dependencies (Tailwind CSS, React Router, Zustand, Recharts, Framer Motion, React Hot Toast, React Quill, Axios, shadcn/ui, date-fns, lucide-react)
- [ ] Configure Tailwind CSS + custom theme tokens (colors, fonts)
- [ ] Setup React Router (all 30 routes)
- [ ] Create global layout components (Sidebar, Header, Layout wrappers)
- [ ] Setup Zustand stores (auth, notifications, goals, reports)
- [ ] Create API service layer (axios instance + interceptors)
- [ ] Initialize Backend (Express + MongoDB)
- [ ] Create all Mongoose models (User, Goal, Report, Notification, Activity)
- [ ] Setup JWT Auth middleware
- [ ] Build Auth routes (register, login, refresh)

## Phase 2: Authentication & Onboarding (Hours 1-3)
- [ ] Screen 1: Landing Page (Hero, Features, How It Works, Dashboard Preview, Footer)
- [ ] Screen 2: Login Page
- [ ] Screen 3: Register Page
- [ ] Screen 4: Forgot Password Page
- [ ] Screen 5: Role Selection Page
- [ ] Screen 6: Profile Setup Page
- [ ] Auth Backend routes & controllers
- [ ] Protected route guard component

## Phase 3: Intern Portal (Hours 4-8)
- [ ] Screen 7: Intern Dashboard (stats cards + charts)
- [ ] Screen 8: Weekly Goals List
- [ ] Screen 9: Goal Detail View
- [ ] Screen 10: Report Editor (React Quill rich text)
- [ ] Screen 11: Submission History
- [ ] Screen 12: Feedback / Review View
- [ ] Screen 13: Peer Leaderboard
- [ ] Backend: Goals API (GET by intern)
- [ ] Backend: Reports API (POST, GET history)

## Phase 4: Manager Portal (Hours 8-13)
- [ ] Screen 14: Manager Dashboard (stats + charts)
- [ ] Screen 15: Intern List / Directory
- [ ] Screen 16: Specific Intern Progress Profile
- [ ] Screen 17: Goal Creation Wizard (step-by-step)
- [ ] Screen 18: Review Queue
- [ ] Screen 19: Grading / Approval Modal
- [ ] Screen 20: Analytics Reports
- [ ] Backend: Intern CRUD API
- [ ] Backend: Goal assignment API
- [ ] Backend: Report review/approval API

## Phase 5: Admin Panel (Hours 13-15)
- [ ] Screen 21: User Management
- [ ] Screen 22: Cohort / Batch Creation
- [ ] Screen 23: Notification Logs
- [ ] Screen 24: System Settings
- [ ] Backend: Admin routes

## Phase 6: Common / Utility Screens (Hours 15-17)
- [ ] Screen 25: Notifications Center
- [ ] Screen 26: Settings Page
- [ ] Screen 27: Help / Support
- [ ] Screen 28: 404 Page
- [ ] Screen 29: Kanban Board View
- [ ] Screen 30: Calendar View
- [ ] Backend: Notifications API

## Phase 7: Charts & Analytics (Hours 17-18)
- [ ] Bar chart: Weekly Intern Productivity (Week vs Completed Goals)
- [ ] Line chart: Report Submission Trend (Week vs Reports Submitted)
- [ ] Pie chart: Goal Completion Rate
- [ ] Progress heatmap (GitHub-style contributions)

## Phase 8: WOW Features (Hours 18-20)
- [ ] AI Report Summary (LLM API call to summarize intern reports)
- [ ] Smart Goal Suggestions
- [ ] Internship Certificate Score calculator
- [ ] CRON jobs: Friday reminder (submit reports) + Monday reminder (assign goals)
- [ ] Real-time notifications (socket.io or polling)
- [ ] Dark mode toggle

## Phase 9: Polish & Animations (Hours 20-22)
- [ ] Framer Motion animations (card fade-in, page transitions)
- [ ] Skeleton loaders for all data-fetching states
- [ ] Empty state graphics
- [ ] Success/Error toasts (react-hot-toast)
- [ ] Responsive UI (mobile-friendly layouts)

## Phase 10: Deployment & Presentation (Hours 22-24)
- [ ] Deploy Frontend to Vercel
- [ ] Deploy Backend to Render
- [ ] MongoDB Atlas setup
- [ ] Environment variables configuration
- [ ] Demo flow walkthrough (Manager → Create Intern → Assign Goal → Intern → Submit Report → Approve → Analytics)
- [ ] Verify all 30 screens work end-to-end
