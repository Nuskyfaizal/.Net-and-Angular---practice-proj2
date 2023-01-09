using AutoMapper;
using backend.DTO;
using backend.Models;

namespace backend.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Domain to DTO resource
            CreateMap(typeof(QueryResult<>), typeof(QueryResultDto<>));
            CreateMap<Make, MakeDto>();
            CreateMap<Make, KeyValuePairDto>();
            CreateMap<Model, KeyValuePairDto>();
            CreateMap<Feature, KeyValuePairDto>();
            CreateMap<Vehicle, SaveVehicleDto>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));
            CreateMap<Vehicle, VehicleDto>()
            .ForMember(vr => vr.Make, opt => opt.MapFrom(v => v.Model.Make))
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => new KeyValuePairDto { Id = vf.Feature.Id, Name = vf.Feature.Name })));

            //DTO resource to Domain
            CreateMap<VehicleQueryDto, VehicleQuery>();
            CreateMap<SaveVehicleDto, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) =>
            {
                //Remove unselected features

                var removedFeatures = new List<VehicleFeature>();
                foreach (var f in v.Features)
                {
                    if (!vr.Features.Contains(f.FeatureId))
                        removedFeatures.Add(f);
                }

                foreach (var f in removedFeatures)
                {
                    v.Features.Remove(f);
                }
                // implementation using LINQ
                // var removedFeatures = v.Features.Where(f => !vr.Features.Contains(f.FeatureId));
                // foreach (var f in removedFeatures)
                // {
                //     v.Features.Remove(f);
                // }

                /*****/ //Add new features
                foreach (var id in vr.Features)
                    if (!v.Features.Any(f => f.FeatureId == id))
                        v.Features.Add(new VehicleFeature { FeatureId = id });


                // var addedFeatures = vr.Features.Where(id => !v.Features.Any(f => f.FeatureId == id)).Select(id => new VehicleFeature { FeatureId = id });

                // foreach (var f in addedFeatures)
                // {
                //     v.Features.Add(f);
                // }
            });

        }
    }
}