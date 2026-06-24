using HRMS.Shared.Application.DTOs;
using HRMS.Shared.Application.GraphQL;
using HotChocolate;
using HotChocolate.Types;
using MediatR;
using PayrollFeature.Application.DTO;

namespace PayrollFeature.GraphQL
{
    [ExtendObjectType(typeof(Mutation))]
    public class PayrollMutation
    {
        [GraphQLName("createPayrollRecord")]
        public async Task<BaseResponse<CreatePayrollRecordResponse>> CreatePayrollRecordAsync(CreatePayrollRecordCommand request, [Service] IMediator mediator)
            => await mediator.Send(request);

        [GraphQLName("updatePayrollStatus")]
        public async Task<BaseResponse<UpdatePayrollStatusResponse>> UpdatePayrollStatusAsync(UpdatePayrollStatusCommand request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
