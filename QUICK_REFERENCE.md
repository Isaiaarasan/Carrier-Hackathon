# InternPulse - Quick Reference Guide

## 🚀 Quick Start

### Backend Server

```bash
cd Server
npm install
npm start
```

Server runs on port 5000 (or `$PORT` env var)

### Frontend Development

```bash
cd Client
npm install
npm run dev
```

Frontend runs on port 5173

### Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **API Docs**: Check individual route comments

---

## 📊 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                   │
├─────────────────────────────────────────────────────────────┤
│ Pages → Services → API Client (axios) → Backend              │
└─────────────────────────────────────────────────────────────┘
                           ↓ HTTP
┌─────────────────────────────────────────────────────────────┐
│                 BACKEND (Express + Node.js)                  │
├─────────────────────────────────────────────────────────────┤
│ Routes → Controllers → Models → MongoDB                      │
│                    ↓                                          │
│              Notifications (CRON Jobs)                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔑 Key Endpoints

### Authentication

```
POST   /api/auth/login                 # Login
GET    /api/auth/me                    # Current user
PUT    /api/auth/change-password       # Change password
PUT    /api/auth/onboard               # Complete onboarding
```

### Goals

```
GET    /api/goals                      # My goals
GET    /api/goals/:id                  # Single goal
POST   /api/goals                      # Create (manager/admin only)
PATCH  /api/goals/:id/status           # Update status
DELETE /api/goals/:id                  # Delete (manager/admin only)
```

### Reports

```
GET    /api/reports/mine               # My reports
GET    /api/reports/:id                # Single report
GET    /api/reports/queue              # Reviews pending (manager/admin only)
POST   /api/reports                    # Submit report (intern only)
PATCH  /api/reports/:id/review         # Review report (manager/admin only)
POST   /api/reports/:id/summarize      # AI summary (manager/admin only)
```

### Users & Analytics

```
GET    /api/users                      # All users (admin only)
GET    /api/users/interns              # Team interns (manager/admin only)
GET    /api/users/analytics            # Team analytics (manager/admin only)
GET    /api/users/leaderboard          # Leaderboard
GET    /api/users/:id/progress         # Intern progress
```

### Notifications

```
GET    /api/notifications              # My notifications
PATCH  /api/notifications/read         # Mark all as read
DELETE /api/notifications/:id          # Delete notification
```

---

## 👥 User Roles & Permissions

### Intern

- ✅ View own goals, reports, notifications
- ✅ Submit reports for assigned goals
- ✅ View leaderboard, calendar, analytics
- ❌ Cannot create goals or review reports

### Manager

- ✅ Create and manage goals
- ✅ Assign goals to interns
- ✅ Review reports submitted
- ✅ View team analytics
- ✅ View team members
- ❌ Cannot delete users

### Admin

- ✅ All permissions of Manager
- ✅ View all notifications
- ✅ Create user accounts
- ✅ View all data across teams
- ✅ Trigger CRON jobs manually

---

## 📦 Project Structure

```
Client/
├── src/
│   ├── pages/          # Page components
│   ├── components/     # Shared components
│   ├── services/       # API services
│   ├── stores/         # Zustand state management
│   ├── utils/          # Helper functions
│   └── App.tsx         # Main app
└── package.json

Server/
├── controllers/        # Business logic
├── routes/            # API routes
├── models/            # MongoDB schemas
├── middleware/        # Auth, CORS, etc.
├── cron/              # Scheduled jobs
└── config/            # Database config
```

---

## 🔒 Authentication Flow

1. User logs in with email/password
2. Backend returns JWT token
3. Token stored in localStorage
4. Axios interceptor adds token to all requests
5. Invalid token → auto logout & redirect to /login

---

## 📨 Notification Types

| Type               | Trigger          | Recipient              | When         |
| ------------------ | ---------------- | ---------------------- | ------------ |
| `goal_assigned`    | New goal created | Assigned interns       | Immediately  |
| `report_submitted` | Report submitted | Goal creator (manager) | Immediately  |
| `report_approved`  | Manager approves | Report author (intern) | After review |
| `report_rejected`  | Manager rejects  | Report author (intern) | After review |
| `reminder`         | CRON jobs        | Various                | On schedule  |

---

## ⏰ CRON Job Schedule

| Job             | Time       | Audience | Message                  |
| --------------- | ---------- | -------- | ------------------------ |
| Friday Reminder | Fri 5 PM   | Interns  | Submit weekly reports    |
| Monday Briefing | Mon 9 AM   | Managers | Reviews waiting          |
| Overdue Check   | Every Hour | Interns  | Past deadline alerts     |
| Weekly Digest   | Sun 8 PM   | Managers | Team performance summary |
| Midweek Nudge   | Wed 12 PM  | Interns  | Progress check-in        |

---

## 🆔 Goal Statuses

```
Pending ──→ In-Progress ──→ Submitted ──→ Approved
                                      ↘         ↓
                                  Revision ←──→
                                 Required
```

---

## 📝 Report Statuses

```
Submitted ──→ Approved
           ↘ Revision Required
```

---

## 🛠️ Common Development Tasks

### Adding a New Page

1. Create file in `Client/src/pages/[role]/PageName.tsx`
2. Add route in `Client/src/router/AppRouter.tsx`
3. Use existing services for API calls
4. Follow component structure from existing pages

### Adding an API Endpoint

1. Create controller method in `Server/controllers/[resource].controller.js`
2. Add route in `Server/routes/api.routes.js`
3. Add service method in `Client/src/services/[resource]Service.ts`
4. Use in component via service

### Adding a CRON Job

1. Add schedule in `Server/cron/reminders.cron.js`
2. Use helper functions for deduplication
3. Create appropriate notifications
4. Add logging

---

## 🐛 Debugging Tips

### Check API Responses

```javascript
// In browser DevTools
// Network tab → select request → Response tab
// Look for "data" field in JSON
```

### Check CRON Status

```bash
# Server logs show CRON initialization
# Look for "✅ All CRON jobs initialized"
```

### Check Frontend Errors

```javascript
// Console shows service errors
// Network tab shows 4xx/5xx responses
// Check if API_BASE_URL is correct in constants.ts
```

### Database Issues

```bash
# Check MongoDB connection
# Verify DB_URL environment variable
# Check network connectivity if Atlas
```

---

## 📊 Response Examples

### Get Goals Response

```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Build REST API",
      "status": "In-Progress",
      "deadline": "2026-03-31T00:00:00Z",
      "assignedTo": [...],
      "createdBy": {...}
    }
  ]
}
```

### Get Analytics Response

```json
{
  "success": true,
  "data": {
    "totalInterns": 12,
    "activeGoals": 45,
    "pendingReviews": 8,
    "completedGoals": 72,
    "statusDistribution": [...],
    "weeklyStats": [...]
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Not authorized to view this goal"
}
```

---

## ✅ Environment Variables

Create `.env` in both Client and Server:

### Server/.env

```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DB_URL=mongodb://localhost:27017/internpulse
GROQ_API_KEY=your_groq_key_here
JWT_SECRET=your_secret_key
```

### Client/.env

```
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Production Deployment

### Server

```bash
npm install --production
NODE_ENV=production npm start
```

### Frontend

```bash
npm run build
# Deploy `dist/` folder to static hosting
```

### Database

- Use MongoDB Atlas or self-hosted
- Ensure indexes on frequently queried fields
- Regular backups

### CRON

- Ensure runs on one server instance
- Monitor execution and failures
- Set up alerts for critical jobs

---

## 📚 Key Files to Understand

1. **Authentication**: `Server/controllers/auth.controller.js`
2. **Data Models**: `Server/models/*.model.js`
3. **API Routes**: `Server/routes/api.routes.js`
4. **CRON**: `Server/cron/reminders.cron.js`
5. **Frontend State**: `Client/src/stores/authStore.ts`
6. **API Client**: `Client/src/services/api.ts`

---

## 🤝 Contributing

1. Follow existing code style
2. Use TypeScript for frontend
3. Add error handling
4. Write comments for complex logic
5. Test before committing

---

## 📞 Getting Help

- Check `IMPLEMENTATION_NOTES.md` for detailed docs
- Review existing components for patterns
- Check server logs for CRON/API errors
- Use browser DevTools for frontend debugging

---

**Version**: 2.0  
**Last Updated**: March 18, 2026  
**Status**: Production Ready ✅
