using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LeaveManagementFeature.GraphQL
{
    public static class LeaveManagementGraphQLExtensions
    {
        public static IRequestExecutorBuilder AddLeaveManagementGraphQL(this IRequestExecutorBuilder builder)
        {
            return builder
                .AddTypeExtension<LeaveManagementMutation>()
                .AddTypeExtension<LeaveManagementQuery>();
        }
    }
}
