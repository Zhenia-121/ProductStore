using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductsStore.Data.Models
{
    public class Order
    {
        [Required]
        [Key]
        public int Id { get; set; }
        public Contact Contact { get; set; }

        // public ICollection<OrdersProducts> Products { get; set; }
        [ForeignKey("Cart")]
        public int ShoppingCartId { get; set; }
        public ShoppingCart Cart { get; set; }
        public DateTime OrderTime { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

    }
}