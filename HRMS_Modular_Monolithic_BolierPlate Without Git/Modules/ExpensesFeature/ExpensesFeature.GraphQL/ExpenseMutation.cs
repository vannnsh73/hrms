using HRMS.Shared.Application.DTOs;
using HRMS.Shared.Application.GraphQL;
using HotChocolate;
using HotChocolate.Types;
using MediatR;
using ExpensesFeature.Application.DTO;

namespace ExpensesFeature.GraphQL
{
    [ExtendObjectType(typeof(Mutation))]
    public class ExpenseMutation
    {
        [GraphQLName("createExpenseClaim")]
        public async Task<BaseResponse<CreateExpenseClaimResponse>> CreateExpenseClaimAsync(CreateExpenseClaimCommand request, [Service] IMediator mediator)
            => await mediator.Send(request);

        [GraphQLName("updateExpenseClaimStatus")]
        public async Task<BaseResponse<UpdateExpenseClaimStatusResponse>> UpdateExpenseClaimStatusAsync(UpdateExpenseClaimStatusCommand request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
