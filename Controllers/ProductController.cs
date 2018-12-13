using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using ProductsStore.Data.ConfigurationOptions;
using ProductsStore.Data.Models;
using ProductsStore.Data.Persistense;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ProductsStore.Controllers.Dto;
using System.Collections.Generic;
using AutoMapper;
using System.Text;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System;
using ProductsStore.Extensions;

namespace ProductsStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : BaseApiController
    {
        public ProductController(
            AppDbContext context,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IMapper mapper,
            IOptions<JwtOptions> options) : base(context, userManager, roleManager, mapper, options)
        {
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] SaveProductDto product)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState + product.ToString());

            var newProduct = _mapper.Map<Product>(product);
            var result = await _context.Products.AddAsync(newProduct);

            if (result.State != EntityState.Added)
            {
                ModelState.AddModelError("Error", "Product cretaing was failed");
                return BadRequest(ModelState);
            }
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProduct), new { id = newProduct.Id }, newProduct);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProductDto>> UpdateProduct(int id, [FromBody] SaveProductDto updateProduct)
        {
            if (!ModelState.IsValid)
            {
                // ValidationProblem();
                using (var reader = new StreamReader(Request.Body))
                {
                    var body = reader.ReadToEnd();
                    ModelState.AddModelError("Invalid Object", body);
                    // Do something
                }
                return BadRequest(ModelState);
            }

            var productForUpdate = await _context.Products.FindAsync(id);
            if (productForUpdate == null)
                return NotFound();

            _mapper.Map<SaveProductDto, Product>(updateProduct, productForUpdate);

            var updateResult = _context.Products.Update(productForUpdate);

            if (updateResult.State != EntityState.Modified)
                return new StatusCodeResult(500);

            await _context.SaveChangesAsync();
            return Ok(_mapper.Map<ProductDto>(productForUpdate));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {

            var product = await _context.Products.Include(p => p.Category).SingleOrDefaultAsync(p => p.Id == id);
            if (product == null)
                return NotFound();

            return Ok(_mapper.Map<ProductDto>(product));

        }
        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] ProductQueryDto queryObj)
        {

            
            var queryObject =  _mapper.Map<ProductQuery>(queryObj);

            var query = _context.Products.Include(p => p.Category).AsQueryable();

            // filtering by title
            if (!String.IsNullOrWhiteSpace(queryObj.Title))
                query = query.Where(p => p.Title == queryObj.Title);
            
            //filter by category
            if (!String.IsNullOrWhiteSpace(queryObj.Category))
                query = query.Where(p => p.Category.Name == queryObj.Category);
            
            var columnsMap = new Dictionary<string, Expression<Func<Product, object>>>() {
                ["Title"] = p => p.Title,
                ["Price"] = p => p.Price
            };
            // sorting
            query = query.ApplySorting(columnsMap, queryObject);
            // pagination
            query = query.ApplyPagination(queryObject);

            var products = await query.ToListAsync();
            if (products == null)
                return NotFound();
            return Ok(_mapper.Map<List<ProductDto>>(products));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var productForDelete = await _context.Products.FindAsync(id);
            if (productForDelete == null)
                return NotFound();

            _context.Products.Remove(productForDelete);
            await _context.SaveChangesAsync();

            return Ok(productForDelete.Id);
        }

    }
}