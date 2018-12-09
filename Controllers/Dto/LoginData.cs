using System.ComponentModel.DataAnnotations;

namespace ProductsStore.Controllers.Dto
{
    public class LoginData
    {
        [Required]
        public string grant_type { get; set; }
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }
        public string client_id { get; set; }
    }
}