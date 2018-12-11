using System.Collections.Generic;

namespace ProductsStore.Data.Models
{
    public interface IQueryObject
    {
        int Page { get; set; }

        int PageSize { get; set; }

        string SortBy { get; set; }

        bool IsAscending  { get; set; }
    }
}