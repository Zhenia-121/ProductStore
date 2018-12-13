using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ProductsStore.Data.Models
{
    public class ApplicationUser: IdentityUser
    {
        #region Constructor
        public ApplicationUser()
        {
            Orders = new List<Order>();
        }
        #endregion

        #region Properties
        // [Required]
        // [Key]
        // public string Id { get; set; }
        // public int UserName { get; set; }

        // public string Email { get; set; }

        // public string PhoneNumber { get; set; }

        // public ICollection<Order> Orders { get; set; }
        
        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime LastModifiedDate { get; set; }

        public ICollection<Order> Orders { get; set; }

        #endregion    
    }
}