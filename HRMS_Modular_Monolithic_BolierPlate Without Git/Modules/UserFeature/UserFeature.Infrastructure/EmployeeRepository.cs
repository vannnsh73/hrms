using HRMS.Core.Postgres.Data;
using HRMS.Core.Postgres.Helper;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Telemetry;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq.Expressions;
using UserFeature.Application.DTO;
using UserFeature.Application.Repository;
using UserFeature.Domain;

namespace UserFeature.Infrastructure
{
    public class EmployeeEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("Employee");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasMaxLength(128);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
                entity.Property(e => e.FirstName).HasMaxLength(200);
                entity.Property(e => e.LastName).HasMaxLength(200);
                entity.Property(e => e.Email).HasMaxLength(500);
                entity.Property(e => e.Department).HasMaxLength(200);
                entity.Property(e => e.Designation).HasMaxLength(200);
                entity.Property(e => e.Role).HasMaxLength(50);
                entity.Property(e => e.Country).HasMaxLength(10);
                entity.HasIndex(e => e.DocumentType);
                entity.HasIndex(e => e.Email);
                entity.HasIndex(e => e.Department);
                entity.HasIndex(e => e.ManagerId);
                entity.OwnsOne(e => e.Address);
            });
        }
    }

    public class EmployeeRepository : PostgresDbRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(
            PostgresDbContext context,
            ILogger<EmployeeRepository> logger,
            ITelemetryService telemetryService,
            IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor)
        { }

        public override string TableName { get; } = nameof(Employee);
        public override string GenerateId(Employee entity) => Guid.NewGuid().ToString();

        private Expression<Func<Employee, bool>> BuildQuery(GetAllEmployeesRequest request)
        {
            Expression<Func<Employee, bool>> filter = x => x.DocumentType == nameof(Employee);

            if (request.RequestParam == null) return filter;

            var dto = request.RequestParam;

            if (!string.IsNullOrEmpty(dto.EmployeeId))
                filter = filter.And(x => x.Id == dto.EmployeeId);

            if (!string.IsNullOrEmpty(dto.Department))
                filter = filter.And(x => x.Department == dto.Department);

            if (!string.IsNullOrEmpty(dto.Role))
                filter = filter.And(x => x.Role == dto.Role);

            if (!string.IsNullOrEmpty(dto.EmploymentStatus))
                filter = filter.And(x => x.EmploymentStatus == dto.EmploymentStatus);

            if (!string.IsNullOrEmpty(dto.ManagerId))
                filter = filter.And(x => x.ManagerId == dto.ManagerId);

            if (!string.IsNullOrEmpty(dto.Keyword))
            {
                var kw = dto.Keyword.ToLower().Trim();
                Expression<Func<Employee, bool>> kwFilter = n => false;
                kwFilter = kwFilter
                    .Or(a => a.FirstName != null && a.FirstName.ToLower().Contains(kw))
                    .Or(a => a.LastName != null && a.LastName.ToLower().Contains(kw))
                    .Or(a => a.Email != null && a.Email.ToLower().Contains(kw));
                filter = filter.And(kwFilter);
            }

            return filter;
        }

        public async Task<(IEnumerable<Employee> result, int count)> GetAllEmployeesWithCountAsync(GetAllEmployeesRequest request)
        {
            var orderBy = request.OrderByCriteria != null ? OrderBy(request) : x => x.ModifiedOn;
            return await GetItemsWithCountAsync(BuildQuery(request), request, orderBy);
        }

        public async Task<Employee?> GetEmployeeAsync(GetAllEmployeesRequest request)
        {
            return await GetItemAsync(BuildQuery(request));
        }
    }
}
