using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Blog.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdditionalDataController : ControllerBase
    {
        private readonly BlogContext _context;

        public AdditionalDataController(BlogContext context)
        {
            _context = context;
        }

        // GET: api/AdditionalData
        [HttpGet]
        public async Task<IEnumerable> GetTagsByArticleId(int id)
        {
            return await _context.Articles.Include(i => i.TagsNavigation)
                .Where(artc => artc.ArticleId == id)
                .Select(s => new {  
                    tags = s.TagsNavigation.Select(ss => ss.Tag.TagName),
                    categoryName = s.CategoryNavigation.CategoryName 
                }).ToListAsync();

        }
    }
}