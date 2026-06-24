using HRMS.Shared.Application.DTOs;
using HRMS.Shared.Application.GraphQL;
using HotChocolate;
using HotChocolate.Types;
using MediatR;
using LeaveManagementFeature.Application.DTO;

namespace LeaveManagementFeature.GraphQL
{
    [ExtendObjectType(typeof(Query))]
    public class LeaveManagementQuery
    {
        [GraphQLName("getAllLeaveRequests")]
        public async Task<BaseResponsePagination<GetAllLeaveRequestsResponse>> GetAllLeaveRequestsAsync(GetAllLeaveRequestsQuery request, [Service] IMediator mediator)
            => await mediator.Send(request);

        [GraphQLName("getAllLeaveBalances")]
        public async Task<BaseResponsePagination<GetAllLeaveBalancesResponse>> GetAllLeaveBalancesAsync(GetAllLeaveBalancesQuery request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
