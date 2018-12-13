using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProductsStore.Data.Models
{
    public class Order
    {
        [Required]
        [Key]
        public int Id { get; set; }
        public Contact Contact { get; set; }

        // public ICollection<OrdersProducts> Products { get; set; }
        public int ShoppingCartId { get; set; }
        public ShoppingCart Cart { get; set; }

        public int ApplicationUserId { get; set; }
        public ApplicationUser User { get; set; }

    }
}