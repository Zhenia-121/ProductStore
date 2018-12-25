using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using ProductsStore.Data.ConfigurationOptions;
using ProductsStore.Data.Models;

namespace ProductsStore.Data.Persistense
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {

        // public DbSet<Order> Orders { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<ShoppingCart> ShoppingCarts { get; set; }

        public DbSet<ShoppingCartProduct> ShoppingCartsProducts { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);

            builder.Entity<Order>().ToTable("Orders");
            builder.Entity<Order>().OwnsOne(o => o.Contact);
            builder.Entity<Order>().HasOne(o => o.User).WithMany(u => u.Orders).HasForeignKey(o => o.UserId);
            // builder.Entity<Order>().HasOne(o => o.Cart)

            builder.Entity<Product>().ToTable("Products");
            builder.Entity<Product>().HasMany(p => p.ShoppingCarts).WithOne(op => op.Product);
            builder.Entity<Product>().HasOne(p => p.Category).WithMany(c => c.Products);

            builder.Entity<ShoppingCartProduct>().ToTable(nameof(ShoppingCartsProducts));
            builder.Entity<ShoppingCartProduct>().HasKey(scp => new { scp.ProductId, scp.ShoppingCartId });
            builder.Entity<ShoppingCartProduct>().HasOne(scp => scp.Product).WithMany(p => p.ShoppingCarts).HasForeignKey(scp => scp.ProductId);
            builder.Entity<ShoppingCartProduct>().HasOne(scp => scp.Cart).WithMany(sc => sc.Products).HasForeignKey(scp => scp.ShoppingCartId);

            builder.Entity<Category>().ToTable("Categories");

        }
        public static async Task AddAdminRoleandUsers(IServiceProvider serviceProvider,
        IOptions<InitialConfigurationData> options)
        {

            UserManager<ApplicationUser> userManager =
            serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            RoleManager<IdentityRole> roleManager =
            serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            InitialConfigurationData data = options.Value;
            Console.WriteLine($"Role count -> {data.Roles.Length}");
            Console.WriteLine($"User count -> {data.Users.Length}");

            foreach (var role in data.Roles)
            {
                if (await roleManager.FindByNameAsync(role) == null)
                    await roleManager.CreateAsync(new IdentityRole(role));
            }
            foreach (var user in data.Users)
            {
                System.Console.WriteLine(user.Name + "will be searched in DB");
                if (await userManager.FindByNameAsync(user.Name) == null)
                {
                    System.Console.WriteLine(user.Name + "will be created");
                    foreach (var role in user.Roles)
                    {
                        if (await roleManager.FindByNameAsync(role) == null)
                            await roleManager.CreateAsync(new IdentityRole(role));
                    }

                    ApplicationUser newUser = new ApplicationUser
                    {
                        UserName = user.Name,
                        Email = user.Email
                    };
                    IdentityResult result = await userManager.CreateAsync(newUser, user.Password);
                    if (result.Succeeded)
                    {
                        System.Console.WriteLine("user was successfully created");
                        foreach (var role in user.Roles)
                        {
                            System.Console.WriteLine("Adding new role");
                            await userManager.AddToRoleAsync(newUser, role);
                        }
                    }
                }
            }
        }
    }
}