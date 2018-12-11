using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

public class ProductDto
    {
        public int Id { get; set; }
        [Required]
        [JsonProperty(PropertyName="title")]
        public string Title { get; set; }
        
        [Required]
        [JsonProperty(PropertyName="price")]
        public decimal Price { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public string Url { get; set; }
    }