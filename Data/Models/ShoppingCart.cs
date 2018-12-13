using System.Collections.Generic;

namespace ProductsStore.Data.Models
{
    public class ShoppingCart
    {
        public int Id { get; set; }

        public int? OrderId { get; set; }

        public ICollection<ShoppingCartProduct> Products { get; set; }

        public ShoppingCart()
        {
            Products = new List<ShoppingCartProduct>();
        }
    }
}