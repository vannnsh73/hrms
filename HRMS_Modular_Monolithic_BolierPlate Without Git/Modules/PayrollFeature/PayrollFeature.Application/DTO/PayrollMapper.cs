using AutoMapper;
using PayrollFeature.Domain;
using System.Linq;

namespace PayrollFeature.Application.DTO
{
    public class CreatePayrollRecordMapper : Profile
    {
        public CreatePayrollRecordMapper()
        {
            CreateMap<CreatePayrollRecordDto, PayrollRecord>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(_ => Guid.NewGuid().ToString()))
                .ForMember(dest => dest.CreatedOn, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(_ => "Draft"))
                .ForMember(dest => dest.GrossPay, opt => opt.MapFrom(src => src.Earnings != null ? src.Earnings.Values.Sum() : 0))
                .ForMember(dest => dest.TotalDeductions, opt => opt.MapFrom(src => src.Deductions != null ? src.Deductions.Values.Sum() : 0))
                .ForMember(dest => dest.NetPay, opt => opt.MapFrom(src => 
                    (src.Earnings != null ? src.Earnings.Values.Sum() : 0) - (src.Deductions != null ? src.Deductions.Values.Sum() : 0)));
        }
    }

    public sealed class GetAllPayrollRecordsMapper : Profile
    {
        public GetAllPayrollRecordsMapper()
        {
            CreateMap<PayrollRecord, GetAllPayrollRecordsItem>()
                .ForMember(dest => dest.PayrollRecordId, opt => opt.MapFrom(src => src.Id));
        }
    }
}
