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

        public List<string> GetFacetsAdded(string facetsAdded)
        {
            List<string> result = new List<string>();
            string facet = "";
            for(int i = 0; i < facetsAdded.Length; i++)
            {
                if(facetsAdded[i] == ';')
                {
                    result.Add(facet);
                    facet = "";
                }
                else
                {
                    facet += facetsAdded[i];
                }
            }

            return result;
        }

        public List<string> GetFacetParameters(string facet, string facetParameters)
        {
            List<string> result = new List<string>();
            string facetName = "";
            string facetParameter = "";
            bool collectingName = true;
            for(int i = 0; i < facetParameters.Length; i++)
            {
                if(facetParameters[i] == ';')
                {
                    if(facetName == facet)
                    {
                        result.Add(facetParameter);
                    }
                    collectingName = true;
                    facetName = "";
                    facetParameter = "";
                }
                else if(facetParameters[i] == '.')
                {
                    collectingName = false;
                }
                else if(collectingName)
                {
                    facetName += facetParameters[i];
                }
                else
                {
                    facetParameter += facetParameters[i];
                }
            }

            return result;
        }

        [HttpPost]
        public IActionResult Index()
        {
            List<string> facetsAdded = GetFacetsAdded(HttpContext.Request.Form["facetsAdded"]);
            foreach(string facet in facetsAdded)
            {
                ViewData[facet] = GetFacetParameters(facet, HttpContext.Request.Form["facetParameters"]);
            }
            ViewData["facetsAdded"] = facetsAdded;
            ViewData["typeOfMachine"] = HttpContext.Request.Form["typeOfMachine"];
            return View("Index");
        }
        
    }
}