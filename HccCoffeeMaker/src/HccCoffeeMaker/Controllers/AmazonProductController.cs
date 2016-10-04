using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using HccCoffeeMaker.Data;
using HccCoffeeMaker.Models.CoffeeMakerModels;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Net.Http;

namespace HccCoffeeMaker.Controllers
{
    public class AmazonProductController : Controller
    {
        private readonly MyDatabaseContext _context;

        public AmazonProductController(MyDatabaseContext context)
        {
            _context = context;    
        }

        // GET: AmazonProduct
        public async Task<IActionResult> Index()
        {
            return View(await _context.AmazonProductModels.ToListAsync());
        }

        // GET: AmazonProduct/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var amazonProductModel = await _context.AmazonProductModels.SingleOrDefaultAsync(m => m.ID == id);
            if (amazonProductModel == null)
            {
                return NotFound();
            }

            return View(amazonProductModel);
        }

        // GET: AmazonProduct/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: AmazonProduct/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID")] AmazonProductModel amazonProductModel)
        {
            if (ModelState.IsValid)
            {
                _context.Add(amazonProductModel);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(amazonProductModel);
        }

        [HttpPost]
        public async Task<IActionResult> CreateFromUrl()
        {
            string url = HttpContext.Request.Form["url"];
            String response = await new HttpClient().GetStringAsync("http://ecology-service.cse.tamu.edu/BigSemanticsService/metadata.json?callback=metadaCallback&url=" + url);
            JObject jObject = (JObject)JsonConvert.DeserializeObject(response);
            AmazonProductModel amazonProduct = new AmazonProductModel(jObject);
            return await Create(amazonProduct);
        }

        // GET: AmazonProduct/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var amazonProductModel = await _context.AmazonProductModels.SingleOrDefaultAsync(m => m.ID == id);
            if (amazonProductModel == null)
            {
                return NotFound();
            }
            return View(amazonProductModel);
        }

        // POST: AmazonProduct/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID")] AmazonProductModel amazonProductModel)
        {
            if (id != amazonProductModel.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(amazonProductModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AmazonProductModelExists(amazonProductModel.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction("Index");
            }
            return View(amazonProductModel);
        }

        // GET: AmazonProduct/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var amazonProductModel = await _context.AmazonProductModels.SingleOrDefaultAsync(m => m.ID == id);
            if (amazonProductModel == null)
            {
                return NotFound();
            }

            return View(amazonProductModel);
        }

        // POST: AmazonProduct/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var amazonProductModel = await _context.AmazonProductModels.SingleOrDefaultAsync(m => m.ID == id);
            _context.AmazonProductModels.Remove(amazonProductModel);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        private bool AmazonProductModelExists(int id)
        {
            return _context.AmazonProductModels.Any(e => e.ID == id);
        }
    }
}
