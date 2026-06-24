using TodoFeature.Infrastructure;
using UserFeature.Infrastructure;
using AttendanceFeature.Infrastructure;
using LeaveManagementFeature.Infrastructure;
using PayrollFeature.Infrastructure;

namespace HRMS.API.RegisterDependencies
{
    public static class RepositoryRegistration
    {
        public static IServiceCollection AddModulesDependencyInjection(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTodoDependency(configuration);
            services.AddUserDependency(configuration);
            services.AddAttendanceDependency(configuration);
            services.AddLeaveManagementDependency(configuration);
            services.AddPayrollDependency(configuration);
            return services;
        }
    }
}
