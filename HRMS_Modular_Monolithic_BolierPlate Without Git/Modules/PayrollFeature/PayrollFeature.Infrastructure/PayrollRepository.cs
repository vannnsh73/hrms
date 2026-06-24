using HRMS.Core.Postgres.Data;
using HRMS.Core.Postgres.Helper;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Telemetry;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq.Expressions;
using PayrollFeature.Application.DTO;
using PayrollFeature.Application.Repository;
using PayrollFeature.Domain;

namespace PayrollFeature.Infrastructure
{
    public class PayrollEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PayrollRecord>(entity =>
            {
                entity.ToTable("PayrollRecord");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasMaxLength(128);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
                entity.Property(e => e.EmployeeId).HasMaxLength(128);
                entity.Property(e => e.PayPeriod).HasMaxLength(50);
                entity.Property(e => e.Status).HasMaxLength(50);
                entity.Property(e => e.Currency).HasMaxLength(10);
                entity.Property(e => e.Country).HasMaxLength(10);
                
                // EF Core mapping for Dictionaries to JSONB (requires Npgsql.EntityFrameworkCore.PostgreSQL >= 8.0)
                entity.Property(e => e.Earnings).HasColumnType("jsonb");
                entity.Property(e => e.Deductions).HasColumnType("jsonb");
                entity.Property(e => e.EmployerContributions).HasColumnType("jsonb");

                entity.HasIndex(e => e.DocumentType);
                entity.HasIndex(e => e.EmployeeId);
                entity.HasIndex(e => e.PayPeriod);
                entity.HasIndex(e => e.Status);
            });
        }
    }

    public class PayrollRepository : PostgresDbRepository<PayrollRecord>, IPayrollRepository
    {
        public PayrollRepository(
            PostgresDbContext context,
            ILogger<PayrollRepository> logger,
            ITelemetryService telemetryService,
            IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor)
        { }

        public override string TableName { get; } = nameof(PayrollRecord);
        public override string GenerateId(PayrollRecord entity) => Guid.NewGuid().ToString();

        private Expression<Func<PayrollRecord, bool>> BuildQuery(GetAllPayrollRecordsQuery request)
        {
            Expression<Func<PayrollRecord, bool>> filter = x => x.DocumentType == nameof(PayrollRecord);

            if (request.RequestParam == null) return filter;

            var dto = request.RequestParam;

            if (!string.IsNullOrEmpty(dto.PayrollRecordId))
                filter = filter.And(x => x.Id == dto.PayrollRecordId);

            if (!string.IsNullOrEmpty(dto.EmployeeId))
                filter = filter.And(x => x.EmployeeId == dto.EmployeeId);

            if (!string.IsNullOrEmpty(dto.Status))
                filter = filter.And(x => x.Status == dto.Status);

            if (!string.IsNullOrEmpty(dto.PayPeriod))
                filter = filter.And(x => x.PayPeriod == dto.PayPeriod);

            return filter;
        }

        public async Task<(IEnumerable<PayrollRecord> result, int count)> GetAllPayrollRecordsWithCountAsync(GetAllPayrollRecordsQuery request)
        {
            var orderBy = request.OrderByCriteria != null ? OrderBy(request) : x => x.PayDate;
            return await GetItemsWithCountAsync(BuildQuery(request), request, orderBy);
        }

        public async Task<PayrollRecord?> GetPayrollRecordAsync(GetAllPayrollRecordsQuery request)
        {
            return await GetItemAsync(BuildQuery(request));
        }
    }
}
