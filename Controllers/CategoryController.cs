using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ProductsStore.Data.ConfigurationOptions;
using ProductsStore.Data.Models;
using ProductsStore.Data.Persistense;

namespace ProductsStore.Controllers
{
    [Route("api/[controller]")]
    public class CategoryController: BaseApiController
    {

        public CategoryController(AppDbContext context, 
            UserManager<ApplicationUser> userManager, 
            RoleManager<IdentityRole> roleManager, 
            IMapper mapper,
            IOptions<JwtOptions> options) : base(context, userManager, roleManager, mapper, options)
        {
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories() {
            
            var result = await _context.Categories.Select( c => new { Id = c.Id, Name = c.Name}).ToListAsync();
            return Ok(result);
        }
    }
}