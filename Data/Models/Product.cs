using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProductsStore.Data.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public decimal Price { get; set; }

        public string Url { get; set; }

        public int CategoryId { get; set; }

        public Category Category { get; set; }

        public ICollection<ShoppingCartProduct> ShoppingCarts { get; set; }

        public Product()
        {
            ShoppingCarts = new List<ShoppingCartProduct>();
        }
    }
}