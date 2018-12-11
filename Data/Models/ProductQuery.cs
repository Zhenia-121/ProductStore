namespace ProductsStore.Data.Models
{
    public class ProductQuery : IQueryObject
    {
        public string Title { get; set; }
        public int Page { get ; set ; }
        public int PageSize { get ; set ; }
        public string SortBy { get; set; }
        public bool IsAscending  { get; set; }
    }
}
