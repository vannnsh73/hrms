using HRMS.Core.Postgres.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ExpensesFeature.Application.Repository;

namespace ExpensesFeature.Infrastructure
{
    public static class ConfigureServiceExtension
    {
        public static IServiceCollection AddExpensesDependency(this IServiceCollection services, IConfiguration configuration)
        {
            services.TryAddEnumerable(ServiceDescriptor.Scoped<IPostgresEntityConfigurator, ExpenseEntityConfigurator>());
            services.AddScoped<IExpenseRepository, ExpenseRepository>();
            return services;
        }
    }
}
