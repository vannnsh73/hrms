using FluentValidation;
using HRMS.Shared.Application.Constants;
using HRMS.Shared.Application.Extensions;

namespace DocumentsFeature.Application.DTO
{
    public class UploadDocumentValidator : AbstractValidator<UploadDocumentCommand>
    {
        public UploadDocumentValidator()
        {
            this.ValidateRequiredRequestParam(
                x => x.RequestParam!,
                new UploadDocumentDtoValidator());
        }
    }

    public class VerifyDocumentValidator : AbstractValidator<VerifyDocumentCommand>
    {
        public VerifyDocumentValidator()
        {
            this.ValidateRequiredRequestParam(
                x => x.RequestParam!,
                new VerifyDocumentDtoValidator());
        }
    }

    public class DeleteDocumentValidator : AbstractValidator<DeleteDocumentCommand>
    {
        public DeleteDocumentValidator()
        {
            this.ValidateRequiredRequestParam(
                x => x.RequestParam!,
                new DocumentIdValidator<DeleteDocumentDto>());
        }
    }

    internal class UploadDocumentDtoValidator : AbstractValidator<UploadDocumentDto>
    {
        public UploadDocumentDtoValidator()
        {
            RuleFor(x => x.EmployeeId)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(UploadDocumentDto.EmployeeId)));
            
            RuleFor(x => x.DocumentCategory)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(UploadDocumentDto.DocumentCategory)));
            
            RuleFor(x => x.DocumentName)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(UploadDocumentDto.DocumentName)));

            RuleFor(x => x.FileUrl)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(UploadDocumentDto.FileUrl)));
        }
    }

    internal class VerifyDocumentDtoValidator : AbstractValidator<VerifyDocumentDto>
    {
        public VerifyDocumentDtoValidator()
        {
            RuleFor(x => x.DocumentId)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(VerifyDocumentDto.DocumentId)));
        }
    }

    internal class DocumentIdValidator<TDto> : AbstractValidator<TDto>
        where TDto : IDocumentIdDto
    {
        public DocumentIdValidator()
        {
            RuleFor(x => x.DocumentId)
                .NotEmpty()
                .WithMessage(string.Format(Messaging.IsRequired, nameof(IDocumentIdDto.DocumentId)));
        }
    }
}
