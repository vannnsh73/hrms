using HRMS.Shared.Application.DTOs;
using HRMS.Shared.Application.GraphQL;
using HotChocolate;
using HotChocolate.Types;
using MediatR;
using DocumentsFeature.Application.DTO;

namespace DocumentsFeature.GraphQL
{
    [ExtendObjectType(typeof(Mutation))]
    public class DocumentMutation
    {
        [GraphQLName("uploadDocument")]
        public async Task<BaseResponse<UploadDocumentResponse>> UploadDocumentAsync(UploadDocumentCommand request, [Service] IMediator mediator)
            => await mediator.Send(request);

        [GraphQLName("verifyDocument")]
        public async Task<BaseResponse<VerifyDocumentResponse>> VerifyDocumentAsync(VerifyDocumentCommand request, [Service] IMediator mediator)
            => await mediator.Send(request);

        [GraphQLName("deleteDocument")]
        public async Task<BaseResponse<DeleteDocumentResponse>> DeleteDocumentAsync(DeleteDocumentCommand request, [Service] IMediator mediator)
            => await mediator.Send(request);
    }
}
