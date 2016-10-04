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
        public AmazonProductModel(JObject jsonObject)
        {
            Reviews = new List<ReviewModel>();
            JProperty position = (JProperty)jsonObject.First.First.First;
            while (position != null)
            {
                switch (position.Name)
                {
                    case "title":
                        Title = position.First.ToString();
                        break;
                    case "description":
                        Description = position.First.ToString();
                        break;
                    case "location":
                        Url = position.First.ToString();
                        break;
                    case "price":
                        Price = Convert.ToDouble(position.First.ToString().Replace("$", ""));
                        break;
                    case "overall_rating":
                        OverallRating = Convert.ToDouble(position.First.ToString().Remove(3));
                        break;
                    case "main_images":
                        JProperty imageLocation = (JProperty)position.First.First.First;
                        while (imageLocation != null)
                        {
                            if (imageLocation.Name == "location")
                                ImageLocation = imageLocation.First.ToString();
                            imageLocation = (JProperty)(((JToken)imageLocation).Next);
                        }
                        break;
                    case "reviews":
                        JToken review = position.First.First;
                        while (review != null)
                        {
                            Reviews.Add(new ReviewModel(review));
                            review = review.Next;
                        }
                        break;
                }

                position = (JProperty)(((JToken)position).Next);
            }
        }

        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public virtual List<ReviewModel> Reviews { get; set; }
        public string Url { get; set; }
        public double Price { get; set; }
        public double OverallRating { get; set; }
        public string ImageLocation { get; set; }
    }
}
