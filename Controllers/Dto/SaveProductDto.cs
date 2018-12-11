using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace ProductsStore.Controllers.Dto
{
    public class SaveProductDto
    {
        [Required]
        public string Title { get; set; }
        
        [Required]
        public decimal Price { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public string Url { get; set; }
    }
}