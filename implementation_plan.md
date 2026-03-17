# InternPulse – Smart Internship Progress Tracker

A professional hackathon-grade MERN stack application with 30 screens, AI-powered features, CRON-based reminders, real-time notifications, and a stunning Microsoft Fluent + Notion-inspired design system.

---

## Proposed Changes

### Component 1 — Frontend Foundation (Vite + React + TypeScript)

#### [MODIFY] [package.json](file:///I:/github/Carrier%20Hackathon/Client/package.json)

Replace the starter [package.json](file:///I:/github/Carrier%20Hackathon/Client/package.json) with all required dependencies:

| Package | Purpose |
|---|---|
| `react-router-dom` | 30-screen routing |
| `tailwindcss`, `@tailwindcss/vite` | Utility-first CSS |
| `zustand` | Lightweight global state |
| `axios` | HTTP client with interceptors |
| `recharts` | Bar, Line, Pie charts |
| `framer-motion` | Page transitions + card animations |
| `react-hot-toast` | Success / error toast notifications |
| `react-quill` | Rich Text editor for reports |
| `lucide-react` | Icon library |
| `date-fns` | Date formatting |
| `@radix-ui/react-*` | Accessible UI primitives (shadcn base) |
| `class-variance-authority`, `clsx`, `tailwind-merge` | shadcn utility helpers |
| `react-calendar-heatmap` | GitHub-style progress heatmap |
| `socket.io-client` | Real-time notifications |

#### [MODIFY] [vite.config.ts](file:///I:/github/Carrier%20Hackathon/Client/vite.config.ts)

- Add `@tailwindcss/vite` plugin
- Add `@` path alias resolving to `src/`

#### [NEW] tailwind.config.ts

Custom theme extending Tailwind with InternPulse's design tokens:

```
Primary Blue:   #2563EB
Secondary Dark: #1E293B
Accent Green:   #22C55E
Background:     #F8FAFC
Card:           #FFFFFF
Border:         #E5E7EB
Success:        #22C55E  Pending: #F59E0B  Rejected: #EF4444
Font:           Inter (Google Fonts)
```

---

### Component 2 — Source Directory Structure

```
Client/src/
├── assets/                  # Logos, illustrations, SVG icons
├── components/
│   ├── ui/                  # shadcn-style primitives (Button, Card, Badge, Modal, Input, Select, Avatar, Skeleton, Tooltip)
│   ├── layout/              # Sidebar, Header, AppLayout, AuthLayout, DashboardLayout
│   ├── charts/              # InternProductivityChart, SubmissionTrendChart, GoalCompletionPie, ProgressHeatmap
│   ├── forms/               # GoalForm, ReportEditor, InternForm, ProfileForm
│   ├── cards/               # StatCard, GoalCard, ReportCard, InternCard, LeaderboardCard
│   ├── modals/              # ApprovalModal, GoalDetailModal, FeedbackModal, CertificateModal
│   └── notifications/       # NotificationBell, NotificationItem, NotificationDropdown
├── pages/
│   ├── auth/                # LandingPage, LoginPage, RegisterPage, ForgotPasswordPage, RoleSelectionPage, ProfileSetupPage
│   ├── intern/              # InternDashboard, GoalsList, GoalDetail, ReportEditor, SubmissionHistory, FeedbackView, Leaderboard
│   ├── manager/             # ManagerDashboard, InternList, InternProfile, GoalWizard, ReviewQueue, ApprovalsModal, AnalyticsReports
│   ├── admin/               # UserManagement, CohortCreation, NotificationLogs, SystemSettings
│   └── common/              # NotificationsCenter, SettingsPage, HelpSupport, NotFoundPage, KanbanBoard, CalendarView
├── stores/
│   ├── authStore.ts         # User, token, role state
│   ├── goalStore.ts         # Goals list, selected goal
│   ├── reportStore.ts       # Reports, submission state
│   └── notificationStore.ts # Unread count, notification list
├── services/
│   ├── api.ts               # Axios instance with JWT interceptor
│   ├── authService.ts
│   ├── goalService.ts
│   ├── reportService.ts
│   ├── notificationService.ts
│   └── aiService.ts         # AI summary + goal suggestions
├── hooks/
│   ├── useAuth.ts
│   ├── useGoals.ts
│   ├── useReports.ts
│   └── useNotifications.ts
├── context/
│   └── ThemeContext.tsx     # Dark mode toggle
├── utils/
│   ├── cn.ts                # clsx + tailwind-merge helper
│   ├── formatDate.ts
│   └── constants.ts         # Role enums, status labels, color maps
├── router/
│   └── AppRouter.tsx        # All 30 routes with role-based guards
├── App.tsx
├── main.tsx
└── index.css                # @import Inter, Tailwind base + custom CSS vars
```

---

### Component 3 — All 30 Screens (Frontend Pages)

#### Auth / Onboarding (6 screens)

| # | Screen | Key Elements |
|---|---|---|
| 1 | **LandingPage** | Hero ("Track Intern Progress Smarter with InternPulse"), animated features grid, live dashboard preview screenshot, CTA buttons, footer |
| 2 | **LoginPage** | Email + Password, role-aware redirect, "Forgot Password" link, demo login buttons |
| 3 | **RegisterPage** | Full form, role selection radio, avatar upload |
| 4 | **ForgotPasswordPage** | Email input, animated confirmation state |
| 5 | **RoleSelectionPage** | Animated cards for Manager / Intern / Admin |
| 6 | **ProfileSetupPage** | Name, department, avatar, bio, skills tags |

#### Intern Portal (7 screens)

| # | Screen | Key Elements |
|---|---|---|
| 7 | **InternDashboard** | Stat cards (Goals Assigned, Completed, Pending Reports, Score), Productivity bar chart, Submission trend line chart, Recent Activity feed |
| 8 | **GoalsList** | Kanban-style columns (Pending / In-Progress / Submitted / Approved), filter bar |
| 9 | **GoalDetail** | Goal metadata, progress slider, deadline countdown, submit report CTA |
| 10 | **ReportEditor** | React-Quill editor, word count, attachment, submit button |
| 11 | **SubmissionHistory** | Timeline of past reports, status badges, "View Feedback" links |
| 12 | **FeedbackView** | Manager's comments, score, AI summary badge, revision CTA |
| 13 | **Leaderboard** | Ranked list with avatars, points, goal completions, podium animation for top 3 |

#### Manager Portal (7 screens)

| # | Screen | Key Elements |
|---|---|---|
| 14 | **ManagerDashboard** | Cards (Total Interns, Active Goals, Pending Reviews, Completed Goals), charts, Recent Activities feed |
| 15 | **InternList** | Searchable, sortable table with avatar + status badges, quick-view popover |
| 16 | **InternProfile** | Individual intern: progress heatmap, all goals, all reports, overall score, certificate preview |
| 17 | **GoalWizard** | 3-step wizard: (1) Goal details, (2) Assign interns, (3) Set deadline + points |
| 18 | **ReviewQueue** | Paginated list of submitted reports sorted by date, bulk approve button |
| 19 | **ApprovalsModal** | Report content, AI summary panel, score input, approve / request revision buttons |
| 20 | **AnalyticsReports** | Team-wide bar chart, completion rate pie, submission trend, export to CSV |

#### Admin Panel (4 screens)

| # | Screen | Key Elements |
|---|---|---|
| 21 | **UserManagement** | Full CRUD table for all users, role editor, activation toggle |
| 22 | **CohortCreation** | Create batches / cohorts, assign managers, set start/end dates |
| 23 | **NotificationLogs** | All platform notifications with filters, mark all read, delete |
| 24 | **SystemSettings** | App name, logo, CRON schedule config, AI model key config |

#### Common / Utility (6 screens)

| # | Screen | Key Elements |
|---|---|---|
| 25 | **NotificationsCenter** | Full list with category filters, read/unread toggle, timestamps |
| 26 | **SettingsPage** | Profile, password change, notification preferences, dark mode toggle |
| 27 | **HelpSupport** | FAQ accordion, contact form, demo video embed |
| 28 | **NotFoundPage** | Animated 404 illustration, "Go to Dashboard" CTA |
| 29 | **KanbanBoard** | Drag-and-drop goal cards across status columns |
| 30 | **CalendarView** | Monthly calendar with goal deadlines and report due dates |

---

### Component 4 — Reusable UI Component Library

#### [NEW] `src/components/ui/` — Core Primitives

- `Button` — variants: primary, secondary, ghost, destructive + size: sm/md/lg
- `Card` — with CardHeader, CardBody, CardFooter sub-components
- `Badge` — status-colored: Success/Pending/Rejected/In-Progress
- `Input` / `Textarea` — with label, error, prefix slot
- `Select` / `Combobox` — Radix-based with search
- `Modal` / `Dialog` — Radix portal, backdrop blur, header + footer slots
- `Avatar` — with fallback initials + online dot
- `Skeleton` — animated pulse placeholder for all card / table states
- `Tooltip` — Radix-based
- `Progress` — colored progress bar for goal completion %
- `Tabs` — Radix-based with animated indicator
- `DropdownMenu` — Radix-based context menus

#### [NEW] `src/components/layout/`

- `AppLayout` — wraps authenticated pages with `Sidebar` + `Header` + `<main>`
- `Sidebar` — collapsible, with active route highlighting, role-filtered menu items, InternPulse logo, user avatar card at bottom
- `Header` — page title, `NotificationBell` (badge count), dark mode toggle, profile dropdown

---

### Component 5 — Charts & Analytics

Using **Recharts** + **react-calendar-heatmap**:

| Chart | Component | Used On |
|---|---|---|
| Bar — Week vs Completed Goals | `InternProductivityChart` | Intern Dashboard, Analytics |
| Line — Week vs Reports Submitted | `SubmissionTrendChart` | Manager Dashboard, Analytics |
| Pie — Goal Completion Rate | `GoalCompletionPie` | Manager Dashboard, Analytics |
| GitHub Heatmap — Daily Activity | `ProgressHeatmap` | Intern Profile page |

---

### Component 6 — Global State Management (Zustand)

```
authStore      → { user, token, role, login(), logout() }
goalStore      → { goals[], selectedGoal, fetchGoals(), createGoal(), updateStatus() }
reportStore    → { reports[], draftContent, submit(), fetchHistory() }
notifStore     → { notifications[], unreadCount, markRead(), fetchAll() }
themeStore     → { isDark, toggle() }
```

---

### Component 7 — Backend (Express + MongoDB)

#### [NEW] `Server/` directory

```
Server/
├── models/
│   ├── User.model.js
│   ├── Goal.model.js
│   ├── Report.model.js
│   ├── Notification.model.js
│   └── Activity.model.js
├── routes/
│   ├── auth.routes.js
│   ├── users.routes.js
│   ├── goals.routes.js
│   ├── reports.routes.js
│   └── notifications.routes.js
├── controllers/
│   ├── auth.controller.js
│   ├── users.controller.js
│   ├── goals.controller.js
│   ├── reports.controller.js
│   └── notifications.controller.js
├── middleware/
│   ├── auth.middleware.js    # JWT verify + role check
│   └── error.middleware.js
├── cron/
│   └── reminders.cron.js     # node-cron schedules
├── utils/
│   ├── aiSummary.js          # LLM API call (OpenAI/Gemini) to summarize reports
│   └── generateScore.js      # Certificate score calculator
├── config/
│   └── db.js                 # Mongoose connect
├── .env
└── server.js
```

#### MongoDB Schemas

```js
// User
{ name, email, password (bcrypt), role: ['intern','manager','admin'],
  avatar, department, cohort, isActive, createdAt }

// Goal
{ title, description, assignedTo: [ObjectId], createdBy: ObjectId,
  status: ['Pending','In-Progress','Submitted','Approved','Revision-Required'],
  deadline, points, week, createdAt }

// Report
{ intern: ObjectId, goal: ObjectId, content (rich HTML), aiSummary,
  status: ['Submitted','Approved','Revision-Required'],
  score, managerFeedback, submittedAt, reviewedAt }

// Notification
{ recipient: ObjectId, type, message, isRead, createdAt }

// Activity
{ actor: ObjectId, action, target, targetModel, createdAt }
```

#### REST API Routes

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register |
| POST | `/api/auth/login` | Public | Login → JWT |
| GET | `/api/users/interns` | Manager | All interns |
| POST | `/api/users/interns` | Manager | Create intern |
| GET | `/api/users/:id/progress` | Manager | Intern progress |
| GET | `/api/goals` | Intern | My goals |
| POST | `/api/goals` | Manager | Create goal |
| PATCH | `/api/goals/:id/status` | Intern | Update status |
| POST | `/api/reports` | Intern | Submit report |
| GET | `/api/reports/mine` | Intern | My history |
| GET | `/api/reports/queue` | Manager | Review queue |
| PATCH | `/api/reports/:id/review` | Manager | Approve/Reject |
| GET | `/api/notifications` | Any | My notifications |
| PATCH | `/api/notifications/read` | Any | Mark all read |

---

### Component 8 — WOW / AI Features

#### 1. AI Report Summary
- After manager opens a report → call `POST /api/reports/:id/summarize`
- Backend calls OpenAI GPT-4o-mini (or Gemini Flash) with the HTML content
- Response stored on the `Report.aiSummary` field and displayed in `ApprovalsModal`

#### 2. Smart Goal Suggestions
- Manager sees "AI Suggest Goals" in `GoalWizard` step 1
- Backend calls LLM with the intern's role/department → returns 3 suggested goals

#### 3. Certificate Score Calculator
- Computed on `InternProfile` page: `(goalsCompleted * 40 + reportsApproved * 40 + avgFeedbackScore * 20) / 100`
- Displayed as a circular progress gauge with a "Download Certificate" button

#### 4. CRON Jobs (node-cron)
```
Every Friday  6PM  → notify all interns with pending reports
Every Monday  9AM  → notify all managers to review queued reports
Every Sunday  midnight → compute + store weekly leaderboard snapshot
```

#### 5. GitHub-style Progress Heatmap
- `react-calendar-heatmap` showing intern's daily submission activity
- Color intensity = number of activities that day

#### 6. Dark Mode
- `ThemeContext` + Tailwind `dark:` variants
- Persisted to `localStorage`

#### 7. Leaderboard
- Weekly + All-time tabs
- Score = goals completed × 10 + reports approved × 10 + on-time bonus × 5
- Podium animation for top 3 with gold/silver/bronze badges

---

### Component 9 — Animations & UX Polish

| Feature | Library | Details |
|---|---|---|
| Page transitions | `framer-motion` | `AnimatePresence` fade + slide on route change |
| Card fade-in | `framer-motion` | Staggered `motion.div` in lists |
| Skeleton loaders | Custom CSS + Tailwind | `animate-pulse` gray placeholders |
| Empty states | Custom SVG illustrations | "No goals yet", "No reports" etc. |
| Success/Error toasts | `react-hot-toast` | Top-right corner, auto-dismiss |
| Hover effects | Tailwind `hover:` | Cards lift on hover with `shadow-lg` |

---

### Component 10 — Routing (AppRouter.tsx)

```
/ (public)               → LandingPage
/login                   → LoginPage
/register                → RegisterPage
/forgot-password         → ForgotPasswordPage
/role-select             → RoleSelectionPage
/profile-setup           → ProfileSetupPage

/intern/*  (ProtectedRoute role=intern)
  dashboard              → InternDashboard
  goals                  → GoalsList
  goals/:id              → GoalDetail
  reports/new            → ReportEditor
  reports/history        → SubmissionHistory
  reports/:id/feedback   → FeedbackView
  leaderboard            → Leaderboard

/manager/* (ProtectedRoute role=manager)
  dashboard              → ManagerDashboard
  interns                → InternList
  interns/:id            → InternProfile
  goals/create           → GoalWizard
  reviews                → ReviewQueue
  analytics              → AnalyticsReports

/admin/* (ProtectedRoute role=admin)
  users                  → UserManagement
  cohorts                → CohortCreation
  notification-logs      → NotificationLogs
  settings               → SystemSettings

/* (shared)
  notifications          → NotificationsCenter
  settings               → SettingsPage
  help                   → HelpSupport
  kanban                 → KanbanBoard
  calendar               → CalendarView
  *                      → NotFoundPage
```

---

## Verification Plan

### Manual Verification (Browser-Based)

After each phase, we'll verify via browser using the dev server:

```bash
# Frontend dev server
cd "I:\github\Carrier Hackathon\Client"
npm run dev

# Backend dev server  
cd "I:\github\Carrier Hackathon\Server"
node server.js
```

**Auth Flow:**
1. Open `http://localhost:5173` → Landing Page loads with hero section
2. Click "Get Started" → Register page → fill form → role selection → profile setup → manager dashboard
3. Login as Intern → see intern dashboard with separate sidebar menu items

**Manager Flow:**
1. Manager Dashboard → stat cards populated from API
2. Create Intern → form submits → appears in Intern List
3. Goal Wizard (3 steps) → assign to intern → appears in intern's Goals List
4. Review Queue → open report → AI Summary shown → approve → intern notified

**Intern Flow:**
1. Intern Dashboard → goals assigned by manager are visible
2. Click goal → Goal Detail → "Submit Report" → React-Quill editor opens
3. Submit → appears in Manager's Review Queue
4. After approval → Feedback View shows manager comments + score

**WOW Features:**
1. AI Summary panel appears in approval modal (requires OPENAI_API_KEY in `.env`)
2. Leaderboard updates after goals/reports approved
3. Progress Heatmap visible on Intern Profile page
4. Dark mode toggle in Settings → persists on refresh
5. Notification bell badge count increments on new events

**All 30 Screens Check:**
- Navigate to every route and confirm it renders without blank/error state
- Check mobile responsiveness at 375px viewport

---

## 24-Hour Execution Timeline

| Hours | Phase | Deliverables |
|---|---|---|
| 0–2 | Setup | Install deps, Tailwind config, base layout, Router stubs for all 30 routes |
| 2–4 | Backend Foundation | Express server, DB connect, all models, JWT auth routes |
| 4–6 | Auth Screens | Landing, Login, Register, Forgot, Role Select, Profile Setup |
| 6–10 | Intern Portal | Dashboard, Goals, Report Editor (Quill), History, Feedback, Leaderboard |
| 10–14 | Manager Portal | Dashboard, Intern List/Profile, Goal Wizard, Review Queue, Approvals |
| 14–16 | Admin + Common | User Mgmt, Cohorts, Notifs, Settings, Kanban, Calendar, 404 |
| 16–18 | Charts + Analytics | All 4 charts wired to real API data |
| 18–20 | WOW Features | AI Summary, Certificate Score, CRON jobs, Leaderboard scoring, Heatmap |
| 20–22 | Polish | Framer Motion, Skeletons, Empty states, Dark mode, Responsive |
| 22–24 | Deploy + Demo | Vercel (frontend) + Render (backend) + MongoDB Atlas, demo flow rehearsal |
