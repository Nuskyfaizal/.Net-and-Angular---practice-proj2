using backend.DTO;
using backend.Models;

namespace backend.Core.Models
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery filter);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);
    }
}