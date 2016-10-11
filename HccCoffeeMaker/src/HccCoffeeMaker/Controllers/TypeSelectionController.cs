using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HccCoffeeMaker.Controllers
{
    public class TypeSelectionController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}