using ConsoleApp44.Models;
using Microsoft.EntityFrameworkCore;

namespace ConsoleApp44 {
    public class AppDbContext : DbContext {
        public DbSet<Product> Products { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseSqlServer("Server=DELL-UMMAN\\SQLEXPRESS;Database=WebApp1;Trusted_Connection=True;Trust Server Certificate=True");
        }
    }
}
