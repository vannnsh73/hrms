using AutoMapper;
using LeaveManagementFeature.Application.Repository;
using LeaveManagementFeature.Domain;
using HRMS.Core.Telemetry.Exceptions;
using HRMS.Shared.Application.Constants;
using HRMS.Shared.Application.DTOs;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace LeaveManagementFeature.Application.DTO
{
    public sealed class CreateLeaveRequestHandler : IRequestHandler<CreateLeaveRequestCommand, BaseResponse<CreateLeaveRequestResponse>>
    {
        private readonly IMapper _mapper;
        private readonly ILeaveRequestRepository _repository;
        private readonly ILeaveBalanceRepository _balanceRepository;

        public CreateLeaveRequestHandler(IMapper mapper, ILeaveRequestRepository repository, ILeaveBalanceRepository balanceRepository)
        {
            _mapper = mapper;
            _repository = repository;
            _balanceRepository = balanceRepository;
        }

        public async Task<BaseResponse<CreateLeaveRequestResponse>> Handle(CreateLeaveRequestCommand request, CancellationToken cancellationToken)
        {
            if (request?.RequestParam == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            // Validate leave balance before submitting
            var balanceRequest = new GetAllLeaveBalancesQuery
            {
                RequestParam = new GetAllLeaveBalancesDto
                {
                    EmployeeId = request.RequestParam.EmployeeId,
                    Year = DateTime.UtcNow.Year
                }
            };
            (var balances, _) = await _balanceRepository.GetAllLeaveBalancesWithCountAsync(balanceRequest);
            var specificBalance = balances?.FirstOrDefault(b => b.LeaveType == request.RequestParam.LeaveType);

            if (specificBalance != null && specificBalance.Available < request.RequestParam.TotalDays)
            {
                throw new BadRequestException("Insufficient leave balance for this request.");
            }

            var record = _mapper.Map<LeaveRequest>(request.RequestParam);
            record = await _repository.AddItemAsync(record);

            return new BaseResponse<CreateLeaveRequestResponse>
            {
                Data = new CreateLeaveRequestResponse { LeaveRequestId = record?.Id },
                StatusCode = StatusCodes.Status200OK,
                Message = string.Format(Messaging.Insert, nameof(LeaveRequest)),
                Success = true
            };
        }
    }

    public sealed class UpdateLeaveRequestStatusHandler : IRequestHandler<UpdateLeaveRequestStatusCommand, BaseResponse<UpdateLeaveRequestStatusResponse>>
    {
        private readonly ILeaveRequestRepository _repository;
        private readonly ILeaveBalanceRepository _balanceRepository;

        public UpdateLeaveRequestStatusHandler(ILeaveRequestRepository repository, ILeaveBalanceRepository balanceRepository)
        {
            _repository = repository;
            _balanceRepository = balanceRepository;
        }

        public async Task<BaseResponse<UpdateLeaveRequestStatusResponse>> Handle(UpdateLeaveRequestStatusCommand request, CancellationToken cancellationToken)
        {
            if (request?.RequestParam == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var existing = await _repository.GetLeaveRequestAsync(new GetAllLeaveRequestsQuery
            {
                RequestParam = new GetAllLeaveRequestsDto { LeaveRequestId = request.RequestParam.LeaveRequestId }
            });

            if (existing == null)
                throw new NotFoundException(string.Format(Messaging.NotFound, nameof(LeaveRequest)));

            // If moving from Pending to Approved, we need to deduct from the balance
            if (existing.Status == "Pending" && request.RequestParam.Status == "Approved")
            {
                var balanceRequest = new GetAllLeaveBalancesQuery
                {
                    RequestParam = new GetAllLeaveBalancesDto
                    {
                        EmployeeId = existing.EmployeeId,
                        Year = existing.StartDate?.Year ?? DateTime.UtcNow.Year
                    }
                };
                (var balances, _) = await _balanceRepository.GetAllLeaveBalancesWithCountAsync(balanceRequest);
                var specificBalance = balances?.FirstOrDefault(b => b.LeaveType == existing.LeaveType);

                if (specificBalance != null)
                {
                    specificBalance.Used += existing.TotalDays;
                    specificBalance.Available -= existing.TotalDays;
                    await _balanceRepository.UpdateItemAsync(specificBalance.Id, specificBalance);
                }
            }
            // If moving from Approved to Cancelled/Rejected, we need to refund the balance
            else if (existing.Status == "Approved" && (request.RequestParam.Status == "Cancelled" || request.RequestParam.Status == "Rejected"))
            {
                var balanceRequest = new GetAllLeaveBalancesQuery
                {
                    RequestParam = new GetAllLeaveBalancesDto
                    {
                        EmployeeId = existing.EmployeeId,
                        Year = existing.StartDate?.Year ?? DateTime.UtcNow.Year
                    }
                };
                (var balances, _) = await _balanceRepository.GetAllLeaveBalancesWithCountAsync(balanceRequest);
                var specificBalance = balances?.FirstOrDefault(b => b.LeaveType == existing.LeaveType);

                if (specificBalance != null)
                {
                    specificBalance.Used -= existing.TotalDays;
                    specificBalance.Available += existing.TotalDays;
                    await _balanceRepository.UpdateItemAsync(specificBalance.Id, specificBalance);
                }
            }

            existing.Status = request.RequestParam.Status;
            existing.ApproverId = request.RequestParam.ApproverId;
            existing.ApproverComments = request.RequestParam.ApproverComments;
            existing.ModifiedOn = DateTime.UtcNow;

            await _repository.UpdateItemAsync(existing.Id, existing);

            return new BaseResponse<UpdateLeaveRequestStatusResponse>
            {
                Data = new UpdateLeaveRequestStatusResponse { LeaveRequestId = existing.Id },
                StatusCode = StatusCodes.Status200OK,
                Message = string.Format(Messaging.Update, nameof(LeaveRequest)),
                Success = true
            };
        }
    }

    public sealed class GetAllLeaveRequestsHandler : IRequestHandler<GetAllLeaveRequestsQuery, BaseResponsePagination<GetAllLeaveRequestsResponse>>
    {
        private readonly IMapper _mapper;
        private readonly ILeaveRequestRepository _repository;

        public GetAllLeaveRequestsHandler(IMapper mapper, ILeaveRequestRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<BaseResponsePagination<GetAllLeaveRequestsResponse>> Handle(GetAllLeaveRequestsQuery request, CancellationToken cancellationToken)
        {
            if (request == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var response = new BaseResponsePagination<GetAllLeaveRequestsResponse>();
            (var records, int count) = await _repository.GetAllLeaveRequestsWithCountAsync(request);

            if (records != null && records.Any())
            {
                var data = _mapper.Map<IReadOnlyList<LeaveRequest>, IReadOnlyList<GetAllLeaveRequestsItem>>(records.ToList());
                response.Data = new GetAllLeaveRequestsResponse { LeaveRequests = data.ToList() };

                if (request.PageCriteria != null && request.PageCriteria.EnablePage)
                    response.Meta = new Meta { Skip = request.PageCriteria.Skip, Take = request.PageCriteria.PageSize, TotalCount = count };
            }

            response.Success = true;
            response.StatusCode = StatusCodes.Status200OK;
            return response;
        }
    }

    public sealed class GetAllLeaveBalancesHandler : IRequestHandler<GetAllLeaveBalancesQuery, BaseResponsePagination<GetAllLeaveBalancesResponse>>
    {
        private readonly IMapper _mapper;
        private readonly ILeaveBalanceRepository _repository;

        public GetAllLeaveBalancesHandler(IMapper mapper, ILeaveBalanceRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<BaseResponsePagination<GetAllLeaveBalancesResponse>> Handle(GetAllLeaveBalancesQuery request, CancellationToken cancellationToken)
        {
            if (request == null)
                throw new BadRequestException(string.Format(Messaging.InvalidRequest));

            var response = new BaseResponsePagination<GetAllLeaveBalancesResponse>();
            (var records, int count) = await _repository.GetAllLeaveBalancesWithCountAsync(request);

            if (records != null && records.Any())
            {
                var data = _mapper.Map<IReadOnlyList<LeaveBalance>, IReadOnlyList<GetAllLeaveBalancesItem>>(records.ToList());
                response.Data = new GetAllLeaveBalancesResponse { LeaveBalances = data.ToList() };

                if (request.PageCriteria != null && request.PageCriteria.EnablePage)
                    response.Meta = new Meta { Skip = request.PageCriteria.Skip, Take = request.PageCriteria.PageSize, TotalCount = count };
            }

            response.Success = true;
            response.StatusCode = StatusCodes.Status200OK;
            return response;
        }
    }
}
