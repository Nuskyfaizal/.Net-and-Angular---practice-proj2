using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.DTO
{
    public class VehicleDto
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public bool IsRegistered { get; set; }

        [Required]
        public ContactResource Contact { get; set; }
        public ICollection<int> Features { get; set; }

        public VehicleDto()
        {
            Features = new Collection<int>();
        }

    }
}