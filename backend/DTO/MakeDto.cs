using System.Collections.ObjectModel;

namespace backend.DTO
{
    public class MakeDto : KeyValuePairDto
    {
        public ICollection<KeyValuePairDto> Models { get; set; }

        public MakeDto()
        {
            Models = new Collection<KeyValuePairDto>();
        }
    }
}