using System.ComponentModel.DataAnnotations;

namespace ProductsStore.Controllers.Dto
{
    public class CategoryDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}