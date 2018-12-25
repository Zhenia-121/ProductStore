using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ProductsStore.Controllers.Dto;
using ProductsStore.Data.ConfigurationOptions;
using ProductsStore.Data.Models;
using ProductsStore.Data.Persistense;

namespace ProductsStore.Controllers
{
    [Route("api/[controller]")]
    //[ApiController]
    public class ShoppingCartController : BaseApiController
    {
        public ShoppingCartController(
            AppDbContext context,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IMapper mapper,
            IOptions<JwtOptions> options) : base(context, userManager, roleManager, mapper, options)
        {
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateCart([FromQuery] int productId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = await _context.Products.FindAsync(productId);
            if (product == null) {
                ModelState.AddModelError("Find product error", $"Product with id {productId} wasn't find");
                return BadRequest(ModelState);
            }
                

            var newCart = new ShoppingCart() {
                DateCreated = DateTime.Now
            };

            newCart.Products.Add(new ShoppingCartProduct() {
                        Product = product,
                        // ProductId = productId,
                        Quantity = 1
            });

            var createResult = await _context.ShoppingCarts.AddAsync(newCart);
            if (createResult.State != EntityState.Added)
            {
                // ModelState.AddModelError("Shopping Cart Creating Error", "Creating new Shoppig Cart failed");
                // return BadRequest
                return new StatusCodeResult(500);
            }

            await _context.SaveChangesAsync();

            return Ok(newCart.Id);

        }
        [HttpPut]
        public async Task<ActionResult<ShoppingCartDto>> UpdateCart([FromQuery] ShoppingCartQuery queryObj)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if ((queryObj.Action == ShoppingCartActions.Add || queryObj.Action == ShoppingCartActions.Delete) && !queryObj.ProductId.HasValue)
                return BadRequest("The product Id wasn't specify" + queryObj.ToString());

            var shoppingCart = await _context.ShoppingCarts
                .Include(sc => sc.Products)
                .SingleOrDefaultAsync(sc => sc.Id == queryObj.CartId);
            if (shoppingCart == null)
                return StatusCode(500);


            switch (queryObj.Action)
            {
                //очистка корзины
                case ShoppingCartActions.Clear:
                    //var cartItems = _context.Entry(shoppingCart).Collection(sc => sc.Products).Query().ToList();
                    var cartItems = shoppingCart.Products;
                    _context.ShoppingCartsProducts.RemoveRange(cartItems);
                    break;
                //если пользователь добавляет продукт или увеличивает его количество
                case ShoppingCartActions.Add:
                    if (shoppingCart.Products.Any(p => p.ProductId == queryObj.ProductId))
                    {
                        var cartItem = shoppingCart.Products.SingleOrDefault(p => p.ProductId == queryObj.ProductId);
                        cartItem.Quantity += 1;
                    }
                    else
                    {
                        var product = await _context.Products.FindAsync(queryObj.ProductId.Value);
                        if (product == null)
                            return BadRequest($"Product with id {queryObj.ProductId.Value} doesn't exist");
                        shoppingCart.Products.Add(new ShoppingCartProduct()
                        {
                            Product = product,
                            Quantity = 1
                        });
                    }
                    break;
                //если пользователь убирает продукт из корзины или уменьшает ео количество
                case ShoppingCartActions.Delete:
                    if (shoppingCart.Products.Any(p => p.ProductId == queryObj.ProductId))
                    {
                        var cartItem = shoppingCart.Products.SingleOrDefault(p => p.ProductId == queryObj.ProductId);
                        if (cartItem.Quantity > 1)
                            cartItem.Quantity -= 1;
                        else
                            shoppingCart.Products.Remove(cartItem);
                    }
                    else 
                        return BadRequest($"Product with id {queryObj.ProductId.Value} doesn't exist in shoppingCart");
                    break;
                default: return BadRequest("Wrong productId was sent. Available values are clear, add, delete");
            }

            //загружаем соответствующие продукты и возвращаем корзину с продуктами(хотя можно возвращать пока без всех продуктов)


            // 1) shoppingCart = await _context.ShoppingCarts
            //     .Include(sc => sc.Products)
            //         .ThenInclude(p => p.Product)
            //     .SingleOrDefaultAsync(sc => sc.Id == queryObj.CartId);


            // 2 если будем возвращать количество
            // var count = await _context.Entry(shoppingCart).Collection(sc => sc.Products).Query().CountAsync(); Query().Include(p => p.Product);


            await _context.Products.Where(p => shoppingCart.Products.Select(scp => scp.ProductId).Contains(p.Id)).LoadAsync();


            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<ShoppingCartDto>(shoppingCart));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ShoppingCartDto>> GetCart(int id)
        {
            var shoppingCart = await _context.ShoppingCarts
                .Include(sc => sc.Products)
                    .ThenInclude(p => p.Product)
                .SingleOrDefaultAsync(sc => sc.Id == id);

            if (shoppingCart == null)
                return NotFound();
            return Ok(_mapper.Map<ShoppingCartDto>(shoppingCart));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<int>> DeleteCart(int id) {
            
            var cartForDelete = await _context.ShoppingCarts.FindAsync(id);

            if (cartForDelete == null) {
                return NotFound();
            }

            var result = _context.ShoppingCarts.Remove(cartForDelete);
            if (result.State != EntityState.Deleted)
                return StatusCode(500);

            return Ok(cartForDelete.Id);
        }

    }
}