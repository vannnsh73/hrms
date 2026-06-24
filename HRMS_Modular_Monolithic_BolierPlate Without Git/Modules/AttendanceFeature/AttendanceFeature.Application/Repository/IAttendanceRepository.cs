using HRMS.Core.Postgres.Repositories;
using AttendanceFeature.Application.DTO;
using AttendanceFeature.Domain;

namespace AttendanceFeature.Application.Repository
{
    public interface IAttendanceRepository : IPostgresRepository<AttendanceRecord>
    {
        Task<(IEnumerable<AttendanceRecord> result, int count)> GetAllAttendanceWithCountAsync(GetAllAttendanceRequest request);
        Task<AttendanceRecord?> GetAttendanceAsync(GetAllAttendanceRequest request);
    }
}
