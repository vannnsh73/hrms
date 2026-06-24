'use client';

import React, { useState } from "react";
import { useHrmsStore, Recognition, Announcement, User } from "../../store/mockDatabase";
import { useRole } from "../../context/RoleContext";
import { StatusBadge, Avatar } from "../shared";
import { 
  Heart, MessageSquare, Send, Megaphone, Check, Plus, 
  X, Users, Calendar, AlertTriangle, Eye, ShieldAlert, 
  BarChart2, PieChart, Sparkles 
} from "lucide-react";

// ==========================================
// 11. Recognition Module
// ==========================================
export function RecognitionModule() {
  const { user } = useRole();
  const recognitions = useHrmsStore((s) => s.recognitions);
  const users = useHrmsStore((s) => s.users).filter(u => u.id !== user.id);
  const sendRec = useHrmsStore((s) => s.sendRecognition);
  const likeRec = useHrmsStore((s) => s.likeRecognition);
  const commentRec = useHrmsStore((s) => s.commentRecognition);

  const [activeTab, setActiveTab] = useState<"feed" | "send">("feed");
  const [recipientId, setRecipientId] = useState("");
  const [category, setCategory] = useState<Recognition["category"]>("excellence");
  const [message, setMessage] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({});

  const handleSendRecognition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientId || !message) {
      alert("Please select a colleague and enter a message.");
      return;
    }

    sendRec(recipientId, category, message, isPublic);
    setMessage("");
    setRecipientId("");
    setActiveTab("feed");
    alert("Recognition sent!");
  };

  const recLabels: Record<Recognition["category"], string> = {
    excellence: "Excellence Badge",
    "team-player": "Team Player Badge",
    innovation: "Innovation Badge",
    leadership: "Leadership Badge",
    "customer-focus": "Customer Focus",
  };

  return (
    <div className="space-y-4 pb-6">
      <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("feed")}
          className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all ${
            activeTab === "feed" 
              ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
              : "text-slate-400 hover:text-slate-50"
          }`}
        >
          Appreciation Feed
        </button>
        <button
          onClick={() => setActiveTab("send")}
          className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all ${
            activeTab === "send" 
              ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
              : "text-slate-400 hover:text-slate-50"
          }`}
        >
          Recognize Peer
        </button>
      </div>

      {activeTab === "feed" ? (
        <div className="space-y-3">
          {recognitions.map((rec) => {
            const hasLiked = rec.likes.includes(user.id);
            return (
              <div key={rec.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3 animate-fade-in">
                {/* Recognition Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Avatar name={rec.senderName} size="sm" colorClass={rec.senderAvatarColor} />
                    <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
                    <Avatar name={rec.recipientName} size="sm" colorClass={rec.recipientAvatarColor} />
                  </div>
                  <span className="text-4xs font-bold bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full uppercase">
                    {recLabels[rec.category]}
                  </span>
                </div>

                <div className="text-2xs text-slate-500">
                  <strong className="text-slate-800 dark:text-slate-200 block">{rec.senderName} appreciated {rec.recipientName}:</strong>
                  <p className="italic bg-slate-50 dark:bg-slate-850 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 mt-1 leading-relaxed text-slate-600 dark:text-slate-350">
                    &ldquo;{rec.message}&rdquo;
                  </p>
                </div>

                {/* Social Actions */}
                <div className="flex gap-4 border-t border-slate-50 dark:border-slate-800/60 pt-2.5">
                  <button 
                    onClick={() => likeRec(rec.id)}
                    className={`flex items-center gap-1 text-3xs font-bold ${hasLiked ? "text-rose-500" : "text-slate-400 hover:text-slate-500"}`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasLiked ? "fill-rose-500" : ""}`} />
                    <span>{rec.likes.length} Likes</span>
                  </button>
                  <span className="flex items-center gap-1 text-3xs text-slate-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{rec.comments.length} Comments</span>
                  </span>
                </div>

                {/* Comments List */}
                {rec.comments.length > 0 && (
                  <div className="space-y-1.5 bg-slate-50 dark:bg-slate-850/40 p-2 rounded-lg border border-slate-100 dark:border-slate-800/40">
                    {rec.comments.map((c) => (
                      <div key={c.id} className="text-3xs text-slate-600 dark:text-slate-350">
                        <strong className="text-slate-800 dark:text-white">{c.userName}:</strong> {c.text}
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Write a supportive comment..."
                    value={commentTexts[rec.id] || ""}
                    onChange={(e) => setCommentTexts({ ...commentTexts, [rec.id]: e.target.value })}
                    className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2.5 py-1 text-3xs text-slate-800 dark:text-slate-200 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      if (!commentTexts[rec.id]) return;
                      commentRec(rec.id, commentTexts[rec.id]);
                      setCommentTexts({ ...commentTexts, [rec.id]: "" });
                    }}
                    className="p-1.5 bg-primary text-white rounded-lg hover:bg-teal-700 active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <form onSubmit={handleSendRecognition} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3.5">
          <h3 className="text-xs font-bold text-slate-800 dark:text-white">Send Peer Recognition</h3>

          <div className="space-y-1">
            <label className="text-3xs font-semibold text-slate-400 uppercase">Select Colleague</label>
            <select
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-2.5 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="">Choose a team member...</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name} ({u.designation})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <label className="text-3xs font-semibold text-slate-400 uppercase">Badge Type</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1.5 text-xs text-slate-800 dark:text-slate-200"
              >
                {Object.keys(recLabels).map(key => (
                  <option key={key} value={key}>{recLabels[key as Recognition["category"]]}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-3xs font-semibold text-slate-400 uppercase">Visibility</label>
              <select
                value={isPublic ? "public" : "private"}
                onChange={(e) => setIsPublic(e.target.value === "public")}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1.5 text-xs text-slate-800 dark:text-slate-200"
              >
                <option value="public">Public Feed</option>
                <option value="private">Private Direct Message</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-3xs font-semibold text-slate-400 uppercase">Appreciation Message</label>
            <textarea
              required
              rows={3}
              placeholder="Be descriptive! Mention exactly what they did to demonstrate values..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-teal-700 shadow-sm"
          >
            Post Appreciation
          </button>
        </form>
      )}
    </div>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

// ==========================================
// 12. Announcements Module
// ==========================================
export function AnnouncementModule() {
  const { user, role } = useRole();
  const announcements = useHrmsStore((s) => s.announcements);
  const addAnn = useHrmsStore((s) => s.createAnnouncement);
  const ackAnn = useHrmsStore((s) => s.acknowledgeAnnouncement);
  const likeAnn = useHrmsStore((s) => s.likeAnnouncement);

  const [activeTab, setActiveTab] = useState<"feed" | "create">("feed");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Announcement["category"]>("hr-update");
  const [priority, setPriority] = useState<Announcement["priority"]>("medium");
  const [scope, setScope] = useState<Announcement["scope"]>("global");
  const [targetValue, setTargetValue] = useState("");
  const [complianceRequired, setComplianceRequired] = useState(false);

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addAnn({
      title,
      content,
      category,
      priority,
      scope,
      targetValue: scope !== "global" ? targetValue : undefined,
      isComplianceRequired: complianceRequired,
    });

    setTitle("");
    setContent("");
    setTargetValue("");
    setComplianceRequired(false);
    setActiveTab("feed");
    alert("Announcement published!");
  };

  const catColors: Record<Announcement["category"], string> = {
    "hr-update": "bg-blue-50 text-blue-600 border-blue-150",
    event: "bg-teal-50 text-primary border-teal-150",
    policy: "bg-purple-50 text-purple-600 border-purple-150",
    celebration: "bg-pink-50 text-pink-600 border-pink-150",
    compliance: "bg-rose-50 text-rose-600 border-rose-150",
    general: "bg-slate-50 text-slate-600 border-slate-150"
  };

  return (
    <div className="space-y-4 pb-6">
      {["HR", "Admin"].includes(role) && (
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("feed")}
            className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all ${
              activeTab === "feed" 
                ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-50"
            }`}
          >
            Bulletin Board
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all ${
              activeTab === "create" 
                ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-50"
            }`}
          >
            Publish Post
          </button>
        </div>
      )}

      {activeTab === "feed" ? (
        <div className="space-y-3">
          {announcements.map((ann) => {
            const isAcked = ann.acknowledgments.includes(user.id);
            const hasLiked = ann.likes.includes(user.id);
            return (
              <div key={ann.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3 animate-fade-in">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-4xs font-bold px-2 py-0.5 rounded border ${catColors[ann.category]}`}>
                        {ann.category}
                      </span>
                      {ann.priority === "high" && (
                        <span className="text-4xs font-extrabold bg-rose-50 text-rose-500 px-1.5 py-0.5 rounded uppercase">Urgent</span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-850 dark:text-white mt-1.5 leading-snug">{ann.title}</h4>
                    <p className="text-4xs text-slate-400 mt-0.5">By {ann.authorName} • {ann.publishedDate}</p>
                  </div>
                </div>

                <p className="text-3xs text-slate-500 dark:text-slate-350 leading-relaxed bg-slate-50/50 dark:bg-slate-850/30 p-2.5 rounded-lg border border-slate-100/50 dark:border-slate-800/40">
                  {ann.content}
                </p>

                {/* Compliance Acknowledgment */}
                {ann.isComplianceRequired && (
                  <div className="p-3 bg-rose-50/40 dark:bg-rose-950/10 rounded-xl border border-rose-100/45 dark:border-rose-900/30 flex justify-between items-center gap-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      <div className="text-3xs text-slate-550 dark:text-slate-300">
                        <strong className="block text-slate-800 dark:text-slate-100">Mandatory Policy Acknowledgment</strong>
                        <span>Read document guidelines. Signing logs compliance receipt.</span>
                      </div>
                    </div>

                    {isAcked ? (
                      <span className="text-3xs text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-950/20 px-2 py-1 rounded flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Signed
                      </span>
                    ) : (
                      <button
                        onClick={() => ackAnn(ann.id)}
                        className="px-2.5 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded text-3xs font-bold whitespace-nowrap active:scale-95"
                      >
                        Sign Acknowledgement
                      </button>
                    )}
                  </div>
                )}

                {/* Social Engagements */}
                <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-800/60 pt-2 text-4xs text-slate-400">
                  <span>Views: {ann.views + 12}</span>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => likeAnn(ann.id)}
                      className={`flex items-center gap-0.5 font-bold ${hasLiked ? "text-primary" : "text-slate-400 hover:text-slate-500"}`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${hasLiked ? "fill-primary text-primary" : ""}`} />
                      <span>{ann.likes.length} Likes</span>
                    </button>
                    <span>{ann.acknowledgments.length} compliance signatures</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <form onSubmit={handleCreateAnnouncement} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3.5">
          <h3 className="text-xs font-bold text-slate-800 dark:text-white">Publish Company Announcement</h3>

          <div className="space-y-1">
            <label className="text-3xs font-semibold text-slate-400 uppercase">Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Q2 Performance Review Timelines"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-2.5 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-3xs font-semibold text-slate-400 uppercase">Bulletin Body</label>
            <textarea
              required
              rows={3}
              placeholder="Compose announcement body..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <label className="text-3xs font-semibold text-slate-400 uppercase">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1.5 text-xs text-slate-800 dark:text-slate-200"
              >
                <option value="hr-update">HR Update</option>
                <option value="event">Company Event</option>
                <option value="policy">Policy Bulletin</option>
                <option value="celebration">Celebrations</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-3xs font-semibold text-slate-400 uppercase">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1.5 text-xs text-slate-800 dark:text-slate-200"
              >
                <option value="low">Standard</option>
                <option value="medium">Important</option>
                <option value="high">Critical / Urgent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-3xs font-semibold text-slate-400 uppercase">Target Scope</label>
              <select
                value={scope}
                onChange={(e) => setScope(e.target.value as any)}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1.5 text-xs text-slate-800 dark:text-slate-200"
              >
                <option value="global">Global (All staff)</option>
                <option value="location">Specific HQ Location</option>
                <option value="department">Specific Department</option>
              </select>
            </div>
            {scope !== "global" && (
              <div className="space-y-1">
                <label className="text-3xs font-semibold text-slate-400 uppercase">Target Scope Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jaipur HQ"
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1 text-xs"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 py-2 px-1 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
            <input
              type="checkbox"
              id="compliance-check"
              checked={complianceRequired}
              onChange={(e) => setComplianceRequired(e.target.checked)}
              className="w-3.5 h-3.5 text-primary border-slate-350 rounded"
            />
            <label htmlFor="compliance-check" className="text-2xs font-semibold text-slate-500 cursor-pointer">
              Require compliance signature from staff?
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-teal-700 shadow-sm"
          >
            Publish Post
          </button>
        </form>
      )}
    </div>
  );
}

// ==========================================
// 13. Team Management Module
// ==========================================
export function TeamModule() {
  const { user } = useRole();
  const users = useHrmsStore((s) => s.users);

  // Group by department
  const depts = Array.from(new Set(users.map(u => u.department)));

  return (
    <div className="space-y-4 pb-6">
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-1">
        <h3 className="text-xs font-bold text-slate-800 dark:text-white">Jaipur HQ Directory</h3>
        <p className="text-3xs text-slate-400">PropVivo Modular monolith core roster listings</p>
      </div>

      <div className="space-y-3">
        {depts.map((dept) => {
          const deptUsers = users.filter(u => u.department === dept);
          return (
            <div key={dept} className="space-y-2">
              <h4 className="text-2xs font-extrabold text-slate-400 uppercase tracking-wide px-1">{dept}</h4>
              <div className="space-y-2">
                {deptUsers.map((u) => (
                  <div key={u.id} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex justify-between items-center gap-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={u.name} size="sm" colorClass={u.avatarColor} />
                      <div>
                        <h5 className="text-xs font-bold text-slate-800 dark:text-white leading-none">{u.name}</h5>
                        <p className="text-3xs text-slate-400 mt-0.5">{u.designation}</p>
                      </div>
                    </div>
                    <div className="text-right text-3xs text-slate-450">
                      <div>ID: {u.id}</div>
                      <div>{u.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 14. Analytics Module
// ==========================================
export function AnalyticsModule() {
  const { role } = useRole();
  const users = useHrmsStore((s) => s.users);
  const leaveRequests = useHrmsStore((s) => s.leaveRequests);

  // Computed data
  const headCount = users.length;
  const leavesTaken = leaveRequests.filter(r => r.status === "approved").length;
  const pendingApprovalsCount = leaveRequests.filter(r => r.status === "pending").length;

  return (
    <div className="space-y-4 pb-6">
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-1">
        <h3 className="text-xs font-bold text-slate-800 dark:text-white">People Analytics</h3>
        <p className="text-3xs text-slate-400">Org metrics & compliance utilization indices</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <span className="text-4xs font-bold text-slate-400 uppercase tracking-wide">Headcount</span>
          <div className="text-lg font-black text-primary mt-1">{headCount}</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <span className="text-4xs font-bold text-slate-400 uppercase tracking-wide">Leaves Used</span>
          <div className="text-lg font-black text-secondary mt-1">{leavesTaken}</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <span className="text-4xs font-bold text-slate-400 uppercase tracking-wide">Pending Appv.</span>
          <div className="text-lg font-black text-amber-500 mt-1">{pendingApprovalsCount}</div>
        </div>
      </div>

      {/* Leave utilization bar chart visualizer using standard CSS */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-slate-850 dark:text-white border-b pb-1 flex items-center gap-1">
          <BarChart2 className="w-4 h-4 text-primary" /> Leave utilization by Type
        </h4>
        
        <div className="space-y-2.5">
          <div className="space-y-1 text-3xs">
            <div className="flex justify-between font-semibold"><span>Casual Leave</span> <span>85%</span></div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: "85%" }} />
            </div>
          </div>
          <div className="space-y-1 text-3xs">
            <div className="flex justify-between font-semibold"><span>Sick Leave</span> <span>34%</span></div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-secondary h-2.5 rounded-full" style={{ width: "34%" }} />
            </div>
          </div>
          <div className="space-y-1 text-3xs">
            <div className="flex justify-between font-semibold"><span>Comp Offs</span> <span>60%</span></div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: "60%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Clock-in Compliance chart */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-slate-850 dark:text-white border-b pb-1 flex items-center gap-1">
          <PieChart className="w-4 h-4 text-primary" /> Shift Attendance Ratios
        </h4>
        <div className="flex items-center gap-4 py-2">
          {/* Circle indicator */}
          <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="26" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="4" fill="transparent" />
              <circle cx="32" cy="32" r="26" className="stroke-primary" strokeWidth="4" fill="transparent"
                strokeDasharray={`${2 * Math.PI * 26}`}
                strokeDashoffset={`${2 * Math.PI * 26 * (1 - 0.94)}`}
              />
            </svg>
            <span className="absolute text-2xs font-extrabold text-slate-800 dark:text-white">94%</span>
          </div>
          <div className="text-3xs space-y-1 text-slate-400 font-semibold">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-primary" /> <span>On-Time Clock-in (94%)</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-amber-500" /> <span>Late Clock-in Exception (4%)</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-rose-500" /> <span>Unexcused Absences (2%)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 15. HR Copilot AI Modal (Floating Panel)
// ==========================================
export function CopilotModal({ 
  currentView, 
  onClose 
}: { 
  currentView: string; 
  onClose: () => void 
}) {
  const { role, user } = useRole();
  const chatHistory = useHrmsStore((s) => s.copilotChatHistory);
  const addMessage = useHrmsStore((s) => s.addCopilotMessage);
  const clearChat = useHrmsStore((s) => s.clearCopilotChat);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userPrompt = input.trim();
    addMessage("user", userPrompt);
    setInput("");
    setLoading(true);

    try {
      // Gather context
      const isOnboarding = user.id === "EMP005"; // Nisha Verma is the onboarding demo user
      const context = {
        currentView,
        userRole: role,
        isOnboarding
      };

      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userPrompt,
          context
        })
      });

      if (!res.ok) {
        throw new Error("Copilot gateway connection error");
      }

      const data = await res.json();
      addMessage("assistant", data.response || "I processed your request, but did not receive a proper message payload.");
    } catch (err: any) {
      addMessage("assistant", `Error connecting to AI Copilot: ${err.message}. Since the Claude API requires live keys, I can simulate an HR response: "As an HR Copilot, I noticed you are in ${currentView} view. How can I help you navigate leave validations or payroll itemizations?"`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-[380px] h-[520px] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 to-teal-900 text-white p-3.5 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
            <div>
              <h3 className="text-xs font-bold leading-none">PropVivo HR Copilot</h3>
              <span className="text-4xs text-teal-150">Active View: {currentView}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={clearChat} className="text-4xs text-teal-200 hover:text-white underline font-semibold">Clear</button>
            <button onClick={onClose} className="text-teal-200 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {chatHistory.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}
            >
              <span className="text-4xs text-slate-400 font-bold uppercase mb-0.5">{msg.role === 'user' ? 'You' : 'Copilot AI'}</span>
              <div className={`p-2.5 rounded-xl text-3xs leading-relaxed max-w-[85%] ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-tl-none shadow-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex flex-col items-start animate-pulse">
              <span className="text-4xs text-slate-400 font-bold uppercase">Copilot AI</span>
              <div className="bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl rounded-tl-none text-3xs text-slate-400 flex items-center gap-1.5">
                <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary" />
                <span>Scanning compliance indexes...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendPrompt} className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
          <input
            type="text"
            required
            placeholder="Ask about PF returns, leave policies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 dark:border-slate-750 bg-transparent px-3 py-2 text-3xs text-slate-800 dark:text-slate-200 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="p-2 bg-secondary text-white rounded-xl hover:bg-orange-600 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
