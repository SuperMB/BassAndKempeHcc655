using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HccCoffeeMaker.Controllers
{
    public class FilterController : Controller
    {
        public IActionResult Index(string coffeeMakerType)
        {
            ViewData["typeOfMachine"] = coffeeMakerType;
            return View();
        }
    }
}