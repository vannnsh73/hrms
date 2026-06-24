using AutoMapper;
using AttendanceFeature.Application.Repository;
using AttendanceFeature.Domain;
using HRMS.Core.Telemetry.Exceptions;
using HRMS.Shared.Application.Constants;
using HRMS.Shared.Application.DTOs;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace AttendanceFeature.Application.DTO
{
    public sealed class CreateAttendanceHandler : IRequestHandler<CreateAttendanceRequest, BaseResponse<CreateAttendanceResponse>>
    {
        private readonly IMapper _mapper;
        private readonly IAttendanceRepository _repository;

        public CreateAttendanceHandler(IMapper mapper, IAttendanceRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<BaseResponse<CreateAttendanceResponse>> Handle(CreateAttendanceRequest request, CancellationToken cancellationToken)
        {
            if (request?.RequestParam == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var record = _mapper.Map<AttendanceRecord>(request.RequestParam);
            record = await _repository.AddItemAsync(record);

            return new BaseResponse<CreateAttendanceResponse>
            {
                Data = new CreateAttendanceResponse { AttendanceId = record?.Id },
                StatusCode = StatusCodes.Status200OK,
                Message = string.Format(Messaging.Insert, nameof(AttendanceRecord)),
                Success = true
            };
        }
    }

    public sealed class ClockOutHandler : IRequestHandler<ClockOutRequest, BaseResponse<ClockOutResponse>>
    {
        private readonly IMapper _mapper;
        private readonly IAttendanceRepository _repository;

        public ClockOutHandler(IMapper mapper, IAttendanceRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<BaseResponse<ClockOutResponse>> Handle(ClockOutRequest request, CancellationToken cancellationToken)
        {
            if (request?.RequestParam == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var existing = await _repository.GetAttendanceAsync(new GetAllAttendanceRequest
            {
                RequestParam = new GetAllAttendanceDto { AttendanceId = request.RequestParam.AttendanceId }
            });

            if (existing == null)
                throw new NotFoundException(string.Format(Messaging.NotFound, nameof(AttendanceRecord)));

            existing.ClockOut = request.RequestParam.ClockOut ?? DateTime.UtcNow;
            existing.ModifiedOn = DateTime.UtcNow;
            existing.Notes = request.RequestParam.Notes ?? existing.Notes;

            if (existing.ClockIn.HasValue && existing.ClockOut.HasValue)
            {
                var total = (decimal)(existing.ClockOut.Value - existing.ClockIn.Value).TotalHours;
                existing.TotalHours = Math.Round(total, 2);
                existing.OvertimeHours = total > 8 ? Math.Round(total - 8, 2) : 0;
                existing.ProductiveHours = Math.Round(Math.Min(total, 8), 2);
            }

            await _repository.UpdateItemAsync(existing.Id, existing);

            return new BaseResponse<ClockOutResponse>
            {
                Data = new ClockOutResponse { AttendanceId = existing.Id },
                StatusCode = StatusCodes.Status200OK,
                Message = "Clock-out recorded successfully.",
                Success = true
            };
        }
    }

    public sealed class GetAllAttendanceHandler : IRequestHandler<GetAllAttendanceRequest, BaseResponsePagination<GetAllAttendanceResponse>>
    {
        private readonly IMapper _mapper;
        private readonly IAttendanceRepository _repository;

        public GetAllAttendanceHandler(IMapper mapper, IAttendanceRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<BaseResponsePagination<GetAllAttendanceResponse>> Handle(GetAllAttendanceRequest request, CancellationToken cancellationToken)
        {
            if (request == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var response = new BaseResponsePagination<GetAllAttendanceResponse>();
            (var records, int count) = await _repository.GetAllAttendanceWithCountAsync(request);

            if (records != null && records.Any())
            {
                var data = _mapper.Map<IReadOnlyList<AttendanceRecord>, IReadOnlyList<GetAllAttendanceItem>>(records.ToList());
                response.Data = new GetAllAttendanceResponse { AttendanceRecords = data.ToList() };

                if (request.PageCriteria != null && request.PageCriteria.EnablePage)
                    response.Meta = new Meta { Skip = request.PageCriteria.Skip, Take = request.PageCriteria.PageSize, TotalCount = count };
            }

            response.Success = true;
            response.StatusCode = StatusCodes.Status200OK;
            return response;
        }
    }

    public sealed class DeleteAttendanceHandler : IRequestHandler<DeleteAttendanceRequest, BaseResponse<DeleteAttendanceResponse>>
    {
        private readonly IAttendanceRepository _repository;

        public DeleteAttendanceHandler(IAttendanceRepository repository)
        {
            _repository = repository;
        }

        public async Task<BaseResponse<DeleteAttendanceResponse>> Handle(DeleteAttendanceRequest request, CancellationToken cancellationToken)
        {
            if (request?.RequestParam == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var existing = await _repository.GetAttendanceAsync(new GetAllAttendanceRequest
            {
                RequestParam = new GetAllAttendanceDto { AttendanceId = request.RequestParam.AttendanceId }
            });

            if (existing == null)
                throw new NotFoundException(string.Format(Messaging.NotFound, nameof(AttendanceRecord)));

            await _repository.DeleteItemAsync(existing.Id);

            return new BaseResponse<DeleteAttendanceResponse>
            {
                Data = new DeleteAttendanceResponse { AttendanceId = existing.Id },
                StatusCode = StatusCodes.Status200OK,
                Message = string.Format(Messaging.Delete, nameof(AttendanceRecord)),
                Success = true
            };
        }
    }
}
