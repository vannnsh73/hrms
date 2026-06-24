using HRMS.Shared.Application.DTOs;
using HRMS.Shared.Application.GraphQL;
using HotChocolate;
using HotChocolate.Types;
using MediatR;
using AttendanceFeature.Application.DTO;

namespace AttendanceFeature.GraphQL
{
    [ExtendObjectType(typeof(Mutation))]
    public class AttendanceMutation
    {
        [GraphQLName("createAttendance")]
        public async Task<BaseResponse<CreateAttendanceResponse>> CreateAttendanceAsync(CreateAttendanceRequest request, [Service] IMediator mediator)
            => await mediator.Send(request);

        [GraphQLName("clockOut")]
        public async Task<BaseResponse<ClockOutResponse>> ClockOutAsync(ClockOutRequest request, [Service] IMediator mediator)
            => await mediator.Send(request);

        [GraphQLName("deleteAttendance")]
        public async Task<BaseResponse<DeleteAttendanceResponse>> DeleteAttendanceAsync(DeleteAttendanceRequest request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
