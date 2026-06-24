using HRMS.Shared.Application.DTOs;
using HRMS.Shared.Application.GraphQL;
using HotChocolate;
using HotChocolate.Types;
using MediatR;
using ExpensesFeature.Application.DTO;

namespace ExpensesFeature.GraphQL
{
    [ExtendObjectType(typeof(Query))]
    public class ExpenseQuery
    {
        [GraphQLName("getAllExpenseClaims")]
        public async Task<BaseResponsePagination<GetAllExpenseClaimsResponse>> GetAllExpenseClaimsAsync(GetAllExpenseClaimsQuery request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
