using HRMS.Core.Postgres.Common;

namespace LeaveManagementFeature.Domain
{
    public class LeaveRequest : BaseEntity
    {
        public string? EmployeeId { get; set; }
        public string? LeaveType { get; set; }        // Casual, Sick, Personal, Maternity, Paternity, LWP, CompOff
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal TotalDays { get; set; }
        public string? Reason { get; set; }
        public string? Status { get; set; }          // Pending, Approved, Rejected, Cancelled
        public string? ApproverId { get; set; }
        public string? ApproverComments { get; set; }
    }
}
