using System.ComponentModel.DataAnnotations;
using ProductsStore.Data.Models;

namespace ProductsStore.Controllers.Dto
{
    public class SaveOrderDto
    {
        [Required]
        public Contact Contact { get; set; }
        
        [Required]
        public int ShoppingCartId { get; set; }

        [Required]
        public string UserId { get; set; }
    }
}