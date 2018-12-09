using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProductsStore.Data.Models
{
    public class Category
    {
        [Required]
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<Product> Products { get; set; }

        public Category()
        {
            Products = new List<Product>();
        }

    }
}