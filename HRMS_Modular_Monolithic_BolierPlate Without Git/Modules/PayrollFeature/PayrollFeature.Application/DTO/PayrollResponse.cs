using HRMS.Shared.Application.DTOs;
using System.Collections.Generic;

namespace PayrollFeature.Application.DTO
{
    public class CreatePayrollRecordResponse { public string? PayrollRecordId { get; set; } }
    public class UpdatePayrollStatusResponse { public string? PayrollRecordId { get; set; } }

    public class GetAllPayrollRecordsItem
    {
        public string? PayrollRecordId { get; set; }
        public string? EmployeeId { get; set; }
        public string? PayPeriod { get; set; }
        public DateTime? PayDate { get; set; }
        public string? Status { get; set; }
        public decimal GrossPay { get; set; }
        public decimal NetPay { get; set; }
        public decimal TotalDeductions { get; set; }
        public string? Currency { get; set; }
        public string? Country { get; set; }
        public Dictionary<string, decimal>? Earnings { get; set; }
        public Dictionary<string, decimal>? Deductions { get; set; }
        public Dictionary<string, decimal>? EmployerContributions { get; set; }
        public string? PayslipDocumentId { get; set; }
        public UserBaseItem? UserContext { get; set; }
    }

    public class GetAllPayrollRecordsResponse
    {
        public List<GetAllPayrollRecordsItem>? PayrollRecords { get; set; }
    }
}
