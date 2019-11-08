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
    public class TagsController : ControllerBase
    {
        private readonly BlogContext _context;

        public TagsController(BlogContext context)
        {
            _context = context;
        }

        // GET: api/Tags
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TagsModel>>> GetTags()
        {
            return await _context.Tags.Select(s => new TagsModel { 
                TagId = s.TagId,
                TagName = s.TagName
            }).ToListAsync();
        }

        // GET: api/Tags/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tags>> GetTags(int id)
        {
            var tags = await _context.Tags.FindAsync(id);

            if (tags == null)
            {
                return NotFound();
            }

            return tags;
        }

        // POST: api/Tags
        [HttpPost]
        public async Task<ActionResult<Tags>> PostTags(Tags tags)
        {
            _context.Tags.Add(tags);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTags", new { id = tags.TagId }, tags);
        }

        // DELETE: api/Tags/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Tags>> DeleteTags(int id)
        {
            var tags = await _context.Tags.FindAsync(id);
            if (tags == null)
            {
                return NotFound();
            }

            _context.Tags.Remove(tags);
            await _context.SaveChangesAsync();

            return tags;
        }

        private bool TagsExists(int id)
        {
            return _context.Tags.Any(e => e.TagId == id);
        }
    }
}
