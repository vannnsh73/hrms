using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace UserFeature.GraphQL
{
    public static class UserGraphQLExtensions
    {
        public static IRequestExecutorBuilder AddUserGraphQL(this IRequestExecutorBuilder builder)
        {
            return builder
                .AddTypeExtension<EmployeeMutation>()
                .AddTypeExtension<EmployeeQuery>();
        }
    }
}
