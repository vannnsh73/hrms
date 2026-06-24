using HRMS.Core.Postgres.Data;
using HRMS.Core.Postgres.Helper;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Repositories;
using HRMS.Core.Telemetry;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq.Expressions;
using DocumentsFeature.Application.DTO;
using DocumentsFeature.Application.Repository;
using DocumentsFeature.Domain;

namespace DocumentsFeature.Infrastructure
{
    public class DocumentEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeDocument>(entity =>
            {
                entity.ToTable("EmployeeDocument");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasMaxLength(128);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
                entity.Property(e => e.EmployeeId).HasMaxLength(128);
                entity.Property(e => e.DocumentCategory).HasMaxLength(100);
                entity.Property(e => e.DocumentName).HasMaxLength(255);
                entity.Property(e => e.FileExtension).HasMaxLength(20);
                entity.Property(e => e.UploadedBy).HasMaxLength(128);
                entity.Property(e => e.VerifiedBy).HasMaxLength(128);

                entity.HasIndex(e => e.DocumentType);
                entity.HasIndex(e => e.EmployeeId);
                entity.HasIndex(e => e.DocumentCategory);
            });
        }
    }

    public class DocumentRepository : PostgresDbRepository<EmployeeDocument>, IDocumentRepository
    {
        public DocumentRepository(
            PostgresDbContext context,
            ILogger<DocumentRepository> logger,
            ITelemetryService telemetryService,
            IHttpContextAccessor httpContextAccessor)
            : base(context, logger, telemetryService, httpContextAccessor)
        { }

        public override string TableName { get; } = nameof(EmployeeDocument);
        public override string GenerateId(EmployeeDocument entity) => Guid.NewGuid().ToString();

        private Expression<Func<EmployeeDocument, bool>> BuildQuery(GetAllDocumentsQuery request)
        {
            Expression<Func<EmployeeDocument, bool>> filter = x => x.DocumentType == nameof(EmployeeDocument);

            if (request.RequestParam == null) return filter;

            var dto = request.RequestParam;

            if (!string.IsNullOrEmpty(dto.DocumentId))
                filter = filter.And(x => x.Id == dto.DocumentId);

            if (!string.IsNullOrEmpty(dto.EmployeeId))
                filter = filter.And(x => x.EmployeeId == dto.EmployeeId);

            if (!string.IsNullOrEmpty(dto.DocumentCategory))
                filter = filter.And(x => x.DocumentCategory == dto.DocumentCategory);

            if (dto.IsVerified.HasValue)
                filter = filter.And(x => x.IsVerified == dto.IsVerified.Value);

            return filter;
        }

        public async Task<(IEnumerable<EmployeeDocument> result, int count)> GetAllDocumentsWithCountAsync(GetAllDocumentsQuery request)
        {
            var orderBy = request.OrderByCriteria != null ? OrderBy(request) : x => x.CreatedOn;
            return await GetItemsWithCountAsync(BuildQuery(request), request, orderBy);
        }

        public async Task<EmployeeDocument?> GetDocumentAsync(GetAllDocumentsQuery request)
        {
            return await GetItemAsync(BuildQuery(request));
        }
    }
}
