using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Blog.Models;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly BlogContext _context;

        public CategoriesController(BlogContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoriesModel>>> GetCategories()
        {
            return await _context.Categories.Select(s => new CategoriesModel {
                CategoryId = s.CategoryId,
                CategoryName = s.CategoryName
            }).ToListAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Categories>> GetCategories(int id)
        {
            var categories = await _context.Categories.FindAsync(id);

            if (categories == null)
            {
                return NotFound();
            }

            return categories;
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategories(int id, Categories categories)
        {
            if (id != categories.CategoryId)
            {
                return BadRequest();
            }

            _context.Entry(categories).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoriesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Categories
        [HttpPost]
        public async Task<ActionResult<Categories>> PostCategories(Categories categories)
        {
            _context.Categories.Add(categories);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategories", new { id = categories.CategoryId }, categories);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Categories>> DeleteCategories(int id)
        {
            var categories = await _context.Categories.FindAsync(id);
            if (categories == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(categories);
            await _context.SaveChangesAsync();

            return categories;
        }

        private bool CategoriesExists(int id)
        {
            return _context.Categories.Any(e => e.CategoryId == id);
        }
    }
}
