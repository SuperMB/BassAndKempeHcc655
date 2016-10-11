using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using HccCoffeeMaker.Data;

namespace HccCoffeeMaker.Migrations
{
    [DbContext(typeof(MyDatabaseContext))]
    [Migration("20161011024134_Newest")]
    partial class Newest
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("HccCoffeeMaker.Models.CoffeeMakerModels.AmazonProductModel", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Brand");

                    b.Property<string>("BrewingTime");

                    b.Property<string>("Color");

                    b.Property<string>("Description");

                    b.Property<string>("Durability");

                    b.Property<string>("ImageLocation");

                    b.Property<double>("OverallRating");

                    b.Property<double>("Price");

                    b.Property<string>("QualityOfCoffee");

                    b.Property<string>("ServingSize");

                    b.Property<string>("Title");

                    b.Property<string>("Url");

                    b.Property<string>("Warranty");

                    b.HasKey("ID");

                    b.ToTable("AmazonProductModels");
                });

            modelBuilder.Entity("HccCoffeeMaker.Models.CoffeeMakerModels.ReviewModel", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AmazonProductModelID");

                    b.Property<string>("Description");

                    b.Property<double>("Rating");

                    b.Property<string>("Title");

                    b.HasKey("ID");

                    b.HasIndex("AmazonProductModelID");

                    b.ToTable("ReviewModels");
                });

            modelBuilder.Entity("HccCoffeeMaker.Models.MyModels.TestModel", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CatName");

                    b.Property<int>("Height");

                    b.HasKey("ID");

                    b.ToTable("TestModels");
                });

            modelBuilder.Entity("HccCoffeeMaker.Models.CoffeeMakerModels.ReviewModel", b =>
                {
                    b.HasOne("HccCoffeeMaker.Models.CoffeeMakerModels.AmazonProductModel")
                        .WithMany("Reviews")
                        .HasForeignKey("AmazonProductModelID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
