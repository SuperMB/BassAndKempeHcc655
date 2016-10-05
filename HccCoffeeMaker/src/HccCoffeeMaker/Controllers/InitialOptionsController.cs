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
            foreach(var key in HttpContext.Request.Form)
            {
                foreach(var data in HttpContext.Request.Form[key.Key])
                {
                    ViewData[key.Key + "." + data] = key.Key + "." + data;
                    if(key.Key == "price")
                    {
                        if(data == "price50To100")
                        {
                            var amazonProductModels = await _context.AmazonProductModels
                                .Where(s => s.Price >= 50)
                                .Where(s => s.Price <= 100)
                                .Include(s => s.Reviews)
                                .ToListAsync();

                            ViewData["products"] = amazonProductModels;
                        }
                        if (data == "price0To50")
                        {
                            var amazonProductModels = await _context.AmazonProductModels
                                .Where(s => s.Price >= 0)
                                .Where(s => s.Price <= 50)
                                .Include(s => s.Reviews)
                                .ToListAsync();

                            ViewData["products"] = amazonProductModels;
                        }
                    }
                }
            }



            return View();
        }
    }
}