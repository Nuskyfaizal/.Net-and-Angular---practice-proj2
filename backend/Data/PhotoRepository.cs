using backend.Core;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly DataContext context;
        public PhotoRepository(DataContext context)
        {
            this.context = context;
        }
        public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId)
        {
            return await context.Photos.Where(p => p.VehicleId == vehicleId)
                                        .ToListAsync();
        }
    }
}