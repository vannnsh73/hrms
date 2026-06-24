using AutoMapper;
using DocumentsFeature.Application.Repository;
using DocumentsFeature.Domain;
using HRMS.Core.Telemetry.Exceptions;
using HRMS.Shared.Application.Constants;
using HRMS.Shared.Application.DTOs;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace DocumentsFeature.Application.DTO
{
    public sealed class UploadDocumentHandler : IRequestHandler<UploadDocumentCommand, BaseResponse<UploadDocumentResponse>>
    {
        private readonly IMapper _mapper;
        private readonly IDocumentRepository _repository;

        public UploadDocumentHandler(IMapper mapper, IDocumentRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<BaseResponse<UploadDocumentResponse>> Handle(UploadDocumentCommand request, CancellationToken cancellationToken)
        {
            if (request?.RequestParam == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var record = _mapper.Map<EmployeeDocument>(request.RequestParam);
            record = await _repository.AddItemAsync(record);

            return new BaseResponse<UploadDocumentResponse>
            {
                Data = new UploadDocumentResponse { DocumentId = record?.Id },
                StatusCode = StatusCodes.Status200OK,
                Message = string.Format(Messaging.Insert, nameof(EmployeeDocument)),
                Success = true
            };
        }
    }

    public sealed class VerifyDocumentHandler : IRequestHandler<VerifyDocumentCommand, BaseResponse<VerifyDocumentResponse>>
    {
        private readonly IDocumentRepository _repository;

        public VerifyDocumentHandler(IDocumentRepository repository)
        {
            _repository = repository;
        }

        public async Task<BaseResponse<VerifyDocumentResponse>> Handle(VerifyDocumentCommand request, CancellationToken cancellationToken)
        {
            if (request?.RequestParam == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var existing = await _repository.GetDocumentAsync(new GetAllDocumentsQuery
            {
                RequestParam = new GetAllDocumentsDto { DocumentId = request.RequestParam.DocumentId }
            });

            if (existing == null)
                throw new NotFoundException(string.Format(Messaging.NotFound, nameof(EmployeeDocument)));

            existing.IsVerified = request.RequestParam.IsVerified;
            existing.VerifiedBy = request.RequestParam.VerifiedBy;
            existing.VerificationDate = DateTime.UtcNow;
            existing.ModifiedOn = DateTime.UtcNow;

            await _repository.UpdateItemAsync(existing.Id, existing);

            return new BaseResponse<VerifyDocumentResponse>
            {
                Data = new VerifyDocumentResponse { DocumentId = existing.Id },
                StatusCode = StatusCodes.Status200OK,
                Message = string.Format(Messaging.Update, nameof(EmployeeDocument)),
                Success = true
            };
        }
    }

    public sealed class GetAllDocumentsHandler : IRequestHandler<GetAllDocumentsQuery, BaseResponsePagination<GetAllDocumentsResponse>>
    {
        private readonly IMapper _mapper;
        private readonly IDocumentRepository _repository;

        public GetAllDocumentsHandler(IMapper mapper, IDocumentRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<BaseResponsePagination<GetAllDocumentsResponse>> Handle(GetAllDocumentsQuery request, CancellationToken cancellationToken)
        {
            if (request == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var response = new BaseResponsePagination<GetAllDocumentsResponse>();
            (var records, int count) = await _repository.GetAllDocumentsWithCountAsync(request);

            if (records != null && records.Any())
            {
                var data = _mapper.Map<IReadOnlyList<EmployeeDocument>, IReadOnlyList<GetAllDocumentsItem>>(records.ToList());
                response.Data = new GetAllDocumentsResponse { Documents = data.ToList() };

                if (request.PageCriteria != null && request.PageCriteria.EnablePage)
                    response.Meta = new Meta { Skip = request.PageCriteria.Skip, Take = request.PageCriteria.PageSize, TotalCount = count };
            }

            response.Success = true;
            response.StatusCode = StatusCodes.Status200OK;
            return response;
        }
    }

    public sealed class DeleteDocumentHandler : IRequestHandler<DeleteDocumentCommand, BaseResponse<DeleteDocumentResponse>>
    {
        private readonly IDocumentRepository _repository;

        public DeleteDocumentHandler(IDocumentRepository repository)
        {
            _repository = repository;
        }

        public async Task<BaseResponse<DeleteDocumentResponse>> Handle(DeleteDocumentCommand request, CancellationToken cancellationToken)
        {
            if (request?.RequestParam == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var existing = await _repository.GetDocumentAsync(new GetAllDocumentsQuery
            {
                RequestParam = new GetAllDocumentsDto { DocumentId = request.RequestParam.DocumentId }
            });

            if (existing == null)
                throw new NotFoundException(string.Format(Messaging.NotFound, nameof(EmployeeDocument)));

            await _repository.DeleteItemAsync(existing.Id);

            return new BaseResponse<DeleteDocumentResponse>
            {
                Data = new DeleteDocumentResponse { DocumentId = existing.Id },
                StatusCode = StatusCodes.Status200OK,
                Message = string.Format(Messaging.Delete, nameof(EmployeeDocument)),
                Success = true
            };
        }
    }
}
