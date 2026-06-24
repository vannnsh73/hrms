'use client';

import React, { useState } from "react";
import { useRole } from "../context/RoleContext";
import { useHrmsStore } from "../store/mockDatabase";
import { 
  BottomNav, RoleSwitcher, StatusBadge, Avatar, PageHeader, EmptyState 
} from "../components/shared";

// Module Imports
import { 
  AttendanceModule, LeaveModule, PayrollModule, DocumentModule, ExpenseModule 
} from "../components/modules/Priority1Modules";
import { 
  OnboardingModule, PerformanceModule, ContributionModule, TrainingModule, RecruitmentModule 
} from "../components/modules/Priority2Modules";
import { 
  RecognitionModule, AnnouncementModule, TeamModule, AnalyticsModule, CopilotModal 
} from "../components/modules/Priority3Modules";

import { 
  Clock, Calendar, FileText, UploadCloud, AlertCircle, 
  CheckSquare, ArrowRight, ShieldAlert, Sparkles, Megaphone
} from "lucide-react";

export default function Home() {
  const { role, user } = useRole();
  const [activeTab, setActiveTab] = useState("home");
  
  // Quick sub-routing for special quick actions that are not main tabs
  const [quickSubView, setQuickSubView] = useState<string | null>(null);

  // States
  const activeAtt = useHrmsStore((s) => s.activeAttendance);
  const announcements = useHrmsStore((s) => s.announcements);
  const leaveRequests = useHrmsStore((s) => s.leaveRequests);
  const expenses = useHrmsStore((s) => s.expenses);
  const contributions = useHrmsStore((s) => s.contributions);

  // Copilot State
  const [showCopilot, setShowCopilot] = useState(false);

  // Filter targeted announcements
  const myAnnouncements = announcements.filter((ann) => {
    if (ann.scope === "global") return true;
    if (ann.scope === "location" && ann.targetValue === user.location) return true;
    if (ann.scope === "department" && ann.targetValue === user.department) return true;
    return false;
  });

  // Action Triggers
  const handleQuickAction = (actionId: string) => {
    setQuickSubView(actionId);
    setActiveTab("quick_view");
  };

  // Render Page Content based on tab
  const renderTabContent = () => {
    const currentView = quickSubView || activeTab;

    if (activeTab === "quick_view") {
      switch (quickSubView) {
        case "payroll":
          return (
            <div className="space-y-4 animate-slide-in">
              <PageHeader title="Payroll & Compliance" onBack={() => { setActiveTab("home"); setQuickSubView(null); }} />
              <div className="px-4">
                <PayrollModule />
              </div>
            </div>
          );
        case "documents":
          return (
            <div className="space-y-4 animate-slide-in">
              <PageHeader title="Documents Repository" onBack={() => { setActiveTab("home"); setQuickSubView(null); }} />
              <div className="px-4">
                <DocumentModule />
              </div>
            </div>
          );
        case "expenses":
          return (
            <div className="space-y-4 animate-slide-in">
              <PageHeader title="Expenses & Reimbursements" onBack={() => { setActiveTab("home"); setQuickSubView(null); }} />
              <div className="px-4">
                <ExpenseModule />
              </div>
            </div>
          );
        case "onboarding":
          return (
            <div className="space-y-4 animate-slide-in">
              <PageHeader title="New Hire Onboarding" onBack={() => { setActiveTab("home"); setQuickSubView(null); }} />
              <div className="px-4">
                <OnboardingModule />
              </div>
            </div>
          );
        case "recognition":
          return (
            <div className="space-y-4 animate-slide-in">
              <PageHeader title="Kudos & Peer Recognition" onBack={() => { setActiveTab("home"); setQuickSubView(null); }} />
              <div className="px-4">
                <RecognitionModule />
              </div>
            </div>
          );
        default:
          return null;
      }
    }

    switch (activeTab) {
      case "home":
        return renderHomeDashboard();
      case "attendance":
        return (
          <div className="space-y-4 animate-slide-in">
            <PageHeader title="Attendance Tracking" />
            <div className="px-4">
              <AttendanceModule />
            </div>
          </div>
        );
      case "leave_approvals":
        return (
          <div className="space-y-4 animate-slide-in">
            <PageHeader title="Approvals Console" />
            <div className="px-4">
              <LeaveModule />
            </div>
          </div>
        );
      case "performance":
        return (
          <div className="space-y-4 animate-slide-in">
            <PageHeader title="Performance & Goals" />
            <div className="px-4">
              <PerformanceModule />
            </div>
          </div>
        );
      case "training":
        return (
          <div className="space-y-4 animate-slide-in">
            <PageHeader title="Training & Learning" />
            <div className="px-4">
              <TrainingModule />
            </div>
          </div>
        );
      case "contributions":
        return (
          <div className="space-y-4 animate-slide-in">
            <PageHeader title="Contributions Board" />
            <div className="px-4">
              <ContributionModule />
            </div>
          </div>
        );
      case "team":
        return (
          <div className="space-y-4 animate-slide-in">
            <PageHeader title="My Team Directory" />
            <div className="px-4">
              <TeamModule />
            </div>
          </div>
        );
      case "recruitment":
        return (
          <div className="space-y-4 animate-slide-in">
            <PageHeader title="Recruitment Pipeline" />
            <div className="px-4">
              <RecruitmentModule />
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-4 animate-slide-in">
            <PageHeader title="HR Analytics Insights" />
            <div className="px-4">
              <AnalyticsModule />
            </div>
          </div>
        );
      case "announcements":
        return (
          <div className="space-y-4 animate-slide-in">
            <PageHeader title="Company Announcements" />
            <div className="px-4">
              <AnnouncementModule />
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-4 animate-slide-in">
            <PageHeader title="Settings & Preferences" />
            <div className="px-4 space-y-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-850 dark:text-white">Profile Overview</h3>
                <div className="flex items-center gap-3">
                  <Avatar name={user.name} size="md" colorClass={user.avatarColor} />
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-white">{user.name}</div>
                    <div className="text-3xs text-slate-400">{user.designation} • {user.department}</div>
                  </div>
                </div>
                <div className="text-2xs text-slate-500 space-y-1 pt-2 border-t">
                  <div><strong>Email:</strong> {user.email}</div>
                  <div><strong>Location:</strong> {user.location}</div>
                  <div><strong>Joined Date:</strong> {user.joiningDate}</div>
                </div>
              </div>
              <EmptyState 
                title="System Configuration" 
                description="Advanced tenant values are locked under administrator verification blocks." 
              />
            </div>
          </div>
        );
      default:
        return <div className="p-6 text-center text-xs">Module not implemented.</div>;
    }
  };

  // Render Home Dashboard View
  const renderHomeDashboard = () => {
    // Greets dynamically
    const hrs = new Date().getHours();
    let greet = "Good Morning";
    if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
    if (hrs >= 17) greet = "Good Evening";

    // Count pending items to review for Privileged Roles
    const pendingLeaves = leaveRequests.filter(r => r.status === "pending").length;
    const pendingExpenses = expenses.filter(e => e.status === "pending-approval").length;
    const pendingContribs = contributions.filter(c => c.status === "proposal-pending").length;

    return (
      <div className="p-4 space-y-4 overflow-y-auto max-h-[830px] no-scrollbar animate-fade-in">
        {/* Banner Greeting */}
        <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute -right-2 -bottom-2 bg-primary/5 w-16 h-16 rounded-full" />
          <div className="space-y-1">
            <h2 className="text-sm font-extrabold text-slate-850 dark:text-white leading-tight">
              {greet}, {user.name.split(" ")[0]}!
            </h2>
            <p className="text-3xs text-slate-450 font-medium">Designation: {user.designation} • {user.department}</p>
          </div>
          <Avatar name={user.name} size="sm" colorClass={user.avatarColor} />
        </div>

        {/* Onboarding Banner Check if Nisha (demo onboarding joiner) */}
        {user.id === "EMP005" && (
          <div 
            onClick={() => handleQuickAction("onboarding")}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3.5 rounded-xl shadow-md cursor-pointer hover:scale-102 transition-all flex justify-between items-center"
          >
            <div className="space-y-0.5">
              <span className="text-4xs font-extrabold bg-white/20 px-2 py-0.5 rounded-full uppercase">Onboarding Tracker</span>
              <h3 className="text-xs font-bold">You are in onboarding!</h3>
              <p className="text-4xs text-orange-50">Review pre-joining forms & setup support</p>
            </div>
            <ArrowRight className="w-5 h-5 text-white animate-pulse" />
          </div>
        )}

        {/* Attendance State Quick Panel */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center shadow-sm">
          <div className="space-y-1">
            <span className="text-3xs font-semibold text-slate-400 uppercase">Today's Shift</span>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {activeAtt ? `Clocked In • ${activeAtt.clockInTime}` : "Not Clocked In"}
            </h3>
            <p className="text-4xs text-slate-400">Regular hours: 9:00 AM - 6:00 PM</p>
          </div>
          <button
            onClick={() => setActiveTab("attendance")}
            className="px-3.5 py-1.5 bg-primary hover:bg-teal-700 text-white text-3xs font-bold rounded-xl active:scale-95 transition-all shadow-sm flex items-center gap-1"
          >
            <Clock className="w-3.5 h-3.5" /> Log Card
          </button>
        </div>

        {/* Quick Actions Grid */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 px-1">Quick Modules</h3>
          <div className="grid grid-cols-2 gap-2 text-2xs font-bold">
            <button 
              onClick={() => setActiveTab("leave_approvals")} 
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-xl shadow-sm text-left flex flex-col justify-between h-20 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-slate-700 dark:text-slate-200">Apply Leave</span>
            </button>
            <button 
              onClick={() => handleQuickAction("expenses")} 
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-xl shadow-sm text-left flex flex-col justify-between h-20 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <Clock className="w-5 h-5 text-secondary" />
              <span className="text-slate-700 dark:text-slate-200">File Expense</span>
            </button>
            <button 
              onClick={() => handleQuickAction("payroll")} 
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-xl shadow-sm text-left flex flex-col justify-between h-20 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <FileText className="w-5 h-5 text-teal-600" />
              <span className="text-slate-700 dark:text-slate-200">My Payslips</span>
            </button>
            <button 
              onClick={() => handleQuickAction("documents")} 
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-xl shadow-sm text-left flex flex-col justify-between h-20 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <UploadCloud className="w-5 h-5 text-purple-650" />
              <span className="text-slate-700 dark:text-slate-200">My Documents</span>
            </button>
          </div>
        </div>

        {/* Dynamic Approvals Section for Privileged Roles */}
        {["Manager", "HR", "Admin"].includes(role) && (pendingLeaves > 0 || pendingExpenses > 0 || pendingContribs > 0) && (
          <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-250 dark:border-amber-900/40 p-3.5 rounded-2xl space-y-2.5">
            <h3 className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1">
              <ShieldAlert className="w-4 h-4" /> Team Approvals Queue
            </h3>
            <div className="space-y-1.5 text-2xs text-slate-650 dark:text-slate-350">
              {pendingLeaves > 0 && (
                <div className="flex justify-between items-center">
                  <span>Pending Leave Requests</span>
                  <button 
                    onClick={() => setActiveTab("leave_approvals")}
                    className="text-primary font-bold hover:underline"
                  >
                    {pendingLeaves} items review ➜
                  </button>
                </div>
              )}
              {pendingExpenses > 0 && (
                <div className="flex justify-between items-center">
                  <span>Pending Expense Claims</span>
                  <button 
                    onClick={() => handleQuickAction("expenses")}
                    className="text-primary font-bold hover:underline"
                  >
                    {pendingExpenses} items review ➜
                  </button>
                </div>
              )}
              {pendingContribs > 0 && (
                <div className="flex justify-between items-center">
                  <span>Pending Bounty Nominations</span>
                  <button 
                    onClick={() => setActiveTab("contributions")}
                    className="text-primary font-bold hover:underline"
                  >
                    {pendingContribs} items review ➜
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Kudos feed snapshot */}
        <div 
          onClick={() => handleQuickAction("recognition")}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm cursor-pointer hover:bg-slate-50 transition-all flex justify-between items-center"
        >
          <div className="space-y-0.5">
            <span className="text-4xs font-bold text-slate-400 uppercase tracking-wide">Recognition Wall</span>
            <h4 className="text-xs font-bold text-slate-850 dark:text-white">Give Kudos to Colleagues</h4>
            <p className="text-4xs text-slate-450">Celebrate achievements and milestones publicly</p>
          </div>
          <Sparkles className="w-5 h-5 text-secondary" />
        </div>

        {/* Target matched Announcements */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 px-1">Announcements</h3>
          {myAnnouncements.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No recent announcements matching your target scope.</p>
          ) : (
            <div className="space-y-2">
              {myAnnouncements.map((ann) => (
                <div 
                  key={ann.id} 
                  onClick={() => setActiveTab("announcements")}
                  className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-start gap-3 cursor-pointer hover:scale-101 transition-all"
                >
                  <Megaphone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{ann.title}</h4>
                    <p className="text-3xs text-slate-400 line-clamp-2 mt-0.5 leading-snug">{ann.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const getActiveViewTitle = () => {
    if (activeTab === "quick_view") return quickSubView || "";
    return activeTab;
  };

  return (
    <div className="app-container">
      {/* Sticky TopBar */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-5 h-5 text-secondary" />
          <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white">WorkFlow</span>
        </div>
        <div className="w-[260px]">
          <RoleSwitcher />
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar bg-slate-50/50 dark:bg-slate-950">
        {renderTabContent()}
      </main>

      {/* Persistent Floating AI Copilot Launcher */}
      <button
        onClick={() => setShowCopilot(true)}
        className="fixed bottom-18 right-4 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 hover:bg-orange-600 transition-all z-50 animate-bounce"
        style={{ right: "calc(50% - 215px + 16px)" }} // position correctly inside the desktop center view
      >
        <Sparkles className="w-6 h-6 text-white" />
      </button>

      {showCopilot && (
        <CopilotModal 
          currentView={getActiveViewTitle()} 
          onClose={() => setShowCopilot(false)} 
        />
      )}

      {/* Sticky BottomNav */}
      <BottomNav activeTab={activeTab} onChange={(tab) => { setQuickSubView(null); setActiveTab(tab); }} />
    </div>
  );
}
