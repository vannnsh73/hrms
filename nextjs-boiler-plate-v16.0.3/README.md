# WorkFlow HRMS — Frontend

A comprehensive Human Resource Management System (HRMS) built with Next.js 16, featuring a mobile-first design inspired by modern HR apps.

## Features

- **Attendance Tracking** — Selfie clock-in, shift logs, overtime tracking
- **Leave Management** — Multi-level approval workflows, leave balance tracking  
- **Payroll & Compliance** — Payslip viewer with earnings/deductions breakdown (IN & US)
- **Document Repository** — Upload, verify, and manage employee documents
- **Expense Management** — Mileage calculator, policy feedback, approval flow
- **Performance & Goals** — OKR tracking with Key Results progress updates
- **Training & Learning** — Module progress tracking with certificates
- **Recruitment Pipeline** — Candidate tracking with interview scheduling
- **Contributions Board** — Gamified bounty system with leaderboard
- **Recognition Wall** — Peer-to-peer kudos and appreciation feed
- **Announcements** — Scoped announcements (global, department, location)
- **AI HR Copilot** — Context-aware assistant for HR queries
- **Onboarding Tracker** — Pre-joining checklist for new hires

## Role Demo Switcher

The navbar lets you switch between 4 roles to demo the experience:
- **Employee** — Alex Johnson (Software Engineer)
- **Manager** — Riya Patel (Engineering Manager)
- **HR** — Arjun Mehta (HR Specialist)
- **Admin** — Dev Kumar (IT Operations Director)

## Getting Started

```bash
cd nextjs-boiler-plate-v16.0.3
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> Auth is disabled in development via `NEXT_PUBLIC_DISABLE_AUTH=true` in `.env.development.local`.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **State**: Zustand (with localStorage persistence)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **GraphQL**: Apollo Client (configured for future backend integration)
