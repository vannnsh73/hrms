using HRMS.Core.Postgres.Repositories;
using DocumentsFeature.Application.DTO;
using DocumentsFeature.Domain;

namespace DocumentsFeature.Application.Repository
{
    public interface IDocumentRepository : IPostgresRepository<EmployeeDocument>
    {
        Task<(IEnumerable<EmployeeDocument> result, int count)> GetAllDocumentsWithCountAsync(GetAllDocumentsQuery request);
        Task<EmployeeDocument?> GetDocumentAsync(GetAllDocumentsQuery request);
    }
}
