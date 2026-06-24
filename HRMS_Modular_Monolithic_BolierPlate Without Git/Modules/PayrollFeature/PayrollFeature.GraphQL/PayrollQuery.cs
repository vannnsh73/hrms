using HRMS.Shared.Application.DTOs;
using HRMS.Shared.Application.GraphQL;
using HotChocolate;
using HotChocolate.Types;
using MediatR;
using PayrollFeature.Application.DTO;

namespace PayrollFeature.GraphQL
{
    [ExtendObjectType(typeof(Query))]
    public class PayrollQuery
    {
        [GraphQLName("getAllPayrollRecords")]
        public async Task<BaseResponsePagination<GetAllPayrollRecordsResponse>> GetAllPayrollRecordsAsync(GetAllPayrollRecordsQuery request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
