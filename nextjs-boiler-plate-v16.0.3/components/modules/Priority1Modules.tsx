'use client';

import React, { useState, useEffect } from "react";
import { useHrmsStore, LeaveBalance, LeaveRequest, DocumentRecord, ExpenseRecord, PayslipRecord } from "../../store/mockDatabase";
import { useRole } from "../../context/RoleContext";
import { StatusBadge, Avatar, PageHeader, ProgressBar, ApprovalFlow } from "../shared";
import { 
  Camera, MapPin, Globe, Calendar, Briefcase, FileText, 
  TrendingUp, Download, Eye, UploadCloud, AlertTriangle, 
  Map, DollarSign, Plus, Check, X, ShieldAlert 
} from "lucide-react";

// ==========================================
// 1. Attendance Module
// ==========================================
export function AttendanceModule() {
  const { user } = useRole();
  const attendance = useHrmsStore((s) => s.attendance).filter(r => r.userId === user.id);
  const activeAtt = useHrmsStore((s) => s.activeAttendance);
  const clockIn = useHrmsStore((s) => s.clockIn);
  const clockOut = useHrmsStore((s) => s.clockOut);

  const [selfieSimulating, setSelfieSimulating] = useState(false);
  const [capturedSelfie, setCapturedSelfie] = useState<string | null>(null);
  const [timeStr, setTimeStr] = useState("00:00:00");

  // Timer effect when clocked in
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeAtt) {
      const start = new Date().getTime() - 60000 * 20; // simulate 20 mins ago
      timer = setInterval(() => {
        const diff = new Date().getTime() - start;
        const hrs = Math.floor(diff / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setTimeStr(
          `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
        );
      }, 1000);
    } else {
      setTimeStr("00:00:00");
    }
    return () => clearInterval(timer);
  }, [activeAtt]);

  const handleClockIn = () => {
    setSelfieSimulating(true);
    setTimeout(() => {
      const mockSelfie = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150";
      setCapturedSelfie(mockSelfie);
      clockIn(
        mockSelfie,
        "Jaipur HQ - 26.9124° N, 75.7873° E",
        "192.168.1.189",
        "selfie"
      );
      setSelfieSimulating(false);
    }, 1500);
  };

  return (
    <div className="space-y-4 pb-6">
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 bg-primary/10 text-primary px-3 py-1 text-3xs font-semibold uppercase rounded-bl-xl">
          Live Connection
        </div>
        <h2 className="text-sm font-bold text-slate-800 dark:text-white mb-3">Time Tracker</h2>
        
        {activeAtt ? (
          <div className="text-center py-4 space-y-3 animate-fade-in">
            <div className="text-3xl font-extrabold text-primary tracking-widest font-mono">
              {timeStr}
            </div>
            <p className="text-2xs text-slate-400">Clocked in at {activeAtt.clockInTime} • Productive State</p>
            <div className="flex justify-center gap-4 text-2xs text-slate-500 border-t border-b border-slate-100 dark:border-slate-800/60 py-2">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary" /> Location Verified</span>
              <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-primary" /> IP Validated</span>
            </div>
            <button
              onClick={() => clockOut()}
              className="w-full py-2.5 bg-rose-500 text-white rounded-xl text-xs font-bold hover:bg-rose-600 active:scale-95 transition-all shadow-md shadow-rose-200 dark:shadow-none"
            >
              Clock Out & Save Shift
            </button>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800/80 flex items-center justify-center border border-slate-100 dark:border-slate-700/50">
              <Camera className="w-6 h-6 text-slate-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Selfie Capture Required</h3>
              <p className="text-3xs text-slate-400 max-w-[280px] mx-auto">PropVivo policies require facial verification, location logging and network checks at clock-in.</p>
            </div>
            
            <button
              onClick={handleClockIn}
              disabled={selfieSimulating}
              className="w-full py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-teal-700 active:scale-95 transition-all shadow-md shadow-teal-100 dark:shadow-none flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {selfieSimulating ? (
                <>
                  <span className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white" />
                  Facial Match Checking...
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  Clock In via Selfie
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Shift Details & IP checks */}
      <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2.5">
        <h3 className="text-2xs font-bold text-slate-400 uppercase tracking-wider">Verification Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-2xs">
          <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-1">
            <span className="text-slate-400 font-medium">GPS Coordinates</span>
            <span className="font-bold text-slate-700 dark:text-slate-200">26.9124° N, 75.7873° E</span>
            <span className="text-emerald-500 font-semibold flex items-center gap-0.5"><Check className="w-3 h-3" /> JaipurHQ Radius</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-1">
            <span className="text-slate-400 font-medium">IP Log Address</span>
            <span className="font-bold text-slate-700 dark:text-slate-200">192.168.1.189</span>
            <span className="text-emerald-500 font-semibold flex items-center gap-0.5"><Check className="w-3 h-3" /> Secure Gateway</span>
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 px-1">Clock logs (This Week)</h3>
        <div className="space-y-2">
          {attendance.map((rec) => (
            <div key={rec.id} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                {rec.selfieUrl ? (
                  <img src={rec.selfieUrl} alt="selfie" className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-bold">AJ</div>
                )}
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{rec.date}</div>
                  <div className="text-3xs text-slate-400">In: {rec.clockInTime} • Out: {rec.clockOutTime || "Active"}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">{rec.productiveHours} hrs</div>
                <StatusBadge status={rec.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. Leave Management Module
// ==========================================
export function LeaveModule() {
  const { user, role } = useRole();
  const balances = useHrmsStore((s) => s.leaveBalances)[user.id] || {
    casual: { allowed: 12, used: 0, pending: 0 },
    sick: { allowed: 8, used: 0, pending: 0 },
    personal: { allowed: 5, used: 0, pending: 0 },
    maternity: { allowed: 180, used: 0, pending: 0 },
    paternity: { allowed: 15, used: 0, pending: 0 },
    lwp: { allowed: 30, used: 0, pending: 0 },
    compOff: { allowed: 4, used: 0, pending: 0 }
  };

  const leaveRequests = useHrmsStore((s) => s.leaveRequests);
  const myRequests = leaveRequests.filter(r => r.userId === user.id);
  const pendingApprovals = leaveRequests.filter(r => r.status === "pending");
  
  const submitLeave = useHrmsStore((s) => s.submitLeave);
  const approveLeave = useHrmsStore((s) => s.approveLeave);
  const rejectLeave = useHrmsStore((s) => s.rejectLeave);

  const [activeTab, setActiveTab] = useState<"balances" | "request" | "approvals">("balances");
  const [leaveType, setLeaveType] = useState<keyof LeaveBalance>("casual");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [comments, setComments] = useState<Record<string, string>>({});

  const leaveLabels: Record<keyof LeaveBalance, string> = {
    casual: "Casual Leave",
    sick: "Sick Leave",
    personal: "Personal Leave",
    maternity: "Maternity Leave",
    paternity: "Paternity Leave",
    lwp: "Leave Without Pay",
    compOff: "Compensatory Off"
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!startDate || !endDate || !reason) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    try {
      submitLeave({
        leaveType,
        startDate,
        endDate,
        totalDays: diffDays,
        reason,
      });
      setSuccessMsg(`Leave request submitted successfully for ${diffDays} day(s).`);
      setStartDate("");
      setEndDate("");
      setReason("");
    } catch (err: any) {
      setErrorMsg(err.message || "Submission failed.");
    }
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Mini Segment Switcher */}
      <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("balances")}
          className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all ${
            activeTab === "balances" 
              ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
              : "text-slate-400 hover:text-slate-500"
          }`}
        >
          Balances
        </button>
        <button
          onClick={() => setActiveTab("request")}
          className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all ${
            activeTab === "request" 
              ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
              : "text-slate-400 hover:text-slate-500"
          }`}
        >
          Apply Leave
        </button>
        {["Manager", "HR", "Admin"].includes(role) && (
          <button
            onClick={() => setActiveTab("approvals")}
            className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all relative ${
              activeTab === "approvals" 
                ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-500"
            }`}
          >
            Approvals
            {pendingApprovals.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white w-4 h-4 rounded-full flex items-center justify-center text-3xs font-extrabold scale-90">
                {pendingApprovals.length}
              </span>
            )}
          </button>
        )}
      </div>

      {activeTab === "balances" && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(balances) as Array<keyof LeaveBalance>).map((key) => {
              const bal = balances[key];
              const available = bal.allowed - bal.used - bal.pending;
              return (
                <div key={key} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between gap-1.5">
                  <div className="text-3xs font-semibold text-slate-400 truncate">{leaveLabels[key]}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-extrabold text-slate-800 dark:text-white">{available}</span>
                    <span className="text-3xs text-slate-400">/ {bal.allowed} left</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-3xs font-medium text-slate-400">
                      <span>Used: {bal.used}d</span>
                      <span>Pending: {bal.pending}d</span>
                    </div>
                    <ProgressBar value={(bal.used / bal.allowed) * 100} color={key === 'sick' ? 'orange' : 'teal'} size="sm" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-2 mt-4">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">My Requests History</h3>
            {myRequests.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No leave requests found.</p>
            ) : (
              <div className="space-y-2">
                {myRequests.map((req) => (
                  <div key={req.id} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{leaveLabels[req.leaveType]}</h4>
                        <p className="text-3xs text-slate-400 font-medium">{req.startDate} to {req.endDate} ({req.totalDays} days)</p>
                      </div>
                      <StatusBadge status={req.status} />
                    </div>
                    <p className="text-3xs text-slate-500 italic bg-slate-50 dark:bg-slate-850 px-2 py-1 rounded">
                      &ldquo;{req.reason}&rdquo;
                    </p>
                    {req.managerComments && (
                      <p className="text-3xs text-emerald-600 font-medium">
                        Manager comments: {req.managerComments}
                      </p>
                    )}
                    <ApprovalFlow 
                      currentLevel={1} 
                      approverName={req.approvalLevels[0].approverName} 
                      status={req.approvalLevels[0].status} 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "request" && (
        <form onSubmit={handleRequestSubmit} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3.5">
          <h3 className="text-xs font-bold text-slate-800 dark:text-white">New Leave Request</h3>
          
          <div className="space-y-1">
            <label className="text-3xs font-semibold text-slate-400 uppercase">Leave Category</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value as keyof LeaveBalance)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-primary focus:outline-none"
            >
              {(Object.keys(balances) as Array<keyof LeaveBalance>).map((key) => {
                const bal = balances[key];
                const avail = bal.allowed - bal.used - bal.pending;
                return (
                  <option key={key} value={key} className="dark:bg-slate-900">
                    {leaveLabels[key]} ({avail} available)
                  </option>
                );
              })}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-3xs font-semibold text-slate-400 uppercase">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-3xs font-semibold text-slate-400 uppercase">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-3xs font-semibold text-slate-400 uppercase">Reason for Absence</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="Provide a brief explanation..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          {errorMsg && <p className="text-3xs text-rose-500 font-semibold">{errorMsg}</p>}
          {successMsg && <p className="text-3xs text-emerald-500 font-semibold">{successMsg}</p>}

          <button
            type="submit"
            className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-teal-700 active:scale-95 transition-all shadow-sm"
          >
            Submit Leave Form
          </button>
        </form>
      )}

      {activeTab === "approvals" && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 px-1">Pending approval requests</h3>
          {pendingApprovals.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No pending leave requests.</p>
          ) : (
            <div className="space-y-2">
              {pendingApprovals.map((req) => (
                <div key={req.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar name={req.userName} size="sm" colorClass="bg-teal-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-white">{req.userName}</div>
                        <div className="text-3xs text-slate-400">{leaveLabels[req.leaveType]}</div>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-primary">{req.totalDays} Days</span>
                  </div>

                  <div className="text-2xs text-slate-500 space-y-1">
                    <div><strong>Duration:</strong> {req.startDate} to {req.endDate}</div>
                    <div className="italic bg-slate-50 dark:bg-slate-850 p-2 rounded">&ldquo;{req.reason}&ldquo;</div>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Add manager response comments..."
                      value={comments[req.id] || ""}
                      onChange={(e) => setComments({ ...comments, [req.id]: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2.5 py-1.5 text-2xs text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => rejectLeave(req.id, comments[req.id])}
                        className="flex-1 py-1.5 bg-rose-50 border border-rose-200 text-rose-600 text-2xs font-bold rounded-lg hover:bg-rose-100"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => approveLeave(req.id, comments[req.id])}
                        className="flex-1 py-1.5 bg-emerald-500 text-white text-2xs font-bold rounded-lg hover:bg-emerald-600"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. Payroll & Compliance Module
// ==========================================
export function PayrollModule() {
  const { user } = useRole();
  const payslips = useHrmsStore((s) => s.payslips).filter(p => p.userId === user.id);
  const [selectedPayslip, setSelectedPayslip] = useState<PayslipRecord | null>(null);
  const [country, setCountry] = useState<"IN" | "US">("IN");

  const [activeTab, setActiveTab] = useState<"payslips" | "compliance">("payslips");

  // Simulated payslip formatting
  const fmt = (num: number, cur: string) => {
    return cur === "INR" 
      ? `₹${num.toLocaleString('en-IN')}` 
      : `$${num.toLocaleString('en-US')}`;
  };

  const handleDownload = (payslip: PayslipRecord) => {
    alert(`Downloading itemized PDF payslip for period: ${payslip.month} ${payslip.year}...`);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Sub menu */}
      <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("payslips")}
          className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all ${
            activeTab === "payslips" 
              ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
              : "text-slate-400 hover:text-slate-500"
          }`}
        >
          My Payslips
        </button>
        <button
          onClick={() => setActiveTab("compliance")}
          className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all ${
            activeTab === "compliance" 
              ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
              : "text-slate-400 hover:text-slate-500"
          }`}
        >
          Compliance Portal
        </button>
      </div>

      {activeTab === "payslips" && (
        <>
          {selectedPayslip ? (
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 animate-slide-in">
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">PropVivo Solutions Pvt Ltd</h3>
                  <p className="text-3xs text-slate-400">Jaipur HQ • Payslip for {selectedPayslip.month} {selectedPayslip.year}</p>
                </div>
                <button
                  onClick={() => setSelectedPayslip(null)}
                  className="text-3xs text-slate-400 hover:text-slate-500 underline"
                >
                  Back to List
                </button>
              </div>

              {/* Core Calculations */}
              {(() => {
                const totalEarnings = Object.values(selectedPayslip.earnings).reduce((a, b) => a + b, 0);
                const totalDeductions = Object.values(selectedPayslip.deductions).reduce((a, b) => a + b, 0);
                const netPay = totalEarnings - totalDeductions;
                const cur = selectedPayslip.currency;

                return (
                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <div className="text-3xs font-semibold text-slate-400 uppercase">Net Pay Outflow</div>
                        <div className="text-xl font-black text-secondary">{fmt(netPay, cur)}</div>
                      </div>
                      <button
                        onClick={() => handleDownload(selectedPayslip)}
                        className="p-2 bg-primary text-white rounded-lg hover:bg-teal-700 transition-all flex items-center gap-1 text-2xs font-bold shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" /> PDF
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-2xs">
                      {/* Earnings */}
                      <div className="space-y-2 border-r border-slate-100 dark:border-slate-800/80 pr-2">
                        <h4 className="font-bold text-emerald-600 uppercase tracking-wider text-3xs border-b pb-1">Earnings</h4>
                        <div className="space-y-1.5 font-medium text-slate-600 dark:text-slate-300">
                          <div className="flex justify-between"><span>Basic Pay</span> <span>{fmt(selectedPayslip.earnings.basic, cur)}</span></div>
                          <div className="flex justify-between"><span>HRA</span> <span>{fmt(selectedPayslip.earnings.hra, cur)}</span></div>
                          <div className="flex justify-between"><span>Spl. Allowance</span> <span>{fmt(selectedPayslip.earnings.specialAllowance, cur)}</span></div>
                          {selectedPayslip.earnings.bonus > 0 && <div className="flex justify-between"><span>Bonus</span> <span>{fmt(selectedPayslip.earnings.bonus, cur)}</span></div>}
                          {selectedPayslip.earnings.overtime > 0 && <div className="flex justify-between"><span>Overtime</span> <span>{fmt(selectedPayslip.earnings.overtime, cur)}</span></div>}
                          {selectedPayslip.earnings.reimbursements > 0 && <div className="flex justify-between text-teal-600"><span>Reimburse.</span> <span>{fmt(selectedPayslip.earnings.reimbursements, cur)}</span></div>}
                          <div className="flex justify-between font-bold text-slate-800 dark:text-slate-100 border-t pt-1.5">
                            <span>Gross Pay</span> <span>{fmt(totalEarnings, cur)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Deductions */}
                      <div className="space-y-2">
                        <h4 className="font-bold text-rose-600 uppercase tracking-wider text-3xs border-b pb-1">Deductions</h4>
                        <div className="space-y-1.5 font-medium text-slate-600 dark:text-slate-300">
                          <div className="flex justify-between"><span>Provident Fund</span> <span>{fmt(selectedPayslip.deductions.pf, cur)}</span></div>
                          <div className="flex justify-between"><span>Income Tax (TDS)</span> <span>{fmt(selectedPayslip.deductions.incomeTax, cur)}</span></div>
                          <div className="flex justify-between"><span>Professional Tax</span> <span>{fmt(selectedPayslip.deductions.professionalTax, cur)}</span></div>
                          <div className="flex justify-between"><span>ESI Contribution</span> <span>{fmt(selectedPayslip.deductions.esi, cur)}</span></div>
                          <div className="flex justify-between"><span>Health Ins</span> <span>{fmt(selectedPayslip.deductions.healthInsurance, cur)}</span></div>
                          <div className="flex justify-between font-bold text-slate-800 dark:text-slate-100 border-t pt-1.5">
                            <span>Total Deduct.</span> <span>{fmt(totalDeductions, cur)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Employer contributions */}
                    <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg text-3xs space-y-1 text-slate-400">
                      <div className="font-bold uppercase tracking-wider text-slate-500 mb-1 border-b pb-0.5">Employer Statutory Contributions</div>
                      <div className="flex justify-between"><span>Provident Fund (EPF Contribution)</span> <span className="font-semibold text-slate-600 dark:text-slate-300">{fmt(selectedPayslip.employerContributions.pf, cur)}</span></div>
                      <div className="flex justify-between"><span>ESI Employer Contribution</span> <span className="font-semibold text-slate-600 dark:text-slate-300">{fmt(selectedPayslip.employerContributions.esi, cur)}</span></div>
                      <div className="flex justify-between"><span>Gratuity Provisions (Accrued)</span> <span className="font-semibold text-slate-600 dark:text-slate-300">{fmt(selectedPayslip.employerContributions.gratuity, cur)}</span></div>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="space-y-2">
              {payslips.map((pay) => {
                const totalEarnings = Object.values(pay.earnings).reduce((a, b) => a + b, 0);
                const totalDeductions = Object.values(pay.deductions).reduce((a, b) => a + b, 0);
                const net = totalEarnings - totalDeductions;
                return (
                  <div 
                    key={pay.id} 
                    onClick={() => setSelectedPayslip(pay)}
                    className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-white">{pay.month} {pay.year}</div>
                        <div className="text-3xs text-slate-400">Paid on {pay.payDate}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-slate-700 dark:text-slate-200">{fmt(net, pay.currency)}</div>
                      <span className="text-3xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">PAID</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {activeTab === "compliance" && (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-800 dark:text-white">Compliance Overview</h3>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value as "IN" | "US")}
              className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2.5 py-1 text-slate-600 dark:text-slate-200"
            >
              <option value="IN">India Portal</option>
              <option value="US">United States Portal</option>
            </select>
          </div>

          <div className="space-y-3">
            {country === "IN" ? (
              <>
                <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/40 flex gap-3 items-start text-2xs">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 dark:text-slate-100 block">PF UAN Verification (UAN: 1009876543)</strong>
                    <span className="text-slate-400">KYC verification fully authenticated by EPFO gateway. Contribution deductions mapped.</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/40 flex gap-3 items-start text-2xs">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 dark:text-slate-100 block">ESI Account Status</strong>
                    <span className="text-slate-400">Accident and health premium allocations are linked with Jaipur ESI dispensary code 12.</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/40 flex gap-3 items-start text-2xs">
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 dark:text-slate-100 block">Form 16 Release Status</strong>
                    <span className="text-slate-400">Part A and B matching for AY 2026-27 is processing. Expected release date June 30th.</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/40 flex gap-3 items-start text-2xs">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 dark:text-slate-100 block">US W-4 Tax Allowance Withholdings</strong>
                    <span className="text-slate-400">Standard filing status verified. Federal and State tax tables synchronized.</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/40 flex gap-3 items-start text-2xs">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 dark:text-slate-100 block">Form I-9 Employment Verification</strong>
                    <span className="text-slate-400">Work eligibility checked via E-Verify platform. Status: Cleared.</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 flex gap-3 items-start text-2xs">
                  <FileText className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 dark:text-slate-100 block">W-2 Form Archive</strong>
                    <span className="text-slate-400">Archive sheets available for download under historical document tab.</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. Documents Module
// ==========================================
export function DocumentModule() {
  const { user, role } = useRole();
  const documents = useHrmsStore((s) => s.documents);
  const myDocs = documents.filter(d => d.userId === user.id);
  const uploadDoc = useHrmsStore((s) => s.uploadDocument);
  const verifyDoc = useHrmsStore((s) => s.verifyDocument);
  const rejectDoc = useHrmsStore((s) => s.rejectDocument);

  // HR verification queue
  const verificationQueue = documents.filter(d => d.status === "uploaded");

  const [activeTab, setActiveTab] = useState<"my_docs" | "verify_queue">("my_docs");
  const [selectedCat, setSelectedCat] = useState<DocumentRecord["category"]>("identity");
  const [docName, setDocName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [rejectReason, setRejectReason] = useState<Record<string, string>>({});

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName) return;

    uploadDoc(selectedCat, docName, "1.4 MB", "#");
    setDocName("");
    setExpiryDate("");
    setShowUploadModal(false);
  };

  const categories: { key: DocumentRecord["category"]; label: string }[] = [
    { key: "identity", label: "National ID" },
    { key: "tax", label: "Tax Forms" },
    { key: "work-auth", label: "Work Auth" },
    { key: "education", label: "Education" },
    { key: "employment", label: "Employment" },
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* Sub menu tabs */}
      {["HR", "Admin"].includes(role) && (
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("my_docs")}
            className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all ${
              activeTab === "my_docs" 
                ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-500"
            }`}
          >
            My Documents
          </button>
          <button
            onClick={() => setActiveTab("verify_queue")}
            className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all relative ${
              activeTab === "verify_queue" 
                ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-500"
            }`}
          >
            Verify Queue
            {verificationQueue.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white w-4 h-4 rounded-full flex items-center justify-center text-3xs font-extrabold scale-90">
                {verificationQueue.length}
              </span>
            )}
          </button>
        </div>
      )}

      {activeTab === "my_docs" && (
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Compliance Files</h3>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-2.5 py-1 bg-primary text-white text-3xs font-bold rounded-lg hover:bg-teal-700 transition-all flex items-center gap-1 shadow-sm"
            >
              <UploadCloud className="w-3.5 h-3.5" /> Upload File
            </button>
          </div>

          {/* Category-wise list */}
          <div className="space-y-2">
            {categories.map((cat) => {
              const catDocs = myDocs.filter(d => d.category === cat.key);
              return (
                <div key={cat.key} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-2">
                  <h4 className="text-2xs font-extrabold text-slate-400 uppercase tracking-wide border-b border-slate-100 dark:border-slate-800/60 pb-1">
                    {cat.label}
                  </h4>
                  {catDocs.length === 0 ? (
                    <div className="flex items-center justify-between py-1 text-3xs text-rose-500 font-semibold bg-rose-50/20 px-2 rounded">
                      <span>No document uploaded</span>
                      <StatusBadge status="missing" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {catDocs.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between text-2xs">
                          <div className="flex-1 min-w-0 pr-2">
                            <span className="font-bold text-slate-700 dark:text-slate-200 truncate block">{doc.name}</span>
                            <span className="text-3xs text-slate-400">
                              {doc.fileSize} {doc.expiryDate && `• Expires: ${doc.expiryDate}`}
                            </span>
                            {doc.rejectionReason && (
                              <span className="text-3xs text-rose-500 font-bold block mt-0.5">Reason: {doc.rejectionReason}</span>
                            )}
                          </div>
                          <StatusBadge status={doc.status} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "verify_queue" && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 px-1">Awaiting Verification</h3>
          {verificationQueue.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No documents pending verification.</p>
          ) : (
            <div className="space-y-2">
              {verificationQueue.map((doc) => (
                <div key={doc.id} className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white">{doc.name}</h4>
                      <p className="text-3xs text-slate-400">Category: {doc.category} • Size: {doc.fileSize}</p>
                    </div>
                    <span className="text-3xs text-primary font-bold bg-teal-50 dark:bg-teal-950/20 px-2 py-0.5 rounded">Uploaded</span>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Reason for rejection (required only if rejecting)..."
                      value={rejectReason[doc.id] || ""}
                      onChange={(e) => setRejectReason({ ...rejectReason, [doc.id]: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2.5 py-1.5 text-2xs text-slate-850 dark:text-slate-200 focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (!rejectReason[doc.id]) {
                            alert("Please enter a rejection reason.");
                            return;
                          }
                          rejectDoc(doc.id, rejectReason[doc.id]);
                        }}
                        className="flex-1 py-1.5 bg-rose-50 border border-rose-200 text-rose-600 text-2xs font-bold rounded-lg hover:bg-rose-100"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => verifyDoc(doc.id)}
                        className="flex-1 py-1.5 bg-emerald-500 text-white text-2xs font-bold rounded-lg hover:bg-emerald-600"
                      >
                        Verify & Clear
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Upload Modal simulation */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-250 dark:border-slate-700 shadow-xl max-w-xs w-full space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Upload compliance document</h4>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-500"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-3xs font-semibold text-slate-400 uppercase">Document Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Passport, Tax Return Form..."
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-3xs font-semibold text-slate-400 uppercase">Category</label>
                <select
                  value={selectedCat}
                  onChange={(e) => setSelectedCat(e.target.value as DocumentRecord["category"])}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200"
                >
                  {categories.map(c => (
                    <option key={c.key} value={c.key}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-3xs font-semibold text-slate-400 uppercase">Expiry Date (Optional)</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-teal-700"
              >
                Upload File Form
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. Expenses & Reimbursements Module
// ==========================================
export function ExpenseModule() {
  const { user, role } = useRole();
  const expenses = useHrmsStore((s) => s.expenses);
  const myExpenses = expenses.filter(e => e.userId === user.id);
  const pendingClaims = expenses.filter(e => e.status === "pending-approval");
  const submitExpense = useHrmsStore((s) => s.submitExpense);
  const approveExpense = useHrmsStore((s) => s.approveExpense);
  const rejectExpense = useHrmsStore((s) => s.rejectExpense);

  const [activeTab, setActiveTab] = useState<"claims" | "submit" | "approvals">("claims");
  const [category, setCategory] = useState<ExpenseRecord["category"]>("travel");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [isTaxable, setIsTaxable] = useState(false);
  const [isMileage, setIsMileage] = useState(false);

  // Mileage details
  const [locations, setLocations] = useState("");
  const [distance, setDistance] = useState("");
  const ratePerKm = 15;

  const [successMsg, setSuccessMsg] = useState("");
  const [comments, setComments] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isMileage) {
      const dist = parseFloat(distance) || 0;
      setAmount((dist * ratePerKm).toString());
    }
  }, [distance, isMileage]);

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");

    const valAmount = parseFloat(amount);
    if (isNaN(valAmount) || valAmount <= 0 || !description || !date) {
      alert("Please fill in valid expense parameters.");
      return;
    }

    submitExpense({
      category,
      amount: valAmount,
      currency: "INR",
      description,
      date,
      isTaxable,
      mileage: isMileage ? {
        distanceKm: parseFloat(distance),
        locations,
        ratePerKm,
      } : undefined
    });

    setSuccessMsg("Expense claim submitted for processing.");
    setAmount("");
    setDescription("");
    setDate("");
    setLocations("");
    setDistance("");
    setIsMileage(false);
  };

  const categoryLabels: Record<ExpenseRecord["category"], string> = {
    travel: "Travel / Transport",
    food: "Food & Meals",
    accommodation: "Lodging / Housing",
    communication: "Broadband / Mobile",
    medical: "Medical Reimbursements",
    "office-supplies": "Office Supplies",
    other: "Other Expenses"
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Sub tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("claims")}
          className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all ${
            activeTab === "claims" 
              ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
              : "text-slate-400 hover:text-slate-500"
          }`}
        >
          My Claims
        </button>
        <button
          onClick={() => setActiveTab("submit")}
          className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all ${
            activeTab === "submit" 
              ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
              : "text-slate-400 hover:text-slate-500"
          }`}
        >
          New Claim
        </button>
        {["Manager", "HR", "Admin"].includes(role) && (
          <button
            onClick={() => setActiveTab("approvals")}
            className={`flex-1 text-2xs py-1.5 rounded-lg font-bold transition-all relative ${
              activeTab === "approvals" 
                ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-500"
            }`}
          >
            Approvals
            {pendingClaims.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white w-4 h-4 rounded-full flex items-center justify-center text-3xs font-extrabold scale-90">
                {pendingClaims.length}
              </span>
            )}
          </button>
        )}
      </div>

      {activeTab === "claims" && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 px-1">Reimbursement Tracker</h3>
          {myExpenses.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No expense claims found.</p>
          ) : (
            <div className="space-y-2">
              {myExpenses.map((exp) => (
                <div key={exp.id} className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{categoryLabels[exp.category]}</h4>
                      <p className="text-3xs text-slate-400 font-medium">Claim Date: {exp.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-slate-800 dark:text-white block">₹{exp.amount}</span>
                      <StatusBadge status={exp.status} />
                    </div>
                  </div>
                  <p className="text-3xs text-slate-500 italic bg-slate-50 dark:bg-slate-850 px-2 py-1 rounded">
                    &ldquo;{exp.description}&rdquo;
                  </p>
                  {exp.mileage && (
                    <div className="text-3xs text-slate-400 flex items-center gap-1">
                      <Map className="w-3.5 h-3.5 text-primary" />
                      <span>Mileage: {exp.mileage.distanceKm} km ({exp.mileage.locations})</span>
                    </div>
                  )}
                  {exp.policyFeedback?.warningMessage && (
                    <div className="text-3xs text-rose-500 font-semibold flex items-center gap-1 bg-rose-50/50 dark:bg-rose-950/15 p-1 rounded border border-rose-100/50">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{exp.policyFeedback.warningMessage}</span>
                    </div>
                  )}
                  {exp.managerComments && (
                    <p className="text-3xs text-emerald-600 font-medium mt-1">Approver comments: {exp.managerComments}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "submit" && (
        <form onSubmit={handleExpenseSubmit} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3.5">
          <h3 className="text-xs font-bold text-slate-800 dark:text-white">Expense Submission Form</h3>

          <div className="space-y-1">
            <label className="text-3xs font-semibold text-slate-400 uppercase">Expense Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseRecord["category"])}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              {Object.keys(categoryLabels).map((key) => (
                <option key={key} value={key}>{categoryLabels[key as ExpenseRecord["category"]]}</option>
              ))}
            </select>
          </div>

          {/* Mileage Toggle for Travel claims */}
          {category === "travel" && (
            <div className="flex items-center gap-2 py-1 px-1 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
              <input
                type="checkbox"
                id="mileage-check"
                checked={isMileage}
                onChange={(e) => setIsMileage(e.target.checked)}
                className="w-3.5 h-3.5 text-primary border-slate-300 rounded"
              />
              <label htmlFor="mileage-check" className="text-2xs font-semibold text-slate-500 cursor-pointer">
                Is this a mileage distance claim?
              </label>
            </div>
          )}

          {isMileage ? (
            <div className="grid grid-cols-2 gap-2 p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-100 dark:border-slate-800 animate-fade-in">
              <div className="space-y-1">
                <label className="text-3xs font-semibold text-slate-400 uppercase">Distance (KM)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 45"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1 text-xs text-slate-800 dark:text-slate-200"
                />
              </div>
              <div className="space-y-1">
                <label className="text-3xs font-semibold text-slate-400 uppercase">Rate per KM</label>
                <div className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2 py-1 text-xs text-slate-400">
                  ₹{ratePerKm} / km
                </div>
              </div>
              <div className="col-span-2 space-y-1">
                <label className="text-3xs font-semibold text-slate-400 uppercase">Trip locations</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Office to Client Site"
                  value={locations}
                  onChange={(e) => setLocations(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-3xs font-semibold text-slate-400 uppercase">Total Amount</label>
              <div className="relative">
                <span className="absolute left-2.5 top-2 text-xs text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  required
                  disabled={isMileage}
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent pl-6 pr-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-3xs font-semibold text-slate-400 uppercase">Expense Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-3xs font-semibold text-slate-400 uppercase">Claim Justification</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              required
              placeholder="Provide business justification & mileage notes..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

          {/* Policy validation inline warning mockup */}
          {parseFloat(amount) > 1000 && category === "food" && (
            <div className="p-2.5 bg-orange-50 border border-orange-200 text-orange-700 text-3xs font-semibold rounded-lg flex items-start gap-1.5 animate-fade-in">
              <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span>Policy warning: Food claims exceeding ₹1000 require manager approval and attendee list.</span>
            </div>
          )}

          {successMsg && <p className="text-3xs text-emerald-500 font-semibold">{successMsg}</p>}

          <button
            type="submit"
            className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-teal-700 active:scale-95 transition-all shadow-sm"
          >
            Submit Claims Form
          </button>
        </form>
      )}

      {activeTab === "approvals" && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 px-1">Expense Approvals Queue</h3>
          {pendingClaims.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">No pending expense claims.</p>
          ) : (
            <div className="space-y-2">
              {pendingClaims.map((exp) => (
                <div key={exp.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar name={exp.userName} size="sm" colorClass="bg-teal-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-white">{exp.userName}</div>
                        <div className="text-3xs text-slate-400">{categoryLabels[exp.category]}</div>
                      </div>
                    </div>
                    <span className="text-xs font-black text-primary">₹{exp.amount}</span>
                  </div>

                  <div className="text-2xs text-slate-500 space-y-1">
                    <div><strong>Justification:</strong> &ldquo;{exp.description}&rdquo;</div>
                    <div><strong>Date:</strong> {exp.date}</div>
                    {exp.policyFeedback?.warningMessage && (
                      <div className="p-2 bg-orange-50 border border-orange-200 text-orange-700 text-3xs font-semibold rounded flex gap-1 items-start mt-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                        <span>{exp.policyFeedback.warningMessage}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Add approvals feedback comments..."
                      value={comments[exp.id] || ""}
                      onChange={(e) => setComments({ ...comments, [exp.id]: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-2.5 py-1.5 text-2xs text-slate-850 dark:text-slate-200 focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => rejectExpense(exp.id, comments[exp.id])}
                        className="flex-1 py-1.5 bg-rose-50 border border-rose-200 text-rose-600 text-2xs font-bold rounded-lg hover:bg-rose-100"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => approveExpense(exp.id, comments[exp.id])}
                        className="flex-1 py-1.5 bg-emerald-500 text-white text-2xs font-bold rounded-lg hover:bg-emerald-600"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
