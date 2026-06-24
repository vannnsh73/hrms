using AutoMapper;
using AttendanceFeature.Domain;

namespace AttendanceFeature.Application.DTO
{
    public class CreateAttendanceMapper : Profile
    {
        public CreateAttendanceMapper()
        {
            CreateMap<CreateAttendanceDto, AttendanceRecord>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(_ => Guid.NewGuid().ToString()))
                .ForMember(dest => dest.CreatedOn, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(_ => "Present"));
        }
    }

    public class ClockOutMapper : Profile
    {
        public ClockOutMapper()
        {
            CreateMap<ClockOutDto, AttendanceRecord>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.AttendanceId))
                .ForMember(dest => dest.ModifiedOn, opt => opt.MapFrom(_ => DateTime.UtcNow));
        }
    }

    public sealed class GetAllAttendanceMapper : Profile
    {
        public GetAllAttendanceMapper()
        {
            CreateMap<AttendanceRecord, GetAllAttendanceItem>()
                .ForMember(dest => dest.AttendanceId, opt => opt.MapFrom(src => src.Id));
        }
    }
}
