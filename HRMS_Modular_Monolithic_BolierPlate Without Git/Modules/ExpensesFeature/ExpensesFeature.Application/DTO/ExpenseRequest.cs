using HRMS.Core.Postgres.Common;
using HRMS.Shared.Application.DTOs;
using MediatR;
using System.Collections.Generic;

namespace ExpensesFeature.Application.DTO
{
    public interface IExpenseClaimIdDto { string? ExpenseClaimId { get; set; } }

    public class ExpenseItemDto
    {
        public DateTime? ExpenseDate { get; set; }
        public string? Category { get; set; }
        public string? Description { get; set; }
        public decimal Amount { get; set; }
        public string? Currency { get; set; }
        public string? ReceiptDocumentId { get; set; }
        public string? ProjectId { get; set; }
    }

    public class CreateExpenseClaimDto
    {
        public string? EmployeeId { get; set; }
        public string? ClaimName { get; set; }
        public string? Currency { get; set; }
        public List<ExpenseItemDto>? Items { get; set; }
    }

    public class CreateExpenseClaimCommand : ExecutionRequest, IRequest<BaseResponse<CreateExpenseClaimResponse>>
    {
        public CreateExpenseClaimDto? RequestParam { get; set; }
    }

    public class UpdateExpenseClaimStatusDto : IExpenseClaimIdDto
    {
        public string? ExpenseClaimId { get; set; }
        public string? Status { get; set; } // Submitted, Approved, Rejected
        public string? ApproverId { get; set; }
        public string? ApproverComments { get; set; }
    }

    public class UpdateExpenseClaimStatusCommand : ExecutionRequest, IRequest<BaseResponse<UpdateExpenseClaimStatusResponse>>
    {
        public UpdateExpenseClaimStatusDto? RequestParam { get; set; }
    }

    public class GetAllExpenseClaimsDto
    {
        public string? ExpenseClaimId { get; set; }
        public string? EmployeeId { get; set; }
        public string? Status { get; set; }
    }

    public class GetAllExpenseClaimsQuery : Request, IRequest<BaseResponsePagination<GetAllExpenseClaimsResponse>>
    {
        public GetAllExpenseClaimsDto? RequestParam { get; set; }
    }
}
