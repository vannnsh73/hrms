import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "Employee" | "Manager" | "HR" | "Admin";

export interface User {
  id: string;
  name: string;
  role: Role;
  designation: string;
  department: string;
  email: string;
  avatarColor: string;
  location: string;
  joiningDate: string;
  buddyName?: string;
  managerName?: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  date: string;
  clockInTime: string;
  clockOutTime?: string;
  method: "selfie" | "biometric" | "manual";
  selfieUrl?: string;
  location: string;
  ipAddress: string;
  isLocationVerified: boolean;
  isIpValidated: boolean;
  productiveHours: number;
  breakHours: number;
  overtimeHours: number;
  status: "present" | "absent" | "late" | "half-day" | "on-leave";
  exceptionFlag?: string;
}

export interface LeaveBalance {
  casual: { allowed: number; used: number; pending: number };
  sick: { allowed: number; used: number; pending: number };
  personal: { allowed: number; used: number; pending: number };
  maternity: { allowed: number; used: number; pending: number };
  paternity: { allowed: number; used: number; pending: number };
  lwp: { allowed: number; used: number; pending: number };
  compOff: { allowed: number; used: number; pending: number };
}

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  leaveType: keyof LeaveBalance;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  managerComments?: string;
  approvalLevels: {
    level: number;
    approverName: string;
    status: "pending" | "approved" | "rejected";
    comments?: string;
  }[];
}

export interface PayslipRecord {
  id: string;
  userId: string;
  month: string;
  year: number;
  country: "IN" | "US";
  currency: string;
  earnings: {
    basic: number;
    hra: number;
    specialAllowance: number;
    bonus: number;
    overtime: number;
    reimbursements: number;
  };
  deductions: {
    pf: number;
    incomeTax: number;
    professionalTax: number;
    esi: number;
    healthInsurance: number;
    lwf: number;
  };
  employerContributions: {
    pf: number;
    esi: number;
    gratuity: number;
  };
  status: "draft" | "processing" | "approved" | "paid";
  payDate: string;
}

export interface DocumentRecord {
  id: string;
  userId: string;
  name: string;
  category: "identity" | "employment" | "work-auth" | "tax" | "education";
  status: "missing" | "uploaded" | "verified" | "rejected";
  fileUrl?: string;
  fileSize?: string;
  expiryDate?: string;
  rejectionReason?: string;
  uploadedOn?: string;
  verifiedOn?: string;
}

export interface ExpenseRecord {
  id: string;
  userId: string;
  userName: string;
  category: "travel" | "food" | "accommodation" | "communication" | "medical" | "office-supplies" | "other";
  amount: number;
  currency: string;
  description: string;
  date: string;
  receiptUrl?: string;
  isTaxable: boolean;
  mileage?: {
    distanceKm: number;
    locations: string;
    ratePerKm: number;
  };
  policyFeedback?: {
    withinLimit: boolean;
    warningMessage?: string;
  };
  status: "draft" | "submitted" | "pending-approval" | "approved" | "rejected" | "paid";
  managerComments?: string;
}

export interface OnboardingTask {
  id: string;
  userId: string;
  title: string;
  description: string;
  phase: "pre-joining" | "day-1" | "week-1" | "month-1";
  priority: "high" | "medium" | "low";
  dueDate: string;
  status: "pending" | "completed";
  completedOn?: string;
}

export interface RelocationSupport {
  visaStatus: string;
  accommodationDetails: string;
  travelDetails: string;
  relocationAllowance: string;
  localBuddyContact: string;
  supportTickets: { id: string; subject: string; status: "open" | "resolved" }[];
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: "individual" | "team" | "departmental" | "organizational";
  type: "quarterly" | "annual" | "project";
  weight: number; // percentage
  status: "not-started" | "in-progress" | "on-track" | "at-risk" | "completed" | "cancelled";
  progress: number; // 0 to 100
  dueDate: string;
  keyResults: { id: string; title: string; target: number; current: number; unit: string }[];
}

export interface PerformanceReview {
  id: string;
  userId: string;
  reviewPeriod: string;
  overallRating: number;
  categoryRatings: { category: string; rating: number; feedback: string }[];
  strengths: string;
  improvementAreas: string;
  recommendations: string;
  employeeComments?: string;
}

export interface Contribution {
  id: string;
  userId: string;
  userName: string;
  userAvatarColor: string;
  title: string;
  description: string;
  type: "self-initiated" | "committed" | "assigned";
  category: "innovation" | "process-improvement" | "cost-saving" | "revenue-generation" | "quality" | "customer-satisfaction" | "team-building" | "other";
  points: number;
  suggestedPoints: number;
  impactLevel: "low" | "medium" | "high";
  status: "proposal-pending" | "approved-to-start" | "in-progress" | "under-review" | "completed" | "rejected";
  evidenceUrl?: string;
  managerComments?: string;
}

export interface ContributionItem {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  claimedBy?: string;
}

export interface TrainingModule {
  id: string;
  userId: string;
  title: string;
  category: "orientation" | "technical" | "compliance" | "soft-skills" | "product";
  duration: string;
  dueDate: string;
  isMandatory: boolean;
  isCertificateEligible: boolean;
  progress: number; // 0 to 100
  status: "not-started" | "in-progress" | "completed";
  certificateUrl?: string;
  contentItems: { id: string; title: string; type: "video" | "document" | "quiz" | "interactive"; isCompleted: boolean }[];
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experienceRequired: string;
  salaryRange: string;
  requirements: string[];
  status: "active" | "closed";
}

export interface Candidate {
  id: string;
  name: string;
  appliedRole: string;
  jobId: string;
  email: string;
  status: "new" | "screening" | "shortlisted" | "interview-scheduled" | "interviewed" | "offer-extended" | "hired" | "rejected";
  rating: number;
  skills: string[];
  experience: string;
  expectedSalary: string;
  noticePeriod: string;
  notes: string;
  interviews: { date: string; time: string; round: string; status: "scheduled" | "completed" }[];
}

export interface Recognition {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatarColor: string;
  recipientId: string;
  recipientName: string;
  recipientAvatarColor: string;
  category: "excellence" | "team-player" | "innovation" | "leadership" | "customer-focus";
  message: string;
  isPublic: boolean;
  likes: string[]; // userIds
  comments: { id: string; userId: string; userName: string; text: string; date: string }[];
  date: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: "hr-update" | "event" | "policy" | "celebration" | "compliance" | "general";
  priority: "high" | "medium" | "low";
  scope: "global" | "department" | "location";
  targetValue?: string; // e.g. "Jaipur HQ" or "Engineering"
  publishedDate: string;
  authorName: string;
  isComplianceRequired: boolean;
  acknowledgments: string[]; // userIds
  views: number;
  likes: string[]; // userIds
}

interface HrmsState {
  // Roles & Active Context
  activeUser: User;
  activeRole: Role;
  users: User[];
  
  // Modules state
  attendance: AttendanceRecord[];
  activeAttendance: AttendanceRecord | null;
  leaveBalances: Record<string, LeaveBalance>;
  leaveRequests: LeaveRequest[];
  payslips: PayslipRecord[];
  documents: DocumentRecord[];
  expenses: ExpenseRecord[];
  onboardingTasks: OnboardingTask[];
  relocationSupport: Record<string, RelocationSupport>;
  goals: Goal[];
  reviews: PerformanceReview[];
  contributions: Contribution[];
  contributionCatalog: ContributionItem[];
  trainings: TrainingModule[];
  jobs: JobPosting[];
  candidates: Candidate[];
  recognitions: Recognition[];
  announcements: Announcement[];
  copilotChatHistory: { role: "user" | "assistant"; content: string }[];

  // Mutators
  switchRole: (role: Role) => void;
  setUser: (userId: string) => void;
  
  // Attendance mutators
  clockIn: (selfieUrl: string, location: string, ip: string, method: "selfie" | "biometric" | "manual") => void;
  clockOut: () => void;
  
  // Leave mutators
  submitLeave: (request: Omit<LeaveRequest, "id" | "userId" | "userName" | "status" | "approvalLevels">) => void;
  approveLeave: (requestId: string, comments?: string) => void;
  rejectLeave: (requestId: string, comments?: string) => void;
  
  // Documents mutators
  uploadDocument: (category: DocumentRecord["category"], name: string, size: string, fileUrl: string) => void;
  verifyDocument: (docId: string) => void;
  rejectDocument: (docId: string, reason: string) => void;

  // Expense mutators
  submitExpense: (expense: Omit<ExpenseRecord, "id" | "userId" | "userName" | "status" | "policyFeedback">) => void;
  approveExpense: (expenseId: string, comments?: string) => void;
  rejectExpense: (expenseId: string, comments?: string) => void;

  // Onboarding
  completeOnboardingTask: (taskId: string) => void;
  completeOnboarding: (userId: string) => void;

  // Performance
  updateKRProgress: (goalId: string, krId: string, currentValue: number) => void;
  addFeedback: (goalId: string, feedback: string) => void;

  // Contributions
  submitContribution: (contribution: Omit<Contribution, "id" | "userId" | "userName" | "userAvatarColor" | "status">) => void;
  claimContributionItem: (itemId: string) => void;
  approveContribution: (contribId: string, finalPoints: number, comments?: string) => void;
  rejectContribution: (contribId: string, comments?: string) => void;

  // Training
  toggleTrainingItem: (moduleId: string, itemId: string) => void;

  // Recruitment
  addJobPosting: (job: Omit<JobPosting, "id">) => void;
  updateCandidateStatus: (candidateId: string, status: Candidate["status"]) => void;
  scheduleInterview: (candidateId: string, date: string, time: string, round: string) => void;

  // Recognition
  sendRecognition: (recipientId: string, category: Recognition["category"], message: string, isPublic: boolean) => void;
  likeRecognition: (recId: string) => void;
  commentRecognition: (recId: string, text: string) => void;

  // Announcements
  createAnnouncement: (announcement: Omit<Announcement, "id" | "publishedDate" | "authorName" | "views" | "likes" | "acknowledgments">) => void;
  acknowledgeAnnouncement: (annId: string) => void;
  likeAnnouncement: (annId: string) => void;
  incrementAnnouncementViews: (annId: string) => void;

  // Copilot Chat
  addCopilotMessage: (role: "user" | "assistant", content: string) => void;
  clearCopilotChat: () => void;
}

// Initial Static User Definitions
const mockUsers: User[] = [
  {
    id: "EMP001",
    name: "Alex Johnson",
    role: "Employee",
    designation: "Software Engineer",
    department: "Engineering",
    email: "alex.j@propvivo.com",
    avatarColor: "bg-teal-600",
    location: "Jaipur HQ",
    joiningDate: "2026-02-15",
    buddyName: "Arjun Mehta",
    managerName: "Riya Patel",
  },
  {
    id: "EMP002",
    name: "Riya Patel",
    role: "Manager",
    designation: "Engineering Manager",
    department: "Engineering",
    email: "riya.p@propvivo.com",
    avatarColor: "bg-orange-600",
    location: "Jaipur HQ",
    joiningDate: "2023-04-10",
  },
  {
    id: "EMP003",
    name: "Arjun Mehta",
    role: "HR",
    designation: "HR Specialist",
    department: "Human Resources",
    email: "arjun.m@propvivo.com",
    avatarColor: "bg-purple-600",
    location: "Jaipur HQ",
    joiningDate: "2024-09-01",
  },
  {
    id: "EMP004",
    name: "Dev Kumar",
    role: "Admin",
    designation: "IT Operations Director",
    department: "Operations",
    email: "dev.k@propvivo.com",
    avatarColor: "bg-blue-600",
    location: "Jaipur HQ",
    joiningDate: "2022-01-15",
  },
  {
    id: "EMP005",
    name: "Nisha Verma",
    role: "Employee",
    designation: "Associate Product Manager",
    department: "Product",
    email: "nisha.v@propvivo.com",
    avatarColor: "bg-pink-600",
    location: "Jaipur HQ",
    joiningDate: "2026-06-20", // New Joiner (for Onboarding module demonstration)
    buddyName: "Alex Johnson",
    managerName: "Riya Patel",
  }
];

export const useHrmsStore = create<HrmsState>()(
  persist(
    (set, get) => ({
      activeUser: mockUsers[0],
      activeRole: "Employee",
      users: mockUsers,

      // Initial modules mock states
      attendance: [
        {
          id: "ATT001",
          userId: "EMP001",
          userName: "Alex Johnson",
          date: "2026-06-22",
          clockInTime: "09:05 AM",
          clockOutTime: "06:15 PM",
          method: "selfie",
          selfieUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150",
          location: "Jaipur HQ - 26.9124° N, 75.7873° E",
          ipAddress: "192.168.1.45",
          isLocationVerified: true,
          isIpValidated: true,
          productiveHours: 8.2,
          breakHours: 1.0,
          overtimeHours: 0.2,
          status: "present",
        },
        {
          id: "ATT002",
          userId: "EMP001",
          userName: "Alex Johnson",
          date: "2026-06-23",
          clockInTime: "09:45 AM",
          clockOutTime: "06:00 PM",
          method: "selfie",
          selfieUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150",
          location: "Jaipur HQ - 26.9124° N, 75.7873° E",
          ipAddress: "192.168.1.45",
          isLocationVerified: true,
          isIpValidated: true,
          productiveHours: 7.25,
          breakHours: 1.0,
          overtimeHours: 0.0,
          status: "late",
          exceptionFlag: "Late clock-in",
        }
      ],
      activeAttendance: null,

      leaveBalances: {
        EMP001: {
          casual: { allowed: 12, used: 3, pending: 1 },
          sick: { allowed: 8, used: 2, pending: 0 },
          personal: { allowed: 5, used: 1, pending: 0 },
          maternity: { allowed: 180, used: 0, pending: 0 },
          paternity: { allowed: 15, used: 0, pending: 0 },
          lwp: { allowed: 30, used: 0, pending: 0 },
          compOff: { allowed: 4, used: 1, pending: 0 }
        },
        EMP005: {
          casual: { allowed: 12, used: 0, pending: 0 },
          sick: { allowed: 8, used: 0, pending: 0 },
          personal: { allowed: 5, used: 0, pending: 0 },
          maternity: { allowed: 180, used: 0, pending: 0 },
          paternity: { allowed: 15, used: 0, pending: 0 },
          lwp: { allowed: 30, used: 0, pending: 0 },
          compOff: { allowed: 0, used: 0, pending: 0 }
        }
      },

      leaveRequests: [
        {
          id: "LV001",
          userId: "EMP001",
          userName: "Alex Johnson",
          leaveType: "casual",
          startDate: "2026-06-25",
          endDate: "2026-06-26",
          totalDays: 2,
          reason: "Family event in my hometown",
          status: "pending",
          approvalLevels: [
            { level: 1, approverName: "Riya Patel", status: "pending" }
          ]
        },
        {
          id: "LV002",
          userId: "EMP001",
          userName: "Alex Johnson",
          leaveType: "sick",
          startDate: "2026-05-12",
          endDate: "2026-05-13",
          totalDays: 2,
          reason: "Viral fever",
          status: "approved",
          managerComments: "Get well soon!",
          approvalLevels: [
            { level: 1, approverName: "Riya Patel", status: "approved", comments: "Approved" }
          ]
        }
      ],

      payslips: [
        {
          id: "PAY001",
          userId: "EMP001",
          month: "May",
          year: 2026,
          country: "IN",
          currency: "INR",
          earnings: {
            basic: 45000,
            hra: 18000,
            specialAllowance: 12000,
            bonus: 5000,
            overtime: 1500,
            reimbursements: 2500,
          },
          deductions: {
            pf: 5400,
            incomeTax: 4200,
            professionalTax: 200,
            esi: 1125,
            healthInsurance: 1500,
            lwf: 50,
          },
          employerContributions: {
            pf: 5400,
            esi: 1125,
            gratuity: 2164,
          },
          status: "paid",
          payDate: "2026-05-31",
        },
        {
          id: "PAY002",
          userId: "EMP001",
          month: "April",
          year: 2026,
          country: "IN",
          currency: "INR",
          earnings: {
            basic: 45000,
            hra: 18000,
            specialAllowance: 12000,
            bonus: 0,
            overtime: 0,
            reimbursements: 1200,
          },
          deductions: {
            pf: 5400,
            incomeTax: 4200,
            professionalTax: 200,
            esi: 1125,
            healthInsurance: 1500,
            lwf: 50,
          },
          employerContributions: {
            pf: 5400,
            esi: 1125,
            gratuity: 2164,
          },
          status: "paid",
          payDate: "2026-04-30",
        }
      ],

      documents: [
        {
          id: "DOC001",
          userId: "EMP001",
          name: "Aadhaar Card (National ID)",
          category: "identity",
          status: "verified",
          fileSize: "1.2 MB",
          expiryDate: "N/A",
          uploadedOn: "2026-02-16",
          verifiedOn: "2026-02-18",
          fileUrl: "#",
        },
        {
          id: "DOC002",
          userId: "EMP001",
          name: "PAN Card (Tax Registration)",
          category: "tax",
          status: "verified",
          fileSize: "850 KB",
          expiryDate: "N/A",
          uploadedOn: "2026-02-16",
          verifiedOn: "2026-02-18",
          fileUrl: "#",
        },
        {
          id: "DOC003",
          userId: "EMP001",
          name: "Passport",
          category: "work-auth",
          status: "uploaded",
          fileSize: "2.4 MB",
          expiryDate: "2032-08-15",
          uploadedOn: "2026-06-10",
          fileUrl: "#",
        },
        {
          id: "DOC004",
          userId: "EMP001",
          name: "Form 16 (Previous Year)",
          category: "tax",
          status: "missing",
        }
      ],

      expenses: [
        {
          id: "EXP001",
          userId: "EMP001",
          userName: "Alex Johnson",
          category: "food",
          amount: 1450,
          currency: "INR",
          description: "Team lunch with developers discussing OKR targets",
          date: "2026-06-20",
          isTaxable: false,
          policyFeedback: { withinLimit: true },
          status: "paid",
        },
        {
          id: "EXP002",
          userId: "EMP001",
          userName: "Alex Johnson",
          category: "travel",
          amount: 4200,
          currency: "INR",
          description: "Travel to Jaipur HQ from remote location for onboarding buddy training",
          date: "2026-06-22",
          isTaxable: true,
          mileage: {
            distanceKm: 280,
            locations: "Delhi to Jaipur HQ",
            ratePerKm: 15,
          },
          policyFeedback: {
            withinLimit: false,
            warningMessage: "Amount exceeds soft limit for local travel. Manager review required.",
          },
          status: "pending-approval",
        }
      ],

      onboardingTasks: [
        { id: "T001", userId: "EMP005", title: "Sign Offer Letter & Employment Contract", description: "Read, sign and upload the official PropVivo job offer and employee agreement documents.", phase: "pre-joining", priority: "high", dueDate: "2026-06-18", status: "completed", completedOn: "2026-06-17" },
        { id: "T002", userId: "EMP005", title: "Upload Identification & Bank Details", description: "Submit scans of national identity cards, PAN cards, and valid bank accounts for salary setup.", phase: "pre-joining", priority: "high", dueDate: "2026-06-19", status: "completed", completedOn: "2026-06-18" },
        { id: "T003", userId: "EMP005", title: "Pick up IT Equipment & Complete Bio Capture", description: "Collect Macbook, configure corporate credentials and register fingerprint at Jaipur office IT desk.", phase: "day-1", priority: "high", dueDate: "2026-06-20", status: "completed", completedOn: "2026-06-20" },
        { id: "T004", userId: "EMP005", title: "Meet Onboarding Buddy & Core Team", description: "Set up 1-on-1 introductory session with buddy (Alex Johnson) and manager (Riya Patel).", phase: "day-1", priority: "medium", dueDate: "2026-06-20", status: "completed", completedOn: "2026-06-20" },
        { id: "T005", userId: "EMP005", title: "Complete Compliance & Security Training", description: "Watch mandatory training videos and pass the short quiz with at least 80% score.", phase: "week-1", priority: "high", dueDate: "2026-06-25", status: "pending" },
        { id: "T006", userId: "EMP005", title: "Setup Onboarding Feedback Checkpoint", description: "Check in with HR Specialist Arjun Mehta on how you have integrated in week 1.", phase: "week-1", priority: "medium", dueDate: "2026-06-27", status: "pending" },
        { id: "T007", userId: "EMP005", title: "Define Goals and 90-day OKRs", description: "Collate and detail your project targets alongside Manager Riya Patel.", phase: "month-1", priority: "high", dueDate: "2026-07-20", status: "pending" }
      ],

      relocationSupport: {
        EMP005: {
          visaStatus: "Approved (H-1B / Indian Resident Transfer)",
          accommodationDetails: "2 Weeks Corporate Housing, Jaipur HQ Guest House Room 3B",
          travelDetails: "Flight AI-410 Delhi to Jaipur on 2026-06-19, cab scheduled.",
          relocationAllowance: "₹50,000 (Claimable after joining invoice submission)",
          localBuddyContact: "Alex Johnson (+91 98765 43210)",
          supportTickets: [
            { id: "REL001", subject: "Request extension of corporate housing by 3 days", status: "resolved" }
          ]
        }
      },

      goals: [
        {
          id: "G001",
          userId: "EMP001",
          title: "Deliver WorkFlow HRMS V1 Frontend Shell",
          description: "Develop primary reusable mobile components, state database, and core features.",
          category: "individual",
          type: "quarterly",
          weight: 40,
          status: "in-progress",
          progress: 65,
          dueDate: "2026-06-30",
          keyResults: [
            { id: "KR001", title: "Implement 15 standalone interactive client modules", target: 15, current: 8, unit: "modules" },
            { id: "KR002", title: "Ensure 0 TypeScript compile errors in app folder", target: 1, current: 1, unit: "status" },
            { id: "KR003", title: "Receive initial demo sign-off from Riya Patel", target: 100, current: 50, unit: "%" }
          ]
        },
        {
          id: "G002",
          userId: "EMP001",
          title: "Optimize Next.js Client Bundle & Loading Time",
          description: "Enhance startup speeds, reduce chunk sizes and streamline assets.",
          category: "individual",
          type: "quarterly",
          weight: 20,
          status: "on-track",
          progress: 80,
          dueDate: "2026-06-30",
          keyResults: [
            { id: "KR004", title: "Achieve Lighthouse Performance Score", target: 90, current: 92, unit: "score" }
          ]
        }
      ],

      reviews: [
        {
          id: "REV001",
          userId: "EMP001",
          reviewPeriod: "Q1 - 2026",
          overallRating: 4.5,
          categoryRatings: [
            { category: "Technical Skill", rating: 4.8, feedback: "Outstanding coding quality and architecture choices. Spearheaded next-gen layouts." },
            { category: "Collaboration", rating: 4.2, feedback: "Good mentor to colleagues and active partner during system redesign discussions." },
            { category: "Execution & Delivery", rating: 4.5, feedback: "Deliveries are on-time with clean document logs and low regression errors." }
          ],
          strengths: "Deep knowledge of modern React framework, rapid debugging capabilities, and strong ownership of UI assets.",
          improvementAreas: "Can be more vocal in org-wide planning calls and take more initiative in backend microservice layouts.",
          recommendations: "Nominated for Senior Systems Engineer promotion. Encourage taking onboarding buddy responsibilities.",
          employeeComments: "Thank you for the coaching! I will actively pair program with backend teams to expand my monolithic capabilities."
        }
      ],

      contributions: [
        {
          id: "CN001",
          userId: "EMP001",
          userName: "Alex Johnson",
          userAvatarColor: "bg-teal-600",
          title: "Created local JSON database simulator for instant mobile testing",
          description: "Built client side persistent state storage bypassing database down-times to unblock 4 UI teams.",
          type: "self-initiated",
          category: "process-improvement",
          points: 120,
          suggestedPoints: 100,
          impactLevel: "high",
          status: "completed",
          managerComments: "Exceptional speed in deploying this. Saved substantial local setup overheads."
        },
        {
          id: "CN002",
          userId: "EMP001",
          userName: "Alex Johnson",
          userAvatarColor: "bg-teal-600",
          title: "Designed the WorkFlow Brand Palette System",
          description: "Curated Teal & Orange themes with proper dark mode configurations and custom fonts.",
          type: "self-initiated",
          category: "innovation",
          points: 50,
          suggestedPoints: 50,
          impactLevel: "medium",
          status: "under-review",
        }
      ],

      contributionCatalog: [
        { id: "CI001", title: "Write technical documentation for GraphQL API schemas", description: "Review existing TodoFeature patterns and collate a Postman collection / wiki.", category: "process-improvement", points: 80 },
        { id: "CI002", title: "Refactor API Error Middleware handling", description: "Implement standard status code exceptions in the monolithic API layers.", category: "quality", points: 100 },
        { id: "CI003", title: "Organize PropVivo Annual Jaipur Hackathon", description: "Coordinate with HR specialists to create posters, schedule tracks and source guest speakers.", category: "team-building", points: 150 }
      ],

      trainings: [
        {
          id: "TR001",
          userId: "EMP001",
          title: "PropVivo Corporate Code Guidelines & Architecture",
          category: "technical",
          duration: "2.5 hours",
          dueDate: "2026-06-25",
          isMandatory: true,
          isCertificateEligible: true,
          progress: 100,
          status: "completed",
          certificateUrl: "https://example.com/certs/tr001.pdf",
          contentItems: [
            { id: "C001", title: "1. Overview of Modular Monolithic Architecture", type: "video", isCompleted: true },
            { id: "C002", title: "2. CQRS and MediatR Routing Structure", type: "document", isCompleted: true },
            { id: "C003", title: "3. HotChocolate GraphQL Resolver Best Practices", type: "video", isCompleted: true },
            { id: "C004", title: "4. Architecture Compliance Quiz", type: "quiz", isCompleted: true }
          ]
        },
        {
          id: "TR002",
          userId: "EMP001",
          title: "POSH & Cyber Security compliance training 2026",
          category: "compliance",
          duration: "1.5 hours",
          dueDate: "2026-06-28",
          isMandatory: true,
          isCertificateEligible: true,
          progress: 50,
          status: "in-progress",
          contentItems: [
            { id: "C005", title: "1. Preventing Sexual Harassment (POSH) Laws", type: "video", isCompleted: true },
            { id: "C006", title: "2. Phishing and Corporate Data Safety Protocol", type: "video", isCompleted: false },
            { id: "C007", title: "3. POSH Compliance Assessment", type: "quiz", isCompleted: false }
          ]
        }
      ],

      jobs: [
        { id: "J001", title: "Senior React Developer", department: "Engineering", location: "Jaipur HQ (Hybrid)", employmentType: "Full-Time", experienceRequired: "5+ Years", salaryRange: "₹18,00,000 - ₹24,00,000", requirements: ["Next.js App Router expertise", "Zustand & Redux state patterns", "Tailwind CSS advanced formatting"], status: "active" },
        { id: "J002", title: "HR Business Partner", department: "Human Resources", location: "Jaipur HQ", employmentType: "Full-Time", experienceRequired: "3+ Years", salaryRange: "₹8,00,000 - ₹12,00,000", requirements: ["Employee lifecycle management", "India compliance & PF/ESI regulation", "Talent acquisition background"], status: "active" }
      ],

      candidates: [
        {
          id: "CAN001",
          name: "Siddharth Sharma",
          appliedRole: "Senior React Developer",
          jobId: "J001",
          email: "sid.sharma@example.com",
          status: "shortlisted",
          rating: 4.2,
          skills: ["React", "TypeScript", "Next.js", "GraphQL"],
          experience: "5.5 Years at TechCorp Solutions",
          expectedSalary: "₹22,00,000",
          noticePeriod: "30 Days",
          notes: "Strong frontend logic skills. Showed outstanding portfolio built on NextJS 15.",
          interviews: []
        },
        {
          id: "CAN002",
          name: "Karan Johar",
          appliedRole: "Senior React Developer",
          jobId: "J001",
          email: "karan.j@example.com",
          status: "interview-scheduled",
          rating: 4.5,
          skills: ["React", "Redux", "Tailwind CSS", "Jest"],
          experience: "6 Years at WebDesigns Ltd",
          expectedSalary: "₹20,00,000",
          noticePeriod: "Immediate",
          notes: "Technically competent, quick onboarding potential. Interview scheduled with EM Riya Patel.",
          interviews: [
            { date: "2026-06-25", time: "11:00 AM", round: "Technical Interview L1", status: "scheduled" }
          ]
        }
      ],

      recognitions: [
        {
          id: "RG001",
          senderId: "EMP002",
          senderName: "Riya Patel",
          senderAvatarColor: "bg-orange-600",
          recipientId: "EMP001",
          recipientName: "Alex Johnson",
          recipientAvatarColor: "bg-teal-600",
          category: "excellence",
          message: "Kudos to Alex for setting up the foundational WorkFlow visual design tokens! The system looks top notch and will speed up modular development for everyone.",
          isPublic: true,
          likes: ["EMP003", "EMP004"],
          comments: [
            { id: "COM001", userId: "EMP003", userName: "Arjun Mehta", text: "Spot on! The color theme is very premium.", date: "2026-06-22" }
          ],
          date: "2026-06-22"
        }
      ],

      announcements: [
        {
          id: "AN001",
          title: "New Local Holidays Policy in Rajasthan HQ",
          content: "Effective June 2026, employee regional state holidays are updated. Check the holiday calendar page. Contact HR team for regional opt-in procedures.",
          category: "policy",
          priority: "high",
          scope: "location",
          targetValue: "Jaipur HQ",
          publishedDate: "2026-06-15",
          authorName: "Arjun Mehta",
          isComplianceRequired: true,
          acknowledgments: ["EMP001", "EMP002"],
          views: 34,
          likes: ["EMP001", "EMP002"]
        },
        {
          id: "AN002",
          title: "Q2 Townhall Scheduled: Product Launch Plans",
          content: "Join us on Friday June 26th at 3 PM in the main cafeteria or on Zoom to preview our Next-Gen Monolithic Core features with the leadership team.",
          category: "hr-update",
          priority: "medium",
          scope: "global",
          publishedDate: "2026-06-21",
          authorName: "Arjun Mehta",
          isComplianceRequired: false,
          acknowledgments: [],
          views: 18,
          likes: []
        }
      ],

      copilotChatHistory: [
        { role: "assistant", content: "Hello! I am your PropVivo HR Copilot. Ask me anything about attendance, company leaves, payroll metrics, policies or tasks. I am contextually aware of your current view and active role!" }
      ],

      // Mutators implementation
      switchRole: (role) => {
        const state = get();
        // find a default user that matches this role
        const matchingUser = state.users.find(u => u.role === role) || state.users[0];
        set({ activeRole: role, activeUser: matchingUser });
      },

      setUser: (userId) => {
        const state = get();
        const user = state.users.find(u => u.id === userId);
        if (user) {
          set({ activeUser: user, activeRole: user.role });
        }
      },

      clockIn: (selfieUrl, location, ip, method) => {
        const state = get();
        const activeUser = state.activeUser;
        const newRecord: AttendanceRecord = {
          id: `ATT_${Date.now()}`,
          userId: activeUser.id,
          userName: activeUser.name,
          date: new Date().toISOString().split("T")[0],
          clockInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          method,
          selfieUrl,
          location,
          ipAddress: ip,
          isLocationVerified: true,
          isIpValidated: true,
          productiveHours: 0,
          breakHours: 0,
          overtimeHours: 0,
          status: "present",
        };
        set({
          activeAttendance: newRecord,
          attendance: [newRecord, ...state.attendance]
        });
      },

      clockOut: () => {
        const state = get();
        const activeAtt = state.activeAttendance;
        if (!activeAtt) return;

        // Calculate hours
        const updatedRecord: AttendanceRecord = {
          ...activeAtt,
          clockOutTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          productiveHours: 8.5, // Mocked working day
          breakHours: 1.0,
          overtimeHours: 0.5,
        };

        set({
          activeAttendance: null,
          attendance: state.attendance.map(r => r.id === activeAtt.id ? updatedRecord : r)
        });
      },

      submitLeave: (leave) => {
        const state = get();
        const activeUser = state.activeUser;
        
        // Validation check
        const balances = state.leaveBalances[activeUser.id];
        if (balances) {
          const typeBal = balances[leave.leaveType];
          const available = typeBal.allowed - typeBal.used - typeBal.pending;
          if (leave.totalDays > available && leave.leaveType !== "lwp") {
            throw new Error(`Insufficient leave balance. You have ${available} days available for ${leave.leaveType}.`);
          }
        }

        const newRequest: LeaveRequest = {
          id: `LV_${Date.now()}`,
          userId: activeUser.id,
          userName: activeUser.name,
          ...leave,
          status: "pending",
          approvalLevels: [
            { level: 1, approverName: activeUser.managerName || "Riya Patel", status: "pending" }
          ]
        };

        // Increment pending balance
        const updatedBalances = { ...state.leaveBalances };
        if (updatedBalances[activeUser.id]) {
          updatedBalances[activeUser.id] = {
            ...updatedBalances[activeUser.id],
            [leave.leaveType]: {
              ...updatedBalances[activeUser.id][leave.leaveType],
              pending: updatedBalances[activeUser.id][leave.leaveType].pending + leave.totalDays
            }
          };
        }

        set({
          leaveRequests: [newRequest, ...state.leaveRequests],
          leaveBalances: updatedBalances
        });
      },

      approveLeave: (requestId, comments) => {
        const state = get();
        const req = state.leaveRequests.find(r => r.id === requestId);
        if (!req) return;

        // Move request status to approved
        const updatedRequests = state.leaveRequests.map(r => {
          if (r.id === requestId) {
            return {
              ...r,
              status: "approved" as const,
              managerComments: comments,
              approvalLevels: r.approvalLevels.map(lvl => ({ ...lvl, status: "approved" as const, comments }))
            };
          }
          return r;
        });

        // Deduct from pending and add to used in balances
        const updatedBalances = { ...state.leaveBalances };
        if (updatedBalances[req.userId]) {
          const currentBal = updatedBalances[req.userId][req.leaveType];
          updatedBalances[req.userId] = {
            ...updatedBalances[req.userId],
            [req.leaveType]: {
              ...currentBal,
              pending: Math.max(0, currentBal.pending - req.totalDays),
              used: currentBal.used + req.totalDays
            }
          };
        }

        set({ leaveRequests: updatedRequests, leaveBalances: updatedBalances });
      },

      rejectLeave: (requestId, comments) => {
        const state = get();
        const req = state.leaveRequests.find(r => r.id === requestId);
        if (!req) return;

        const updatedRequests = state.leaveRequests.map(r => {
          if (r.id === requestId) {
            return {
              ...r,
              status: "rejected" as const,
              managerComments: comments,
              approvalLevels: r.approvalLevels.map(lvl => ({ ...lvl, status: "rejected" as const, comments }))
            };
          }
          return r;
        });

        // Relieve from pending balances
        const updatedBalances = { ...state.leaveBalances };
        if (updatedBalances[req.userId]) {
          const currentBal = updatedBalances[req.userId][req.leaveType];
          updatedBalances[req.userId] = {
            ...updatedBalances[req.userId],
            [req.leaveType]: {
              ...currentBal,
              pending: Math.max(0, currentBal.pending - req.totalDays)
            }
          };
        }

        set({ leaveRequests: updatedRequests, leaveBalances: updatedBalances });
      },

      uploadDocument: (category, name, size, fileUrl) => {
        const state = get();
        const activeUser = state.activeUser;
        const newDoc: DocumentRecord = {
          id: `DOC_${Date.now()}`,
          userId: activeUser.id,
          name,
          category,
          status: "uploaded",
          fileSize: size,
          fileUrl,
          uploadedOn: new Date().toISOString().split("T")[0],
        };
        set({ documents: [...state.documents, newDoc] });
      },

      verifyDocument: (docId) => {
        const state = get();
        set({
          documents: state.documents.map(d =>
            d.id === docId ? { ...d, status: "verified", verifiedOn: new Date().toISOString().split("T")[0] } : d
          )
        });
      },

      rejectDocument: (docId, reason) => {
        const state = get();
        set({
          documents: state.documents.map(d =>
            d.id === docId ? { ...d, status: "rejected", rejectionReason: reason } : d
          )
        });
      },

      submitExpense: (expense) => {
        const state = get();
        const activeUser = state.activeUser;
        
        // Simple automatic policy check simulation
        let withinLimit = true;
        let warningMessage = undefined;
        if (expense.category === "food" && expense.amount > 1000) {
          withinLimit = false;
          warningMessage = "Food expenses exceed daily soft-limit of ₹1000. Manager justification required.";
        } else if (expense.category === "travel" && expense.amount > 5000) {
          withinLimit = false;
          warningMessage = "Travel claims exceeding ₹5000 require travel code details.";
        }

        const newExpense: ExpenseRecord = {
          id: `EXP_${Date.now()}`,
          userId: activeUser.id,
          userName: activeUser.name,
          ...expense,
          status: "pending-approval",
          policyFeedback: { withinLimit, warningMessage }
        };

        set({ expenses: [newExpense, ...state.expenses] });
      },

      approveExpense: (expenseId, comments) => {
        const state = get();
        set({
          expenses: state.expenses.map(e =>
            e.id === expenseId ? { ...e, status: "approved", managerComments: comments } : e
          )
        });
      },

      rejectExpense: (expenseId, comments) => {
        const state = get();
        set({
          expenses: state.expenses.map(e =>
            e.id === expenseId ? { ...e, status: "rejected", managerComments: comments } : e
          )
        });
      },

      completeOnboardingTask: (taskId) => {
        const state = get();
        set({
          onboardingTasks: state.onboardingTasks.map(t =>
            t.id === taskId ? { ...t, status: "completed", completedOn: new Date().toISOString().split("T")[0] } : t
          )
        });
      },

      completeOnboarding: (userId) => {
        // Handoff to normal flow: could change user record status
      },

      updateKRProgress: (goalId, krId, currentValue) => {
        const state = get();
        set({
          goals: state.goals.map(g => {
            if (g.id === goalId) {
              const updatedKRs = g.keyResults.map(kr => {
                if (kr.id === krId) {
                  return { ...kr, current: currentValue };
                }
                return kr;
              });
              // Recalculate average progress based on KRs completion percentage
              const totalProgress = updatedKRs.reduce((acc, curr) => {
                const ratio = Math.min(1, curr.current / curr.target);
                return acc + ratio;
              }, 0);
              const newProgress = Math.round((totalProgress / updatedKRs.length) * 100);
              
              return {
                ...g,
                keyResults: updatedKRs,
                progress: newProgress,
                status: newProgress >= 100 ? "completed" : g.status
              };
            }
            return g;
          })
        });
      },

      addFeedback: (goalId, feedback) => {
        // mock adding feedback
      },

      submitContribution: (contribution) => {
        const state = get();
        const activeUser = state.activeUser;
        const newContrib: Contribution = {
          id: `CN_${Date.now()}`,
          userId: activeUser.id,
          userName: activeUser.name,
          userAvatarColor: activeUser.avatarColor,
          ...contribution,
          status: "proposal-pending",
        };
        set({ contributions: [newContrib, ...state.contributions] });
      },

      claimContributionItem: (itemId) => {
        const state = get();
        const activeUser = state.activeUser;
        const catalogItem = state.contributionCatalog.find(c => c.id === itemId);
        if (!catalogItem) return;

        const newContrib: Contribution = {
          id: `CN_${Date.now()}`,
          userId: activeUser.id,
          userName: activeUser.name,
          userAvatarColor: activeUser.avatarColor,
          title: catalogItem.title,
          description: catalogItem.description,
          type: "assigned",
          category: catalogItem.category as any,
          suggestedPoints: catalogItem.points,
          points: 0,
          impactLevel: "medium",
          status: "approved-to-start",
        };

        set({
          contributions: [newContrib, ...state.contributions],
          contributionCatalog: state.contributionCatalog.map(item =>
            item.id === itemId ? { ...item, claimedBy: activeUser.name } : item
          )
        });
      },

      approveContribution: (contribId, finalPoints, comments) => {
        const state = get();
        set({
          contributions: state.contributions.map(c =>
            c.id === contribId ? { ...c, status: "completed", points: finalPoints, managerComments: comments } : c
          )
        });
      },

      rejectContribution: (contribId, comments) => {
        const state = get();
        set({
          contributions: state.contributions.map(c =>
            c.id === contribId ? { ...c, status: "rejected", managerComments: comments } : c
          )
        });
      },

      toggleTrainingItem: (moduleId, itemId) => {
        const state = get();
        set({
          trainings: state.trainings.map(t => {
            if (t.id === moduleId) {
              const updatedItems = t.contentItems.map(item =>
                item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
              );
              const completedCount = updatedItems.filter(i => i.isCompleted).length;
              const newProgress = Math.round((completedCount / updatedItems.length) * 100);
              
              return {
                ...t,
                contentItems: updatedItems,
                progress: newProgress,
                status: newProgress === 100 ? "completed" : "in-progress"
              };
            }
            return t;
          })
        });
      },

      addJobPosting: (job) => {
        const state = get();
        const newJob: JobPosting = {
          id: `JOB_${Date.now()}`,
          ...job,
        };
        set({ jobs: [newJob, ...state.jobs] });
      },

      updateCandidateStatus: (candidateId, status) => {
        const state = get();
        set({
          candidates: state.candidates.map(c =>
            c.id === candidateId ? { ...c, status } : c
          )
        });
      },

      scheduleInterview: (candidateId, date, time, round) => {
        const state = get();
        set({
          candidates: state.candidates.map(c => {
            if (c.id === candidateId) {
              return {
                ...c,
                status: "interview-scheduled",
                interviews: [...c.interviews, { date, time, round, status: "scheduled" }]
              };
            }
            return c;
          })
        });
      },

      sendRecognition: (recipientId, category, message, isPublic) => {
        const state = get();
        const activeUser = state.activeUser;
        const recUser = state.users.find(u => u.id === recipientId);
        if (!recUser) return;

        const newRec: Recognition = {
          id: `REC_${Date.now()}`,
          senderId: activeUser.id,
          senderName: activeUser.name,
          senderAvatarColor: activeUser.avatarColor,
          recipientId: recUser.id,
          recipientName: recUser.name,
          recipientAvatarColor: recUser.avatarColor,
          category,
          message,
          isPublic,
          likes: [],
          comments: [],
          date: new Date().toISOString().split("T")[0],
        };
        set({ recognitions: [newRec, ...state.recognitions] });
      },

      likeRecognition: (recId) => {
        const state = get();
        const activeUser = state.activeUser;
        set({
          recognitions: state.recognitions.map(r => {
            if (r.id === recId) {
              const alreadyLiked = r.likes.includes(activeUser.id);
              const updatedLikes = alreadyLiked
                ? r.likes.filter(id => id !== activeUser.id)
                : [...r.likes, activeUser.id];
              return { ...r, likes: updatedLikes };
            }
            return r;
          })
        });
      },

      commentRecognition: (recId, text) => {
        const state = get();
        const activeUser = state.activeUser;
        set({
          recognitions: state.recognitions.map(r => {
            if (r.id === recId) {
              return {
                ...r,
                comments: [
                  ...r.comments,
                  {
                    id: `COM_${Date.now()}`,
                    userId: activeUser.id,
                    userName: activeUser.name,
                    text,
                    date: new Date().toISOString().split("T")[0],
                  }
                ]
              };
            }
            return r;
          })
        });
      },

      createAnnouncement: (ann) => {
        const state = get();
        const activeUser = state.activeUser;
        const newAnn: Announcement = {
          id: `ANN_${Date.now()}`,
          publishedDate: new Date().toISOString().split("T")[0],
          authorName: activeUser.name,
          views: 0,
          likes: [],
          acknowledgments: [],
          ...ann
        };
        set({ announcements: [newAnn, ...state.announcements] });
      },

      acknowledgeAnnouncement: (annId) => {
        const state = get();
        const activeUser = state.activeUser;
        set({
          announcements: state.announcements.map(a => {
            if (a.id === annId) {
              const acked = a.acknowledgments.includes(activeUser.id);
              const updatedAcks = acked ? a.acknowledgments : [...a.acknowledgments, activeUser.id];
              return { ...a, acknowledgments: updatedAcks };
            }
            return a;
          })
        });
      },

      likeAnnouncement: (annId) => {
        const state = get();
        const activeUser = state.activeUser;
        set({
          announcements: state.announcements.map(a => {
            if (a.id === annId) {
              const alreadyLiked = a.likes.includes(activeUser.id);
              const updatedLikes = alreadyLiked
                ? a.likes.filter(id => id !== activeUser.id)
                : [...a.likes, activeUser.id];
              return { ...a, likes: updatedLikes };
            }
            return a;
          })
        });
      },

      incrementAnnouncementViews: (annId) => {
        const state = get();
        set({
          announcements: state.announcements.map(a =>
            a.id === annId ? { ...a, views: a.views + 1 } : a
          )
        });
      },

      addCopilotMessage: (role, content) => {
        const state = get();
        set({
          copilotChatHistory: [...state.copilotChatHistory, { role, content }]
        });
      },

      clearCopilotChat: () => {
        set({
          copilotChatHistory: [
            { role: "assistant", content: "Hello! I am your PropVivo HR Copilot. Ask me anything about attendance, company leaves, payroll metrics, policies or tasks. I am contextually aware of your current view and active role!" }
          ]
        });
      }
    }),
    {
      name: "workflow-hrms-storage",
      partialize: (state) => ({
        activeUser: state.activeUser,
        activeRole: state.activeRole,
        attendance: state.attendance,
        activeAttendance: state.activeAttendance,
        leaveBalances: state.leaveBalances,
        leaveRequests: state.leaveRequests,
        payslips: state.payslips,
        documents: state.documents,
        expenses: state.expenses,
        onboardingTasks: state.onboardingTasks,
        relocationSupport: state.relocationSupport,
        goals: state.goals,
        reviews: state.reviews,
        contributions: state.contributions,
        contributionCatalog: state.contributionCatalog,
        trainings: state.trainings,
        jobs: state.jobs,
        candidates: state.candidates,
        recognitions: state.recognitions,
        announcements: state.announcements,
        copilotChatHistory: state.copilotChatHistory,
      }),
    }
  )
);
