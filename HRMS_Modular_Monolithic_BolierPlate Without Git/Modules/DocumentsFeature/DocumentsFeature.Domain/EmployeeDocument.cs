using HRMS.Core.Postgres.Common;

namespace DocumentsFeature.Domain
{
    public class EmployeeDocument : BaseEntity
    {
        public string? EmployeeId { get; set; }
        public string? DocumentCategory { get; set; } // Identity, Academic, Professional, Payroll, Company
        public string? DocumentName { get; set; }
        public string? Description { get; set; }
        public string? FileUrl { get; set; }
        public string? FileExtension { get; set; }
        public long FileSize { get; set; }            // in bytes
        public string? UploadedBy { get; set; }
        public bool IsVerified { get; set; }
        public string? VerifiedBy { get; set; }
        public DateTime? VerificationDate { get; set; }
    }
}
