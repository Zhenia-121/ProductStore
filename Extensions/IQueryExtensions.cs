using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using ProductsStore.Data.Models;

namespace ProductsStore.Extensions
{
    public static class IQueryExtensions
    {
        public static IQueryable<T> ApplySorting<T> (this IQueryable<T> query, Dictionary<string, Expression<Func<T, object>>> columnsMap, IQueryObject queryObj) {
            if (String.IsNullOrWhiteSpace(queryObj.SortBy) || !columnsMap.ContainsKey(queryObj.SortBy))
                return query;
            return queryObj.IsAscending ?
                    query.OrderBy(columnsMap[queryObj.SortBy]) :
                    query.OrderByDescending(columnsMap[queryObj.SortBy]);
        }
        public static IQueryable<T> ApplyPagination<T>(this IQueryable<T> query, IQueryObject queryObj) {
             if (queryObj.Page <1 )
                    queryObj.Page = 1;
             if (queryObj.PageSize <= 1)
                    queryObj.PageSize = 10;
             return query.Skip((queryObj.Page - 1) * queryObj.PageSize).Take(queryObj.PageSize);
        }
    }
}