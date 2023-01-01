using System.Collections.ObjectModel;
using backend.Models;

namespace backend.DTO
{
    public class VehicleDto
    {
        public int Id { get; set; }
        public KeyValuePairDto Model { get; set; }
        public bool IsRegistered { get; set; }
        public KeyValuePairDto Make { get; set; }

        public ContactResource Contact { get; set; }

        public DateTime LastUpdate { get; set; }
        public ICollection<KeyValuePairDto> Features { get; set; }

        public VehicleDto()
        {
            Features = new Collection<KeyValuePairDto>();
        }

    }
}