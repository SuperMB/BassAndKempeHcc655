using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HccCoffeeMaker.Models.CoffeeMakerModels
{
    public class ReviewModel
    {
        public ReviewModel()
        {

        }

        public ReviewModel(JToken jToken)
        {
            JProperty position = (JProperty)jToken.First;
            while (position != null)
            {
                switch (position.Name)
                {
                    case "rating":
                        Rating = Convert.ToDouble(position.First.ToString().Remove(1));
                        break;
                    case "title":
                        Title = position.First.ToString();
                        break;
                    case "description":
                        Description = position.First.ToString();
                        break;
                }
                position = (JProperty)(((JToken)position).Next);
            }
        }

        public int ID { get; set; }
        public double Rating { get; set; }        
        public string Title { get; set; }
        public string Description { get; set; }

        [ForeignKey("AmazonProductModelID")]
        public int AmazonProductModelID { get; set; }
    }
}
