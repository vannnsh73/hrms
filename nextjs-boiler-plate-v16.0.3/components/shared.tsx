'use client';

import React from "react";
import { useRole } from "../context/RoleContext";
import { Role } from "../store/mockDatabase";
import { ArrowLeft, User as UserIcon, Calendar, CheckCircle2, AlertCircle, Clock, Check, X } from "lucide-react";

// 1. StatusBadge
export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase().trim();

  let classes = "bg-gray-100 text-gray-800 border-gray-200";
  
  if (["approved", "verified", "completed", "present", "resolved", "paid"].includes(normalized)) {
    classes = "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900";
  } else if (["pending", "proposal-pending", "submitted", "in-progress", "screening", "interview-scheduled", "on-track"].includes(normalized)) {
    classes = "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900";
  } else if (["rejected", "cancelled", "missing", "absent", "at-risk"].includes(normalized)) {
    classes = "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900";
  } else if (["late", "half-day", "under-review"].includes(normalized)) {
    classes = "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-900";
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-medium border ${classes}`}>
      {status}
    </span>
  );
}

// 2. Avatar
export function Avatar({ name, colorClass, size = "md" }: { name: string; colorClass?: string; size?: "sm" | "md" | "lg" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
  };

  const bg = colorClass || "bg-teal-600";

  return (
    <div className={`flex items-center justify-center rounded-full text-white font-semibold shadow-inner ${bg} ${sizeClasses[size]}`}>
      {initials}
    </div>
  );
}

// 3. PageHeader
export function PageHeader({ 
  title, 
  onBack, 
  rightAction 
}: { 
  title: string; 
  onBack?: () => void; 
  rightAction?: React.ReactNode 
}) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-white/95 dark:bg-slate-900/95 backdrop-blur px-4 py-3 border-b border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-2">
        {onBack && (
          <button 
            onClick={onBack} 
            className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>
      </div>
      {rightAction && <div>{rightAction}</div>}
    </header>
  );
}

// 4. ProgressBar
export function ProgressBar({ 
  value, 
  color = "teal", 
  size = "md" 
}: { 
  value: number; 
  color?: "teal" | "orange" | "success" | "warning"; 
  size?: "sm" | "md" 
}) {
  const colorMap = {
    teal: "bg-primary",
    orange: "bg-secondary",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
  };

  const sizeMap = {
    sm: "h-1.5",
    md: "h-2.5",
  };

  const pct = Math.max(0, Math.min(100, value));

  return (
    <div className={`w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ${sizeMap[size]}`}>
      <div 
        className={`${colorMap[color]} transition-all duration-300 rounded-full ${sizeMap[size]}`} 
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// 5. BottomNav
export interface TabItem {
  id: string;
  label: string;
  icon: string; // we will map this to Lucide icons
}

export function BottomNav({ 
  activeTab, 
  onChange 
}: { 
  activeTab: string; 
  onChange: (tabId: string) => void 
}) {
  const { role } = useRole();

  // Employee: Home, Attendance, Performance, Training, Contributions
  // Manager: Home, Team, Leave Approvals, Performance, Analytics
  // HR: Home, Recruitment, Analytics, Training, Announcements
  // Admin: Home, Analytics, Team, Training, Settings (Settings can map to Settings tab)
  const navMap: Record<Role, TabItem[]> = {
    Employee: [
      { id: "home", label: "Home", icon: "home" },
      { id: "attendance", label: "Attendance", icon: "clock" },
      { id: "performance", label: "Goals", icon: "target" },
      { id: "training", label: "Learning", icon: "book" },
      { id: "contributions", label: "Rewards", icon: "award" },
    ],
    Manager: [
      { id: "home", label: "Home", icon: "home" },
      { id: "team", label: "Team", icon: "users" },
      { id: "leave_approvals", label: "Approvals", icon: "check-square" },
      { id: "performance", label: "Goals", icon: "target" },
      { id: "analytics", label: "Analytics", icon: "bar-chart" },
    ],
    HR: [
      { id: "home", label: "Home", icon: "home" },
      { id: "recruitment", label: "Hiring", icon: "briefcase" },
      { id: "analytics", label: "Analytics", icon: "bar-chart" },
      { id: "training", label: "Learning", icon: "book" },
      { id: "announcements", label: "News", icon: "megaphone" },
    ],
    Admin: [
      { id: "home", label: "Home", icon: "home" },
      { id: "analytics", label: "Analytics", icon: "bar-chart" },
      { id: "team", label: "Team", icon: "users" },
      { id: "training", label: "Learning", icon: "book" },
      { id: "settings", label: "Settings", icon: "settings" },
    ],
  };

  const tabs = navMap[role] || navMap.Employee;

  return (
    <nav className="border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur py-2 px-3 flex justify-around items-center sticky bottom-0 z-40 shadow-lg">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex flex-col items-center gap-0.5 transition-all py-1 px-2.5 rounded-xl ${
              isActive 
                ? "text-primary dark:text-teal-400 font-semibold scale-105" 
                : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
            }`}
          >
            <div className="relative">
              {renderIcon(tab.icon, isActive ? "w-5 h-5 text-primary" : "w-5 h-5 text-slate-400")}
            </div>
            <span className="text-3xs">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function renderIcon(iconName: string, className: string) {
  switch (iconName) {
    case "home":
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
    case "clock":
      return <Clock className={className} />;
    case "target":
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case "book":
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
    case "award":
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
    case "users":
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
    case "check-square":
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
    case "bar-chart":
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
    case "briefcase":
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    case "megaphone":
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>;
    case "settings":
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    default:
      return <Clock className={className} />;
  }
}

// 6. RoleSwitcher
export function RoleSwitcher() {
  const { role, switchRole, user, users, setUser } = useRole();

  // Filter users to only show those matching the currently selected role
  const filteredUsers = users.filter((u) => u.role === role);

  return (
    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700/50 shadow-sm w-full justify-between">
      <div className="flex items-center gap-1.5 shrink-0">
        <div className={`w-2.5 h-2.5 rounded-full ${role === 'Employee' ? 'bg-teal-500' : role === 'Manager' ? 'bg-orange-500' : role === 'HR' ? 'bg-purple-500' : 'bg-blue-500'}`} />
        <select
          value={role}
          onChange={(e) => switchRole(e.target.value as Role)}
          className="text-xs font-bold bg-transparent text-slate-800 dark:text-white focus:outline-none cursor-pointer pr-1"
        >
          <option value="Employee" className="dark:bg-slate-900 dark:text-white">Employee</option>
          <option value="Manager" className="dark:bg-slate-900 dark:text-white">Manager</option>
          <option value="HR" className="dark:bg-slate-900 dark:text-white">HR</option>
          <option value="Admin" className="dark:bg-slate-900 dark:text-white">Admin</option>
        </select>
      </div>

      <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 shrink-0" />

      <select
        value={user.id}
        onChange={(e) => setUser(e.target.value)}
        className="text-2xs font-medium bg-transparent text-slate-500 dark:text-slate-400 focus:outline-none cursor-pointer min-w-0 flex-1 truncate"
      >
        {filteredUsers.map((u) => (
          <option key={u.id} value={u.id} className="dark:bg-slate-900 dark:text-white">
            {u.name}
          </option>
        ))}
      </select>
    </div>
  );
}

// 7. ApprovalFlow
export function ApprovalFlow({ 
  currentLevel, 
  approverName, 
  status 
}: { 
  currentLevel: number; 
  approverName: string; 
  status: "pending" | "approved" | "rejected";
}) {
  return (
    <div className="mt-3 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
      <div className="text-3xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Approval Flow</div>
      <div className="flex items-center gap-2">
        <div className={`flex items-center justify-center w-6 h-6 rounded-full border ${
          status === "approved" 
            ? "bg-emerald-50 border-emerald-300 text-emerald-600" 
            : status === "rejected" 
              ? "bg-rose-50 border-rose-300 text-rose-600" 
              : "bg-amber-50 border-amber-300 text-amber-600"
        }`}>
          {status === "approved" ? <Check className="w-3.5 h-3.5" /> : status === "rejected" ? <X className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-none">Level {currentLevel}: Direct Manager</div>
          <div className="text-2xs text-slate-400 truncate mt-0.5">{approverName}</div>
        </div>
        <div>
          <StatusBadge status={status} />
        </div>
      </div>
    </div>
  );
}

// 8. EmptyState
export function EmptyState({ 
  title, 
  description, 
  ctaText, 
  onCta 
}: { 
  title: string; 
  description: string; 
  ctaText?: string; 
  onCta?: () => void 
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl my-4">
      <AlertCircle className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-3" />
      <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-1">{title}</h3>
      <p className="text-xs text-slate-400 max-w-xs mb-4">{description}</p>
      {ctaText && onCta && (
        <button
          onClick={onCta}
          className="px-3.5 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-teal-700 active:scale-95 transition-all shadow-sm"
        >
          {ctaText}
        </button>
      )}
    </div>
  );
}

// 9. CardSkeleton
export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-4 animate-pulse space-y-3">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-full w-16" />
      </div>
      <div className="space-y-1.5">
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-12" />
      </div>
    </div>
  );
}
