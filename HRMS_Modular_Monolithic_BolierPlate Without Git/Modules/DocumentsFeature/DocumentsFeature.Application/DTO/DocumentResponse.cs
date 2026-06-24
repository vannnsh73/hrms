using HRMS.Shared.Application.DTOs;

namespace DocumentsFeature.Application.DTO
{
    public class UploadDocumentResponse { public string? DocumentId { get; set; } }
    public class VerifyDocumentResponse { public string? DocumentId { get; set; } }
    public class DeleteDocumentResponse { public string? DocumentId { get; set; } }

    public class GetAllDocumentsItem
    {
        public string? DocumentId { get; set; }
        public string? EmployeeId { get; set; }
        public string? DocumentCategory { get; set; }
        public string? DocumentName { get; set; }
        public string? Description { get; set; }
        public string? FileUrl { get; set; }
        public string? FileExtension { get; set; }
        public long FileSize { get; set; }
        public string? UploadedBy { get; set; }
        public bool IsVerified { get; set; }
        public string? VerifiedBy { get; set; }
        public DateTime? VerificationDate { get; set; }
        public DateTime? CreatedOn { get; set; }
        public UserBaseItem? UserContext { get; set; }
    }

    public class GetAllDocumentsResponse
    {
        public List<GetAllDocumentsItem>? Documents { get; set; }
    }
}
