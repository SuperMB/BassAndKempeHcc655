using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HccCoffeeMaker.Data;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using HccCoffeeMaker.Models.CoffeeMakerModels;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Net.Http;

namespace HccCoffeeMaker.Controllers
{
    public class InitialOptionsController : Controller
    {

        private readonly MyDatabaseContext _context;

        public InitialOptionsController(MyDatabaseContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            string value = HttpContext.Request.Form["firstname"];
            List<AmazonProductModel.PriceOptions> priceOptions = new List<AmazonProductModel.PriceOptions>();
            List<AmazonProductModel.ColorOptions> colorOptions = new List<AmazonProductModel.ColorOptions>();
            List<AmazonProductModel.ServingSizeOptions> servingSizeOptions = new List<AmazonProductModel.ServingSizeOptions>();
            List<AmazonProductModel.DurabilityOptions> durabilityOptions = new List<AmazonProductModel.DurabilityOptions>();
            List<AmazonProductModel.BrewingTimeOptions> brewingTimeOptions = new List<AmazonProductModel.BrewingTimeOptions>();
            List<AmazonProductModel.BrandOptions> brandOptions = new List<AmazonProductModel.BrandOptions>();
            List<AmazonProductModel.WarrantyOptions> warrantyOptions = new List<AmazonProductModel.WarrantyOptions>();
                        
            foreach (var key in HttpContext.Request.Form)
            {
                foreach(var data in HttpContext.Request.Form[key.Key])
                {
                    ViewData[key.Key + "." + data] = key.Key + "." + data;
                    if (key.Key == "price")
                    {
                        foreach (AmazonProductModel.PriceOptions priceOption in Enum.GetValues(typeof(AmazonProductModel.PriceOptions)))
                            if (priceOption.ToString() == data)
                                priceOptions.Add(priceOption);
                    }
                    else if (key.Key == "color")
                    {
                        foreach (AmazonProductModel.ColorOptions colorOption in Enum.GetValues(typeof(AmazonProductModel.ColorOptions)))
                            if (colorOption.ToString() == data)
                                colorOptions.Add(colorOption);
                    }
                    else if (key.Key == "servingSize")
                    {
                        foreach (AmazonProductModel.ServingSizeOptions servingSizeOption in Enum.GetValues(typeof(AmazonProductModel.ServingSizeOptions)))
                            if (servingSizeOption.ToString() == data)
                                servingSizeOptions.Add(servingSizeOption);
                    }
                    else if (key.Key == "durability")
                    {
                        foreach (AmazonProductModel.DurabilityOptions durabilityOption in Enum.GetValues(typeof(AmazonProductModel.DurabilityOptions)))
                            if (durabilityOption.ToString() == data)
                                durabilityOptions.Add(durabilityOption);
                    }
                    else if (key.Key == "brewingTime")
                    {
                        foreach (AmazonProductModel.BrewingTimeOptions brewingTimeOption in Enum.GetValues(typeof(AmazonProductModel.BrewingTimeOptions)))
                            if (brewingTimeOption.ToString() == data)
                                brewingTimeOptions.Add(brewingTimeOption);
                    }
                    else if (key.Key == "brand")
                    {
                        foreach (AmazonProductModel.BrandOptions brandOption in Enum.GetValues(typeof(AmazonProductModel.BrandOptions)))
                            if (brandOption.ToString() == data)
                                brandOptions.Add(brandOption);
                    }
                    else if (key.Key == "warranty")
                    {
                        foreach (AmazonProductModel.WarrantyOptions warrantyOption in Enum.GetValues(typeof(AmazonProductModel.WarrantyOptions)))
                            if (warrantyOption.ToString() == data)
                                warrantyOptions.Add(warrantyOption);
                    }
                }
            }
            
            ViewData["userCurations"] = await AmazonProductModel.GetUserAddedCurations(_context);
            ViewData["products"] = await AmazonProductModel.Query(
                context: _context,
                priceOptionsInput: priceOptions,
                colorOptionsInput: colorOptions,
                servingSizeOptionsInput: servingSizeOptions,
                durabilityOptionsInput: durabilityOptions,
                brewingTimeOptionsInput: brewingTimeOptions,
                brandOptionsInput: brandOptions,
                warrantyOptionsInput: warrantyOptions
                );

            return View();
        }
    }
}