using System;
using ProductsStore.Data.Models;

namespace ProductsStore.Controllers.Dto
{
    public class OrderDto
    {
        public int Id { get; set; }
        public Contact Contact { get; set; }
        public DateTime OrderTime { get; set; }
        public ShoppingCartDto Cart { get; set; }

        // public ApplicationUser User { get; set; }

    }
}