using HRMS.Core.Postgres.Common;
using HRMS.Shared.Application.DTOs;
using MediatR;

namespace DocumentsFeature.Application.DTO
{
    public interface IDocumentIdDto { string? DocumentId { get; set; } }

    public class UploadDocumentDto
    {
        public string? EmployeeId { get; set; }
        public string? DocumentCategory { get; set; }
        public string? DocumentName { get; set; }
        public string? Description { get; set; }
        public string? FileUrl { get; set; }
        public string? FileExtension { get; set; }
        public long FileSize { get; set; }
    }

    public class UploadDocumentCommand : ExecutionRequest, IRequest<BaseResponse<UploadDocumentResponse>>
    {
        public UploadDocumentDto? RequestParam { get; set; }
    }

    public class VerifyDocumentDto : IDocumentIdDto
    {
        public string? DocumentId { get; set; }
        public bool IsVerified { get; set; }
        public string? VerifiedBy { get; set; }
    }

    public class VerifyDocumentCommand : ExecutionRequest, IRequest<BaseResponse<VerifyDocumentResponse>>
    {
        public VerifyDocumentDto? RequestParam { get; set; }
    }

    public class DeleteDocumentDto : IDocumentIdDto { public string? DocumentId { get; set; } }

    public class DeleteDocumentCommand : ExecutionRequest, IRequest<BaseResponse<DeleteDocumentResponse>>
    {
        public DeleteDocumentDto? RequestParam { get; set; }
    }

    public class GetAllDocumentsDto
    {
        public string? DocumentId { get; set; }
        public string? EmployeeId { get; set; }
        public string? DocumentCategory { get; set; }
        public bool? IsVerified { get; set; }
    }

    public class GetAllDocumentsQuery : Request, IRequest<BaseResponsePagination<GetAllDocumentsResponse>>
    {
        public GetAllDocumentsDto? RequestParam { get; set; }
    }
}
