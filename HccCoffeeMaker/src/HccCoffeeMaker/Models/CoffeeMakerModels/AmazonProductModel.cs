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

            if (jsonObject["title"] != null)
                Title = jsonObject["title"].ToString();
            else
                Title = "";

            if (jsonObject["description"] != null)
                Description = jsonObject["description"].ToString();
            else
                Description = "";

            if (jsonObject["location"] != null)
                Url = jsonObject["location"].ToString();
            else
                Url = "";

            if (jsonObject["price"] != null)
                Price = Convert.ToDouble(jsonObject["price"].ToString().Remove(0,1));
            else
                Price = 0;

            if (jsonObject["overall_rating"] != null)
            {
                if (jsonObject["overall_rating"].ToString().Length > 3)
                    OverallRating = Convert.ToDouble(jsonObject["overall_rating"].ToString().Remove(3));
                else
                    OverallRating = Convert.ToDouble(jsonObject["overall_rating"].ToString());
            }
            else
                OverallRating = 0;

            if (jsonObject["main_images"] != null)
                ImageLocation = jsonObject["main_images"][0]["location"].ToString();
            else
                ImageLocation = "";

            if (jsonObject["reviews"] != null)
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
        public static string OptionsString(PriceOptions priceOption)
        {
            switch(priceOption)
            {
                case PriceOptions.Price0To50:
                    return "$0 → $50";
                case PriceOptions.Price50To100:
                    return "$50 → $100";
                case PriceOptions.Price100To200:
                    return "$100 → $200";
                case PriceOptions.Price200To500:
                    return "$200 → $500";
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
            Silver
        }
        public static string OptionsString(ColorOptions colorOption)
        {
            switch (colorOption)
            {
                case ColorOptions.Green:
                    return "Green";
                case ColorOptions.Black:
                    return "Black";
                case ColorOptions.Blue:
                    return "Blue";
                case ColorOptions.Red:
                    return "Red";
                case ColorOptions.Silver:
                    return "Silver";
            }
            return "Invalid Option";
        }

        public enum ServingSizeOptions 
        {
            Cup1,
            Cup1To4,
            Cup5To7,
            Cup8To11,
            Cup12To15,
            Cup16To19,
            Cup20Plus
        }
        public static string OptionsString(ServingSizeOptions servingSizeOption)
        {
            switch (servingSizeOption)
            {
                case ServingSizeOptions.Cup1:
                    return "1 Cup";
                case ServingSizeOptions.Cup1To4:
                    return "1 → 4 Cups";
                case ServingSizeOptions.Cup5To7:
                    return "5 → 7 Cups";
                case ServingSizeOptions.Cup8To11:
                    return "8 → 11 Cups";
                case ServingSizeOptions.Cup12To15:
                    return "12 → 15 Cups";
                case ServingSizeOptions.Cup16To19:
                    return "16 → 19 Cups";
                case ServingSizeOptions.Cup20Plus:
                    return "20+ Cups";
            }
            return "Invalid Option";
        }

        public enum DurabilityOptions 
        {
            LightUse,
            NormalUse,
            HeavyCommercialUse,
            OutdoorUse
        }
        public static string OptionsString(DurabilityOptions durabilityOption)
        {
            switch (durabilityOption)
            {
                case DurabilityOptions.LightUse:
                    return "Light Use";
                case DurabilityOptions.NormalUse:
                    return "Normal Use";
                case DurabilityOptions.HeavyCommercialUse:
                    return "Heavy Commercial Use";
                case DurabilityOptions.OutdoorUse:
                    return "Outdoor Use";
            }
            return "Invalid Option";
        }

        public enum BrewingTimeOptions 
        {
            Time0To3Minutes,
            Time3To5Minutes,
            Time5To10Minutes,
            Time10To15Minutes
        }
        public static string OptionsString(BrewingTimeOptions priceOption) 
        {
            switch (priceOption)
            {
                case BrewingTimeOptions.Time0To3Minutes:
                    return "0 → 3 Minutes";
                case BrewingTimeOptions.Time3To5Minutes:
                    return "3 → 5 Minutes";
                case BrewingTimeOptions.Time5To10Minutes:
                    return "5 → 10 Minutes";
                case BrewingTimeOptions.Time10To15Minutes:
                    return "10 → 15 Minutes";
            }
            return "Invalid Option";
        }

        public enum BrandOptions 
        {
            Kuerig,
            Hamilton,
            Cuisinart,
            Nespresso,
            Other
        }
        public static string OptionsString(BrandOptions brandOption)
        {
            switch (brandOption)
            {
                case BrandOptions.Kuerig:
                    return "Kuerig";
                case BrandOptions.Hamilton:
                    return "Hamilton";
                case BrandOptions.Cuisinart:
                    return "Cuisinart";
                case BrandOptions.Nespresso:
                    return "Nespresso";
                case BrandOptions.Other:
                    return "Other";
            }
            return "Invalid Option";
        }

        public enum WarrantyOptions 
        {
            None,
            AdditionalCost,
            Year1,
            Year2,
            Year3To5
        }
        public static string OptionsString(WarrantyOptions warrantyOption)
        {
            switch (warrantyOption)
            {
                case WarrantyOptions.None:
                    return "None";
                case WarrantyOptions.AdditionalCost:
                    return "Additional Cost";
                case WarrantyOptions.Year1:
                    return "1 Year";
                case WarrantyOptions.Year2:
                    return "2 Years";
                case WarrantyOptions.Year3To5:
                    return "3 → 5 Years";
            }
            return "Invalid Option";
        }

        public enum QualityOfCoffeeOptions
        {
            LowConcern,
            HighConcern
        }
        public static string OptionsString(QualityOfCoffeeOptions qualityOfCOffeeOption)
        {
            switch (qualityOfCOffeeOption)
            {
                case QualityOfCoffeeOptions.LowConcern:
                    return "Low Concern";
                case QualityOfCoffeeOptions.HighConcern:
                    return "High Concern";
            }
            return "Invalid Option";
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
            List<PriceOptions> priceOptionsInput = null,
            List<ColorOptions> colorOptionsInput = null,
            List<ServingSizeOptions> servingSizeOptionsInput = null,
            List<DurabilityOptions> durabilityOptionsInput = null,
            List<BrewingTimeOptions> brewingTimeOptionsInput = null,
            List<BrandOptions> brandOptionsInput = null,
            List<WarrantyOptions> warrantyOptionsInput = null
            )
        {


            List<PriceOptions> priceOptions = priceOptionsInput;
            List<ColorOptions> colorOptions = colorOptionsInput;
            List<ServingSizeOptions> servingSizeOptions = servingSizeOptionsInput;
            List<DurabilityOptions> durabilityOptions = durabilityOptionsInput;
            List<BrewingTimeOptions> brewingTimeOptions = brewingTimeOptionsInput;
            List<BrandOptions> brandOptions = brandOptionsInput;
            List<WarrantyOptions> warrantyOptions = warrantyOptionsInput;


            bool pricesAvailable = true;
            if (priceOptions == null)
                pricesAvailable = false;
            else if (priceOptions.Count == 0)
                pricesAvailable = false;

            bool colorsAvailable = true;
            if (colorOptions == null)
                colorsAvailable = false;
            else if (colorOptions.Count == 0)
                colorsAvailable = false;

            bool servingSizesAvailable = true;
            if (servingSizeOptions == null)
                servingSizesAvailable = false;
            else if (servingSizeOptions.Count == 0)
                servingSizesAvailable = false;

            bool durabilitysAvailable = true;
            if (durabilityOptions == null)
                durabilitysAvailable = false;
            else if (durabilityOptions.Count == 0)
                durabilitysAvailable = false;

            bool brewingTimesAvailable = true;
            if (brewingTimeOptions == null)
                brewingTimesAvailable = false;
            else if (brewingTimeOptions.Count == 0)
                brewingTimesAvailable = false;

            bool brandsAvailable = true;
            if (brandOptions == null)
                brandsAvailable = false;
            else if (brandOptions.Count == 0)
                brandsAvailable = false;

            bool warrantysAvailable = true;
            if (warrantyOptions == null)
                warrantysAvailable = false;
            else if (warrantyOptions.Count == 0)
                warrantysAvailable = false;


            if (!pricesAvailable)
            {
                priceOptions = new List<PriceOptions>();
                foreach (PriceOptions priceOption in Enum.GetValues(typeof(PriceOptions)))
                    priceOptions.Add(priceOption);
            }

            if (!colorsAvailable)
            {
                colorOptions = new List<ColorOptions>();
                foreach (ColorOptions colorOption in Enum.GetValues(typeof(ColorOptions)))
                    colorOptions.Add(colorOption);
            }

            if (!servingSizesAvailable)
            {
                servingSizeOptions = new List<ServingSizeOptions>();
                foreach (ServingSizeOptions servingSizeOption in Enum.GetValues(typeof(ServingSizeOptions)))
                    servingSizeOptions.Add(servingSizeOption);
            }

            if (!durabilitysAvailable)
            {
                durabilityOptions = new List<DurabilityOptions>();
                foreach (DurabilityOptions durabilityOption in Enum.GetValues(typeof(DurabilityOptions)))
                    durabilityOptions.Add(durabilityOption);
            }

            if (!brewingTimesAvailable)
            {
                brewingTimeOptions = new List<BrewingTimeOptions>();
                foreach (BrewingTimeOptions brewingTimeOption in Enum.GetValues(typeof(BrewingTimeOptions)))
                    brewingTimeOptions.Add(brewingTimeOption);
            }

            if (!brandsAvailable)
            {
                brandOptions = new List<BrandOptions>();
                foreach (BrandOptions brandOption in Enum.GetValues(typeof(BrandOptions)))
                    brandOptions.Add(brandOption);
            }

            if (!warrantysAvailable)
            {
                warrantyOptions = new List<WarrantyOptions>();
                foreach (WarrantyOptions warrantyOption in Enum.GetValues(typeof(WarrantyOptions)))
                    warrantyOptions.Add(warrantyOption);
            }

            var amazonProductModels = from a in context.AmazonProductModels
                                      select a;
            
            amazonProductModels = amazonProductModels.Where(s =>
            (
                (
                    (priceOptions.Contains(PriceOptions.Price0To50) && s.Price >= 0 && s.Price <= 50)
                    || (priceOptions.Contains(PriceOptions.Price50To100) && s.Price >= 50 && s.Price <= 100)
                    || (priceOptions.Contains(PriceOptions.Price100To200) && s.Price >= 100 && s.Price <= 200)
                    || (priceOptions.Contains(PriceOptions.Price200To500) && s.Price >= 200 && s.Price <= 500)
                )
                &&
                (
                    (colorOptions.Contains(ColorOptions.Black) && s.Color == OptionsString(ColorOptions.Black))
                    || (colorOptions.Contains(ColorOptions.Blue) && s.Color == OptionsString(ColorOptions.Blue))
                    || (colorOptions.Contains(ColorOptions.Green) && s.Color == OptionsString(ColorOptions.Green))
                    || (colorOptions.Contains(ColorOptions.Red) && s.Color == OptionsString(ColorOptions.Red))
                    || (colorOptions.Contains(ColorOptions.Silver) && s.Color == OptionsString(ColorOptions.Silver))
                    || (s.Color == null)
                )
                &&
                (
                    (servingSizeOptions.Contains(ServingSizeOptions.Cup1) && s.ServingSize == OptionsString(ServingSizeOptions.Cup1))
                    || (servingSizeOptions.Contains(ServingSizeOptions.Cup12To15) && s.ServingSize == OptionsString(ServingSizeOptions.Cup12To15))
                    || (servingSizeOptions.Contains(ServingSizeOptions.Cup16To19) && s.ServingSize == OptionsString(ServingSizeOptions.Cup16To19))
                    || (servingSizeOptions.Contains(ServingSizeOptions.Cup1To4) && s.ServingSize == OptionsString(ServingSizeOptions.Cup1To4))
                    || (servingSizeOptions.Contains(ServingSizeOptions.Cup20Plus) && s.ServingSize == OptionsString(ServingSizeOptions.Cup20Plus))
                    || (servingSizeOptions.Contains(ServingSizeOptions.Cup5To7) && s.ServingSize == OptionsString(ServingSizeOptions.Cup5To7))
                    || (servingSizeOptions.Contains(ServingSizeOptions.Cup8To11) && s.ServingSize == OptionsString(ServingSizeOptions.Cup8To11))
                    || (s.ServingSize == null)
                )
                &&
                (
                    (durabilityOptions.Contains(DurabilityOptions.HeavyCommercialUse) && s.Durability == OptionsString(DurabilityOptions.HeavyCommercialUse))
                    || (durabilityOptions.Contains(DurabilityOptions.LightUse) && s.Durability == OptionsString(DurabilityOptions.LightUse))
                    || (durabilityOptions.Contains(DurabilityOptions.NormalUse) && s.Durability == OptionsString(DurabilityOptions.NormalUse))
                    || (durabilityOptions.Contains(DurabilityOptions.OutdoorUse) && s.Durability == OptionsString(DurabilityOptions.OutdoorUse))
                    || (s.Durability == null)
                )
                &&
                (
                    (brewingTimeOptions.Contains(BrewingTimeOptions.Time0To3Minutes) && s.BrewingTime == OptionsString(BrewingTimeOptions.Time0To3Minutes))
                    || (brewingTimeOptions.Contains(BrewingTimeOptions.Time10To15Minutes) && s.BrewingTime == OptionsString(BrewingTimeOptions.Time10To15Minutes))
                    || (brewingTimeOptions.Contains(BrewingTimeOptions.Time3To5Minutes) && s.BrewingTime == OptionsString(BrewingTimeOptions.Time3To5Minutes))
                    || (brewingTimeOptions.Contains(BrewingTimeOptions.Time5To10Minutes) && s.BrewingTime == OptionsString(BrewingTimeOptions.Time5To10Minutes))
                    || (s.BrewingTime == null)
                )
                &&
                (
                    (brandOptions.Contains(BrandOptions.Cuisinart) && s.Brand == OptionsString(BrandOptions.Cuisinart))
                    || (brandOptions.Contains(BrandOptions.Hamilton) && s.Brand == OptionsString(BrandOptions.Hamilton))
                    || (brandOptions.Contains(BrandOptions.Kuerig) && s.Brand == OptionsString(BrandOptions.Kuerig))
                    || (brandOptions.Contains(BrandOptions.Nespresso) && s.Brand == OptionsString(BrandOptions.Nespresso))
                    || (brandOptions.Contains(BrandOptions.Other) && s.Brand == OptionsString(BrandOptions.Other))
                    || (s.Brand == null)
                )
                &&
                (
                    (warrantyOptions.Contains(WarrantyOptions.AdditionalCost) && s.Warranty == OptionsString(WarrantyOptions.AdditionalCost))
                    || (warrantyOptions.Contains(WarrantyOptions.None) && s.Warranty == OptionsString(WarrantyOptions.None))
                    || (warrantyOptions.Contains(WarrantyOptions.Year1) && s.Warranty == OptionsString(WarrantyOptions.Year1))
                    || (warrantyOptions.Contains(WarrantyOptions.Year2) && s.Warranty == OptionsString(WarrantyOptions.Year2))
                    || (warrantyOptions.Contains(WarrantyOptions.Year3To5) && s.Warranty == OptionsString(WarrantyOptions.Year3To5))
                    || (s.Warranty == null)
                )
                && (s.UserAdded == false)
            ));
                       
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
