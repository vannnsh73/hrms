using HRMS.Core.Postgres.Common;
using HRMS.Shared.Application.DTOs;
using MediatR;

namespace AttendanceFeature.Application.DTO
{
    public interface IAttendanceIdDto { string? AttendanceId { get; set; } }

    public class CreateAttendanceDto
    {
        public string? EmployeeId { get; set; }
        public DateTime? Date { get; set; }
        public DateTime? ClockIn { get; set; }
        public string? ClockInMethod { get; set; }
        public bool LocationVerified { get; set; }
        public bool IpVerified { get; set; }
        public string? Notes { get; set; }
    }

    public class CreateAttendanceRequest : ExecutionRequest, IRequest<BaseResponse<CreateAttendanceResponse>>
    {
        public CreateAttendanceDto? RequestParam { get; set; }
    }

    public class ClockOutDto : IAttendanceIdDto
    {
        public string? AttendanceId { get; set; }
        public DateTime? ClockOut { get; set; }
        public string? Notes { get; set; }
    }

    public class ClockOutRequest : ExecutionRequest, IRequest<BaseResponse<ClockOutResponse>>
    {
        public ClockOutDto? RequestParam { get; set; }
    }

    public class DeleteAttendanceDto : IAttendanceIdDto { public string? AttendanceId { get; set; } }

    public class DeleteAttendanceRequest : ExecutionRequest, IRequest<BaseResponse<DeleteAttendanceResponse>>
    {
        public DeleteAttendanceDto? RequestParam { get; set; }
    }

    public class GetAllAttendanceDto
    {
        public string? AttendanceId { get; set; }
        public string? EmployeeId { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public string? Status { get; set; }
    }

    public class GetAllAttendanceRequest : Request, IRequest<BaseResponsePagination<GetAllAttendanceResponse>>
    {
        public GetAllAttendanceDto? RequestParam { get; set; }
    }
}
