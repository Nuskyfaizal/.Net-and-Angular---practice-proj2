using backend.Extensions;

namespace backend.Models
{
    public class VehicleQuery : IQueryObjects
    {
        public int? MakeId { get; set; }
        public int? ModelId { get; set; }
        public string SortBy { get; set; }
        public bool IsSortAscending { get; set; }

    }
}