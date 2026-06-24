using AutoMapper;
using PayrollFeature.Application.Repository;
using PayrollFeature.Domain;
using HRMS.Core.Telemetry.Exceptions;
using HRMS.Shared.Application.Constants;
using HRMS.Shared.Application.DTOs;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace PayrollFeature.Application.DTO
{
    public sealed class CreatePayrollRecordHandler : IRequestHandler<CreatePayrollRecordCommand, BaseResponse<CreatePayrollRecordResponse>>
    {
        private readonly IMapper _mapper;
        private readonly IPayrollRepository _repository;

        public CreatePayrollRecordHandler(IMapper mapper, IPayrollRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<BaseResponse<CreatePayrollRecordResponse>> Handle(CreatePayrollRecordCommand request, CancellationToken cancellationToken)
        {
            if (request?.RequestParam == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var record = _mapper.Map<PayrollRecord>(request.RequestParam);
            record = await _repository.AddItemAsync(record);

            return new BaseResponse<CreatePayrollRecordResponse>
            {
                Data = new CreatePayrollRecordResponse { PayrollRecordId = record?.Id },
                StatusCode = StatusCodes.Status200OK,
                Message = string.Format(Messaging.Insert, nameof(PayrollRecord)),
                Success = true
            };
        }
    }

    public sealed class UpdatePayrollStatusHandler : IRequestHandler<UpdatePayrollStatusCommand, BaseResponse<UpdatePayrollStatusResponse>>
    {
        private readonly IPayrollRepository _repository;

        public UpdatePayrollStatusHandler(IPayrollRepository repository)
        {
            _repository = repository;
        }

        public async Task<BaseResponse<UpdatePayrollStatusResponse>> Handle(UpdatePayrollStatusCommand request, CancellationToken cancellationToken)
        {
            if (request?.RequestParam == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var existing = await _repository.GetPayrollRecordAsync(new GetAllPayrollRecordsQuery
            {
                RequestParam = new GetAllPayrollRecordsDto { PayrollRecordId = request.RequestParam.PayrollRecordId }
            });

            if (existing == null)
                throw new NotFoundException(string.Format(Messaging.NotFound, nameof(PayrollRecord)));

            existing.Status = request.RequestParam.Status;
            existing.ModifiedOn = DateTime.UtcNow;

            await _repository.UpdateItemAsync(existing.Id, existing);

            return new BaseResponse<UpdatePayrollStatusResponse>
            {
                Data = new UpdatePayrollStatusResponse { PayrollRecordId = existing.Id },
                StatusCode = StatusCodes.Status200OK,
                Message = string.Format(Messaging.Update, nameof(PayrollRecord)),
                Success = true
            };
        }
    }

    public sealed class GetAllPayrollRecordsHandler : IRequestHandler<GetAllPayrollRecordsQuery, BaseResponsePagination<GetAllPayrollRecordsResponse>>
    {
        private readonly IMapper _mapper;
        private readonly IPayrollRepository _repository;

        public GetAllPayrollRecordsHandler(IMapper mapper, IPayrollRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<BaseResponsePagination<GetAllPayrollRecordsResponse>> Handle(GetAllPayrollRecordsQuery request, CancellationToken cancellationToken)
        {
            if (request == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var response = new BaseResponsePagination<GetAllPayrollRecordsResponse>();
            (var records, int count) = await _repository.GetAllPayrollRecordsWithCountAsync(request);

            if (records != null && records.Any())
            {
                var data = _mapper.Map<IReadOnlyList<PayrollRecord>, IReadOnlyList<GetAllPayrollRecordsItem>>(records.ToList());
                response.Data = new GetAllPayrollRecordsResponse { PayrollRecords = data.ToList() };

                if (request.PageCriteria != null && request.PageCriteria.EnablePage)
                    response.Meta = new Meta { Skip = request.PageCriteria.Skip, Take = request.PageCriteria.PageSize, TotalCount = count };
            }

            response.Success = true;
            response.StatusCode = StatusCodes.Status200OK;
            return response;
        }
    }
}
