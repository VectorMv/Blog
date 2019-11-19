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
    public class ArticlesController : ControllerBase
    {
        private readonly BlogContext _context;

        public ArticlesController(BlogContext context)
        {
            _context = context;
        }

        // GET: api/Articles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArticlesModel>>> GetArticles( string categorySort = "none",string tagsSort = "none",DateTime? minDate = null,DateTime? maxDate = null, int page = 1, int size = 6)
        {
            if (minDate == null)
            {
                minDate = DateTime.MinValue;
            }

            if(maxDate == null)
            {
                maxDate = DateTime.MaxValue;
            }

            List<string> tagsArr = new List<string>();

            if (!string.IsNullOrEmpty(tagsSort) && tagsSort.ToLower() != "none")
            {
                tagsArr = tagsSort.Split(',').ToList();
            }


            var articles = (tagsArr == null || tagsArr.Count <= 0) ?
            _context.Articles.Include(c => c.CategoryNavigation)
            .Include(t => t.TagsNavigation)
            .Select(s => new ArticlesModel
            {
                ArticleId = s.ArticleId,
                Name = s.Name,
                ShortDescription = s.ShortDescription,
                Description = s.Description,
                HeroImage = s.HeroImage,
                PublicationDate = s.PublicationDate,
                CategoryId = s.CategoryNavigation.CategoryId,
                CategoryName = s.CategoryNavigation.CategoryName,
                Tags = s.TagsNavigation.Select(ss => ss.Tag.TagName).ToArray(),
            }).Where(date => date.PublicationDate >= minDate && date.PublicationDate <= maxDate) :
            _context.Articles
            .Include(c => c.CategoryNavigation)
            .Include(t => t.TagsNavigation)
            .Where(tags => tagsArr.Any(s => tags.TagsNavigation.Select(ss => ss.Tag.TagName).Contains(s)))
            .Select(s => new ArticlesModel
            {
                ArticleId = s.ArticleId,
                Name = s.Name,
                ShortDescription = s.ShortDescription,
                Description = s.Description,
                HeroImage = s.HeroImage,
                PublicationDate = s.PublicationDate,
                CategoryId = s.CategoryNavigation.CategoryId,
                CategoryName = s.CategoryNavigation.CategoryName,
                Tags = s.TagsNavigation.Select(ss => ss.Tag.TagName).ToArray(),
            }).Where(date => date.PublicationDate >= minDate && date.PublicationDate <= maxDate);


            if (!string.IsNullOrEmpty(categorySort) && categorySort.ToLower() != "none")
            {
                articles = articles.Where(sort => sort.CategoryName == categorySort);
            }

            return await articles.OrderByDescending(sort => sort.ArticleId).Skip((page - 1) * size).Take(size).ToListAsync();
        }

        // GET: api/Articles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ArticlesModel>>> GetArticles(int id)
        {
            return await _context.Articles
                    .Include(c => c.CategoryNavigation)
                    .Include(t => t.TagsNavigation)
                    .Select(s => new ArticlesModel
                    {
                        ArticleId = s.ArticleId,
                        Name = s.Name,
                        ShortDescription = s.ShortDescription,
                        Description = s.Description,
                        HeroImage = s.HeroImage,
                        PublicationDate = s.PublicationDate,
                        CategoryId = s.CategoryNavigation.CategoryId,
                        CategoryName = s.CategoryNavigation.CategoryName,
                        Tags = s.TagsNavigation.Select(ss => ss.Tag.TagName).ToArray(),

                    }).Where(i => i.ArticleId == id).ToListAsync();
        }

        // PUT: api/Articles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticles(int id, ArticlesModel articlesModel)
        {
            if (id != articlesModel.ArticleId)
            {
                return BadRequest();
            }

            var articles = new Articles()
            {
                ArticleId = articlesModel.ArticleId,
                Name = articlesModel.Name,
                HeroImage = articlesModel.HeroImage,
                ShortDescription = articlesModel.ShortDescription,
                Description = articlesModel.Description,
                PublicationDate = articlesModel.PublicationDate,
                Category = articlesModel.CategoryId
            };

            _context.Entry(articles).State = EntityState.Modified;

            var articleTags = _context.ArticlesTags.Where(s => s.ArticleId == articlesModel.ArticleId);
            _context.ArticlesTags.RemoveRange(articleTags);

            for (int i = 0; i < articlesModel.Tags.Length; i++)
            {
                var articleTag = new ArticlesTags()
                {
                    ArticleId = articles.ArticleId,
                    TagId = _context.Tags.Where(name => name.TagName == articlesModel.Tags[i]).Select(s => s.TagId).First()
                };

                _context.ArticlesTags.Add(articleTag);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticlesExists(id))
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

        // POST: api/Articles
        [HttpPost]
        public async Task<ActionResult<Articles>> PostArticles(ArticlesModel articlesModel)
        {
            var articles = new Articles()
            {
                ArticleId = articlesModel.ArticleId,
                Name = articlesModel.Name,
                HeroImage = articlesModel.HeroImage,
                ShortDescription = articlesModel.ShortDescription,
                Description = articlesModel.Description,
                PublicationDate = articlesModel.PublicationDate,
                Category = articlesModel.CategoryId
            };

            _context.Articles.Add(articles);
            await _context.SaveChangesAsync();

            for (int i = 0; i < articlesModel.Tags.Length; i++)
            {
                var articleTag = new ArticlesTags()
                {
                    ArticleId = articles.ArticleId,
                    TagId = Convert.ToInt32(articlesModel.Tags[i])
                };

                _context.ArticlesTags.Add(articleTag);
            }


            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArticles", new { id = articles.ArticleId }, articles);
        }

        // DELETE: api/Articles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Articles>> DeleteArticles(int id)
        {
            var articles = await _context.Articles.FindAsync(id);
            if (articles == null)
            {
                return NotFound();
            }

            _context.Articles.Remove(articles);
            await _context.SaveChangesAsync();

            return articles;
        }

        private bool ArticlesExists(int id)
        {
            return _context.Articles.Any(e => e.ArticleId == id);
        }
    }
}
