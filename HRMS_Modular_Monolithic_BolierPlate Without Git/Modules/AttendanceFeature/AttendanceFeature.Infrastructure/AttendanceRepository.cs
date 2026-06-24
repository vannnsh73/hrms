using HRMS.Core.Postgres.Data;
using HRMS.Core.Postgres.Helper;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Telemetry;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq.Expressions;
using AttendanceFeature.Application.DTO;
using AttendanceFeature.Application.Repository;
using AttendanceFeature.Domain;

namespace AttendanceFeature.Infrastructure
{
    public class AttendanceEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AttendanceRecord>(entity =>
            {
                entity.ToTable("AttendanceRecord");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasMaxLength(128);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
                entity.Property(e => e.EmployeeId).HasMaxLength(128);
                entity.Property(e => e.Status).HasMaxLength(50);
                entity.Property(e => e.ClockInMethod).HasMaxLength(50);
                
                entity.HasIndex(e => e.DocumentType);
                entity.HasIndex(e => e.EmployeeId);
                entity.HasIndex(e => e.Date);
                entity.HasIndex(e => e.Status);
            });
        }
    }

    public class AttendanceRepository : PostgresDbRepository<AttendanceRecord>, IAttendanceRepository
    {
        public AttendanceRepository(
            PostgresDbContext context,
            ILogger<AttendanceRepository> logger,
            ITelemetryService telemetryService,
            IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor)
        { }

        public override string TableName { get; } = nameof(AttendanceRecord);
        public override string GenerateId(AttendanceRecord entity) => Guid.NewGuid().ToString();

        private Expression<Func<AttendanceRecord, bool>> BuildQuery(GetAllAttendanceRequest request)
        {
            Expression<Func<AttendanceRecord, bool>> filter = x => x.DocumentType == nameof(AttendanceRecord);

            if (request.RequestParam == null) return filter;

            var dto = request.RequestParam;

            if (!string.IsNullOrEmpty(dto.AttendanceId))
                filter = filter.And(x => x.Id == dto.AttendanceId);

            if (!string.IsNullOrEmpty(dto.EmployeeId))
                filter = filter.And(x => x.EmployeeId == dto.EmployeeId);

            if (!string.IsNullOrEmpty(dto.Status))
                filter = filter.And(x => x.Status == dto.Status);

            if (dto.DateFrom.HasValue)
                filter = filter.And(x => x.Date >= dto.DateFrom.Value);

            if (dto.DateTo.HasValue)
                filter = filter.And(x => x.Date <= dto.DateTo.Value);

            return filter;
        }

        public async Task<(IEnumerable<AttendanceRecord> result, int count)> GetAllAttendanceWithCountAsync(GetAllAttendanceRequest request)
        {
            var orderBy = request.OrderByCriteria != null ? OrderBy(request) : x => x.Date; // default order by date
            return await GetItemsWithCountAsync(BuildQuery(request), request, orderBy);
        }

        public async Task<AttendanceRecord?> GetAttendanceAsync(GetAllAttendanceRequest request)
        {
            return await GetItemAsync(BuildQuery(request));
        }
    }
}
