using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HccCoffeeMaker.Controllers
{
    public class InitialOptionsController : Controller
    {
        public IActionResult Index()
        {
            string value = HttpContext.Request.Form["firstname"];
            ViewData["value"] = value;
            foreach(var data in HttpContext.Request.Form)
            {
                ViewData[data.Key] = data.Key;
            }
            return View();
        }
    }
}