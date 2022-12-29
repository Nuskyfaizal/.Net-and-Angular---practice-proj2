using System.Collections.ObjectModel;

namespace backend.DTO
{
    public class MakeDto
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public ICollection<ModelDto> Models { get; set; }

        public MakeDto()
        {
            Models = new Collection<ModelDto>();
        }
    }
}