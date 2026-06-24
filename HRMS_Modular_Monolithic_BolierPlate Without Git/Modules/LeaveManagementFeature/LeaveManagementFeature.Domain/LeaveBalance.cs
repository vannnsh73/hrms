using HRMS.Core.Postgres.Common;

namespace LeaveManagementFeature.Domain
{
    public class LeaveBalance : BaseEntity
    {
        public string? EmployeeId { get; set; }
        public string? LeaveType { get; set; }
        public decimal TotalAllowed { get; set; }
        public decimal Used { get; set; }
        public decimal Pending { get; set; }
        public decimal Available { get; set; }
        public decimal CarriedForward { get; set; }
        public decimal Encashed { get; set; }
        public int Year { get; set; }
    }
}
