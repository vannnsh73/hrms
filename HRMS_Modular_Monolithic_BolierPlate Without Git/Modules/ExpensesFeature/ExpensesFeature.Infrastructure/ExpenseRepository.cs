using HRMS.Core.Postgres.Data;
using HRMS.Core.Postgres.Helper;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Telemetry;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq.Expressions;
using ExpensesFeature.Application.DTO;
using ExpensesFeature.Application.Repository;
using ExpensesFeature.Domain;

namespace ExpensesFeature.Infrastructure
{
    public class ExpenseEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ExpenseClaim>(entity =>
            {
                entity.ToTable("ExpenseClaim");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasMaxLength(128);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
                entity.Property(e => e.EmployeeId).HasMaxLength(128);
                entity.Property(e => e.ClaimName).HasMaxLength(255);
                entity.Property(e => e.Status).HasMaxLength(50);
                entity.Property(e => e.Currency).HasMaxLength(10);
                entity.Property(e => e.ApproverId).HasMaxLength(128);

                // EF Core mapping for List to JSONB
                entity.Property(e => e.Items).HasColumnType("jsonb");

                entity.HasIndex(e => e.DocumentType);
                entity.HasIndex(e => e.EmployeeId);
                entity.HasIndex(e => e.Status);
            });
        }
    }

    public class ExpenseRepository : PostgresDbRepository<ExpenseClaim>, IExpenseRepository
    {
        public ExpenseRepository(
            PostgresDbContext context,
            ILogger<ExpenseRepository> logger,
            ITelemetryService telemetryService,
            IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor)
        { }

        public override string TableName { get; } = nameof(ExpenseClaim);
        public override string GenerateId(ExpenseClaim entity) => Guid.NewGuid().ToString();

        private Expression<Func<ExpenseClaim, bool>> BuildQuery(GetAllExpenseClaimsQuery request)
        {
            Expression<Func<ExpenseClaim, bool>> filter = x => x.DocumentType == nameof(ExpenseClaim);

            if (request.RequestParam == null) return filter;

            var dto = request.RequestParam;

            if (!string.IsNullOrEmpty(dto.ExpenseClaimId))
                filter = filter.And(x => x.Id == dto.ExpenseClaimId);

            if (!string.IsNullOrEmpty(dto.EmployeeId))
                filter = filter.And(x => x.EmployeeId == dto.EmployeeId);

            if (!string.IsNullOrEmpty(dto.Status))
                filter = filter.And(x => x.Status == dto.Status);

            return filter;
        }

        public async Task<(IEnumerable<ExpenseClaim> result, int count)> GetAllExpenseClaimsWithCountAsync(GetAllExpenseClaimsQuery request)
        {
            var orderBy = request.OrderByCriteria != null ? OrderBy(request) : x => x.CreatedOn;
            return await GetItemsWithCountAsync(BuildQuery(request), request, orderBy);
        }

        public async Task<ExpenseClaim?> GetExpenseClaimAsync(GetAllExpenseClaimsQuery request)
        {
            return await GetItemAsync(BuildQuery(request));
        }
    }
}
