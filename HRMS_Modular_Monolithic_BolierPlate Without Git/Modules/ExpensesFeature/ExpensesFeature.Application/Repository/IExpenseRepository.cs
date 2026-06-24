using HRMS.Core.Postgres.Repositories;
using ExpensesFeature.Application.DTO;
using ExpensesFeature.Domain;

namespace ExpensesFeature.Application.Repository
{
    public interface IExpenseRepository : IPostgresRepository<ExpenseClaim>
    {
        Task<(IEnumerable<ExpenseClaim> result, int count)> GetAllExpenseClaimsWithCountAsync(GetAllExpenseClaimsQuery request);
        Task<ExpenseClaim?> GetExpenseClaimAsync(GetAllExpenseClaimsQuery request);
    }
}
