using HRMS.Shared.Application.DTOs;
using System.Collections.Generic;
using ExpensesFeature.Domain;

namespace ExpensesFeature.Application.DTO
{
    public class CreateExpenseClaimResponse { public string? ExpenseClaimId { get; set; } }
    public class UpdateExpenseClaimStatusResponse { public string? ExpenseClaimId { get; set; } }

    public class GetAllExpenseClaimsItem
    {
        public string? ExpenseClaimId { get; set; }
        public string? EmployeeId { get; set; }
        public string? ClaimName { get; set; }
        public DateTime? SubmissionDate { get; set; }
        public string? Status { get; set; }
        public decimal TotalAmount { get; set; }
        public string? Currency { get; set; }
        public List<ExpenseItem>? Items { get; set; }
        public string? ApproverId { get; set; }
        public string? ApproverComments { get; set; }
        public DateTime? ApprovalDate { get; set; }
        public DateTime? PaymentDate { get; set; }
        public DateTime? CreatedOn { get; set; }
        public UserBaseItem? UserContext { get; set; }
    }

    public class GetAllExpenseClaimsResponse
    {
        public List<GetAllExpenseClaimsItem>? ExpenseClaims { get; set; }
    }
}
