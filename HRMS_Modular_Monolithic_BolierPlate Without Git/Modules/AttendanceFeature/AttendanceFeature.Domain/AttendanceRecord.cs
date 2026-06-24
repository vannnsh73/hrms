using HRMS.Core.Postgres.Common;

namespace AttendanceFeature.Domain
{
    public class AttendanceRecord : BaseEntity
    {
        public string? EmployeeId { get; set; }
        public DateTime? Date { get; set; }
        public DateTime? ClockIn { get; set; }
        public DateTime? ClockOut { get; set; }
        public string? Status { get; set; }          // Present, Absent, Late, HalfDay, OnLeave
        public decimal? TotalHours { get; set; }
        public decimal? ProductiveHours { get; set; }
        public decimal? BreakHours { get; set; }
        public decimal? OvertimeHours { get; set; }
        public string? ClockInMethod { get; set; }   // Selfie, Biometric, Manual, IP
        public bool LocationVerified { get; set; }
        public bool IpVerified { get; set; }
        public string? Notes { get; set; }
    }
}
