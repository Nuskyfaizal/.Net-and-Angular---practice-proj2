using AutoMapper;
using backend.Core;
using backend.Core.Models;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace backend.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IWebHostEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly PhotoSettings photoSettings;

        public PhotosController(IWebHostEnvironment host, IVehicleRepository repository, IUnitOfWork unitOfWork, IMapper mapper, IOptionsSnapshot<PhotoSettings> options)
        {
            this.photoSettings = options.Value;
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.host = host;
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await repository.GetVehicle(vehicleId, includeRelated: false);

            /**validations for uploading files*/
            if (vehicle == null)
                return NotFound();
            if (file == null)
                return BadRequest("Null File");
            if (file.Length == 0)
                return BadRequest("Empty file");
            if (file.Length > photoSettings.MaxBytes)
                return BadRequest("Max File Size Exceeded");
            if (!photoSettings.IsSupported(file.FileName))
                return BadRequest("Invalid File Type.");


            var uploadsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            //generate a new file name
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var photo = new Photo { FileName = fileName };
            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            return Ok(mapper.Map<Photo, PhotoDTO>(photo));
        }
    }
}