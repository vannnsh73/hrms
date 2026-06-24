using HRMS.Core.Postgres.Common;
using HRMS.Shared.Application.DTOs;
using MediatR;
using System.Collections.Generic;

namespace PayrollFeature.Application.DTO
{
    public interface IPayrollRecordIdDto { string? PayrollRecordId { get; set; } }

    public class CreatePayrollRecordDto
    {
        public string? EmployeeId { get; set; }
        public string? PayPeriod { get; set; }
        public DateTime? PayDate { get; set; }
        public string? Currency { get; set; }
        public string? Country { get; set; }
        public Dictionary<string, decimal>? Earnings { get; set; }
        public Dictionary<string, decimal>? Deductions { get; set; }
        public Dictionary<string, decimal>? EmployerContributions { get; set; }
    }

    public class CreatePayrollRecordCommand : ExecutionRequest, IRequest<BaseResponse<CreatePayrollRecordResponse>>
    {
        public CreatePayrollRecordDto? RequestParam { get; set; }
    }

    public class UpdatePayrollStatusDto : IPayrollRecordIdDto
    {
        public string? PayrollRecordId { get; set; }
        public string? Status { get; set; }
    }

    public class UpdatePayrollStatusCommand : ExecutionRequest, IRequest<BaseResponse<UpdatePayrollStatusResponse>>
    {
        public UpdatePayrollStatusDto? RequestParam { get; set; }
    }

    public class GetAllPayrollRecordsDto
    {
        public string? PayrollRecordId { get; set; }
        public string? EmployeeId { get; set; }
        public string? PayPeriod { get; set; }
        public string? Status { get; set; }
    }

    public class GetAllPayrollRecordsQuery : Request, IRequest<BaseResponsePagination<GetAllPayrollRecordsResponse>>
    {
        public GetAllPayrollRecordsDto? RequestParam { get; set; }
    }
}
