using AutoMapper;
using DocumentsFeature.Domain;

namespace DocumentsFeature.Application.DTO
{
    public class UploadDocumentMapper : Profile
    {
        public UploadDocumentMapper()
        {
            CreateMap<UploadDocumentDto, EmployeeDocument>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(_ => Guid.NewGuid().ToString()))
                .ForMember(dest => dest.CreatedOn, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.IsVerified, opt => opt.MapFrom(_ => false));
        }
    }

    public sealed class GetAllDocumentsMapper : Profile
    {
        public GetAllDocumentsMapper()
        {
            CreateMap<EmployeeDocument, GetAllDocumentsItem>()
                .ForMember(dest => dest.DocumentId, opt => opt.MapFrom(src => src.Id));
        }
    }
}
