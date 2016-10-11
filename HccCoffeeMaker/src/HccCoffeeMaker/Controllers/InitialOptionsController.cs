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

            foreach(var key in HttpContext.Request.Form)
            {
                foreach(var data in HttpContext.Request.Form[key.Key])
                {
                    ViewData[key.Key + "." + data] = key.Key + "." + data;
                    if(key.Key == "price")
                    {
                        foreach (AmazonProductModel.PriceOptions priceOption in Enum.GetValues(typeof(AmazonProductModel.PriceOptions)))
                            if (priceOption.ToString() == data)
                                priceOptions.Add(priceOption);
                    }
                }
            }

            ViewData["userCurations"] = await AmazonProductModel.GetUserAddedCurations(_context);
            ViewData["products"] = await AmazonProductModel.Query(
                context: _context,
                priceOptions: priceOptions
                );

            return View();
        }
    }
}