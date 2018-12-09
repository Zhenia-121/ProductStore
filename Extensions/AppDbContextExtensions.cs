using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using ProductsStore.Data.ConfigurationOptions;
using ProductsStore.Data.Models;
using ProductsStore.Data.Persistense;

namespace ProductsStore.Extensions
{
    public static class AppDbContextExtensions
    {
        public static async Task AddAdminRoleandUsers(this AppDbContext context, IServiceProvider serviceProvider, 
        IOptions<InitialConfigurationData> options) {
            UserManager<ApplicationUser> userManager = 
            serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            RoleManager<IdentityRole> roleManager =
            serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            InitialConfigurationData data = options.Value;

            foreach (var role in data.Roles) 
                if (await roleManager.FindByNameAsync(role) == null)
                    await roleManager.CreateAsync(new IdentityRole(role));
            foreach (var user in data.Users){
                if (await userManager.FindByNameAsync(user.Name) == null) {
                    foreach (var role in user.Roles) 
                        if (await roleManager.FindByNameAsync(role) == null)
                            await roleManager.CreateAsync(new IdentityRole(role));
                    
                    ApplicationUser newUser = new ApplicationUser {
                        UserName = user.Name,
                        Email = user.Email
                    };
                    IdentityResult result = await userManager.CreateAsync(newUser, user.Password);
                    if (result.Succeeded) {
                        foreach (var role in user.Roles)
                        {
                            await userManager.AddToRoleAsync(newUser, role);
                        }
                    }
                }
            }

        }
    }
}