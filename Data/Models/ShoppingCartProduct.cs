namespace ProductsStore.Data.Models
{
    public class ShoppingCartProduct
    {
        public int ShoppingCartId { get; set; }

        public int ProductId { get; set; }

        public Product Product { get; set; }

        public ShoppingCart Cart { get; set; }

        public int Quantity { get; set; }
    }
}