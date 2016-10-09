﻿using Newtonsoft.Json.Linq;
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
            Rating = Convert.ToDouble(jToken["rating"].ToString().Remove(1));
            Title = jToken["title"].ToString();
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
