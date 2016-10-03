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
            foreach(var key in HttpContext.Request.Form)
            {
                foreach(var data in HttpContext.Request.Form[key.Key])
                {
                    ViewData[key.Key + "." + data] = key.Key + "." + data;
                }
            }
            return View();
        }
    }
}