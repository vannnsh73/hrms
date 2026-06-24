using HRMS.Shared.Application.DTOs;
using HRMS.Shared.Application.GraphQL;
using HotChocolate;
using HotChocolate.Types;
using MediatR;
using UserFeature.Application.DTO;

namespace UserFeature.GraphQL
{
    [ExtendObjectType(typeof(Query))]
    public class EmployeeQuery
    {
        [GraphQLName("getAllEmployees")]
        public async Task<BaseResponsePagination<GetAllEmployeesResponse>> GetAllEmployeesAsync(GetAllEmployeesRequest request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
