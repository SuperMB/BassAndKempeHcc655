using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HccCoffeeMaker.Models.CoffeeMakerModels;
using HccCoffeeMaker.Data;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace HccCoffeeMaker.Controllers
{
    public class AddToCurationController : Controller
    {
        private readonly MyDatabaseContext _context;

        public AddToCurationController(MyDatabaseContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> Another(AmazonProductModel amazonProductModel)
        {
            ViewData["products"] = await AmazonProductModel.GetUserAddedCurations(_context);// amazonProductModel;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID")] AmazonProductModel amazonProductModel)
        {
            if (ModelState.IsValid)
            {
                _context.Add(amazonProductModel);
                await _context.SaveChangesAsync();
                return RedirectToAction("Another", amazonProductModel);
            }
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateFromUrl()
        {
            string metaData = HttpContext.Request.Form["metaData"];
            //String response = await new HttpClient().GetStringAsync("http://ecology-service.cse.tamu.edu/BigSemanticsService/metadata.json?callback=metadaCallback&url=" + url);
            JObject jObject = (JObject)JsonConvert.DeserializeObject(metaData);
            AmazonProductModel amazonProduct = new AmazonProductModel(
                jObject,
                HttpContext.Request.Form["ColorOptions"],
                HttpContext.Request.Form["DurabilityOptions"],
                HttpContext.Request.Form["ServingSizeOptions"],
                HttpContext.Request.Form["BrewingTimeOptions"],
                HttpContext.Request.Form["BrandOptions"],
                HttpContext.Request.Form["WarrantyOptions"],
                HttpContext.Request.Form["QualityOfCoffeeOptions"],
                true
                );
            return await Create(amazonProduct);
        }
    }
}