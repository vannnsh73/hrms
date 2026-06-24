using AutoMapper;
using ExpensesFeature.Application.Repository;
using ExpensesFeature.Domain;
using HRMS.Core.Telemetry.Exceptions;
using HRMS.Shared.Application.Constants;
using HRMS.Shared.Application.DTOs;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace ExpensesFeature.Application.DTO
{
    public sealed class CreateExpenseClaimHandler : IRequestHandler<CreateExpenseClaimCommand, BaseResponse<CreateExpenseClaimResponse>>
    {
        private readonly IMapper _mapper;
        private readonly IExpenseRepository _repository;

        public CreateExpenseClaimHandler(IMapper mapper, IExpenseRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<BaseResponse<CreateExpenseClaimResponse>> Handle(CreateExpenseClaimCommand request, CancellationToken cancellationToken)
        {
            if (request?.RequestParam == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var claim = _mapper.Map<ExpenseClaim>(request.RequestParam);
            claim = await _repository.AddItemAsync(claim);

            return new BaseResponse<CreateExpenseClaimResponse>
            {
                Data = new CreateExpenseClaimResponse { ExpenseClaimId = claim?.Id },
                StatusCode = StatusCodes.Status200OK,
                Message = string.Format(Messaging.Insert, nameof(ExpenseClaim)),
                Success = true
            };
        }
    }

    public sealed class UpdateExpenseClaimStatusHandler : IRequestHandler<UpdateExpenseClaimStatusCommand, BaseResponse<UpdateExpenseClaimStatusResponse>>
    {
        private readonly IExpenseRepository _repository;

        public UpdateExpenseClaimStatusHandler(IExpenseRepository repository)
        {
            _repository = repository;
        }

        public async Task<BaseResponse<UpdateExpenseClaimStatusResponse>> Handle(UpdateExpenseClaimStatusCommand request, CancellationToken cancellationToken)
        {
            if (request?.RequestParam == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var existing = await _repository.GetExpenseClaimAsync(new GetAllExpenseClaimsQuery
            {
                RequestParam = new GetAllExpenseClaimsDto { ExpenseClaimId = request.RequestParam.ExpenseClaimId }
            });

            if (existing == null)
                throw new NotFoundException(string.Format(Messaging.NotFound, nameof(ExpenseClaim)));

            existing.Status = request.RequestParam.Status;
            existing.ApproverId = request.RequestParam.ApproverId;
            existing.ApproverComments = request.RequestParam.ApproverComments;
            existing.ModifiedOn = DateTime.UtcNow;

            if (request.RequestParam.Status == "Approved")
                existing.ApprovalDate = DateTime.UtcNow;
            
            if (request.RequestParam.Status == "Paid")
                existing.PaymentDate = DateTime.UtcNow;

            await _repository.UpdateItemAsync(existing.Id, existing);

            return new BaseResponse<UpdateExpenseClaimStatusResponse>
            {
                Data = new UpdateExpenseClaimStatusResponse { ExpenseClaimId = existing.Id },
                StatusCode = StatusCodes.Status200OK,
                Message = string.Format(Messaging.Update, nameof(ExpenseClaim)),
                Success = true
            };
        }
    }

    public sealed class GetAllExpenseClaimsHandler : IRequestHandler<GetAllExpenseClaimsQuery, BaseResponsePagination<GetAllExpenseClaimsResponse>>
    {
        private readonly IMapper _mapper;
        private readonly IExpenseRepository _repository;

        public GetAllExpenseClaimsHandler(IMapper mapper, IExpenseRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<BaseResponsePagination<GetAllExpenseClaimsResponse>> Handle(GetAllExpenseClaimsQuery request, CancellationToken cancellationToken)
        {
            if (request == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var response = new BaseResponsePagination<GetAllExpenseClaimsResponse>();
            (var records, int count) = await _repository.GetAllExpenseClaimsWithCountAsync(request);

            if (records != null && records.Any())
            {
                var data = _mapper.Map<IReadOnlyList<ExpenseClaim>, IReadOnlyList<GetAllExpenseClaimsItem>>(records.ToList());
                response.Data = new GetAllExpenseClaimsResponse { ExpenseClaims = data.ToList() };

                if (request.PageCriteria != null && request.PageCriteria.EnablePage)
                    response.Meta = new Meta { Skip = request.PageCriteria.Skip, Take = request.PageCriteria.PageSize, TotalCount = count };
            }

            response.Success = true;
            response.StatusCode = StatusCodes.Status200OK;
            return response;
        }
    }
}
