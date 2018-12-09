using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ProductsStore.Data.ConfigurationOptions;
using ProductsStore.Data.Models;
using ProductsStore.Data.Persistense;

namespace ProductsStore.Controllers
{
    [Route("api/[controller]")]
    public class BaseApiController: Controller
    {
        protected readonly UserManager<ApplicationUser> _userManager;
        protected readonly RoleManager<IdentityRole> _roleManager;
        protected readonly IOptions<JwtOptions> _options;
        protected readonly AppDbContext _context;
        public BaseApiController(AppDbContext context, 
            UserManager<ApplicationUser> userManager, 
            RoleManager<IdentityRole> roleManager, 
            IOptions<JwtOptions> options)
        {
            _context = context;
            this._userManager = userManager;
            this._roleManager = roleManager;
            this._options = options;
        }
    }
}