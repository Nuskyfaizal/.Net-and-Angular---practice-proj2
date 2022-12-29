using AutoMapper;
using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class MakesController : Controller
    {
        private readonly DataContext _context;
        private readonly IMapper mapper;
        public MakesController(DataContext context, IMapper mapper)
        {
            this.mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<MakeDto>> GetMakes()
        {
            var makes = await _context.Makes.Include(m => m.Models).ToListAsync();

            return mapper.Map<List<Make>, List<MakeDto>>(makes);
        }
    }
}