using HccCoffeeMaker.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HccCoffeeMaker.Models.CoffeeMakerModels
{
    public class AmazonProductModel
    {
        public AmazonProductModel()
        {

        }

        public AmazonProductModel(
            JObject jsonObject,
            string color,
            string durability,
            string servingSize,
            string brewingTime,
            string brand,
            string warranty,
            string qualityOfCoffee,
            bool userAdded = false,
            string typeOfMachine = "Automatic"
            )
        {
            Reviews = new List<ReviewModel>();
            Title = jsonObject["title"].ToString();
            Description = jsonObject["description"].ToString();
            Url = jsonObject["location"].ToString();
            Price = Convert.ToDouble(jsonObject["price"].ToString().Remove(0,1));
            OverallRating = Convert.ToDouble(jsonObject["overall_rating"].ToString().Remove(3));
            ImageLocation = jsonObject["main_images"][0]["location"].ToString();

            foreach(var review in jsonObject["reviews"])
                Reviews.Add(new ReviewModel(review));

            Color = color;
            Durability = durability;
            ServingSize = servingSize;
            BrewingTime = brewingTime;
            Brand = brand;
            Warranty = warranty;
            QualityOfCoffee = qualityOfCoffee;
            UserAdded = userAdded;
            TypeOfMachine = typeOfMachine;

        }

        public enum PriceOptions
        {
            Price0To50,
            Price50To100,
            Price100To200,
            Price200To500
        }
        public static string PriceOptionsString(PriceOptions priceOption)
        {
            switch(priceOption)
            {
                case PriceOptions.Price0To50:
                    return "0 → 50";
                case PriceOptions.Price50To100:
                    return "50 → 100";
                case PriceOptions.Price100To200:
                    return "100 → 200";
                case PriceOptions.Price200To500:
                    return "200 → 500";
            }
            return "Invalid Price Given";
        }
        public static PriceOptions StringToPriceOption(string message)
        {
            foreach (PriceOptions priceOption in Enum.GetValues(typeof(PriceOptions)))
                if (priceOption.ToString() == message)
                    return priceOption;

            return PriceOptions.Price0To50;
        }
        private static IQueryable<AmazonProductModel> QueryPrice(IQueryable<AmazonProductModel> query, PriceOptions priceOption)
        {
            switch(priceOption)
            {
                case PriceOptions.Price0To50:
                    return query.Where(s => s.Price >= 0 && s.Price <= 50);
                case PriceOptions.Price50To100:
                    return query.Where(s => s.Price >= 50 && s.Price <= 100);
                case PriceOptions.Price100To200:
                    return query.Where(s => s.Price >= 100 && s.Price <= 200);
                case PriceOptions.Price200To500:
                    return query.Where(s => s.Price >= 200 && s.Price <= 500);
            }

            return query;
        } 
        public enum ColorOptions
        {
            Green,
            Black,
            Blue,
            Red,
            Grey,
            Yellow
        }
        private static IQueryable<AmazonProductModel> QueryColor(IQueryable<AmazonProductModel> query, ColorOptions colorOption)
        {
            return query;
            //return query.Where(s => s.Color == colorOption.ToString());
        }

        public enum ServingSizeOptions //TODO
        {
            Small,
            Medium,
            Large
        }

        public enum DurabilityOptions //TODO
        {
            Fragile,
            Stout,
            Strong,
            Durable,
            Invincible
        }

        public enum BrewingTimeOptions //TODO
        {
            Time0To2Minutes,
            Time2To5Minutes,
            Time5To10Minutes,
            Time10To30Minutes
        }
        public static string BrewingTimeOptionsString(BrewingTimeOptions priceOption) //TODO
        {
            switch (priceOption)
            {
                case BrewingTimeOptions.Time0To2Minutes:
                    return "0 → 2 Minutes";
                case BrewingTimeOptions.Time2To5Minutes:
                    return "2 → 5 Minutes";
                case BrewingTimeOptions.Time5To10Minutes:
                    return "5 → 10 Minutes";
                case BrewingTimeOptions.Time10To30Minutes:
                    return "10 → 30 Minutes";
            }
            return "Invalid Brewing Time Given";
        }

        public enum BrandOptions //TODO
        {
            Kuerig,
            Folders,
            AReallyExpensiveBrand,
            TheMostExpensiveBrand
        }

        public enum WarrantyOptions //TODO
        {
            CoversNothing,
            CoversSomethings,
            CoversEverything
        }

        public enum QualityOfCoffeeOptions
        {
            ReallyBad,
            Okay,
            PrettyGood,
            ReallyReallyGood,
            Amazing,
        }


        public static async Task<ICollection<AmazonProductModel>> GetUserAddedCurations(MyDatabaseContext context)
        {
            var amazonProductModels = from a in context.AmazonProductModels
                                      select a;
            amazonProductModels = amazonProductModels.Where(s => s.UserAdded == true);

            amazonProductModels = amazonProductModels
                .Include(s => s.Reviews);

            var list = await amazonProductModels.ToListAsync();
            return list;
        }
        public static async Task<ICollection<AmazonProductModel>> Query(
            MyDatabaseContext context,
            ICollection<PriceOptions> priceOptions = null, 
            ICollection<ColorOptions> colorOptions = null
            )
        {
            bool pricesAvailable = true;
            if (priceOptions == null)
                pricesAvailable = false;
            else if (priceOptions.Count == 0)
                pricesAvailable = false;

            if (!pricesAvailable)
            {
                priceOptions = new List<PriceOptions>();
                foreach (PriceOptions priceOption in Enum.GetValues(typeof(PriceOptions)))
                    priceOptions.Add(priceOption);
            }

            if (colorOptions == null)
            {
                colorOptions = new List<ColorOptions>();
                foreach (ColorOptions colorOption in Enum.GetValues(typeof(ColorOptions)))
                    colorOptions.Add(colorOption);
            }

            var amazonProductModels = from a in context.AmazonProductModels
                                      select a;

            amazonProductModels = amazonProductModels.Where(s =>
                (
                    (priceOptions.Contains(PriceOptions.Price0To50) && s.Price >= 0 && s.Price <= 50)
                    || (priceOptions.Contains(PriceOptions.Price50To100) && s.Price >= 50 && s.Price <= 100)
                    || (priceOptions.Contains(PriceOptions.Price100To200) && s.Price >= 100 && s.Price <= 200)
                    || (priceOptions.Contains(PriceOptions.Price200To500) && s.Price >= 200 && s.Price <= 500)
                )
                && (s.UserAdded == false)
                );
                       
            amazonProductModels = amazonProductModels
                .Include(s => s.Reviews);

            var list = await amazonProductModels.ToListAsync();
            
            //context.AmazonProductModels.FromSql("ALTER TABLE AmazonProductModels ADD PoopColumn INT;");
            //context.SaveChanges();
            
            return list;
        }
        

        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public virtual List<ReviewModel> Reviews { get; set; }
        public string Url { get; set; }
        public double Price { get; set; }
        public double OverallRating { get; set; }
        public string ImageLocation { get; set; }
        public string Color { get; set; }
        public string Durability { get; set; }
        public string ServingSize { get; set; }
        public string BrewingTime { get; set; }
        public string Brand { get; set; }
        public string Warranty { get; set; }
        public string QualityOfCoffee { get; set; }
        public bool UserAdded { get; set; }
        public string TypeOfMachine { get; set; }



    }
}
