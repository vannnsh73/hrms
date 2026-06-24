using HRMS.Shared.Application.DTOs;

namespace LeaveManagementFeature.Application.DTO
{
    public class CreateLeaveRequestResponse { public string? LeaveRequestId { get; set; } }
    public class UpdateLeaveRequestStatusResponse { public string? LeaveRequestId { get; set; } }

    public class GetAllLeaveRequestsItem
    {
        public string? LeaveRequestId { get; set; }
        public string? EmployeeId { get; set; }
        public string? LeaveType { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal TotalDays { get; set; }
        public string? Reason { get; set; }
        public string? Status { get; set; }
        public string? ApproverId { get; set; }
        public string? ApproverComments { get; set; }
        public DateTime? CreatedOn { get; set; }
        public UserBaseItem? UserContext { get; set; }
    }

    public class GetAllLeaveRequestsResponse
    {
        public List<GetAllLeaveRequestsItem>? LeaveRequests { get; set; }
    }

    public class GetAllLeaveBalancesItem
    {
        public string? LeaveBalanceId { get; set; }
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

    public class GetAllLeaveBalancesResponse
    {
        public List<GetAllLeaveBalancesItem>? LeaveBalances { get; set; }
    }
}
