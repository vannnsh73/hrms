using HRMS.Core.Postgres.Repositories;
using LeaveManagementFeature.Application.DTO;
using LeaveManagementFeature.Domain;

namespace LeaveManagementFeature.Application.Repository
{
    public interface ILeaveRequestRepository : IPostgresRepository<LeaveRequest>
    {
        Task<(IEnumerable<LeaveRequest> result, int count)> GetAllLeaveRequestsWithCountAsync(GetAllLeaveRequestsQuery request);
        Task<LeaveRequest?> GetLeaveRequestAsync(GetAllLeaveRequestsQuery request);
    }
}
