using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Proj.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Category { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int OriginalPrice { get; set; }

        public int FinalPrice { get; set; }

        public int Discount { get; set; }

        public int Ratings { get; set; }

        public string ImageLink {  get; set; }
        public int AmountSaved { get; set; }

    }
    public class Cart
    {
        public int id { get; set; }
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class User
    {
        public int UserID { get; set; }
        public int CartId { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }

    public class ProjectDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Carts { get; set; }

        public DbSet<User> Users { get; set; }

        public ProjectDbContext(DbContextOptions<ProjectDbContext> options) : base(options)
        {

        }
    }
}
