using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using HccCoffeeMaker.Data;
using HccCoffeeMaker.Models.CoffeeMakerModels;

namespace HccCoffeeMaker.Controllers
{
    public class ReviewController : Controller
    {
        private readonly MyDatabaseContext _context;

        public ReviewController(MyDatabaseContext context)
        {
            _context = context;    
        }

        // GET: Review
        public async Task<IActionResult> Index()
        {
            return View(await _context.ReviewModels.ToListAsync());
        }

        // GET: Review/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var reviewModel = await _context.ReviewModels.SingleOrDefaultAsync(m => m.ID == id);
            if (reviewModel == null)
            {
                return NotFound();
            }

            return View(reviewModel);
        }

        // GET: Review/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Review/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Description,Rating,Title")] ReviewModel reviewModel)
        {
            if (ModelState.IsValid)
            {
                _context.Add(reviewModel);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(reviewModel);
        }

        // GET: Review/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var reviewModel = await _context.ReviewModels.SingleOrDefaultAsync(m => m.ID == id);
            if (reviewModel == null)
            {
                return NotFound();
            }
            return View(reviewModel);
        }

        // POST: Review/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Description,Rating,Title")] ReviewModel reviewModel)
        {
            if (id != reviewModel.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(reviewModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ReviewModelExists(reviewModel.ID))
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
            return View(reviewModel);
        }

        // GET: Review/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var reviewModel = await _context.ReviewModels.SingleOrDefaultAsync(m => m.ID == id);
            if (reviewModel == null)
            {
                return NotFound();
            }

            return View(reviewModel);
        }

        // POST: Review/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var reviewModel = await _context.ReviewModels.SingleOrDefaultAsync(m => m.ID == id);
            _context.ReviewModels.Remove(reviewModel);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        private bool ReviewModelExists(int id)
        {
            return _context.ReviewModels.Any(e => e.ID == id);
        }
    }
}
