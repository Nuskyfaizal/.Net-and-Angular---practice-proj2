using AutoMapper;
using backend.DTO;
using backend.Models;

namespace backend.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Make, MakeDto>();
            CreateMap<Model, ModelDto>();
            CreateMap<Feature, FeatureDto>();
            CreateMap<Make, FeatureDto>();
            CreateMap<Model, FeatureDto>();
        }
    }
}