using HRMS.Shared.Application.DTOs;
using HRMS.Shared.Application.GraphQL;
using HotChocolate;
using HotChocolate.Types;
using MediatR;
using DocumentsFeature.Application.DTO;

namespace DocumentsFeature.GraphQL
{
    [ExtendObjectType(typeof(Query))]
    public class DocumentQuery
    {
        [GraphQLName("getAllDocuments")]
        public async Task<BaseResponsePagination<GetAllDocumentsResponse>> GetAllDocumentsAsync(GetAllDocumentsQuery request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
