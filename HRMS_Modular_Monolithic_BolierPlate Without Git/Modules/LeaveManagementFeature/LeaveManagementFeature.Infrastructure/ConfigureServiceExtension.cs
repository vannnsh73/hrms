using HRMS.Core.Postgres.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using LeaveManagementFeature.Application.Repository;

namespace LeaveManagementFeature.Infrastructure
{
    public static class ConfigureServiceExtension
    {
        public static IServiceCollection AddLeaveManagementDependency(this IServiceCollection services, IConfiguration configuration)
        {
            services.TryAddEnumerable(ServiceDescriptor.Scoped<IPostgresEntityConfigurator, LeaveRequestEntityConfigurator>());
            services.TryAddEnumerable(ServiceDescriptor.Scoped<IPostgresEntityConfigurator, LeaveBalanceEntityConfigurator>());
            services.AddScoped<ILeaveRequestRepository, LeaveRequestRepository>();
            services.AddScoped<ILeaveBalanceRepository, LeaveBalanceRepository>();
            return services;
        }
    }
}
