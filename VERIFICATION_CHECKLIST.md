# ✅ InternPulse Verification Checklist

## Pre-deployment Verification

### 🔧 Environment Setup

- [ ] MongoDB is running and accessible
- [ ] Environment variables set in `.env` files
- [ ] Node.js and npm installed
- [ ] All dependencies installed (`npm install` in both directories)

### 📦 Backend Verification

#### Server Startup

- [ ] `npm start` in Server directory succeeds
- [ ] Console shows CRON job initialization message
- [ ] Server listens on port 5000
- [ ] Database connection established
- [ ] All controllers loaded without errors

#### API Endpoint Testing

```bash
# Test with curl or Postman

# 1. Authentication
POST /api/auth/login
- Expected: { success: true, token: "...", user: {...} }

# 2. Goals
GET /api/goals
- Expected: { success: true, count: N, data: [...] }

GET /api/goals/:id
- Expected: { success: true, data: {...} }

# 3. Reports
GET /api/reports/mine
- Expected: { success: true, data: [...] }

GET /api/reports/:id
- Expected: { success: true, data: {...} }

# 4. Users
GET /api/users/interns
- Expected: { success: true, data: [...] }

GET /api/users/analytics
- Expected: { success: true, data: {totalInterns, activeGoals, ...} }

# 5. Notifications
GET /api/notifications
- Expected: { success: true, data: [...] }
```

#### CRON Jobs Verification

- [ ] Server logs show "✅ All CRON jobs initialized"
- [ ] 5 jobs listed in initialization
- [ ] No errors in CRON logs
- [ ] Timestamp indicates current time

#### Database Verification

- [ ] Can list users: `db.users.count()`
- [ ] Can list goals: `db.goals.count()`
- [ ] Can list reports: `db.reports.count()`
- [ ] Can list notifications: `db.notifications.count()`
- [ ] Indexes exist on frequently used fields

### 🎨 Frontend Verification

#### Frontend Startup

- [ ] `npm run dev` in Client directory succeeds
- [ ] App loads on http://localhost:5173
- [ ] No console errors on startup
- [ ] All pages accessible (no 404s)

#### Page Testing - Intern User

**Login Page**

- [ ] Form accepts email/password
- [ ] Login with valid credentials works
- [ ] Error handling for invalid credentials
- [ ] Redirect to dashboard after login

**Dashboard**

- [ ] Loads without errors
- [ ] Shows real statistics
  - [ ] Goals Assigned: Actual number
  - [ ] Goals Completed: Actual number
  - [ ] Active Tasks: Actual number
  - [ ] Success Rate: Calculated percentage
- [ ] No mock data in console

**Goals List**

- [ ] Shows real goals from API
- [ ] Can filter by status
- [ ] Can search by title
- [ ] Empty state shows when no goals
- [ ] Click goal navigates to detail

**Submission History**

- [ ] Shows real reports
- [ ] Shows status badges correctly
- [ ] Shows scores when available
- [ ] Empty state when no reports
- [ ] Click report shows feedback

**Notifications**

- [ ] Shows real notifications
- [ ] Can mark as read
- [ ] Can delete notifications
- [ ] New notifications appear (test with CRON)

**Calendar**

- [ ] Loads real events from goals
- [ ] Shows deadlines on correct dates
- [ ] Can navigate months
- [ ] Events show on selection

#### Page Testing - Manager User

**Dashboard**

- [ ] Shows real team analytics
  - [ ] Total Interns: Actual count
  - [ ] Active Goals: Actual count
  - [ ] Pending Reviews: Actual count
  - [ ] Goals Completed: Actual count
- [ ] Team members list shows real data
- [ ] Progress chart shows real data

**Intern Directory**

- [ ] Shows list of assigned interns
- [ ] Real data from API
- [ ] Can filter and search
- [ ] Goals count is accurate
- [ ] Click intern shows detail

**Leaderboard**

- [ ] Shows real ranked list
- [ ] Sorted by score (highest first)
- [ ] Score calculation correct
- [ ] Ranks assigned correctly
- [ ] Empty state when no interns

#### Page Testing - Admin User

**Notification Logs**

- [ ] Shows real notifications
- [ ] Filters by type work
- [ ] No hardcoded mock data
- [ ] Empty state when no notifications

**Create User**

- [ ] Form validation works
- [ ] Can create users
- [ ] Email uniqueness checked
- [ ] Success message appears

### 🔐 Authorization Testing

#### Permissions Verification

- [ ] Intern cannot access manager pages
- [ ] Manager cannot access admin pages
- [ ] Admin can access all areas
- [ ] User can only view own data
- [ ] Proper 403 responses for unauthorized

#### Token Testing

- [ ] Valid token grants access
- [ ] Invalid token redirects to login
- [ ] Expired token handled gracefully
- [ ] Token refreshes (if implemented)

### 📨 Notification Testing

#### Goal Assignment

- [ ] Manager creates goal
- [ ] Interns receive notification
- [ ] Notification message is clear
- [ ] Notification appears in UI

#### Report Submission

- [ ] Intern submits report
- [ ] Manager receives notification
- [ ] Message indicates ready for review

#### Report Review

- [ ] Manager approves report
- [ ] Intern receives notification
- [ ] Message shows approval/feedback
- [ ] Score displayed in notification

#### CRON Notifications (Test Manual Trigger if Available)

- [ ] Friday reminder sends at 5 PM (or on demand)
- [ ] Monday briefing sends at 9 AM (or on demand)
- [ ] Overdue alerts send hourly
- [ ] Weekly digest sends Sunday 8 PM
- [ ] Midweek nudge sends Wednesday noon

### 🐛 Error Handling Testing

#### 404 Errors

- [ ] Accessing non-existent goal shows error
- [ ] Accessing non-existent report shows error
- [ ] User not found handled gracefully

#### 403 Errors

- [ ] Intern cannot delete goals
- [ ] Manager cannot review own goals
- [ ] Proper error message shown

#### 400 Errors

- [ ] Invalid goal data rejected
- [ ] Short report content rejected
- [ ] Empty required fields rejected

#### Network Errors

- [ ] Offline mode handled
- [ ] Retry logic works
- [ ] Error messages user-friendly
- [ ] No raw API errors shown

### 📊 Data Consistency Testing

#### Data Integrity

- [ ] Goal count matches across pages
- [ ] Report status consistent everywhere
- [ ] User scores match calculation
- [ ] Dates formatted consistently

#### Real-time Updates

- [ ] Create goal → appears in list
- [ ] Submit report → appears in history
- [ ] Review report → status updates
- [ ] New notifications appear

### 🚀 Performance Testing

#### Load Times

- [ ] Dashboard loads in <2 seconds
- [ ] Goals list loads in <1 second
- [ ] Leaderboard loads in <2 seconds
- [ ] Analytics loads in <2 seconds

#### Smooth Interactions

- [ ] Filter operations immediate
- [ ] Search results quick
- [ ] Navigation between pages smooth
- [ ] No lag when scrolling

#### Memory Usage

- [ ] No memory leaks detected
- [ ] Performance stays consistent
- [ ] Long sessions don't degrade

### ✅ Feature Testing Checklist

| Feature           | Status | Notes |
| ----------------- | ------ | ----- |
| Intern Dashboard  | ⬜     |       |
| Goals Management  | ⬜     |       |
| Report Submission | ⬜     |       |
| Report Review     | ⬜     |       |
| Notifications     | ⬜     |       |
| Leaderboard       | ⬜     |       |
| Analytics         | ⬜     |       |
| Calendar          | ⬜     |       |
| User Management   | ⬜     |       |
| CRON Jobs         | ⬜     |       |

### 📱 Browser Compatibility

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari
- [ ] Mobile Chrome

### 🎨 UI/UX Verification

- [ ] Responsive design works
- [ ] Dark mode works (if implemented)
- [ ] Animations smooth
- [ ] Icons display correctly
- [ ] Fonts load properly
- [ ] Colors consistent with design

### 🔒 Security Checklist

- [ ] CORS properly configured
- [ ] JWT tokens working
- [ ] Passwords hashed in database
- [ ] Sensitive data not in console logs
- [ ] No hardcoded secrets
- [ ] API validation on server
- [ ] Client-side validation helps UX only

### 📝 Code Quality

- [ ] No console errors
- [ ] No console warnings
- [ ] No unhandled promise rejections
- [ ] Linting passes (if configured)
- [ ] Code follows patterns
- [ ] Comments clear and helpful

### 📚 Documentation

- [ ] QUICK_REFERENCE.md is accurate
- [ ] IMPLEMENTATION_NOTES.md is complete
- [ ] MIGRATION_SUMMARY.md reflects changes
- [ ] API endpoints documented
- [ ] Setup instructions clear
- [ ] Error messages helpful

### 🚢 Deployment Readiness

- [ ] All tests passing
- [ ] No console errors in production build
- [ ] Environment variables configured
- [ ] Database backups tested
- [ ] Rollback plan documented
- [ ] Monitoring setup
- [ ] Alert system configured

---

## Test Results Summary

Date: ****\_\_\_****  
Tested By: ****\_\_\_****  
Environment: ☐ Development ☐ Staging ☐ Production

### Overall Status

- [ ] ✅ All checks passed
- [ ] ⚠️ Some issues found (list below)
- [ ] ❌ Critical issues found (list below)

### Issues Found

```
1.
2.
3.
```

### Notes

```
_______________________________________________
_______________________________________________
_______________________________________________
```

### Sign Off

- [ ] QA passes
- [ ] Ready for deployment
- [ ] Approved by: ****\_\_\_****

---

## Quick Test Commands

```bash
# Backend Health Check
curl http://localhost:5000/

# Check API
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"

# Test Specific Endpoint
curl http://localhost:5000/api/goals \
  -H "Authorization: Bearer YOUR_TOKEN"

# Check Server Logs
npm start 2>&1 | grep -i error

# Database Connection
mongo --eval "db.version()"

# Frontend Build
npm run build

# Frontend Health
npm run dev
```

---

## Common Issues & Fixes

### Frontend not connecting to backend

- [ ] Check `VITE_API_URL` in `.env`
- [ ] Verify backend is running on port 5000
- [ ] Check CORS configuration
- [ ] Check network tab in DevTools

### CRON jobs not running

- [ ] Check server logs for initialization
- [ ] Verify MongoDB connection
- [ ] Check system time is correct
- [ ] Verify cron schedule syntax

### Notifications not appearing

- [ ] Check notification creation in code
- [ ] Verify recipient ID matches user
- [ ] Check database for notification records
- [ ] Check notification fetch API

### Authorization errors

- [ ] Verify user role in database
- [ ] Check JWT token validity
- [ ] Verify ownership checks in controller
- [ ] Check middleware execution

### Data not loading

- [ ] Check if database has data
- [ ] Verify API endpoint works (curl/Postman)
- [ ] Check response format matches code
- [ ] Check for parsing errors in console

---

## Performance Baselines

### Target Response Times

- List endpoints: < 1 second
- Detail endpoints: < 500 ms
- Create/Update: < 2 seconds
- Delete: < 1 second
- Search: < 1 second

### Target Page Load Times

- Dashboard: < 2 seconds
- Lists: < 1.5 seconds
- Detail pages: < 1 second

### Memory Usage

- Backend: < 200 MB
- Frontend: < 150 MB

---

## Deployment Verification

After deploying to production:

- [ ] Backend API responding
- [ ] CRON jobs running
- [ ] Notifications being created
- [ ] Users can login
- [ ] Data persists across sessions
- [ ] No errors in production logs
- [ ] Performance acceptable
- [ ] Security headers present
- [ ] HTTPS working
- [ ] Backups configured

---

**Last Updated**: March 18, 2026  
**Version**: 2.0  
**Status**: Ready for Verification
