using HotChocolate.Execution.Configuration;
using TodoFeature.GraphQL;
using UserFeature.GraphQL;
using AttendanceFeature.GraphQL;
using LeaveManagementFeature.GraphQL;
using PayrollFeature.GraphQL;

namespace HRMS.API.RegisterDependencies
{
    public static class GraphQLModuleRegistration
    {
        public static IRequestExecutorBuilder AddGraphQLModules(this IRequestExecutorBuilder builder)
        {
            return builder
                .AddTodosGraphQL()
                .AddUserGraphQL()
                .AddAttendanceGraphQL()
                .AddLeaveManagementGraphQL()
                .AddPayrollGraphQL();
        }
    }
}
