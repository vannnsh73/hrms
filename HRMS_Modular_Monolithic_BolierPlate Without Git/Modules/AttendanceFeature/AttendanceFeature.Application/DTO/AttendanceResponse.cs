using HRMS.Shared.Application.DTOs;

namespace AttendanceFeature.Application.DTO
{
    public class CreateAttendanceResponse { public string? AttendanceId { get; set; } }
    public class ClockOutResponse { public string? AttendanceId { get; set; } }
    public class DeleteAttendanceResponse { public string? AttendanceId { get; set; } }

    public class GetAllAttendanceItem
    {
        public string? AttendanceId { get; set; }
        public string? EmployeeId { get; set; }
        public DateTime? Date { get; set; }
        public DateTime? ClockIn { get; set; }
        public DateTime? ClockOut { get; set; }
        public string? Status { get; set; }
        public decimal? TotalHours { get; set; }
        public decimal? ProductiveHours { get; set; }
        public decimal? BreakHours { get; set; }
        public decimal? OvertimeHours { get; set; }
        public string? ClockInMethod { get; set; }
        public bool LocationVerified { get; set; }
        public bool IpVerified { get; set; }
        public string? Notes { get; set; }
        public UserBaseItem? UserContext { get; set; }
    }

    public class GetAllAttendanceResponse
    {
        public List<GetAllAttendanceItem>? AttendanceRecords { get; set; }
    }
}
