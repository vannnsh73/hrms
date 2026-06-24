using AutoMapper;
using ExpensesFeature.Domain;
using System.Linq;

namespace ExpensesFeature.Application.DTO
{
    public class CreateExpenseClaimMapper : Profile
    {
        public CreateExpenseClaimMapper()
        {
            CreateMap<ExpenseItemDto, ExpenseItem>();

            CreateMap<CreateExpenseClaimDto, ExpenseClaim>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(_ => Guid.NewGuid().ToString()))
                .ForMember(dest => dest.CreatedOn, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(_ => "Draft"))
                .ForMember(dest => dest.TotalAmount, opt => opt.MapFrom(src => src.Items != null ? src.Items.Sum(i => i.Amount) : 0));
        }
    }

    public sealed class GetAllExpenseClaimsMapper : Profile
    {
        public GetAllExpenseClaimsMapper()
        {
            CreateMap<ExpenseClaim, GetAllExpenseClaimsItem>()
                .ForMember(dest => dest.ExpenseClaimId, opt => opt.MapFrom(src => src.Id));
        }
    }
}
