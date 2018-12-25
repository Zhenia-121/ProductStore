namespace ProductsStore.Controllers.Dto
{
    public class CartItemDto
    {
        public int ProductId { get; set; }
        public decimal Price { get; set; }
        public string Title { get; set; }
        public int Quantity { get; set; }
        public string Url { get; set; }
    }
}