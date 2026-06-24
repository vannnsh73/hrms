using HRMS.Core.Postgres.Repositories;
using LeaveManagementFeature.Application.DTO;
using LeaveManagementFeature.Domain;

namespace LeaveManagementFeature.Application.Repository
{
    public interface ILeaveBalanceRepository : IPostgresRepository<LeaveBalance>
    {
        Task<(IEnumerable<LeaveBalance> result, int count)> GetAllLeaveBalancesWithCountAsync(GetAllLeaveBalancesQuery request);
        Task<LeaveBalance?> GetLeaveBalanceAsync(GetAllLeaveBalancesQuery request);
    }
}
