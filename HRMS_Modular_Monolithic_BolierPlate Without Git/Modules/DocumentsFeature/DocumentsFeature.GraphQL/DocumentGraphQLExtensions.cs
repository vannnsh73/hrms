using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DocumentsFeature.GraphQL
{
    public static class DocumentGraphQLExtensions
    {
        public static IRequestExecutorBuilder AddDocumentsGraphQL(this IRequestExecutorBuilder builder)
        {
            return builder
                .AddTypeExtension<DocumentMutation>()
                .AddTypeExtension<DocumentQuery>();
        }
    }
}
