# InternPulse – Smart Internship Progress Tracker

A professional hackathon-grade MERN stack application with 30 screens, AI-powered features, CRON-based reminders, and real-time notifications.

## Project Structure
- `/Client`: React + Vite + TypeScript frontend.
- `/Server`: Node.js + Express + MongoDB backend.

## Tech Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Zustand, Recharts, Framer Motion.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, node-cron.
- **AI**: OpenAI GPT-4o-mini integration for report summaries.

## How to Run

### 1. Requirements
- Node.js v18+
- MongoDB instance (local or Atlas)

### 2. Setup Server
```bash
cd Server
# Create a .env file based on the implementation plan
npm install
npm run dev
```

### 3. Setup Client
```bash
cd Client
npm install --legacy-peer-deps
npm run dev
```

## Features
- **30 Screens**: Comprehensive coverage for Interns, Managers, and Admins.
- **AI Summaries**: Automatic summarization of intern reports for managers.
- **Kanban & Calendar**: Visual tools for tracking goals and deadlines.
- **Analytics**: Beautiful charts for productivity and completion trends.
- **Certificate Score**: Data-driven performance metric for certification.

---
Built during the Carrier Hackathon.
