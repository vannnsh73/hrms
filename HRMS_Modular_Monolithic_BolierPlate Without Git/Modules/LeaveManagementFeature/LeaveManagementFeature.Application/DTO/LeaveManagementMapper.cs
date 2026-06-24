using AutoMapper;
using LeaveManagementFeature.Domain;

namespace LeaveManagementFeature.Application.DTO
{
    public class CreateLeaveRequestMapper : Profile
    {
        public CreateLeaveRequestMapper()
        {
            CreateMap<CreateLeaveRequestDto, LeaveRequest>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(_ => Guid.NewGuid().ToString()))
                .ForMember(dest => dest.CreatedOn, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(_ => "Pending"));
        }
    }

    public sealed class GetAllLeaveRequestsMapper : Profile
    {
        public GetAllLeaveRequestsMapper()
        {
            CreateMap<LeaveRequest, GetAllLeaveRequestsItem>()
                .ForMember(dest => dest.LeaveRequestId, opt => opt.MapFrom(src => src.Id));
        }
    }

    public sealed class GetAllLeaveBalancesMapper : Profile
    {
        public GetAllLeaveBalancesMapper()
        {
            CreateMap<LeaveBalance, GetAllLeaveBalancesItem>()
                .ForMember(dest => dest.LeaveBalanceId, opt => opt.MapFrom(src => src.Id));
        }
    }
}
