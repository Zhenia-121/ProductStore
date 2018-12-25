using System.Collections.Generic;

namespace ProductsStore.Controllers.Dto
{
    public class ShoppingCartDto
    {
        public int Id { get; set; }

        public List<CartItemDto> Products { get; set; }
    }
}