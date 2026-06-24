'use client';

import React, { useState } from "react";
import { useHrmsStore, OnboardingTask, Goal, Candidate, JobPosting, TrainingModule as TrainingModuleType } from "../../store/mockDatabase";
import { useRole } from "../../context/RoleContext";
import { StatusBadge, Avatar, PageHeader, ProgressBar } from "../shared";
import { 
  CheckSquare, Award, BookOpen, Target, FilePlus, ChevronRight, 
  MapPin, Phone, HelpCircle, Star, Send, ShieldAlert, 
  Layers, Plus, Video, Calendar, Clock, Edit3, Trash, X 
} from "lucide-react";

// ==========================================
// 6. Onboarding Module
// ==========================================
export function OnboardingModule() {
  const { user } = useRole();
  const tasks = useHrmsStore((s) => s.onboardingTasks).filter(t => t.userId === user.id);
  const completeTask = useHrmsStore((s) => s.completeOnboardingTask);
  const relocation = useHrmsStore((s) => s.relocationSupport)[user.id];

  const [activePhase, setActivePhase] = useState<"pre-joining" | "day-1" | "week-1" | "month-1">("pre-joining");
  const [showVideo, setShowVideo] = useState(false);

  const phases: { key: typeof activePhase; label: string }[] = [
    { key: "pre-joining", label: "Pre-Joining" },
    { key: "day-1", label: "Day 1" },
    { key: "week-1", label: "Week 1" },
    { key: "month-1", label: "Month 1" },
  ];

  const activeTasks = tasks.filter(t => t.phase === activePhase);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const pct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-4 pb-6">
      {/* Onboarding Overview Card */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-900 text-white p-4 rounded-2xl shadow-md space-y-3">
        <div>
          <span className="text-4xs font-extrabold bg-orange-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Onboarding Track</span>
          <h2 className="text-sm font-bold mt-1">Welcome to PropVivo, {user.name}!</h2>
          <p className="text-3xs text-teal-100 mt-0.5">{user.designation} • Buddy: {user.buddyName || "Assigned buddy"}</p>
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-3xs font-semibold">
            <span>Overall Milestones</span>
            <span>{pct}% Completed ({completedTasks}/{totalTasks})</span>
          </div>
          <div className="w-full bg-teal-850 h-2 rounded-full overflow-hidden">
            <div className="bg-secondary h-2 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* CEO welcome section */}
      <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
            <Video className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-white">Message from the CEO</h4>
            <p className="text-3xs text-slate-400">Watch the special PropVivo vision video</p>
          </div>
        </div>
        <button
          onClick={() => setShowVideo(!showVideo)}
          className="px-3 py-1 bg-secondary text-white text-3xs font-bold rounded-lg hover:bg-orange-600 transition-all shadow-sm"
        >
          {showVideo ? "Hide" : "Watch"}
        </button>
      </div>

      {showVideo && (
        <div className="bg-black aspect-video rounded-xl overflow-hidden flex items-center justify-center text-white text-xs font-bold font-mono border border-slate-800 animate-fade-in relative">
          <div className="text-center p-4">
            <Video className="w-8 h-8 text-primary mx-auto mb-2 animate-bounce" />
            <p>Playing PropVivo Welcome Keynote Video...</p>
            <span className="text-3xs text-slate-500 block mt-1">(Simulated CEO Stream)</span>
          </div>
        </div>
      )}

      {/* Checklist Segment */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Task Checklist</h3>
          <div className="flex gap-1">
            {phases.map((ph) => (
              <button
                key={ph.key}
                onClick={() => setActivePhase(ph.key)}
                className={`px-2 py-0.5 rounded text-3xs font-bold ${
                  activePhase === ph.key 
                    ? "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white" 
                    : "text-slate-400"
                }`}
              >
                {ph.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {activeTasks.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No tasks configured for this phase.</p>
          ) : (
            activeTasks.map((t) => (
              <div key={t.id} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={t.status === "completed"}
                    disabled={t.status === "completed"}
                    onChange={() => completeTask(t.id)}
                    className="w-4 h-4 text-primary border-slate-350 rounded mt-0.5"
                  />
                  <div>
                    <h4 className={`text-xs font-bold ${t.status === "completed" ? "line-through text-slate-400" : "text-slate-850 dark:text-slate-100"}`}>{t.title}</h4>
                    <p className="text-3xs text-slate-400 mt-0.5 leading-snug">{t.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-4xs px-1 rounded uppercase font-extrabold ${t.priority === 'high' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-500'}`}>{t.priority}</span>
                      <span className="text-3xs text-slate-400">Due: {t.dueDate}</span>
                    </div>
                  </div>
                </div>
                <StatusBadge status={t.status} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Relocation support panel */}
      {relocation && (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-800 dark:text-white border-b pb-1">Relocation & Onboarding Support</h3>
          <div className="space-y-2 text-2xs text-slate-650 dark:text-slate-300">
            <div className="flex justify-between"><strong>Visa / Job Transfer Status:</strong> <span className="text-primary font-bold">{relocation.visaStatus}</span></div>
            <div className="flex justify-between"><strong>Temporary Accommodation:</strong> <span>{relocation.accommodationDetails}</span></div>
            <div className="flex justify-between"><strong>Flight Details:</strong> <span>{relocation.travelDetails}</span></div>
            <div className="flex justify-between"><strong>Transition Allowance:</strong> <span>{relocation.relocationAllowance}</span></div>
            <div className="flex justify-between"><strong>Local Contact Buddy:</strong> <span>{relocation.localBuddyContact}</span></div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg space-y-1.5">
            <div className="text-3xs font-semibold text-slate-400 uppercase">Support Tickets</div>
            {relocation.supportTickets.map(t => (
              <div key={t.id} className="flex justify-between items-center text-3xs">
                <span className="text-slate-600 dark:text-slate-300 font-semibold">{t.subject}</span>
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1 rounded">{t.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. Performance & Goals Module
// ==========================================
export function PerformanceModule() {
  const { user } = useRole();
  const goals = useHrmsStore((s) => s.goals).filter(g => g.userId === user.id);
  const reviews = useHrmsStore((s) => s.reviews).filter(r => r.userId === user.id);
  const updateKR = useHrmsStore((s) => s.updateKRProgress);

  const [activeTab, setActiveTab] = useState<"goals" | "review">("goals");
  const [krValues, setKrValues] = useState<Record<string, number>>({});

  const handleProgressChange = (goalId: string, krId: string, value: number) => {
    updateKR(goalId, krId, value);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Module Switcher */}
      <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("goals")}
          className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all ${
            activeTab === "goals" 
              ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
              : "text-slate-400 hover:text-slate-500"
          }`}
        >
          My Goals & OKRs
        </button>
        <button
          onClick={() => setActiveTab("review")}
          className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all ${
            activeTab === "review" 
              ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
              : "text-slate-400 hover:text-slate-500"
          }`}
        >
          Performance Appraisal
        </button>
      </div>

      {activeTab === "goals" && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 px-1">Active Objectives</h3>
          {goals.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No objectives configured.</p>
          ) : (
            goals.map((g) => (
              <div key={g.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-tight">{g.title}</h4>
                    <p className="text-3xs text-slate-400 mt-0.5">{g.category} • Weight: {g.weight}% • Due {g.dueDate}</p>
                  </div>
                  <StatusBadge status={g.status} />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-3xs font-semibold text-slate-500">
                    <span>Target Progress</span>
                    <span>{g.progress}%</span>
                  </div>
                  <ProgressBar value={g.progress} color={g.status === 'at-risk' ? 'warning' : 'teal'} size="sm" />
                </div>

                {/* Key Results */}
                <div className="space-y-2 border-t border-slate-50 dark:border-slate-800/60 pt-2">
                  <span className="text-4xs font-extrabold text-slate-400 uppercase tracking-wider block">Key Results</span>
                  {g.keyResults.map((kr) => (
                    <div key={kr.id} className="bg-slate-50 dark:bg-slate-850 p-2 rounded-lg space-y-2">
                      <div className="flex justify-between text-2xs font-semibold text-slate-700 dark:text-slate-350 leading-tight">
                        <span>{kr.title}</span>
                        <span className="text-slate-400">{kr.current} / {kr.target} {kr.unit}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          type="range"
                          min="0"
                          max={kr.target}
                          value={krValues[kr.id] !== undefined ? krValues[kr.id] : kr.current}
                          onChange={(e) => setKrValues({ ...krValues, [kr.id]: parseInt(e.target.value) })}
                          className="flex-1 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <button
                          onClick={() => handleProgressChange(g.id, kr.id, krValues[kr.id] !== undefined ? krValues[kr.id] : kr.current)}
                          className="px-2 py-0.5 bg-primary text-white text-3xs font-bold rounded hover:bg-teal-700 active:scale-95"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "review" && (
        <div className="space-y-3">
          {reviews.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No reviews published yet.</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-850 pb-2.5">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-white">Annual appraisal report</h3>
                    <p className="text-3xs text-slate-400">Review Period: {rev.reviewPeriod}</p>
                  </div>
                  <div className="bg-teal-50 dark:bg-teal-950/20 text-primary border border-teal-200 dark:border-teal-900 px-3 py-1 rounded-xl text-center">
                    <div className="text-xs font-black">{rev.overallRating}</div>
                    <div className="text-4xs font-bold uppercase tracking-wider">Score</div>
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2.5">
                  <span className="text-3xs font-semibold text-slate-400 uppercase">Category Metrics</span>
                  {rev.categoryRatings.map((cat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-2xs font-semibold">
                        <span className="text-slate-700 dark:text-slate-350">{cat.category}</span>
                        <span className="text-primary">{cat.rating} / 5.0</span>
                      </div>
                      <p className="text-3xs text-slate-400 leading-normal bg-slate-50 dark:bg-slate-850 px-2 py-1 rounded">{cat.feedback}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2.5 border-t border-slate-50 dark:border-slate-800/60 pt-2.5">
                  <div className="text-2xs text-slate-600 dark:text-slate-350">
                    <strong className="text-slate-850 dark:text-white block mb-0.5">Strengths:</strong>
                    <p className="text-3xs text-slate-400">{rev.strengths}</p>
                  </div>
                  <div className="text-2xs text-slate-600 dark:text-slate-350">
                    <strong className="text-slate-850 dark:text-white block mb-0.5">Areas of Improvement:</strong>
                    <p className="text-3xs text-slate-400">{rev.improvementAreas}</p>
                  </div>
                  <div className="text-2xs text-slate-600 dark:text-slate-350">
                    <strong className="text-slate-850 dark:text-white block mb-0.5">Recommendations:</strong>
                    <p className="text-3xs text-slate-400">{rev.recommendations}</p>
                  </div>
                  {rev.employeeComments && (
                    <div className="text-2xs text-slate-600 dark:text-slate-350">
                      <strong className="text-slate-850 dark:text-white block mb-0.5">My Response:</strong>
                      <p className="text-3xs text-slate-400 italic bg-teal-50/10 dark:bg-slate-850/50 p-2 rounded border border-teal-100/30">&ldquo;{rev.employeeComments}&rdquo;</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 8. Contributions Module
// ==========================================
export function ContributionModule() {
  const { user, role } = useRole();
  const contributions = useHrmsStore((s) => s.contributions);
  const catalog = useHrmsStore((s) => s.contributionCatalog);
  const submitContrib = useHrmsStore((s) => s.submitContribution);
  const claimItem = useHrmsStore((s) => s.claimContributionItem);
  const approveContrib = useHrmsStore((s) => s.approveContribution);
  const rejectContrib = useHrmsStore((s) => s.rejectContribution);

  const [activeTab, setActiveTab] = useState<"feed" | "catalog" | "leaderboard" | "proposals" | "admin_queue">("feed");
  
  // Submit new proposal state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<any>("innovation");
  const [suggestedPoints, setSuggestedPoints] = useState("");
  const [impactLevel, setImpactLevel] = useState<"low" | "medium" | "high">("medium");
  const [successMsg, setSuccessMsg] = useState("");

  const [adminPoints, setAdminPoints] = useState<Record<string, number>>({});
  const [adminComments, setAdminComments] = useState<Record<string, string>>({});

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");

    if (!title || !description || !suggestedPoints) {
      alert("Please fill in required fields");
      return;
    }

    submitContrib({
      title,
      description,
      type: "self-initiated",
      category,
      suggestedPoints: parseInt(suggestedPoints),
      points: 0,
      impactLevel,
    });

    setSuccessMsg("Proposal submitted! Awaiting Manager approval.");
    setTitle("");
    setDescription("");
    setSuggestedPoints("");
  };

  // Get active leaderboard ranking (mock)
  const leaderboardData = [
    { name: "Alex Johnson", points: 870, rating: 4.8, badge: "Master Innovator", color: "bg-teal-600" },
    { name: "Riya Patel", points: 640, rating: 4.6, badge: "Process Architect", color: "bg-orange-600" },
    { name: "Arjun Mehta", points: 410, rating: 4.3, badge: "Community Champ", color: "bg-purple-600" },
    { name: "Nisha Verma", points: 150, rating: 4.0, badge: "Rising Contributor", color: "bg-pink-600" },
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* Horizontal Nav */}
      <div className="flex overflow-x-auto gap-1 py-1 no-scrollbar border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setActiveTab("feed")}
          className={`px-3 py-1 rounded-xl text-3xs font-extrabold whitespace-nowrap ${
            activeTab === "feed" ? "bg-primary text-white" : "text-slate-400"
          }`}
        >
          Activity Feed
        </button>
        <button
          onClick={() => setActiveTab("catalog")}
          className={`px-3 py-1 rounded-xl text-3xs font-extrabold whitespace-nowrap ${
            activeTab === "catalog" ? "bg-primary text-white" : "text-slate-400"
          }`}
        >
          Claim Projects
        </button>
        <button
          onClick={() => setActiveTab("proposals")}
          className={`px-3 py-1 rounded-xl text-3xs font-extrabold whitespace-nowrap ${
            activeTab === "proposals" ? "bg-primary text-white" : "text-slate-400"
          }`}
        >
          Propose Work
        </button>
        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`px-3 py-1 rounded-xl text-3xs font-extrabold whitespace-nowrap ${
            activeTab === "leaderboard" ? "bg-primary text-white" : "text-slate-400"
          }`}
        >
          Leaderboard
        </button>
        {["Manager", "HR", "Admin"].includes(role) && (
          <button
            onClick={() => setActiveTab("admin_queue")}
            className={`px-3 py-1 rounded-xl text-3xs font-extrabold whitespace-nowrap relative ${
              activeTab === "admin_queue" ? "bg-primary text-white" : "text-slate-400"
            }`}
          >
            Review Board
            {contributions.filter(c => c.status === "proposal-pending").length > 0 && (
              <span className="absolute top-0 right-0 bg-secondary w-2 h-2 rounded-full" />
            )}
          </button>
        )}
      </div>

      {activeTab === "feed" && (
        <div className="space-y-3">
          {contributions.map((c) => (
            <div key={c.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar name={c.userName} size="sm" colorClass={c.userAvatarColor} />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-none">{c.userName}</h4>
                    <span className="text-4xs text-slate-400 font-medium uppercase mt-0.5 block">{c.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-secondary">{c.points > 0 ? `+${c.points} Pts` : `${c.suggestedPoints} Pts (Est)`}</span>
                  <StatusBadge status={c.status} />
                </div>
              </div>
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-slate-750 dark:text-slate-200">{c.title}</h5>
                <p className="text-3xs text-slate-400 leading-relaxed">{c.description}</p>
              </div>
              {c.managerComments && (
                <div className="text-4xs text-emerald-600 bg-slate-50 dark:bg-slate-850 p-2 rounded font-medium">
                  Approver note: {c.managerComments}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === "catalog" && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 px-1">Available Bounty Projects</h3>
          {catalog.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-4xs font-semibold bg-teal-50 text-primary px-1.5 py-0.5 rounded uppercase">{item.category}</span>
                  <span className="text-xs font-bold text-slate-750 dark:text-slate-200 truncate block">{item.title}</span>
                </div>
                <p className="text-3xs text-slate-450 leading-relaxed">{item.description}</p>
              </div>
              <div className="text-right flex flex-col gap-2 items-end">
                <span className="text-xs font-extrabold text-secondary">+{item.points} Pts</span>
                {item.claimedBy ? (
                  <span className="text-4xs text-slate-400 italic">Claimed by {item.claimedBy}</span>
                ) : (
                  <button
                    onClick={() => claimItem(item.id)}
                    className="px-3 py-1 bg-primary text-white text-3xs font-bold rounded-lg hover:bg-teal-700"
                  >
                    Claim Bounty
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "proposals" && (
        <form onSubmit={handleProposalSubmit} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-800 dark:text-white">Propose Innovation / Contribution</h3>

          <div className="space-y-1">
            <label className="text-3xs font-semibold text-slate-400 uppercase">Contribution Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Migrated API payload handlers to reduce latencies"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-2.5 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-3xs font-semibold text-slate-400 uppercase">Description & Impacts</label>
            <textarea
              required
              placeholder="Detail your contribution, expected business impact, and how points should be calculated..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-2.5 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-3xs font-semibold text-slate-400 uppercase">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1.5 text-xs text-slate-800 dark:text-slate-200"
              >
                <option value="innovation">Innovation</option>
                <option value="process-improvement">Process Improvement</option>
                <option value="cost-saving">Cost Saving</option>
                <option value="quality">Quality Audit</option>
                <option value="team-building">Team Building</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-3xs font-semibold text-slate-400 uppercase">Suggested Points</label>
              <input
                type="number"
                required
                placeholder="e.g. 100"
                value={suggestedPoints}
                onChange={(e) => setSuggestedPoints(e.target.value)}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          {successMsg && <p className="text-3xs text-emerald-500 font-semibold">{successMsg}</p>}

          <button
            type="submit"
            className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-teal-700"
          >
            Submit Proposal Form
          </button>
        </form>
      )}

      {activeTab === "leaderboard" && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 px-1">Global Contributions Leaderboard</h3>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            {leaderboardData.map((person, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border-b last:border-0 border-slate-50 dark:border-slate-800/60">
                <div className="flex items-center gap-3">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-3xs ${
                    idx === 0 ? "bg-yellow-400 text-yellow-950" : idx === 1 ? "bg-slate-300 text-slate-800" : "text-slate-400"
                  }`}>
                    {idx + 1}
                  </span>
                  <Avatar name={person.name} size="sm" colorClass={person.color} />
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-white leading-none">{person.name}</div>
                    <span className="text-4xs text-slate-400 font-semibold block mt-0.5">{person.badge}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-primary">{person.points} Pts</div>
                  <div className="text-4xs text-yellow-500 flex items-center gap-0.5 justify-end">★ {person.rating}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "admin_queue" && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 px-1">Review Contribution Submissions</h3>
          {contributions.filter(c => c.status === "proposal-pending").length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No submissions pending approval.</p>
          ) : (
            contributions.filter(c => c.status === "proposal-pending").map((c) => (
              <div key={c.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Avatar name={c.userName} size="sm" colorClass={c.userAvatarColor} />
                    <div>
                      <h4 className="text-xs font-bold text-slate-850 dark:text-white leading-none">{c.userName}</h4>
                      <span className="text-4xs text-slate-400 font-semibold block mt-0.5">{c.category}</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-secondary">Est: {c.suggestedPoints} Pts</span>
                </div>

                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-150">{c.title}</h5>
                  <p className="text-3xs text-slate-500 leading-normal">{c.description}</p>
                </div>

                <div className="space-y-2 border-t border-slate-50 dark:border-slate-800/40 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-4xs font-semibold text-slate-450 uppercase">Awarded Points</label>
                      <input
                        type="number"
                        placeholder="Final points..."
                        value={adminPoints[c.id] || ""}
                        onChange={(e) => setAdminPoints({ ...adminPoints, [c.id]: parseInt(e.target.value) })}
                        className="w-full rounded border border-slate-200 dark:border-slate-700 bg-transparent px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-4xs font-semibold text-slate-450 uppercase">Review Feedback</label>
                      <input
                        type="text"
                        placeholder="Comments..."
                        value={adminComments[c.id] || ""}
                        onChange={(e) => setAdminComments({ ...adminComments, [c.id]: e.target.value })}
                        className="w-full rounded border border-slate-200 dark:border-slate-700 bg-transparent px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => rejectContrib(c.id, adminComments[c.id])}
                      className="flex-1 py-1.5 bg-rose-50 border border-rose-200 text-rose-600 text-2xs font-bold rounded-lg hover:bg-rose-100"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => {
                        const pts = adminPoints[c.id] !== undefined ? adminPoints[c.id] : c.suggestedPoints;
                        approveContrib(c.id, pts, adminComments[c.id]);
                      }}
                      className="flex-1 py-1.5 bg-emerald-500 text-white text-2xs font-bold rounded-lg hover:bg-emerald-600"
                    >
                      Approve & Log Points
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 9. Training & Learning Module
// ==========================================
export function TrainingModule() {
  const { user } = useRole();
  const trainings = useHrmsStore((s) => s.trainings).filter(t => t.userId === user.id);
  const toggleItem = useHrmsStore((s) => s.toggleTrainingItem);

  const [selectedModule, setSelectedModule] = useState<TrainingModuleType | null>(null);

  return (
    <div className="space-y-4 pb-6 animate-fade-in">
      {selectedModule ? (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex justify-between items-start border-b pb-2">
            <div>
              <span className="text-4xs font-bold bg-teal-50 text-primary px-1.5 py-0.5 rounded uppercase">{selectedModule.category}</span>
              <h3 className="text-xs font-bold text-slate-850 dark:text-white mt-1 leading-snug">{selectedModule.title}</h3>
            </div>
            <button
              onClick={() => setSelectedModule(null)}
              className="text-3xs text-slate-400 hover:text-slate-500 underline"
            >
              Back to Catalog
            </button>
          </div>

          <div className="space-y-3">
            <span className="text-3xs font-semibold text-slate-400 uppercase tracking-wide">Course Outline checklist</span>
            <div className="space-y-2">
              {selectedModule.contentItems.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => toggleItem(selectedModule.id, item.id)}
                  className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-50 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-850/30 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850 transition-all text-xs font-medium"
                >
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    readOnly
                    className="w-4 h-4 text-primary border-slate-300 rounded"
                  />
                  <div className="flex-1 min-w-0 flex justify-between items-center">
                    <span className={item.isCompleted ? "line-through text-slate-400" : "text-slate-700 dark:text-slate-200"}>{item.title}</span>
                    <span className="text-4xs text-slate-400 font-semibold uppercase">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedModule.progress === 100 && selectedModule.isCertificateEligible && (
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 p-3 rounded-xl flex flex-col gap-2 text-center animate-bounce">
              <Award className="w-8 h-8 text-emerald-500 mx-auto" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">Certificate Available!</h4>
                <p className="text-3xs text-slate-400">Congratulations on finishing your compliance requirements.</p>
              </div>
              <button
                onClick={() => alert("Downloading digital training completion certificate...")}
                className="mx-auto px-4 py-1.5 bg-emerald-500 text-white rounded-lg text-3xs font-bold hover:bg-emerald-600"
              >
                Download Certificate
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 px-1">Assigned Training Programs</h3>
          {trainings.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No assigned courses.</p>
          ) : (
            trainings.map((t) => (
              <div 
                key={t.id} 
                onClick={() => setSelectedModule(t)}
                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-all"
              >
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-4xs font-bold bg-teal-50 text-primary px-1.5 py-0.5 rounded uppercase">{t.category}</span>
                      {t.isMandatory && <span className="text-4xs font-extrabold bg-rose-50 text-rose-500 px-1.5 py-0.5 rounded uppercase">MANDATORY</span>}
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate block mt-1">{t.title}</h4>
                  </div>
                  <div className="flex items-center gap-3 text-3xs text-slate-450 font-medium">
                    <span>Duration: {t.duration}</span>
                    <span>Due: {t.dueDate}</span>
                  </div>
                </div>

                {/* Progress Ring or circle placeholder */}
                <div className="relative flex items-center justify-center w-12 h-12">
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle cx="24" cy="24" r="18" className="stroke-slate-150 dark:stroke-slate-800" strokeWidth="3" fill="transparent" />
                    <circle cx="24" cy="24" r="18" className="stroke-primary" strokeWidth="3" fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 18}`}
                      strokeDashoffset={`${2 * Math.PI * 18 * (1 - t.progress / 100)}`}
                    />
                  </svg>
                  <span className="absolute text-4xs font-black text-slate-700 dark:text-slate-350">{t.progress}%</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 10. Recruitment Module (HR/Admin Board)
// ==========================================
export function RecruitmentModule() {
  const { role } = useRole();
  const jobs = useHrmsStore((s) => s.jobs);
  const candidates = useHrmsStore((s) => s.candidates);
  
  const addJob = useHrmsStore((s) => s.addJobPosting);
  const updateStatus = useHrmsStore((s) => s.updateCandidateStatus);
  const scheduleInterview = useHrmsStore((s) => s.scheduleInterview);

  const [activeTab, setActiveTab] = useState<"jobs" | "candidates">("candidates");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  
  // Job Post creation Form
  const [jobTitle, setJobTitle] = useState("");
  const [jobDept, setJobDept] = useState("Engineering");
  const [jobLoc, setJobLoc] = useState("Jaipur HQ");
  const [jobExp, setJobExp] = useState("");
  const [jobSal, setJobSal] = useState("");
  const [showAddJobModal, setShowAddJobModal] = useState(false);

  // Interview Schedule Drawer simulation
  const [showInterviewDrawer, setShowInterviewDrawer] = useState(false);
  const [intDate, setIntDate] = useState("");
  const [intTime, setIntTime] = useState("");
  const [intRound, setIntRound] = useState("Technical Interview L1");

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle) return;

    addJob({
      title: jobTitle,
      department: jobDept,
      location: jobLoc,
      employmentType: "Full-Time",
      experienceRequired: jobExp,
      salaryRange: jobSal,
      requirements: ["Standard skill verification check", "Strong operational accountability"],
      status: "active",
    });

    setJobTitle("");
    setJobExp("");
    setJobSal("");
    setShowAddJobModal(false);
  };

  const handleInterviewSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate || !intDate || !intTime) return;

    scheduleInterview(selectedCandidate.id, intDate, intTime, intRound);
    setShowInterviewDrawer(false);
    
    // Refresh detailed candidate view context
    const updated = useHrmsStore.getState().candidates.find(c => c.id === selectedCandidate.id);
    if (updated) setSelectedCandidate(updated);
    
    alert(`Interview Scheduled on ${intDate} ${intTime} (${intRound})!`);
  };

  const pipelineStages: { status: Candidate["status"]; label: string }[] = [
    { status: "new", label: "New Applied" },
    { status: "screening", label: "Screening" },
    { status: "shortlisted", label: "Shortlisted" },
    { status: "interview-scheduled", label: "Interview Scheduled" },
    { status: "interviewed", label: "Interviewed" },
    { status: "offer-extended", label: "Offer Out" },
    { status: "hired", label: "Hired" },
    { status: "rejected", label: "Rejected" },
  ];

  return (
    <div className="space-y-4 pb-6">
      <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("candidates")}
          className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all ${
            activeTab === "candidates" 
              ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
              : "text-slate-400 hover:text-slate-500"
          }`}
        >
          Candidate Pipeline
        </button>
        <button
          onClick={() => setActiveTab("jobs")}
          className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all ${
            activeTab === "jobs" 
              ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
              : "text-slate-400 hover:text-slate-500"
          }`}
        >
          Job Postings
        </button>
      </div>

      {activeTab === "candidates" && (
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Hiring Pipeline Dashboard</h3>
            <span className="text-3xs text-slate-400 font-medium">Drag-and-stage mock boards below</span>
          </div>

          <div className="space-y-2">
            {candidates.map((c) => (
              <div 
                key={c.id} 
                onClick={() => setSelectedCandidate(c)}
                className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">{c.name}</h4>
                    <span className="text-4xs text-yellow-500 flex items-center">★ {c.rating}</span>
                  </div>
                  <p className="text-3xs text-slate-400 font-medium">{c.appliedRole} • {c.experience}</p>
                </div>
                <div className="text-right flex flex-col gap-1 items-end">
                  <StatusBadge status={c.status} />
                  <span className="text-4xs text-slate-400 font-semibold">Details ➜</span>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Candidate Drawer Modal */}
          {selectedCandidate && (
            <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-fade-in">
              <div className="bg-white dark:bg-slate-900 w-full max-w-[380px] h-full flex flex-col justify-between shadow-2xl relative">
                {/* Header */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{selectedCandidate.name}</h4>
                    <p className="text-3xs text-slate-450">{selectedCandidate.email}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-4xs font-bold text-slate-400 uppercase tracking-wide block">Applied Role</span>
                    <div className="font-bold text-slate-800 dark:text-slate-200">{selectedCandidate.appliedRole}</div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-4xs font-bold text-slate-400 uppercase tracking-wide block">Candidate Details</span>
                    <div className="grid grid-cols-2 gap-2 text-2xs">
                      <div className="bg-slate-50 dark:bg-slate-850 p-2 rounded">
                        <span className="text-slate-400 block">Expected Salary</span>
                        <strong className="text-slate-700 dark:text-slate-200">{selectedCandidate.expectedSalary}</strong>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-850 p-2 rounded">
                        <span className="text-slate-400 block">Notice Period</span>
                        <strong className="text-slate-700 dark:text-slate-200">{selectedCandidate.noticePeriod}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-4xs font-bold text-slate-400 uppercase tracking-wide block">Key Skills</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedCandidate.skills.map((s, idx) => (
                        <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-350 px-2 py-0.5 rounded text-3xs font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-4xs font-bold text-slate-400 uppercase tracking-wide block">HR Evaluator Notes</span>
                    <p className="text-3xs text-slate-550 leading-relaxed bg-yellow-50/40 p-2 rounded-lg border border-yellow-100/30">
                      &ldquo;{selectedCandidate.notes}&rdquo;
                    </p>
                  </div>

                  {/* Pipelines Stage Selector */}
                  <div className="space-y-1">
                    <span className="text-4xs font-bold text-slate-400 uppercase tracking-wide block">Pipeline Stage</span>
                    <select
                      value={selectedCandidate.status}
                      onChange={(e) => {
                        updateStatus(selectedCandidate.id, e.target.value as any);
                        const updated = useHrmsStore.getState().candidates.find(c => c.id === selectedCandidate.id);
                        if (updated) setSelectedCandidate(updated);
                      }}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200"
                    >
                      {pipelineStages.map(s => (
                        <option key={s.status} value={s.status}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Scheduled Interviews Log */}
                  <div className="space-y-2 border-t border-slate-50 dark:border-slate-800/60 pt-3">
                    <span className="text-4xs font-bold text-slate-400 uppercase tracking-wide block">Interviews Log</span>
                    {selectedCandidate.interviews.length === 0 ? (
                      <p className="text-3xs text-slate-400">No interviews scheduled yet.</p>
                    ) : (
                      selectedCandidate.interviews.map((int, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-850 p-2 rounded-lg flex justify-between items-center text-3xs">
                          <div>
                            <strong className="text-slate-750 dark:text-slate-200 block">{int.round}</strong>
                            <span className="text-slate-450">{int.date} at {int.time}</span>
                          </div>
                          <span className="bg-emerald-50 text-emerald-600 px-1.5 rounded">{int.status}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                  <button
                    onClick={() => setShowInterviewDrawer(true)}
                    className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-teal-700 shadow-sm flex items-center justify-center gap-1"
                  >
                    <Calendar className="w-4 h-4" /> Schedule Round
                  </button>
                </div>

                {/* Inner Interview Scheduling Form */}
                {showInterviewDrawer && (
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-end">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-t-2xl w-full border-t border-slate-250 dark:border-slate-800 space-y-3 animate-slide-in">
                      <div className="flex justify-between items-center">
                        <h5 className="text-xs font-bold text-slate-800 dark:text-white">Schedule Interview Round</h5>
                        <button onClick={() => setShowInterviewDrawer(false)} className="text-slate-400 hover:text-slate-500"><X className="w-4 h-4" /></button>
                      </div>

                      <form onSubmit={handleInterviewSchedule} className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-4xs font-semibold text-slate-400 uppercase">Round Title</label>
                          <select
                            value={intRound}
                            onChange={(e) => setIntRound(e.target.value)}
                            className="w-full rounded border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1 text-xs"
                          >
                            <option value="Technical Interview L1">Technical Interview L1</option>
                            <option value="System Design Round">System Design Round</option>
                            <option value="Managerial Fit Round">Managerial Fit Round</option>
                            <option value="HR Discussion & Offer">HR Discussion & Offer</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-4xs font-semibold text-slate-400 uppercase">Round Date</label>
                            <input
                              type="date"
                              required
                              value={intDate}
                              onChange={(e) => setIntDate(e.target.value)}
                              className="w-full rounded border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1 text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-4xs font-semibold text-slate-400 uppercase">Round Time</label>
                            <input
                              type="time"
                              required
                              value={intTime}
                              onChange={(e) => setIntTime(e.target.value)}
                              className="w-full rounded border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1 text-xs"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2 bg-secondary text-white text-xs font-bold rounded-lg hover:bg-orange-600"
                        >
                          Confirm Schedule
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "jobs" && (
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Active Job Postings</h3>
            <button
              onClick={() => setShowAddJobModal(true)}
              className="px-2.5 py-1 bg-primary text-white text-3xs font-bold rounded-lg hover:bg-teal-700 flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" /> Post Job
            </button>
          </div>

          <div className="space-y-2">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">{job.title}</h4>
                    <p className="text-3xs text-slate-405">{job.department} • {job.location}</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 text-3xs font-bold px-2 py-0.5 rounded">Active</span>
                </div>
                <div className="text-3xs text-slate-400 space-y-1 bg-slate-50 dark:bg-slate-850 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between"><strong>Exp Required:</strong> <span>{job.experienceRequired}</span></div>
                  <div className="flex justify-between"><strong>Salary Range:</strong> <span>{job.salaryRange}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Job Modal */}
      {showAddJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-850 shadow-2xl max-w-xs w-full space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Create New Job Posting</h4>
              <button onClick={() => setShowAddJobModal(false)} className="text-slate-450 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3">
              <div className="space-y-1">
                <label className="text-3xs font-semibold text-slate-400 uppercase">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Backend Architect"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full rounded border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="space-y-1">
                  <label className="text-3xs font-semibold text-slate-400 uppercase">Department</label>
                  <select
                    value={jobDept}
                    onChange={(e) => setJobDept(e.target.value)}
                    className="w-full rounded border border-slate-200 dark:border-slate-700 bg-transparent px-1.5 py-1 text-xs"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Human Resources">HR</option>
                    <option value="Product">Product</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-3xs font-semibold text-slate-400 uppercase">Location</label>
                  <select
                    value={jobLoc}
                    onChange={(e) => setJobLoc(e.target.value)}
                    className="w-full rounded border border-slate-200 dark:border-slate-700 bg-transparent px-1.5 py-1 text-xs"
                  >
                    <option value="Jaipur HQ">Jaipur HQ</option>
                    <option value="Remote IN">Remote IN</option>
                    <option value="San Francisco US">San Francisco US</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-3xs font-semibold text-slate-400 uppercase">Experience</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3-5 Years"
                    value={jobExp}
                    onChange={(e) => setJobExp(e.target.value)}
                    className="w-full rounded border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-3xs font-semibold text-slate-400 uppercase">Salary Range</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹12-15LPA"
                    value={jobSal}
                    onChange={(e) => setJobSal(e.target.value)}
                    className="w-full rounded border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-teal-700"
              >
                Publish Job Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
