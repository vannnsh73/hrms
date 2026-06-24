using HRMS.Core.Postgres.Data;
using HRMS.Core.Postgres.Helper;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Telemetry;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq.Expressions;
using LeaveManagementFeature.Application.DTO;
using LeaveManagementFeature.Application.Repository;
using LeaveManagementFeature.Domain;

namespace LeaveManagementFeature.Infrastructure
{
    public class LeaveRequestEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LeaveRequest>(entity =>
            {
                entity.ToTable("LeaveRequest");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasMaxLength(128);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
                entity.Property(e => e.EmployeeId).HasMaxLength(128);
                entity.Property(e => e.LeaveType).HasMaxLength(100);
                entity.Property(e => e.Status).HasMaxLength(50);
                entity.Property(e => e.ApproverId).HasMaxLength(128);
                
                entity.HasIndex(e => e.DocumentType);
                entity.HasIndex(e => e.EmployeeId);
                entity.HasIndex(e => e.Status);
                entity.HasIndex(e => e.LeaveType);
            });
        }
    }

    public class LeaveBalanceEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LeaveBalance>(entity =>
            {
                entity.ToTable("LeaveBalance");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasMaxLength(128);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
                entity.Property(e => e.EmployeeId).HasMaxLength(128);
                entity.Property(e => e.LeaveType).HasMaxLength(100);
                
                entity.HasIndex(e => e.DocumentType);
                entity.HasIndex(e => e.EmployeeId);
                entity.HasIndex(e => new { e.EmployeeId, e.LeaveType, e.Year }).IsUnique();
            });
        }
    }

    public class LeaveRequestRepository : PostgresDbRepository<LeaveRequest>, ILeaveRequestRepository
    {
        public LeaveRequestRepository(
            PostgresDbContext context,
            ILogger<LeaveRequestRepository> logger,
            ITelemetryService telemetryService,
            IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor)
        { }

        public override string TableName { get; } = nameof(LeaveRequest);
        public override string GenerateId(LeaveRequest entity) => Guid.NewGuid().ToString();

        private Expression<Func<LeaveRequest, bool>> BuildQuery(GetAllLeaveRequestsQuery query)
        {
            Expression<Func<LeaveRequest, bool>> filter = x => x.DocumentType == nameof(LeaveRequest);

            if (query.RequestParam == null) return filter;

            var dto = query.RequestParam;

            if (!string.IsNullOrEmpty(dto.LeaveRequestId))
                filter = filter.And(x => x.Id == dto.LeaveRequestId);

            if (!string.IsNullOrEmpty(dto.EmployeeId))
                filter = filter.And(x => x.EmployeeId == dto.EmployeeId);

            if (!string.IsNullOrEmpty(dto.Status))
                filter = filter.And(x => x.Status == dto.Status);

            if (!string.IsNullOrEmpty(dto.LeaveType))
                filter = filter.And(x => x.LeaveType == dto.LeaveType);

            return filter;
        }

        public async Task<(IEnumerable<LeaveRequest> result, int count)> GetAllLeaveRequestsWithCountAsync(GetAllLeaveRequestsQuery request)
        {
            var orderBy = request.OrderByCriteria != null ? OrderBy(request) : x => x.CreatedOn;
            return await GetItemsWithCountAsync(BuildQuery(request), request, orderBy);
        }

        public async Task<LeaveRequest?> GetLeaveRequestAsync(GetAllLeaveRequestsQuery request)
        {
            return await GetItemAsync(BuildQuery(request));
        }
    }

    public class LeaveBalanceRepository : PostgresDbRepository<LeaveBalance>, ILeaveBalanceRepository
    {
        public LeaveBalanceRepository(
            PostgresDbContext context,
            ILogger<LeaveBalanceRepository> logger,
            ITelemetryService telemetryService,
            IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor)
        { }

        public override string TableName { get; } = nameof(LeaveBalance);
        public override string GenerateId(LeaveBalance entity) => Guid.NewGuid().ToString();

        private Expression<Func<LeaveBalance, bool>> BuildQuery(GetAllLeaveBalancesQuery query)
        {
            Expression<Func<LeaveBalance, bool>> filter = x => x.DocumentType == nameof(LeaveBalance);

            if (query.RequestParam == null) return filter;

            var dto = query.RequestParam;

            if (!string.IsNullOrEmpty(dto.EmployeeId))
                filter = filter.And(x => x.EmployeeId == dto.EmployeeId);

            if (dto.Year.HasValue)
                filter = filter.And(x => x.Year == dto.Year.Value);

            return filter;
        }

        public async Task<(IEnumerable<LeaveBalance> result, int count)> GetAllLeaveBalancesWithCountAsync(GetAllLeaveBalancesQuery request)
        {
            var orderBy = request.OrderByCriteria != null ? OrderBy(request) : x => x.LeaveType;
            return await GetItemsWithCountAsync(BuildQuery(request), request, orderBy);
        }

        public async Task<LeaveBalance?> GetLeaveBalanceAsync(GetAllLeaveBalancesQuery request)
        {
            return await GetItemAsync(BuildQuery(request));
        }
    }
}
