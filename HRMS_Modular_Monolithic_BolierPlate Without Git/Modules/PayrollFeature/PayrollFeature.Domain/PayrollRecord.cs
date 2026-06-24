using HRMS.Core.Postgres.Common;
using System.Collections.Generic;

namespace PayrollFeature.Domain
{
    public class PayrollRecord : BaseEntity
    {
        public string? EmployeeId { get; set; }
        public string? PayPeriod { get; set; }        // e.g., "Jan 2024"
        public DateTime? PayDate { get; set; }
        public string? Status { get; set; }           // Draft, Processing, Approved, Paid
        public decimal GrossPay { get; set; }
        public decimal NetPay { get; set; }
        public decimal TotalDeductions { get; set; }
        public string? Currency { get; set; }         // USD, INR
        public string? Country { get; set; }          // US, IN
        public Dictionary<string, decimal>? Earnings { get; set; }     // Basic, HRA, Bonus, etc.
        public Dictionary<string, decimal>? Deductions { get; set; }   // PF, Tax, ESI, etc.
        public Dictionary<string, decimal>? EmployerContributions { get; set; } // PF, ESI, Gratuity
        public string? PayslipDocumentId { get; set; }
    }
}
