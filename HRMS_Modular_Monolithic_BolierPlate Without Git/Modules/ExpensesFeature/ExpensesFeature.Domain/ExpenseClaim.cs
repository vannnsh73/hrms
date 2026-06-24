using HRMS.Core.Postgres.Common;
using System.Collections.Generic;

namespace ExpensesFeature.Domain
{
    public class ExpenseItem
    {
        public string? ExpenseId { get; set; } = Guid.NewGuid().ToString();
        public DateTime? ExpenseDate { get; set; }
        public string? Category { get; set; } // Travel, Meals, Office Supplies, Client Entertainment
        public string? Description { get; set; }
        public decimal Amount { get; set; }
        public string? Currency { get; set; }
        public string? ReceiptDocumentId { get; set; }
        public string? ProjectId { get; set; } // Optional: tied to a project/client
    }

    public class ExpenseClaim : BaseEntity
    {
        public string? EmployeeId { get; set; }
        public string? ClaimName { get; set; }
        public DateTime? SubmissionDate { get; set; }
        public string? Status { get; set; } // Draft, Submitted, UnderReview, Approved, Rejected, Paid
        public decimal TotalAmount { get; set; }
        public string? Currency { get; set; }
        public List<ExpenseItem>? Items { get; set; }
        public string? ApproverId { get; set; }
        public string? ApproverComments { get; set; }
        public DateTime? ApprovalDate { get; set; }
        public DateTime? PaymentDate { get; set; }
    }
}
