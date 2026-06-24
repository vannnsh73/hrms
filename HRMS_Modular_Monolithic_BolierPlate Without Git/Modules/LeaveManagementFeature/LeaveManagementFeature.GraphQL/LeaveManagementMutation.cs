using HRMS.Shared.Application.DTOs;
using HRMS.Shared.Application.GraphQL;
using HotChocolate;
using HotChocolate.Types;
using MediatR;
using LeaveManagementFeature.Application.DTO;

namespace LeaveManagementFeature.GraphQL
{
    [ExtendObjectType(typeof(Mutation))]
    public class LeaveManagementMutation
    {
        [GraphQLName("createLeaveRequest")]
        public async Task<BaseResponse<CreateLeaveRequestResponse>> CreateLeaveRequestAsync(CreateLeaveRequestCommand request, [Service] IMediator mediator)
            => await mediator.Send(request);

        [GraphQLName("updateLeaveRequestStatus")]
        public async Task<BaseResponse<UpdateLeaveRequestStatusResponse>> UpdateLeaveRequestStatusAsync(UpdateLeaveRequestStatusCommand request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
