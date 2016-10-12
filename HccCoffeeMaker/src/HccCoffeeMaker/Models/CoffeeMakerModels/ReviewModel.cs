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
            if(jToken["rating"] != null)
                if(jToken["rating"].ToString().Length > 1)
                {
                    try
                    {
                        Rating = Convert.ToDouble(jToken["rating"].ToString().Remove(1));
                    }
                    catch(Exception e)
                    {
                        try
                        {
                            Rating = Convert.ToDouble(jToken["rating"].Last().First().ToString());
                        }
                        catch(Exception e2)
                        {

                        }
                    }
                }
                    
                else
                    Rating = Convert.ToDouble(jToken["rating"].ToString());

            if (jToken["title"] != null)
                Title = jToken["title"].ToString();

            if (jToken["description"] != null)
                Description = jToken["description"].ToString();            
        }

        public int ID { get; set; }
        public double Rating { get; set; }        
        public string Title { get; set; }
        public string Description { get; set; }

        [ForeignKey("AmazonProductModelID")]
        public int AmazonProductModelID { get; set; }
    }
}
