using HRMS.Core.Postgres.Common;
using HRMS.Shared.Application.DTOs;
using MediatR;

namespace LeaveManagementFeature.Application.DTO
{
    public interface ILeaveRequestIdDto { string? LeaveRequestId { get; set; } }

    public class CreateLeaveRequestDto
    {
        public string? EmployeeId { get; set; }
        public string? LeaveType { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal TotalDays { get; set; }
        public string? Reason { get; set; }
    }

    public class CreateLeaveRequestCommand : ExecutionRequest, IRequest<BaseResponse<CreateLeaveRequestResponse>>
    {
        public CreateLeaveRequestDto? RequestParam { get; set; }
    }

    public class UpdateLeaveRequestStatusDto : ILeaveRequestIdDto
    {
        public string? LeaveRequestId { get; set; }
        public string? Status { get; set; } // Approved, Rejected, Cancelled
        public string? ApproverId { get; set; }
        public string? ApproverComments { get; set; }
    }

    public class UpdateLeaveRequestStatusCommand : ExecutionRequest, IRequest<BaseResponse<UpdateLeaveRequestStatusResponse>>
    {
        public UpdateLeaveRequestStatusDto? RequestParam { get; set; }
    }

    public class GetAllLeaveRequestsDto
    {
        public string? LeaveRequestId { get; set; }
        public string? EmployeeId { get; set; }
        public string? LeaveType { get; set; }
        public string? Status { get; set; }
    }

    public class GetAllLeaveRequestsQuery : Request, IRequest<BaseResponsePagination<GetAllLeaveRequestsResponse>>
    {
        public GetAllLeaveRequestsDto? RequestParam { get; set; }
    }

    public class GetAllLeaveBalancesDto
    {
        public string? EmployeeId { get; set; }
        public int? Year { get; set; }
    }

    public class GetAllLeaveBalancesQuery : Request, IRequest<BaseResponsePagination<GetAllLeaveBalancesResponse>>
    {
        public GetAllLeaveBalancesDto? RequestParam { get; set; }
    }
}
