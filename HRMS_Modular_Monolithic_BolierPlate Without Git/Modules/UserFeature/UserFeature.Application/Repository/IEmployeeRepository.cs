using HRMS.Core.Postgres.Repositories;
using UserFeature.Application.DTO;
using UserFeature.Domain;

namespace UserFeature.Application.Repository
{
    public interface IEmployeeRepository : IPostgresRepository<Employee>
    {
        Task<(IEnumerable<Employee> result, int count)> GetAllEmployeesWithCountAsync(GetAllEmployeesRequest request);
        Task<Employee?> GetEmployeeAsync(GetAllEmployeesRequest request);
    }
}
