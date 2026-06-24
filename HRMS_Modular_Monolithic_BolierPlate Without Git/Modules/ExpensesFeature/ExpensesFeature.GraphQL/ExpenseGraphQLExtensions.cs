using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ExpensesFeature.GraphQL
{
    public static class ExpenseGraphQLExtensions
    {
        public static IRequestExecutorBuilder AddExpensesGraphQL(this IRequestExecutorBuilder builder)
        {
            return builder
                .AddTypeExtension<ExpenseMutation>()
                .AddTypeExtension<ExpenseQuery>();
        }
    }
}
