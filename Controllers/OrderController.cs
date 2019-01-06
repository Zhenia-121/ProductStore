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
    [ApiController]
    public class OrderController: BaseApiController
    {
        public OrderController(AppDbContext context,
            IMapper mapper): base(context, null, null, mapper, null)
        {
        
        }
        [HttpPost]
        public async Task<ActionResult> CreateOrder([FromBody] SaveOrderDto saveOrder)
        {
            if (!ModelState.IsValid)
                return NotFound();

            var newOrder = _mapper.Map<SaveOrderDto, Order>(saveOrder);
            newOrder.OrderTime = DateTime.Now;
            var result = await _context.Orders.AddAsync(newOrder);

            if (result.State != EntityState.Added)
                return  StatusCode(500);
            
            await _context.SaveChangesAsync();
            
            await _context.Entry(newOrder).Reference(o => o.Cart).LoadAsync();
            await _context.Entry(newOrder.Cart).Collection(c => c.Products).LoadAsync();
            foreach (var product in newOrder.Cart.Products)
                await _context.Entry(product).Reference(p => p.Product).LoadAsync();
            

            return Ok(_mapper.Map<Order, OrderDto>(newOrder));

        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders() {
            var orders = await _context.Orders.ToListAsync();
            var ordersDto = _mapper.Map<List<Order>, List<OrderDto>>(orders);

            return Ok(ordersDto);

        }
        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrderByUserId([FromQuery] OrderQuery queryObject) {
            if (string.IsNullOrWhiteSpace(queryObject.UserId))
                return BadRequest();
            var orders = await _context.Orders
                .Where(o => o.UserId == queryObject.UserId)
                .Include(o => o.Cart)
                    .ThenInclude(c => c.Products)
                        .ThenInclude(p => p.Product)
                .ToListAsync();
            var ordersDto = _mapper.Map<List<Order>, List<OrderDto>>(orders);

            return Ok(ordersDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetOrder(int id) {
            var order = await _context.Orders
                .Include(o => o.Cart)
                    .ThenInclude(c => c.Products)
                        .ThenInclude(p => p.Product)
                .SingleOrDefaultAsync(o => o.Id == id);
            if (order == null)
                return  NotFound();
            var orderDto = _mapper.Map<Order, OrderDto>(order);

            return Ok(orderDto);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<int>> DeleteOrder(int id) {
            var deleteOrder = await _context.Orders.FindAsync(id);
            if (deleteOrder == null)
                return NotFound();

            var deleteResult = _context.Orders.Remove(deleteOrder);
            if (deleteResult.State != EntityState.Deleted)
                return StatusCode(500);

            await _context.SaveChangesAsync();

            return Ok(deleteOrder.Id);
        }
        

    }
}