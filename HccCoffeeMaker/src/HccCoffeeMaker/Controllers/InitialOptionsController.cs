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
            List<AmazonProductModel.QualityOfCoffeeOptions> qualityOfCoffeeOptions = new List<AmazonProductModel.QualityOfCoffeeOptions>();

            string facetsAdded = "";
            string facetParameters = "";

            bool priceAdded = false;
            bool colorAdded = false;
            bool servingSizeAdded = false;
            bool durabilityAdded = false;
            bool brewingTimeAdded = false;
            bool brandAdded = false;
            bool warrantyAdded = false;
            bool qualityOfCoffeeAdded = false;

            foreach (var key in HttpContext.Request.Form)
            {
                foreach(var data in HttpContext.Request.Form[key.Key])
                {
                    ViewData[key.Key + "." + data] = key.Key + "." + data;
                    if (key.Key == "price")
                    {
                        if(!priceAdded)
                        {
                            facetsAdded += "price;";
                            priceAdded = true;
                        }

                        foreach (AmazonProductModel.PriceOptions priceOption in Enum.GetValues(typeof(AmazonProductModel.PriceOptions)))
                            if (priceOption.ToString() == data)
                            {
                                priceOptions.Add(priceOption);
                                facetParameters += "price." + priceOption.ToString() + ";";
                            }
                    }
                    else if (key.Key == "color")
                    {
                        if (!colorAdded)
                        {
                            facetsAdded += "color;";
                            colorAdded = true;
                        }

                        foreach (AmazonProductModel.ColorOptions colorOption in Enum.GetValues(typeof(AmazonProductModel.ColorOptions)))
                            if (colorOption.ToString() == data)
                            {
                                colorOptions.Add(colorOption);
                                facetParameters += "color." + colorOption.ToString() + ";";
                            }
                    }
                    else if (key.Key == "servingSize")
                    {
                        if (!servingSizeAdded)
                        {
                            facetsAdded += "servingSize;";
                            servingSizeAdded = true;
                        }

                        foreach (AmazonProductModel.ServingSizeOptions servingSizeOption in Enum.GetValues(typeof(AmazonProductModel.ServingSizeOptions)))
                            if (servingSizeOption.ToString() == data)
                            {
                                servingSizeOptions.Add(servingSizeOption);
                                facetParameters += "servingSize." + servingSizeOption.ToString() + ";";
                            }
                    }
                    else if (key.Key == "durability")
                    {
                        if (!durabilityAdded)
                        {
                            facetsAdded += "durability;";
                            durabilityAdded = true;
                        }

                        foreach (AmazonProductModel.DurabilityOptions durabilityOption in Enum.GetValues(typeof(AmazonProductModel.DurabilityOptions)))
                            if (durabilityOption.ToString() == data)
                            {
                                durabilityOptions.Add(durabilityOption);
                                facetParameters += "durability." + durabilityOption.ToString() + ";";
                            }
                    }
                    else if (key.Key == "brewingTime")
                    {
                        if (!brewingTimeAdded)
                        {
                            facetsAdded += "brewingTime;";
                            brewingTimeAdded = true;
                        }

                        foreach (AmazonProductModel.BrewingTimeOptions brewingTimeOption in Enum.GetValues(typeof(AmazonProductModel.BrewingTimeOptions)))
                            if (brewingTimeOption.ToString() == data)
                            {
                                brewingTimeOptions.Add(brewingTimeOption);
                                facetParameters += "brewingTime." + brewingTimeOption.ToString() + ";";
                            }
                    }
                    else if (key.Key == "brand")
                    {
                        if (!brandAdded)
                        {
                            facetsAdded += "brand;";
                            brandAdded = true;
                        }

                        foreach (AmazonProductModel.BrandOptions brandOption in Enum.GetValues(typeof(AmazonProductModel.BrandOptions)))
                            if (brandOption.ToString() == data)
                            {
                                brandOptions.Add(brandOption);
                                facetParameters += "brand." + brandOption.ToString() + ";";
                            }
                    }
                    else if (key.Key == "warranty")
                    {
                        if (!warrantyAdded)
                        {
                            facetsAdded += "warranty;";
                            warrantyAdded = true;
                        }

                        foreach (AmazonProductModel.WarrantyOptions warrantyOption in Enum.GetValues(typeof(AmazonProductModel.WarrantyOptions)))
                            if (warrantyOption.ToString() == data)
                            {
                                warrantyOptions.Add(warrantyOption);
                                facetParameters += "warranty." + warrantyOption.ToString() + ";";
                            }
                    }
                    else if (key.Key == "qualityOfCoffee")
                    {
                        if (!qualityOfCoffeeAdded)
                        {
                            facetsAdded += "qualityOfCoffee;";
                            warrantyAdded = true;
                        }

                        foreach (AmazonProductModel.QualityOfCoffeeOptions qualityOfCoffeeOption in Enum.GetValues(typeof(AmazonProductModel.QualityOfCoffeeOptions)))
                            if (qualityOfCoffeeOption.ToString() == data)
                            {
                                qualityOfCoffeeOptions.Add(qualityOfCoffeeOption);
                                facetParameters += "qualityOfCoffee." + qualityOfCoffeeOption.ToString() + ";";
                            }
                    }
                }
            }

            ViewData["facetsAdded"] = facetsAdded;
            ViewData["facetParameters"] = facetParameters;
            ViewData["typeOfMachine"] = HttpContext.Request.Form["typeOfMachine"];

            string typeOfMachine = HttpContext.Request.Form["typeOfMachine"];
            List<AmazonProductModel.TypeOfMachineOptions> typeOfMachineOptions = new List<AmazonProductModel.TypeOfMachineOptions>();
            if (typeOfMachine == "AutomaticDrip")
                typeOfMachineOptions.Add(AmazonProductModel.TypeOfMachineOptions.Automatic);
            else if (typeOfMachine == "SingleServePods")
                typeOfMachineOptions.Add(AmazonProductModel.TypeOfMachineOptions.SmallPods);
            else if (typeOfMachine == "FrenchPress")
                typeOfMachineOptions.Add(AmazonProductModel.TypeOfMachineOptions.FrenchPress);
            else
            {
                typeOfMachineOptions.Add(AmazonProductModel.TypeOfMachineOptions.Automatic);
                typeOfMachineOptions.Add(AmazonProductModel.TypeOfMachineOptions.SmallPods);
                typeOfMachineOptions.Add(AmazonProductModel.TypeOfMachineOptions.FrenchPress);
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
                warrantyOptionsInput: warrantyOptions,
                qualityOfCoffeeOptionsInput: qualityOfCoffeeOptions,
                typeOfMachineOptionsInput: typeOfMachineOptions
                );

            return View();
        }
    }
}