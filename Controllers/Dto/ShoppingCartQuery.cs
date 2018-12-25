using System.ComponentModel.DataAnnotations;

namespace ProductsStore.Controllers.Dto
{
    public class ShoppingCartQuery
    {
        [Required]
        public int CartId { get; set; }
        public int? ProductId { get; set; }
        public ShoppingCartActions Action { get; set; }

        public override string ToString() {
            return string.Join('&', nameof(CartId) + CartId, nameof(ProductId) + ProductId, nameof(Action) +  Action);
        }
    }
}