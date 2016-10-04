using HccCoffeeMaker.Models.CoffeeMakerModels;
using HccCoffeeMaker.Models.MyModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HccCoffeeMaker.Data
{
    public class MyDatabaseContext : DbContext
    {
        public MyDatabaseContext(DbContextOptions<MyDatabaseContext> options)
            :base(options)
        {

        }

        public DbSet<TestModel> TestModels { get; set; }
        public DbSet<ReviewModel> ReviewModels { get; set; }
        public DbSet<AmazonProductModel> AmazonProductModels { get; set; }

        /*
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AmazonProductModel>()
                .HasMany(a => a.Reviews).WithOne(b => b.AmazonProductModelID)
                    .
        }
        */
    }
}
